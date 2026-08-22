export function setupNav() {
  const treeItems = document.querySelectorAll(".tree-item");
  const tabs = document.querySelectorAll(".tab");
  const sections = document.querySelectorAll(".editor-section");
  const viewport = document.getElementById("editorViewport");
  const fileTypeIndicator = document.getElementById("editorFileType");
  const fileInfoIndicator = document.getElementById("editorFileInfo");
  const validViews = new Set([...sections].map((section) => section.id.replace("sec-", "")));

  const fileMeta = {
    readme: { type: "Markdown" },
    about: { type: "Markdown" },
    services: { type: "JavaScript" },
    work: { type: "JSON" },
    contact: { type: "CSS" },
  };

  function countVisibleLines(fileId) {
    const section = document.getElementById(`sec-${fileId}`);
    if (!section) return 0;

    return section.innerText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean).length;
  }

  function switchView(fileId) {
    if (!fileId || !validViews.has(fileId)) return;

    treeItems.forEach((item) => {
      const isActive = item.dataset.file === fileId;
      item.classList.toggle("active", isActive);
      if (isActive) {
        item.setAttribute("aria-current", "page");
      } else {
        item.removeAttribute("aria-current");
      }
    });

    tabs.forEach((tab) => {
      const isActive = tab.dataset.file === fileId;
      tab.classList.toggle("active", isActive);
      if (isActive) {
        tab.setAttribute("aria-current", "page");
      } else {
        tab.removeAttribute("aria-current");
      }
    });

    sections.forEach((sec) => {
      const sectionId = `sec-${fileId}`;
      sec.classList.toggle("active", sec.id === sectionId);
    });

    const meta = fileMeta[fileId];
    if (meta) {
      if (fileTypeIndicator) fileTypeIndicator.textContent = meta.type;
      if (fileInfoIndicator) fileInfoIndicator.textContent = `${countVisibleLines(fileId)} lines`;
    }

    if (viewport) {
      viewport.scrollTop = 0;
    }
  }

  function syncFromHash(normalizeUrl = false) {
    const rawHash = decodeURIComponent(window.location.hash.slice(1));
    const fileId = validViews.has(rawHash) ? rawHash : "readme";

    if (normalizeUrl && rawHash !== fileId) {
      history.replaceState(null, "", `#${fileId}`);
    }

    switchView(fileId);
  }

  window.addEventListener("hashchange", () => syncFromHash());
  syncFromHash(true);
}

export function setupReveal() {
  // Disabled scroll reveal in the locked adaptive workspace viewport.
}
