// Layout and interactions for the projects view. Text lives in content/.
import { DATA } from "../data.js";
import { main, $, esc, asset, html } from "../utils.js";
import { tags, links, team, deckLink } from "../components.js";
function recordRow(a) {
  return html`<section class="archive-row" id="record-${a.id}">
    <div>
      <p class="eyebrow">${esc(a.kind)}</p>
      <h2>${esc(a.name)}</h2>
      ${tags(a.tags)}${a.image ? html`<img class="record-image" src="${asset(a.image)}" alt="Microfluidic droplet generator" loading="lazy" />` : ""}
    </div>
    <div>
      <p>${esc(a.text)}</p>
      ${team(a)}
      <div class="record-links">
        ${links(a.links)}${a.deck ? deckLink(a.deck) : ""}
      </div>
    </div>
  </section>`;
}

function background(target) {
  document.title = "Projects — Abiogenesis";
  main.innerHTML = html`<header class="essay-head">
      <p class="eyebrow">Research, software and company building</p>
      <h1>Projects</h1>
      <p>
        The full collection, with case studies for the projects explored in more
        detail.
      </p>
    </header>
    <div class="archive">
      ${DATA.cases
        .map(
          (c) =>
            html`<section class="archive-row" id="record-${c.id}">
              <div>
                <p class="eyebrow">${esc(c.context)}</p>
                <h2>${esc(c.name)}</h2>
                ${tags(c.tags)}
              </div>
              <div>
                <p>${esc(c.short)}</p>
                ${team(c)}
                <div class="record-links">
                  <a href="#/case/${c.id}/summary">Read the case study ↗</a>
                </div>
              </div>
            </section>`,
        )
        .join("")}${DATA.archive.map(recordRow).join("")}
    </div>`;
  return target ? $("#record-" + target) : null;
}

export { background };
