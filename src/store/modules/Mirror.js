import Vue from 'vue'

const state = {
  serial: '',
  ID: '',
  userId: '',
  name: '',
  joinCode: '',
  broker_user: '',
  broker_password: '',
  location: '',
  joined: false,
  init: false,
  active: false
}

const getters = {
  getMirrorID (state) {
    return state.ID
  },
  getMirrorUserID (state) {
    return state.userId
  },
  getMirrorName (state) {
    return state.name
  },
  getMirrorBrokerUser (state) {
    return state.broker_user
  },
  getMirrorBrokerPass (state) {
    return state.broker_password
  },
  getMirrorJoinCode (state) {
    return state.joinCode
  },
  getMirrorSerial (state) {
    return state.serial
  },
  getMirrorJoinedStatus (state) {
    return state.joined
  }
}

const mutations = {
  generateSerial (state) {
    let str = () => Math.floor((1 + Math.random()) * 0x10000).toString(32).substring(1)
    state.serial = `${str()}-${str()}-${str()}-${str()}`.toUpperCase()
  },
  setMirror (state, payload) {
    if (payload) {
      state.init = true
      state.serial = payload.serial || state.serial
      state.ID = payload.ID || state.ID
      state.userId = payload.userId || state.userId
      state.name = payload.name || state.name
      state.joinCode = payload.joinCode || state.joinCode
      state.broker_user = payload.broker_user || state.broker_user
      state.broker_password = payload.broker_password || state.broker_password
      state.location = payload.location || state.location
      state.joined = typeof payload.joined === typeof true ? payload.joined : state.joined
      state.active = typeof payload.active === typeof true ? payload.active : state.active
    } else {
      state.serial = ''
      state.ID = ''
      state.name = ''
      state.joinCode = ''
      state.broker_user = ''
      state.broker_password = ''
      state.location = ''
      state.joined = false
      state.init = false
      state.active = false
    }
  }
}

const actions = {
  init ({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('generateSerial')
      Vue.api.post('mirror/init', { hwid: state.serial }).then((res) => {
        commit('setMirror', res.data.data)
        resolve()
      }).catch(reject)
    })
  },
  redirect ({ commit }) {
    return new Promise(resolve => {
      commit('setMirror', { joined: true })
      resolve()
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
