/**
 * 项目详情页滚动效果
 * 包含图片进入视口的渐入效果和滚动时的视差效果
 */

// 在页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 添加页面类名
    document.documentElement.classList.add('project-detail-page');
    document.body.classList.add('project-detail-page');
    
    // 等待图片加载完成后初始化效果
    setTimeout(initScrollEffects, 500);
});

/**
 * 初始化滚动视差效果
 * 使用 Intersection Observer 检测元素进入视口
 * 并添加滚动监听实现视差效果
 */
function initScrollEffects() {
    // 获取所有图片容器
    const imageContainers = document.querySelectorAll('.work-image');
    
    // 创建Intersection Observer来检测元素是否进入视口
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                entry.target.classList.add('parallax');
                observer.unobserve(entry.target); // 只触发一次
            }
        });
    }, {
        threshold: 0.1, // 当10%的元素可见时触发
        rootMargin: '0px 0px -10% 0px' // 提前一点触发
    });
    
    // 观察所有图片容器
    imageContainers.forEach(container => {
        observer.observe(container);
    });
    
    // 添加滚动监听，实现图片视差效果
    window.addEventListener('scroll', () => {
        requestAnimationFrame(() => {
            imageContainers.forEach(container => {
                if (container.classList.contains('parallax')) {
                    const rect = container.getBoundingClientRect();
                    const windowHeight = window.innerHeight;
                    
                    // 计算元素在视口中的位置百分比
                    const percentInView = 1 - (rect.top / windowHeight);
                    
                    // 只有当元素在视口中时才应用变换
                    if (percentInView > 0 && percentInView < 1.5) {
                        // ===== 可调整参数 =====
                        // 调整下面的乘数(30)可以改变动效幅度
                        // 值越大，移动越明显；值越小，移动越微妙
                        const yOffset = (percentInView - 0.5) * 30;
                        container.style.transform = `translateY(${yOffset}px)`;
                    }
                }
            });
        });
    }, { passive: true });
}