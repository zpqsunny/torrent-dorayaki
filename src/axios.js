import axios from 'axios'
import { useCounterStore } from './stores/counter'
import {message} from "ant-design-vue";
const store = useCounterStore()
axios.defaults.baseURL = 'http://t.conn.ltd:8080'
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
  message.error('服务器繁忙')
  return Promise.reject(error);
})

export default axios
