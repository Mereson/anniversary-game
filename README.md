# The Next Chapter

A mobile-friendly anniversary game built with Next.js, React, Tailwind CSS, and a little custom animation.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Personalize it

The game follows the September 29 concept brief. Edit `lib/game-content.ts` only when the recipient's name/nickname and three real shared memories or inside jokes are available. The brief already provides the game's structure, date choices, final question, and runaway No joke.

Sound is enabled by default and plays after the first tap or click, as required by browsers. The player can mute it at any time. The short, original WAV cues live in `public/sounds`, and `scripts/generate_sound_cues.py` generates them. Open `/sound-review` to play every cue and compare its intended feeling with the actual sound. The game keeps choices in the current browser session and sends no response anywhere.

## Verify

```bash
npm run lint
npm run build
npm run format
```
