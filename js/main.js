<<<<<<< HEAD
=======
// 幻灯片类
class Slideshow {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            projects: [],
            autoplayDelay: 5000,
            ...options
        };
        
        this.currentSlide = 0;
        this.slides = [];
        this.thumbnails = [];
        this.isAnimating = false;
        this.autoplayInterval = null;
        
        this.init();
    }
    
    init() {
        this.createSlides();
        this.setupNavigation();
        this.startAutoplay();
        
        // 初始化滚轮事件
        this.wheelCount = 0;
        this.wheelTimeout = null;
        this.setupWheelNavigation();
    }
    
    setupWheelNavigation() {
        window.addEventListener('wheel', (e) => {
            if (!document.body.classList.contains('homepage')) return;
            
            this.wheelCount += Math.abs(e.deltaY);
            
            clearTimeout(this.wheelTimeout);
            this.wheelTimeout = setTimeout(() => {
                this.wheelCount = 0;
            }, 200);
            
            if (this.wheelCount >= 500) {
                this.wheelCount = 0;
                if (e.deltaY > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        });
    }
    
    setupNavigation() {
        // 创建导航按钮
        const prevButton = document.createElement('button');
        prevButton.className = 'slide-arrow prev';
        prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
        
        const nextButton = document.createElement('button');
        nextButton.className = 'slide-arrow next';
        nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
        
        this.container.appendChild(prevButton);
        this.container.appendChild(nextButton);
        
        // 初始化按钮动画
        this.initArrowAnimation();
        
        // 添加点击事件
        prevButton.addEventListener('click', () => {
            this.prevSlide();
            this.resetArrowAnimation();
        });
        
        nextButton.addEventListener('click', () => {
            this.nextSlide();
            this.resetArrowAnimation();
        });
        
        // 添加鼠标进入离开事件
        [prevButton, nextButton].forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.classList.remove('animate');
                this.stopAutoplay();
                handleMouseEnter();
            });
            
            button.addEventListener('mouseleave', () => {
                button.classList.add('animate');
                this.startAutoplay();
                handleMouseLeave();
            });
        });
    }
    
    initArrowAnimation() {
        const arrows = document.querySelectorAll('.slide-arrow');
        arrows.forEach(arrow => {
            // 重置动画
            arrow.style.animation = 'none';
            arrow.offsetHeight; // 强制重排
            arrow.style.animation = '';
            // 添加动画类
            arrow.classList.add('animate');
        });
    }
    
    resetArrowAnimation() {
        const arrows = document.querySelectorAll('.slide-arrow');
        arrows.forEach(arrow => {
            arrow.classList.remove('animate');
            // 强制重排
            arrow.offsetHeight;
            arrow.classList.add('animate');
        });
    }
    
    startAutoplay() {
        if (this.autoplayInterval) return;
        
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, this.options.autoplayDelay);
    }
    
    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
    
    resetAutoplay() {
        this.stopAutoplay();
        this.startAutoplay();
    }
    
    nextSlide() {
        if (this.isAnimating) return;
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex, 1);
    }
    
    prevSlide() {
        if (this.isAnimating) return;
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex, -1);
    }
    
    goToSlide(index, direction = 1, immediate = false) {
        if (this.isAnimating || index === this.currentSlide) return;
        this.isAnimating = true;
        
        const slidesContainer = document.getElementById('slides-container');
        const offset = -index * 16.666666667;
        
        if (immediate) {
            gsap.set(slidesContainer, {
                x: `${offset}%`,
                immediateRender: true
            });
            this.initSlideAnimation(index);
        } else {
            // 先重置当前幻灯片的动画
            if (this.slides[this.currentSlide]) {
                const currentBackground = this.slides[this.currentSlide].querySelector('.slide-background');
                if (currentBackground) {
                    gsap.set(currentBackground, { clearProps: "animation" });
                }
            }
            
            gsap.to(slidesContainer, {
                x: `${offset}%`,
                duration: 0.8,
                ease: "power2.inOut",
                onComplete: () => {
                    this.initSlideAnimation(index);
                    this.resetArrowAnimation();
                }
            });
        }
        
        // 更新缩略图状态
        this.thumbnails[this.currentSlide].classList.remove('active');
        this.thumbnails[index].classList.add('active');
        
        // 更新当前幻灯片索引
        this.currentSlide = index;
        
        // 动画结束后清理状态
        gsap.delayedCall(0.8, () => {
            this.isAnimating = false;
        });
    }
    
    initSlideAnimation(index) {
        // 移除所有幻灯片的active类和动画
        this.slides.forEach(slide => {
            slide.classList.remove('active');
            const background = slide.querySelector('.slide-background');
            const content = slide.querySelector('.slide-content');
            
            if (background) {
                // 重置背景动画
                background.style.animation = 'none';
                background.offsetHeight; // 强制重排
                background.style.animation = '';
            }
            
            if (content) {
                content.classList.remove('animate-in');
            }
        });
        
        // 为当前幻灯片添加动画类
        const currentSlide = this.slides[index];
        if (currentSlide) {
            // 延迟添加active类以确保动画重置
            setTimeout(() => {
                currentSlide.classList.add('active');
                const content = currentSlide.querySelector('.slide-content');
                if (content) {
                    content.classList.add('animate-in');
                }
            }, 50);
        }
    }
    
    createSlides() {
        const slidesContainer = document.getElementById('slides-container');
        const thumbnailsWrapper = document.getElementById('thumbnails-wrapper');
        
        if (!slidesContainer || !thumbnailsWrapper) {
            console.error('Containers not found');
            return;
        }
        
        slidesContainer.innerHTML = '';
        thumbnailsWrapper.innerHTML = '';
        
        this.options.projects.forEach((projectId, index) => {
            const project = projects.find(p => p.id === projectId);
            if (!project) {
                console.error(`Project with id ${projectId} not found`);
                return;
            }
            
            // 创建幻灯片主容器
            const slide = document.createElement('li');
            slide.className = 'slide';
            slide.dataset.index = index;
            slide.dataset.projectId = projectId;
            
            // 创建背景容器
            const slideBackground = document.createElement('div');
            slideBackground.className = 'slide-background';
            slideBackground.style.backgroundImage = `url('${project.backgroundImage}')`;
            slide.appendChild(slideBackground);
            
            // 创建内容容器
            const slideContent = document.createElement('div');
            slideContent.className = 'slide-content';
            
            // 创建标签容器
            const tagsContainer = document.createElement('div');
            tagsContainer.className = 'slide-tags';
            project.tags.slice(0, 3).forEach(tag => {
                const tagSpan = document.createElement('span');
                tagSpan.className = 'tag';
                tagSpan.textContent = tag;
                tagsContainer.appendChild(tagSpan);
            });
            
            // 创建标题容器
            const titleContainer = document.createElement('h2');
            titleContainer.className = 'slide-title';
            
            // 创建标题链接
            const titleLink = document.createElement('a');
            titleLink.className = 'title-link';
            titleLink.innerHTML = project.title.replace(/\n/g, '<br>');
            
            const currentProjectId = projectId;
            titleLink.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = `project-detail.html?id=${currentProjectId}`;
            });
            
            titleLink.addEventListener('mouseenter', () => {
                this.stopAutoplay();
                handleMouseEnter();
            });
            
            titleLink.addEventListener('mouseleave', () => {
                this.startAutoplay();
                handleMouseLeave();
            });
            
            titleContainer.appendChild(titleLink);
            
            // 创建项目描述
            const summary = document.createElement('div');
            summary.className = 'slide-summary';
            summary.textContent = project.summary;
            
            // 组装幻灯片内容
            slideContent.appendChild(tagsContainer);
            slideContent.appendChild(titleContainer);
            slideContent.appendChild(summary);
            slide.appendChild(slideContent);
            
            slidesContainer.appendChild(slide);
            this.slides.push(slide);
            
            // 创建缩略图
            const thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail';
            thumbnail.dataset.index = index;
            thumbnail.dataset.projectId = projectId;
            thumbnail.style.backgroundImage = `url('${project.backgroundImage}')`;
            
            thumbnail.addEventListener('click', () => {
                this.goToSlide(index);
            });
            
            thumbnailsWrapper.appendChild(thumbnail);
            this.thumbnails.push(thumbnail);
        });
        
        // 初始化第一个幻灯片
        this.initSlideAnimation(0);
        this.thumbnails[0].classList.add('active');
        this.goToSlide(0, 1, true);
    }
}

