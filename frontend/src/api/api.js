const axios = require('axios');

const api = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});

const apiAuth = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
    'X-auth-token': localStorage.getItem('token')
  },
  withCredentials: true
});

const getAllUsers = () => apiAuth.get('/users/all');


module.exports = {
  api,
  getAllUsers
}