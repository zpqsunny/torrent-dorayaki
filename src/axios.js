import axios from 'axios'
import { useCounterStore } from './stores/counter'
import {message} from "ant-design-vue";
const store = useCounterStore()
axios.defaults.baseURL = 'https://ax.dorayaki.online'
// axios.defaults.baseURL = 'http://127.0.0.1:8000'


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
