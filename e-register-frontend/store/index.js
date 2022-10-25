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
    this.$cookies.set('ZHILL-LOGIN-STATE', true)
    this.$cookies.set('ZHILL-TOKEN', payload.access_token.accessToken)
    commit('AUTHENTICATE', payload)
  },
  async adminLogin({ commit }, payload) {
    this.$cookies.set('ZHILL-LOGIN-STATE-ADMIN', true)
    this.$cookies.set('ZHILL-TOKEN-ADMIN', payload.access_token.accessToken)
    commit('ADMINAUTHENTICATE', payload)
  },
}
// contains your mutations
export const mutations = {
  AUTHENTICATE(state, payload) {
    state.user = payload.user
    state.token = payload.access_token.accessToken ?? null;
    state.isLoggedIn = true
  },
  ADMINAUTHENTICATE(state, payload) {
    state.admin = payload.admin
    state.adminToken = payload.access_token.accessToken ?? null;
    state.isAdminLoggedIn = true
  },
  LOGOUT(state) {
    this.$cookies.removeAll()
    state.user = null
    state.token = null;
    state.isLoggedIn = false
  },
  ADMINLOGOUT(state) {
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
