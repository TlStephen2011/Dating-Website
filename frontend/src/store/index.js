import Vue from "vue";
import Vuex from "vuex";
import { getBlacklist, getAllUsers, getMatches, outogingRequests, incomingRequests, getMyProfile, getAllInterests } from '@/api/api';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    user: {},
    users: [],
    matches: [],
    outgoingRequests: [],
    incomingRequests: [],
    interests: [],
    blacklist: []
  },
  mutations: {
    saveUsers(state, users) {
      // add user age onto obj
      if (users) {
        users.forEach(u => {
          if (!u.dateOfBirth) {
            u.age = "Unknown";
          } else {
            u.age =
              new Date().getFullYear() -
              new Date(Date.parse(u.dateOfBirth)).getFullYear();
          }
        })

      }

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
    },
    saveProfile(state, user) {
      state.user = user;
    },
    saveInterests(state, interests) {
      state.interests = interests;
    },
    saveBlacklist(state, blacklist) {
      state.blacklist = blacklist;
    },
    updateDistances(state) {
      if (state.users && state.users.length > 0 && state.user.latitude && state.user.longitude) {
        state.users.forEach(u => {
          const from = new google.maps.LatLng({ lat: state.user.latitude, lng: state.user.longitude });
          const to = new google.maps.LatLng({ lat: u.latitude, lng: u.longitude });
          u.distance =
            google.maps.geometry.spherical.computeDistanceBetween(from, to) / 1000;
        })
      }
    },
    filterUsers(state) {
      if (state.users && state.users.length > 0) {
        const userId = state.user.id;
        const blacklist = [];
        state.blacklist.forEach(b => {
          blacklist.push(b.Blacklists);
        });
        state.users = state.users.filter(u => {
          if ((blacklist.includes(u.id) || u.id === userId)) {
          } else {
            return u;
          }
        })
      }
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
          commit('saveMatches', [...data.connections[0], ...data.connections[1]]);
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
    },
    async getUserProfile({ commit }) {
      return new Promise(async (resolve, reject) => {
        try {
          const { data } = await getMyProfile();
          commit('saveProfile', data.user);
          resolve('Requests received loaded');
        } catch (error) {
          reject(error);
        }
      });
    },
    async getInterests({ commit }) {
      return new Promise(async (resolve, reject) => {
        try {
          const { data } = await getAllInterests();
          commit('saveInterests', data.interests);
          resolve('Interests loaded');
        } catch (error) {
          reject(error);
        }
      });
    },
    async fetchBlacklist({ commit }) {
      return new Promise(async (resolve, reject) => {
        try {
          const { data } = await getBlacklist();
          commit('saveBlacklist', data.blacklist);
          resolve('Blacklist loaded');
        } catch (error) {
          reject(error);
        }
      });
    }
  },
  modules: {}
});
