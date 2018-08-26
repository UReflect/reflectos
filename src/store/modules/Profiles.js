const state = {
  profiles: [],
  currentProfile: null,
  locked: true,
  loading: false,
  error: false
}

const getters = {
  getProfiles (state) {
    return state.profiles
  },
  getProfileById: state => id => {
    return state.profiles.find(p => p.id === id)
  },
  getCurrentProfile (state) {
    return state.currentProfile
  },
  getCurrentProfileModules (state) {
    return state.currentProfile.modules
  },
  isProfileLocked (state) {
    return state.locked
  },
  isLockError (state) {
    return state.error
  },
  isLockLoading (state) {
    return state.loading
  }
}

const mutations = {
  pushProfile (state, profile) {
    if (profile) {
      let idx = state.profiles.findIndex(p => p.id === profile.id)
      if (idx === -1) {
        state.profiles.push(profile)
      } else {
        state.profiles.splice(idx, 1, profile)
      }
    }
  },
  selectProfile (state, profile) {
    state.currentProfile = state.profiles.find(p => p.id === profile.id)
  },
  lockProfile (state) {
    state.locked = true
    state.loading = false
    state.error = false
  },
  unlockProfile (state, payload) {
    if (payload) {
      state.locked = payload.locked
      state.loading = payload.loading
      state.error = payload.error
    }
  },
  enableCurrentProfileApp (state, name) {
    if (state.currentProfile) {
      if (!state.currentProfile.modules) {
        state.currentProfile.modules = []
      }
      state.currentProfile.modules.push({ name })
    }
  },
  disableCurrentProfileApp (state, name) {
    if (state.currentProfile && state.currentProfile.modules) {
      let idx = state.currentProfile.modules.findIndex(m => m.name === name)
      if (idx !== -1) {
        state.currentProfile.modules.splice(idx, 1)
      }
    }
  }
}

const actions = {
}

export default {
  state,
  getters,
  mutations,
  actions
}
