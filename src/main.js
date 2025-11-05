import { createApp } from "vue"; // 从vue3开始使用createApp
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import locale from 'element-plus/es/locale/lang/en'; // 引入英文语言包
import App from './App.vue';
import router from '../router'
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon.vue'
import '@/assets/styles/font.css'

let app = createApp(App)
app.component('SvgIcon', SvgIcon)
app.use(router)
app.use(ElementPlus, { locale })
app.mount('#app');