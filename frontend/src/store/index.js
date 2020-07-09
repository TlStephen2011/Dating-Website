import Vue from "vue";
import Vuex from "vuex";
import { getAllUsers } from '@/api/api';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {
    saveUsers(state, users) {
      state.users = users;
    }
  },
  actions: {
    async getUsers({ commit }) {
      const { data } = await getAllUsers();
      commit('saveUsers', data.users);
    }
  },
  modules: {}
});
