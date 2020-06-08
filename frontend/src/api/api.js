const axios = require('axios');

const api = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 1000,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
  });

module.exports = {
    api
}