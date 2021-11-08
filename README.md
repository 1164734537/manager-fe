# Vue 3 + Vite
## 项目目录设计
manager-fe  项目
  dist    打包生成目录
  node_modules 模块依赖
	public 存放静态资源
	src    源码区
        api     管理接口
        assets  静态资源
        components 公用组件
        config  配置文件
        router  路由设置
        store   vueX
        utils   通用工具函数
        views   页面级别组件
        App.vue vue主入口文件
        main.js 羡慕入口文件
	.gitignore git忽略
	.env.dev   开发环境配置
	.env.test   测试环境配置
	.env.prod   生产环境配置
	index.html  html页面入口
	package.json    依赖包管理
	vite.config.js  vite配置管理

