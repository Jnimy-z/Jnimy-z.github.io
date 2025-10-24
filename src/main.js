import { createApp } from "vue"; // 从vue3开始使用createApp
import App from './App.vue';
import router from '../router'
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon.vue'
import '@/assets/styles/font.css'

let app = createApp(App)
app.component('SvgIcon', SvgIcon)
app.use(router).mount('#app');