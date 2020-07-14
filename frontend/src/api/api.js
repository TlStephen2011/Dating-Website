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
const getMyProfile = () => api.get('/user', {
  headers: {
    'X-auth-token': localStorage.getItem('token')
  }
})
const updateProfile = (updateObj) => api.put('/user', updateObj, {
  headers: {
    'X-auth-token': localStorage.getItem('token')
  }
})
const getAllInterests = () => api.get('/users/interests', {
  headers: {
    'X-auth-token': localStorage.getItem('token')
  }
})
const updateInterests = (interests) => api.post('/user/interests', { interests }, {
  headers: {
    'X-auth-token': localStorage.getItem('token')
  }
});
const removeInterests = (interests) => api.delete('/user/interests', {
  headers: {
    'X-auth-token': localStorage.getItem('token')
  },
  data: {
    interests: interests
  }
});
const saveProfileImage = (formData) => api.post('/image/profile', formData, {
  headers: {
    'X-auth-token': localStorage.getItem('token')
  }
});
const saveImage = (imageNum, formData) => api.post(`/image/${imageNum}`, formData, {
  headers: {
    'X-auth-token': localStorage.getItem('token')
  }
});


module.exports = {
  api,
  getAllUsers,
  getImage,
  getMatches,
  createMatch,
  outogingRequests,
  incomingRequests,
  getMyProfile,
  updateProfile,
  getAllInterests,
  updateInterests,
  removeInterests,
  saveProfileImage,
  saveImage
}
