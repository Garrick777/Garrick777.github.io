import { setupLanguageToggle } from "./language.js";
import { setupNav, setupReveal } from "./nav.js";
import { renderServices, renderTrackGroups } from "./render.js";
import { setupTrackFilter } from "./filter.js";
import { services } from "../data/services.js";
import { tracks, projects } from "../data/projects.js";

const servicesContainer = document.querySelector("#servicesGrid");
const workContainer = document.querySelector("#workGroups");

if (servicesContainer) renderServices(servicesContainer, services);
if (workContainer) renderTrackGroups(workContainer, tracks, projects);

setupNav();
setupTrackFilter();
setupLanguageToggle();
setupReveal();
