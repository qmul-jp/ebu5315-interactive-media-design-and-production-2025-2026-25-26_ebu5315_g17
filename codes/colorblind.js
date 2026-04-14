(function () {
  const STORAGE_KEY = "g17_color_blind_mode";
  const MODE_CLASSES = [
    "cb-mode-protanopia",
    "cb-mode-deuteranopia",
    "cb-mode-tritanopia",
    "cb-mode-achromatopsia",
    "cb-mode-high-contrast"
  ];

  if (!document.body || document.getElementById("cb_mode_select")) {
    return;
  }

  const modes = [
    { value: "normal", label: "Normal / 标准" },
    { value: "protanopia", label: "Protanopia / 红色弱" },
    { value: "deuteranopia", label: "Deuteranopia / 绿色弱" },
    { value: "tritanopia", label: "Tritanopia / 蓝色弱" },
    { value: "achromatopsia", label: "Achromatopsia / 全色弱" },
    { value: "high-contrast", label: "High Contrast / 高对比" }
  ];

  const style = document.createElement("style");
  style.id = "cb_mode_style";
  style.textContent = `
    .cb_mode_inline {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      min-height: 38px;
    }

    .cb_mode_label {
      display: inline-block;
      font-size: 0.72rem;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.88);
      white-space: nowrap;
    }

    .cb_mode_select {
      min-height: 32px;
      padding: 0.15rem 0.42rem;
      border: 1px solid rgba(255, 255, 255, 0.34);
      background: rgba(255, 255, 255, 0.12);
      color: #ffffff;
      font-size: 0.8rem;
      font-weight: 700;
      max-width: 190px;
      cursor: pointer;
    }

    .cb_mode_select option {
      color: #102147;
    }

    body.night_mode .cb_mode_select,
    body.dark-mode .cb_mode_select {
      background: rgba(255, 255, 255, 0.16);
      color: #edf1ff;
      border-color: rgba(255, 255, 255, 0.4);
    }

    html.cb-mode-protanopia {
      filter: url(#cb_filter_protanopia);
    }

    html.cb-mode-deuteranopia {
      filter: url(#cb_filter_deuteranopia);
    }

    html.cb-mode-tritanopia {
      filter: url(#cb_filter_tritanopia);
    }

    html.cb-mode-achromatopsia {
      filter: url(#cb_filter_achromatopsia);
    }

    html.cb-mode-high-contrast {
      filter: contrast(1.2) saturate(1.15) brightness(1.03);
    }

    @media (max-width: 720px) {
      .cb_mode_inline {
        width: 100%;
        justify-content: space-between;
      }

      .cb_mode_label {
        font-size: 0.76rem;
      }

      .cb_mode_select {
        flex: 1;
        max-width: none;
      }
    }
  `;

  const svgDefs = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgDefs.setAttribute("aria-hidden", "true");
  svgDefs.setAttribute("focusable", "false");
  svgDefs.style.position = "absolute";
  svgDefs.style.width = "0";
  svgDefs.style.height = "0";
  svgDefs.innerHTML = `
    <defs>
      <filter id="cb_filter_protanopia">
        <feColorMatrix type="matrix" values="0.567 0.433 0 0 0 0.558 0.442 0 0 0 0 0.242 0.758 0 0 0 0 0 1 0" />
      </filter>
      <filter id="cb_filter_deuteranopia">
        <feColorMatrix type="matrix" values="0.625 0.375 0 0 0 0.7 0.3 0 0 0 0 0.3 0.7 0 0 0 0 0 1 0" />
      </filter>
      <filter id="cb_filter_tritanopia">
        <feColorMatrix type="matrix" values="0.95 0.05 0 0 0 0 0.433 0.567 0 0 0 0.475 0.525 0 0 0 0 0 1 0" />
      </filter>
      <filter id="cb_filter_achromatopsia">
        <feColorMatrix type="matrix" values="0.299 0.587 0.114 0 0 0.299 0.587 0.114 0 0 0.299 0.587 0.114 0 0 0 0 0 1 0" />
      </filter>
    </defs>
  `;

  const inlineWrap = document.createElement("div");
  inlineWrap.className = "cb_mode_inline";

  const label = document.createElement("label");
  label.className = "cb_mode_label";
  label.setAttribute("for", "cb_mode_select");
  label.textContent = "Color 色彩";

  const select = document.createElement("select");
  select.id = "cb_mode_select";
  select.className = "cb_mode_select";

  modes.forEach((mode) => {
    const option = document.createElement("option");
    option.value = mode.value;
    option.textContent = mode.label;
    select.appendChild(option);
  });

  inlineWrap.appendChild(label);
  inlineWrap.appendChild(select);

  const classTarget = document.documentElement;

  function clearModeClasses() {
    MODE_CLASSES.forEach((className) => classTarget.classList.remove(className));
  }

  function applyMode(mode) {
    clearModeClasses();

    if (mode === "normal") {
      localStorage.setItem(STORAGE_KEY, mode);
      return;
    }

    const modeClass = `cb-mode-${mode}`;
    classTarget.classList.add(modeClass);
    localStorage.setItem(STORAGE_KEY, mode);
  }

  function getSavedMode() {
    const saved = localStorage.getItem(STORAGE_KEY);
    const exists = modes.some((mode) => mode.value === saved);
    return exists ? saved : "normal";
  }

  select.addEventListener("change", function () {
    applyMode(select.value);
  });

  const mountTarget =
    document.querySelector(".control_group") ||
    document.querySelector(".nav-buttons") ||
    document.querySelector("header") ||
    document.querySelector(".navbar");

  document.head.appendChild(style);
  document.body.appendChild(svgDefs);

  if (mountTarget) {
    mountTarget.appendChild(inlineWrap);
  }

  const initialMode = getSavedMode();
  select.value = initialMode;
  applyMode(initialMode);
})();
