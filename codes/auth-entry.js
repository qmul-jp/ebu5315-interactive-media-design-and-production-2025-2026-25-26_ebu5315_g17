(function attachFakeAuthEntry() {
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

	function buildAuthHref(mode) {
		const params = new URLSearchParams({
			mode,
			lang: detectLocale(),
			theme: detectTheme()
		});

		return `${getAuthBasePath()}?${params.toString()}`;
	}

	function createAuthLinks(container) {
		if (container.querySelector("[data-fake-auth-entry='group']")) {
			return container.querySelector("[data-fake-auth-entry='group']");
		}

		const group = document.createElement("div");
		group.className = "auth_link_group";
		group.dataset.fakeAuthEntry = "group";

		const isNavbarVariant = container.classList.contains("nav-buttons");

		const loginLink = document.createElement("a");
		loginLink.dataset.authMode = "login";
		loginLink.dataset.fakeAuthEntry = "login";
		loginLink.className = isNavbarVariant ? "auth-link" : "ghost_btn auth_link";

		const registerLink = document.createElement("a");
		registerLink.dataset.authMode = "register";
		registerLink.dataset.fakeAuthEntry = "register";
		registerLink.className = isNavbarVariant
			? "auth-link auth-link-primary"
			: "ghost_btn auth_link auth_primary_btn";

		group.append(loginLink, registerLink);
		container.appendChild(group);
		return group;
	}

	function syncAuthLinks() {
		const container = getHeaderActionContainer();
		if (!container) {
			return;
		}

		const group = createAuthLinks(container);
		const locale = detectLocale();
		const loginLink = group.querySelector("[data-auth-mode='login']");
		const registerLink = group.querySelector("[data-auth-mode='register']");

		loginLink.textContent = locale === "zh" ? "登录" : "Log In";
		registerLink.textContent = locale === "zh" ? "注册" : "Sign Up";

		loginLink.setAttribute(
			"aria-label",
			locale === "zh" ? "打开登录页面" : "Open log in page"
		);
		registerLink.setAttribute(
			"aria-label",
			locale === "zh" ? "打开注册页面" : "Open sign up page"
		);

		loginLink.href = buildAuthHref("login");
		registerLink.href = buildAuthHref("register");
	}

	function bindAuthLinkRefresh() {
		const languageToggle = getLanguageToggle();
		const themeToggle = getThemeToggle();

		if (languageToggle && !languageToggle.dataset.fakeAuthBound) {
			languageToggle.addEventListener("click", () => {
				window.requestAnimationFrame(syncAuthLinks);
			});
			languageToggle.dataset.fakeAuthBound = "1";
		}

		if (themeToggle && !themeToggle.dataset.fakeAuthBound) {
			themeToggle.addEventListener("click", () => {
				window.requestAnimationFrame(syncAuthLinks);
			});
			themeToggle.dataset.fakeAuthBound = "1";
		}
	}

	document.addEventListener("DOMContentLoaded", () => {
		syncAuthLinks();
		bindAuthLinkRefresh();
	});

	window.addEventListener("pageshow", syncAuthLinks);
})();
