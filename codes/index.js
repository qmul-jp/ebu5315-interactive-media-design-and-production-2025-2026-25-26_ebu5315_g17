const default_config = {
	theme_color: "#0d3273",
	sub_color: "#4471c2",
	highlight_color: "#e8a0bf",
	bg_color: "#ffffff",
	bg_color_night: "#0f132a",
	is_night: false,
	is_chinese: true,
	slider_interval_ms: 5000,
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
		"--header_bg_day": "rgba(255, 255, 255, 0.9)",
		"--header_bg_night": "rgba(14, 18, 36, 0.9)",
		"--section_bg_day": "rgba(255, 255, 255, 0.88)",
		"--section_bg_night": "rgba(18, 22, 42, 0.9)",
		"--secondary_btn_bg_day": "#ffffff",
		"--secondary_btn_bg_night": "rgba(255, 255, 255, 0.08)",
		"--ai_card_border": "rgba(68, 113, 194, 0.42)",
		"--ai_card_bg_night": "rgba(22, 28, 50, 0.92)",
		"--orbit_stage_bg_day_1": "rgba(68, 113, 194, 0.16)",
		"--orbit_stage_bg_day_2": "rgba(232, 160, 191, 0.2)",
		"--orbit_stage_bg_night_1": "rgba(74, 95, 138, 0.24)",
		"--orbit_stage_bg_night_2": "rgba(100, 84, 109, 0.18)",
		"--contact_input_bg_day": "#fff",
		"--contact_input_bg_night": "rgba(255, 255, 255, 0.12)",
		"--ad_border_day": "rgba(232, 160, 191, 0.8)",
		"--ad_bg_day_1": "rgba(232, 160, 191, 0.2)",
		"--ad_bg_day_2": "rgba(68, 113, 194, 0.15)",
		"--ad_border_night": "rgba(147, 164, 205, 0.4)",
		"--ad_bg_night_1": "rgba(82, 96, 135, 0.24)",
		"--ad_bg_night_2": "rgba(61, 74, 112, 0.28)",
		"--chat_panel_bg_day": "#ffffff",
		"--chat_panel_bg_night": "rgba(14, 20, 39, 0.96)",
		"--chat_head_bg": "rgba(68, 113, 194, 0.16)",
		"--chat_bubble_bot_bg": "rgba(68, 113, 194, 0.14)",
		"--chat_bubble_user_bg": "rgba(232, 160, 191, 0.2)"
	}
};

const runtime_config = window.app_config || default_config;

const theme_color = runtime_config.theme_color || default_config.theme_color;
const sub_color = runtime_config.sub_color || default_config.sub_color;
const highlight_color = runtime_config.highlight_color || default_config.highlight_color;
const bg_color = runtime_config.bg_color || default_config.bg_color;
const bg_color_night = runtime_config.bg_color_night || default_config.bg_color_night;

const slider_interval_ms = Number.isFinite(runtime_config.slider_interval_ms)
	? runtime_config.slider_interval_ms
	: default_config.slider_interval_ms;

const config_css_vars = (runtime_config.css_vars && typeof runtime_config.css_vars === "object")
	? runtime_config.css_vars
	: {};

let is_night = typeof runtime_config.is_night === "boolean"
	? runtime_config.is_night
	: default_config.is_night;

let is_chinese = typeof runtime_config.is_chinese === "boolean"
	? runtime_config.is_chinese
	: default_config.is_chinese;

let current_slide_index = 0;

