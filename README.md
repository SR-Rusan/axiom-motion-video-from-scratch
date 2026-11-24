# AXIOM by Rusan — Fresh Motion Film

Standalone from-scratch Remotion build for a 15-second AXIOM by Rusan motion film.

## Run

```bash
npm install
python3 scripts/generate_audio.py
npm run typecheck
npm run studio
```

## Render

```bash
npm run render:vertical
npm run render:landscape
```

The final masters and keyframes are in `deliverables/`. Open `index.html` through a local static server to review the showcase:

```bash
python3 -m http.server 4173
```

Then visit `http://localhost:4173/`.

## Composition

- `0.0–2.0s` — founder-led hook
- `2.0–4.5s` — operational drag
- `4.5–7.0s` — deterministic architecture shift
- `7.0–10.5s` — Axiom Core telemetry
- `10.5–13.0s` — four-service stack
- `13.0–15.0s` — AXIOM by Rusan reveal
