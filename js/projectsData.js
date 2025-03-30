// 辅助函数：生成项目图片路径
function generateProjectImages(projectId) {
    const baseDir = `./img/project${projectId}`;
    const images = {
        detail: [],
        mini: []
    };

    // 检查图片是否存在的函数
    function checkImageExists(url) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
        });
    }

    // 解析文件名获取布局信息
    function parseLayoutInfo(filename) {
        const parts = filename.split(/[_.]/); // 分割文件名和扩展名
        const order = parseInt(parts[0]);
        const layout = parts.length > 1 ? parseInt(parts[1]) : 1; // 默认为1栏布局
        return { order, layout };
    }

    // 异步加载所有图片
    async function loadImages() {
        const formats = ['jpg', 'png'];
        const allImages = [];
        
        // 检查所有可能的图片
        for (let i = 1; i <= 20; i++) { // 扩展到最多50张图片
            for (let j = 1; j <= 3; j++) { // 1-3栏布局
                for (const format of formats) {
                    const filename = `${i}_${j}.${format}`;
                    const path = `${baseDir}/${filename}`;
                    const exists = await checkImageExists(path);
                    if (exists) {
                        const { order, layout } = parseLayoutInfo(filename);
                        allImages.push({
                            path,
                            order,
                            layout
                        });
                        break;
                    }
                }
            }
        }

        // 按order排序
        allImages.sort((a, b) => a.order - b.order);
        
        return {
            detail: allImages.filter(img => !img.path.includes('/m')),
            mini: allImages.filter(img => img.path.includes('/m'))
        };
    }

    return loadImages();
}

const projects = [
    {
        id: 1,
        title: "Club Raia\n奢华休闲\n会所",
        category: "THE WEBSITE",
        tags: ["品牌设计", "UI设计", "空间设计"],
        role: "首席设计师",
        year: "2023",
        backgroundImage: "./img/project1/banner.jpg",
        summary: "受Art Deco风格启发，Club Raia将优雅与现代完美融合。从音乐、美酒到雪茄，我们精心打造的休闲空间让时光放慢脚步，让故事徐徐展开。",
        description: "Club Raia是一个融合了Art Deco风格的现代休闲会所。我们在设计中注重细节，将奢华元素与功能性完美结合。空间布局经过精心规划，满足了不同场景的需求，让会员能够在此享受高品质的休闲时光。",
        features: [
            "Art Deco风格室内设计",
            "私密会员区域",
            "品酒区",
            "雪茄房"
        ],
        services: [
            "会籍服务",
            "私人活动策划",
            "品酒会",
            "雪茄品鉴"
        ],
        get detailImages() {
            return generateProjectImages(this.id).then(images => images.detail);
        },
        get miniImages() {
            return generateProjectImages(this.id).then(images => images.mini);
        }
    },
    {
        id: 2,
        title: "格力\n经销商大会",
        category: "THE WEBSITE",
        tags: ["交互设计", "数字艺术", "体验设计"],
        role: "交互设计总监",
        year: "2023",
        backgroundImage: "./img/project2/banner.jpg",
        summary: "突破传统展览形式，创造沉浸式数字艺术体验。通过先进技术与艺术的结合，为观众带来前所未有的视觉盛宴。",
        description: "这是一个革命性的数字艺术项目，融合了最新的交互技术和艺术创作。我们创造了一个能让观众真正参与其中的艺术空间，每个展品都是独特的交互体验。",
        features: [
            "沉浸式体验",
            "互动装置",
            "数字艺术",
            "声光电效果"
        ],
        services: [
            "展览策划",
            "互动设计",
            "技术展示",
            "艺术教育"
        ],
        get detailImages() {
            return generateProjectImages(this.id).then(images => images.detail);
        },
        get miniImages() {
            return generateProjectImages(this.id).then(images => images.mini);
        }
    },
    {
        id: 3,
        title: "智慧城市\n规划展示\n中心",
        category: "THE WEBSITE",
        tags: ["空间设计", "数字展示", "互动体验"],
        role: "创意总监",
        year: "2023",
        backgroundImage: "./img/project3/banner.jpg",
        summary: "融合数字技术与城市规划，打造智慧城市的未来蓝图展示空间。通过互动技术，让市民直观体验城市发展愿景。",
        description: "智慧城市规划展示中心是一个综合性的城市规划展示空间，通过先进的数字技术和互动装置，展现城市未来发展蓝图。项目融合了多媒体展示、VR体验等多种展示手段。",
        features: [
            "智能展示系统",
            "互动体验区",
            "数据可视化",
            "VR体验"
        ],
        services: [
            "展览设计",
            "互动设计",
            "数据分析",
            "决策支持"
        ],
        get detailImages() {
            return generateProjectImages(this.id).then(images => images.detail);
        },
        get miniImages() {
            return generateProjectImages(this.id).then(images => images.mini);
        }
    },
    {
        id: 4,
        title: "未来办公\n智能空间\n设计",
        category: "THE WEBSITE",
        tags: ["空间设计", "智能系统", "办公体验"],
        role: "设计总监",
        year: "2023",
        backgroundImage: "./img/project4/banner.jpg",
        summary: "重新定义现代办公空间，将科技、健康与效率完美结合，打造充满活力的未来工作环境。",
        description: "这是一个面向未来的办公空间设计项目，融合了智能办公系统、人体工学设计和环保理念。项目致力于创造一个促进协作、提升效率的现代化办公环境。",
        features: [
            "智能办公系统",
            "人体工学设计",
            "协作空间",
            "环保理念"
        ],
        services: [
            "空间规划",
            "系统集成",
            "绿色认证",
            "员工培训"
        ],
        get detailImages() {
            return generateProjectImages(this.id).then(images => images.detail);
        },
        get miniImages() {
            return generateProjectImages(this.id).then(images => images.mini);
        }
    },
    {
        id: 5,
        title: "艺术生活馆\n美学空间\n设计",
        category: "THE LIFESTYLE",
        tags: ["空间设计", "艺术策划", "生活美学"],
        role: "艺术总监",
        year: "2023",
        backgroundImage: "./img/project5/banner.jpg",
        summary: "将艺术融入生活，打造集展览、交流、创作于一体的多功能艺术空间，为城市注入文化活力。",
        description: "艺术生活馆是一个多元化的文化空间，通过艺术展览、工作坊和文化活动，为城市居民提供一个探索艺术、体验生活美学的场所。",
        features: [
            "艺术展览空间",
            "创意工作室",
            "艺术图书馆",
            "多功能活动区"
        ],
        services: [
            "艺术展览",
            "创作工作坊",
            "文化沙龙",
            "艺术教育"
        ],
        get detailImages() {
            return generateProjectImages(this.id).then(images => images.detail);
        },
        get miniImages() {
            return generateProjectImages(this.id).then(images => images.mini);
        }
    },
    {
        id: 6,
        title: "06社会环境卡\n蜀道难報導從客戶",
        category: "THE LIFESTYLE",
        tags: ["空间设计", "艺术策划", "生活美学"],
        role: "艺术总监",
        year: "2023",
        backgroundImage: "./img/project6/banner.jpg",
        summary: "将艺术融入生活，打造集展览、交流、创作于一体的多功能艺术空间，为城市注入文化活力。",
        description: "艺术生活馆是一个多元化的文化空间，通过艺术展览、工作坊和文化活动，为城市居民提供一个探索艺术、体验生活美学的场所。项目融合了现代设计语言和传统文化元素，创造出独特的空间体验。",
        features: [
            "大型展览空间",
            "互动体验区",
            "艺术沙龙区",
            "创意工作室"
        ],
        services: [
            "艺术展览策划",
            "空间设计",
            "活动策划",
            "艺术教育"
        ],
        get detailImages() {
            return generateProjectImages(this.id).then(images => images.detail);
        },
        get miniImages() {
            return generateProjectImages(this.id).then(images => images.mini);
        }
    }
];

