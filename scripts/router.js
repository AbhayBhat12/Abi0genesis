// Choose a page from the URL hash. Hash routes work on GitHub Pages without server rules.
import { DATA, DECKS } from "./data.js";
import { main, $ } from "./utils.js";
import { home } from "./pages/home.js";
import { article } from "./pages/case-study.js";
import { background } from "./pages/projects.js";
import { profile } from "./pages/profile.js";
import { about } from "./pages/abiogenesis.js";
import { topics } from "./pages/topics.js";
import { deckReader } from "./pages/presentations.js";

function route() {
  if ($("#figure-dialog").open) $("#figure-dialog").close();
  main.onkeydown = null;
  const [name, id, depth] = location.hash.replace(/^#\/?/, "").split("/");
  let anchor,
    active = "#/";
  document.title = "Abiogenesis — Abhay Bhat";
  document
    .querySelectorAll(".topbar nav a")
    .forEach((a) => a.removeAttribute("aria-current"));
  if (name === "case") {
    const c = DATA.cases.find((x) => x.id === id);
    c ? article(c, depth) : home();
  } else if (name === "projects" || name === "background") {
    anchor = background(id);
    active = "#/projects";
  } else if (name === "profile") {
    anchor = profile(id);
    active = "#/profile";
  } else if (name === "abiogenesis") {
    about();
    active = "";
  } else if (name === "deck") {
    const d = DECKS.find((d) => d.id === id);
    d ? deckReader(d, depth) : home();
    active = "";
  } else if (name === "topic" || name === "topics") {
    let topic;
    try {
      topic = id ? decodeURIComponent(id) : undefined;
    } catch {
      topic = id;
    }
    topics(topic);
    active = "";
  } else home();
  if (active)
    $(`.topbar nav a[href="${active}"]`)?.setAttribute("aria-current", "page");
  window.scrollTo({ top: 0, behavior: "instant" });
  main.focus({ preventScroll: true });
  if (anchor)
    requestAnimationFrame(() => anchor.scrollIntoView({ block: "start" }));
}
export { route };
