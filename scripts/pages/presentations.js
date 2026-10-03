// Layout and interactions for the presentations view. Text lives in content/.

import { main, $, esc, asset, html } from "../utils.js";
import { download, openImage } from "../components.js";
function deckReader(d, requested) {
  let page = Math.max(0, Math.min(d.pages.length - 1, (+requested || 1) - 1));
  document.title = d.title + " — Presentations";
  const back =
    d.case === "biomems"
      ? "#/projects/biomems"
      : d.case === "orforglipron"
        ? "#/projects/orforglipron"
        : `#/case/${d.case}/detail`;
  main.innerHTML = html`<a class="back" href="${back}">← Back to the project</a>
    <header class="reader-head">
      <div>
        <p class="eyebrow">${esc(d.date)} / Complete presentation</p>
        <h1>${esc(d.title)}</h1>
      </div>
      ${download(d.download, "Download full PDF")}
    </header>
    ${d.notice ? html`<p class="reader-notice">${esc(d.notice)}</p>` : ""}
    <section class="slide-reader" aria-label="Presentation viewer">
      <div class="reader-toolbar">
        <button id="slide-prev" aria-label="Previous slide">←</button
        ><label for="slide-select"
          >Slide
          <select id="slide-select" aria-label="Choose slide">
            ${d.pages.map((f, i) => html`<option value="${i}">${i + 1}</option>`).join("")}
          </select>
          of ${d.pages.length}</label
        ><button id="slide-next" aria-label="Next slide">→</button>
      </div>
      <button
        id="slide-image-button"
        class="slide-image-button"
        aria-label="Enlarge current slide"
      >
        <img id="slide-image" alt="" />
      </button>
      <p class="reader-hint">← → to browse · Click the slide to enlarge</p>
      <p class="sr-only" id="slide-status" aria-live="polite"></p>
    </section>`;
  const update = () => {
    const img = $("#slide-image");
    img.src = asset(d.pages[page]);
    img.alt = `${d.title}, slide ${page + 1} of ${d.pages.length}`;
    $("#slide-select").value = page;
    $("#slide-prev").disabled = page === 0;
    $("#slide-next").disabled = page === d.pages.length - 1;
    $("#slide-status").textContent = `Slide ${page + 1} of ${d.pages.length}`;
    history.replaceState(null, "", `#/deck/${d.id}/${page + 1}`);
  };
  const move = (delta) => {
    page = Math.max(0, Math.min(d.pages.length - 1, page + delta));
    update();
  };
  $("#slide-prev").addEventListener("click", () => move(-1));
  $("#slide-next").addEventListener("click", () => move(1));
  $("#slide-select").addEventListener("change", (e) => {
    page = +e.target.value;
    update();
  });
  $("#slide-image-button").addEventListener("click", () =>
    openImage(
      d.pages[page],
      `${d.title} · ${page + 1}/${d.pages.length}`,
      d.notice,
    ),
  );
  main.onkeydown = (e) => {
    if ($("#figure-dialog").open || e.target.tagName === "SELECT") return;
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      move(e.key === "ArrowRight" ? 1 : -1);
    }
  };
  update();
}

export { deckReader };
