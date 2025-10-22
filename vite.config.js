import { defineConfig } from "vite";
import vue from '@vitejs/plugin-vue'; // 引入插件

export default defineConfig({
    base: '/',
    plugins: [vue()], // 将插件添加到 Vite 的 plugins 数组中
    build: {
        outDir: 'dist'
    }
})
