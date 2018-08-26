// import WiFiControl from 'wifi-control'
import DNS from 'dns'
import wifi from 'node-wifi'

wifi.init({
  iface: null // network interface, choose a random wifi interface if set to null
})

export class WifiService {
  constructor () {
    this.connected = false
    console.debug('[reflectos][Service][WiFiControl] initialized')
  }

  status () {
    return new Promise((resolve, reject) => {
      wifi.getCurrentConnections((err, currentConnections) => {
        console.log(currentConnections)
        if (err) {
          reject(err)
        } else if (currentConnections.length === 0) {
          console.debug('[reflectos][Service][WiFiControl] status::disconnected')
          resolve(false)
        } else {
          DNS.resolve('google.com', (err) => {
            if (err) {
              console.debug('[reflectos][Service][WiFiControl] status::error')
              reject(err)
            } else {
              console.debug('[reflectos][Service][WiFiControl] status::connected')
              resolve(true)
            }
          })
        }
      })
    })
  }

  scan () {
    return new Promise((resolve, reject) => {
      wifi.scan((err, networks) => {
        if (err) {
          console.debug('[reflectos][Service][WiFiControl] scan::error')
          reject(err)
        } else {
          console.debug('[reflectos][Service][WiFiControl] scan::success')
          resolve(networks)
          /*
          networks = [
              {
                ssid: '...',
                bssid: '...',
                mac: '...', // equals to bssid (for retrocompatibility)
                channel: <number>,
                frequency: <number>, // in MHz
                signal_level: <number>, // in dB
                security: 'WPA WPA2' // format depending on locale for open networks in Windows
                security_flags: '...' // encryption protocols (format currently depending of the OS)
                mode: '...' // network mode like Infra (format currently depending of the OS)
              },
              ...
          ];
          */
        }
      })
    })
  }

  reset () {
    return new Promise((resolve, reject) => {
      wifi.disconnect((err) => {
        if (err) {
          console.debug('[reflectos][Service][WiFiControl] reset::error')
          reject(err)
        } else {
          console.debug('[reflectos][Service][WiFiControl] reset::success')
          resolve(true)
        }
      })
    })
  }

  connect (ssid, password) {
    return new Promise((resolve, reject) => {
      wifi.connect({ ssid, password }, (err) => {
        if (err) {
          console.debug('[reflectos][Service][WiFiControl] connect::error')
          reject(err)
        } else {
          console.debug('[reflectos][Service][WiFiControl] connect::success')
          resolve(true)
        }
      })
    })
  }
}

const Wifi = {
  install (Vue) {
    Vue.prototype.$wifi = new WifiService()
  }
}

export default Wifi
