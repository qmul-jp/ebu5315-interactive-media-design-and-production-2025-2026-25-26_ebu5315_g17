(function attachSessionAuthEntry() {
	const SESSION_USERS_KEY = "circlelab_session_users_v1";
	const SESSION_CURRENT_KEY = "circlelab_session_current_user_v1";
	const AUTH_EVENT_NAME = "circlelab-auth-changed";

	const memory_session_store = (() => {
		const data = new Map();
		return {
			getItem(key) {
				return data.has(key) ? data.get(key) : null;
			},
			setItem(key, value) {
				data.set(key, String(value));
			},
			removeItem(key) {
				data.delete(key);
			}
		};
	})();

	function get_storage() {
		try {
			return window.sessionStorage;
		} catch (error) {
			return memory_session_store;
		}
	}

	function read_json(key, fallback_value) {
		try {
			const raw = get_storage().getItem(key);
			return raw ? JSON.parse(raw) : fallback_value;
		} catch (error) {
			return fallback_value;
		}
	}

	function remove_key(key) {
		try {
			get_storage().removeItem(key);
		} catch (error) {
			console.warn("Failed to remove session auth data:", error);
		}
	}

	function get_current_user() {
		const user = read_json(SESSION_CURRENT_KEY, null);
		return user && typeof user === "object" && user.email ? user : null;
	}

	function is_logged_in() {
		return Boolean(get_current_user());
	}

	function logout_current_user() {
		remove_key(SESSION_CURRENT_KEY);
		window.dispatchEvent(new CustomEvent(AUTH_EVENT_NAME));
	}

	function getHeaderActionContainer() {
		return (
			document.querySelector(".site_header .control_group") ||
			document.querySelector(".quiz_header .control_group") ||
			document.querySelector(".navbar .nav-buttons")
		);
	}

	function getLanguageToggle() {
		return (
			document.getElementById("language_toggle_btn") ||
			document.getElementById("langToggleBtn")
		);
	}

	function getThemeToggle() {
		return (
			document.getElementById("mode_toggle_btn") ||
			document.getElementById("themeToggleBtn")
		);
	}

	function detectLocale() {
		const languageToggle = getLanguageToggle();
		const toggleLabel = (languageToggle?.textContent || "")
			.replace(/\s+/g, "")
			.toLowerCase();

		if (toggleLabel.includes("中文")) {
			return "en";
		}

		if (toggleLabel === "en" || toggleLabel.includes("english")) {
			return "zh";
		}

		return document.documentElement.lang.toLowerCase().startsWith("en")
			? "en"
			: "zh";
	}

	function detectTheme() {
		if (
			document.body.classList.contains("night_mode") ||
			document.body.classList.contains("dark-mode")
		) {
			return "night";
		}

		return "day";
	}

	function getAuthBasePath() {
		const pathname = window.location.pathname.replace(/\\/g, "/");
		return /\/(quiz|game)\/[^/]+$/.test(pathname) ? "../auth.html" : "./auth.html";
	}

	function buildAuthHref(mode, redirectPath) {
		const params = new URLSearchParams({
			mode,
			lang: detectLocale(),
			theme: detectTheme()
		});

		if (redirectPath) {
			params.set("redirect", redirectPath);
		}

		return `${getAuthBasePath()}?${params.toString()}`;
	}

	function getRelativeTargetFromHref(href) {
		try {
			const url = new URL(href, window.location.href);
			return `${url.pathname}${url.search}${url.hash}`;
		} catch (error) {
			return href;
		}
	}

	function createAuthControls(container) {
		if (container.querySelector("[data-auth-entry='group']")) {
			return container.querySelector("[data-auth-entry='group']");
		}

		const group = document.createElement("div");
		group.className = "auth_link_group";
		group.dataset.authEntry = "group";
		container.appendChild(group);
		return group;
	}

	function createLink(isNavbarVariant, className, textContent, ariaLabel, href) {
		const link = document.createElement("a");
		link.className = className;
		link.textContent = textContent;
		link.setAttribute("aria-label", ariaLabel);
		link.href = href;
		return link;
	}

	function syncAuthControls() {
		const container = getHeaderActionContainer();
		if (!container) {
			return;
		}

		const group = createAuthControls(container);
		const locale = detectLocale();
		const currentUser = get_current_user();
		const isNavbarVariant = container.classList.contains("nav-buttons");
		group.replaceChildren();

		if (!currentUser) {
			const loginLink = createLink(
				isNavbarVariant,
				isNavbarVariant ? "auth-link" : "ghost_btn auth_link",
				locale === "zh" ? "登录" : "Log In",
				locale === "zh" ? "打开登录页面" : "Open log in page",
				buildAuthHref("login")
			);
			const registerLink = createLink(
				isNavbarVariant,
				isNavbarVariant ? "auth-link-primary" : "ghost_btn auth_link auth_primary_btn",
				locale === "zh" ? "注册" : "Sign Up",
				locale === "zh" ? "打开注册页面" : "Open sign up page",
				buildAuthHref("register")
			);
			group.append(loginLink, registerLink);
			return;
		}

		const badge = createLink(
			isNavbarVariant,
			isNavbarVariant ? "auth-status-badge" : "auth_status_badge",
			locale === "zh" ? `已登录：${currentUser.name}` : `Signed in: ${currentUser.name}`,
			locale === "zh" ? "查看当前登录状态" : "View current sign-in status",
			buildAuthHref("login")
		);

		const logoutButton = document.createElement("button");
		logoutButton.type = "button";
		logoutButton.className = isNavbarVariant ? "auth-logout-btn" : "auth_logout_btn";
		logoutButton.textContent = locale === "zh" ? "退出登录" : "Log Out";
		logoutButton.addEventListener("click", () => {
			logout_current_user();
			syncAuthControls();
		});

		group.append(badge, logoutButton);
	}

	function bindAuthControlRefresh() {
		const languageToggle = getLanguageToggle();
		const themeToggle = getThemeToggle();

		if (languageToggle && !languageToggle.dataset.authEntryBound) {
			languageToggle.addEventListener("click", () => {
				window.requestAnimationFrame(syncAuthControls);
			});
			languageToggle.dataset.authEntryBound = "1";
		}

		if (themeToggle && !themeToggle.dataset.authEntryBound) {
			themeToggle.addEventListener("click", () => {
				window.requestAnimationFrame(syncAuthControls);
			});
			themeToggle.dataset.authEntryBound = "1";
		}
	}

	function shouldProtectLink(link) {
		const href = link.getAttribute("href") || "";
		if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
			return false;
		}

		if (link.dataset.authProtected === "false") {
			return false;
		}

		return /(?:^|\/)(quiz|game)\/[^?#]+\.html(?:[?#].*)?$/i.test(href);
	}

	function bindProtectedLinks() {
		document.querySelectorAll("a[href]").forEach((link) => {
			if (link.dataset.authGuardBound === "1") {
				return;
			}

			link.addEventListener("click", (event) => {
				if (
					event.defaultPrevented ||
					event.button !== 0 ||
					event.metaKey ||
					event.ctrlKey ||
					event.shiftKey ||
					event.altKey
				) {
					return;
				}

				if (!shouldProtectLink(link) || is_logged_in()) {
					return;
				}

				event.preventDefault();
				window.location.href = buildAuthHref("login", getRelativeTargetFromHref(link.href));
			});

			link.dataset.authGuardBound = "1";
		});
	}

	document.addEventListener("DOMContentLoaded", () => {
		syncAuthControls();
		bindAuthControlRefresh();
		bindProtectedLinks();
	});

	window.addEventListener("pageshow", () => {
		syncAuthControls();
		bindProtectedLinks();
	});
	window.addEventListener(AUTH_EVENT_NAME, syncAuthControls);
})();
