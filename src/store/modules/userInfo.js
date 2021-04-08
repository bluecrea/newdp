const state = {
  userInfo: sessionStorage.getItem('userInfo') || {}
}

const getters = {
  userInfo: (state) => state.userInfo
}

const mutations = {
  SET_USERINFO(state, userInfo) {
    state.userInfo = userInfo
    if (state.userInfo.rememberMe) {
      sessionStorage.setItem('userInfo', JSON.stringify(state.userInfo))
    } else {
      sessionStorage.removeItem('userInfo')
    }
  },

  REMOVE_USERINFO(state) {
    sessionStorage.removeItem('userInfo')
    state.userInfo = {}
  }
}

const actions = {
  setUserInfo({ commit }, userInfo) {
    commit('SET_USERINFO', userInfo)
  },
  async delUserInfo({ commit }) {
    commit('REMOVE_USERINFO')
  }
}

export default { state, getters, mutations, actions }