>>>>>>> 459dc910547e0cc714b4d6501cf1860de9aebeab
// 加载菜单面板
async function loadMenuPanel() {
    try {
        const response = await fetch('menu-panel.html');
        const html = await response.text();
        document.body.insertAdjacentHTML('beforeend', html);
        
        // 为菜单面板中的可交互元素添加鼠标效果
        const menuPanel = document.querySelector('.menu-panel');
        const interactiveElements = menuPanel.querySelectorAll('a, button');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', handleMouseEnter);
            element.addEventListener('mouseleave', handleMouseLeave);
        });
    } catch (error) {
        console.error('Error loading menu panel:', error);
    }
}

// 菜单切换功能
function toggleMenu() {
    const menuPanel = document.querySelector('.menu-panel');
    const menuButton = document.querySelector('.menu-button');
    
    if (menuPanel && menuButton) {
        menuPanel.classList.toggle('active');
        menuButton.classList.toggle('active');
        
        // 当菜单打开时禁用滚动
        document.body.style.overflow = menuPanel.classList.contains('active') ? 'hidden' : '';
    }
}

// 链接悬停效果
function handleMouseEnter() {
    const dot = document.querySelector('.cursor-dot');
    const circle = document.querySelector('.cursor-circle');
    
    if (dot && circle) {
        // 先添加hover类，触发初始过渡
        dot.classList.add('hover');
        circle.classList.add('hover');
        
        // 延迟添加link-hovered类，实现平滑过渡
        setTimeout(() => {
            document.body.classList.add('link-hovered');
        }, 50);
    }
}

