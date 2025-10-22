import { createApp } from "vue"; // 从vue3开始使用createApp
import App from './App.vue';
import router from '../router'


createApp(App).use(router).mount('#app');
