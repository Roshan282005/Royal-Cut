# Royal Cut Saloon — Updated Website

## What's in this delivery

- `source-code/` — the full React + Vite project. Run `npm install` then `npm run dev` to work on it locally, or `npm run build` to produce a fresh `dist/` folder.
- `built-site/` — a ready-to-deploy static build (already run through `npm run build`). You can upload this folder's contents directly to any static host (Vercel, Netlify, etc.) with no build step needed.

## Changes made this round

1. **Menu accuracy** — verified all service names, prices, and grooming package prices ($60/$90/$130/$160/$180) already match the client's menu photo exactly. No changes needed there.
2. **Hero section** — replaced the animated 3D scene with a real shop interior photo, per the client's request.
3. **Real photos** — the client only sent 3 real photos (menu board + 2 interior shots). These now appear in the hero, the Instagram section, and background accents. Individual service thumbnails are still AI-generated stock-style images, not real photos — the client hasn't sent per-service photos yet.
4. **Removed fabricated content** — the previous build had invented client testimonials, invented staff bios (fake names, fake years of experience, fake ratings), and fake Instagram like/comment counts. All of this has been fully deleted from the codebase (not just hidden — it was leaking into the shipped JavaScript bundle even when unused, which is worse). Nothing fabricated ships to production now.
5. **Back to School banner** — built as a small, isolated, dismissible component (`src/components/BackToSchoolBanner.tsx`) so it's a one-line removal in `App.tsx` when the promotion ends.
6. **Performance** — compressed ~20 oversized AI-stock images from 25MB down to 4.6MB total, added lazy-loading on all below-the-fold images, and fixed a build-blocking filename typo (`salon_menu_board..jpg` → `salon_menu_board.jpg`) that meant this project had never actually compiled before.
7. **Instagram / phone / directions** — already wired up in the code (Instagram follow link, `tel:` click-to-call, Google Maps directions link) and confirmed working.

## Still outstanding — needs your decision, not code

- **Google Reviews**: a real live-reviews section needs the shop's Google Business Profile Place ID (and a Google Places API key). Nobody has that yet — flag when you do.
- **Staff/barber profiles**: removed entirely rather than shipped with invented names. Send real staff photos/bios/specialties and this can be rebuilt properly.
- **Real customer testimonials**: same — none exist yet. Add them once the client has actual reviews to share.
- **JS bundle size**: currently ~1.09MB (302KB gzipped), mostly from the remaining Three.js 3D sections (packages, membership card, salon tour). Works fine but isn't optimized for slow connections — code-splitting those sections behind lazy-loading is a follow-up if load speed on low-end mobile becomes a concern.
