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