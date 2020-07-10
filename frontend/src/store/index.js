import Vue from "vue";
import Vuex from "vuex";
import { getAllUsers } from '@/api/api';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: []
  },
  mutations: {
    saveUsers(state, users) {
      state.users = users;
    }
  },
  actions: {
    async getUsers({ commit }) {
      return new Promise(async (resolve, reject) => {
        try {
          const { data } = await getAllUsers();
          commit('saveUsers', data.users);
          resolve('Added users');
        } catch (error) {
          reject(error);
        }
      })
    }
  },
  modules: {}
});
