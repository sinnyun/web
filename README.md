# Web Portfolio 项目说明

## 项目概述
这是一个个人作品集展示网站，包含多个项目案例展示页面和作品详情页。项目使用纯静态HTML/CSS/JavaScript构建，已部署在GitHub Pages。

## 项目结构
```
web/
├── .nojekyll - GitHub Pages配置文件
├── 404.html - 404错误页面
├── index.html - 主页面
├── index copy.html - 主页备份
├── menu-panel.html - 菜单面板
├── project-detail.html - 项目详情页
├── projects.html - 项目列表页
├── projects-fenlei.html - 项目分类页
├── 操作须知.txt - 项目操作指南
├── css/ - 样式表目录
│   ├── global.css - 全局样式
│   ├── home.css - 首页样式
│   ├── navbar.css - 导航栏样式
│   ├── projects.css - 项目页样式
│   └── work-detail.css - 作品详情页样式
├── img/ - 图片资源目录
│   ├── audio.mp3 - 背景音频
│   ├── avatar.jpg - 头像
│   ├── favicon.ico - 网站图标
│   ├── logo_h.svg - 水平logo
│   ├── worklist.jpg - 作品列表图
│   ├── 3d/ - 3D作品原始图片
│   │   ├── hangkong/ - 航空项目
│   │   ├── kaiye/ - 开业项目
│   │   └── ...其他3D项目
│   ├── 3d_merged/ - 3D作品合并图片
│   ├── home/ - 首页图片
│   ├── pr/ - 项目原始图片
│   │   ├── 01-qc/ - 项目1
│   │   ├── 02-hh/ - 项目2
│   │   └── ...其他项目
│   ├── pr_merged/ - 项目合并图片
│   └── project1-project6/ - 各项目图片
├── js/ - JavaScript脚本目录
│   ├── audioControl.js - 音频控制
│   ├── imageLoader.js - 图片加载
│   ├── imglist.js - 图片列表
│   ├── main.js - 主逻辑
│   ├── projectsData.js - 项目数据
│   ├── scrollEffects.js - 滚动效果
│   └── seoConfig.js - SEO配置
└── scripts/ - 脚本目录
    └── generateImgList.js - 图片列表生成脚本
```

## 功能特点
1. 响应式设计，适配不同设备
2. 项目图片画廊展示
3. 平滑滚动效果
4. 音频控制功能
5. SEO优化配置

## 部署信息
网站已部署在: https://sinnyun.github.io/web/

## 更新记录
### 2025-06-18
1. 梳理项目结构并更新README文档


已修改global.css文件，恢复了默认滚动条显示并设置了自定义样式：
1. 将滚动条显示设置为block
2. 设置了8px的滚动条宽度
3. 添加了滚动条轨道和滑块的样式
4. 保留了原有的自定义滚动条功能
5. 添加了悬停效果

现在页面将显示标准滚动条，同时保持原有的视觉风格。

已更新global.css文件，为滚动条添加了`cursor: auto !important`样式，确保：
1. 滚动条不再受全局鼠标效果影响
2. 保持原有的滚动条视觉样式
3. 鼠标滑过滚动条时显示默认指针样式
4. 不影响其他元素的鼠标交互效果