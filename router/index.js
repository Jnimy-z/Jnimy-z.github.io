import { createRouter, createWebHashHistory } from "vue-router";
import App from "../src/App.vue"
import Home from "../src/views/Home.vue"
import Screen from "../src/views/Screen.vue"

const routes = [
    {
        path: '/',
        name: 'App',
        component: App,
        children: [{
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
        },]
    },
    {
        path: '/screens',
        children: [{
            path: 'screen-1',
            name: 'Screen1',
            component: () => import('../src/views/screen1/index.vue'),
            meta: { title: 'screen1', keepAlive: true }
        }]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router