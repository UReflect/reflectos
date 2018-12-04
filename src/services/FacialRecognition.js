import store from '@/store'
import axios from 'axios'

const API_BASE_URL = 'http://192.168.0.48:5000/api/'
const API_VERSION = 'v1.0/'

export class FacialRecognitionService {
  constructor () {
    this.http = axios.create({
      baseURL: API_BASE_URL + API_VERSION,
      timeout: 30000
    })
  }

  install () {
    this.http.post('init', { mirror_id: store.getters.getMirrorID }).then(() => {
      store.commit('setFacialInstallation', true)
    })
  }

  addFace (profileId, profileName) {
    this.http.post('face', { profile_id: profileId, name: profileName }).then((res) => {
      console.log('facialRecognitionService::addFace success', res)
    }).catch((err) => {
      console.log('facialRecognitionService::addFace error', err)
    })
  }

  fetchFace () {
    return new Promise((resolve, reject) => {
      this.http.get('status').then(() => {
        this.http.get('face').then((res) => {
          if (res.data.profile_id) {
            resolve(res.data.profile_id)
          } else {
            reject(new Error('unkown face'))
          }
        }).catch(() => {
          reject(new Error('camera is not ready'))
        })
      })
    })
  }

  init (callback) {
    if (this.mounted) {
      this.unmount()
    }
    this.mounted = true
    this.callback = callback
    this.startFetching()
  }

  startFetching () {
    if (!this.mounted) return
    this.interval = setInterval(() => {
      this.fetchFace().then((profileId) => {
        this.callback(false, profileId)
      }).catch((err) => {
        this.callback({ type: err.message })
      })
    }, 5000)
  }

  unmount () {
    if (!this.mounted) return
    clearInterval(this.interval)
    this.mounted = false
  }
}

export default {
  install (Vue) {
    Vue.prototype.$facial = new FacialRecognitionService()
  }
}
