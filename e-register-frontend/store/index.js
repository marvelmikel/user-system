// holds your root state
export const state = () => ({
  isLoggedIn: false,
  user: null,
  token: null,
  admin: null,
  adminToken: null,
  isAdminLoggedIn: false,
})

// contains your actions
export const actions = {
  async login({ commit }, payload) {
    console.log(payload);
    // this.$cookies.set('USER-LOGIN-STATE', true)
    // this.$cookies.set('USER-TOKEN', payload.access_token.accessToken)
    // commit('AUTHENTICATE', payload)
  },
  async adminLogin({ commit }, payload) {
    this.$cookies.set('ADMIN-LOGIN-STATE', true)
    this.$cookies.set('ADMIN-TOKEN', payload)
    commit('ADMIN_AUTHENTICATE', payload)
  },
}
// contains your mutations
export const mutations = {
  AUTHENTICATE(state, payload) {
    state.user = payload.user
    state.token = payload.access_token.accessToken ?? null;
    state.isLoggedIn = true
  },
  ADMIN_AUTHENTICATE(state, payload) {
    // state.admin = payload.admin
    state.adminToken = payload ?? null;
    state.isAdminLoggedIn = true
  },
  LOGOUT(state) {
    this.$cookies.removeAll()
    state.user = null
    state.token = null;
    state.isLoggedIn = false
  },
  ADMIN_LOGOUT(state) {
    this.$cookies.removeAll()
    state.admin = null
    state.adminToken = null;
    state.isAdminLoggedIn = false
  }
}
// your root getters
export const getters = {
  isLoggedIn(state) {
    return state.isLoggedIn
  },
  userDetails(state) {
    return state.user
  },
  isAdminLoggedIn(state) {
    return state.isAdminLoggedIn
  },
}
