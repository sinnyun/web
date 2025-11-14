# Sinnyun Web Portfolio

这是一个使用现代Web技术构建的个人作品集网站，具有流畅的页面过渡效果和优雅的用户界面。网站采用纯前端实现，通过精心的动画和交互设计，为访问者提供沉浸式的浏览体验。

项目概述

本项目是一个个人作品展示网站，采用纯前端技术（HTML、CSS、JavaScript）实现，主要功能包括：

主要文件	作用
index.html	主页，展示个人简介、项目预览、导航等。
menu-panel.html	侧边菜单面板，包含个人信息、技能、联系方式。
js/main.js	页面交互逻辑：菜单展开/收起、鼠标自定义光标、页面滚动动画、Barba.js 页面切换等。
js/projectsData.js	项目数据结构，包含 16 个项目的基本信息、图片路径、标签等。
js/imageLoader.js	负责异步加载项目图片。
js/pageTransitions.js	Barba.js 页面切换动画。
css/	样式文件，分别负责全局样式、导航栏、主页、项目列表等。
images/	所有图片资源，按项目分文件夹存放。
package.json	依赖声明（Barba、GSAP、Sass 等），但项目已移除构建工具，直接使用源文件。


## 主要特性

- 流畅的页面过渡动画（使用Barba.js和GSAP）
- 响应式设计，适配各种设备
- 项目作品分类过滤系统
- 图片预加载和懒加载优化
- 自定义鼠标效果
- 背景音乐控制 (如果存在)
- SEO优化 (如果存在)
- 图片缩略图导航
- 平滑滚动效果

## 项目结构

```
sinnyun_web/
├── css/                    # CSS样式文件目录
│   ├── category.css        # 分类页面样式
│   ├── global.css         # 全局样式定义
│   ├── main.css          # 主要样式文件
│   ├── navbar.css        # 导航栏样式
│   └── projects.css      # 项目展示页面样式
├── js/                     # JavaScript文件目录
│   ├── about.js           # 关于页面相关功能
│   ├── main.js           # 主要JavaScript逻辑
│   ├── overlayEnter.js   # 入场动画效果
│   ├── pageTransitions.js # 页面过渡效果
│   ├── projectsData.js   # 项目数据管理
│   ├── scrollEffects.js  # 滚动效果
│   └── work.js           # 作品展示相关功能
├── images/                 # 图片资源目录
│   ├── project1-16/      # 项目图片子目录 (例如 project1/, project2/...)
│   ├── home_*.jpg        # 首页轮播图片
│   ├── avatar.jpg        # 头像图片
│   ├── logo_h.svg        # 网站logo
│   └── fav.ico          # 网站图标
├── fonts/                  # 字体文件目录
│   └── s.woff2           # 自定义字体文件
├── scripts/               # 工具脚本目录
│   └── generateImgList.js # 图片列表生成脚本
├── .gitignore             # Git忽略文件配置
└── *.html                 # HTML页面文件 (index.html, 01.html, 02.html, projects.html, project_category.html, menu-panel.html)
```

## 技术栈

### 核心技术
- 原生JavaScript（ES6+）
- GSAP（GreenSock Animation Platform）用于高性能动画
- Barba.js 用于页面过渡
- CSS3 动画和过渡效果

### 依赖库
- GSAP 3.11.4
- Barba.js Core
- Font Awesome 5.15.4

## 页面说明

### 首页 (index.html)
- 全屏展示设计
- 平滑的入场动画
- 背景音乐控制 (如果存在)
- 自定义鼠标效果

### 项目分类页 (project_category.html)
- 动态项目过滤系统
- 分类标签筛选
- 平滑的过滤动画效果
- 响应式网格布局

### 项目详情页 (projects.html)
- 详细的项目信息展示
- 图片预览功能
- 缩略图导航系统
- 项目间导航
- 滚动触发动画

### 菜单面板 (menu-panel.html)
- 网站导航菜单的独立HTML文件，通过JavaScript动态加载或控制显示。

### 其他页面 (01.html, 02.html 等)
- 用于特定内容展示或测试的独立页面。

## 主要功能实现

### 页面过渡
使用Barba.js和GSAP实现流畅的页面过渡效果：
- 红色遮罩过渡动画
- 内容淡入淡出效果
- 平滑的页面切换
- 相关文件: [`js/pageTransitions.js`](js/pageTransitions.js)

### 图片管理
- 项目图片通过 `images/projectX/` 目录组织。
- [`scripts/generateImgList.js`](scripts/generateImgList.js) 用于生成图片列表。
- 相关文件: [`js/projectsData.js`](js/projectsData.js) (可能包含图片数据引用)

### 交互设计
- 自定义鼠标跟随效果
- 平滑滚动动画
- 悬停效果
- 响应式导航菜单
- 相关文件: [`js/scrollEffects.js`](js/scrollEffects.js), [`js/overlayEnter.js`](js/overlayEnter.js), [`js/main.js`](js/main.js), [`js/about.js`](js/about.js), [`js/work.js`](js/work.js)

### 项目数据管理
- 项目的详细数据和分类信息集中管理。
- 相关文件: [`js/projectsData.js`](js/projectsData.js)

### 全局逻辑与入口
- 网站的主要逻辑和初始化。
- 相关文件: [`js/main.js`](js/main.js)

## 运行项目

1. 克隆项目到本地
```bash
git clone [repository-url]
```

2. 使用本地服务器运行项目（推荐使用Live Server）
```bash
# 如果使用VS Code
1. 安装"Live Server"扩展
2. 右键index.html选择"Open with Live Server"
```

3. 或使用任何HTTP服务器
```bash
# 使用Python的简单HTTP服务器
python -m http.server 8000
```

## 开发指南

### 添加新项目
1. 在[`js/projectsData.js`](js/projectsData.js)中添加项目数据
2. 在`images/`目录下创建项目图片目录
3. 更新图片列表 (如果需要，可能通过运行 `scripts/generateImgList.js` 生成)

### 修改样式
- 全局样式在[`css/global.css`](css/global.css)
- 组件样式在各自的CSS文件中 (例如 [`css/category.css`](css/category.css), [`css/projects.css`](css/projects.css) 等)
- 使用CSS变量实现主题定制

### 添加新页面
1. 创建新的HTML文件
2. 在[`js/pageTransitions.js`](js/pageTransitions.js)中添加过渡配置
3. 更新导航链接

## 注意事项

- 确保服务器支持.woff2字体文件
- 图片资源较大，建议进行适当压缩
- 保持JavaScript模块化组织
- 遵循CSS命名规范
- 定期更新依赖库版本

## 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 性能优化

- 使用.woff2格式字体文件
- 图片懒加载
- CSS和JavaScript模块化
- 动画性能优化
- 资源预加载策略

## 贡献指南

1. Fork 项目
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 提交Pull Request

## 许可证

MIT License