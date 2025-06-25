// 页面进入时的遮挡层滑出动画
// 可根据页面ID或参数自定义遮挡层颜色
(function() {
  // 只用红色
  function getOverlayColor() {
    return 'red';
  }

  // 4. 获取已存在的遮挡层
  function getOverlay() {
    return document.getElementById('overlay-enter');
  }

  // 1. 判断是否主页
  function isHomePage() {
    const path = window.location.pathname.replace(/\\/g, '/');
    return (
      path.endsWith('/index.html') ||
      path === '/' ||
      path.endsWith('/index') ||
      path === '/index'
    );
  }

  // 5. 动画滑出遮挡层
  function slideOutOverlay() {
    const overlay = getOverlay();
    if (!overlay) return;
    if (isHomePage()) {
      // 主页直接隐藏遮挡层
      overlay.style.display = 'none';
      window.overlayEnterDone = true;
      document.dispatchEvent(new Event('overlayEnterDone'));
      return;
    }
    // 其它页面正常动画
    overlay.style.background = getOverlayColor();
    overlay.style.transition = 'none';
    overlay.style.transform = 'translateY(0)';
    overlay.style.display = 'block';
    setTimeout(() => {
      overlay.style.transition = 'transform 1s cubic-bezier(0.77,0,0.175,1)';
      overlay.style.transform = 'translateY(100%)';
      setTimeout(() => {
        overlay.style.display = 'none';
        window.overlayEnterDone = true;
        document.dispatchEvent(new Event('overlayEnterDone'));
      }, 800);
    }, 100); // 进入页面后0.8秒开始滑出
  }

  // 6. 等待body可用后执行
  function onBodyReady(fn) {
    if (document.body) fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  // 7. 只在顶层window执行
  if (window.top === window) {
    onBodyReady(() => {
      window.addEventListener('load', slideOutOverlay);
    });
  }
})(); 