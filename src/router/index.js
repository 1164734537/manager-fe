import { createRouter,createWebHashHistory } from 'vue-router'
import Home from './../components/Home.vue'
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
            path:'Welcome',
            meta:{
                title:'欢迎页'
            },
            component:()=> import('./../views/Welcome.vue'),
           },
           {
                name:'user',
                path:'/user',
                meta:{
                    title:'用户列表'
                },
                component:()=> import('./../views/User.vue')
            }

        ]
    },
    {
        name:'Login',
        path:'/login',
        component:()=> import('./../views/Login.vue')
    }
]
const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router
