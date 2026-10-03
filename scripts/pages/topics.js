// Layout and interactions for the topics view. Text lives in content/.
import { DATA } from "../data.js";
import { main, esc, html } from "../utils.js";
import { tags, caseRow } from "../components.js";
function topicItems(topic) {
  return {
    cases: DATA.cases.filter((c) => c.tags.includes(topic)),
    records: DATA.archive.filter((c) => c.tags.includes(topic)),
    experience: DATA.profile.timeline.filter((e) => e.tags.includes(topic)),
  };
}

function topics(topic) {
  document.title = (topic || "Topics") + " — Abiogenesis";
  const all = [
    ...new Set([
      ...DATA.cases.flatMap((c) => c.tags),
      ...DATA.archive.flatMap((a) => a.tags),
      ...DATA.profile.timeline.flatMap((e) => e.tags),
    ]),
  ].sort();
  main.innerHTML = html`<a class="back" href="#/">← Home</a>
    <header class="essay-head">
      <p class="eyebrow">Connections</p>
      <h1>${esc(topic || "Follow a topic.")}</h1>
      <p>
        ${topic ? "Case studies and projects connected to this topic." : "A different way through the same collection."}
      </p>
    </header>`;
  if (!topic) {
    main.innerHTML += html`<div class="topic-index">
      ${all
        .map((t) => {
          const m = topicItems(t),
            count = m.cases.length + m.records.length + m.experience.length;
          return html`<a href="#/topic/${encodeURIComponent(t)}"
            ><span>${esc(t)}</span><small>${count} entries ↗</small></a
          >`;
        })
        .join("")}
    </div>`;
    return;
  }
  const m = topicItems(topic);
  if (!all.includes(topic)) {
    main.innerHTML += "<p>No entries for this topic yet.</p>";
    return;
  }
  if (m.cases.length)
    main.innerHTML += html`<section class="topic-section">
      <h2 class="section-label">Case studies</h2>
      ${m.cases.map(caseRow).join("")}
    </section>`;
  if (m.records.length)
    main.innerHTML += html`<section class="topic-section">
      <h2 class="section-label">Projects</h2>
      ${m.records
        .map(
          (a) =>
            html`<article class="topic-record">
              <a href="#/projects/${a.id}">${esc(a.name)} ↗</a>
              <p>${esc(a.kind)}</p>
            </article>`,
        )
        .join("")}
    </section>`;
  if (m.experience.length)
    main.innerHTML += html`<section class="topic-section">
      <h2 class="section-label">In the profile</h2>
      <ul class="topic-profile">
        ${m.experience.map((e) => html`<li><a href="#/profile/${e.id}">${esc(e.place)}</a><span>${esc(e.dates)}</span></li>`).join("")}
      </ul>
    </section>`;
  const related = [
    ...new Set([
      ...m.cases.flatMap((c) => c.tags),
      ...m.records.flatMap((c) => c.tags),
    ]),
  ].filter((t) => t !== topic);
  main.innerHTML += html`<section class="related">
    <h2>Related topics</h2>
    ${tags(related)}<a class="text-link" href="#/topics">All topics ↗</a>
  </section>`;
}

export { topics };
