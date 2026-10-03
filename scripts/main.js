// Start the site: shared controls first, then content and navigation.
import { main, $ } from "./utils.js";
import { initTheme } from "./theme.js";
initTheme();
$("#close-figure").addEventListener("click", () => $("#figure-dialog").close());
$("#figure-dialog").addEventListener("click", (event) => {
  if (event.target === $("#figure-dialog")) $("#figure-dialog").close();
});
document.querySelector(".skip").addEventListener("click", (event) => {
  event.preventDefault();
  main.focus();
  main.scrollIntoView({ block: "start" });
});
try {
  const { route } = await import("./router.js");
  window.addEventListener("hashchange", route);
  route();
} catch (error) {
  console.error(error);
  const heading = document.createElement("h1");
  heading.textContent = "The page could not load.";
  const explanation = document.createElement("p");
  explanation.textContent =
    location.protocol === "file:"
      ? "Preview this folder with a local server (instructions in README.md), rather than opening index.html directly."
      : "Please refresh. If this persists, check that the content and scripts folders were uploaded with index.html.";
  main.replaceChildren(heading, explanation);
}
