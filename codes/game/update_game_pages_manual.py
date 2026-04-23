#!/usr/bin/env python3
import os

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

# 完整的页面模板
def get_page_template(title, game_content, game_js):
    return f'''
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <link rel="stylesheet" href="../index.css">
    <link rel="stylesheet" href="../auth-entry.css">
</head>
<body>
    <div class="bg_orb bg_orb_left"></div>
    <div class="bg_orb bg_orb_right"></div>

    <header class="site_header">
        <div class="brand_wrap">
            <img class="brand_logo" src="../../images/logo_standard.png" alt="CircleLab Logo">
            <div>
                <p class="brand_name">CircleLab</p>
                <p class="brand_tag" data-i18n="brand_tag">GCSE Circle Geometry</p>
            </div>
        </div>

        <div class="control_group">
            <button id="language_toggle_btn" class="ghost_btn" type="button">EN</button>
            <button id="mode_toggle_btn" class="ghost_btn" type="button" data-i18n="mode_day">夜间模式</button>
            <button id="color_toggle_btn" class="ghost_btn" type="button" data-i18n="color_mode">Color 色彩</button>
            <button id="color_status_btn" class="ghost_btn" type="button" data-i18n="color_normal">Normal / 标准</button>
            <div class="auth_link_group" id="auth_link_group">
                <span class="auth_status_badge" id="auth_status_badge">
                    <span data-i18n="logged_in">已登录：</span>
                    <span id="logged_in_user">Developer</span>
                </span>
                <button class="auth_logout_btn" id="auth_logout_btn" data-i18n="logout">退出登录</button>
            </div>
        </div>
    </header>

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
            {game_content}
        </main>
    </div>

    {game_js}

    <script src="../index.js"></script>
    <script src="../auth-entry.js"></script>
    <script src="../colorblind.js"></script>
</body>
</html>
'''

# 手动更新每个游戏页面
def update_game_pages_manually():
    # 切换到游戏目录
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    # 游戏页面的标题和内容映射
    game_titles = {
        'game-01-central-angle.html': 'CircleLab | 圆心角定理',
        'game-02-inscribed-angle.html': 'CircleLab | 圆周角定理',
        'game-03-semicircle-right.html': 'CircleLab | 半圆上的直角',
        'game-04-cyclic-quad.html': 'CircleLab | 圆内接四边形',
        'game-05-tangent-radius.html': 'CircleLab | 切线与半径垂直',
        'game-06-tangent-length.html': 'CircleLab | 切线长度相等',
        'game-07-Perpendicular-Bisector.html': 'CircleLab | 垂直平分线',
        'game-08-tangent-chord-angle.html': 'CircleLab | 切线弦角定理'
    }
    
    # 为每个游戏页面创建内容
    for game_file in game_files:
        title = game_titles.get(game_file, 'CircleLab | 几何定理游戏')
        
        # 读取原始文件内容
        with open(game_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 提取游戏内容（从<body>开始到<script>前）
        body_start = content.find('<body>')
        script_start = content.find('<script>')
        
        if body_start != -1 and script_start != -1:
            # 提取<body>标签内的内容
            body_content = content[body_start+6:script_start]
            
            # 提取游戏内容（从<div class="container">开始）
            container_start = body_content.find('<div class="container">')
            if container_start != -1:
                game_content = body_content[container_start:].strip()
            else:
                game_content = body_content.strip()
            
            # 提取JavaScript部分
            script_end = content.find('</script>', script_start)
            if script_end != -1:
                game_js = content[script_start:script_end+9].strip()
            else:
                game_js = ''
        else:
            game_content = ''
            game_js = ''
        
        if not game_content or not game_js:
            print(f"警告：在{game_file}中未找到完整内容")
            continue
        
        # 生成新的页面内容
        new_content = get_page_template(title, game_content, game_js)
        
        # 写入新内容
        with open(game_file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"已更新：{game_file}")

# 主函数
def main():
    update_game_pages_manually()

if __name__ == "__main__":
    main()
