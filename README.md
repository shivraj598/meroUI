# meroUI

A modern, fully open-sourced UI library for **Next.js 16** and **React 19**.

Black by default. Type-safe, accessible, and zero-config. Use the components
freely for free. You only pay if you want a private, premium, complete web
design and development build.

**Live site:** [https://meroui.shivraj.me](https://meroui.shivraj.me)

---

## What is meroUI?

meroUI is a hand-built component library and docs site with a strict
monochrome design system — canvas, ink, and one zinc ramp. Every component
ships as a single source file you copy into your project and fully own: no
runtime dependencies, no config, no lock-in.

The site itself is built entirely from meroUI's own components — the hero, the
docs shell, the templates gallery. If it's on the page, it's from the library.

---

## Features

- **Ship faster** — drop-in components for the Next.js + React stack. Copy one file, keep full ownership.
- **Zero dependencies** — no runtime deps. Lean bundles, quiet `npm audit`.
- **Dark by default** — a black-and-white system built for dark UIs. Contrast that survives real-world screens.
- **Accessible** — keyboard-first, screen-reader-ready. AA+ on every surface.
- **Tested** — unit-tested and prod-verified. If it ships in meroUI, it ships.
- **MIT licensed** — use it in side projects, client work, and commercial products. No attribution needed.
- **Interactive landing** — a draggable 3D component ring, live component demos, and a real package-manager install terminal with live typing.
- **Docs shell** — collapsible sidebar with search, animated active-pill nav, copyable install/usage snippets, and a props table per component.
- **Templates** — whole pages assembled from meroUI primitives: landing page, docs site, and component gallery.

---

## Components

Twelve components across three groups, each with live preview, usage snippet,
and full props documentation on its own page (`/docs/components`):

### Feedback

| Component | Purpose |
| --------- | ------- |
| Button    | Solid, ghost, quiet. Three weights for any action. |
| Badge     | Solid, outline, or dot with an optional live pulse. |
| Progress  | Accessible progressbar with a mono label and value. |
| Skeleton  | Quiet placeholders while data streams in. |
| Toast     | Transient feedback, stacked and auto-dismissing. |

### Controls

| Component | Purpose |
| --------- | ------- |
| Input     | Labeled text field, keyboard-first and autofill-aware. |
| Toggle    | Switch with a visible checked state and focus ring. |
| Tabs      | Tablist with an animated underline, pure keyboard. |

### Display

| Component | Purpose |
| --------- | ------- |
| Card      | A hairline-bordered surface for grouped content. |
| Table     | Dense data rows with sticky headers and mono cells. |
| Modal     | Focus-trapped dialog with escape and backdrop. |
| Tooltip   | Hover and focus-triggered inline annotation. |

---

## Tech stack

| Layer     | Choice                          |
| --------- | ------------------------------- |
| Framework | Next.js 16 (App Router, Turbopack) |
| UI        | React 19, TypeScript 5          |
| Styling   | Tailwind CSS v4, custom monochrome design tokens |
| Animation | GSAP + ScrollTrigger            |
| Hosting   | Cloudflare Workers + Workers Assets via OpenNext |

---

## Getting started

```bash
# install
npm install

# run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

```bash
# production build + preview
npm run build
npm run start

# lint / typecheck
npm run lint
npx tsc --noEmit
```

---

## Deployment

The site runs on **Cloudflare Workers** (via the `@opennextjs/cloudflare`
adapter). Deploying from this repo:

```bash
npm run cf-build     # build Next.js + transform for the Workers runtime
npm run cf-preview   # serve the production build locally (workerd, port 8787)
npm run cf-deploy    # deploy worker + assets
```

Auto-deploys are wired up through **Workers Builds** (Cloudflare's Git
integration): every push to `main` builds and deploys automatically — no CI
pipeline to maintain. Rollbacks are available from the Workers dashboard's
Deployments tab.

---

## About the developer

Built by **Shivraj Timilsena** — a developer in Kathmandu, Nepal who designs
and ships monochrome, motion-led interfaces. meroUI is his open-source
component library; premium private web design and development builds are his
paid work.

- GitHub: [shivraj598](https://github.com/shivraj598)
- Live site: [https://meroui.shivraj.me](https://meroui.shivraj.me)

---

## License

Open-source components are free to use. Premium private web design &
development builds are paid work.
