const axios = require('axios');

const api = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: { 'Content-Type': 'application/json' },
});

const apiAuth = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
    'X-auth-token': localStorage.getItem('token')
  },
});

const getAllUsers = () => apiAuth.get('/users/all');
const getImage = (path) => apiAuth.get('/image/' + path, {
  responseType: 'arraybuffer'
});

module.exports = {
  api,
  getAllUsers,
  getImage
}