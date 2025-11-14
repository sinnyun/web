/**
 * 初始化图片轮播功能
 * 包含图片切换、文字动画、分页指示器等功能
 */
const sliderInit = () => {
  // 当前激活的幻灯片索引
  let activeIndex = 0
  // 自动切换定时器
  let autoSlideTimer = null
  // 自动切换间隔(毫秒)
  const AUTO_SLIDE_INTERVAL = 8000
  // 获取所有幻灯片图片元素
  const sliderImages = document.querySelectorAll('.mainImageWrap .imgBox')
  // 幻灯片总数
  let sliderLenght = sliderImages.length
  // 导航按钮元素(左右箭头)
  const navButton = document.querySelectorAll('[data-nav]')
  // 文字内容容器
  const textWrap = document.querySelector('.textBox')

  // 为导航按钮添加点击事件
  navButton.forEach((btn) => {
    // 获取按钮方向(left/right)
    const dir = btn.dataset.nav

    btn.addEventListener('click', (e) => {
      e.preventDefault()

      // 检查是否正在动画中
      if (!textWrap.classList.contains('animating')) {
        // 保存当前索引
        let tempIndex = activeIndex

        // 向左滑动处理
        if (dir == 'left' && activeIndex != 0) {
          activeIndex -= 1

          // 执行文字过渡动画
          textTransition(tempIndex)

          // 执行图片过渡动画
          imageTransition(tempIndex)
          // 按钮动画
          buttonAnimation(dir)
        }
        // 向右滑动处理
        else if (dir == 'right' && activeIndex < sliderLenght - 1) {
          activeIndex += 1

          // 执行文字过渡动画
          textTransition(tempIndex)

          // 执行图片过渡动画
          imageTransition(tempIndex)

          // 按钮动画
          buttonAnimation(dir)
        }

        // 更新分页指示器
        pagination()
      }
    })
  })

  // 获取缩略图元素
  const thumbSlide = document.querySelectorAll('.smallthumb .sItem')

  /**
   * 更新缩略图样式
   * @param {number} activeIndex - 当前激活的缩略图索引
   */
  const updateThumbStyles = (activeIndex) => {
    // 重置所有缩略图样式为默认(灰度50%透明度)
    thumbSlide.forEach(item => {
      item.style.filter = 'grayscale(100%)'
      item.style.opacity = '0.5'
    })
    // 设置当前激活缩略图样式(无灰度100%透明度)
    thumbSlide[activeIndex].style.filter = 'grayscale(0%)'
    thumbSlide[activeIndex].style.opacity = '1'
  }

  // 为缩略图添加点击事件
  thumbSlide.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      // 检查是否正在动画中
      if (!textWrap.classList.contains('animating')) {
        // 检查点击的是否是当前激活的缩略图
        if (activeIndex != index) {
          // 保存当前索引
          let tempIndex = activeIndex

          // 更新激活索引
          activeIndex = index
          // 执行文字过渡动画
          textTransition(tempIndex)
          // 执行图片过渡动画
          imageTransition(tempIndex)
          // 更新分页指示器
          pagination()

          // 根据方向执行按钮动画
          let dir = activeIndex < tempIndex ? 'left' : 'right'
          buttonAnimation(dir)

          // 更新缩略图样式
          updateThumbStyles(activeIndex)
        }
      }
    })
  })

  // 初始化设置第一个缩略图为激活状态
  updateThumbStyles(0)

  gsap.set('.h-title', {
    yPercent: 100,
  })

  const sliderTexts = document.querySelectorAll('.h-title')

  gsap.set(sliderImages, {
    clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
  })

  /**
   * 导航按钮动画效果
   * @param {string} dir - 方向(left/right)
   */
  const buttonAnimation = (dir) => {
    // 使用GSAP创建按钮旋转动画
    gsap.fromTo(
      '[data-nav]', // 目标元素
      0.5, // 动画时长
      {
        rotate: 0, // 起始状态
      },
      {
        rotate: dir == 'left' ? 90 * -1 : 90, // 根据方向旋转90度
      }
    )
  }

  /**
   * 更新分页指示器位置
   */
  const pagination = () => {
    // 获取单个分页指示器的高度
    let pageTrans = document
      .querySelector('.paginationWrap i')
      .getBoundingClientRect().height

    // 使用GSAP移动分页指示器
    gsap.to('.paginationWrap .inner', 0.4, {
      y: pageTrans * activeIndex * -1, // 根据当前索引计算Y轴位置
    })
  }

  /**
   * 文字内容过渡动画
   * @param {number} preIndex - 上一个激活的索引
   */
  const textTransition = (preIndex) => {
    // 创建GSAP时间线
    let tl = gsap.timeline()
    // 添加动画中标记
    textWrap.classList.add('animating')
    
    if (preIndex >= 0) {
      // 上一个文字向上滑出
      tl.to(sliderTexts[preIndex], 0.3, {
        yPercent: -100,
      })
      // 当前文字从下方滑入
      .fromTo(
        sliderTexts[activeIndex],
        0.6,
        {
          yPercent: 100,
        },
        {
          yPercent: 0,
          onComplete: () => {
            // 动画完成后移除标记
            textWrap.classList.remove('animating')
          },
        }
      )
    } else {
      // 初始状态动画
      tl.fromTo(
        sliderTexts[activeIndex],
        0.6,
        {
          yPercent: 100,
        },
        {
          yPercent: 0,
          onComplete: () => {
            // 动画完成后移除标记
            textWrap.classList.remove('animating')
          },
        }
      )
    }
  }

  /**
   * 图片过渡动画效果
   * @param {number} preIndex - 上一个激活的幻灯片索引，-1表示初始状态
   */
  const imageTransition = (preIndex) => {
    // 创建GSAP时间线用于动画序列控制
    let tl = gsap.timeline()

    // 如果有前一个索引(非初始状态)
    if (preIndex >= 0) {
      // 判断滑动方向(右滑或左滑)
      const dir = activeIndex > preIndex ? 'right' : 'left'

      // 动画序列:
      // 1. 前一张图片的clipPath动画(从完整显示到单边消失)
      tl.fromTo(
        sliderImages[preIndex],
        0.6,
        {
          zIndex: 2, // 中间层
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', // 完整显示
        },
        {
          zIndex: 2,
          clipPath:
            dir == 'right'
              ? 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' // 向右滑动时从左侧消失
              : 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)', // 向左滑动时从右侧消失
        }
      )
        // 2. 前一张图片的img元素水平位移动画
        .fromTo(
          sliderImages[preIndex].querySelector('img'),
          0.6,
          {
            xPercent: 0, // 初始位置
          },
          {
            xPercent: dir == 'right' ? -50 : 50, // 根据方向位移50%
          },
          '-=.6' // 与上一个动画同时开始
        )
        // 3. 当前图片的img元素水平位移动画(从位移状态回到中心)
        .fromTo(
          sliderImages[activeIndex].querySelector('img'),
          0.6,
          {
            xPercent: dir == 'right' ? 50 : -50, // 从相反方向开始
          },
          {
            xPercent: 0, // 回到中心位置
          },
          '-=.6' // 与上一个动画同时开始
        )
        // 4. 当前图片的clipPath动画(从单边显示到完整显示)
        .fromTo(
          sliderImages[activeIndex],
          0.6,
          {
            zIndex: 5, // 顶层
            clipPath:
              dir == 'right'
                ? 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)' // 从右侧进入
                : 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)', // 从左侧进入
          },
          {
            zIndex: 5,
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', // 完整显示
            onComplete: function() {
              // ========== 新增背景图微动效果 ==========
              // 创建无限循环的轻微缩放和旋转动画
              gsap.to(sliderImages[activeIndex].querySelector('img'), {
                duration: 10,
                scale: 1.2,
                rotation: 2,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
                transformOrigin: "center center"
                
              });
            }
          },
          '-=.6' // 与上一个动画同时开始
        )
    } else {
      // 初始状态动画 - 先执行clipPath动画
      tl.to(
        sliderImages[activeIndex],
       0.6,
        {
          zIndex: 5, // 顶层
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', // 完整显示
          onComplete: function () {
            // clipPath动画完成后开始微动效果
            gsap.to(sliderImages[activeIndex].querySelector('img'), {
              duration: 10,
              scale: 1.0,
              rotation: 0,
              yoyo: true,
              repeat: -1,
              ease: "sine.inOut",
              transformOrigin: "center center"
            });
          }
        }
      )
    }
  }
  // init event
  imageTransition(-1)

  setTimeout(() => {
    textTransition(-1)
  }, 200)
  /**
   * 自动切换到下一张幻灯片
   */
  const autoSlideNext = () => {
    // 检查是否正在动画中且不是最后一张
    if (!textWrap.classList.contains('animating')) {
      let tempIndex = activeIndex
      activeIndex = (activeIndex + 1) % sliderLenght
      textTransition(tempIndex);
      imageTransition(tempIndex);
      buttonAnimation('right');
      pagination();
      // 更新缩略图样式
      updateThumbStyles(activeIndex);
    }
  }

  /**
   * 启动自动轮播
   */
  const startAutoSlide = () => {
    // 清除现有定时器
    if (autoSlideTimer) clearInterval(autoSlideTimer)
    // 设置新定时器
    autoSlideTimer = setInterval(autoSlideNext, AUTO_SLIDE_INTERVAL)
  }

  // 监听鼠标滚轮事件
  document.addEventListener('wheel', (e) => {
    // 检查是否正在动画中
    if (!textWrap.classList.contains('animating')) {
      // 向上滚动 - 上一张
      if (e.deltaY < 0) {
        let tempIndex = activeIndex
        activeIndex = (activeIndex - 1 + sliderLenght) % sliderLenght
        textTransition(tempIndex)
        imageTransition(tempIndex)
        buttonAnimation('left')
        pagination()
        // 更新缩略图样式
        updateThumbStyles(activeIndex)
      }
      // 向下滚动 - 下一张
      else if (e.deltaY > 0) {
        let tempIndex = activeIndex
        activeIndex = (activeIndex + 1) % sliderLenght
        textTransition(tempIndex);
        imageTransition(tempIndex);
        buttonAnimation('right');
        pagination();
        // 更新缩略图样式
        updateThumbStyles(activeIndex)
      }
    }
    // 重置自动轮播计时器
    startAutoSlide()
  })

  // 初始化自动轮播
  startAutoSlide()

}

sliderInit()

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.add('domLoaded')
  }, 50)
})
