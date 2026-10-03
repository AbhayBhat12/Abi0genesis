// The SVG artwork is in index.html; the motion and colours are in styles/components.css.
import { $ } from "./utils.js";
function syncThemeButton() {
  const dark = document.documentElement.dataset.theme === "dark";
  $("#theme-toggle").setAttribute(
    "aria-label",
    `${dark ? "Light" : "Dark"} mode`,
  );
  $("#theme-toggle").title = `${dark ? "Light" : "Dark"} mode`;
  document.querySelector("meta[name=theme-color]").content = dark
    ? "#0b122b"
    : "#faf9f4";
}
export function initTheme() {
  $("#theme-toggle").addEventListener("click", () => {
    const value =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = value;
    try {
      localStorage.setItem("abiogenesis-theme", value);
    } catch {}
    syncThemeButton();
  });
  syncThemeButton();
}
