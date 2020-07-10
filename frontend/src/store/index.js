import Vue from "vue";
import Vuex from "vuex";
import { getAllUsers, getMatches, outogingRequests, incomingRequests } from '@/api/api';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    matches: [],
    outgoingRequests: [],
    incomingRequests: []
  },
  mutations: {
    saveUsers(state, users) {
      state.users = users;
    },
    saveMatches(state, matches) {
      state.matches = matches;
    },
    saveOutogingRequests(state, requests) {
      state.outgoingRequests = requests;
    },
    saveIncomingRequests(state, requests) {
      state.incomingRequests = requests;
    },
    addOutgoingRequest(state, user) {
      state.outgoingRequests.push({ Match: user });
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
    },
    async getMatches({ commit }) {
      return new Promise(async (resolve, reject) => {
        try {
          const { data } = await getMatches();
          commit('saveMatches', data.connections[0]);
          resolve('Matches saved');
        } catch (error) {
          reject(error);
        }
      })
    },
    async getOutgoingRequests({ commit }) {
      return new Promise(async (resolve, reject) => {
        try {
          const { data } = await outogingRequests();
          commit('saveOutogingRequests', data.requests);
          resolve('Requests sent loaded');
        } catch (error) {
          reject(error);
        }
      });
    },
    async getIncomingRequests({ commit }) {
      return new Promise(async (resolve, reject) => {
        try {
          const { data } = await incomingRequests();
          commit('saveIncomingRequests', data.incoming);
          resolve('Requests received loaded');
        } catch (error) {
          reject(error);
        }
      });
    }
  },
  modules: {}
});
