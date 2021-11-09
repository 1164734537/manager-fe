import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import App from './App.vue'
import request from "./uitls/request"
const app = createApp(App)
app.config.globalProperties.$request = request;
app.use(ElementPlus).use(router).mount('#app')
