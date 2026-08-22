(() => {
  const root = document.documentElement;
  const languageToggle = document.querySelector("#languageToggle");
  const themeToggle = document.querySelector("#themeToggle");
  const translatable = [...document.querySelectorAll("[data-zh][data-en]")];
  const projectCards = [...document.querySelectorAll(".project-card[data-track]")];
  const filterButtons = [...document.querySelectorAll("[data-project-filter]")];
  const filterLinks = [...document.querySelectorAll("[data-filter-link]")];
  const projectCount = document.querySelector("#projectCount");
  const projectEmpty = document.querySelector("#projectEmpty");
  const sectionLinks = [...document.querySelectorAll("[data-section-link]")];
  const metaDescription = document.querySelector('meta[name="description"]');
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const languageKey = "gavin-language";
  const themeKey = "gavin-theme";
  const availableFilters = ["all", "hardware", "algorithms", "research"];

  const copy = {
    zh: {
      title: "Gavin · 开发者 / 技术研究者",
      description: "Gavin：开发者与技术研究者，专注于独立开发、应用机器学习、嵌入式系统与实证研究。",
      skip: "跳转到主要内容",
      sidebar: "个人站点导航",
      nav: "主要导航",
      filter: "按技术方向筛选项目",
      themeDark: "切换深色模式",
      themeLight: "切换浅色模式",
      languageNext: "切换到 English",
      count: (value) => String(value) + " 个项目",
    },
    en: {
      title: "Gavin · Developer / Technical Researcher",
      description: "Gavin: a developer and technical researcher focused on independent development, applied machine learning, embedded systems, and empirical research.",
      skip: "Skip to main content",
      sidebar: "Site navigation",
      nav: "Primary navigation",
      filter: "Filter projects by technical track",
      themeDark: "Switch to dark mode",
      themeLight: "Switch to light mode",
      languageNext: "切换到中文",
      count: (value) => String(value) + " projects",
    },
  };

  let language = readStorage(languageKey) === "en" ? "en" : "zh";
  let currentFilter = "all";

  function readStorage(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function writeStorage(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      // Storage can be unavailable for local file previews.
    }
  }

  function applyTheme(nextTheme) {
    const theme = nextTheme === "dark" ? "dark" : "light";
    root.dataset.theme = theme;
    writeStorage(themeKey, theme);

    if (themeToggle) {
      const isDark = theme === "dark";
      themeToggle.setAttribute("aria-pressed", String(isDark));
      themeToggle.setAttribute(
        "aria-label",
        isDark ? copy[language].themeLight : copy[language].themeDark,
      );
    }

    if (themeColor) themeColor.content = theme === "dark" ? "#1b1b20" : "#fbf7e9";
  }

  function applyLanguage(nextLanguage) {
    language = nextLanguage === "en" ? "en" : "zh";
    root.lang = language === "en" ? "en" : "zh-CN";

    translatable.forEach((node) => {
      const value = node.dataset[language];
      if (value !== undefined) node.textContent = value;
    });

    document.title = copy[language].title;
    if (metaDescription) metaDescription.content = copy[language].description;
    if (ogTitle) ogTitle.content = copy[language].title;
    if (ogDescription) ogDescription.content = copy[language].description;

    const skipLink = document.querySelector(".skip-link");
    const sidebar = document.querySelector(".site-sidebar");
    const nav = document.querySelector(".sidebar-nav");
    const filterGroup = document.querySelector(".filter-group");
    if (skipLink) skipLink.textContent = copy[language].skip;
    if (sidebar) sidebar.setAttribute("aria-label", copy[language].sidebar);
    if (nav) nav.setAttribute("aria-label", copy[language].nav);
    if (filterGroup) filterGroup.setAttribute("aria-label", copy[language].filter);

    if (languageToggle) {
      languageToggle.setAttribute("aria-pressed", String(language === "en"));
      languageToggle.setAttribute("aria-label", copy[language].languageNext);
      languageToggle.querySelector(".language-active").textContent = language === "en" ? "EN" : "中";
      languageToggle.querySelector(".language-other").textContent = language === "en" ? "中" : "EN";
    }

    updateProjectCount();
    applyTheme(root.dataset.theme);
    writeStorage(languageKey, language);
  }

  function updateProjectCount() {
    if (!projectCount) return;
    const visibleCount = projectCards.filter((card) => !card.hidden).length;
    projectCount.textContent = copy[language].count(visibleCount);
  }

  function setProjectFilter(nextFilter) {
    currentFilter = availableFilters.includes(nextFilter) ? nextFilter : "all";
    let visibleCount = 0;

    projectCards.forEach((card) => {
      const visible = currentFilter === "all" || card.dataset.track === currentFilter;
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    filterButtons.forEach((button) => {
      const active = button.dataset.projectFilter === currentFilter;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    if (projectEmpty) projectEmpty.hidden = visibleCount !== 0;
    updateProjectCount();
  }

  function setupFilters() {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => setProjectFilter(button.dataset.projectFilter));
    });

    filterLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (link.dataset.filterLink) setProjectFilter(link.dataset.filterLink);
      });
    });
  }

  function setActiveSection(id) {
    sectionLinks.forEach((link) => {
      const active = link.getAttribute("href") === "#" + id;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }

  function setupSectionObserver() {
    const sections = [...document.querySelectorAll("main section[id]")];
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
          .forEach((entry) => setActiveSection(entry.target.id));
      },
      { rootMargin: "-18% 0px -68% 0px", threshold: [0, 0.2, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
  }

  if (languageToggle) {
    languageToggle.addEventListener("click", () => {
      applyLanguage(language === "zh" ? "en" : "zh");
    });
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      applyTheme(root.dataset.theme === "dark" ? "light" : "dark");
    });
  }

  setupFilters();
  setupSectionObserver();
  setProjectFilter(currentFilter);
  applyTheme(readStorage(themeKey) === "dark" ? "dark" : "light");
  applyLanguage(language);

  const initialHash = window.location.hash.slice(1);
  if (sectionLinks.some((link) => link.getAttribute("href") === "#" + initialHash)) {
    setActiveSection(initialHash);
  }
})();
