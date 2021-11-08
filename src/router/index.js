import { createRouter,createWebHashHistory } from 'vue-router'
import Home from './../components/Home.vue'
import Welcome from './../components/Welcome.vue'
import Login from './../components/Login.vue'
const routes = [
    {
        name:'Home',
        path:'/',
        meta:{
            title:'首页'
        },
        component:Home,
        redirect:'/Welcome',
        children:[
           {
            name:'Welcome',
            path:'/Welcome',
            meta:{
                title:'欢迎页'
            },
            component:Welcome
           },
           {
            name:'Login',
            path:'/Login',
            meta:{
                title:'登录页'
            },
            component:Login
           }

        ]
    }
]
const router = createRouter({
    history:createWebHashHistory(),
    routes
})
export default router
