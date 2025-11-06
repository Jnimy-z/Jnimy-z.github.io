import { defineConfig } from "vite";
import vue from '@vitejs/plugin-vue'; // 引入插件
import path from 'path'
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
    base: '/',
    plugins: [vue(),
    createSvgIconsPlugin({
        // 指定需要缓存的SVG图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[name]', // 定义SVG符号（symbol）的ID生成规则。[name]代表SVG文件名。例如，src/assets/icons/home.svg 的ID将是 icon-home。
        /**S
         * 自定义插入位置
         * @default: body-last
         */
        // inject: 'body-last',
        /**
         * custom dom id
         * @default: __svg__icons__dom__
         */
        // customDomId: '__svg__icons__dom__',
    }),
    AutoImport({
        resolvers: [ElementPlusResolver()],
    }),
    Components({
        resolvers: [ElementPlusResolver()],
    })
    ], // 将插件添加到 Vite 的 plugins 数组中
    build: {
        outDir: 'dist'
    },
    css: {
        preprocessorOptions: {
            less: {
                math: 'always',
                modifyVars: {
                    hack: `true; @import (reference) "${path.resolve('src/assets/styles/font.css')}";`,
                },
                globalVars: {
                    // 定义全局变量
                },
                javascriptEnabled: true, // 允许 Less JavaScript 代码（一些库需要）
            }
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            'jQuery': 'jquery/dist/jquery.min.js',
            'window.jQuery': 'jquery/dist/jquery.min.js'
        }
    }
})
