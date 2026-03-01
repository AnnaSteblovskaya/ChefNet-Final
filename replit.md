# ChefNet Invest Landing Page

A multilingual investor landing page for ChefNet, an AI-powered restaurant/food recommendation platform.

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 6 (port 5000, host 0.0.0.0)
- **Styling**: Tailwind CSS v4 + Emotion
- **UI Components**: Radix UI, MUI, Lucide React
- **Routing**: React Router DOM
- **Auth**: Local storage-based authentication (no external backend)
- **Animations**: Motion (Framer Motion)

## Project Structure

```
src/
  app/
    components/
      sections/       # Landing page sections (Hero, About, FAQ, etc.)
      auth/           # Login/Register modal
      dashboard/      # User dashboard
    App.tsx           # Root component
  contexts/           # React contexts (Auth, Language)
  hooks/              # Custom hooks
  locales/            # i18n translations
  styles/             # Global CSS files
  utils/              # Utility functions
```

## Key Features

- Multi-language support (RU, EN, TR, ES, and others)
- Light/dark theme switching
- Local storage authentication
- Investor-focused landing sections
- Mobile-responsive design

## Development

```bash
npm install
npm run dev    # Starts on http://0.0.0.0:5000
```

## Notes

- This project was exported from Figma Make. Image assets are in `public/assets/` (downloaded from Figma CDN).
- No backend server — all state is client-side.
- Deployment is configured as a static site (builds to `dist/`).
- Carousel sections (UniqueFeaturesSection, PartnershipSection) use pixel-based slide offsets calculated from container width measurement via `useLayoutEffect`. Card widths are set via inline styles, not Tailwind classes.
- AdvantagesSection phone carousel uses Framer Motion `drag="x"` with `onDragEnd` for swipe navigation.
- `usePreventSwipeBack` hook file exists but is not imported anywhere — can be safely deleted.
