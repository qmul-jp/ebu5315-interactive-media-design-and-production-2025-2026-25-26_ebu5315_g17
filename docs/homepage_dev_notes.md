# 首页开发文档（第17组）

## 项目范围

本页面为 Interactive Math-Learning Website 的首页，主题为 GCSE 圆相关几何。

## 一级菜单要求

1. Homepage（首页）
2. Game（游戏）
3. Quiz（测验）

## 首页功能要求

- 设计风格：简洁且信息清晰。
- 内容展示：包含动画、视频或轮播中的至少一种。
- 学习内容：解释圆几何核心规则。
- 产品亮点：突出网站独特价值（USP）。
- AI 功能：包含 AI 问候或聊天功能。
- 联系方式：包含 Contact Us 表单。
- 变现区域：包含广告位或其他盈利展示区域。

## 命名与全局变量规范

- 全局变量命名采用下划线命名法。
- 颜色常量：
  - theme_color: #0d3273
  - sub_color: #4471c2
  - highlight_color: #e8a0bf
  - bg_color: #ffffff
  - bg_color_night: #0f132a
- 模式变量：
  - is_night（false 为白天，true 为黑夜）
- 全局状态：
  - 白天/黑夜
  - 中文/英文

## 全局配置文件

首页全局变量已集中在以下文件：

- 25-26_EBU5315_G17/codes/config.js

当前已配置项：

- theme_color
- sub_color
- highlight_color
- bg_color
- bg_color_night
- is_night
- is_chinese
- slider_interval_ms
- css_vars（用于覆盖 index.css 的颜色变量）

## 配色继承机制

- index.css 的关键颜色已改为 CSS 变量（var(--...))。
- 页面加载时，index.js 会读取 config.js 中的 app_config：
  - 先应用默认 CSS 变量；
  - 再用 app_config.css_vars 覆盖默认值。
- 结论：后续改色优先改 config.js，不需要再直接改 index.css。

示例（在 config.js 的 css_vars 中调整）：

- --header_bg_night
- --section_bg_night
- --chat_panel_bg_night
- --ad_bg_night_1
- --ad_bg_night_2

## 如何启动页面

### 方式一：直接打开

直接打开以下文件即可查看首页：

- 25-26_EBU5315_G17/codes/index.html

### 方式二：本地静态服务器（推荐）

1. 进入目录：
   - C:\Users\duck1\Desktop\ebu5315\25-26_EBU5315_G17\codes
2. 启动服务器（Python）：
   - python -m http.server 5500
3. 浏览器访问：[http://localhost:5500/index.html](http://localhost:5500/index.html)

## 当前首页已实现

- 三大菜单入口：Homepage / Game / Quiz
- 首页主视觉已改为“顶部横栏 + 左侧竖向菜单 + 主展示区分栏”的布局风格
- 桌面端左右布局：左侧为学习主内容，右侧为联系与广告区
- 圆几何规则轮播
- GeoGebra 交互控件（独立页面嵌入）
- AI 问候与轻量聊天
- 右下角固定 Chat with AI 入口
- 回到顶部按钮（滚动后出现）
- Contact Us 表单及交互反馈
- 中英切换与昼夜切换
- 广告位展示区域

## 本次同步更新（2026-03-16）

- 项目 README 已恢复到初始版本（仅保留原始成员与分工信息）。
- 夜间模式视觉已调暗并降低饱和度：
  - config 中夜间背景色调整为 #0f132a。
  - 首页夜间背景、卡片、头部、聊天面板和广告区的颜色强度已下调。
- 首页配色继承已打通：index.css 颜色可由 config.js 的 css_vars 统一接管。
- 首页结构更新为左右两栏，补充右下角 Chat with AI 与回到顶部按钮。
- 首页版式已参考新的展示型布局重构，但主视觉与文案为圆几何自定义占位内容，未直接照抄参考图。

## 本次同步更新（2026-03-18）

- 按“重做”要求重新制作首页首屏视觉：
  - 调整主视觉左右比例、标题字号和按钮排布，减少挤压感。
  - 保持左侧菜单“主页 / 测验 / 游戏”白色显示。
- 中间圆图改为稳定的独立页面渲染（保持单独 HTML 引用关系）：
  - 入口文件：`25-26_EBU5315_G17/codes/geometry-board.html`
  - 首页通过 iframe 引入：`25-26_EBU5315_G17/codes/index.html`
- 修复圆图异常渲染问题：
  - 重写 SVG 网格定义，避免出现黑白棋盘块。
  - 重新绘制半径、直径、弦、切线和扇形示意，并补充公式条与图例。
- 新增首页与独立圆图页的状态同步：
  - 首页切换中英/昼夜时，会通过 `postMessage` 同步到独立圆图页。
  - 相关逻辑在 `25-26_EBU5315_G17/codes/index.js`。

## 本次同步更新（2026-03-18，GeoGebra 与交互优化）

- 首页中间圆介绍改为 GeoGebra 官方控件嵌入：
  - 使用 `https://cdn.geogebra.org/apps/deployggb.js`。
  - 入口文件：`25-26_EBU5315_G17/codes/geometry-board.html`，由首页 iframe 引入。
- GeoGebra 语法与拓扑关系修复：
  - 扇形与切线命令增加兼容回退，避免语法报错弹窗。
  - 直径与弦拆分为独立对象：直径 `DE`（过圆心）、弦 `FG`（不经过圆心）。
  - 端点约束在圆上：`D=Point(c)`、`E=Rotate(D,180°,O)`、`F=Point(c)`、`G=Rotate(F,70°,O)`。
- 正圆显示修复：
  - 根据容器宽高动态设置坐标系比例，修复拉伸成椭圆问题。
- GeoGebra 课堂展示模式：
  - 隐藏编辑相关 UI（工具栏、菜单栏、代数输入与代数视图）。
  - 保留教学所需交互（拖点、重置、缩放拖拽）。
- 侧边栏英文模式交互优化：
  - 改为“常态图标 + 悬浮文字标签”模式，解决英文文字显示不全。
  - Tooltip 层级提升，避免被页面内容遮挡。
  - 移动端自动显示图标+文字，兼容触屏无悬浮场景。
