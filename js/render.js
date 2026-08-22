function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function buildTagRow(stack) {
  const row = el("div", "tag-row");
  stack.forEach((item) => row.appendChild(el("span", null, item)));
  return row;
}

function buildToggleIcon(className) {
  const icon = el("span", className, "+");
  icon.setAttribute("aria-hidden", "true");
  return icon;
}

const blockClassMap = {
  问题: "is-problem",
  方法: "is-method",
  结果: "is-result",
};

export function renderServices(container, services) {
  services.forEach((service) => {
    const details = el("details", `service-card${service.flagship ? " is-flagship" : ""}`);
    details.dataset.id = service.id;

    const summary = document.createElement("summary");
    summary.className = "service-summary";

    const main = el("div", "service-summary-main");
    if (service.flagship) main.appendChild(el("span", "service-badge", "核心服务"));
    main.appendChild(el("h3", null, service.title));
    main.appendChild(el("p", "service-summary-meta", service.meta));
    summary.appendChild(main);
    summary.appendChild(buildToggleIcon("service-toggle-icon"));
    details.appendChild(summary);

    const body = el("div", "service-body");
    const blocks = [
      ["问题", service.problem],
      ["方法", service.method],
      ["结果", service.result],
    ];
    blocks.forEach(([label, text]) => {
      const block = el("div", `service-block ${blockClassMap[label] || ""}`.trim());
      block.appendChild(el("div", `service-block-label ${blockClassMap[label] || ""}`.trim(), label));
      block.appendChild(el("p", null, text));
      body.appendChild(block);
    });
    body.appendChild(buildTagRow(service.stack));
    details.appendChild(body);

    container.appendChild(details);
  });
}

export function renderProjectCard(project) {
  const details = el("details", `project-card${project.flagship ? " is-flagship" : ""}`);
  details.dataset.id = project.id;
  details.dataset.track = project.track;

  const summary = document.createElement("summary");
  summary.className = "project-summary";

  const main = el("div", "project-summary-main");
  main.appendChild(el("h4", null, project.title));
  main.appendChild(el("p", "project-meta", project.meta));
  summary.appendChild(main);
  summary.appendChild(buildToggleIcon("project-toggle-icon"));
  details.appendChild(summary);

  const body = el("div", "project-body");
  const blocks = [
    ["问题", project.problem],
    ["方法", project.method],
    ["结果", project.result],
  ];
  blocks.forEach(([label, text]) => {
    const block = el("div", `project-block ${blockClassMap[label] || ""}`.trim());
    block.appendChild(el("div", `project-block-label ${blockClassMap[label] || ""}`.trim(), label));
    block.appendChild(el("p", null, text));
    body.appendChild(block);
  });
  body.appendChild(buildTagRow(project.stack));
  details.appendChild(body);

  return details;
}

export function renderTrackGroups(container, tracks, projects) {
  tracks.forEach((track) => {
    const trackProjects = projects.filter((project) => project.track === track.id);
    if (!trackProjects.length) return;

    const group = el("div", "track-group");
    group.dataset.track = track.id;

    const heading = el("div", "track-heading");
    heading.appendChild(el("h3", null, track.zh));
    heading.appendChild(el("span", "track-count", `${trackProjects.length} 个项目`));
    group.appendChild(heading);

    const grid = el("div", "project-grid");
    trackProjects
      .sort((a, b) => Number(b.flagship) - Number(a.flagship))
      .forEach((project) => grid.appendChild(renderProjectCard(project)));
    group.appendChild(grid);

    container.appendChild(group);
  });
}
