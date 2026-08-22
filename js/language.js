const STORAGE_KEY = "gavin-language";

export function getStoredLanguage() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "zh";
  } catch (_) {
    return "zh";
  }
}

export function setupLanguageToggle() {
  const root = document.documentElement;
  const toggle = document.querySelector("#languageToggle");
  const translatable = () => [...document.querySelectorAll("[data-zh][data-en]")];

  let language = getStoredLanguage();

  function apply(nextLanguage) {
    language = nextLanguage === "en" ? "en" : "zh";
    root.lang = language === "zh" ? "zh-CN" : "en";

    translatable().forEach((element) => {
      const copy = element.dataset[language];
      if (copy !== undefined) element.textContent = copy;
    });

    document.title = language === "zh" ? "Gavin · 编程与技术辅导" : "Gavin · Programming & Technical Tutoring";
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute(
        "content",
        language === "zh"
          ? "Gavin 提供 Python、统计软件与嵌入式编程辅导，并展示硬件、算法与实证方向的技术项目。"
          : "Gavin offers Python, statistics, and embedded programming tutoring, backed by real hardware, algorithm, and research projects."
      );
    }

    const active = toggle?.querySelector(".language-active");
    const other = toggle?.querySelector(".language-other");
    if (active) active.textContent = language === "zh" ? "中" : "EN";
    if (other) other.textContent = language === "zh" ? "EN" : "中";
    toggle?.setAttribute("aria-pressed", String(language === "en"));
    toggle?.setAttribute("aria-label", language === "zh" ? "切换到 English" : "Switch to 中文");

    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch (_) {
      /* storage unavailable, toggle still works in-memory */
    }
  }

  toggle?.addEventListener("click", () => apply(language === "zh" ? "en" : "zh"));
  apply(language);

  return { getLanguage: () => language, refresh: () => apply(language) };
}
