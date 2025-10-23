# Jnimy-z.github.io
# src下面的目录设计
src/
├── api/ 				    # 接口管理
│   ├── modules/ 		    # 按模块划分的接口
│   └── index.js 		    # 接口统一导出
├── assets/ 			    # 静态资源
│   ├── images/ 		    # 图片
│   ├── icons/ 			    # 图标
│   ├── styles/ 		    # 全局样式
│   └── fonts/ 			    # 字体
├── components/ 		    # 公共组件
│   ├── charts/ 		    # 图表组件（大屏常用）
│   ├── common/ 		    # 通用组件（如按钮、弹窗）
│   └── index.js 		    # 公共组件统一导出
├── composables/ 		    # 组合式函数（Vue 3 的 composables）
│   ├── useChart.js 	    # 图表相关逻辑
│   ├── useRequest.js 	    # 请求相关逻辑
│   └── index.js 		    # 统一导出
├── directives/ 		    # 自定义指令
│   ├── focus.js 		    # 示例指令
│   └── index.js 		    # 统一注册
├── layouts/ 			    # 布局组件
│   ├── default.vue 	    # 默认布局
│   └── screen.vue 		    # 大屏专用布局
├── plugins/ 			    # 插件（如自定义插件）
│   └── echarts.js 		    # ECharts 插件
├── router/ 			    # 路由
│   ├── index.js 		    # 路由入口
│   └── routes/ 		    # 路由模块拆分
├── store/ 				    # 状态管理
│   ├── modules/ 		    # 模块化状态
│   └── index.js 		    # 状态管理入口
├── utils/ 				    # 工具函数
│   ├── request.js 		    # 请求封装
│   ├── common.js 		    # 通用工具
│   └── index.js 		    # 统一导出
├── views/ 				    # 页面级组件
│   ├── screen1/ 		    # 大屏1
│   │   ├── components/     # 大屏1专用组件
│   │   ├── index.vue 	    # 大屏1主页面
│   │   └── utils.js 	    # 大屏1专用工具
│   ├── screen2/ 		    # 大屏2
│   └── ... 			    # 其他页面
├── App.vue 			    # 根组件
├── main.js 			    # 入口文件
└── main.css 			    # 全局样式
