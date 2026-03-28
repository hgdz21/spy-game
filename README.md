# Spy Game v1.0

Modern multiplayer party game built with Angular Standalone. One or more players are spies, everyone else shares a secret location, and the group must identify the spy before time runs out.

## Highlights

- Angular 20 standalone architecture
- Dark-mode-first UI with glassmorphism style
- Multi-language support: English, French, Arabic (RTL/LTR)
- Animated background particles
- Role reveal flow with spy vs location cards
- In-game timer and voting flow
- PWA-ready setup for installability and APK packaging via PWABuilder

## Brand and UI Updates Included In v1.0

- Primary brand color changed to red: `#d41212`
- Updated primary variants:
	- `--color-primary: #d41212`
	- `--color-primary-dark: #ac0e0e`
	- `--color-primary-light: #e55a5a`
- Spy emphasis color aligned to brand red
- Timer and reveal accents updated to red gradient styling
- Setup category cards and key interactive components use Poppins font

## Loader Behavior (Current)

The app uses a centered spinner overlay loader.

- Shown on initial page load
- Shown when entering game screen after role reveal
- Shown when changing language
- Spinner animation speed set to 1s cycle

## Tech Stack

- Angular 20
- TypeScript
- RxJS
- @tsparticles/angular
- Flag Icons
- TailwindCSS package installed (v3 compatibility)

## Prerequisites

- Node.js 20+
- npm 10+

## Install

```bash
npm install
```

## Run Locally

```bash
npm start
```

Open `http://localhost:4200`.

## Production Build

```bash
npm run build
```

Build output:

- `dist/spy-game/browser`
