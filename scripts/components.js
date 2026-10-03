// Reusable links, topic chips, figures, tabs and presentation cards.
import { DATA, DECKS } from "./data.js";
import { $, esc, asset, html } from "./utils.js";
const external = (url, label, cls = "") =>
  html`<a
    class="${cls}"
    href="${esc(url)}"
    ${url.startsWith("#") ? "" : 'target="_blank" rel="noopener noreferrer"'}
    >${esc(label)} <span aria-hidden="true">↗</span></a
  >`;
const tagLink = (t) =>
  html`<a class="tag" href="#/topic/${encodeURIComponent(t)}">${esc(t)}</a>`;
const tags = (items) =>
  html`<div class="tags">${(items || []).map(tagLink).join("")}</div>`;
const links = (items) =>
  (items || []).map((x) => external(x.url, x.label, "text-link")).join("");
const team = (c) =>
  c.team?.length
    ? html`<p class="team">
        <strong>${esc(c.teamLabel || "Team")}:</strong>
        ${c.team.map(esc).join(", ")}${c.advisor ? html`<br /><strong>Advisor:</strong> ${esc(c.advisor)}` : ""}
      </p>`
    : "";
const download = (file, label) =>
  html`<a
    href="${asset(file)}"
    download="${esc(file.split("/").pop())}"
    class="text-link"
    >${esc(label)} <span aria-hidden="true">↓</span></a
  >`;
const deckLink = (id) =>
  html`<a href="#/deck/${id}" class="text-link"
    >Open the full presentation ↗</a
  >`;

function bindTabs(selector, action) {
  const list = $(selector);
  if (!list) return;
  list.addEventListener("keydown", (e) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
    const items = [...list.querySelectorAll("[role=tab]")];
    let i = items.indexOf(document.activeElement);
    if (i < 0) return;
    e.preventDefault();
    i =
      e.key === "Home"
        ? 0
        : e.key === "End"
          ? items.length - 1
          : (i + (e.key === "ArrowRight" ? 1 : -1) + items.length) %
            items.length;
    action(i, items[i]);
    list.isConnected && items[i].focus();
  });
}

function refs(ids) {
  return ids?.length
    ? html`<div class="section-refs">
        Sources
        ${ids.map((n) => html`<button data-source="${n}" aria-label="Read source ${n}">[${n}]</button>`).join(" ")}
      </div>`
    : "";
}

function figure(c, img, index) {
  return html`<figure class="source-figure">
    <button
      class="image-button"
      data-figure="${index}"
      data-case="${c.id}"
      aria-label="Enlarge: ${esc(img.label)}"
    >
      <img src="${asset(img.file)}" alt="${esc(img.alt)}" loading="lazy" /><span
        class="enlarge"
        >View figure ↗</span
      >
    </button>
    <figcaption>
      <strong>${esc(img.label)}</strong>${esc(img.caption)}
    </figcaption>
  </figure>`;
}

function openImage(file, title, caption = "") {
  $("#dialog-title").textContent = title;
  $("#dialog-image").src = asset(file);
  $("#dialog-image").alt = title;
  $("#dialog-caption").textContent = caption;
  $("#figure-dialog").showModal();
}

function bindFigures() {
  document.querySelectorAll("[data-figure]").forEach((b) =>
    b.addEventListener("click", () => {
      const c = DATA.cases.find((c) => c.id === b.dataset.case),
        img = c.images[+b.dataset.figure];
      openImage(img.file, img.label, img.caption);
    }),
  );
}

function caseRow(c) {
  return html`<article class="case-row">
    <a
      class="case-visual"
      href="#/case/${c.id}/summary"
      tabindex="-1"
      aria-hidden="true"
      ><img src="${asset(c.images[0].file)}" alt="" loading="lazy"
    /></a>
    <div class="case-label">
      <p class="eyebrow">${c.number} / ${esc(c.indexLabel)}</p>
      <h2><a href="#/case/${c.id}/summary">${esc(c.title)}</a></h2>
      ${tags(c.tags)}${c.award ? html`<p class="award-small">${esc(c.award)}</p>` : ""}
    </div>
  </article>`;
}

function deckCollection(caseId) {
  const decks = DECKS.filter((d) => d.case === caseId);
  if (!decks.length) return "";
  return html`<section class="deck-collection">
    <h2>Presentations & posters</h2>
    <p class="small muted">Read every slide, or download the complete PDF.</p>
    <div class="deck-list">
      ${decks
        .map(
          (d) =>
            html`<a href="#/deck/${d.id}"
              ><img
                src="${asset(d.pages[Math.min(1, d.pages.length - 1)])}"
                alt=""
                loading="lazy"
              /><span
                ><small
                  >${esc(d.date)} / ${d.pages.length}
                  ${d.pages.length === 1 ? "page" : "slides"}</small
                ><strong>${esc(d.title)} ↗</strong></span
              ></a
            >`,
        )
        .join("")}
    </div>
  </section>`;
}

function repository(c) {
  return c.repository
    ? html`<div class="repository">
        <p class="eyebrow">Code / Private repository</p>
        ${external(c.repository.url, "MoietyMapper on GitHub", "text-link")}
        <p>
          ${esc(c.repository.access || "The repository is private. Email me to request access.")}
        </p>
        <a
          class="text-link"
          href="mailto:${DATA.contact.email}?subject=MoietyMapper%20access%20request"
          >Request access ↗</a
        >
      </div>`
    : "";
}
export {
  external,
  tagLink,
  tags,
  links,
  team,
  download,
  deckLink,
  bindTabs,
  refs,
  figure,
  openImage,
  bindFigures,
  caseRow,
  deckCollection,
  repository,
};
