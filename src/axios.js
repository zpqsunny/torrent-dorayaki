import axios from 'axios'
import { useCounterStore } from './stores/counter'
import {message} from "ant-design-vue";
const store = useCounterStore()
axios.defaults.baseURL = 'http://t.conn.ltd:8080'
// axios.defaults.baseURL = 'http://127.0.0.1:8000'

chrome?.storage?.local?.get(['NEW_SERVICE_URL'], value => {
  axios.defaults.baseURL = value['NEW_SERVICE_URL']
})

axios.interceptors.request.use(config => {

  store.loading = true
  return config
},error => {
  store.loading = false
  console.error(error)
  return Promise.reject(error);
})

axios.interceptors.response.use(response => {

  store.loading = false
  return response
},error => {

  store.loading = false
  console.error(error)
  message.error(error.code + ' ' + error.message)
  return Promise.reject(error);
})

export default axios
