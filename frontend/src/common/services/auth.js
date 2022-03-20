import Vue from 'vue'

export default {
  fetch (config = {}) {
    return Vue.axios.get('/authenticate', config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))
  },
  authenticate (payload, config = {}) {
    return Vue.axios.post('/authenticate', payload, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))
  }
}
