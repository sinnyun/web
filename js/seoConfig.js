// SEO配置
const defaultConfig = {
    title: 'sinnyun - 个人小站',
    description: '这是sinnyun的个人小站，在这里，你将获得关于sinnyun的一些个人信息及动态!',
    keywords: 'sinnyun,罗祥云,罗祥云的网站,sinnyun的网站,平面设计师sinnyun,祥云,sinnyun 祥云',
    author: 'sinnyun',
    email: 'l616631804@gmail.com',
    language: 'zh-CN',
    themeColor: '#3498db', // 更新为更通用的蓝色，可根据实际品牌色调整
    favicon: '/images/favicon.ico',
    ogImage: '/images/og-image.jpg', // 默认的Open Graph图片
    baseUrl: 'https://sinnyun.github.io/web', // 更新为实际部署的URL
    twitterUsername: '@sinnyun', // 添加Twitter用户名
    siteName: 'sinnyun 个人作品集' // 添加网站名称
};

const pageConfigs = {
    home: {
        title: 'sinnyun - 个人小站 | 首页',
        description: '欢迎来到sinnyun的个人小站，这里有关于sinnyun的最新动态、作品展示和个人分享。',
        keywords: 'sinnyun,个人主页,设计师,sinnyun作品,sinnyun博客,UI设计,平面设计,创意设计',
        canonical: '/',
        ogType: 'website'
    },
    projects: {
        title: 'sinnyun - 作品展示 | 个人作品集',
        description: '浏览sinnyun的作品集，展示个人在设计领域的创意成果和专业能力。包含UI设计、平面设计、空间设计等多种类型作品。',
        keywords: 'sinnyun作品,设计作品,作品集,个人项目,UI设计,平面设计,空间设计,创意设计',
        canonical: '/projects',
        ogType: 'website'
    },
    projectDetail: {
        titleTemplate: '${title} | sinnyun作品展示',
        title: '', // 将由具体项目填充
        description: '', // 将由具体项目填充
        keywords: '', // 将由具体项目填充
        canonical: '/project/${id}',
        ogType: 'article'
    },
    // 添加404页面的SEO配置
    notFound: {
        title: '404 - 页面未找到 | sinnyun',
        description: '抱歉，您访问的页面不存在。请返回首页或浏览其他内容。',
        keywords: 'sinnyun,404,页面未找到',
        canonical: '/404.html',
        ogType: 'website'
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
    updateMetaTag('og:site_name', config.siteName || 'sinnyun');
    updateMetaTag('og:locale', 'zh_CN');
    
    // Twitter Card 标签
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:site', config.twitterUsername || defaultConfig.twitterUsername);
    updateMetaTag('twitter:title', config.title);
    updateMetaTag('twitter:description', config.description);
    updateMetaTag('twitter:image', config.baseUrl + (config.ogImage || defaultConfig.ogImage));
    
    // 其他重要标签
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('googlebot', 'index, follow');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    updateMetaTag('format-detection', 'telephone=no');
    updateMetaTag('mobile-web-app-capable', 'yes');
    updateMetaTag('apple-mobile-web-app-capable', 'yes');
    updateMetaTag('apple-mobile-web-app-status-bar-style', 'black');
    updateMetaTag('apple-mobile-web-app-title', config.siteName || 'sinnyun');
    
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
        } else if (name.startsWith('twitter:')) {
            meta.setAttribute('name', name);
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
    // 移除之前的结构化数据
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => script.remove());
    
    let structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "sinnyun",
        "email": "l616631804@gmail.com",
        "url": config.baseUrl,
        "image": config.baseUrl + "/images/avatar.jpg",
        "description": defaultConfig.description,
        "sameAs": [
            "https://www.behance.net/sinnyun", // 添加实际的社交媒体链接
            "https://dribbble.com/sinnyun",
            "https://www.instagram.com/sinnyun/"
        ]
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
                "email": "l616631804@gmail.com",
                "url": config.baseUrl
            },
            "datePublished": new Date().toISOString(),
            "keywords": config.keywords
        };
    } else if (page === 'projects') {
        // 为作品集页面添加特定的结构化数据
        structuredData = {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": config.title,
            "description": config.description,
            "url": config.baseUrl + config.canonical,
            "author": {
                "@type": "Person",
                "name": "sinnyun",
                "url": config.baseUrl
            }
        };
    } else if (page === 'home') {
        // 为首页添加WebSite结构化数据
        structuredData = {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": config.siteName || defaultConfig.siteName,
            "url": config.baseUrl,
            "potentialAction": {
                "@type": "SearchAction",
                "target": config.baseUrl + "/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
            }
        };
    }
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
}

// 添加网站地图生成函数
function generateSitemap() {
    // 此函数可以在构建时使用，生成sitemap.xml文件
    // 这里只是示例，实际实现需要根据构建工具调整
    console.log('生成网站地图...');
}

// 导出函数
window.applySEO = applySEO;
