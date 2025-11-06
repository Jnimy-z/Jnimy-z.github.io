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
            path: 'screen-2',
            name: 'Screen2',
            component: () => import('../src/views/screen2/index.vue'),
            meta: { title: 'screen2', keepAlive: true }
        }, {
            path: 'screen-255',
            name: 'Screen255',
            component: () => import('../src/views/screen255/index.vue'),
            meta: { title: 'screen255', keepAlive: true }
        }]
    },
    {
        path: '/examples',
        name: 'examples',
        component: () => import('../src/views/exampleShow/index.vue'),
        children: [{
            path: 'openlayers',
            name: 'openlayers',
            component: () => import('@/views/exampleShow/components/openlayers.vue'),
            meta: { title: 'openlayers', keepAlive: true }
        }, {
            path: 'echartsMap',
            name: 'echartsMap',
            component: () => import('@/views/exampleShow/components/echartsMap.vue'),
            meta: { title: 'echartsMap', keepAlive: true }
        }, {
            path: 'autoRollingList',
            name: 'autoRollingList',
            component: () => import('@/views/exampleShow/components/autoRollingList.vue'),
            meta: { title: 'autoRollingList', keepAlive: true }
        }, {
            path: 'carousel',
            name: 'carousel',
            component: () => import('@/views/exampleShow/components/carousel.vue'),
            meta: { title: 'carousel', keepAlive: true }
        }, {
            path: 'myTree',
            name: 'myTree',
            component: () => import('@/views/exampleShow/components/myTree.vue'),
            meta: { title: 'myTree', keepAlive: true }
        }, {
            path: 'wordCloud',
            name: 'wordCloud',
            component: () => import('@/views/exampleShow/components/wordCloud.vue'),
            meta: { title: 'wordCloud', keepAlive: true }
        }]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router