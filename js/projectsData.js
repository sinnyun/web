function generateProjectImages(projectId) {
    const baseDir = `./img/project${projectId}`;
    const project = getProjectById(projectId);
    
    // 解析文件名获取布局信息
    function parseLayoutInfo(filename) {
        const parts = filename.split(/[_.]/); // 分割文件名和扩展名
        const order = parseInt(parts[0]);
        const layout = parts.length > 1 ? parseInt(parts[1]) : 1; // 默认为1栏布局
        return { order, layout };
    }

    // 异步加载所有图片
    async function loadImages() {
        const allImages = [];
        
        // 直接从项目的imageslist加载图片
        if (project.imageslist && project.imageslist.length > 0) {
            for (const filename of project.imageslist) {
                const path = `${baseDir}/${filename}`;
                const { order, layout } = parseLayoutInfo(filename);
                allImages.push({
                    path,
                    order,
                    layout
                });
            }
        }

        // 按order排序
        allImages.sort((a, b) => a.order - b.order);
        
        // 返回所有图片，不再区分detail和mini
        return {
            detail: allImages,
            mini: [] // 保留mini属性但为空数组，以保持兼容性
        };
    }

    return loadImages();
}

const projects = [
    {
        id: 1,
        title: "都江堰\n首届\n熊猫旅游-网站建设中占位展示",
        category: "活动全案",
        tags: ["品牌设计", "UI设计", "空间设计"],
        role: "首席设计师",
        year: "2015",
        backgroundImage: "./img/project1/banner.jpg",
        summary: "中国四川大熊猫国际生态旅游节暨都江堰首届大熊猫生态旅游节开幕式",
        description: "中国四川大熊猫国际生态旅游节暨都江堰首届大熊猫生态旅游节，以“世界遗产都江堰 熊猫家园欢乐行”为主题，集公益、文化、旅游为一体，为中外游客带来一系列关于大熊猫文化与都江堰熊猫家族的主题活动。",
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

        //图片清单
        imageslist: [
            "0.jpg",
            "1_1.jpg", "1_2.jpg", "2_2.jpg", "3_3.jpg", "4_3.jpg", "5_3.jpg",
            "6_2.png", "7_2.png", "8_1.png", "9_3.jpg", 
            "10_3.jpg", "11_3.jpg", "12_3.jpg", "13_3.jpg", "14_3.jpg", "15_2.jpg", "16_2.jpg"
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
        
        //图片清单
        imageslist: [
            "0.jpg",
            "1_2.jpg", "2_2.jpg", "3_1.jpg", "4_1.jpg", "5_1.jpg",
            "6_3.jpg", "7_3.jpg", "8_3.jpg", "9_1.jpg"
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
        
        //图片清单
        imageslist: [
            "0.jpg",
            "1_1.jpg", "2_2.jpg", "3_2.jpg", "4_1.jpg",
            "5_3.jpg", "6_3.jpg", "7_3.jpg", "8_3.jpg", "9_3.jpg", "10_3.jpg"
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
        
        //图片清单
        imageslist: [
            "0.jpg",
            "1_1.jpg", "2_2.jpg", "3_2.jpg", "4_1.jpg", "5_1.jpg",
            "6_1.jpg", "7_1.jpg", "8_1.jpg", "9_1.jpg", "10_1.jpg", "11_1.jpg"
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
        
        //图片清单
        imageslist: [
            "0.jpg",
            "1_1.jpg", "2_2.jpg", "3_2.jpg", "4_1.jpg", "5_1.jpg", "6_2.jpg", "7_2.jpg",
            "8_1.jpg", "9_1.jpg", "10_1.jpg", "11_1.jpg", "12_1.jpg", "13_1.jpg"
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
        
        //图片清单
        imageslist: [
            "0.jpg",
            "1_1.jpg", "2_2.jpg", "3_2.jpg", "4_1.jpg",
            "5_1.jpg", "6_1.jpg", "7_1.jpg", "8_1.jpg", "9_1.jpg", "10_1.jpg", 
            "11_1.jpg", "12_1.jpg", "13_1.jpg", "14_1.jpg", "15_1.jpg", "16_1.jpg"
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

// 图片加载相关功能已移至 imageLoader.js

