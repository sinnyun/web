// 创建音频实例
const bgAudio = new Audio('img/audio.mp3');
bgAudio.loop = true; // 循环播放

// 获取或设置音频播放状态
let isPlaying = localStorage.getItem('audioPlaying') === 'true';

// 更新音频控制按钮状态
function updateAudioButton() {
    const audioBtn = document.querySelector('.audio-control');
    const audioIcon = audioBtn.querySelector('i');
    
    if (isPlaying) {
        audioBtn.classList.add('playing');
        audioIcon.className = 'fas fa-volume-up';
        bgAudio.play().catch(() => {
            // 处理自动播放限制
            isPlaying = false;
            updateAudioButton();
        });
    } else {
        audioBtn.classList.remove('playing');
        audioIcon.className = 'fas fa-volume-mute';
        bgAudio.pause();
    }
}

// 切换音频播放状态
function toggleAudio() {
    isPlaying = !isPlaying;
    localStorage.setItem('audioPlaying', isPlaying);
    updateAudioButton();
}

// 初始化音频控制
function initAudioControl() {
    // 创建音频控制按钮
    const audioBtn = document.createElement('div');
    audioBtn.className = 'audio-control';
    audioBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    audioBtn.addEventListener('click', toggleAudio);
    document.body.appendChild(audioBtn);

    // 设置初始状态
    updateAudioButton();

    // 处理页面可见性变化
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            bgAudio.pause();
        } else if (isPlaying) {
            bgAudio.play().catch(() => {});
        }
    });

    // 处理页面卸载
    window.addEventListener('beforeunload', () => {
        bgAudio.pause();
    });
}

// 当DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', initAudioControl);
