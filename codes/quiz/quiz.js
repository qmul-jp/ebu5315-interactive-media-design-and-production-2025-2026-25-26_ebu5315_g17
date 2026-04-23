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
    "--secondary_btn_bg_night": "rgba(255, 255, 255, 0.08)",
  },
};

const runtime_config = window.app_config || default_config;

const theme_color = runtime_config.theme_color || default_config.theme_color;
const sub_color = runtime_config.sub_color || default_config.sub_color;
const highlight_color =
  runtime_config.highlight_color || default_config.highlight_color;
const bg_color = runtime_config.bg_color || default_config.bg_color;
const bg_color_night =
  runtime_config.bg_color_night || default_config.bg_color_night;

const config_css_vars =
  runtime_config.css_vars && typeof runtime_config.css_vars === "object"
    ? runtime_config.css_vars
    : {};

let is_night =
  typeof runtime_config.is_night === "boolean"
    ? runtime_config.is_night
    : default_config.is_night;

let is_chinese =
  typeof runtime_config.is_chinese === "boolean"
    ? runtime_config.is_chinese
    : default_config.is_chinese;

const SMART_SESSION_LENGTH = 10;
const SMART_INITIAL_SKILL = 50;
const OPTION_LETTERS = ["A", "B", "C", "D", "E", "F"];
const SMART_SCORE_RULES = {
  1: { correct: 5, wrong: -4 },
  2: { correct: 7, wrong: -6 },
  3: { correct: 9, wrong: -8 },
};

const PREFS_KEY = "circlelab_quiz_preferences_v1";
const LANGUAGE_KEY = "circlab_language";
const NIGHT_MODE_KEY = "circlab_night_mode";
const LEVEL_STATS_KEY = "circlelab_quiz_level_stats_v1";
const SESSION_KEY = "circlelab_quiz_session_v1";

const i18n_text = {
  zh: {
    brand_tag: "GCSE 圆几何测验",
    back_home: "← 返回",
    nav_settings: "设置",
    mode_day: "夜间模式",
    mode_night: "白天模式",
    quiz_kicker: "Level-based Quiz",
    quiz_title: "圆几何分级测验",
    quiz_desc:
      "从基础识别到公式应用，逐步检查你对 circle geometry 的掌握情况。",
    level_title: "选择难度",
    level_desc: "先选一个 level，然后开始答题；或直接进入智能闯关。",
    level_1: "Level 1 · 基础",
    level_1_hint: "半径 / 直径 / 基本概念",
    level_2: "Level 2 · 进阶",
    level_2_hint: "周长 / 面积 / 切线",
    level_3: "Level 3 · 挑战",
    level_3_hint: "综合应用 / 推理题",
    level_label: "Level",
    level_status_not_started: "未开始",
    level_status_in_progress: "进行中",
    level_status_done: "已完成",
    best_label: "Best",
    smart_badge: "推荐",
    smart_mode: "智能闯关",
    smart_mode_hint: "按你的实时表现自动调节题目难度",
    smart_mode_title: "智能闯关 · 当前题目",
    smart_mode_result_title: "智能闯关完成",
    smart_progress_label: "闯关进度",
    question_title: "题目",
    loading_questions: "正在加载题库...",
    load_error: "题库加载失败，请检查 quiz-data.js 是否已正确引入。",
    no_questions: "这一关暂时没有题目。",
    submit_answer: "提交答案",
    next_question: "下一题",
    restart_level: "重做本关",
    result_kicker: "Result",
    result_title: "本关完成",
    score_prefix: "答对",
    skill_prefix: "能力值",
    time_prefix: "用时",
    choose_first: "请先选择一个答案。",
    confirm_restart_current: "确定要重做本关吗？当前进度会被清空。",
    feedback_correct: "回答正确！",
    feedback_wrong: "回答错误。",
    explanation_label: "解析",
    option_state_correct: "✓ 正确",
    option_state_wrong: "✕ 你的选择",
    option_state_answer: "✓ 正确答案",
    your_answer_label: "你选择了",
    correct_answer_label: "正确答案",
    smart_delta_label: "能力变化",
    smart_next_label: "下一题趋势",
    smart_reason_balanced: "正常适配当前水平",
    smart_reason_raise: "适度拔高，看看你能不能稳住",
    smart_reason_support: "短暂降低一档，先帮你稳住基础",
    smart_reason_challenge: "连续答对，给你一题挑战题",
    smart_reason_recover: "连续失误，先做一题缓冲题",
    final_good: "不错，你已经掌握了这一关的大部分内容。",
    final_great: "很棒，这一关你几乎全对了！",
    final_retry: "再试一次会更稳，你已经接近掌握了。",
    smart_final_high: "状态很强，已经能稳定处理更高难度题目。",
    smart_final_mid: "整体表现不错，继续练习就能更稳地进入挑战区。",
    smart_final_low: "基础还在建立中，建议多做几轮智能闯关巩固。",
  },
  en: {
    brand_tag: "GCSE Circle Geometry Quiz",
    back_home: "← Back",
    nav_settings: "Settings",
    mode_day: "Night Mode",
    mode_night: "Day Mode",
    quiz_kicker: "Level-based Quiz",
    quiz_title: "Circle Geometry Level Quiz",
    quiz_desc:
      "Move from basic recognition to formula use and check your mastery step by step.",
    level_title: "Choose a Level",
    level_desc: "Pick one level first, or enter Smart Challenge mode.",
    level_1: "Level 1 · Basic",
    level_1_hint: "Radius / diameter / core concepts",
    level_2: "Level 2 · Intermediate",
    level_2_hint: "Circumference / area / tangent",
    level_3: "Level 3 · Challenge",
    level_3_hint: "Mixed application / reasoning",
    level_label: "Level",
    level_status_not_started: "Not started",
    level_status_in_progress: "In progress",
    level_status_done: "Done",
    best_label: "Best",
    smart_badge: "Recommended",
    smart_mode: "Smart Challenge",
    smart_mode_hint: "Adjust question difficulty in real time based on your performance",
    smart_mode_title: "Smart Challenge · Current Question",
    smart_mode_result_title: "Smart Challenge Complete",
    smart_progress_label: "Progress",
    question_title: "Question",
    loading_questions: "Loading question bank...",
    load_error: "Failed to load question bank. Please check whether quiz-data.js is loaded correctly.",
    no_questions: "There are no questions in this level yet.",
    submit_answer: "Submit Answer",
    next_question: "Next Question",
    restart_level: "Restart",
    result_kicker: "Result",
    result_title: "Level Complete",
    score_prefix: "Correct",
    skill_prefix: "Skill",
    time_prefix: "Time",
    choose_first: "Please choose one option first.",
    confirm_restart_current: "Restart this level? Current progress will be cleared.",
    feedback_correct: "Correct!",
    feedback_wrong: "Wrong.",
    explanation_label: "Explanation",
    option_state_correct: "✓ Correct",
    option_state_wrong: "✕ Your choice",
    option_state_answer: "✓ Correct answer",
    your_answer_label: "You chose",
    correct_answer_label: "Correct answer",
    smart_delta_label: "Skill Change",
    smart_next_label: "Next Trend",
    smart_reason_balanced: "Normally matched to your current level",
    smart_reason_raise: "A slight step-up to test your ceiling",
    smart_reason_support: "A slight step-down to steady the basics",
    smart_reason_challenge: "You are on a streak, so here comes a challenge",
    smart_reason_recover: "You missed a few, so here comes a buffer question",
    final_good: "Nice work. You understood most of this level.",
    final_great: "Excellent. You almost got everything right!",
    final_retry: "Try again once more. You are close to mastering it.",
    smart_final_high: "Strong session. You can now handle higher-level questions steadily.",
    smart_final_mid: "Solid overall. A bit more practice will push you into the challenge zone.",
    smart_final_low: "Your fundamentals are still forming. Another smart run will help a lot.",
  },
};

