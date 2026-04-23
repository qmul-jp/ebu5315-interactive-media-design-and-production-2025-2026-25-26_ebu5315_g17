const default_config = {
	theme_color: "#0d3273",
	sub_color: "#4471c2",
	highlight_color: "#e8a0bf",
	bg_color: "#ffffff",
	bg_color_night: "#0f132a",
	is_night: false,
	is_chinese: true,
	css_vars: {
		"--text_color": "#102147",
		"--text_color_night": "#edf1ff",
		"--panel_color": "#f4f8ff",
		"--panel_color_night": "#1a223d",
		"--line_color": "rgba(68, 113, 194, 0.25)",
		"--shadow_soft": "0 16px 36px rgba(13, 50, 115, 0.14)",
		"--body_bg_day_orb_left": "#e9f0ff",
		"--body_bg_day_orb_right": "#ffeaf2",
		"--body_bg_night_orb_left": "rgba(62, 84, 138, 0.16)",
		"--body_bg_night_orb_right": "rgba(120, 102, 128, 0.12)",
		"--secondary_btn_bg_day": "#ffffff",
		"--secondary_btn_bg_night": "rgba(255, 255, 255, 0.08)"
	}
};

const runtime_config = window.app_config || default_config;
const root_element = document.documentElement;
const body_element = document.body;

