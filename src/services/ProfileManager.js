import Vue from 'vue'
import store from '@/store'
import router from '@/router'
import { ipcRenderer } from 'electron'

export class ProfileManagerService {
  constructor () {
    console.log('profileManager created')
  }

  unlistenProfileInstalls (profile) {
    console.debug('[reflectos][Service][ProfileManager] unlistenProfile', profile.id, profile.title)
    Vue.broker.unsubscribe(`profiles/${profile.id}`)
  }

  listenProfileInstalls (profile) {
    console.debug('[reflectos][Service][ProfileManager] listenProfile', profile.id, profile.title)
    Vue.broker.on(`profiles/${profile.id}`, ProfileManagerService.listenProfile)
    Vue.broker.subscribe(`profiles/${profile.id}`)
  }

  static listenProfile (message, packet) {
    console.log('message=', new TextDecoder('utf-8').decode(message))
    try {
      let data = JSON.parse(new TextDecoder('utf-8').decode(message))
      if (data.type === 'PROVIDER_CREATED') {
        let str = JSON.parse(atob(data.data.data))
        console.log('str access_token: ', str.access_token)
        Vue.httpSpotify.setBearer(str.access_token)
        store.commit('pushProvider', data.data)
      } else if (data.type === 'MODULE_INSTALL') {
        let id = data.data.id
        let link = data.data.link
        let name = data.data.name
        console.debug('[reflectos][Service][ProfileManager] listenProfile::MODULE_INSTALL', id, name, link)
        ipcRenderer.send('download-module', link)
      } else if (data.type === 'MODULE_UNINSTALL') {
        console.debug('[reflectos][Service][ProfileManager] listenProfile::MODULE_UNINSTALL', data.data.id)
        ipcRenderer.send('uninstall-module', data.data.name)
      }
      console.log(data)
    } catch (ignored) {}
  }

  resolveMirrorInfos () {
    return new Promise((resolve, reject) => {
      Vue.broker.on(`mirrors/${store.getters.getMirrorID}`, (message, packet) => {
        try {
          // console.log('message=', new TextDecoder('utf-8').decode(message))
          const data = JSON.parse(new TextDecoder('utf-8').decode(message))
          // console.log('data = ', data)
          if (data.type === 'MIRROR_JOIN') {
            store.commit('setMirror', { ...data.data, joined: true, active: true })
          }
          resolve()
        } catch (e) {
          reject(e)
        }
      })
      console.log(`on subscribe à mirrors/${store.getters.getMirrorID}`)
      Vue.broker.subscribe(`mirrors/${store.getters.getMirrorID}`)
    })
  }

  bootMirror () {
    return new Promise(resolve => {
      Vue.broker.unsubscribe(`mirrors/${store.getters.getMirrorID}`)
      Vue.broker.unsubscribe(`users/${store.getters.getMirrorUserID}`)
      this.resolveMirrorInfos().then(() => resolve({ infos: true }))
      this.resolveUserInfos().then(() => resolve({ user: true }))
    })
  }

  resolveUserInfos () {
    return new Promise((resolve, reject) => {
      Vue.broker.on(`users/${store.getters.getMirrorUserID}`, (message) => {
        console.log('message=', new TextDecoder('utf-8').decode(message))
        try {
          let data = JSON.parse(new TextDecoder('utf-8').decode(message))
          if (data.type === 'PROFILE_CREATE') {
            store.commit('pushProfile', { ...data.data, modules: [] })
            Vue.facial.addFace(data.data.id, data.data.title)
          } else if (data.type === 'PROFILE_DELETE') {
            console.log('deleting profile from data with id', data.data.id)
            if (store.getters.getCurrentProfile.id === data.data.id) {
              store.commit('lockProfile')
              store.commit('deleteProfile', data.data.id)
              router.push({ name: 'profiles' })
            } else {
              store.commit('deleteProfile', data.data.id)
            }
            console.log('deleted')
          }
          this.listenProfileInstalls(data.data)
          resolve(data.data)
        } catch (e) {
          reject(e)
        }
      })
      console.log(`on subscribe à users/${store.getters.getMirrorUserID}`)
      Vue.broker.subscribe(`users/${store.getters.getMirrorUserID}`)
    })
  }
}

export default {
  install (Vue) {
    Vue.prototype.$profileManager = new ProfileManagerService()
  }
}
