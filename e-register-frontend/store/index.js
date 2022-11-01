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
    this.$cookies.set("USER-LOGIN-STATE", true);
    this.$cookies.set("USER-TOKEN", payload.token);
    this.$cookies.set("USER-EMAIL-VERIFY", payload.isEmailActive);
    await commit("AUTHENTICATE", payload);
  },
  async adminLogin({ commit }, payload) {
    this.$cookies.set("ADMIN-LOGIN-STATE", true);
    this.$cookies.set("ADMIN-TOKEN", payload);
    commit("ADMIN_AUTHENTICATE", payload);
  },
  saveAdmin({ commit }, payload) {
    commit("SAVE_ADMIN", payload);
  },
};
// contains your mutations
export const mutations = {
  AUTHENTICATE(state, payload) {
    state.user = payload;
    state.token = payload.token ?? null;
    state.isLoggedIn = true;
  },
  ADMIN_AUTHENTICATE(state, payload) {
    // state.admin = payload.admin
    state.adminToken = payload ?? null;
    state.isAdminLoggedIn = true;
  },
  LOGOUT(state) {
    // this.$cookies.removeAll();
    this.$cookies.remove("USER-LOGIN-STATE");
    this.$cookies.remove("USER-TOKEN");
    this.$cookies.remove("USER-EMAIL-VERIFY");

    localStorage.clear();
    state.user = null;
    state.token = null;
    state.isLoggedIn = false;
  },
  ADMIN_LOGOUT(state) {
    // this.$cookies.removeAll();
    this.$cookies.remove("ADMIN-LOGIN-STATE");
    this.$cookies.remove("ADMIN-TOKEN");

    state.admin = null;
    state.adminToken = null;
    state.isAdminLoggedIn = false;
  },
  SAVE_ADMIN(state, payload) {
    state.admin = payload;
  },
};
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