function handleMouseLeave() {
    const dot = document.querySelector('.cursor-dot');
    const circle = document.querySelector('.cursor-circle');
    
    if (dot && circle) {
        // 先移除link-hovered类
        document.body.classList.remove('link-hovered');
        
        // 延迟移除hover类，保持平滑过渡
        setTimeout(() => {
            dot.classList.remove('hover');
            circle.classList.remove('hover');
        }, 300);
    }
}

// 鼠标样式初始化和更新
let cursorInitialized = false;
// 初始化全局变量
let mouseX = 0;
let mouseY = 0;
let dotX = 0;
let dotY = 0;
let circleX = 0;
let circleY = 0;

// 使用localStorage存储鼠标位置，确保在页面刷新和跳转后能够保留
function saveMousePosition(x, y) {
    localStorage.setItem('mouseX', x);
    localStorage.setItem('mouseY', y);
}

function getStoredMousePosition() {
    const x = localStorage.getItem('mouseX');
    const y = localStorage.getItem('mouseY');
    return {
        x: x ? parseInt(x) : window.innerWidth / 2,
        y: y ? parseInt(y) : window.innerHeight / 2
    };
}

// 修改初始化函数
function initCursor(e) {
    const cursor = document.querySelector('.cursor-dot');
    const cursorCircle = document.querySelector('.cursor-circle');
    
    if (!cursor || !cursorCircle) return;

    // 获取鼠标位置 - 优先使用事件参数，其次使用存储的位置
    let posX, posY;
    if (e && e.clientX !== undefined) {
        posX = e.clientX;
        posY = e.clientY;
    } else {
        const storedPos = getStoredMousePosition();
        posX = storedPos.x;
        posY = storedPos.y;
    }

    // 立即设置位置，不使用过渡效果
    cursor.style.transition = 'none';
    cursorCircle.style.transition = 'none';
    
    cursor.style.transform = `translate(${posX}px, ${posY}px)`;
    cursorCircle.style.transform = `translate(${posX}px, ${posY}px)`;
    
    // 更新全局变量
    mouseX = posX;
    mouseY = posY;
    dotX = posX;
    dotY = posY;
    circleX = posX;
    circleY = posY;
    
    // 强制重排
    cursor.offsetHeight;
    cursorCircle.offsetHeight;
    
    // 恢复过渡效果
    setTimeout(() => {
        cursor.style.transition = '';
        cursorCircle.style.transition = '';
    }, 50);
    
    cursorInitialized = true;
}

