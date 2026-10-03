# Editing your portfolio

## The four pieces

**HTML** gives the page its structure. **CSS** controls how it looks. **JavaScript** renders pages and handles interactions. **JSON** stores your writing and records so you can edit content without touching page layouts.

When someone opens the site:

1. `index.html` creates the header, footer and empty main area, and loads the stylesheets.
2. `scripts/main.js` starts the controls and navigation.
3. `scripts/data.js` reads the files in `content/`.
4. `scripts/router.js` reads the URL after `#` and chooses a file in `scripts/pages/` to render the main area.
5. Those page files use shared components and your JSON content.

The `#/case/chemomicrobiome/story` URL means “open the ChemoMicrobiome case, full-story depth.” These hash routes let GitHub Pages handle navigation without special server configuration. Pages are separate source modules while sharing one HTML shell.

## Your first edit: change the homepage introduction

Open `content/site.json`. Find the `intro` field inside `site`. Replace just the text between quotation marks, save, and refresh your local preview.

JSON uses double quotes, arrays (`[...]`) and objects (`{...}`). Keep commas between entries, but no comma after the final entry. To put a quotation mark inside a string, write `\"`. Your editor should flag syntax errors.

## Edit a case study

Each case has its own file in `content/cases/`.

| Field                                         | Where it appears                                                |
| --------------------------------------------- | --------------------------------------------------------------- |
| `title`                                       | Homepage title and case-study heading                           |
| `name`                                        | Project name and reading-footer link                            |
| `deck`                                        | Brief description below the heading                             |
| `tags`                                        | Clickable topic connections                                     |
| `role`, `team`, `advisor`                     | Contribution and credits                                        |
| `short`, `contribution`, `result`, `takeaway` | The short version                                               |
| `sections`                                    | Full-story headings, paragraphs and source references           |
| `technical`                                   | Technical-detail sections for cases without a code walkthrough  |
| `walkthrough`                                 | MoietyMapper's code stages, comparison and benchmark discussion |
| `sources`                                     | The numbered source list                                        |
| `images`                                      | Project figures, captions and where they appear                 |
| `repository`                                  | Repository link and access wording, if applicable               |

An image's `after` number identifies the full-story section it follows, starting at **0**. A section's `refs: [1, 3]` links to source numbers 1 and 3. Source numbering starts at **1**, so check these references if you reorder the source list.

To add a case, copy the most similar JSON file, change its `id` to a unique value, update its content, then add its filename to `content/cases/index.json`. The order of that filename list sets the homepage order. Use a simple lowercase ID such as `new-project`; it becomes part of the URL.

## Add a project or update your CV

`content/projects.json` is an array of project records. Copy an existing entry and change its fields. Use a unique `id`. This adds it to Projects without creating a full case study.

`content/profile.json` separates `education`, `timeline` and `publications`. Berkeley coursework projects belong in the project collection; professional positions belong in the experience timeline. Add PES courses to the PES education entry's `courses` array when you have your transcript.

Publications are also editable here; their text is no longer embedded in JavaScript. Each has a `credit`, `title`, `url` and `description`. A publication can optionally include a `projectLink` and the text that follows it in `descriptionAfterLink`.

## Connect a topic

Add exactly the same tag spelling to related case studies, projects or experience entries:

```json
"tags": ["Oncology", "Customer discovery"]
```

The topic index and connected-entry pages update automatically. Capitalisation matters: `Oncology` and `oncology` are different topics.

## Add an image, poster or deck

Put images in `assets/figures/`, logos in `assets/logos/`, slide images in `assets/slides/`, and PDFs in `assets/downloads/`.

Use complete **website-relative paths** in content files:

```json
"file": "assets/figures/my-experiment.webp"
```

Do not start the path with `/`: that would point at the domain root and can break a project repository's URL. Match filenames and capitalisation exactly. Prefer lowercase names without spaces.

For a presentation, copy an entry in `content/presentations.json`, give it a unique `id`, and set its `case` to the associated case-study ID. Update its `title`, `date`, ordered `pages` array and `download` path. Every slide image is a real file; the PDF is the complete downloadable deck. A matching `case` makes the presentation appear under that case's technical depth. A project record can also link to it using its `deck` field.

Replace the résumé PDF in `assets/downloads/` and update `contact.resume` in `content/site.json` if the filename changes.

## Change the design

Styles are loaded in the order shown in `index.html`. Later rules can override earlier ones.

| Stylesheet       | Purpose                                                            |
| ---------------- | ------------------------------------------------------------------ |
| `fonts.css`      | Font files and weights                                             |
| `base.css`       | Dark/light colour variables, font families and global defaults     |
| `components.css` | Shared shell, navigation and sun/moon animation                    |
| `pages.css`      | Individual page layouts and their components                       |
| `responsive.css` | Media queries, reduced-motion support and final sizing refinements |

For colours, edit the variables near the top of `base.css`: `:root` is dark mode and `:root[data-theme="light"]` is light mode. `--bg` is the page background, `--fg` the text, and `--accent` the link/accent colour.

For font sizes, search the stylesheets for the element's CSS class. The final smaller-size adjustments are in `responsive.css`; edit those if an earlier change has no visible effect. Browser developer tools (**Inspect**) show which rule is taking effect.

The tiny sun/moon artwork is SVG in `index.html`. CSS in `components.css` animates its orbit and colours when the page's `data-theme` changes. `scripts/theme.js` handles the click and remembers the choice. The small script in the HTML head restores the saved theme early to avoid a flash of the wrong background.

## Read the JavaScript when you want to change behaviour

Start with `scripts/pages/home.js`, then `scripts/router.js`. Each page exports a render function; that function puts HTML into the shared `main` area and attaches page-specific listeners.

`components.js` avoids repeating the same topic chip, team-credit, figure or presentation-card code across pages. `utils.js` provides DOM selection (`$`), text escaping (`esc`), asset URL resolution (`asset`) and a small `html` template helper. `html` makes the HTML inside JavaScript readable to editors; it does not render a component framework. Keep using `esc()` for text inserted into markup.

For example, a template such as `html` followed by a backtick-delimited `<h1>${esc(title)}</h1>` inserts the title into a heading. Layout changes belong here; changing the title itself belongs in JSON.

## Before pushing a change

Open the affected page in your local preview. Check a narrow browser window, both themes, the topic links and any image or PDF you changed. Then commit and push through GitHub Desktop.

If the site shows its loading-error message, first check JSON syntax and missing files. If an image is missing, check its path and filename case. If a style change does not appear, refresh without cache (**Ctrl+Shift+R** on Windows/Linux, **Cmd+Shift+R** on Mac).

There is no separate notes section. The original Abiogenesis essay remains exactly as supplied. No additional authored notes were introduced by this reorganisation.
