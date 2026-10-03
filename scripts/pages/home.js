// Layout and interactions for the home view. Text lives in content/.
import { DATA } from "../data.js";
import { main, esc, asset, html } from "../utils.js";
import { caseRow } from "../components.js";
function home() {
  main.innerHTML = html`<div class="home-hero">
      <section class="intro">
        <p class="eyebrow">Abhay Bhat</p>
        <h1>Abiogenesis<span class="title-dot">.</span></h1>
        <p class="intro-copy">${esc(DATA.site.intro)}</p>
        <a class="text-link" href="#/abiogenesis">Why Abiogenesis? ↗</a>
        <div class="framing">
          ${DATA.site.framing.map((x) => html`<span>${esc(x)}</span>`).join("")}
        </div>
      </section>
      <figure class="hero-science">
        <a href="#/projects/biomems" aria-label="Explore the BioMEMS project"
          ><img
            src="${asset("assets/figures/droplets.webp")}"
            alt="Microscopy image from our BioMEMS project: circular droplets of different sizes in a pale fluid."
        /></a>
        <figcaption>
          <span>From the lab / Berkeley BioMEMS</span
          ><a href="#/projects/biomems">Inside the droplet experiments ↗</a>
        </figcaption>
      </figure>
    </div>
    <section id="case-index" aria-labelledby="case-heading">
      <div class="index-heading">
        <h2 id="case-heading">Case studies</h2>
        <a href="#/topics">Follow a topic ↗</a>
      </div>
      <div class="case-index">${DATA.cases.map(caseRow).join("")}</div>
    </section>
    <div class="lower-home project-home-links">
      <a href="#/projects"
        ><p class="eyebrow">Projects</p>
        <h2>The full project collection. ↗</h2></a
      ><a href="#/profile"
        ><p class="eyebrow">Profile</p>
        <h2>The people and places along the way. ↗</h2></a
      >
    </div>`;
}

export { home };
