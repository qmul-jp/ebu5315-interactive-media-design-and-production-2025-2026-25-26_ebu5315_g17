const auth_i18n = {
	zh: {
		page_title_login: "CircleLab | 登录",
		page_title_register: "CircleLab | 注册",
		brand_tag: "圆几何学习入口",
		header_back: "返回主页",
		mode_day: "夜间模式",
		mode_night: "白天模式",
		intro_eyebrow: "学习入口",
		intro_line_1: "加入",
		intro_line_2: "CircleLab",
		intro_line_3: "一起感受圆的魅力",
		intro_desc: "加入 CircleLab，一起探索圆形与几何的魅力。通过互动图示、趣味游戏和分级测验，让学习变得更直观、更轻松。",
		feature_1_title: "双语学习",
		feature_1_desc: "延续站内的中英文切换体验，帮助你在不同语言环境下都能顺畅学习。",
		feature_2_title: "个人入口",
		feature_2_desc: "填写昵称、邮箱和密码，快速进入你的 CircleLab 学习空间。",
		feature_3_title: "白天 / 夜间",
		feature_3_desc: "根据你的学习习惯自由切换主题模式，获得更舒适的浏览体验。",
		feature_4_title: "学习旅程",
		feature_4_desc: "从首页、游戏到测验形成完整学习闭环，更方便持续探索圆几何知识。",
		demo_notice: "注册后即可开启你的 CircleLab 学习之旅，更轻松地进入圆几何世界。",
		tab_login: "登录",
		tab_register: "注册",
		panel_login_title: "欢迎回来",
		panel_login_desc: "登录你的 CircleLab 账号，继续上次的学习旅程。",
		panel_register_title: "创建账号",
		panel_register_desc: "注册后即可开始你的圆几何探索之旅。",
		label_name: "昵称",
		label_email: "邮箱",
		label_password: "密码",
		label_confirm: "确认密码",
		placeholder_name: "请输入你的昵称",
		placeholder_email: "请输入邮箱地址",
		placeholder_password: "请输入密码",
		placeholder_confirm: "请再次输入密码",
		hint_register: "建议填写一个你喜欢的学习昵称，方便识别你的个人账号。",
		submit_login: "登录",
		submit_register: "注册",
		switch_to_login: "已有账号？去登录",
		switch_to_register: "还没有账号？去注册",
		clear_demo: "清除记录",
		status_title: "操作结果",
		login_success: "登录成功，欢迎回来。",
		register_success: "注册成功，欢迎加入 CircleLab。",
		error_missing_login: "请先填写邮箱和密码。",
		error_missing_register: "请完整填写昵称、邮箱、密码和确认密码。",
		error_password_mismatch: "两次输入的密码不一致，请重新检查。",
		saved_title: "最近保存的信息",
		saved_empty: "还没有保存的信息，登录或注册后会显示在这里。",
		saved_mode: "模式",
		saved_name: "昵称",
		saved_email: "邮箱",
		saved_time: "时间",
		mode_login_label: "登录",
		mode_register_label: "注册"
	},
	en: {
		page_title_login: "CircleLab | Log In",
		page_title_register: "CircleLab | Sign Up",
		brand_tag: "Circle Geometry Learning Access",
		header_back: "Back to Home",
		mode_day: "Night Mode",
		mode_night: "Day Mode",
		intro_eyebrow: "Learning Access",
		intro_line_1: "Join",
		intro_line_2: "CircleLab",
		intro_line_3: "Enjoy the Beauty of Circles",
		intro_desc: "Join CircleLab and explore the beauty of circles through interactive visuals, playful challenges, and level-based quizzes designed to make learning more engaging.",
		feature_1_title: "Bilingual Learning",
		feature_1_desc: "Switch smoothly between Chinese and English for a more flexible learning experience.",
		feature_2_title: "Personal Access",
		feature_2_desc: "Set your name, email, and password to enter your own CircleLab learning space.",
		feature_3_title: "Day / Night",
		feature_3_desc: "Choose the visual mode that feels most comfortable for your study rhythm.",
		feature_4_title: "Learning Journey",
		feature_4_desc: "Move from homepage to games and quizzes in a smoother, more connected way.",
		demo_notice: "Create your account to start your CircleLab journey and discover circle geometry with more ease and enjoyment.",
		tab_login: "Log In",
		tab_register: "Sign Up",
		panel_login_title: "Welcome Back",
		panel_login_desc: "Log in to continue your CircleLab journey and pick up where you left off.",
		panel_register_title: "Create Your Account",
		panel_register_desc: "Sign up to begin exploring the beauty of circles with CircleLab.",
		label_name: "Display Name",
		label_email: "Email",
		label_password: "Password",
		label_confirm: "Confirm Password",
		placeholder_name: "Enter a display name",
		placeholder_email: "Enter your email address",
		placeholder_password: "Enter your password",
		placeholder_confirm: "Re-enter your password",
		hint_register: "Choose a name you would like to use in your learning profile.",
		submit_login: "Log In",
		submit_register: "Sign Up",
		switch_to_login: "Already have an account? Log In",
		switch_to_register: "New here? Sign Up",
		clear_demo: "Clear Saved Info",
		status_title: "Status",
		login_success: "Log in successful. Welcome back.",
		register_success: "Sign up successful. Welcome to CircleLab.",
		error_missing_login: "Please enter both email and password first.",
		error_missing_register: "Please complete display name, email, password, and confirm password first.",
		error_password_mismatch: "The password and confirmation do not match.",
		saved_title: "Latest Saved Info",
		saved_empty: "There is no saved info yet. Your latest log in or sign up details will appear here.",
		saved_mode: "Mode",
		saved_name: "Name",
		saved_email: "Email",
		saved_time: "Time",
		mode_login_label: "Log In",
		mode_register_label: "Sign Up"
	}
};

