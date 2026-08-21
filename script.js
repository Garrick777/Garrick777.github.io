(() => {
  const root = document.documentElement;
  const languageToggle = document.querySelector('#languageToggle');
  const mobileNavToggle = document.querySelector('#mobileNavToggle');
  const globalNav = document.querySelector('#globalNav');
  const translatable = [...document.querySelectorAll('[data-zh][data-en]')];
  const viewLinks = [...document.querySelectorAll('[data-view-target]')];
  const tabs = [...document.querySelectorAll('.profile-tab')];
  const views = [...document.querySelectorAll('.view[data-view]')];
  const filterButtons = [...document.querySelectorAll('.filter-button')];
  const projectRows = [...document.querySelectorAll('.project-row[data-track]')];

  let language = 'zh';
  try {
    language = localStorage.getItem('gavin-language') === 'en' ? 'en' : 'zh';
  } catch (_) {
    language = 'zh';
  }

  function setLanguage(nextLanguage) {
    language = nextLanguage === 'en' ? 'en' : 'zh';
    root.lang = language === 'zh' ? 'zh-CN' : 'en';
    translatable.forEach((element) => {
      const copy = element.dataset[language];
      if (copy !== undefined) element.textContent = copy;
    });
    document.title = language === 'zh' ? 'Gavin · 应用计算' : 'Gavin · Applied Computing';
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute('content', language === 'zh'
        ? 'Gavin 的 GitHub Pages 个人主页：Python 与 AI、统计实证、嵌入式与智能硬件。'
        : 'Gavin on GitHub Pages: Python & AI, empirical research, embedded systems, and intelligent hardware.');
    }
    const active = languageToggle?.querySelector('.language-active');
    const other = languageToggle?.querySelector('.language-other');
    if (active) active.textContent = language === 'zh' ? '中' : 'EN';
    if (other) other.textContent = language === 'zh' ? 'EN' : '中';
    languageToggle?.setAttribute('aria-pressed', String(language === 'en'));
    languageToggle?.setAttribute('aria-label', language === 'zh' ? '切换到 English' : 'Switch to 中文');
    try {
      localStorage.setItem('gavin-language', language);
    } catch (_) {
      // The toggle remains usable when browser storage is disabled.
    }
  }

  function validView(name) {
    return views.some((view) => view.dataset.view === name) ? name : 'overview';
  }

  function setView(nextView, updateHash = true) {
    const viewName = validView(nextView);
    views.forEach((view) => {
      const active = view.dataset.view === viewName;
      view.classList.toggle('is-active', active);
      view.hidden = !active;
    });
    tabs.forEach((tab) => {
      const active = tab.dataset.viewTarget === viewName;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
    });
    if (updateHash && window.location.hash !== `#${viewName}`) {
      history.replaceState(null, '', `#${viewName}`);
    }
    globalNav?.classList.remove('is-open');
    mobileNavToggle?.setAttribute('aria-expanded', 'false');
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    requestAnimationFrame(() => {
      document.querySelectorAll(`#${viewName} .reveal`).forEach((item, index) => {
        window.setTimeout(() => item.classList.add('is-visible'), index * 45);
      });
    });
  }

  languageToggle?.addEventListener('click', () => setLanguage(language === 'zh' ? 'en' : 'zh'));

  viewLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = link.dataset.viewTarget;
      if (!target) return;
      event.preventDefault();
      setView(target);
    });
  });

  window.addEventListener('hashchange', () => setView(window.location.hash.slice(1), false));

  mobileNavToggle?.addEventListener('click', () => {
    const open = globalNav?.classList.toggle('is-open');
    mobileNavToggle.setAttribute('aria-expanded', String(Boolean(open)));
  });

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter || 'all';
      filterButtons.forEach((item) => item.classList.toggle('is-active', item === button));
      projectRows.forEach((row) => {
        row.classList.toggle('is-hidden', filter !== 'all' && row.dataset.track !== filter);
      });
    });
  });

  const contributionGrid = document.querySelector('.contribution-grid');
  if (contributionGrid) {
    const levels = [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 3];
    for (let index = 0; index < 182; index += 1) {
      const cell = document.createElement('i');
      const level = levels[(index * 7 + index * index) % levels.length];
      if (level > 0) cell.classList.add(`level-${level}`);
      contributionGrid.appendChild(cell);
    }
  }

  setLanguage(language);
  setView(window.location.hash.slice(1) || 'overview', false);

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));
  } else {
    document.querySelectorAll('.reveal').forEach((item) => item.classList.add('is-visible'));
  }
})();
