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

## PWA Setup Status

PWA support is configured manually for standalone Angular and includes:

- Service worker dependency: `@angular/service-worker`
- SW registration in app config
- Build-time SW generation in Angular production config
- `ngsw-config.json`
- Web manifest at `public/manifest.webmanifest`
- Manifest and mobile meta tags linked in `src/index.html`

After production build, verify these files exist in output:

- `dist/spy-game/browser/manifest.webmanifest`
- `dist/spy-game/browser/ngsw.json`
- `dist/spy-game/browser/ngsw-worker.js`

## Deploy (Vercel CLI)

Install CLI and login:

```bash
npm i -g vercel
vercel login
```

Deploy production:

```bash
vercel --prod
```

When prompted:

- Framework: Angular
- Build command: `npm run build`
- Output directory: `dist/spy-game/browser`

## Deploy (Netlify CLI Alternative)

```bash
npm i -g netlify-cli
netlify login
netlify deploy --build --prod
```

When prompted:

- Build command: `npm run build`
- Publish directory: `dist/spy-game/browser`

## PWABuilder to APK Flow

1. Build and deploy app over HTTPS.
2. Verify these URLs are public:
	 - `/manifest.webmanifest`
	 - `/ngsw.json`
	 - `/ngsw-worker.js`
3. Open PWABuilder and paste your deployed URL.
4. Generate Android package (APK/AAB) from PWABuilder.

## Notes

- `ng add @angular/pwa` is a one-time setup command. Re-running can conflict if `ngsw-config.json` or manifest already exists.
- If PWABuilder still warns, it is usually icon quality/size metadata, not core Angular PWA wiring.

## Useful Commands

```bash
npm start
npm run build
npm test
```