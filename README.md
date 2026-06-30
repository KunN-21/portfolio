# Vu Khanh Nam - Portfolio

Personal portfolio site. Static, fast, dual-mode.

**Live:** https://kunn-21.github.io/portfolio/

## Stack

- [Astro 7](https://astro.build/) - static site generator
- [React 19](https://react.dev/) - interactive islands (MagneticCTA, ThemeToggle)
- [Tailwind CSS 4](https://tailwindcss.com/) - utility-first styling
- [Motion](https://motion.dev/) - pointer physics for CTAs
- TypeScript strict

## Project structure

```text
src/
├── components/     Astro + React components (Hero, ProjectCard, Skills, ...)
├── data/           Static content (projects.ts)
├── layouts/        Base.astro - HTML shell, fonts, theme flash guard
├── pages/          index.astro - page composition
└── styles/         global.css - Tailwind v4 entrypoint, design tokens
public/             Static assets (favicon, og image)
.github/workflows/  Pages deploy on push to main
```

## Local development

```sh
npm install
npm run dev        # localhost:4321/portfolio
npm run build      # ./dist
npm run preview    # serve ./dist
```

Node 22+ required.

## Deployment

GitHub Pages via `.github/workflows/deploy.yml`. Each push to `main` triggers `npm ci` + `astro build` + upload artifact to Pages. Approx 30-60s per deploy.

Astro `base: '/portfolio'` is set to match the GitHub repo path. Change in `astro.config.mjs` if hosting at root.

## Accessibility

- Skip-to-content link
- Theme toggle respects `prefers-color-scheme` and stores user choice
- All animations honor `prefers-reduced-motion`
- Color contrast meets WCAG AA on body text
- Semantic landmarks (`<main>`, `<nav>`, `<section>`, `<footer>`)

## License

MIT.
