// Load text separately from presentation code. Add new cases to content/cases/index.json.
async function readJSON(path) {
  const response = await fetch(new URL("../content/" + path, import.meta.url));
  if (!response.ok)
    throw new Error(`Could not load ${path}: HTTP ${response.status}`);
  return response.json();
}
const [site, caseFiles, projects, profile, about, presentations, timeline] =
  await Promise.all([
    readJSON("site.json"),
    readJSON("cases/index.json"),
    readJSON("projects.json"),
    readJSON("profile.json"),
    readJSON("abiogenesis.json"),
    readJSON("presentations.json"),
    readJSON("icorps-timeline.json"),
  ]);
const cases = await Promise.all(
  caseFiles.map((file) => readJSON("cases/" + file)),
);
export const DATA = { ...site, cases, archive: projects, profile, about };
export const DECKS = presentations;
export const ICORPS_TIMELINE = timeline;
