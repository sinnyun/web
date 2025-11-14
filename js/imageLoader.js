/**
 * 项目图片加载模块
 * 负责处理项目详情页的图片加载、布局和动画效果
 */

/**
 * 加载项目图片
 * @param {number} projectId - 项目ID
 * @returns {Promise} - 返回加载图片的Promise
 */
async function loadProjectImages() {
    try {
        // 从URL获取当前项目ID
        const urlParams = new URLSearchParams(window.location.search);
        const projectId = parseInt(urlParams.get('id'));
        const project = getProjectById(projectId);
        
        if (!project) return;

        // 加载背景图
        loadBannerImage(projectId, project);

        // 加载详细图片
        await loadDetailImages(project);

        // 加载小图网格
        await loadMiniImages(project);
    } catch (error) {
        console.error('Error loading images:', error);
    }
}

/**
 * 加载项目背景图
 * @param {number} projectId - 项目ID
 * @param {Object} project - 项目对象
 */
function loadBannerImage(projectId, project) {
    const bannerImage = document.getElementById('project-banner-image');
    if (!bannerImage) return;
    
    // 尝试加载0.jpg作为背景图，如果不存在则尝试1_1.jpg，最后使用默认背景图
    const bannerImagePath = `./images/project${projectId}/0.jpg`;
    const fallbackImagePath = `./images/project${projectId}/1_1.jpg`;
    
    // 添加图片加载检查，确保图片存在
    const testImg = new Image();
    testImg.onload = function() {
        console.log('成功加载背景图片:', bannerImagePath);
        bannerImage.style.backgroundImage = `url('${bannerImagePath}')`;
    };
    testImg.onerror = function() {
        console.warn('无法加载0.jpg，尝试加载1_1.jpg');
        // 尝试加载备用图片
        const fallbackImg = new Image();
        fallbackImg.onload = function() {
            console.log('成功加载备用背景图片:', fallbackImagePath);
            bannerImage.style.backgroundImage = `url('${fallbackImagePath}')`;
        };
        fallbackImg.onerror = function() {
            console.warn('无法加载备用图片，使用默认背景图');
            bannerImage.style.backgroundImage = `url('${project.backgroundImage}')`;
        };
        fallbackImg.src = fallbackImagePath;
    };
    testImg.src = bannerImagePath;
}

/**
 * 加载项目详细图片
 * @param {Object} project - 项目对象
 * @returns {Promise} - 返回加载图片的Promise
 */
async function loadDetailImages(project) {
    const imagesContainer = document.querySelector('.work-images');
    if (!imagesContainer) return;
    
    imagesContainer.innerHTML = ''; // 清空容器

    // 加载详细图片
    const detailImages = await project.detailImages;
    if (!detailImages || detailImages.length === 0) return;

    // 创建图片分组容器
    let currentGroup = null;
    let currentLayout = null;
    
    detailImages.forEach((image, index) => {
        // 如果布局变化或第一张图片，创建新分组
        if (image.layout !== currentLayout || index === 0) {
            currentLayout = image.layout;
            currentGroup = document.createElement('div');
            currentGroup.className = `image-group layout-${currentLayout}`;
            imagesContainer.appendChild(currentGroup);
        }

        const imageDiv = document.createElement('div');
        imageDiv.className = `work-image layout-${currentLayout}`;
        imageDiv.id = `img-anchor-${index}`; // 添加唯一id
        
        // 不再需要添加延迟类，GSAP的stagger功能会处理动画延迟
        
        // 替换为懒加载实现
        const img = document.createElement('img');
        img.dataset.src = image.path;
        img.loading = "lazy";
        img.alt = project.title;
        
        img.onerror = () => {
            imageDiv.style.display = 'none';
        };
        
        imageDiv.appendChild(img);
        currentGroup.appendChild(imageDiv);
    });
    
    if (typeof initScrollEffects === 'function') {
        setTimeout(initScrollEffects, 500);
    }
    if (typeof initLazyLoad === 'function') {
        setTimeout(initLazyLoad, 100);
    }
}

/**
 * 加载项目小图网格
 * @param {Object} project - 项目对象
 * @returns {Promise} - 返回加载图片的Promise
 */
async function loadMiniImages(project) {
    const gridImagesContainer = document.getElementById('work-images-grid');
    if (!gridImagesContainer) return;

    // 加载小图网格
    const miniImages = await project.miniImages;
    if (!miniImages || miniImages.length === 0) return;

    miniImages.forEach(imagePath => {
        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = project.title;
        
        // 添加图片加载错误处理
        img.onerror = () => {
            img.style.display = 'none';
        };
        
        gridImagesContainer.appendChild(img);
    });

    // 根据图片数量调整网格布局
    const columnCount = miniImages.length <= 3 ? miniImages.length : 3;
    gridImagesContainer.style.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;
}

/**
 * 初始化懒加载
 */
function initLazyLoad() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target.querySelector('img[data-src]');
                if (img && img.dataset.src && !img.src) {
                    img.src = img.dataset.src;
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

    document.querySelectorAll('.work-image').forEach(container => {
        observer.observe(container); 
    });
}

// 将函数导出到全局作用域，使其可以在其他文件中使用
window.loadProjectImages = loadProjectImages;
window.initLazyLoad = initLazyLoad;