function generateProjectImages(projectId) {
    const baseDir = `./images/project${projectId}`;
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
        
        // 从imglist.js获取图片列表
        const imageFiles = getProjectImages(projectId);
        
        if (imageFiles && imageFiles.length > 0) {
            // 处理每个图片文件
            for (const filename of imageFiles) {
                // 排除banner图片
                if (filename.includes('banner')) continue;
                
                const path = `${baseDir}/${filename}`;
                const { order, layout } = parseLayoutInfo(filename);
                allImages.push({
                    path,
                    order,
                    layout
                });
            }
        } else if (project.imageslist && project.imageslist.length > 0) {
            // 如果imglist.js中没有图片，则使用项目中定义的imageslist作为备选
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
        tags: ["品牌设计", "空间设计", "艺术策划"],
        role: "首席设计师",
        year: "2015",
        backgroundImage: "./images/project1/banner.jpg",
        summary: "中国四川大熊猫国际生态旅游节暨都江堰首届大熊猫生态旅游节开幕式",
        description: "中国四川大熊猫国际生态旅游节暨都江堰首届大熊猫生态旅游节，以\"世界遗产都江堰 熊猫家园欢乐行\"为主题，集公益、文化、旅游为一体，为中外游客带来一系列关于大熊猫文化与都江堰熊猫家族的主题活动。",
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
        tags: ["数字艺术", "艺术策划", "品牌设计"],
        role: "交互设计总监",
        year: "2023",
        backgroundImage: "./images/project2/banner.jpg",
        
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
        tags: ["空间设计", "数字艺术", "艺术策划"],
        role: "创意总监",
        year: "2023",
        backgroundImage: "./images/project3/banner.jpg",
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
        tags: ["空间设计", "数字艺术", "生活美学"],
        role: "设计总监",
        year: "2023",
        backgroundImage: "./images/project4/banner.jpg",
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
        backgroundImage: "./images/project5/banner.jpg",
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
        backgroundImage: "./images/project6/banner.jpg",
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
    },
    {
        id: 7,
        title: "07现代艺术\n博物馆\n数字展厅",
        category: "THE WEBSITE",
        tags: ["数字艺术", "艺术策划", "品牌设计"],
        role: "数字艺术总监",
        year: "2024",
        backgroundImage: "./images/project7/banner.jpg",
        summary: "为现代艺术博物馆打造沉浸式数字展厅，通过先进的多媒体技术重新诠释艺术作品的展示方式。",
        description: "这个项目重新定义了艺术展览的体验方式，通过数字技术将传统艺术作品转化为互动体验。展厅采用最新的投影技术、AR/VR设备和智能交互系统，让观众能够以全新的方式欣赏和理解艺术作品。",
        features: [
            "沉浸式投影系统",
            "AR/VR体验区",
            "智能交互装置",
            "多媒体展示墙"
        ],
        services: [
            "数字展厅设计",
            "交互系统开发",
            "内容制作",
            "技术维护"
        ],
        
        get detailImages() {
            return generateProjectImages(this.id).then(images => images.detail);
        },
        get miniImages() {
            return generateProjectImages(this.id).then(images => images.mini);
        }
    },
    {
        id: 8,
        title: "08生态度假村\n可持续设计\n项目",
        category: "THE LIFESTYLE",
        tags: ["空间设计", "生活美学", "艺术策划"],
        role: "建筑设计师",
        year: "2024",
        backgroundImage: "./images/project8/banner.jpg",
        summary: "打造融合自然与奢华的生态度假村，采用可持续设计理念，为游客提供独特的绿色度假体验。",
        description: "这个生态度假村项目位于风景优美的自然环境中，采用环保材料和可再生能源技术。建筑设计充分尊重当地生态环境，创造出与自然和谐共生的度假空间。",
        features: [
            "绿色建筑设计",
            "可再生能源系统",
            "生态景观设计",
            "环保材料应用"
        ],
        services: [
            "建筑设计",
            "景观规划",
            "可持续发展咨询",
            "项目管理"
        ],
        
        get detailImages() {
            return generateProjectImages(this.id).then(images => images.detail);
        },
        get miniImages() {
            return generateProjectImages(this.id).then(images => images.mini);
        }
    },
    {
        id: 9,
        title: "09科技创新\n企业总部\n设计",
        category: "THE WEBSITE",
        tags: ["空间设计", "品牌设计", "数字艺术"],
        role: "建筑设计总监",
        year: "2024",
        backgroundImage: "./images/project9/banner.jpg",
        summary: "为领先的科技公司设计现代化企业总部，体现创新精神和企业文化，打造激发创造力的工作环境。",
        description: "这个企业总部项目体现了现代科技公司的创新精神和企业文化。建筑设计融合了功能性、美观性和可持续性，为员工创造了一个充满活力的工作环境，同时展示了公司的技术实力和未来愿景。",
        features: [
            "现代化办公空间",
            "创新实验室",
            "员工休闲区",
            "智能建筑系统"
        ],
        services: [
            "建筑设计",
            "室内设计",
            "智能系统集成",
            "项目管理"
        ],
        
        get detailImages() {
            return generateProjectImages(this.id).then(images => images.detail);
        },
        get miniImages() {
            return generateProjectImages(this.id).then(images => images.mini);
        }
    },
    {
        id: 10,
        title: "10文化创意\n产业园区\n规划",
        category: "THE LIFESTYLE",
        tags: ["空间设计", "生活美学", "艺术策划"],
        role: "城市规划师",
        year: "2024",
        backgroundImage: "./images/project10/banner.jpg",
        summary: "规划建设文化创意产业园区，为创意人才提供理想的工作和生活环境，推动文化产业发展。",
        description: "这个文化创意产业园区项目旨在为创意产业提供完整的发展生态系统。园区规划包括创意办公空间、展示中心、休闲设施和生活配套，为创意人才提供理想的工作和生活环境。",
        features: [
            "创意办公空间",
            "文化展示中心",
            "休闲娱乐设施",
            "生活配套服务"
        ],
        services: [
            "园区规划",
            "建筑设计",
            "产业策划",
            "运营管理"
        ],
        
        get detailImages() {
            return generateProjectImages(this.id).then(images => images.detail);
        },
        get miniImages() {
            return generateProjectImages(this.id).then(images => images.mini);
        }
    },
    {
        id: 11,
        title: "11智能医疗\n中心设计\n项目",
        category: "THE WEBSITE",
        tags: ["空间设计", "数字艺术", "生活美学"],
        role: "医疗空间设计师",
        year: "2024",
        backgroundImage: "./images/project11/banner.jpg",
        summary: "设计现代化的智能医疗中心，融合先进医疗技术和人性化设计，为患者提供优质的医疗服务体验。",
        description: "这个智能医疗中心项目将先进的医疗技术与人性化的空间设计相结合。通过智能化的医疗设备和舒适的就医环境，为患者提供高效、便捷、温馨的医疗服务体验。",
        features: [
            "智能医疗设备",
            "人性化空间设计",
            "数字化管理系统",
            "舒适候诊区"
        ],
        services: [
            "医疗空间设计",
            "智能系统集成",
            "设备规划",
            "项目管理"
        ],
        
        get detailImages() {
            return generateProjectImages(this.id).then(images => images.detail);
        },
        get miniImages() {
            return generateProjectImages(this.id).then(images => images.mini);
        }
    },
    {
        id: 12,
        title: "12教育科技\n创新中心\n设计",
        category: "THE WEBSITE",
        tags: ["空间设计", "数字艺术", "品牌设计"],
        role: "教育空间设计师",
        year: "2024",
        backgroundImage: "./images/project12/banner.jpg",
        summary: "打造面向未来的教育科技创新中心，通过先进技术和创新教学方法，重新定义学习体验。",
        description: "这个教育科技创新中心项目旨在通过先进的技术手段和创新教学方法，为学生提供全新的学习体验。中心配备了最新的教育技术设备，包括VR/AR学习系统、智能教室和创客空间。",
        features: [
            "智能教室系统",
            "VR/AR学习设备",
            "创客空间",
            "数字化图书馆"
        ],
        services: [
            "教育空间设计",
            "技术系统集成",
            "教学设备规划",
            "培训服务"
        ],
        
        get detailImages() {
            return generateProjectImages(this.id).then(images => images.detail);
        },
        get miniImages() {
            return generateProjectImages(this.id).then(images => images.mini);
        }
    },
    {
        id: 13,
        title: "13豪华酒店\n品牌设计\n项目",
        category: "THE LIFESTYLE",
        tags: ["空间设计", "品牌设计", "生活美学"],
        role: "酒店设计师",
        year: "2024",
        backgroundImage: "./images/project13/banner.jpg",
        summary: "为顶级酒店品牌打造独特的视觉识别系统，通过设计传达奢华品质和卓越服务理念。",
        description: "这个豪华酒店品牌设计项目涵盖了从视觉识别到空间体验的完整设计体系。通过精心设计的品牌元素和空间布局，为客人提供难忘的奢华体验，同时体现酒店的品牌价值和服务理念。",
        features: [
            "品牌视觉识别",
            "奢华空间设计",
            "个性化服务",
            "艺术装饰"
        ],
        services: [
            "品牌设计",
            "空间设计",
            "视觉传达",
            "品牌策划"
        ],
        
        get detailImages() {
            return generateProjectImages(this.id).then(images => images.detail);
        },
        get miniImages() {
            return generateProjectImages(this.id).then(images => images.mini);
        }
    },
    {
        id: 14,
        title: "14城市公共\n艺术装置\n设计",
        category: "THE LIFESTYLE",
        tags: ["艺术策划", "空间设计", "数字艺术"],
        role: "公共艺术家",
        year: "2024",
        backgroundImage: "./images/project14/banner.jpg",
        summary: "为城市公共空间设计互动艺术装置，通过艺术创作提升城市文化品位，增强市民参与感。",
        description: "这个城市公共艺术装置项目旨在通过艺术创作激活城市公共空间，为市民提供互动体验和文化享受。装置设计融合了艺术性、功能性和互动性，成为城市的文化地标和市民聚集地。",
        features: [
            "互动艺术装置",
            "公共空间设计",
            "文化地标",
            "市民参与"
        ],
        services: [
            "艺术装置设计",
            "公共空间规划",
            "文化策划",
            "项目管理"
        ],
        
        get detailImages() {
            return generateProjectImages(this.id).then(images => images.detail);
        },
        get miniImages() {
            return generateProjectImages(this.id).then(images => images.mini);
        }
    },
    {
        id: 15,
        title: "15可持续\n零售空间\n设计",
        category: "THE LIFESTYLE",
        tags: ["品牌设计", "生活美学", "空间设计"],
        role: "零售空间设计师",
        year: "2024",
        backgroundImage: "./images/project15/banner.jpg",
        summary: "设计环保可持续的零售空间，通过绿色设计理念提升购物体验，同时传递环保价值观。",
        description: "这个可持续零售空间项目将环保理念融入商业空间设计，通过使用环保材料、节能系统和绿色植物，创造出既美观又环保的购物环境。设计旨在提升顾客购物体验的同时，传递可持续发展的价值观。",
        features: [
            "环保材料应用",
            "节能照明系统",
            "绿色植物装饰",
            "可持续展示"
        ],
        services: [
            "零售空间设计",
            "可持续设计咨询",
            "材料选择",
            "项目管理"
        ],
        
        get detailImages() {
            return generateProjectImages(this.id).then(images => images.detail);
        },
        get miniImages() {
            return generateProjectImages(this.id).then(images => images.mini);
        }
    },
    {
        id: 16,
        title: "16数字娱乐\n体验中心\n设计",
        category: "THE WEBSITE",
        tags: ["数字艺术", "艺术策划", "品牌设计"],
        role: "娱乐空间设计师",
        year: "2024",
        backgroundImage: "./images/project16/banner.jpg",
        summary: "打造沉浸式数字娱乐体验中心，通过最新技术和创意设计，为游客提供前所未有的娱乐体验。",
        description: "这个数字娱乐体验中心项目融合了最新的数字技术和创意设计，为游客提供沉浸式的娱乐体验。中心配备了VR游戏、互动影院、数字艺术展览等多种娱乐设施，让游客在虚拟与现实之间自由切换。",
        features: [
            "VR游戏体验",
            "互动影院",
            "数字艺术展览",
            "沉浸式体验"
        ],
        services: [
            "娱乐空间设计",
            "数字技术集成",
            "内容制作",
            "运营管理"
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

