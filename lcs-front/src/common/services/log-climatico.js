import Vue from 'vue'

export default {
  fetchAll (config = {}) {
    return Vue.axios.get(`/log-climatico`, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))
  },
}