// 更新鼠标跟随效果 - 删除重复的函数定义，只保留这一个
function updateCursor() {
    const dot = document.querySelector('.cursor-dot');
    const circle = document.querySelector('.cursor-circle');
    
    if (dot && circle) {
        // 点的移动 - 更快的跟随
        dotX += (mouseX - dotX) * 0.8;
        dotY += (mouseY - dotY) * 0.8;
        
        // 圆圈的移动 - 稍微慢一点的跟随
        circleX += (mouseX - circleX) * 0.5;
        circleY += (mouseY - circleY) * 0.5;
        
        // 使用transform而不是left/top，性能更好
        dot.style.transform = `translate(${dotX}px, ${dotY}px)`;
        circle.style.transform = `translate(${circleX}px, ${circleY}px)`;
    }
    
    requestAnimationFrame(updateCursor);
}

// =============================
// 页面初始化逻辑统一封装
// =============================
function initPageScripts() {
  // 1. 初始化菜单面板和菜单按钮
  // -----------------------------
  loadMenuPanel();
  const navbar = document.querySelector('.navbar');
  if (navbar && !navbar.querySelector('.menu-button')) {
    const menuButton = document.createElement('button');
    menuButton.className = 'menu-button';
    menuButton.innerHTML = `
      <span class="menu-line"></span>
      <span class="menu-line"></span>
      <span class="menu-line"></span>
    `;
    menuButton.onclick = toggleMenu;
    let navRight = navbar.querySelector('.nav-right');
    if (!navRight) {
      navRight = document.createElement('div');
      navRight.className = 'nav-right';
      navbar.appendChild(navRight);
    }
    if (!navRight.querySelector('.projects-link')) {
      const projectsLink = document.createElement('a');
      projectsLink.href = 'projects.html';
      projectsLink.className = 'projects-link';
      projectsLink.textContent = '项目列表';
      navRight.appendChild(projectsLink);
    }
    navRight.appendChild(menuButton);
  }

  // 2. 初始化鼠标样式和事件
  // -----------------------------
  if (!document.querySelector('.cursor-dot')) {
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    document.body.appendChild(dot);
  }
  if (!document.querySelector('.cursor-circle')) {
    const circle = document.createElement('div');
    circle.className = 'cursor-circle';
    document.body.appendChild(circle);
  }
  document.body.style.cursor = 'none';
  initCursor();
  document.addEventListener('mousemove', (e) => {
    if (!cursorInitialized) {
      initCursor(e);
    }
    saveMousePosition(e.clientX, e.clientY);
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  updateCursor();

  // 3. 为所有可交互元素添加鼠标hover效果
  // -----------------------------
  document.querySelectorAll('a, button, .menu-button, .slide-arrow, .close-menu-button, .nav-link, .indicator, .thumbnails-container, .thumbnail, .imgBox, .sItem, .arrow').forEach(element => {
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
  });
}

// 页面首次加载
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPageScripts);
} else {
  initPageScripts();
}
// 导出到全局，供Barba.js切换后调用
window.initPageScripts = initPageScripts;