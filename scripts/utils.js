const main = document.querySelector("main");
const $ = (s) => document.querySelector(s);
const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
// Content paths are relative to the website root, so project URLs also work.
const asset = (file) =>
  file ? new URL("../" + file, import.meta.url).href : "";

// An ordinary template string with a label so editors can format the embedded HTML.
// Values are inserted as supplied; escape user-facing text with esc() at the call site.
const html = (parts, ...values) =>
  parts.reduce(
    (result, part, index) =>
      result + part + (index < values.length ? String(values[index]) : ""),
    "",
  );
export { main, $, esc, asset, html };
