import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import App from './App.vue'
import request from "./uitls/request"
import api from "./api"
const app = createApp(App)
app.config.globalProperties.$request = request;
app.config.globalProperties.$api = api;
app.use(ElementPlus).use(router).mount('#app')
