const state = {
  applications: []
}

const getters = {
  getApplications (state) {
    return state.applications
  }
}

const mutations = {
  addApplication (state, payload) {
    if (payload) {
      state.applications.push(payload)
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
