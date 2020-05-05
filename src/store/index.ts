import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

interface User {
  name: string,
  isAuth: boolean
}
type Store = {
  user: User,
  connectError: boolean
}

export default new Vuex.Store<Store>({
  state: {
    user: {
      name: '',
      isAuth: false
    },
    connectError: false
  },
  mutations: {
    login(state, name: string) {
      state.user.name = name
      state.user.isAuth = true
    },
    logout(state) {
      state.user.name = ''
      state.user.isAuth = false
    },
    connectError(state, s: boolean) {
      state.connectError = s
    }
  },
  getters: {
    isAuth: state => state.user.isAuth
  },
  actions: {},
  modules: {}
});
