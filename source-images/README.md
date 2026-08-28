# source-images

Originals the client supplied **outside** the company profile .docx. Anything embedded in
the profile is extracted from it automatically and does not belong here.

Name the file after the key listed in `SUPPLIED_HEADSHOTS` or `SUPPLIED_PARTNERS` in
`../scripts/prepare-images.mjs` — `.jpg`, `.jpeg`, `.png` and `.webp` are all accepted —
then run:

```bash
npm run images
```

The script writes the optimised outputs into `public/images/`. Those outputs are committed,
so a fresh clone builds without this folder — keep the originals here anyway, so a re-crop
never needs the client again.

After a partner mark changes, copy the width/height the script prints into
`../src/content/partners.ts`, or the row shifts as the images load.

## Received

| File | What | Notes |
|---|---|---|
| `lydia-ezenwa.jpeg` | Lydia Ezenwa headshot | 1600×1189 podium photo. Explicit measured crop — `attention` framed it far too loosely. |
| `Dew-drop.jpg` | Dew Drop Foundation mark | 113×94, trims to 55×77. Below the row's render height. |
| `deal.jpg` | DEAL mark | 113×78, trims to 82×25. Cropped to remove a stray smudge above the D. |
| `chida.jpg` | CHIDA mark | 113×94, trims to 94×30. Strapline is illegible at this resolution. |

## Still wanted

**Higher-resolution partner marks.** Dew Drop, DEAL and CHIDA arrived at ~113px wide and end
up shorter than the row renders them, so the browser upscales and they read softer than the
five marks taken from the profile. Vector (SVG/EPS/PDF), or anything 600px or wider, would
fix it outright. The same applies to the profile's own marks — the smallest is 77px tall.

**A vector (SVG) Emerge Data logo.** `../src/components/ui/Logo.tsx` is currently a
hand-traced vector of the raster mark. The live site's copy is only 96×94, so it is no
better as a source.

**Higher-resolution headshots.** Three of the profile headshots are identical in size to the
live site's ~160px web images, which is why they look soft next to Lydia's.
