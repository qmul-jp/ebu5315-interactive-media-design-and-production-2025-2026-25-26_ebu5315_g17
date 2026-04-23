const LANGUAGE_KEY = "circlab_language";
const NIGHT_MODE_KEY = "circlab_night_mode";

const i18n_text = {
	zh: {
		page_title: "CircleLab | 设置",
		brand_tag: "移动端设置",
		back_home: "← 返回主页",
		settings_kicker: "Mobile Settings",
		settings_title: "设置",
		settings_desc: "把语言、主题和色彩模式统一放在这里，切换后会同步到首页、测验和游戏页。",
		setting_group_display: "显示设置",
		setting_group_display_desc: "语言和昼夜模式会在各页面间同步。",
		setting_group_color: "色彩模式",
		setting_group_color_desc: "为色弱和高对比浏览提供不同的颜色滤镜。",
		settings_quick_links: "快速跳转",
		settings_quick_links_desc: "返回到你正在学习的页面。",
		nav_home: "主页",
		nav_quiz: "测验",
		nav_game: "游戏",
		mode_day: "夜间模式",
		mode_night: "白天模式"
	},
	en: {
		page_title: "CircleLab | Settings",
		brand_tag: "Mobile Settings",
		back_home: "← Back Home",
		settings_kicker: "Mobile Settings",
		settings_title: "Settings",
		settings_desc: "Keep language, theme, and color mode in one place. Changes sync across homepage, quiz, and game pages.",
		setting_group_display: "Display Settings",
		setting_group_display_desc: "Language and day/night mode stay in sync across pages.",
		setting_group_color: "Color Mode",
		setting_group_color_desc: "Choose a color filter that helps with color-blind or high-contrast viewing.",
		settings_quick_links: "Quick Links",
		settings_quick_links_desc: "Jump back to the page you are studying.",
		nav_home: "Homepage",
		nav_quiz: "Quiz",
		nav_game: "Game",
		mode_day: "Night Mode",
		mode_night: "Day Mode"
	}
};

const language_toggle_btn = document.getElementById("language_toggle_btn");
const mode_toggle_btn = document.getElementById("mode_toggle_btn");

let is_chinese = localStorage.getItem(LANGUAGE_KEY) !== "en";
let is_night = localStorage.getItem(NIGHT_MODE_KEY) === "true";

function get_locale() {
	return is_chinese ? "zh" : "en";
}

function save_language() {
	try {
		localStorage.setItem(LANGUAGE_KEY, is_chinese ? "zh" : "en");
	} catch (error) {
		console.warn("Failed to save language preference:", error);
	}
}

function save_mode() {
	try {
		localStorage.setItem(NIGHT_MODE_KEY, String(is_night));
	} catch (error) {
		console.warn("Failed to save night mode preference:", error);
	}
}

function apply_language() {
	const locale = get_locale();
	const lang_dict = i18n_text[locale];

	document.documentElement.lang = is_chinese ? "zh-CN" : "en";
	document.title = lang_dict.page_title;

	document.querySelectorAll("[data-i18n]").forEach((element) => {
		const key = element.getAttribute("data-i18n");
		if (lang_dict[key]) {
			element.textContent = lang_dict[key];
		}
	});

	language_toggle_btn.textContent = is_chinese ? "EN" : "中文";
	mode_toggle_btn.textContent = is_night ? lang_dict.mode_night : lang_dict.mode_day;
	save_language();
}

function apply_mode() {
	document.body.classList.toggle("night_mode", is_night);
	mode_toggle_btn.textContent = is_night ? i18n_text[get_locale()].mode_night : i18n_text[get_locale()].mode_day;
	save_mode();
}

function bind_events() {
	language_toggle_btn.addEventListener("click", () => {
		is_chinese = !is_chinese;
		apply_language();
	});

	mode_toggle_btn.addEventListener("click", () => {
		is_night = !is_night;
		apply_mode();
		apply_language();
	});
}

function initialize() {
	apply_mode();
	apply_language();
	bind_events();
}

initialize();
