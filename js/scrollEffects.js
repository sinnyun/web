/**
 * 项目详情页滚动效果
 * 使用GSAP和ScrollTrigger实现高级动画效果
 * 包括：图片渐入、视差滚动、缩放效果和交错动画
 */

// 在页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 添加页面类名
    document.documentElement.classList.add('project-detail-page');
    document.body.classList.add('project-detail-page');
    
    // 等待图片加载完成后初始化效果
    // 使用更可靠的方法检测图片加载
    if (document.readyState === 'complete') {
        initScrollEffects();
    } else {
        window.addEventListener('load', function() {
            // 给一个短暂延迟确保DOM完全处理
            setTimeout(initScrollEffects, 300);
        });
    }
});

/**
 * 初始化滚动效果
 * 使用GSAP和ScrollTrigger实现动画效果
 */
function initScrollEffects() {
    // 获取所有图片容器
    const imageContainers = document.querySelectorAll('.work-image');
    
    // 如果没有找到图片容器，尝试等待DOM更新
    if (imageContainers.length === 0) {
        console.log("等待图片容器加载...");
        setTimeout(initScrollEffects, 500);
        return;
    }
    
    // ===== 动画配置常量 =====
    const ANIMATION_CONFIG = {
        // 初始状态配置
        INITIAL: {
            opacity: 0,
            y: -50,
            scale: 0.9,
            force3D: true,
            willChange: "transform, opacity"
        },
        // 进入动画配置
        ENTER: {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            stagger: {
                amount: 0.25,
                from: "start",
                ease: "power2.inOut"
            },
            ease: "power3.out",
            overwrite: true
        },
        // 触发器配置
        TRIGGER: {
            start: "top 85%",
            once: true
        },
        // 平滑滚动配置
        SMOOTHER: {
            smooth: 4,
            effects: true
        }
    };

    // 设置初始状态
    gsap.set(imageContainers, ANIMATION_CONFIG.INITIAL);

    try {
        // 批量创建滚动触发器
        ScrollTrigger.batch(imageContainers, {
            onEnter: batch => gsap.to(batch, ANIMATION_CONFIG.ENTER),
            ...ANIMATION_CONFIG.TRIGGER
        });

        // 应用平滑滚动效果
        ScrollSmoother.batch(imageContainers, ANIMATION_CONFIG.SMOOTHER);
        
        // 输出初始化完成信息
        console.log("GSAP ScrollTrigger 高级动画效果已初始化");
    } catch (error) {
        console.error("滚动动画初始化失败:", error);
    }


    // 输出初始化完成信息
    console.log("GSAP ScrollTrigger 高级动画效果已初始化");
}

window.initScrollEffects = initScrollEffects;