const i18n_text = {
	zh: {
		brand_tag: "GCSE 圆几何游戏",
		mode_day: "夜间模式",
		mode_night: "白天模式",
		nav_home: "主页",
		nav_quiz: "测验",
		nav_game: "游戏",
		stage_kicker: "Game Roadmap",
		stage_title: "6 个关卡逐步推进",
		stage_1: "圆心角与弧长关系",
		stage_2: "同弧圆周角关系",
		stage_3: "半圆所对圆周角是直角",
		stage_4: "圆内接四边形对角互补",
		stage_5: "切线垂直过切点半径",
		stage_6: "同一点引切线长相等",
		stage_tip: "点击关卡卡片进入练习，系统会自动记录你的完成进度。",
		hero_kicker: "Circle Geometry Arena",
		hero_line_1: "先观察",
		hero_line_2: "再推理",
		hero_line_3: "最后通关",
		hero_desc: "通过拖拽与判断题，把圆几何定理变成可视化体验，再用测验巩固记忆。",
		cta_start: "从第 1 关开始",
		cta_quiz: "进入分级测验",
		tips_label: "学习建议",
		tips_text: "每完成一关都会自动标记，建议按顺序练习，最后去测验检验掌握度。",
		reset_progress: "重置游戏进度",
		levels_title: "关卡列表",
		progress_text: "你已完成 {done} / {total} 个关卡。",
		level_1_title: "圆心角定理",
		level_1_desc: "理解圆心角、弧和弦之间的一一对应关系。",
		level_2_title: "同弧圆周角定理",
		level_2_desc: "比较不同位置圆周角，建立同弧关系直觉。",
		level_3_title: "半圆直角定理",
		level_3_desc: "观察半圆所对角恒为 90° 的图形证据。",
		level_4_title: "圆内接四边形定理",
		level_4_desc: "练习对角互补性质，提升综合推理能力。",
		level_5_title: "切线半径垂直定理",
		level_5_desc: "通过拖动观察切点处 90° 关系的稳定性。",
		level_6_title: "切线长定理",
		level_6_desc: "比较两条切线段长度，完成最终综合关卡。",
		status_done: "已完成",
		status_incomplete: "未完成",
		quick_title_kicker: "Quick Route",
		quick_title: "想先复习规则再闯关？",
		quick_desc: "回到首页看规则轮播与图形演示，再返回继续游戏。",
		quick_btn: "返回主页复习",
		method_title: "如何使用这一页",
		method_1_title: "按序练习",
		method_1_desc: "建议从 01 开始，逐步建立圆几何知识网络。",
		method_2_title: "即时反馈",
		method_2_desc: "每一关都提供可视化关系，帮助你快速定位错误。",
		method_3_title: "测验闭环",
		method_3_desc: "完成关卡后进入测验，把直觉转化为稳定得分。",
		ad_title: "Sponsored Learning Pick",
		ad_desc: "广告位：可接入教学文具、在线课程或学习 App 推广。",
		footer_text: "EBU5315 Group 17 · Circle Geometry Game Path"
	},
	en: {
		brand_tag: "GCSE Circle Geometry Games",
		mode_day: "Night Mode",
		mode_night: "Day Mode",
		nav_home: "Homepage",
		nav_quiz: "Quiz",
		nav_game: "Game",
		stage_kicker: "Game Roadmap",
		stage_title: "Six Levels, One Learning Path",
		stage_1: "Central angles and intercepted arcs",
		stage_2: "Inscribed angles on the same arc",
		stage_3: "Angle in a semicircle is 90 degrees",
		stage_4: "Opposite angles in cyclic quadrilaterals",
		stage_5: "Tangent is perpendicular to radius",
		stage_6: "Equal tangent lengths from one point",
		stage_tip: "Open any level card to start. Your progress will be tracked automatically.",
		hero_kicker: "Circle Geometry Arena",
		hero_line_1: "Observe",
		hero_line_2: "Reason",
		hero_line_3: "Clear The Levels",
		hero_desc: "Turn circle geometry theorems into visual challenges, then consolidate with a quiz.",
		cta_start: "Start From Level 01",
		cta_quiz: "Open Level Quiz",
		tips_label: "Study Tip",
		tips_text: "Complete levels in order for a smoother learning curve, then verify with the quiz.",
		reset_progress: "Reset Game Progress",
		levels_title: "Game Levels",
		progress_text: "You have completed {done} / {total} levels.",
		level_1_title: "Central Angle Theorem",
		level_1_desc: "Match central angles with arcs and chords.",
		level_2_title: "Inscribed Angle Theorem",
		level_2_desc: "Compare inscribed angles on the same arc.",
		level_3_title: "Semicircle Right Angle Theorem",
		level_3_desc: "See why the angle is always 90 degrees.",
		level_4_title: "Cyclic Quadrilateral Theorem",
		level_4_desc: "Practice opposite-angle supplementary logic.",
		level_5_title: "Tangent-Radius Perpendicular Theorem",
		level_5_desc: "Observe stable right-angle relation at tangent points.",
		level_6_title: "Tangent Length Theorem",
		level_6_desc: "Compare two tangent segments from one point.",
		status_done: "Done",
		status_incomplete: "Not Done",
		quick_title_kicker: "Quick Route",
		quick_title: "Need A Quick Rule Review First?",
		quick_desc: "Return to homepage to review rule slides and visual examples.",
		quick_btn: "Back To Homepage",
		method_title: "How To Use This Page",
		method_1_title: "Follow The Order",
		method_1_desc: "Start with level 01 and build knowledge step by step.",
		method_2_title: "Use Visual Feedback",
		method_2_desc: "Each game provides diagram-based feedback for fast correction.",
		method_3_title: "Close The Loop With Quiz",
		method_3_desc: "After games, use quiz to convert intuition into reliable answers.",
		ad_title: "Sponsored Learning Pick",
		ad_desc: "Ad slot for stationery, online courses, or educational apps.",
		footer_text: "EBU5315 Group 17 · Circle Geometry Game Path"
	}
};

const language_toggle_btn = document.getElementById("language_toggle_btn");
const mode_toggle_btn = document.getElementById("mode_toggle_btn");
const reset_progress_btn = document.getElementById("reset_progress_btn");
const progress_text_element = document.getElementById("progress_text");
const level_cards = Array.from(document.querySelectorAll(".level_card[data-level]"));

let is_night = localStorage.getItem('circlab_night_mode') === 'true';

let is_chinese = localStorage.getItem('circlab_language') !== 'en';