const DEMO_STORAGE_KEY = "circlelab_demo_auth_v1";

const auth_state = {
	mode: "login",
	is_chinese: true,
	is_night: false
};

const language_toggle_btn = document.getElementById("language_toggle_btn");
const mode_toggle_btn = document.getElementById("mode_toggle_btn");
const login_tab_btn = document.getElementById("login_tab_btn");
const register_tab_btn = document.getElementById("register_tab_btn");
const auth_form = document.getElementById("auth_form");
const submit_btn = document.getElementById("submit_btn");
const switch_mode_btn = document.getElementById("switch_mode_btn");
const clear_demo_btn = document.getElementById("clear_demo_btn");
const panel_heading_title = document.getElementById("panel_heading_title");
const panel_heading_desc = document.getElementById("panel_heading_desc");
const status_box = document.getElementById("status_box");
const status_text = document.getElementById("status_text");
const saved_demo_card = document.getElementById("saved_demo_card");
const saved_demo_empty = document.getElementById("saved_demo_empty");
const saved_mode_value = document.getElementById("saved_mode_value");
const saved_name_row = document.getElementById("saved_name_row");
const saved_name_value = document.getElementById("saved_name_value");
const saved_email_value = document.getElementById("saved_email_value");
const saved_time_value = document.getElementById("saved_time_value");

const name_field = document.getElementById("name_field");
const name_input = document.getElementById("name_input");
const email_input = document.getElementById("email_input");
const password_input = document.getElementById("password_input");
const confirm_field = document.getElementById("confirm_field");
const confirm_input = document.getElementById("confirm_input");

function get_locale() {
	return auth_state.is_chinese ? "zh" : "en";
}

function get_text(key) {
	return auth_i18n[get_locale()][key];
}

function get_query_state() {
	const params = new URLSearchParams(window.location.search);
	const mode = params.get("mode");
	const lang = params.get("lang");
	const theme = params.get("theme");

	if (mode === "register") {
		auth_state.mode = "register";
	}

	if (lang === "en") {
		auth_state.is_chinese = false;
	}

	if (theme === "night") {
		auth_state.is_night = true;
	}
}

function apply_mode() {
	document.body.classList.toggle("night_mode", auth_state.is_night);
	mode_toggle_btn.textContent = auth_state.is_night
		? get_text("mode_night")
		: get_text("mode_day");
}

function apply_language() {
	const dict = auth_i18n[get_locale()];
	document.documentElement.lang = auth_state.is_chinese ? "zh-CN" : "en";
	document.title = auth_state.mode === "register"
		? dict.page_title_register
		: dict.page_title_login;

	document.querySelectorAll("[data-i18n]").forEach((element) => {
		const key = element.getAttribute("data-i18n");
		if (key && dict[key]) {
			element.textContent = dict[key];
		}
	});

	document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
		const key = element.getAttribute("data-i18n-placeholder");
		if (key && dict[key]) {
			element.setAttribute("placeholder", dict[key]);
		}
	});

	language_toggle_btn.textContent = auth_state.is_chinese ? "EN" : "中文";
	panel_heading_title.textContent = auth_state.mode === "login"
		? dict.panel_login_title
		: dict.panel_register_title;
	panel_heading_desc.textContent = auth_state.mode === "login"
		? dict.panel_login_desc
		: dict.panel_register_desc;
	switch_mode_btn.textContent = auth_state.mode === "login"
		? dict.switch_to_register
		: dict.switch_to_login;
	submit_btn.textContent = auth_state.mode === "login"
		? dict.submit_login
		: dict.submit_register;

	render_saved_demo();
}

