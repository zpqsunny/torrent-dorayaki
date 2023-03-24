import { createApp } from 'vue'
import { createPinia } from 'pinia'
import antd from 'ant-design-vue';
import './assets/base.css';
import 'ant-design-vue/dist/antd.css'; // or 'ant-design-vue/dist/antd.less'
import App from './App.vue'
import router from './router'
import i18n from './i18n'

const app = createApp(App)

app.use(antd)
app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
