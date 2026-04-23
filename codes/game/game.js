// 初始状态：中文模式
let isChinese = true;
const langBtn = document.getElementById('langToggleBtn');
const themeBtn = document.getElementById('themeToggleBtn');

// 语言切换核心函数
function toggleLang() {
    isChinese = !isChinese;
    const i18nElements = document.querySelectorAll('[data-zh][data-en]');
    i18nElements.forEach(el => {
        el.textContent = isChinese ? el.dataset.zh : el.dataset.en;
    });

    langBtn.textContent = isChinese ? "English" : "中文";
    updateThemeBtnText();
}

// 主题切换函数
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    updateThemeBtnText();
}

// 更新主题按钮文字
function updateThemeBtnText() {
    const isDark = document.body.classList.contains('dark-mode');
    if (isChinese) {
        themeBtn.textContent = isDark ? "☀️ 白天模式" : "🌙 夜间模式";
    } else {
        themeBtn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
    }
}

// 绑定按钮事件
langBtn.addEventListener('click', toggleLang);
themeBtn.addEventListener('click', toggleTheme);

// 自动高亮当前页面的侧边栏链接
const currentPath = window.location.pathname;
const sidebarLinks = document.querySelectorAll('.side_nav_link');
sidebarLinks.forEach(link => {
    if (link.getAttribute('href') === './game.html' || 
        currentPath.endsWith('game.html')) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// 确保DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 初始更新主题按钮文本
    updateThemeBtnText();
});