const i18n_text = {
	zh: {
		brand_tag: "GCSE 圆几何学习",
		nav_home: "主页",
		nav_game: "游戏",
		nav_quiz: "测验",
		mode_day: "夜间模式",
		mode_night: "白天模式",
		hero_badge: "Interactive Math-Learning Website",
		hero_title: "一站掌握圆几何核心规则",
		hero_subtitle: "通过动画、游戏挑战与分级测验，把 GCSE 圆相关几何从“记公式”变成“会应用”。",
		hero_cta_game: "开始游戏挑战",
		hero_cta_quiz: "进入分级测验",
		ai_greeting_title: "AI 学习助理",
		ai_greeting_text: "你好，我是 CircleBot。告诉我你想复习半径、弦、切线还是面积？",
		open_chat: "打开聊天",
		showcase_kicker: "Circle Geometry Studio",
		showcase_line_1: "看清",
		showcase_line_2: "圆的联系",
		showcase_line_3: "从这里开始",
		showcase_desc: "先观察关键关系，再进入规则、挑战和测验，把圆几何从静态公式变成可操作的思路。",
		ai_preview_label: "AI 导学",
		legend_radius_title: "半径",
		legend_radius_desc: "圆心到圆周上一点的距离",
		legend_diameter_title: "直径",
		legend_diameter_desc: "经过圆心的最长弦",
		legend_tangent_title: "切线",
		legend_tangent_desc: "与半径在切点形成 90°",
		legend_area_title: "面积",
		legend_area_desc: "公式 A = πr²",
		visual_note: "动态示意：半径 OA 随角度旋转，圆心到圆周距离保持不变",
		rules_title: "Circle Rules Slide Show",
		rules_subtitle: "4 个高频规则，课堂前 2 分钟快速热身",
		slide_1_title: "半径与直径",
		slide_1_desc: "直径始终等于 2 倍半径，记作 d = 2r。",
		slide_2_title: "周长公式",
		slide_2_desc: "圆周长 C = 2πr，也可以写成 C = πd。",
		slide_3_title: "面积公式",
		slide_3_desc: "圆面积 A = πr²，注意单位是平方单位。",
		slide_4_title: "切线性质",
		slide_4_desc: "切线与过切点的半径互相垂直，夹角为 90°。",
		usp_title: "CircleLab 的独特价值",
		usp_1_title: "学-练-测闭环",
		usp_1_desc: "首页看规则、游戏练应用、测验验掌握，学习路径清晰。",
		usp_2_title: "双语与昼夜模式",
		usp_2_desc: "支持中文/英文与白天/黑夜切换，适应不同学习习惯。",
		usp_3_title: "即时反馈",
		usp_3_desc: "AI 助理和表单反馈帮助你快速定位薄弱点。",
		game_card_kicker: "Game Path",
		game_card_title: "把规则放进图形挑战",
		game_card_desc: "在拖动、判断与即时反馈中理解半径、切线和面积之间的联系。",
		quiz_card_kicker: "Quiz Route",
		quiz_card_title: "用分级题目检查掌握度",
		quiz_card_desc: "从基础识别到公式应用，再到综合题，逐步定位你的薄弱环节。",
		contact_title: "联系我们",
		contact_subtitle: "对内容或功能有建议？欢迎留言给我们。",
		contact_name: "姓名",
		contact_email: "邮箱",
		contact_message: "留言",
		contact_name_placeholder: "请输入姓名",
		contact_email_placeholder: "请输入邮箱",
		contact_message_placeholder: "请告诉我们你希望增加的圆几何内容",
		contact_submit: "提交",
		ad_title: "学习推广位",
		ad_desc: "广告位：可接入教学文具、在线课程或学习 App 推广。",
		chat_placeholder: "输入问题，如：弦和切线有什么区别？",
		chat_send: "发送",
		chat_with_ai: "Chat with AI",
		back_to_top: "回到顶部",
		footer_text: "EBU5315 第17组 · Circle Geometry Learning",
		form_success: "已收到你的建议，我们会尽快回复。",
		form_invalid: "请先完整填写姓名、邮箱和留言。",
		chat_welcome: "你好，我可以帮你复习圆周长、面积、切线或弦相关问题。",
		chat_default: "这是个好问题。你可以先给我已知条件（例如半径、直径或角度），我会帮你一步步分析。",
		chat_radius: "半径是圆心到圆周上一点的距离。记住：直径 = 2 × 半径。",
		chat_area: "圆面积公式是 A = πr²。先平方半径，再乘 π。",
		chat_circumference: "圆周长公式是 C = 2πr，也可以写成 C = πd。",
		chat_tangent: "切线与经过切点的半径垂直，所以夹角是 90°。",
		chat_chord: "弦是连接圆上两点的线段；直径是经过圆心的特殊弦。"
	},
	en: {
		brand_tag: "GCSE Circle Geometry",
		nav_home: "Homepage",
		nav_game: "Game",
		nav_quiz: "Quiz",
		mode_day: "Night Mode",
		mode_night: "Day Mode",
		hero_badge: "Interactive Math-Learning Website",
		hero_title: "Master Circle Geometry in One Place",
		hero_subtitle: "Use animations, challenges, and level-based quizzes to turn circle formulas into real problem-solving skills.",
		hero_cta_game: "Start Game Challenge",
		hero_cta_quiz: "Open Level Quiz",
		ai_greeting_title: "AI Learning Assistant",
		ai_greeting_text: "Hi, I am CircleBot. Do you want to review radius, chord, tangent, or area first?",
		open_chat: "Open Chat",
		showcase_kicker: "Circle Geometry Studio",
		showcase_line_1: "See Clearly",
		showcase_line_2: "How Circles Connect",
		showcase_line_3: "Start Here",
		showcase_desc: "Observe the key relationships first, then move into rules, challenges, and quizzes that turn circle geometry into a usable method.",
		ai_preview_label: "AI Guide",
		legend_radius_title: "Radius",
		legend_radius_desc: "Distance from the center to the circumference",
		legend_diameter_title: "Diameter",
		legend_diameter_desc: "The longest chord through the center",
		legend_tangent_title: "Tangent",
		legend_tangent_desc: "Forms a 90° angle with the radius at the touch point",
		legend_area_title: "Area",
		legend_area_desc: "Formula A = πr²",
		visual_note: "Animated idea: radius OA rotates while distance from center to circumference stays constant",
		rules_title: "Circle Rules Slide Show",
		rules_subtitle: "4 high-frequency rules for a 2-minute warm-up",
		slide_1_title: "Radius and Diameter",
		slide_1_desc: "Diameter is always twice the radius: d = 2r.",
		slide_2_title: "Circumference",
		slide_2_desc: "Circumference C = 2πr, also C = πd.",
		slide_3_title: "Area",
		slide_3_desc: "Area of a circle is A = πr². Use square units.",
		slide_4_title: "Tangent Rule",
		slide_4_desc: "A tangent is perpendicular to the radius at the point of contact (90°).",
		usp_title: "What Makes CircleLab Different",
		usp_1_title: "Learn-Practice-Test Loop",
		usp_1_desc: "Read rules on homepage, apply in game, verify in quiz.",
		usp_2_title: "Bilingual + Day/Night",
		usp_2_desc: "Switch Chinese/English and day/night modes for different learning habits.",
		usp_3_title: "Instant Feedback",
		usp_3_desc: "AI assistant and contact feedback quickly reveal weak points.",
		game_card_kicker: "Game Path",
		game_card_title: "Apply rules in visual challenges",
		game_card_desc: "Use dragging, judgment, and instant feedback to understand how radius, tangent, and area connect.",
		quiz_card_kicker: "Quiz Route",
		quiz_card_title: "Check mastery with level-based questions",
		quiz_card_desc: "Move from recognition to formula use to mixed problems, and identify weak points step by step.",
		contact_title: "Contact Us",
		contact_subtitle: "Have ideas about content or features? Send us a message.",
		contact_name: "Name",
		contact_email: "Email",
		contact_message: "Message",
		contact_name_placeholder: "Enter your name",
		contact_email_placeholder: "Enter your email",
		contact_message_placeholder: "Tell us which circle topic you want next",
		contact_submit: "Submit",
		ad_title: "Sponsored Learning Pick",
		ad_desc: "Ad slot: stationery, online lessons, or learning app collaborations.",
		chat_placeholder: "Ask a question, e.g. what is tangent vs chord?",
		chat_send: "Send",
		chat_with_ai: "Chat with AI",
		back_to_top: "Back to Top",
		footer_text: "EBU5315 Group 17 · Circle Geometry Learning",
		form_success: "Thanks. Your suggestion has been sent.",
		form_invalid: "Please complete name, email, and message first.",
		chat_welcome: "Hi, I can help with circumference, area, tangent, or chord topics.",
		chat_default: "Great question. Share known values (radius, diameter, angle), and I can guide you step by step.",
		chat_radius: "Radius is the distance from center to the circle. Remember: diameter = 2 × radius.",
		chat_area: "Area formula is A = πr². Square the radius first, then multiply by π.",
		chat_circumference: "Circumference formula is C = 2πr, or C = πd.",
		chat_tangent: "A tangent is perpendicular to the radius at the touch point, so angle is 90°.",
		chat_chord: "A chord joins two points on a circle. A diameter is a special chord through the center."
	}
};

