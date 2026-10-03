// Layout and interactions for the abiogenesis view. Text lives in content/.
import { DATA } from "../data.js";
import { main, esc, html } from "../utils.js";
function about() {
  document.title = "Why Abiogenesis? — Abhay Bhat";
  main.innerHTML = html`<a class="back" href="#/">← Home</a>
    <header class="essay-head">
      <p class="eyebrow">About this collection</p>
      <h1>${esc(DATA.about.title)}</h1>
    </header>
    <div class="essay-layout">
      <aside>By Abhay Bhat</aside>
      <article class="prose">
        <p>${esc(DATA.about.intro)}</p>
        <ul class="essay-list">
          ${DATA.about.list.map((x) => html`<li>${esc(x)}</li>`).join("")}
        </ul>
        ${DATA.about.body.map((p) => html`<p>${esc(p)}</p>`).join("")}${DATA.about.sections
          .map(
            (s) =>
              html`<section>
                <h2>${esc(s.title)}</h2>
                ${s.body.map((p) => html`<p>${esc(p)}</p>`).join("")}
              </section>`,
          )
          .join("")}
        <div class="reading-footer">
          <a href="#/profile">About me ↗</a
          ><a href="#/projects">Explore the projects ↗</a>
        </div>
      </article>
    </div>`;
}

export { about };
