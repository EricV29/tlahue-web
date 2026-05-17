# tlahue-web

Vite + React 19 + TypeScript + Tailwind CSS SPA.

## Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server (HMR) |
| `pnpm build` | Type-check then build (`tsc -b && vite build`) |
| `pnpm lint` | Run ESLint |
| `pnpm preview` | Preview production build |

## Dev workflow

1. Run `pnpm dev` for development
2. Before committing: run `pnpm lint` (no typecheck in pre-commit)
3. Build passes typecheck via `tsc -b` before Vite build

## Tech stack

- **Runtime**: React 19.2.6
- **Build**: Vite 8.0.12
- **Styling**: Tailwind CSS 4 (uses `@tailwindcss/vite` plugin, not PostCSS)
- **TypeScript**: ~6.0.2
- **Linting**: ESLint 10 + typescript-eslint + react-hooks + react-refresh

## Project structure

```
src/
  main.tsx    # Entry point
  App.tsx     # Root component
  index.css   # Tailwind imports (@import "tailwindcss")
index.html    # HTML shell
vite.config.ts
```

## Notes

- Tailwind 4 uses CSS-first config via `@theme` in CSS, not `tailwind.config.js`
- React Compiler is disabled (impacts dev/build perf)
- No test framework configured
- No CI/CD workflows in `.github/`
- Dependencies are pinned (no `^` or `~`) for reproducibility and security

## Icons & SVGs

- All SVG icons must be created as React components in `src/components/icons/`
- Never inline SVG code in components; always import from the icons folder
- **IMPORTANT:** ALWAYS ask the user to provide the SVG code for any new icon needed
- Do NOT create icons from memory or guess the SVG path; request it from the user first