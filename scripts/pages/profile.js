// Layout and interactions for the profile view. Text lives in content/.
import { DATA } from "../data.js";
import { main, $, esc, asset, html } from "../utils.js";
import { external, tags, download } from "../components.js";
function orgHeading(e, name) {
  return html`<div class="org-heading">
    ${e.logo ? html`<a class="org-logo" href="${esc(e.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(name)} website"><img src="${asset(e.logo)}" alt="" loading="lazy" /></a>` : ""}
    <div>
      ${e.url ? external(e.url, name, "org-name") : html`<span class="org-name">${esc(name)}</span>`}
    </div>
  </div>`;
}

function timelineRow(e) {
  return html`<section class="cv-entry" id="cv-${e.id}">
    <p class="cv-date">${esc(e.dates)}</p>
    <div>
      ${orgHeading(e, e.place)}
      <h3>${esc(e.title)}</h3>
      ${e.body.map((x) => html`<p>${esc(x)}</p>`).join("")}${e.lesson ? html`<p class="cv-lesson"><span>What I took away</span>${esc(e.lesson)}</p>` : ""}${tags(e.tags)}
      <div class="record-links">
        ${e.case ? html`<a href="#/case/${e.case}/summary">Case study ↗</a>` : ""}
      </div>
    </div>
  </section>`;
}

function profile(target) {
  document.title = "Abhay Bhat — Profile";
  main.innerHTML = html`<header class="profile-head">
      <p class="eyebrow">Profile / Curriculum vitae</p>
      <h1>Abhay Bhat</h1>
      <p>${esc(DATA.profile.intro)}</p>
      <div class="contact-links">
        ${external(DATA.contact.linkedin, "LinkedIn")}<a
          href="mailto:${DATA.contact.email}"
          >${esc(DATA.contact.email)} ↗</a
        >${download(DATA.contact.resume, "Résumé PDF")}
      </div>
      <nav class="profile-nav" aria-label="Profile sections">
        <a href="#education" data-jump="education">Education</a
        ><a href="#experience" data-jump="experience">Experience</a
        ><a href="#publications" data-jump="publications">Publications</a>
      </nav>
    </header>
    <section class="cv-section" id="education">
      <h2>Education</h2>
      ${DATA.profile.education
        .map(
          (e) =>
            html`<div class="cv-entry">
              <p class="cv-date">${esc(e.dates)}</p>
              <div>
                ${orgHeading(e, e.name)}
                <h3>${esc(e.qualification)}</h3>
                <p>${esc(e.detail)}</p>
                ${
                  e.courses.length
                    ? html`<details class="courses">
                        <summary>Coursework</summary>
                        <ul>
                          ${e.courses.map((c) => html`<li>${esc(c)}</li>`).join("")}
                        </ul>
                      </details>`
                    : ""
                }
              </div>
            </div>`,
        )
        .join("")}
    </section>
    <section class="cv-section" id="experience">
      <h2>Experience</h2>
      ${DATA.profile.timeline.map(timelineRow).join("")}
    </section>
    <section class="cv-section" id="publications">
      <h2>Publications & research contributions</h2>
      <p class="cv-intro">
        My part in each collaboration is listed with the paper.
      </p>
      ${DATA.profile.publications
        .map(
          (p) =>
            html`<div class="publication">
              <p class="eyebrow">${esc(p.credit)}</p>
              <h3>${external(p.url, p.title)}</h3>
              <p>
                ${esc(p.description)}${p.projectLink ? html`<a href="${esc(p.projectLink.url)}">${esc(p.projectLink.label)}</a>${esc(p.descriptionAfterLink)}` : ""}
              </p>
            </div>`,
        )
        .join("")}
    </section>`;
  document.querySelectorAll("[data-jump]").forEach((a) =>
    a.addEventListener("click", (e) => {
      e.preventDefault();
      $("#" + a.dataset.jump).scrollIntoView({ block: "start" });
    }),
  );
  return target ? $("#cv-" + target) : null;
}

export { profile };
