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
const SMART_SCORE_RULES = {
  1: { correct: 5, wrong: -4 },
  2: { correct: 7, wrong: -6 },
  3: { correct: 9, wrong: -8 },
};

const i18n_text = {
  zh: {
    brand_tag: "GCSE 圆几何测验",
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
    smart_badge: "推荐",
    smart_mode: "智能闯关",
    smart_mode_hint: "按你的实时表现自动调节题目难度",
    smart_mode_title: "智能闯关 · 当前题目",
    smart_mode_result_title: "智能闯关完成",
    smart_progress_label: "闯关进度",
    question_title: "题目",
    loading_questions: "正在加载题库...",
    load_error: "题库加载失败，请检查 quiz.json 路径。",
    no_questions: "这一关暂时没有题目。",
    submit_answer: "提交答案",
    next_question: "下一题",
    restart_level: "重做本关",
    result_kicker: "Result",
    result_title: "本关完成",
    score_prefix: "答对",
    skill_prefix: "能力值",
    choose_first: "请先选择一个答案。",
    feedback_correct: "回答正确！",
    feedback_wrong: "回答错误。",
    explanation_label: "解析",
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
    smart_badge: "Recommended",
    smart_mode: "Smart Challenge",
    smart_mode_hint: "Adjust question difficulty in real time based on your performance",
    smart_mode_title: "Smart Challenge · Current Question",
    smart_mode_result_title: "Smart Challenge Complete",
    smart_progress_label: "Progress",
    question_title: "Question",
    loading_questions: "Loading question bank...",
    load_error: "Failed to load question bank. Please check quiz.json path.",
    no_questions: "There are no questions in this level yet.",
    submit_answer: "Submit Answer",
    next_question: "Next Question",
    restart_level: "Restart",
    result_kicker: "Result",
    result_title: "Level Complete",
    score_prefix: "Correct",
    skill_prefix: "Skill",
    choose_first: "Please choose one option first.",
    feedback_correct: "Correct!",
    feedback_wrong: "Wrong.",
    explanation_label: "Explanation",
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
const skill_text = document.getElementById("skill_text");
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
const final_message_text = document.getElementById("final_message_text");
const retry_result_btn = document.getElementById("retry_result_btn");

const state = {
  question_bank: [],
  current_mode: "level",
  current_level: 1,
  current_questions: [],
  current_question: null,
  current_index: 0,
  selected_option_index: null,
  score: 0,
  answered: false,
  session_length: 0,
  skill_score: SMART_INITIAL_SKILL,
  correct_streak: 0,
  wrong_streak: 0,
  asked_question_ids: new Set(),
  smart_draw_reason_key: "smart_reason_balanced",
  pending_delta: 0,
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

async function load_question_bank() {
  const response = await fetch("./quiz.json");
  if (!response.ok) {
    throw new Error("Failed to load quiz.json");
  }
  return response.json();
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
  mode_toggle_btn.textContent = is_night
    ? lang_dict.mode_night
    : lang_dict.mode_day;

  update_meta();
  render_question();
  render_feedback();
  render_result_text();
}

function apply_mode() {
  body_element.classList.toggle("night_mode", is_night);
  mode_toggle_btn.textContent = is_night
    ? get_text("mode_night")
    : get_text("mode_day");
}

function build_level_questions(level) {
  return shuffle_array(
    state.question_bank.filter((item) => item.level === level),
  );
}

function reset_common_state() {
  state.current_questions = [];
  state.current_question = null;
  state.current_index = 0;
  state.selected_option_index = null;
  state.score = 0;
  state.answered = false;
  state.pending_delta = 0;
  state.correct_streak = 0;
  state.wrong_streak = 0;
  state.asked_question_ids = new Set();
  state.smart_draw_reason_key = "smart_reason_balanced";
}

function update_active_entry(activeMatcher) {
  level_buttons.forEach((button) => {
    const is_active = activeMatcher(button);
    button.classList.toggle("active_level", is_active);
  });
}

function set_level(level) {
  reset_common_state();
  state.current_mode = "level";
  state.current_level = level;
  state.current_questions = build_level_questions(level);
  state.session_length = state.current_questions.length;
  state.current_question = state.current_questions[0] || null;
  state.skill_score = SMART_INITIAL_SKILL;

  update_active_entry((button) => Number(button.dataset.level) === level);
  hide_result_and_feedback();
  update_meta();
  render_question();
  render_feedback();
}

function hide_result_and_feedback() {
  result_card.classList.add("hidden");
  feedback_box.className = "feedback_box";
  feedback_box.textContent = "";
}

function get_current_question() {
  if (state.current_mode === "smart") {
    return state.current_question;
  }
  return state.current_questions[state.current_index] || null;
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
  if (!picked_question) {
    return null;
  }

  state.asked_question_ids.add(picked_question.id);
  return picked_question;
}

function start_smart_mode() {
  reset_common_state();
  state.current_mode = "smart";
  state.current_level = 2;
  state.skill_score = SMART_INITIAL_SKILL;
  state.session_length = Math.min(SMART_SESSION_LENGTH, state.question_bank.length);
  state.current_question = draw_smart_question();
  state.current_questions = state.current_question ? [state.current_question] : [];

  update_active_entry((button) => button.dataset.mode === "smart");
  hide_result_and_feedback();
  update_meta();
  render_question();
  render_feedback();
}

function update_meta() {
  const total =
    state.current_mode === "smart"
      ? state.session_length
      : state.current_questions.length;
  const question = get_current_question();

  if (state.current_mode === "smart") {
    current_level_text.textContent = `${get_text("smart_mode_title")} · Level ${question ? question.level : 2}`;
    question_title_text.textContent = get_text("question_title");
    score_text.textContent = `${get_text("score_prefix")}: ${state.score}`;
    skill_text.classList.remove("hidden");
    skill_text.textContent = `${get_text("skill_prefix")}: ${state.skill_score}`;
  } else {
    current_level_text.textContent = `${get_text("level_label")} ${state.current_level}`;
    question_title_text.textContent = get_text("question_title");
    score_text.textContent = `${get_text("score_prefix")}: ${state.score}`;
    skill_text.classList.add("hidden");
    skill_text.textContent = `${get_text("skill_prefix")}: ${SMART_INITIAL_SKILL}`;
  }

  if (total === 0) {
    progress_text.textContent = "0 / 0";
    progress_fill.style.width = "0%";
    return;
  }

  const current_number = Math.min(state.current_index + 1, total);
  progress_text.textContent = `${current_number} / ${total}`;

  const progress_percent = (state.current_index / total) * 100;
  progress_fill.style.width = `${progress_percent}%`;
}

function update_action_buttons() {
  const has_question = Boolean(get_current_question());
  submit_btn.disabled = !has_question || state.answered;
  next_btn.disabled = !has_question || !state.answered;
  restart_btn.disabled = !has_question;
}

function render_question() {
  const question = get_current_question();
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
    button.type = "button";
    button.className = "option_btn";
    button.setAttribute(
      "aria-pressed",
      state.selected_option_index === index ? "true" : "false",
    );

    if (state.selected_option_index === index) {
      button.classList.add("selected");
    }

    button.innerHTML = `
      <span class="option_marker">${state.selected_option_index === index ? "●" : "○"}</span>
      <span class="option_label">${option_text}</span>
    `;

    button.addEventListener("click", () => {
      if (state.answered) return;
      state.selected_option_index = index;
      render_question();
      render_feedback();
    });

    options_wrap.appendChild(button);
  });

  if (state.answered) {
    paint_answer_result();
  }

  update_action_buttons();
}

function paint_answer_result() {
  const question = get_current_question();
  if (!question) return;

  const option_buttons = Array.from(document.querySelectorAll(".option_btn"));

  option_buttons.forEach((button, index) => {
    if (index === question.answer) {
      button.classList.add("correct");
    }
    if (index === state.selected_option_index && index !== question.answer) {
      button.classList.add("wrong");
    }
  });
}

function get_next_trend_text() {
  if (state.current_mode !== "smart") return "";

  if (state.correct_streak >= 3) {
    return get_text("smart_reason_challenge");
  }

  if (state.wrong_streak >= 2) {
    return get_text("smart_reason_recover");
  }

  if (state.skill_score < 35) {
    return get_text("smart_reason_support");
  }

  if (state.skill_score >= 75) {
    return get_text("smart_reason_raise");
  }

  return get_text("smart_reason_balanced");
}

function render_feedback() {
  const question = get_current_question();

  if (!question || !state.answered) {
    if (
      feedback_box.className !== "feedback_box wrong_text" ||
      feedback_box.textContent !== get_text("choose_first")
    ) {
      feedback_box.className = "feedback_box";
      feedback_box.textContent = "";
    }
    return;
  }

  const is_correct = state.selected_option_index === question.answer;
  let extra_feedback = "";

  if (state.current_mode === "smart") {
    const delta_prefix = state.pending_delta > 0 ? "+" : "";
    extra_feedback = `
      <br>${get_text("smart_delta_label")}: ${delta_prefix}${state.pending_delta}
      <br>${get_text("skill_prefix")}: ${state.skill_score}
      <br>${get_text("smart_next_label")}: ${get_next_trend_text()}
    `;
  }

  feedback_box.className = `feedback_box ${is_correct ? "correct_text" : "wrong_text"}`;
  feedback_box.innerHTML = `
    <strong>${is_correct ? get_text("feedback_correct") : get_text("feedback_wrong")}</strong><br>
    ${get_text("explanation_label")}: ${question[get_locale()].explanation}
    ${extra_feedback}
  `;
}

function apply_smart_score(questionLevel, is_correct) {
  const rules = SMART_SCORE_RULES[questionLevel] || SMART_SCORE_RULES[2];
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
  const question = get_current_question();
  if (!question || state.answered) return;

  if (state.selected_option_index === null) {
    feedback_box.className = "feedback_box wrong_text";
    feedback_box.textContent = get_text("choose_first");
    return;
  }

  state.answered = true;
  const is_correct = state.selected_option_index === question.answer;

  if (state.current_mode === "smart") {
    if (is_correct) {
      state.score += 1;
    }
    apply_smart_score(question.level, is_correct);
  } else if (is_correct) {
    state.score += 1;
  }

  paint_answer_result();
  render_feedback();
  update_meta();
  update_action_buttons();
}

function show_result() {
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
    const total = state.current_questions.length || 1;
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

  result_card.classList.remove("hidden");
  progress_fill.style.width = "100%";
}

function render_result_text() {
  if (result_card.classList.contains("hidden")) return;
  show_result();
}

function next_question() {
  if (!state.answered) return;

  const total =
    state.current_mode === "smart"
      ? state.session_length
      : state.current_questions.length;

  if (state.current_index < total - 1) {
    state.current_index += 1;
    state.selected_option_index = null;
    state.answered = false;
    state.pending_delta = 0;
    feedback_box.className = "feedback_box";
    feedback_box.textContent = "";

    if (state.current_mode === "smart") {
      state.current_question = draw_smart_question();
      if (state.current_question) {
        state.current_questions.push(state.current_question);
      }
    } else {
      state.current_question = state.current_questions[state.current_index] || null;
    }

    render_question();
    update_meta();
    update_action_buttons();
  } else {
    show_result();
  }
}

function restart_current_mode() {
  if (state.current_mode === "smart") {
    start_smart_mode();
  } else {
    set_level(state.current_level);
  }
}

async function initialise_quiz() {
  set_theme_variables();
  apply_mode();
  apply_language();

  try {
    const loaded_questions = await load_question_bank();
    state.question_bank = Array.isArray(loaded_questions)
      ? loaded_questions
      : [];
    set_level(1);
    apply_language();
  } catch (error) {
    console.error(error);
    const is_file_protocol = window.location.protocol === "file:";
    const error_message = is_file_protocol
      ? "题库加载失败：你现在是直接打开本地文件。请使用 Live Server 运行。"
      : get_text("load_error");

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
});

mode_toggle_btn.addEventListener("click", () => {
  is_night = !is_night;
  apply_mode();
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
next_btn.addEventListener("click", next_question);
restart_btn.addEventListener("click", restart_current_mode);
retry_result_btn.addEventListener("click", restart_current_mode);

initialise_quiz();
