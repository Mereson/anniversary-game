# The Next Chapter

A mobile-friendly anniversary game built with Next.js, React, Tailwind CSS, and a little custom animation.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Personalize it

The game follows the September 29 concept brief and the recipient-approved question flow. The number of questions is dynamic, and each question can be a written response or a set of choices. The question types, transition note, date choices, final invitation, and runaway No interaction live in `lib/game-content.ts` and the components under `components/game`.

## Response email

The answers, selected date, and final Yes are submitted through Resend from the server. Copy `.env.example` to `.env.local`, add a Resend API key, and set `RESEND_TO_EMAIL` to the development recipient. Configure the same variables in Vercel with the production recipient when deploying. The recipient, sender, and API key remain outside the browser bundle.

The default sender is `onboarding@resend.dev` for initial testing. Resend may restrict that sender to addresses associated with the Resend account; sending to arbitrary recipients requires a verified sending domain. The app describes a successful API request as submitted for delivery because API acceptance does not prove inbox receipt.

Sound is enabled by default and plays after the first tap or click, as required by browsers. The player can mute it at any time. The short, original WAV cues live in `public/sounds`, and `scripts/generate_sound_cues.py` generates them. Open `/sound-review` to play every cue and compare its intended feeling with the actual sound.

## Verify

```bash
npm run lint
npm run build
npm run format
```
