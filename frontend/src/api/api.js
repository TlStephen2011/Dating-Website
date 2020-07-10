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

module.exports = {
  api,
  getAllUsers,
  getImage
}