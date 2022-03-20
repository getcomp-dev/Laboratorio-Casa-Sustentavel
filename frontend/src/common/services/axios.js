import {HTTP_REQUEST_INCREMENT, HTTP_REQUEST_DECREMENT} from '../../vuex/mutation-types'

import axios from 'axios'
import VueAxios from 'vue-axios'

export default function (Vue, store) {
  Vue.use(VueAxios, axios)

  Vue.axios.defaults.baseURL = 'http://localhost:3000/api/'

  Vue.axios.interceptors.request.use(function (config) {
    store.commit(HTTP_REQUEST_INCREMENT)
    if (store.state.auth.token) {
      config.headers['authorization'] = `Bearer ${store.state.auth.token}`
    }

    return config
  }, function (error) {
    store.commit(HTTP_REQUEST_DECREMENT)
    console.log('REQUEST ERROR')
    console.log(error)
    return Promise.reject(error)
  })

  Vue.axios.interceptors.response.use(function (response) {
    store.commit(HTTP_REQUEST_DECREMENT)
    return response
  }, function (error) {
    store.commit(HTTP_REQUEST_DECREMENT)
    console.log('RESPONSE ERROR')
    console.log(error)
    if (error.response) {
      console.log(error.response)
    }
    return Promise.reject(error)
  })
}