function get_locale() {
	return is_chinese ? "zh" : "en";
}

function get_text(key) {
	return i18n_text[get_locale()][key];
}

function set_theme_variables() {
	root_element.style.setProperty("--theme_color", runtime_config.theme_color || default_config.theme_color);
	root_element.style.setProperty("--sub_color", runtime_config.sub_color || default_config.sub_color);
	root_element.style.setProperty("--highlight_color", runtime_config.highlight_color || default_config.highlight_color);
	root_element.style.setProperty("--bg_color", runtime_config.bg_color || default_config.bg_color);
	root_element.style.setProperty("--bg_color_night", runtime_config.bg_color_night || default_config.bg_color_night);

	Object.entries(default_config.css_vars).forEach(([key, value]) => {
		root_element.style.setProperty(key, value);
	});

	const css_vars = runtime_config.css_vars && typeof runtime_config.css_vars === "object"
		? runtime_config.css_vars
		: {};

	Object.entries(css_vars).forEach(([key, value]) => {
		if (key.startsWith("--") && typeof value === "string") {
			root_element.style.setProperty(key, value);
		}
	});
}

function get_level_storage_key(level) {
	return `g17_game_level_${level}`;
}

function get_completed_count() {
	return level_cards.reduce((count, card) => {
		const level = card.dataset.level;
		if (level && localStorage.getItem(get_level_storage_key(level)) === "1") {
			return count + 1;
		}
		return count;
	}, 0);
}

function update_progress_view() {
	const total = level_cards.length;
	const done = get_completed_count();

	progress_text_element.textContent = get_text("progress_text")
		.replace("{done}", String(done))
		.replace("{total}", String(total));

	level_cards.forEach((card) => {
		const level = card.dataset.level;
		const done_level = Boolean(level && localStorage.getItem(get_level_storage_key(level)) === "1");
		card.classList.toggle("completed_level", done_level);

		const badge = card.querySelector(".completion_badge");
		if (badge) {
			badge.textContent = done_level ? get_text("status_done") : get_text("status_incomplete");
		}
	});
}

function apply_mode() {
	body_element.classList.toggle("night_mode", is_night);
	localStorage.setItem('circlab_night_mode', is_night);
	mode_toggle_btn.textContent = is_night ? get_text("mode_night") : get_text("mode_day");
}

function apply_language() {
	const lang_dict = i18n_text[get_locale()];
	document.documentElement.lang = is_chinese ? "zh-CN" : "en";
	localStorage.setItem('circlab_language', is_chinese ? 'zh' : 'en');

	document.querySelectorAll("[data-i18n]").forEach((element) => {
		const key = element.getAttribute("data-i18n");
		if (key && lang_dict[key]) {
			element.textContent = lang_dict[key];
		}
	});

	language_toggle_btn.textContent = is_chinese ? "EN" : "中文";
	mode_toggle_btn.textContent = is_night ? get_text("mode_night") : get_text("mode_day");
	update_progress_view();
}

function mark_level_as_started(event) {
	const card = event.currentTarget;
	const level = card.dataset.level;
	if (!level) {
		return;
	}
	localStorage.setItem(get_level_storage_key(level), "1");
}

function reset_progress() {
	level_cards.forEach((card) => {
		const level = card.dataset.level;
		if (level) {
			localStorage.removeItem(get_level_storage_key(level));
		}
	});
	update_progress_view();
}

function bind_events() {
	language_toggle_btn.addEventListener("click", () => {
		is_chinese = !is_chinese;
		apply_language();
	});

	mode_toggle_btn.addEventListener("click", () => {
		is_night = !is_night;
		apply_mode();
	});

	level_cards.forEach((card) => {
		card.addEventListener("click", mark_level_as_started);
	});

	reset_progress_btn.addEventListener("click", reset_progress);
}

function initialize() {
	set_theme_variables();
	apply_mode();
	apply_language();
	bind_events();
}

initialize();
