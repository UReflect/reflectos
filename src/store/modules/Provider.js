import Vue from 'vue'

const state = {
  providers: []
}

const getters = {
  getProviders (state) {
    return state.providers
  },
  getProviderById: state => id => {
    return state.providers.find(p => p.module_id === id)
  }
}

const mutations = {
  pushProvider (state, provider) {
    if (provider) {
      let idx = state.providers.findIndex(e => e.ID === provider.ID)
      if (idx === -1) {
        state.providers.push(provider)
      } else {
        state.providers.slice(idx, 1, provider)
      }
    }
  },
  sliceProvider (state, id) {
    if (id) {
      let idx = state.providers.findIndex(e => e.module_id === id)
      if (idx !== -1) {
        state.providers.slice(idx, 1)
      }
    }
  }
}

const actions = {
  create ({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      if (!payload.data || !payload.module_id || !payload.profile_id) {
        reject(new Error('Malformed object'))
      } else {
        Vue.api.post('provider', payload).then((res) => {
          commit('pushProvider', res.data)
          resolve(res.data)
        }).catch(reject)
      }
    })
  },

  read ({ commit, state }, id) {
    return new Promise((resolve, reject) => {
      if (!id) {
        reject(new Error('Read needs an id'))
      } else {
        Vue.api.get(`provider/${id}`).then((res) => {
          commit('pushProvider', res.data)
          resolve(res.data)
        }).catch(reject)
      }
    })
  },

  update ({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      if (!payload.id || !payload.data) {
        reject(new Error('Update needs an id and data'))
      } else {
        Vue.api.get(`provider/${payload.id}`, payload.data).then((res) => {
          commit('pushProvider', res.data)
          resolve(res.data)
        }).catch(reject)
      }
    })
  },

  delete ({ commit, state }, id) {
    return new Promise((resolve, reject) => {
      if (!id) {
        reject(new Error('Delete needs an id'))
      } else {
        Vue.api.delete(`provider/${id}`).then(() => {
          commit('sliceProvider', id)
          resolve()
        }).catch(reject)
      }
    })
  },

  readAll ({ commit, state }) {
    return new Promise((resolve, reject) => {
      Vue.api.get(`providers`).then((res) => {
        for (let provider of res.data) {
          commit('pushProvider', provider)
        }
        resolve(res.data)
      }).catch(reject)
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