const root_element = document.documentElement;
const body_element = document.body;
const language_toggle_btn = document.getElementById("language_toggle_btn");
const mode_toggle_btn = document.getElementById("mode_toggle_btn");

const slide_elements = Array.from(document.querySelectorAll(".rule_slide"));
const dot_elements = Array.from(document.querySelectorAll(".slide_dot"));
const slide_prev_btn = document.getElementById("slide_prev_btn");
const slide_next_btn = document.getElementById("slide_next_btn");

const chat_panel = document.getElementById("chat_panel");
const chat_toggle_btn = document.getElementById("chat_toggle_btn");
const chat_close_btn = document.getElementById("chat_close_btn");
const chat_messages = document.getElementById("chat_messages");
const chat_input = document.getElementById("chat_input");
const chat_send_btn = document.getElementById("chat_send_btn");
const chat_fab_btn = document.getElementById("chat_fab_btn");
const back_to_top_btn = document.getElementById("back_to_top_btn");
const geometry_frame = document.querySelector(".geometry_frame");

const contact_form = document.getElementById("contact_form");
const name_input = document.getElementById("name_input");
const email_input = document.getElementById("email_input");
const message_input = document.getElementById("message_input");
const contact_status = document.getElementById("contact_status");

let slide_timer_id = null;

