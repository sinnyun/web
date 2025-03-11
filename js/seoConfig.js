// SEO配置
const defaultConfig = {
    title: 'sinnyun - 个人小站',
    description: '这是sinnyun的个人小站，在这里，你将获得关于sinnyun的一些个人信息及动态!',
    keywords: 'sinnyun,罗祥云,罗祥云的网站,sinnyun的网站,平面设计师sinnyun,祥云,sinnyun 祥云',
    author: 'sinnyun',
    email: 'l616631804@gmail.com',
    language: 'zh-CN',
    themeColor: '#000000', // TODO: 需要更新为个人品牌色
    favicon: '/img/favicon.ico',
    ogImage: '/img/og-image.jpg', // TODO: 需要更新为个人品牌图片
    baseUrl: 'http://www.sinnyun.com'
};

const pageConfigs = {
    home: {
        title: 'sinnyun - 个人小站 | 首页',
        description: '欢迎来到sinnyun的个人小站，这里有关于sinnyun的最新动态、作品展示和个人分享。',
        keywords: 'sinnyun,个人主页,设计师,sinnyun作品,sinnyun博客',
        canonical: '/',
        ogType: 'website'
    },
    projects: {
        title: 'sinnyun - 作品展示 | 个人作品集', // TODO: 需要根据实际作品类型调整
        description: '浏览sinnyun的作品集，展示个人在设计领域的创意成果和专业能力。', // TODO: 需要根据实际作品类型调整
        keywords: 'sinnyun作品,设计作品,作品集,个人项目', // TODO: 需要根据实际作品类型调整
        canonical: '/projects',
        ogType: 'website'
    },
    projectDetail: {
        titleTemplate: '${title} | sinnyun作品展示', // 添加标题模板
        title: '', // 将由具体项目填充
        description: '', // 将由具体项目填充
        keywords: '', // 将由具体项目填充
        canonical: '/project/${id}',
        ogType: 'article'
    }
};

// 应用SEO配置
function applySEO(page, customConfig = {}) {
    const config = { ...defaultConfig, ...pageConfigs[page], ...customConfig };
    
    // 处理项目详情页的特殊标题模板
    if (page === 'projectDetail' && config.titleTemplate && config.title) {
        config.title = config.titleTemplate.replace('${title}', config.title);
    }
    
    // 基础meta标签
    document.title = config.title;
    updateMetaTag('description', config.description);
    updateMetaTag('keywords', config.keywords);
    updateMetaTag('author', config.author);
    updateMetaTag('theme-color', config.themeColor);
    
    // Open Graph标签
    updateMetaTag('og:title', config.title);
    updateMetaTag('og:description', config.description);
    updateMetaTag('og:type', config.ogType || 'website');
    updateMetaTag('og:image', config.baseUrl + (config.ogImage || defaultConfig.ogImage));
    updateMetaTag('og:url', config.baseUrl + (config.canonical || ''));
    updateMetaTag('og:site_name', 'sinnyun');
    updateMetaTag('og:locale', 'zh_CN');
    
    // 其他重要标签
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('googlebot', 'index, follow');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    updateMetaTag('format-detection', 'telephone=no');
    updateMetaTag('mobile-web-app-capable', 'yes');
    updateMetaTag('apple-mobile-web-app-capable', 'yes');
    updateMetaTag('apple-mobile-web-app-status-bar-style', 'black');
    updateMetaTag('apple-mobile-web-app-title', 'sinnyun');
    
    // 更新favicon
    updateLink('icon', config.favicon);
    updateLink('shortcut icon', config.favicon);
    updateLink('apple-touch-icon', config.favicon);
    
    // 更新canonical链接
    updateLink('canonical', config.baseUrl + (config.canonical || ''));
    
    // 添加结构化数据
    addStructuredData(page, config);
}

// 更新meta标签
function updateMetaTag(name, content) {
    if (!content) return;
    
    let meta = document.querySelector(`meta[name="${name}"]`) || 
               document.querySelector(`meta[property="${name}"]`);
               
    if (!meta) {
        meta = document.createElement('meta');
        if (name.startsWith('og:')) {
            meta.setAttribute('property', name);
        } else {
            meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
    }
    
    meta.setAttribute('content', content);
}

// 更新link标签
function updateLink(rel, href) {
    if (!href) return;
    
    let link = document.querySelector(`link[rel="${rel}"]`);
    if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
    }
    
    link.setAttribute('href', href);
}

// 添加结构化数据
function addStructuredData(page, config) {
    let structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "sinnyun",
        "email": "l616631804@gmail.com",
        "url": config.baseUrl,
        "image": config.baseUrl + "/img/avatar.jpg", // TODO: 需要确认头像图片路径
        "description": defaultConfig.description,
        "sameAs": [] // TODO: 后续添加社交媒体链接，如：微博、知乎、Behance等
    };
    
    if (page === 'projectDetail') {
        structuredData = {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "name": config.title,
            "description": config.description,
            "image": config.baseUrl + (config.ogImage || defaultConfig.ogImage),
            "author": {
                "@type": "Person",
                "name": "sinnyun",
                "email": "l616631804@gmail.com"
            },
            "datePublished": new Date().toISOString()
        };
    }
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
}
