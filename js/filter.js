export function setupTrackFilter() {
  const buttons = [...document.querySelectorAll(".filter-button")];
  const groups = [...document.querySelectorAll(".track-group")];
  if (!buttons.length || !groups.length) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter || "all";
      buttons.forEach((item) => item.classList.toggle("is-active", item === button));
      groups.forEach((group) => {
        group.hidden = filter !== "all" && group.dataset.track !== filter;
      });
    });
  });
}
