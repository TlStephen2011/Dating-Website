const axios = require('axios');

const api = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: { 'Content-Type': 'application/json' },
});

const getAllUsers = () => api.get('/users/all', {
  headers: {
    'X-auth-token': localStorage.getItem('token')
  }
});
const getImage = (path) => api.get('/image/' + path, {
  responseType: 'arraybuffer',
  headers: {
    'X-auth-token': localStorage.getItem('token')
  }
});
const getMatches = () => api.get('/matches/', {
  headers: {
    'X-auth-token': localStorage.getItem('token')
  }
})
const createMatch = (userTo) => api.post('/matches/connect', { userTo }, {
  headers: {
    'X-auth-token': localStorage.getItem('token')
  }
})
const outogingRequests = () => api.get('/matches/requests', {
  headers: {
    'X-auth-token': localStorage.getItem('token')
  }
})
const incomingRequests = () => api.get('/matches/incoming-requests', {
  headers: {
    'X-auth-token': localStorage.getItem('token')
  }
})

module.exports = {
  api,
  getAllUsers,
  getImage,
  getMatches,
  createMatch,
  outogingRequests,
  incomingRequests
}