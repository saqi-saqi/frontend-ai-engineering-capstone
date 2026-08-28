# CLAUDE.md — Project Conventions & Stack

## Project: AI Companion Chat

## Stack
- **Runtime:** Node.js LTS (v24+)
- **Language:** TypeScript
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS
- **State:** React Context + custom hooks
- **AI tooling:** Claude Code (CLI)

## Directory Layout
```
src/
  app/        — Next.js App Router pages and layouts
  components/ — Reusable React components
  lib/        — Utilities, API clients, hooks
  styles/     — Global CSS and Tailwind config
public/       — Static assets
```

## Conventions

### Commits
Use **Conventional Commits** format:
```
<type>[optional scope]: <description>
```
Types: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `style`, `perf`, `build`, `ci`, `revert`.

### Code Style
- TypeScript strict mode enabled
- 2-space indentation
- Single quotes for strings
- Semicolons required
- PascalCase for components, camelCase for functions/variables
- File names: kebab-case

### Branch Strategy
- `main` is the default and primary branch
- Feature branches: `feat/<short-description>`
- All changes go through pull requests (even for solo work)

### Environment Variables
- `.env.local` for local development (never committed)
- Required keys: `NEXT_PUBLIC_API_BASE_URL`, `LLM_API_KEY`
- Document all env vars in README

### Testing
- Jest + React Testing Library for unit tests
- Cypress for end-to-end tests (Phase 4)

### CI / CD
- GitHub Actions for linting and tests on every push
- Deployment target: Vercel (Phase 4)
