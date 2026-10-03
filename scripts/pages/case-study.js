// Layout and interactions for the case-study view. Text lives in content/.
import { DATA, DECKS, ICORPS_TIMELINE } from "../data.js";
import { main, $, esc, html } from "../utils.js";
import {
  external,
  tags,
  team,
  deckLink,
  bindTabs,
  refs,
  figure,
  bindFigures,
  deckCollection,
  repository,
} from "../components.js";
let currentDepth = "summary";

function sourceBox() {
  return html`<section class="source-note">
    <p class="eyebrow">The presentations, in sequence / 2025</p>
    <div class="timeline-tabs" role="tablist" aria-label="Presentation date">
      ${ICORPS_TIMELINE.map((x, i) => html`<button role="tab" id="date-${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" aria-controls="timeline-panel" data-date="${i}">${x.date}</button>`).join("")}
    </div>
    <div
      id="timeline-panel"
      class="timeline-panel"
      role="tabpanel"
      aria-labelledby="date-0"
      tabindex="0"
    ></div>
  </section>`;
}

function setDate(i) {
  const x = ICORPS_TIMELINE[i];
  document.querySelectorAll("[data-date]").forEach((b, n) => {
    b.setAttribute("aria-selected", n === i);
    b.tabIndex = n === i ? 0 : -1;
  });
  const panel = $("#timeline-panel");
  panel.setAttribute("aria-labelledby", "date-" + i);
  panel.innerHTML = html`<p class="count">${x.count}</p>
    <h3>${x.title}</h3>
    <p>${x.body}</p>
    ${deckLink(x.deck)}`;
}

function bindTimeline() {
  setDate(0);
  document
    .querySelectorAll("[data-date]")
    .forEach((b) =>
      b.addEventListener("click", () => setDate(+b.dataset.date)),
    );
  bindTabs(".timeline-tabs", (i) => setDate(i));
}

function moietyWalkthrough(c) {
  const w = c.walkthrough;
  return html`<h2>What the code does</h2>
    <p>${esc(w.intro)}</p>
    <pre class="code-example"><code>${esc(w.entry)}</code></pre>
    <p class="code-caption">
      The entry point in the supplied repository. Set reaction_smiles to the
      reaction you want to map.
    </p>
    ${w.steps
      .map(
        (x) =>
          html`<section class="code-stage">
            <h3>${esc(x.title)}</h3>
            <p class="code-file"><code>${esc(x.file)}</code></p>
            <p>${esc(x.what)}</p>
            <p class="code-purpose">
              <strong>Why it matters.</strong> ${esc(x.why)}
            </p>
          </section>`,
      )
      .join("")}${refs([1, 2])}
    <section>
      <h2>How the approaches compare</h2>
      <div
        class="comparison-scroll"
        role="region"
        aria-label="Atom-mapping methods comparison"
        tabindex="0"
      >
        <table class="method-comparison">
          <thead>
            <tr>
              <th scope="col">Method</th>
              <th scope="col">Approach</th>
              <th scope="col">Useful for</th>
              <th scope="col">What to keep in mind</th>
            </tr>
          </thead>
          <tbody>
            ${w.comparison
              .map(
                (x) =>
                  html`<tr>
                    <th scope="row">
                      ${esc(x.name)}<button
                        class="table-source"
                        data-source="${x.source}"
                        aria-label="Read source ${x.source}"
                      >
                        [${x.source}]
                      </button>
                    </th>
                    <td>${esc(x.approach)}</td>
                    <td>${esc(x.use)}</td>
                    <td>${esc(x.limit)}</td>
                  </tr>`,
              )
              .join("")}
          </tbody>
        </table>
      </div>
      <h3>The capstone’s benchmark</h3>
      ${w.benchmark.map((p) => html`<p>${esc(p)}</p>`).join("")}${refs([3])}
      <h3>Where the field is now / 2026</h3>
      ${w.current.map((p) => html`<p>${esc(p)}</p>`).join("")}${refs([6])}
    </section>`;
}