function set_auth_mode(mode) {
	auth_state.mode = mode === "register" ? "register" : "login";
	const is_register = auth_state.mode === "register";

	login_tab_btn.classList.toggle("active_tab", !is_register);
	register_tab_btn.classList.toggle("active_tab", is_register);
	name_field.classList.toggle("hidden", !is_register);
	confirm_field.classList.toggle("hidden", !is_register);
	name_input.toggleAttribute("required", is_register);
	confirm_input.toggleAttribute("required", is_register);

	apply_language();
	clear_status();
}

function clear_status() {
	status_box.className = "status_box hidden";
	status_text.textContent = "";
}

function show_status(kind, text) {
	status_box.className = `status_box ${kind}_state`;
	status_box.classList.remove("hidden");
	status_text.textContent = text;
}

function safe_storage_get() {
	try {
		return localStorage.getItem(DEMO_STORAGE_KEY);
	} catch (error) {
		return null;
	}
}

function safe_storage_set(payload) {
	try {
		localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(payload));
	} catch (error) {
		console.warn("Failed to save demo auth payload:", error);
	}
}

function safe_storage_remove() {
	try {
		localStorage.removeItem(DEMO_STORAGE_KEY);
	} catch (error) {
		console.warn("Failed to clear demo auth payload:", error);
	}
}

function format_saved_time(iso_string) {
	if (!iso_string) {
		return "-";
	}

	const date = new Date(iso_string);
	return Number.isNaN(date.getTime())
		? iso_string
		: date.toLocaleString(auth_state.is_chinese ? "zh-CN" : "en-US");
}

function render_saved_demo() {
	const raw = safe_storage_get();

	if (!raw) {
		saved_demo_empty.textContent = get_text("saved_empty");
		saved_demo_empty.classList.remove("hidden");
		saved_name_row.classList.remove("hidden");
		saved_mode_value.textContent = "-";
		saved_name_value.textContent = "-";
		saved_email_value.textContent = "-";
		saved_time_value.textContent = "-";
		saved_name_row.classList.add("hidden");
		return;
	}

	try {
		const saved = JSON.parse(raw);
		saved_demo_empty.classList.add("hidden");
		saved_mode_value.textContent = saved.mode === "register"
			? get_text("mode_register_label")
			: get_text("mode_login_label");
		saved_name_value.textContent = saved.name || "-";
		saved_email_value.textContent = saved.email || "-";
		saved_time_value.textContent = format_saved_time(saved.saved_at);

		if (saved.name) {
			saved_name_row.classList.remove("hidden");
		} else {
			saved_name_row.classList.add("hidden");
		}
	} catch (error) {
		saved_demo_empty.textContent = get_text("saved_empty");
		saved_demo_empty.classList.remove("hidden");
		saved_name_row.classList.add("hidden");
		saved_mode_value.textContent = "-";
		saved_email_value.textContent = "-";
		saved_time_value.textContent = "-";
	}
}

function handle_submit(event) {
	event.preventDefault();

	const name_value = name_input.value.trim();
	const email_value = email_input.value.trim();
	const password_value = password_input.value.trim();
	const confirm_value = confirm_input.value.trim();

	if (auth_state.mode === "login") {
		if (!email_value || !password_value) {
			show_status("error", get_text("error_missing_login"));
			return;
		}

		safe_storage_set({
			mode: "login",
			name: "",
			email: email_value,
			saved_at: new Date().toISOString()
		});

		show_status("success", get_text("login_success"));
		render_saved_demo();
		return;
	}

	if (!name_value || !email_value || !password_value || !confirm_value) {
		show_status("error", get_text("error_missing_register"));
		return;
	}

	if (password_value !== confirm_value) {
		show_status("error", get_text("error_password_mismatch"));
		return;
	}

	safe_storage_set({
		mode: "register",
		name: name_value,
		email: email_value,
		saved_at: new Date().toISOString()
	});

	show_status("success", get_text("register_success"));
	render_saved_demo();
}

function bind_events() {
	language_toggle_btn.addEventListener("click", () => {
		auth_state.is_chinese = !auth_state.is_chinese;
		apply_language();
		apply_mode();
	});

	mode_toggle_btn.addEventListener("click", () => {
		auth_state.is_night = !auth_state.is_night;
		apply_mode();
	});

	login_tab_btn.addEventListener("click", () => set_auth_mode("login"));
	register_tab_btn.addEventListener("click", () => set_auth_mode("register"));
	auth_form.addEventListener("submit", handle_submit);

	switch_mode_btn.addEventListener("click", () => {
		set_auth_mode(auth_state.mode === "login" ? "register" : "login");
	});

	clear_demo_btn.addEventListener("click", () => {
		safe_storage_remove();
		render_saved_demo();
		clear_status();
	});
}

function init_auth_page() {
	get_query_state();
	bind_events();
	set_auth_mode(auth_state.mode);
	apply_mode();
	render_saved_demo();
}

init_auth_page();
