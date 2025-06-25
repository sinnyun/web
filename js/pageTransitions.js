/**
 * 关于页面的滚动过渡动画效果
 * 使用GSAP实现导航栏和框架元素的视差滚动效果
 * 主要功能：
 * 1. 小导航栏随滚动下移动画
 * 2. 框架元素视差滚动效果
 */
const abouttransition = () => {
  let smallNav = document.querySelector('.smallNav');
  let frameBox = document.querySelector('.frameBox');
  if (!smallNav || !frameBox) return; // 没有相关元素时直接返回

  let smallNavBounding = smallNav.getBoundingClientRect();
  // 小导航栏动画配置
  gsap.to('.smallNav', {
    // 滚动触发器配置
    scrollTrigger: {
      trigger: '.aboutSection',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
    },
    y: window.innerHeight - smallNavBounding.height, // 垂直移动距离 = 视窗高度 - 导航栏高度
    ease: 'Linear.easeIn',
  });

  let frameBoxBounding = frameBox.getBoundingClientRect();
  let frmH = frameBoxBounding.height;
  let smallNavpadding = window.getComputedStyle(smallNav);

  // 框架元素动画配置
  gsap.to('.frameBox', {
    // 滚动触发器配置
    scrollTrigger: {  // GSAP滚动触发器配置
      // 当.aboutSection元素进入视口时触发动画
      trigger: '.aboutSection',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      // markers: true,
    },
    y:  // 复杂的垂直移动计算，考虑多个因素：
      window.innerHeight -
      frmH -
      frameBoxBounding.top -
      parseInt(smallNavpadding.paddingBottom) +
      20,
    ease: 'Linear.easeIn',
  });
};

// 初始化执行关于页面的过渡动画
abouttransition()
// DOM加载完成后添加类名标记，用于CSS过渡效果
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.add('domLoaded')
    document.body.classList.add('noDelay')
  }, 50)
})

/**
 * 设置导航菜单激活状态
 * @param {string} menu - 要激活的菜单项data-nav值
 */
const navActive = (menu) => {
  let navList = document.querySelectorAll('[data-nav]')

  navList.forEach((nav) => {
    nav.classList.remove('active')
  })

  document.querySelector(`[data-nav=${menu}]`).classList.add('active')
}

// ---------------------------
// 页面切换红色遮挡动画（Barba.js）
// ---------------------------

// 创建遮罩层DOM（用transform实现动画）
function createTransitionOverlay() {
  // 等待body可用
  if (!document.body) {
    document.addEventListener('DOMContentLoaded', createTransitionOverlay, { once: true });
    return null;
  }
  let overlay = document.getElementById('barba-transition-overlay');
  if (overlay) return overlay;
  overlay = document.createElement('div');
  overlay.id = 'barba-transition-overlay';
  overlay.style.position = 'fixed';
  overlay.style.left = 0;
  overlay.style.top = 0;
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.background = 'red';
  overlay.style.zIndex = 9999;
  overlay.style.transition = 'none';
  overlay.style.pointerEvents = 'none';
  overlay.style.transform = 'translateY(100%)';
  overlay.style.display = 'block';
  document.body.appendChild(overlay);
  return overlay;
}

// 获取或创建遮罩层
function getOverlay() {
  let overlay = document.getElementById('barba-transition-overlay');
  if (!overlay) {
    overlay = createTransitionOverlay();
  }
  return overlay;
}

// 遮挡进入动画：从下到上覆盖
function showOverlayTransform() {
  return new Promise(resolve => {
    const overlay = getOverlay();
    overlay.style.transition = 'none';
    overlay.style.transform = 'translateY(100%)';
    overlay.style.display = 'block';
    void overlay.offsetWidth;
    overlay.style.transition = 'transform 0.8s cubic-bezier(0.77,0,0.175,1)';
    overlay.style.transform = 'translateY(0)';
    setTimeout(resolve, 800);
  });
}

// 遮挡滑出动画：从上到下收回
function hideOverlayTransform() {
  return new Promise(resolve => {
    const overlay = getOverlay();
    overlay.style.transition = 'transform 1s cubic-bezier(0.77,0,0.175,1)';
    overlay.style.transform = 'translateY(100%)';
    setTimeout(() => {
      overlay.style.display = 'none';
      resolve();
    }, 1000);
  });
}

// ---------------------------
// 👇👇👇【Barba.js 页面切换配置】👇👇👇
// ---------------------------
// import barba from '@barba/core'; // 已通过CDN引入，无需再import

barba.init({
  transitions: [
    {
      name: 'red-overlay-transition',
      async leave(data) {
        // 判断目标链接是否为主页
        let href = '';
        if (data.trigger) {
          if (typeof data.trigger === 'string') {
            href = data.trigger;
          } else if (data.trigger.getAttribute) {
            href = data.trigger.getAttribute('href') || '';
          }
        }
        if (href && (href.endsWith('index.html') || href === './' || href === '/' || href === 'index')) {
          // 直接跳转主页，不显示遮挡层动画
          window.location.href = href;
          return new Promise(() => {});
        }
        // 其它页面正常遮挡层动画
        await showOverlayTransform();
        sessionStorage.setItem('barbaOverlayShouldSlideOut', '1');
        window.location.href = data.trigger.href;
        return new Promise(() => {});
      },
      // enter钩子不需要处理
      async once() {
        const overlay = getOverlay();
        overlay.style.display = 'none';
      }
    }
  ],
  // ⭐⭐ 页面切换后统一初始化所有依赖DOM的脚本 ⭐⭐
  hooks: {
    afterEnter() {
      if (window.initPageScripts) window.initPageScripts();
      if (window.initAudioControl) window.initAudioControl();
      if (window.initScrollEffects) window.initScrollEffects();
    }
  }
});
// ---------------------------
// 👆👆👆【Barba.js 页面切换配置】👆👆👆
// ---------------------------

// ---------------------------
// 页面初始自动显示遮挡层并滑出（仅Barba跳转后）
// ---------------------------
// (function() {
//   if (window.top === window && sessionStorage.getItem('barbaOverlayShouldSlideOut') === '1') {
//     let overlay = document.getElementById('barba-transition-overlay');
//     if (!overlay) {
//       overlay = createTransitionOverlay();
//     }
//     overlay.style.transition = 'none';
//     overlay.style.transform = 'translateY(0)';
//     overlay.style.display = 'block';
//     window.addEventListener('load', () => {
//       setTimeout(() => {
//         overlay.style.transition = 'transform 1s cubic-bezier(0.77,0,0.175,1)';
//         overlay.style.transform = 'translateY(100%)';
//         setTimeout(() => {
//           overlay.style.display = 'none';
//           sessionStorage.removeItem('barbaOverlayShouldSlideOut');
//         }, 1000);
//       }, 1000); // 1秒后开始滑出
//     });
//   }
// })();
