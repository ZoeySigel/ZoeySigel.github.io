# Repository guidelines

This repository contains ZoeySigel's statically exported Next.js portfolio and
MDX blog.

## Commands

- `pnpm dev` starts the local server on port 1408.
- `pnpm lint` runs ESLint.
- `pnpm check-types` runs the TypeScript compiler without emitting files.
- `pnpm format:check` verifies formatting.
- `pnpm build` creates the GitHub Pages artifact in `out/`.

## Architecture

- `src/app` contains the App Router pages and static metadata routes.
- `src/components` contains shared UI and portfolio sections.
- `src/content` contains typed profile data and MDX posts.
- `src/lib/posts.ts` is the build-time blog content loader.
- `src/styles/globals.css` owns the visual tokens and responsive behavior.

Keep the site compatible with `output: "export"`. Do not add API routes,
rewrites, redirects, server actions, runtime image optimization, or pages that
cannot be fully generated during `next build`.

The profile currently uses explicit placeholder content. Do not infer or add
personal contact details without the owner's instruction.
