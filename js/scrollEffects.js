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
    
    // ===== 1. 设置图片初始状态 =====
    // 使用GSAP的set方法设置初始状态，替代CSS类
    gsap.set(imageContainers, {
        opacity: 0,
        y: 0,
        scale: 0.6, // 添加轻微的缩放效果
        force3D: true, // 启用3D加速以提高性能
        willChange: "transform, opacity" // 优化渲染性能
    });
    
    // ===== 2. 图片进入视口时的渐入动画 =====
    // 使用ScrollTrigger.batch批量处理多个元素的动画
    ScrollTrigger.batch(imageContainers, {
        // 当元素进入视口时触发
        onEnter: batch => gsap.to(batch, {
            opacity: 1,    // 完全不透明
            y: 0,          // 恢复原位置
            scale: 1,      // 恢复原始大小
            duration: 1.1, // 稍微延长动画时间
            stagger: {
                amount: 0.25, // 总交错时间
                from: "start", // 从第一个元素开始
                ease: "power2.inOut" // 交错的缓动函数
            },
            ease: "power3.out", // 更强的缓动函数
            overwrite: true // 覆盖同一元素上的其他动画
        }),
        // 配置观察选项
        start: "top 85%", // 当元素顶部到达视口85%位置时触发
        once: true // 只触发一次
    });
    
    // ===== 3. 高级滚动视差效果 =====
    // 为每个图片容器创建单独的视差效果
    imageContainers.forEach((container, index) => {
        // 为奇偶图片设置不同的视差方向，创造更有趣的效果
        const direction = index % 2 === 0 ? -1 : 1;
        const parallaxAmount = container.offsetHeight * 0.25 * direction;
        
        // 创建ScrollTrigger实例，控制视差动画
        gsap.fromTo(container, 
            { y: 120 }, // 起始状态
            {
                y: parallaxAmount, // 目标位置
                ease: "none", // 线性动画，跟随滚动
                scrollTrigger: {
                    trigger: container, // 触发元素
                    start: "top bottom", // 当元素顶部到达视口底部时开始
                    end: "bottom top",   // 当元素底部到达视口顶部时结束
                    scrub: 1.5,          // 平滑跟随滚动位置，值越大越平滑
                    // markers: false,    // 调试标记
                    toggleActions: "play none none reverse" // 控制动画播放行为
                }
            }
        );
        
        // ===== 4. 添加轻微的缩放效果 =====
        // 当图片在视口中央时轻微放大，增强焦点效果
        gsap.fromTo(container, 
            { scale: 1 },
            {
                scale: 1.1, // 轻微放大
                ease: "sine.inOut",
                scrollTrigger: {
                    trigger: container,
                    start: "top 60%", // 当元素到达视口中部偏上位置
                    end: "bottom 40%", // 当元素离开视口中部偏下位置
                    scrub: 2, // 非常平滑的过渡
                    toggleActions: "play reverse play reverse"
                }
            }
        );
    });
    
        
    // 输出初始化完成信息
    console.log("GSAP ScrollTrigger 高级动画效果已初始化");
}

window.initScrollEffects = initScrollEffects;