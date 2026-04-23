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
        "--body_bg_night_orb_right": "rgba(120, 102, 128, 0.12)"
    }
};

const runtime_config = window.app_config || default_config;
const LANGUAGE_KEY = "circlab_language";
const NIGHT_MODE_KEY = "circlab_night_mode";

const root_element = document.documentElement;
const body_element = document.body;
const langBtn = document.getElementById("langToggleBtn");
const themeBtn = document.getElementById("themeToggleBtn");

const config_css_vars = runtime_config.css_vars && typeof runtime_config.css_vars === "object"
    ? runtime_config.css_vars
    : {};

let isChinese = typeof runtime_config.is_chinese === "boolean"
    ? runtime_config.is_chinese
    : default_config.is_chinese;

let isNight = typeof runtime_config.is_night === "boolean"
    ? runtime_config.is_night
    : default_config.is_night;

const uiText = {
    zh: {
        langToggle: "English",
        modeDay: "\u591c\u95f4\u6a21\u5f0f",
        modeNight: "\u767d\u5929\u6a21\u5f0f"
    },
    en: {
        langToggle: "Chinese",
        modeDay: "Night Mode",
        modeNight: "Day Mode"
    }
};

function safeStorageGet(key) {
    try {
        return localStorage.getItem(key);
    } catch (error) {
        console.warn("Failed to read preference:", error);
        return null;
    }
}

function safeStorageSet(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (error) {
        console.warn("Failed to save preference:", error);
    }
}

function setThemeVariables() {
    root_element.style.setProperty("--theme_color", runtime_config.theme_color || default_config.theme_color);
    root_element.style.setProperty("--sub_color", runtime_config.sub_color || default_config.sub_color);
    root_element.style.setProperty("--highlight_color", runtime_config.highlight_color || default_config.highlight_color);
    root_element.style.setProperty("--bg_color", runtime_config.bg_color || default_config.bg_color);
    root_element.style.setProperty("--bg_color_night", runtime_config.bg_color_night || default_config.bg_color_night);

    Object.entries(default_config.css_vars).forEach(([key, value]) => {
        root_element.style.setProperty(key, value);
    });

    Object.entries(config_css_vars).forEach(([key, value]) => {
        if (key.startsWith("--") && typeof value === "string") {
            root_element.style.setProperty(key, value);
        }
    });
}

function loadSharedPreferences() {
    const sharedLanguage = safeStorageGet(LANGUAGE_KEY);
    if (sharedLanguage === "zh" || sharedLanguage === "en") {
        isChinese = sharedLanguage !== "en";
    }

    const sharedNightMode = safeStorageGet(NIGHT_MODE_KEY);
    if (sharedNightMode === "true" || sharedNightMode === "false") {
        isNight = sharedNightMode === "true";
    }
}

function getLocale() {
    return isChinese ? "zh" : "en";
}

function updateRuntimeConfig() {
    if (!window.app_config) {
        return;
    }

    window.app_config.is_chinese = isChinese;
    window.app_config.is_night = isNight;
}

function updateThemeBtnText() {
    if (!themeBtn) {
        return;
    }

    const labels = uiText[getLocale()];
    themeBtn.textContent = isNight ? labels.modeNight : labels.modeDay;
}

function applyLanguage() {
    const locale = getLocale();

    document.documentElement.lang = isChinese ? "zh-CN" : "en";

    document.querySelectorAll("[data-zh][data-en]").forEach((element) => {
        element.textContent = isChinese ? element.dataset.zh : element.dataset.en;
    });

    document.querySelectorAll(".side_nav_link").forEach((link) => {
        const label = link.querySelector(".side_nav_tooltip[data-zh][data-en]");
        if (!label) {
            return;
        }
        link.setAttribute("aria-label", locale === "zh" ? label.dataset.zh : label.dataset.en);
    });

    if (langBtn) {
        langBtn.textContent = uiText[locale].langToggle;
    }

    updateThemeBtnText();
    updateRuntimeConfig();
    safeStorageSet(LANGUAGE_KEY, isChinese ? "zh" : "en");
}

function applyMode() {
    body_element.classList.toggle("night_mode", isNight);
    body_element.classList.toggle("dark-mode", isNight);
    updateThemeBtnText();
    updateRuntimeConfig();
    safeStorageSet(NIGHT_MODE_KEY, String(isNight));
}

function toggleLang() {
    isChinese = !isChinese;
    applyLanguage();
}

function toggleTheme() {
    isNight = !isNight;
    applyMode();
}

function updateActiveSidebar() {
    const currentPath = window.location.pathname;
    document.querySelectorAll(".side_nav_link").forEach((link) => {
        const isGameLink = link.getAttribute("href") === "./game.html" || currentPath.endsWith("game.html");
        link.classList.toggle("active", isGameLink);
    });
}

function bindEvents() {
    if (langBtn) {
        langBtn.addEventListener("click", toggleLang);
    }

    if (themeBtn) {
        themeBtn.addEventListener("click", toggleTheme);
    }
}

function initializeGamePage() {
    setThemeVariables();
    loadSharedPreferences();
    applyMode();
    applyLanguage();
    updateActiveSidebar();
    bindEvents();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeGamePage);
} else {
    initializeGamePage();
}
