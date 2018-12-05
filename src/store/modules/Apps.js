const state = {
  applications: []
}

const getters = {
  getApplications (state) {
    return state.applications
  },
  getApplicationById: state => id => {
    return state.applications.find(a => a.id === id)
  }
}

const mutations = {
  addApplication (state, payload) {
    if (payload) {
      state.applications.push(payload)
    }
  },
  removeApplicationById (state, id) {
    let appId = state.applications.findIndex(a => a.id === (id || -1))
    if (appId) {
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