function article(c, depth) {
  currentDepth = ["summary", "story", "detail"].includes(depth)
    ? depth
    : "summary";
  document.title = `${c.title} — Abiogenesis`;
  main.innerHTML = html`<a class="back" href="#/">← Case studies</a>
    <header class="article-head">
      <p class="eyebrow">${c.number} / ${esc(c.context)}</p>
      <h1>${esc(c.title)}</h1>
      <p class="deck">${esc(c.deck)}</p>
      ${tags(c.tags)}
      <p class="article-role">${esc(c.role)}</p>
      ${team(c)}${c.award ? html`<p class="award">✳ ${esc(c.award)}</p>` : ""}
    </header>
    <div class="depths" role="tablist" aria-label="Reading depth">
      ${[
        ["summary", "The short version", "30 seconds"],
        ["story", "The full story", "5 minutes"],
        ["detail", "Under the hood", "Technical detail + slides"],
      ]
        .map(
          ([id, label, time]) =>
            html`<button
              id="depth-${id}"
              role="tab"
              data-depth="${id}"
              aria-selected="${id === currentDepth}"
              tabindex="${id === currentDepth ? 0 : -1}"
              aria-controls="reading-panel"
            >
              ${label}<small>${time}</small>
            </button>`,
        )
        .join("")}
    </div>
    <div class="case-body">
      <aside class="case-aside">
        <p class="eyebrow">${esc(c.status)}</p>
        ${
          currentDepth === "story"
            ? html`<ol>
                ${c.sections.map((s, i) => html`<li><a href="#section-${i}" data-section="${i}">${esc(s.title)}</a></li>`).join("")}
              </ol>`
            : html`<p>
                What I tried.<br />What changed my mind.<br />What I’d do
                differently.
              </p>`
        }${DECKS.some((d) => d.case === c.id) ? '<button class="aside-link" data-slides>Full presentations ↗</button>' : ""}
      </aside>
      <div
        class="prose"
        id="reading-panel"
        role="tabpanel"
        aria-labelledby="depth-${currentDepth}"
        tabindex="0"
      ></div>
    </div>`;
  const panel = $("#reading-panel");
  if (currentDepth === "summary")
    panel.innerHTML = html`<p class="lead">${esc(c.short)}</p>
      ${c.scope ? html`<p class="scope">${esc(c.scope)}</p>` : ""}
      <section class="summary-block">
        <h2>My contribution</h2>
        <p>${esc(c.contribution)}</p>
      </section>
      <section class="summary-block">
        <h2>Where we got to</h2>
        <p>${esc(c.result)}</p>
      </section>
      <div class="pull">
        <span class="eyebrow">What stays with me</span>
        <p>${esc(c.takeaway)}</p>
      </div>
      <button class="continue" data-read="story">
        Read the full story ↗
      </button>`;
  if (currentDepth === "story")
    panel.innerHTML = html`${c.scope ? html`<p class="scope">${esc(c.scope)}</p>` : ""}${c.id === "chemomicrobiome" ? sourceBox() : ""}${c.sections
        .map(
          (s, i) =>
            html`<section id="section-${i}">
              <h2>${esc(s.title)}</h2>
              ${s.body.map((p) => html`<p>${esc(p)}</p>`).join("")}${refs(s.refs)}${c.images.map((img, j) => (img.after === i ? figure(c, img, j) : "")).join("")}
            </section>`,
        )
        .join("")}<button class="continue" data-read="detail">
        Open the technical detail ↗
      </button>`;
  if (currentDepth === "detail")
    panel.innerHTML = html`${
        c.walkthrough
          ? moietyWalkthrough(c)
          : html`<h2>Technical detail</h2>
              <p class="interpretation">
                The source records, unresolved questions and experiments I would
                run next.
              </p>
              ${c.technical
                .map(
                  (x, i) =>
                    html`<details ${i === 0 ? "open" : ""}>
                      <summary>${esc(x.title)}</summary>
                      <p>${esc(x.body)}</p>
                    </details>`,
                )
                .join("")}`
      }${repository(c)}
      <div id="presentations">${deckCollection(c.id)}</div>
      <h2>From the project files</h2>
      ${c.images.map((img, j) => figure(c, img, j)).join("")}
      <h2 id="sources-heading">Sources</h2>
      <ol class="source-list">
        ${c.sources
          .map(
            (s, i) =>
              html`<li id="source-${i + 1}" tabindex="-1">
                <strong>${esc(s.label)}</strong>
                <p>${esc(s.detail)}</p>
                ${s.url ? external(s.url, "Read source", "text-link") : ""}
              </li>`,
          )
          .join("")}
      </ol>
      <p class="provenance">
        Figures and presentations come from team project materials. Interview
        accounts are paraphrased. Retrospective interpretations and proposed
        experiments are identified in the text.
      </p>`;
  const next = DATA.cases[(DATA.cases.indexOf(c) + 1) % DATA.cases.length];
  panel.innerHTML += html`<div class="reading-footer">
    <a href="#/projects">All projects ↗</a
    ><a href="#/case/${next.id}/summary">Next: ${esc(next.name)} ↗</a>
  </div>`;
  if (currentDepth === "story" && c.id === "chemomicrobiome") bindTimeline();
  document
    .querySelectorAll("[data-depth],[data-read]")
    .forEach((b) =>
      b.addEventListener("click", () =>
        changeDepth(c, b.dataset.depth || b.dataset.read),
      ),
    );
  document.querySelectorAll("[data-source]").forEach((b) =>
    b.addEventListener("click", () => {
      const n = b.dataset.source;
      changeDepth(c, "detail");
      requestAnimationFrame(() => {
        $("#source-" + n)?.focus();
        $("#source-" + n)?.scrollIntoView({ block: "center" });
      });
    }),
  );
  document.querySelectorAll("[data-section]").forEach((b) =>
    b.addEventListener("click", (e) => {
      e.preventDefault();
      $("#section-" + b.dataset.section)?.scrollIntoView({ block: "start" });
    }),
  );
  $("[data-slides]")?.addEventListener("click", () => {
    changeDepth(c, "detail");
    $("#presentations").scrollIntoView({ block: "start" });
  });
  bindTabs(".depths", (i, b) => changeDepth(c, b.dataset.depth, true));
  bindFigures();
}

function changeDepth(c, depth, focus = false) {
  history.replaceState(null, "", `#/case/${c.id}/${depth}`);
  article(c, depth);
  if (focus) $("#depth-" + depth).focus();
  $(".depths").scrollIntoView({ block: "start", behavior: "instant" });
}

export { article };
