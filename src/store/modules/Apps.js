const state = {
  applications: []
}

const getters = {
  getApplications (state) {
    return state.applications
  },
  getApplicationById: state => id => {
    return state.applications.find(a => a.id === id)
  },
  getApplicationByName: state => name => {
    return state.applications.find(a => a.name === name)
  }
}

const mutations = {
  addApplication (state, payload) {
    if (payload) {
      state.applications.push(payload)
    }
  },
  removeApplicationByName (state, name) {
    let appId = state.applications.findIndex(a => a.name === (name || undefined))
    if (appId !== -1) {
      state.applications.splice(appId, 1)
    }
  }
}

const actions = {}

export default {
  state,
  getters,
  mutations,
  actions
}
