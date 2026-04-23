#!/usr/bin/env python3
import os
import re

# 定义游戏页面文件列表
game_files = [
    'game-01-central-angle.html',
    'game-02-inscribed-angle.html',
    'game-03-semicircle-right.html',
    'game-04-cyclic-quad.html',
    'game-05-tangent-radius.html',
    'game-06-tangent-length.html',
    'game-07-Perpendicular-Bisector.html',
    'game-08-tangent-chord-angle.html'
]

# 读取game.html的基本结构
def read_game_template():
    with open('game.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 提取头部结构（到</header>）
    header_match = re.search(r'(<!DOCTYPE html>.*?</header>)', content, re.DOTALL)
    header = header_match.group(1) if header_match else ''
    
    # 提取移动端设置面板（完整部分）
    mobile_settings = '''
    <div class="mobile_settings_panel" id="mobile_settings_panel">
        <div class="mobile_settings_header">
            <span data-i18n="settings_title">设置</span>
            <button class="mobile_settings_close" id="mobile_settings_close" aria-label="Close">×</button>
        </div>
        <div class="mobile_settings_content">
            <div class="mobile_setting_group">
                <div class="mobile_setting_group_title" data-i18n="setting_group_display">显示设置</div>
                <div class="mobile_setting_item">
                    <span data-i18n="setting_language">语言</span>
                    <button class="mobile_setting_btn" id="mobile_lang_toggle">EN / 中</button>
                </div>
                <div class="mobile_setting_item">
                    <span data-i18n="setting_theme">主题</span>
                    <button class="mobile_setting_btn" id="mobile_theme_toggle" data-i18n="mode_day">夜间模式</button>
                </div>
                <div class="mobile_setting_item">
                    <span data-i18n="setting_color">色彩</span>
                    <span class="mobile_setting_status" id="mobile_color_status">标准</span>
                </div>
            </div>

            <div class="mobile_setting_divider"></div>

            <div class="mobile_setting_group">
                <div class="mobile_setting_group_title" data-i18n="setting_group_account">账户设置</div>
                <div id="mobile_login_status" class="mobile_login_status hidden">
                    <p><strong data-i18n="login_status">已登录：</strong><span id="mobile_login_user">Developer</span></p>
                    <button class="mobile_logout_btn" id="mobile_logout_btn" data-i18n="logout">退出登录</button>
                </div>
                <div id="mobile_login_prompt" class="mobile_setting_item">
                    <span data-i18n="login_prompt">登录/注册</span>
                    <button class="mobile_setting_btn" id="mobile_login_btn" data-i18n="login">去登录</button>
                </div>
            </div>
        </div>
    </div>
    <div class="mobile_settings_overlay" id="mobile_settings_overlay"></div>
'''
    
    # 提取侧边栏和页面外壳开始部分（到<main class="content_area">）
    shell_start = '''
    <div class="page_shell">
        <aside class="side_nav fade_in_up" aria-label="Primary menu">
            <div class="side_nav_inner">
            <a class="side_nav_link" href="../index.html" aria-label="Homepage">
                <span class="side_nav_icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                        <path d="M3 10.5L12 3L21 10.5"></path>
                        <path d="M5 9.5V20H19V9.5"></path>
                        <path d="M10 20V14H14V20"></path>
                    </svg>
                </span>
                <span class="side_nav_tooltip" data-i18n="nav_home">主页</span>
            </a>
            <a class="side_nav_link" href="../quiz/quiz.html" aria-label="Quiz">
                <span class="side_nav_icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                        <rect x="6" y="4" width="12" height="16" rx="2"></rect>
                        <path d="M9 4.5H15"></path>
                        <path d="M9 10H15"></path>
                        <path d="M9 14H13"></path>
                        <path d="M9 18H12"></path>
                        <path d="M14 14L15.5 15.5L18 13"></path>
                    </svg>
                </span>
                <span class="side_nav_tooltip" data-i18n="nav_quiz">测验</span>
            </a>
            <a class="side_nav_link active" href="./game.html" aria-label="Game">
                <span class="side_nav_icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                        <path d="M7 10H17A4 4 0 0 1 20.8 15L20 18.2A1.8 1.8 0 0 1 17.1 19.2L14.8 17.5H9.2L6.9 19.2A1.8 1.8 0 0 1 4 18.2L3.2 15A4 4 0 0 1 7 10Z"></path>
                        <path d="M8.5 13.5V16.5"></path>
                        <path d="M7 15H10"></path>
                        <circle cx="15.5" cy="14.5" r="0.8" fill="currentColor" stroke="none"></circle>
                        <circle cx="17.8" cy="16.2" r="0.8" fill="currentColor" stroke="none"></circle>
                    </svg>
                </span>
                <span class="side_nav_tooltip" data-i18n="nav_game">游戏</span>
            </a>
            <button class="side_nav_link" id="mobile_settings_btn" aria-label="Settings">
                <span class="side_nav_icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
                    </svg>
                </span>
                <span class="side_nav_tooltip" data-i18n="nav_settings">设置</span>
            </button>
            </div>
        </aside>

        <main class="content_area">
'''
    
    # 提取页面外壳结束部分（从</main>到</div>）
    shell_end = '''
        </main>
    </div>
'''
    
    # 提取基础脚本引用
    base_scripts = '''    <script src="../index.js"></script>
    <script src="../auth-entry.js"></script>
    <script src="../colorblind.js"></script>
</body>
</html>'''
    
    return header, mobile_settings, shell_start, shell_end, base_scripts

# 更新游戏页面
def update_game_page(file_path, header, mobile_settings, shell_start, shell_end, base_scripts):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 提取页面标题
    title_match = re.search(r'<title>(.*?)</title>', content)
    title = title_match.group(1) if title_match else 'CircleLab | 几何定理游戏'
    
    # 提取游戏内容（从<div class="container">开始）
    game_content_match = re.search(r'(<div class="container">.*?)(?=<script>)', content, re.DOTALL)
    game_content = game_content_match.group(1) if game_content_match else ''
    
    if not game_content:
        print(f"警告：在{file_path}中未找到游戏内容")
        return
    
    # 提取游戏的JavaScript部分（从<script>开始到第一个</script>结束）
    js_match = re.search(r'(<script>.*?</script>)', content, re.DOTALL)
    game_js = js_match.group(1) if js_match else ''
    
    if not game_js:
        print(f"警告：在{file_path}中未找到JavaScript内容")
        return
    
    # 构建新的页面内容
    new_content = f'''{header}
{mobile_settings}
{shell_start}
{game_content}
{shell_end}
{game_js}
{base_scripts}'''
    
    # 写入新内容
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"已更新：{file_path}")

# 主函数
def main():
    # 切换到游戏目录
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    # 读取模板
    header, mobile_settings, shell_start, shell_end, base_scripts = read_game_template()
    
    # 更新每个游戏页面
    for game_file in game_files:
        if os.path.exists(game_file):
            update_game_page(game_file, header, mobile_settings, shell_start, shell_end, base_scripts)
        else:
            print(f"警告：文件不存在：{game_file}")

if __name__ == "__main__":
    main()
