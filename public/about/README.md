About-section card photos used by the portfolio.

Expected files (one per highlight card):
- ai-ml-engineer.jpg
- entrepreneur.jpg
- content-creator.jpg
- intj-mindset.jpg
- etc ...

Specs:
- Aspect ratio 3:5 (portrait). The card renders at 240x400 CSS px.
- Export at 2x: **480 x 800 px**. Do not ship 1x - it looks soft on retina.
- JPG, quality ~82. Aim for under ~120 KB per file.
- The bottom ~35% of each photo sits under a dark scrim carrying the card
  title, so keep faces and any subject of interest in the upper two thirds.
- Cards render desaturated and go to full colour on hover, so pick photos that
  still read well in black and white (contrast matters more than colour).

The `About` component in `src/sections.jsx` references these from `/about/...`.
A card whose `image` is omitted renders without a photo, so files can be added
one at a time.

Card count is load-bearing: the rail only scrolls if the cards are wider than
the screen. Nine cards fill a 1536px viewport with room to scroll; dropping
below seven leaves dead space on the right.

Description length matters too. The caption is bottom-anchored, so the CSS
reserves exactly two lines to keep every card's title at the same height.
Roughly 52 characters fills two lines at 240px wide - go over and the text is
clipped rather than allowed to push the title upward.
