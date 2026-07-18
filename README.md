# Show Explorer

A modernized Next.js application that preserves the original TV show explorer experience while moving the UI to the App Router and React/TypeScript architecture. Users can browse shows by genre, sort by rating, search by name, and open detailed show pages.

## Tech Stack & Architecture Decisions

- Next.js 14 App Router for route-based pages and layouts.
- React + TypeScript for component logic and reusable UI.
- Tailwind CSS for styling without extra UI libraries.
- Lightweight hooks for catalog, search, and detail fetching logic.
- Zod-powered service parsing retained from the original app to keep API contracts safe.

## Project Structure

- app/: route segments and the root layout.
- components/: UI components for cards, search, detail views, and loaders.
- hooks/: client-side state and data loading logic.
- services/: API access and schema parsing.
- shared/: helpers such as HTML-to-text conversion and normalisation.
- types/: shared TypeScript types.

## Setup & Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:3000

## Build & Test

- Build for production:
  ```bash
  npm run build
  ```

- Run the test suite:
  ```bash
  npm test -- --run
  ```

This project was developed using:
- Node.js: v24.13.0
- npm: v11.6.2