// 根据ID获取项目
function getProjectById(id) {
    return projects.find(p => p.id === id);
}

// 获取项目在数组中的索引
function getProjectIndex(id) {
    return projects.findIndex(p => p.id === id);
}

async function loadProjectImages() {
    try {
        // 设置背景图片（优先加载）
        const bannerImage = document.getElementById('project-banner-image');
        bannerImage.style.backgroundImage = `url('${project.backgroundImage}')`;

        const imagesContainer = document.querySelector('.work-images');
        imagesContainer.innerHTML = '';

        // 加载详细图片（使用懒加载）
        const detailImages = await project.detailImages;
        if (detailImages && detailImages.length > 0) {
            // 添加图片加载队列控制
            const loadQueue = [];
            detailImages.forEach((image, index) => {
                loadQueue.push({
                    path: image.path,
                    priority: index < 3 // 前3张高优先级
                });
            });
            
            // 初始化懒加载观察器
            initLazyLoad();
        }
    } catch (error) {
        console.error('Error loading images:', error);
    }
}

function initLazyLoad() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target.querySelector('.lazy-image');
                if (img && img.dataset.src && !img.src) {
                    img.src = img.dataset.src; // ✅ 滚动到视口才加载
                    img.onload = () => {
                        entry.target.classList.remove('loading');
                        entry.target.classList.add('loaded');
                    };
                }
                observer.unobserve(entry.target);
            }
        });
    }, { 
        rootMargin: '200px',
        threshold: 0.01 
    });

    // 观察所有图片容器
    document.querySelectorAll('.image-container').forEach(container => {
        observer.observe(container); 
    });
}

detailImages.forEach((image, index) => {
    const imgContainer = document.createElement('div');
    imgContainer.className = `image-container layout-${image.layout} loading`;
    
    const img = document.createElement('img');
    img.className = 'lazy-image';
    img.dataset.src = image.path; // ✅ 使用data-src
    img.loading = "lazy"; // 原生懒加载支持
    img.alt = project.title;
    
    imgContainer.appendChild(img);
    imagesContainer.appendChild(imgContainer);
});