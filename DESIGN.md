# Design

## Theme
Dark-dominant industrial. Near-black (#231F20) as the primary surface color for hero, lifecycle, closing CTA, and footer. Light gray (#F4F4F2) for metrics and product sections. White for product isolation. Sections alternate to create editorial rhythm. Orange (#DD8001) is a signal color only — never a background.

## Colors
```
--color-bg:           oklch(13% 0.007 20)    /* #231F20 — near-black, primary dark surface */
--color-bg-deeper:    oklch(10% 0.005 20)    /* deeper dark for footer */
--color-surface:      oklch(96% 0.004 90)    /* #F4F4F2 — light gray, metrics + product sections */
--color-surface-white: oklch(100% 0.003 90) /* near-white, product isolation */
--color-text:         oklch(13% 0.007 20)    /* dark text on light sections */
--color-text-inverse: oklch(97% 0.003 90)   /* light text on dark sections */
--color-text-muted:   oklch(55% 0.005 30)   /* muted body on dark */
--color-text-muted-light: oklch(45% 0.005 30) /* muted on light sections */
--color-accent:       oklch(62% 0.163 55)   /* #DD8001 — orange signal */
--color-border:       oklch(22% 0.005 20)   /* subtle dark border */
--color-border-light: oklch(87% 0.005 90)   /* subtle light border */
```

## Typography
Font family: Open Sans (Google Fonts) — single family, strong weight contrast.

```
--font-sans: 'Open Sans', system-ui, sans-serif

Display XL:  clamp(3.25rem, 6vw, 5.5rem)   / weight 800 / tracking -0.03em / lh 1.0
Display L:   clamp(2.5rem, 4.5vw, 4rem)     / weight 800 / tracking -0.025em / lh 1.05
Display M:   clamp(1.875rem, 3vw, 2.75rem)  / weight 700 / tracking -0.02em / lh 1.1
Heading:     clamp(1.375rem, 2.2vw, 1.875rem) / weight 600 / tracking -0.01em / lh 1.2
Body L:      clamp(1.0625rem, 1.5vw, 1.25rem) / weight 400 / lh 1.65
Body:        1rem / weight 400 / lh 1.7
Label:       clamp(0.6875rem, 1vw, 0.8125rem) / weight 600 / tracking 0.12em / uppercase
```

## Spacing
```
--space-xs:  0.5rem
--space-sm:  1rem
--space-md:  2rem
--space-lg:  4rem
--space-xl:  6rem
--space-2xl: 10rem
--space-3xl: 14rem
--gutter:    clamp(1.5rem, 5vw, 6rem)
```

## Layout
- Max content width: 1440px
- 12-column grid where needed
- Sections frequently occupy 100vh
- Wide horizontal margins, generous vertical rhythm
- Asymmetric compositions preferred over centered stacks

## Components
- **btn--primary**: orange fill, near-black text, no border-radius or minimal (4px), padding 0.875rem 2rem, weight 600
- **btn--secondary**: transparent, orange border, orange text — for light sections
- **btn--ghost**: transparent, light border, light text — for dark sections
- **eyebrow**: 11-13px, uppercase, letter-spacing 0.12em, weight 600 — orange on dark sections, dark-gray on light
- **metrics number**: Display XL weight 800, tabular-nums
- **lifecycle step**: number in accent color, thin orange top rule, label in Display M

## Motion
- Reduced motion: all animations disabled via prefers-reduced-motion
- Easing: cubic-bezier(0.16, 1, 0.3, 1) — ease-out-quint for most transitions
- Hero zoom: 20s slow scale from 1.0 to 1.08 (breathing effect)
- Sticky header: 300ms background/shadow transition
- Count-up: 1500ms duration, easeOutQuart
- Map dots: staggered 200ms delays, fade-in + scale
- Section reveals: translateY(24px) → 0 + opacity 0 → 1, 600ms
- Tab crossfade: 250ms opacity + translateX(8px)