const root_element = document.documentElement;
const body_element = document.body;

const language_toggle_btn = document.getElementById("language_toggle_btn");
const mode_toggle_btn = document.getElementById("mode_toggle_btn");
const level_buttons = Array.from(document.querySelectorAll(".level_btn"));
const current_level_text = document.getElementById("current_level_text");
const question_title_text = document.getElementById("question_title_text");
const progress_text = document.getElementById("progress_text");
const score_text = document.getElementById("score_text");
const time_text = document.getElementById("time_text");
const skill_text = document.getElementById("skill_text");
const skill_delta_badge = document.getElementById("skill_delta_badge");
const progress_fill = document.getElementById("progress_fill");
const question_text = document.getElementById("question_text");
const options_wrap = document.getElementById("options_wrap");
const submit_btn = document.getElementById("submit_btn");
const next_btn = document.getElementById("next_btn");
const restart_btn = document.getElementById("restart_btn");
const feedback_box = document.getElementById("feedback_box");
const result_card = document.getElementById("result_card");
const result_title_text = document.getElementById("result_title_text");
const final_score_text = document.getElementById("final_score_text");
const final_time_text = document.getElementById("final_time_text");
const final_message_text = document.getElementById("final_message_text");
const retry_result_btn = document.getElementById("retry_result_btn");

let last_selected_level = 1;
let pending_color_mode = null;

const state = {
  question_bank: [],
  current_mode: "level",
  current_level: 1,
  current_questions: [],
  current_history: [],
  current_index: 0,
  session_length: 0,
  score: 0,
  skill_score: SMART_INITIAL_SKILL,
  pending_delta: 0,
  correct_streak: 0,
  wrong_streak: 0,
  asked_question_ids: new Set(),
  smart_draw_reason_key: "smart_reason_balanced",
  started_at: null,
  ended_at: null,
};

function set_theme_variables() {
  root_element.style.setProperty("--theme_color", theme_color);
  root_element.style.setProperty("--sub_color", sub_color);
  root_element.style.setProperty("--highlight_color", highlight_color);
  root_element.style.setProperty("--bg_color", bg_color);
  root_element.style.setProperty("--bg_color_night", bg_color_night);

  Object.entries(default_config.css_vars).forEach(([key, value]) => {
    root_element.style.setProperty(key, value);
  });

  Object.entries(config_css_vars).forEach(([key, value]) => {
    if (key.startsWith("--") && typeof value === "string") {
      root_element.style.setProperty(key, value);
    }
  });
}

