# ECLIPSE Portfolio — Reference-Based Visual Specification

Source of truth: `reference.png` (1536x1024, aspect 3:2).
Extracted programmatically (System.Drawing pixel sampling) — every number below is measured from the image, not guessed.

## 1. Colors (measured)

| Token | Measured hex | Note |
|---|---|---|
| Page void (darkest) | `#070A0F`-family (lum 3-12) | top/bottom corners near `#101010` |
| Background avg per band | `#060811` ... `#12162A` | blue-tinted black |
| Primary accent (mint) | `#10F0D0`-family (bright mint pixels) | matches `#65F6D5` intent |
| Violet glow | `#301070`-family (bright violet) | matches `#8B7CFF` intent |
| Amber | sparse, ~62 px | matches `#FFB86B` |
| White text | `#909090`-`#FFFFFF` | headline bright white |

## 2. Composition (1536x1024 px canvas)

```
y 0-140     NAV: brand text top-left (x 64-200, white, y 32-48),
            amber accent top-right (x 1344-1480, y 32) — availability status
y 96-272    HERO TEXT BLOCK (x 208-352):
              y 96-112  mint mono label
              y 128-160 white headline (2 rows, ~130px wide, all-caps size)
              y 176-192 mint accent line (glow text)
              y 208-256 secondary gray text lines
              y 256-272 mint accents
y 60-340    ECLIPSE (right side):
              SOLID BLACK disk: center (770,196) r~102, bbox x 668-876 y 88-308,
              near-solid black interior (fill 0.717), NO bright core inside
              VIOLET illumination/halo upper-left of disk (x 760-880, y 60-230)
              MINT rim on the right/bottom of disk (x 880-930, y 80-200; x 1072-1120 y 96)
y 384-448   divider band with scattered bright marks (section break)
y 448-680   CONTENT zone (soft reference only — not a hard measurement)
y 688-870   CARD zone: text rows at x 42-336 (left), x 560-688, x 900-1150
            DESKTOP: 4 project cards
y 880-1024  FOOTER: mint text x 296-456 (y 896), amber bits y 928,
            sparse text bottom y 992-1008
```

## 3. Key geometry ratios (relative to 1536x1024)

| Element | X center | Y center | Size |
|---|---|---|---|
| Eclipse disk | 50.1% | 19.1% | r ≈ 6.6% of width |
| Eclipse bbox | 43.5-57.0% | 8.6-30.1% | 208x220px |
| Hero text block | 18.2% | 18.0% | 130x180px |
| Nav | — | 3.2-7.0% | 140px tall zone |

## 4. Implementation mapping

| Visual element | Technique |
|---|---|
| Eclipse disk | three.js: SOLID BLACK sphere (no emissive core) |
| Violet halo (upper-left) | R3F glow sprite / shader, violet, above-left of disk |
| Mint rim (right/bottom) | R3F crescent/rim glow sprite, mint, wrapping right-bottom |
| Aurora atmosphere | CSS radial-gradient blobs, slow drift |
| Technical grid | CSS repeating-linear-gradient, 1px, faint |
| Glass panels/cards | `bg-white/8 + border-white/10 + backdrop-blur` |
| Headline | Space Grotesk, white, ~clamp(40px, 8vw, 72px) |
| Mono labels | JetBrains Mono, mint, ~11-12px uppercase |
| Amber availability | nav right, pulsing dot + text |
| Projects (desktop) | 4 cards |

## 5. Uncertain (needs visual confirmation during refinement)

- Exact text content (headline wording, section titles)
- Card counts, exact borders/radius of cards
- Hover states, exact aurora shape
- Grid density and section spacing

These will be tuned in Phase 8 using side-by-side screenshot comparison.