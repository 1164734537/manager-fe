import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import App from './App.vue'
import request from "./utils/request"
import storage from "./utils/storage"
import api from "./api"
import store from "./store/index"
const app = createApp(App)
app.config.globalProperties.$request = request;
app.config.globalProperties.$api = api;
app.config.globalProperties.$storage = storage;
app.use(ElementPlus,{ size: 'small', zIndex: 3000 }).use(store).use(router).mount('#app')
