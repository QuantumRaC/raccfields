# raccfields.dev

Personal portfolio of Cynthia Yao. Next.js (App Router), plain CSS, and no UI framework. Every visual is drawn in monospace characters.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (also type-checks)
```

## Where things live

| What | File |
| --- | --- |
| Links, email, résumé, headshot, visibility switches | `src/content/site.ts` |
| Skills (with evidence), course list, coursework themes | `src/content/profile.ts` |
| Home page copy (hero, experience, projects, about, contact) | `src/app/page.tsx` |
| Case studies | `src/app/work/rednote/page.tsx`, `src/app/work/geofm-stf/page.tsx` |
| WriteLike tool | `src/app/projects/writelike/` |
| Blog posts | `content/blog/*.mdx` |
| Design tokens and all styles | `src/app/globals.css` (colours are at the top) |
| ASCII visuals | `src/components/AsciiGlobe.tsx`, `PaymentFlow.tsx`, `FusionViz.tsx`, `SparkPanel.tsx`, `AsciiPortrait.tsx` |

### Switches in `site.ts`

- `resume`: drop a PDF in `public/` and set e.g. `"/cynthia-yao-resume.pdf"`. Résumé buttons appear in the hero and contact sections.
- `headshot`: drop a photo in `public/` and set e.g. `"/headshot.jpg"`. It renders in About as ASCII art that resolves into the photo on hover.
- `showMasters`: shows the planned UNSW Master of IT line under Education.
- `showSeniorProject`: shows the tropical plants benchmark under "Coming next".

## Writing a blog post

Create `content/blog/my-post-slug.mdx`. The **file name is the URL** (`/blog/my-post-slug`).

```md
---
title: "Post title"
date: "2026-12-01"
description: "One or two sentences for the list and link previews."
tags: ["ML", "Remote Sensing"]
draft: true        # optional: only visible in `npm run dev`
---

Markdown body. `##` / `###` headings feed the table of contents.
Fenced code blocks get syntax highlighting when you tag the language (```python).
```

Posts are sorted newest first. The home page shows the latest four, and the RSS feed is at `/blog/rss.xml`.

## Notes

- Old URLs (`/dev`, `/dev/textanlys`, `/security`, old blog slugs) redirect, see `next.config.ts`.
- `src/lib/landmask.ts` is a generated 240×120 bitmask of Natural Earth land used by the globe.
- All animation respects `prefers-reduced-motion`.
