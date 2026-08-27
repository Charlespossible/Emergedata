# source-images

Originals the client supplied **outside** the company profile .docx. Anything embedded in
the profile is extracted from it automatically and does not belong here.

Name the file after the slug listed in `SUPPLIED_HEADSHOTS` in `../scripts/prepare-images.mjs`
— `lydia-ezenwa.jpg`, `.jpeg`, `.png` and `.webp` are all accepted — then run:

```bash
npm run images
```

The script crops it square, scales it to 640px and writes the `webp` + `jpg` pair into
`public/images/team/`. Those outputs are committed, so a fresh clone builds without this
folder — keep the originals here anyway, so a re-crop never needs the client again.

## Received

| Filename | Who | Notes |
|---|---|---|
| `lydia-ezenwa.jpeg` | Lydia Ezenwa, Head of Research & Intelligence | Supplied 2026-08-27 ✅ Podium photo, 1600x1189. Uses an explicit measured crop — `attention` framed it far too loosely. |

Still outstanding from the client: higher-resolution originals for the five partner marks,
and the official vector (SVG) logo.
