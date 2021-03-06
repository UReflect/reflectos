import Vue from 'vue'
import mqtt from 'mqtt'
import store from '@/store'

export class BrokerService {
  constructor (debug = false) {
    this.client = null
    this.debug = debug
    this.log(`[reflectos][Service][Broker] Initialized [${debug ? 'debug' : 'prod'} mode]`)
    this.reconnect = true
    this.onCallbacks = []
    this.onConnectCallback = () => {}
    this.status = 0 // 0 = closed, 100 = offline, 200 = connected, 300 = reconnecting, 500 = error
    this.statusChange = (val) => {}
    this.stack = null // contains argument (error or connack object)
    this.lastPacketSent = null // last packet Sent
    this.lastPacketReceived = null // last packet Received
    this.clientId = 'ureflect_mirror_' + store.getters.getMirrorName + '_' + new Date().toISOString()
    this.options = {
      connectTimeout: 1500,
      clean: false,
      keepalive: 20,
      reconnectPeriod: 1000,
      clientId: this.clientId
    }
  }

  get getClientId () {
    return this.clientId
  }

  get getStatus () {
    return this.status
  }

  setStatus (status) {
    this.status = status
    this.statusChange(status)
    return this
  }

  get getStack () {
    return this.stack
  }

  get getLastPacketSent () {
    return this.lastPacketSent
  }

  get getLastPacketReceived () {
    return this.lastPacketReceived
  }

  onConnect (callback) {
    this.onConnectCallback = callback
  }

  reconnectAuto () {
    this.reconnect = true
    return this
  }

  set bindStatus (callback) {
    this.statusChange = callback
    return this
  }

  refreshCID () {
    this.options.clientId = 'ureflect_mirror_' + store.getters.getMirrorName + '_' + new Date().toISOString()
    return this
  }

  log (message) {
    if (this.debug) {
      Vue.notify({ type: 'info', text: message })
    }
    console.log(message)
  }

  listen (resolve = null, reject = null) {
    this.client.on('message', (topic, message, packet) => {
      try {
        this.onCallbacks[topic](message, packet)
      } catch (ignored) {
      } finally {
        this.lastPacketReceived = packet
      }
    })

    this.client.on('connect', (res) => {
      if (res.returnCode === 0) {
        this.setStatus(200)
        try {
          this.onConnectCallback()
        } catch (ignored) {}
        if (resolve) {
          resolve()
        }
        this.log('[reflectos][Service][Broker] event connect: connected')
      } else {
        this.setStatus(500)
        this.stack = res
        if (reject) {
          reject(res)
        }
        this.log('[reflectos][Service][Broker] event connect: not connected')
      }
    })

    this.client.on('reconnect', () => {
      this.setStatus(300)
      this.log('[reflectos][Service][Broker] event received: reconnect')
    })

    this.client.on('offline', () => {
      this.setStatus(100)
      this.log('[reflectos][Service][Broker] event received: offline')
    })

    this.client.on('close', () => {
      this.setStatus(0)
      this.log('[reflectos][Service][Broker] event received: close')
    })

    this.client.on('error', (err) => {
      this.setStatus(500)
      this.stack = err
      this.log('[reflectos][Service][Broker] event received: error', err)
    })

    this.client.on('packetsend', (packet) => {
      this.lastPacketSent = packet
    })

    this.client.on('packetreceive', (packet) => {
      this.lastPacketReceived = packet
    })
  }

  tryConnect (disconnect = false) {
    if (disconnect) {
      return this.end()
    }
    return this.connect(store.getters.getMirrorUserName, store.getters.getMirrorUserPass, false)
  }

  connect (username = null, password = null, reconnect = true) {
    return new Promise((resolve, reject) => {
      this.refreshCID()
      this.reconnect = reconnect
      if (username && password) {
        this.options.username = username
        this.options.password = password
      }
      let url = `${process.env.VUE_APP_MQTT_SERVER_PROTOCOL}://${process.env.VUE_APP_MQTT_SERVER_HOST}:${process.env.VUE_APP_MQTT_SERVER_PORT}/${process.env.VUE_APP_MQTT_SERVER_PATH}`
      this.log(url)
      this.client = mqtt.connect(url, this.options)
      this.listen(resolve, reject)
    })
  }

  on (topic, callback) {
    this.onCallbacks[topic] = callback
    return this
  }

  subscribe (topics, options = {}, callback = null) {
    if (!this.client) {
      return this
    }
    if (callback === null) {
      return new Promise((resolve, reject) => {
        this.client.subscribe(topics, options, (err, granted) => {
          if (err) {
            reject(err)
          } else {
            resolve(granted)
          }
        })
      })
    } else {
      this.client.subscribe(topics, options, callback)
    }
    return this
  }

  unsubscribe (topics, callback = null) {
    if (!this.client) {
      return this
    }
    if (callback === null) {
      return new Promise((resolve, reject) => {
        this.client.unsubscribe(topics, (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        })
      })
    } else {
      this.client.unsubscribe(topics, callback)
    }
    return this
  }

  publish (topic, message, options = {}, callback = null) {
    if (!this.client) {
      return this
    }
    if (callback === null) {
      return new Promise((resolve, reject) => {
        this.client.publish(topic, message, options, (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        })
      })
    } else {
      this.client.publish(topic, message, options, callback)
    }
    return this
  }

  end (force = false, callback = null) {
    if (!this.client) {
      return this
    }
    if (callback === null) {
      return new Promise(resolve => {
        this.client.end(force, () => {
          resolve()
        })
      })
    } else {
      this.client.end(force, callback)
    }
  }
}

export default {
  install (Vue) {
    const broker = new BrokerService(process.env.NODE_ENV === 'development')
    Vue.prototype.$broker = broker
    Vue.broker = broker
  }
}