function set_theme_variables() {
	root_element.style.setProperty("--theme_color", theme_color);
	root_element.style.setProperty("--sub_color", sub_color);
	root_element.style.setProperty("--highlight_color", highlight_color);
	root_element.style.setProperty("--bg_color", bg_color);
	root_element.style.setProperty("--bg_color_night", bg_color_night);

	Object.entries(default_config.css_vars).forEach(([css_key, css_value]) => {
		root_element.style.setProperty(css_key, css_value);
	});

	Object.entries(config_css_vars).forEach(([css_key, css_value]) => {
		if (css_key.startsWith("--") && typeof css_value === "string") {
			root_element.style.setProperty(css_key, css_value);
		}
	});
}

function get_locale() {
	return is_chinese ? "zh" : "en";
}

function apply_language() {
	const locale = get_locale();
	const lang_dict = i18n_text[locale];

	document.documentElement.lang = is_chinese ? "zh-CN" : "en";

	document.querySelectorAll("[data-i18n]").forEach((element) => {
		const key_name = element.getAttribute("data-i18n");
		if (lang_dict[key_name]) {
			element.textContent = lang_dict[key_name];
		}
	});

	document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
		const key_name = element.getAttribute("data-i18n-placeholder");
		if (lang_dict[key_name]) {
			element.setAttribute("placeholder", lang_dict[key_name]);
		}
	});

	document.querySelectorAll(".side_nav_link").forEach((link_element) => {
		const tooltip = link_element.querySelector(".side_nav_tooltip[data-i18n]");
		if (!tooltip) {
			return;
		}

		const key_name = tooltip.getAttribute("data-i18n");
		if (key_name && lang_dict[key_name]) {
			link_element.setAttribute("aria-label", lang_dict[key_name]);
		}
	});

	language_toggle_btn.textContent = is_chinese ? "EN" : "中文";
	mode_toggle_btn.textContent = is_night ? lang_dict.mode_night : lang_dict.mode_day;

	if (chat_messages.children.length === 0) {
		add_chat_message("bot", lang_dict.chat_welcome);
	}

	sync_geometry_board_state();
}

function apply_mode() {
	body_element.classList.toggle("night_mode", is_night);
	const locale = get_locale();
	const lang_dict = i18n_text[locale];
	mode_toggle_btn.textContent = is_night ? lang_dict.mode_night : lang_dict.mode_day;
	sync_geometry_board_state();
}

function sync_geometry_board_state() {
	if (!geometry_frame || !geometry_frame.contentWindow) {
		return;
	}

	geometry_frame.contentWindow.postMessage(
		{
			type: "circlab_state",
			night: is_night,
			locale: get_locale()
		},
		"*"
	);
}

function show_slide(next_index) {
	if (!slide_elements.length) {
		return;
	}

	const total = slide_elements.length;
	current_slide_index = (next_index + total) % total;

	slide_elements.forEach((slide_item, index) => {
		slide_item.classList.toggle("active_slide", index === current_slide_index);
	});

	dot_elements.forEach((dot_item, index) => {
		dot_item.classList.toggle("active_dot", index === current_slide_index);
	});
}

function start_slider_timer() {
	clearInterval(slide_timer_id);
	slide_timer_id = setInterval(() => {
		show_slide(current_slide_index + 1);
	}, slider_interval_ms);
}

