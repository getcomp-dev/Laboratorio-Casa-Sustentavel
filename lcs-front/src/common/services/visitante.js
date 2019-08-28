import Vue from 'vue'

export default {
  fetchAllNotFinished (config = {}) {
    return Vue.axios.get(`/visitante`, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))
  },

  create (payload, config = {}) {
    return Vue.axios.post('/visitante', payload, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))
  },

  get (visitanteId, config = {}) {
    return Vue.axios.get(`/visitante/${visitanteId}`, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))
  }
}