function get_locale() {
  return is_chinese ? "zh" : "en";
}

function get_text(key) {
  return i18n_text[get_locale()][key];
}

function shuffle_array(array) {
  const copied = [...array];
  for (let i = copied.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }
  return copied;
}

function random_pick(array) {
  if (!array.length) return null;
  return array[Math.floor(Math.random() * array.length)];
}

function clamp_number(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function weighted_pick(weight_map) {
  const entries = Object.entries(weight_map);
  const total = entries.reduce((sum, [, weight]) => sum + weight, 0);
  let threshold = Math.random() * total;

  for (const [key, weight] of entries) {
    threshold -= weight;
    if (threshold <= 0) {
      return Number(key);
    }
  }

  return Number(entries[entries.length - 1][0]);
}

function create_record(question) {
  return {
    question,
    selected_option_index: null,
    answered: false,
    is_correct: false,
    pending_delta: 0,
    skill_after: null,
  };
}

function get_current_record() {
  return state.current_history[state.current_index] || null;
}

function get_current_question() {
  const record = get_current_record();
  return record ? record.question : null;
}

function get_elapsed_ms() {
  if (!state.started_at) return 0;
  return (state.ended_at || Date.now()) - state.started_at;
}

function format_duration(ms) {
  const total_seconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(total_seconds / 60);
  const seconds = total_seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

async function load_question_bank() {
  if (Array.isArray(window.quiz_question_bank)) {
    return window.quiz_question_bank;
  }
  throw new Error("Question bank not found. Please check quiz-data.js");
}

function safe_storage_get(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

function safe_storage_set(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.warn("Failed to save local data:", error);
  }
}

function safe_storage_remove(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn("Failed to remove local data:", error);
  }
}

function get_color_mode_select() {
  return document.querySelector(".quiz_header select");
}

function get_preferences_payload() {
  return {
    is_chinese,
    is_night,
    last_selected_level,
    color_mode: get_color_mode_select()?.value || pending_color_mode || null,
  };
}

function save_preferences() {
  safe_storage_set(PREFS_KEY, JSON.stringify(get_preferences_payload()));
  safe_storage_set(LANGUAGE_KEY, is_chinese ? "zh" : "en");
}

function load_preferences() {
  const raw = safe_storage_get(PREFS_KEY);
  if (!raw) return;

  try {
    const prefs = JSON.parse(raw);
    if (typeof prefs.is_chinese === "boolean") {
      is_chinese = prefs.is_chinese;
    }
    if (typeof prefs.is_night === "boolean") {
      is_night = prefs.is_night;
    }
    if (typeof prefs.last_selected_level === "number") {
      last_selected_level = clamp_number(prefs.last_selected_level, 1, 3);
    }
    if (typeof prefs.color_mode === "string" && prefs.color_mode) {
      pending_color_mode = prefs.color_mode;
    }
  } catch (error) {
    console.warn("Failed to parse saved preferences:", error);
  }

  const shared_language = safe_storage_get(LANGUAGE_KEY);
  if (shared_language === "zh" || shared_language === "en") {
    is_chinese = shared_language !== "en";
  }

  const shared_night = safe_storage_get(NIGHT_MODE_KEY);
  if (shared_night === "true" || shared_night === "false") {
    is_night = shared_night === "true";
  }
}

function setup_color_mode_persistence() {
  const try_bind = () => {
    const select = get_color_mode_select();
    if (!select) return false;

    if (pending_color_mode && Array.from(select.options).some((option) => option.value === pending_color_mode)) {
      select.value = pending_color_mode;
      select.dispatchEvent(new Event("change", { bubbles: true }));
    }

    if (!select.dataset.quizPrefsBound) {
      select.addEventListener("change", () => {
        pending_color_mode = select.value;
        save_preferences();
      });
      select.dataset.quizPrefsBound = "1";
    }

    return true;
  };

  if (try_bind()) return;

  const observer = new MutationObserver(() => {
    if (try_bind()) {
      observer.disconnect();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
  window.addEventListener("beforeunload", () => observer.disconnect(), { once: true });
}

function get_level_stats() {
  const raw = safe_storage_get(LEVEL_STATS_KEY);
  if (!raw) return {};

  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (error) {
    console.warn("Failed to parse level stats:", error);
    return {};
  }
}

function save_level_stats(stats) {
  safe_storage_set(LEVEL_STATS_KEY, JSON.stringify(stats));
}

function get_level_progress_count() {
  return state.current_history.filter((record) => record.answered).length;
}

function clear_level_progress_state(level) {
  const stats = get_level_stats();
  const level_key = String(level);
  if (!stats[level_key]) return;

  stats[level_key].inProgress = false;
  stats[level_key].progressCount = 0;
  save_level_stats(stats);
}

function update_level_stats_from_state() {
  if (state.current_mode !== "level") return;

  const total = state.session_length || state.current_history.length;
  const progress_count = get_level_progress_count();
  const level_key = String(state.current_level);
  const stats = get_level_stats();
  const existing = stats[level_key] || {
    bestScore: 0,
    total,
    completed: false,
    inProgress: false,
    progressCount: 0,
  };

  const next = {
    ...existing,
    total,
  };

  if (state.ended_at) {
    next.completed = true;
    next.inProgress = false;
    next.progressCount = total;
    next.bestScore = Math.max(existing.bestScore || 0, state.score);
  } else if (progress_count > 0) {
    next.inProgress = true;
    next.progressCount = progress_count;
  } else {
    next.inProgress = false;
    next.progressCount = 0;
  }

  stats[level_key] = next;
  save_level_stats(stats);
}

function render_level_statuses() {
  const stats = get_level_stats();

  level_buttons.forEach((button) => {
    if (!button.dataset.level) return;

    let status_node = button.querySelector(".level_status");
    if (!status_node) {
      status_node = document.createElement("span");
      status_node.className = "level_status";
      button.appendChild(status_node);
    }

    const info = stats[button.dataset.level];

    if (!info) {
      status_node.textContent = get_text("level_status_not_started");
      return;
    }

    if (info.inProgress && info.progressCount > 0) {
      status_node.textContent = `${get_text("level_status_in_progress")} · ${info.progressCount} / ${info.total}`;
      return;
    }

    if (info.completed) {
      status_node.textContent = `${get_text("level_status_done")} · ${get_text("best_label")} ${info.bestScore} / ${info.total}`;
      return;
    }

    status_node.textContent = get_text("level_status_not_started");
  });
}

function clear_session_snapshot() {
  safe_storage_remove(SESSION_KEY);
}

function save_session_snapshot() {
  if (!state.question_bank.length || !state.current_history.length) return;

  const snapshot = {
    current_mode: state.current_mode,
    current_level: state.current_level,
    current_index: state.current_index,
    session_length: state.session_length,
    score: state.score,
    started_at: state.started_at,
    ended_at: state.ended_at,
    current_history: state.current_history,
    skill_score: state.skill_score,
    pending_delta: state.pending_delta,
    correct_streak: state.correct_streak,
    wrong_streak: state.wrong_streak,
    asked_question_ids: Array.from(state.asked_question_ids),
    smart_draw_reason_key: state.smart_draw_reason_key,
  };

  safe_storage_set(SESSION_KEY, JSON.stringify(snapshot));
}

function restore_session_snapshot() {
  const raw = safe_storage_get(SESSION_KEY);
  if (!raw) return false;

  try {
    const snapshot = JSON.parse(raw);
    if (!Array.isArray(snapshot.current_history) || !snapshot.current_history.length) {
      return false;
    }

    state.current_mode = snapshot.current_mode || "level";
    state.current_level = clamp_number(Number(snapshot.current_level) || 1, 1, 3);
    state.current_index = Math.max(0, Number(snapshot.current_index) || 0);
    state.session_length = Number(snapshot.session_length) || snapshot.current_history.length;
    state.score = Number(snapshot.score) || 0;
    state.started_at = snapshot.started_at || Date.now();
    state.ended_at = snapshot.ended_at || null;
    state.current_history = snapshot.current_history;
    state.current_index = Math.min(state.current_index, state.current_history.length - 1);
    state.skill_score = snapshot.skill_score ?? SMART_INITIAL_SKILL;
    state.pending_delta = Number(snapshot.pending_delta) || 0;
    state.correct_streak = Number(snapshot.correct_streak) || 0;
    state.wrong_streak = Number(snapshot.wrong_streak) || 0;
    state.asked_question_ids = new Set(snapshot.asked_question_ids || []);
    state.smart_draw_reason_key = snapshot.smart_draw_reason_key || "smart_reason_balanced";

    if (state.current_mode === "level") {
      last_selected_level = state.current_level;
      update_active_entry((button) => Number(button.dataset.level) === state.current_level);
    } else {
      update_active_entry((button) => button.dataset.mode === "smart");
    }

    result_card.classList.toggle("hidden", !state.ended_at);
    update_level_stats_from_state();
    render_level_statuses();
    return true;
  } catch (error) {
    console.warn("Failed to restore saved session:", error);
    return false;
  }
}

function has_unfinished_progress() {
  return Boolean(state.started_at && !state.ended_at && state.current_history.length);
}


function apply_language() {
  const lang_dict = i18n_text[get_locale()];
  document.documentElement.lang = is_chinese ? "zh-CN" : "en";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (lang_dict[key]) {
      element.textContent = lang_dict[key];
    }
  });

  language_toggle_btn.textContent = is_chinese ? "EN" : "中文";
  mode_toggle_btn.textContent = is_night ? lang_dict.mode_night : lang_dict.mode_day;

  update_meta();
  render_question();
  render_feedback();
  render_result_text();
  render_level_statuses();
}

function apply_mode() {
  body_element.classList.toggle("night_mode", is_night);
  safe_storage_set(NIGHT_MODE_KEY, String(is_night));
  mode_toggle_btn.textContent = is_night ? get_text("mode_night") : get_text("mode_day");
}

function build_level_questions(level) {
  return shuffle_array(state.question_bank.filter((item) => item.level === level));
}

function reset_common_state() {
  state.current_questions = [];
  state.current_history = [];
  state.current_index = 0;
  state.session_length = 0;
  state.score = 0;
  state.skill_score = SMART_INITIAL_SKILL;
  state.pending_delta = 0;
  state.correct_streak = 0;
  state.wrong_streak = 0;
  state.asked_question_ids = new Set();
  state.smart_draw_reason_key = "smart_reason_balanced";
  state.started_at = Date.now();
  state.ended_at = null;
}

function update_active_entry(activeMatcher) {
  level_buttons.forEach((button) => {
    button.classList.toggle("active_level", activeMatcher(button));
  });
}

function hide_result_and_feedback() {
  result_card.classList.add("hidden");
  feedback_box.className = "feedback_box";
  feedback_box.textContent = "";
}

function set_level(level) {
  reset_common_state();
  state.current_mode = "level";
  state.current_level = level;
  last_selected_level = level;
  state.current_questions = build_level_questions(level);
  state.current_history = state.current_questions.map(create_record);
  state.session_length = state.current_history.length;

  update_active_entry((button) => Number(button.dataset.level) === level);
  hide_result_and_feedback();
  update_meta();
  render_question();
  render_feedback();
  update_level_stats_from_state();
  render_level_statuses();
  save_preferences();
  save_session_snapshot();
}

function get_smart_base_level() {
  if (state.skill_score < 35) return 1;
  if (state.skill_score < 75) return 2;
  return 3;
}

function get_smart_target_level() {
  const base_level = get_smart_base_level();

  if (state.correct_streak >= 3) {
    state.smart_draw_reason_key = "smart_reason_challenge";
    return Math.min(3, base_level + 1);
  }

  if (state.wrong_streak >= 2) {
    state.smart_draw_reason_key = "smart_reason_recover";
    return Math.max(1, base_level - 1);
  }

  let weights;
  if (state.skill_score < 35) {
    weights = { 1: 0.65, 2: 0.25, 3: 0.1 };
  } else if (state.skill_score < 60) {
    weights = { 1: 0.25, 2: 0.55, 3: 0.2 };
  } else if (state.skill_score < 80) {
    weights = { 1: 0.15, 2: 0.45, 3: 0.4 };
  } else {
    weights = { 1: 0.1, 2: 0.3, 3: 0.6 };
  }

  const picked_level = weighted_pick(weights);

  if (picked_level > base_level) {
    state.smart_draw_reason_key = "smart_reason_raise";
  } else if (picked_level < base_level) {
    state.smart_draw_reason_key = "smart_reason_support";
  } else {
    state.smart_draw_reason_key = "smart_reason_balanced";
  }

  return picked_level;
}

function get_available_questions_by_level(level) {
  const unseen_pool = state.question_bank.filter(
    (item) => item.level === level && !state.asked_question_ids.has(item.id),
  );

  if (unseen_pool.length) {
    return unseen_pool;
  }

  return state.question_bank.filter((item) => item.level === level);
}

function draw_smart_question() {
  let target_level = get_smart_target_level();
  let pool = get_available_questions_by_level(target_level);

  if (!pool.length) {
    const fallback_pool = state.question_bank.filter(
      (item) => !state.asked_question_ids.has(item.id),
    );
    pool = fallback_pool.length ? fallback_pool : state.question_bank;
    if (pool.length) {
      target_level = pool[0].level;
    }
  }

  const picked_question = random_pick(pool);
  if (!picked_question) return null;

  state.asked_question_ids.add(picked_question.id);
  return picked_question;
}

function start_smart_mode() {
  reset_common_state();
  state.current_mode = "smart";
  state.current_level = 2;
  state.session_length = Math.min(SMART_SESSION_LENGTH, state.question_bank.length);

  const first_question = draw_smart_question();
  state.current_history = first_question ? [create_record(first_question)] : [];

  update_active_entry((button) => button.dataset.mode === "smart");
  hide_result_and_feedback();
  update_meta();
  render_question();
  render_feedback();
  render_level_statuses();
  save_preferences();
  save_session_snapshot();
}

function get_option_prefix(index) {
  return OPTION_LETTERS[index] || String(index + 1);
}

function get_option_marker(index, record) {
  if (!record || !record.answered) {
    return record && record.selected_option_index === index ? "●" : "○";
  }

  if (index === record.question.answer) {
    return "✓";
  }

  if (index === record.selected_option_index) {
    return "✕";
  }

  return "○";
}

function get_option_status_text(index, record) {
  if (!record || !record.answered) return "";

  const is_correct_answer = index === record.question.answer;
  const is_selected_wrong =
    index === record.selected_option_index && record.selected_option_index !== record.question.answer;

  if (is_correct_answer && record.selected_option_index === record.question.answer) {
    return get_text("option_state_correct");
  }

  if (is_selected_wrong) {
    return get_text("option_state_wrong");
  }

  if (is_correct_answer) {
    return get_text("option_state_answer");
  }

  return "";
}

function is_current_record_interactive() {
  const record = get_current_record();
  return Boolean(record) && !record.answered;
}

function update_skill_badge(record) {
  if (state.current_mode !== "smart") {
    skill_delta_badge.className = "skill_delta_badge hidden";
    skill_delta_badge.textContent = "";
    return;
  }

  if (!record || !record.answered || !record.pending_delta) {
    skill_delta_badge.className = "skill_delta_badge hidden";
    skill_delta_badge.textContent = "";
    return;
  }

  const positive = record.pending_delta > 0;
  skill_delta_badge.className = `skill_delta_badge ${positive ? "positive" : "negative"}`;
  skill_delta_badge.textContent = `${positive ? "+" : ""}${record.pending_delta}`;
}

function update_meta() {
  const total = state.session_length;
  const question = get_current_question();
  const record = get_current_record();
  const answered_bonus = record && record.answered ? 1 : 0;

  if (state.current_mode === "smart") {
    current_level_text.textContent = `${get_text("smart_mode_title")} · Level ${question ? question.level : 2}`;
    score_text.textContent = `${get_text("score_prefix")}: ${state.score}`;
    skill_text.classList.remove("hidden");
    skill_text.textContent = `${get_text("skill_prefix")}: ${state.skill_score}`;
  } else {
    current_level_text.textContent = `${get_text("level_label")} ${state.current_level}`;
    score_text.textContent = `${get_text("score_prefix")}: ${state.score}`;
    skill_text.classList.add("hidden");
    skill_text.textContent = `${get_text("skill_prefix")}: ${SMART_INITIAL_SKILL}`;
  }

  question_title_text.textContent = get_text("question_title");
  time_text.textContent = `${get_text("time_prefix")}: ${format_duration(get_elapsed_ms())}`;
  update_skill_badge(record);

  if (!total) {
    progress_text.textContent = "0 / 0";
    progress_fill.style.width = "0%";
    return;
  }

  const current_number = Math.min(state.current_index + 1, total);
  progress_text.textContent = `${current_number} / ${total}`;
  const progress_percent = ((state.current_index + answered_bonus) / total) * 100;
  progress_fill.style.width = `${Math.max(0, Math.min(100, progress_percent))}%`;
}

function can_go_next() {
  const record = get_current_record();
  if (!record) return false;

  if (state.current_mode === "smart") {
    return record.answered;
  }

  if (state.current_index < state.current_history.length - 1) {
    return record.answered;
  }

  return record.answered;
}

function can_go_previous() {
  if (result_card.classList.contains("hidden")) {
    return state.current_index > 0;
  }
  return state.current_history.length > 0;
}

function update_action_buttons() {
  const has_question = Boolean(get_current_question());
  const record = get_current_record();
  const can_submit = has_question && is_current_record_interactive() && record?.selected_option_index !== null;
  const show_next = has_question && can_go_next();

  submit_btn.disabled = !can_submit;
  next_btn.disabled = !show_next;
  next_btn.classList.toggle("action_hidden", !show_next);
  restart_btn.disabled = !has_question && result_card.classList.contains("hidden");
}

function render_question() {
  const record = get_current_record();
  const question = record ? record.question : null;
  options_wrap.innerHTML = "";

  if (!state.question_bank.length) {
    question_text.textContent = get_text("loading_questions");
    update_action_buttons();
    return;
  }

  if (!question) {
    question_text.textContent = get_text("no_questions");
    update_action_buttons();
    return;
  }

  const locale_block = question[get_locale()];
  question_text.textContent = locale_block.question;

  locale_block.options.forEach((option_text, index) => {
    const button = document.createElement("button");
    const status_text = get_option_status_text(index, record);
    const interactive = is_current_record_interactive();

    button.type = "button";
    button.className = "option_btn";
    button.setAttribute("aria-pressed", record.selected_option_index === index ? "true" : "false");

    if (record.selected_option_index === index) {
      button.classList.add("selected");
    }

    button.innerHTML = `
      <span class="option_prefix">${get_option_prefix(index)}</span>
      <span class="option_marker">${get_option_marker(index, record)}</span>
      <span class="option_label">${option_text}</span>
      <span class="option_state ${status_text ? "visible" : ""}" aria-hidden="true">${status_text}</span>
    `;

    button.addEventListener("click", () => {
      if (!interactive) return;
      record.selected_option_index = index;
      render_question();
      render_feedback();
      update_action_buttons();
      save_session_snapshot();
    });

    options_wrap.appendChild(button);
  });

  if (record.answered) {
    paint_answer_result(record);
  }

  update_action_buttons();
}

function paint_answer_result(record) {
  const option_buttons = Array.from(document.querySelectorAll(".option_btn"));

  option_buttons.forEach((button, index) => {
    button.classList.add("answered");

    if (index === record.question.answer) {
      button.classList.add("correct");
      if (state.current_index === state.current_history.length - 1) {
        button.classList.add("correct_flash");
      }
    }

    if (index === record.selected_option_index && index !== record.question.answer) {
      button.classList.add("wrong");
    }
  });
}

function get_next_trend_text() {
  if (state.current_mode !== "smart") return "";

  if (state.correct_streak >= 3) return get_text("smart_reason_challenge");
  if (state.wrong_streak >= 2) return get_text("smart_reason_recover");
  if (state.skill_score < 35) return get_text("smart_reason_support");
  if (state.skill_score >= 75) return get_text("smart_reason_raise");
  return get_text("smart_reason_balanced");
}

function render_feedback() {
  const record = get_current_record();
  const question = record ? record.question : null;

  if (!question || !record.answered) {
    if (
      feedback_box.className !== "feedback_box wrong_text" ||
      feedback_box.textContent !== get_text("choose_first")
    ) {
      feedback_box.className = "feedback_box";
      feedback_box.textContent = "";
    }
    return;
  }

  const is_correct = record.is_correct;
  let extra_feedback = "";

  if (state.current_mode === "smart") {
    const delta_prefix = record.pending_delta > 0 ? "+" : "";
    extra_feedback = `
      <br>${get_text("smart_delta_label")}: ${delta_prefix}${record.pending_delta}
      <br>${get_text("skill_prefix")}: ${record.skill_after}
      <br>${get_text("smart_next_label")}: ${get_next_trend_text()}
    `;
  }

  const locale_block = question[get_locale()];
  const selected_answer_text =
    record.selected_option_index === null ? "-" : locale_block.options[record.selected_option_index];
  const correct_answer_text = locale_block.options[question.answer];

  feedback_box.className = `feedback_box ${is_correct ? "correct_text" : "wrong_text"}`;
  feedback_box.innerHTML = `
    <strong>${is_correct ? get_text("feedback_correct") : get_text("feedback_wrong")}</strong><br>
    <span class="feedback_answer_line"><strong>${get_text("your_answer_label")}</strong>: ${selected_answer_text}</span><br>
    <span class="feedback_answer_line"><strong>${get_text("correct_answer_label")}</strong>: ${correct_answer_text}</span><br>
    ${get_text("explanation_label")}: ${locale_block.explanation}
    ${extra_feedback}
  `;
}

function apply_smart_score(question_level, is_correct) {
  const rules = SMART_SCORE_RULES[question_level] || SMART_SCORE_RULES[2];
  state.pending_delta = is_correct ? rules.correct : rules.wrong;
  state.skill_score = clamp_number(state.skill_score + state.pending_delta, 0, 100);

  if (is_correct) {
    state.correct_streak += 1;
    state.wrong_streak = 0;
  } else {
    state.wrong_streak += 1;
    state.correct_streak = 0;
  }
}

function submit_answer() {
  const record = get_current_record();
  const question = record ? record.question : null;

  if (!record || !question || record.answered || !is_current_record_interactive()) return;

  if (record.selected_option_index === null) {
    feedback_box.className = "feedback_box wrong_text";
    feedback_box.textContent = get_text("choose_first");
    return;
  }

  record.answered = true;
  record.is_correct = record.selected_option_index === question.answer;

  if (state.current_mode === "smart") {
    if (record.is_correct) {
      state.score += 1;
    }
    apply_smart_score(question.level, record.is_correct);
    record.pending_delta = state.pending_delta;
    record.skill_after = state.skill_score;
  } else {
    if (record.is_correct) {
      state.score += 1;
    }
    record.pending_delta = 0;
  }

  render_question();
  render_feedback();
  update_meta();
  update_action_buttons();
  update_level_stats_from_state();
  render_level_statuses();
  save_session_snapshot();
}

function show_result() {
  if (!state.ended_at) {
    state.ended_at = Date.now();
  }

  if (state.current_mode === "smart") {
    result_title_text.textContent = get_text("smart_mode_result_title");
    final_score_text.textContent = `${get_text("score_prefix")}: ${state.score} / ${state.session_length} · ${get_text("skill_prefix")}: ${state.skill_score}`;

    if (state.skill_score >= 80) {
      final_message_text.textContent = get_text("smart_final_high");
    } else if (state.skill_score >= 55) {
      final_message_text.textContent = get_text("smart_final_mid");
    } else {
      final_message_text.textContent = get_text("smart_final_low");
    }
  } else {
    const total = state.current_history.length || 1;
    const percent = state.score / total;

    result_title_text.textContent = get_text("result_title");
    final_score_text.textContent = `${state.score} / ${total}`;

    if (percent === 1) {
      final_message_text.textContent = get_text("final_great");
    } else if (percent >= 0.6) {
      final_message_text.textContent = get_text("final_good");
    } else {
      final_message_text.textContent = get_text("final_retry");
    }
  }

  final_time_text.textContent = `${get_text("time_prefix")}: ${format_duration(get_elapsed_ms())}`;
  result_card.classList.remove("hidden");
  progress_fill.style.width = "100%";
  update_meta();
  update_level_stats_from_state();
  render_level_statuses();
  save_session_snapshot();
}

function render_result_text() {
  if (result_card.classList.contains("hidden")) return;
  show_result();
}

function go_to_previous_question() {
  if (!can_go_previous()) return;

  if (!result_card.classList.contains("hidden")) {
    result_card.classList.add("hidden");
    state.current_index = Math.max(0, state.current_history.length - 1);
  } else {
    state.current_index = Math.max(0, state.current_index - 1);
  }

  render_question();
  render_feedback();
  update_meta();
  update_action_buttons();
  update_level_stats_from_state();
  render_level_statuses();
  save_session_snapshot();
}

function go_to_next_question() {
  const record = get_current_record();
  if (!record) return;

  if (state.current_index < state.current_history.length - 1) {
    state.current_index += 1;
    result_card.classList.add("hidden");
    render_question();
    render_feedback();
    update_meta();
    update_action_buttons();
    update_level_stats_from_state();
    render_level_statuses();
    save_session_snapshot();
    return;
  }

  if (!record.answered) return;

  if (state.current_mode === "smart") {
    if (state.current_history.length >= state.session_length) {
      show_result();
      return;
    }

    const next_question = draw_smart_question();
    if (next_question) {
      state.current_history.push(create_record(next_question));
      state.current_index = state.current_history.length - 1;
      result_card.classList.add("hidden");
      feedback_box.className = "feedback_box";
      feedback_box.textContent = "";
      render_question();
      render_feedback();
      update_meta();
      update_action_buttons();
      save_session_snapshot();
      return;
    }
  }

  if (state.current_mode === "level") {
    if (state.current_index >= state.current_history.length - 1) {
      show_result();
      return;
    }
  }
}

function restart_current_mode() {
  const should_restart = !has_unfinished_progress() || window.confirm(get_text("confirm_restart_current"));
  if (!should_restart) return;

  clear_session_snapshot();

  if (state.current_mode === "smart") {
    start_smart_mode();
  } else {
    clear_level_progress_state(state.current_level);
    render_level_statuses();
    set_level(state.current_level);
  }
}

function move_option_selection(direction) {
  const record = get_current_record();
  const question = record ? record.question : null;
  if (!record || !question || !is_current_record_interactive()) return;

  const option_count = question[get_locale()].options.length;
  if (!option_count) return;

  if (record.selected_option_index === null) {
    record.selected_option_index = direction > 0 ? 0 : option_count - 1;
  } else {
    const next_index = (record.selected_option_index + direction + option_count) % option_count;
    record.selected_option_index = next_index;
  }

  render_question();
  render_feedback();
  update_action_buttons();
  save_session_snapshot();
}

function handle_keydown(event) {
  const active_tag = document.activeElement?.tagName;
  if (active_tag === "INPUT" || active_tag === "TEXTAREA") return;

  if (event.key === "ArrowUp") {
    event.preventDefault();
    move_option_selection(-1);
    return;
  }

  if (event.key === "ArrowDown") {
    event.preventDefault();
    move_option_selection(1);
    return;
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    go_to_previous_question();
    return;
  }

  if (event.key === "ArrowRight") {
    event.preventDefault();
    go_to_next_question();
    return;
  }

  if (event.key === "Enter") {
    event.preventDefault();
    submit_answer();
  }
}

async function initialise_quiz() {
  set_theme_variables();
  load_preferences();
  apply_mode();
  apply_language();
  setup_color_mode_persistence();

  try {
    const loaded_questions = await load_question_bank();
    state.question_bank = Array.isArray(loaded_questions) ? loaded_questions : [];

    const restored = restore_session_snapshot();
    if (!restored) {
      set_level(last_selected_level);
    } else {
      render_question();
      render_feedback();
      update_meta();
      update_action_buttons();
      render_result_text();
    }

    apply_language();
    render_level_statuses();
  } catch (error) {
    console.error(error);
    const error_message = get_text("load_error");
    question_text.textContent = error_message;
    options_wrap.innerHTML = "";
    feedback_box.className = "feedback_box wrong_text";
    feedback_box.textContent = error_message;
    update_action_buttons();
  }
}

language_toggle_btn.addEventListener("click", () => {
  is_chinese = !is_chinese;
  apply_language();
  save_preferences();
});

mode_toggle_btn.addEventListener("click", () => {
  is_night = !is_night;
  apply_mode();
  save_preferences();
});

level_buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.mode === "smart") {
      start_smart_mode();
      return;
    }

    const target_level = Number(button.dataset.level);
    if (target_level) {
      set_level(target_level);
    }
  });
});

submit_btn.addEventListener("click", submit_answer);
next_btn.addEventListener("click", go_to_next_question);
restart_btn.addEventListener("click", restart_current_mode);
retry_result_btn.addEventListener("click", restart_current_mode);
document.addEventListener("keydown", handle_keydown);
setInterval(() => update_meta(), 1000);

initialise_quiz();

window.addEventListener("beforeunload", () => {
  save_preferences();
  update_level_stats_from_state();
  save_session_snapshot();
});