function add_chat_message(role_name, content_text) {
	const bubble = document.createElement("div");
	bubble.className = `chat_bubble ${role_name}`;
	bubble.textContent = content_text;
	chat_messages.appendChild(bubble);
	chat_messages.scrollTop = chat_messages.scrollHeight;
}

function open_chat_panel() {
	chat_panel.classList.remove("hidden_panel");
	if (chat_messages.children.length === 0) {
		add_chat_message("bot", i18n_text[get_locale()].chat_welcome);
	}
	chat_input.focus();
}

function close_chat_panel() {
	chat_panel.classList.add("hidden_panel");
}

function get_ai_response(user_message) {
	const locale = get_locale();
	const lang_dict = i18n_text[locale];
	const message_text = user_message.toLowerCase();

	if (message_text.includes("radius") || message_text.includes("半径") || message_text.includes("diameter") || message_text.includes("直径")) {
		return lang_dict.chat_radius;
	}

	if (message_text.includes("area") || message_text.includes("面积")) {
		return lang_dict.chat_area;
	}

	if (message_text.includes("circumference") || message_text.includes("周长") || message_text.includes("perimeter")) {
		return lang_dict.chat_circumference;
	}

	if (message_text.includes("tangent") || message_text.includes("切线")) {
		return lang_dict.chat_tangent;
	}

	if (message_text.includes("chord") || message_text.includes("弦")) {
		return lang_dict.chat_chord;
	}

	return lang_dict.chat_default;
}

function handle_send_message() {
	const user_text = chat_input.value.trim();
	if (!user_text) {
		return;
	}

	add_chat_message("user", user_text);
	chat_input.value = "";

	setTimeout(() => {
		add_chat_message("bot", get_ai_response(user_text));
	}, 300);
}

function handle_contact_submit(event) {
	event.preventDefault();
	const locale = get_locale();
	const lang_dict = i18n_text[locale];
	const name_value = name_input.value.trim();
	const email_value = email_input.value.trim();
	const message_value = message_input.value.trim();

	if (!name_value || !email_value || !message_value) {
		contact_status.textContent = lang_dict.form_invalid;
		contact_status.style.color = "#c43d6d";
		return;
	}

	contact_status.textContent = lang_dict.form_success;
	contact_status.style.color = sub_color;
	contact_form.reset();
}

function update_back_to_top_visibility() {
	if (!back_to_top_btn) {
		return;
	}

	if (window.scrollY > 280) {
		back_to_top_btn.classList.remove("hidden_btn");
	} else {
		back_to_top_btn.classList.add("hidden_btn");
	}
}

function scroll_to_top() {
	window.scrollTo({ top: 0, behavior: "smooth" });
}

function register_events() {
	language_toggle_btn.addEventListener("click", () => {
		is_chinese = !is_chinese;
		apply_language();
	});

	mode_toggle_btn.addEventListener("click", () => {
		is_night = !is_night;
		apply_mode();
	});

	slide_prev_btn.addEventListener("click", () => {
		show_slide(current_slide_index - 1);
		start_slider_timer();
	});

	slide_next_btn.addEventListener("click", () => {
		show_slide(current_slide_index + 1);
		start_slider_timer();
	});

	dot_elements.forEach((dot_item, dot_index) => {
		dot_item.addEventListener("click", () => {
			show_slide(dot_index);
			start_slider_timer();
		});
	});

	chat_toggle_btn.addEventListener("click", open_chat_panel);
	chat_fab_btn.addEventListener("click", open_chat_panel);
	chat_close_btn.addEventListener("click", close_chat_panel);
	chat_send_btn.addEventListener("click", handle_send_message);
	back_to_top_btn.addEventListener("click", scroll_to_top);

	chat_input.addEventListener("keydown", (event) => {
		if (event.key === "Enter") {
			handle_send_message();
		}
	});

	if (geometry_frame) {
		geometry_frame.addEventListener("load", sync_geometry_board_state);
	}

	contact_form.addEventListener("submit", handle_contact_submit);
	window.addEventListener("scroll", update_back_to_top_visibility, { passive: true });
}

function init_homepage() {
	set_theme_variables();
	apply_mode();
	apply_language();
	show_slide(0);
	start_slider_timer();
	register_events();
	update_back_to_top_visibility();
}

init_homepage();
