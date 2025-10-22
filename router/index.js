import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../src/views/Home.vue"
import Screen from "../src/views/Screen.vue"

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/screen',
        name: 'screen',
        component: Screen
    },
    {
        path: '/contact',
        name: 'contact',
        component: () => import('../src/views/Contact.vue') // 懒加载
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router