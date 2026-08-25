<div align="center">

# modern-loaders

**100 colorful, animated loaders for React.**

Pure CSS motion behind one typed component — no runtime dependencies, no SVG, no images.

[![npm](https://img.shields.io/npm/v/modern-loaders?color=6366f1&label=npm)](https://www.npmjs.com/package/modern-loaders)
[![size](https://img.shields.io/bundlephobia/minzip/modern-loaders?color=ec4899&label=gzipped)](https://bundlephobia.com/package/modern-loaders)
[![types](https://img.shields.io/npm/types/modern-loaders?color=22d3ee)](https://www.npmjs.com/package/modern-loaders)
[![license](https://img.shields.io/npm/l/modern-loaders?color=8b5cf6)](./LICENSE)

</div>

---

```bash
npm i modern-loaders
```

```tsx
import { Loader } from "modern-loaders";

<Loader />
<Loader variant="wave" size={72} speed={0.8} colors={["#f97316", "#ef4444", "#a855f7"]} />
```

That is the whole setup. **The stylesheet is bundled and injects itself** — no CSS import to
remember, nothing to configure in Vite, Next.js, CRA, or Tailwind.

<sub>If your bundler strips side-effect imports, add <code>import "modern-loaders/styles.css"</code>.</sub>

## Why this one

- **100 variants across 10 families** — spinners, dots, bars, shapes, progress, grids, pulses, organic, skeletons, and dimensional.
- **Three props to learn.** `size`, `speed`, `colors`. Everything else has a sensible default.
- **Zero dependencies.** ~2 kB of JS. All motion is CSS keyframes, so it runs off the main thread.
- **Fully typed.** `variant` autocompletes every id, and a typo is a compile error.
- **Accessible by default.** Each loader is a labelled `role="status"` and honours `prefers-reduced-motion`.
- **Themeable without a build step.** Every value is a CSS custom property you can override.

## Usage

### Props

| prop | type | default | description |
|---|---|---|---|
| `variant` | `LoaderVariant` | `"aurora"` | Which loader to render — any of the 100 ids below. |
| `size` | `number \| string` | `48` | Overall size. A number means pixels; strings pass through (`"3rem"`). |
| `speed` | `number \| string` | `1` | Base duration. A number means seconds; lower is faster. |
| `colors` | `string[]` | indigo / pink / cyan | One to three colors. Fewer are cycled, so a single color gives a clean monochrome loader. |
| `label` | `string \| null` | `"Loading"` | Screen-reader text. Pass `null` to mark the loader decorative. |

Every other `div` prop — `className`, `style`, `id`, `onClick`, `data-*` — passes straight through.

### Which loader should I use?

| situation | reach for | why |
|---|---|---|
| Page or section loading | **Skeletons** | Shows the layout arriving. Beats a spinner on perceived speed. |
| Button or inline action | **Dots**, or a spinner at `size={16}` | Fits the line box without shifting text. |
| Upload, install, multi-step work | **Progress** | Says "work is moving", not just "wait". |
| Live, polling, listening | **Pulses** | Reads as a heartbeat rather than a block. |
| Splash, empty state, 404 | **Shapes**, **Organic**, **Dimensional** | Personality is worth the pixels here. |

### Recipes

**A button that keeps its width while loading**

```tsx
<button disabled={busy}>
  {busy
    ? <Loader variant="pulse-dots" size={16} colors={["currentColor"]} label={null} />
    : "Save"}
</button>
```

`colors={["currentColor"]}` inherits the button's own text color. `label={null}` stops screen
readers announcing "Loading" twice when the button already conveys it.

**A skeleton shaped like the thing you're waiting for**

```tsx
{isLoading ? <Loader variant="sk-card" size={64} /> : <ArticleCard {...article} />}
```

**A full-page overlay**

```tsx
<div style={{ position: "fixed", inset: 0, display: "grid", placeItems: "center" }}>
  <Loader variant="aurora" size={80} label="Loading your dashboard" />
</div>
```

**Build your own picker** — the manifest is exported:

```tsx
import { VARIANTS, Loader } from "modern-loaders";

VARIANTS.filter(v => v.group === "Skeletons")
        .map(v => <Loader key={v.id} variant={v.id} />);
```

## All 100 variants

Expand a family to see its variants. Every id maps to a `.ldr--<id>` CSS class.

<details>
<summary><b>Spinners</b> · 10 — Rings and arcs — the classic shape, modernised.</summary>

| variant | what it looks like |
|---|---|
| `aurora` | multi-color conic sweep with a soft glow |
| `spiral` | two arcs spinning opposite directions |
| `ring-dash` | a dashed ring drawing itself |
| `ring-gap` | solid ring with a travelling gap |
| `comet` | gradient tail chasing a bright head |
| `arc-trio` | three nested arcs at different speeds |
| `halo` | still ring with a glow orbiting it |
| `sweep` | radar-style cone sweeping a disc |
| `dot-ring` | eight dots fading around a circle |
| `petal` | radiating rounded blades, iOS-style but colorful |

</details>

<details>
<summary><b>Dots</b> · 10 — Small, quiet, and good inline with text.</summary>

| variant | what it looks like |
|---|---|
| `wave` | rainbow dots riding a sine |
| `orbit` | three-color comet trail |
| `bounce` | three dots with squash on landing |
| `fade-dots` | three dots handing off opacity |
| `pulse-dots` | three dots breathing in sequence |
| `typing` | chat-bubble typing indicator |
| `chase` | six dots circling with a scale pulse |
| `snake` | dots sliding along a track |
| `swap` | two dots trading places |
| `juggle` | three dots arcing over each other |

</details>

<details>
<summary><b>Bars</b> · 10 — Equalizer-style motion with a strong rhythm.</summary>

| variant | what it looks like |
|---|---|
| `bars` | gradient equalizer |
| `ladder` | bars lighting up bottom to top |
| `stretch` | bars scaling from the centre with a color shift |
| `flip-bars` | bars flipping on the X axis |
| `slide-bars` | stacked bars sliding sideways |
| `drop-bars` | bars falling and rebounding |
| `meter` | signal-strength staircase |
| `wave-bars` | seven bars translating through a sine |
| `split-bars` | pairs opening away from the centre |
| `scan-bars` | a highlight sweeping across a static row |

</details>

<details>
<summary><b>Shapes</b> · 10 — Geometry that morphs, folds, and turns.</summary>

| variant | what it looks like |
|---|---|
| `blob` | morphing gradient squircle |
| `cube` | 3D flip, a gradient per face |
| `triangle` | spinning gradient triangle |
| `hexagon` | hexagon pulsing and turning |
| `diamond` | rotated square breathing |
| `star` | five-point star turning |
| `squircle` | square relaxing into a circle |
| `folding` | four quadrants folding away in turn |
| `pentagon` | pentagon rocking on its base |
| `shape-shift` | square ↔ circle with a hue sweep |

</details>

<details>
<summary><b>Progress</b> · 10 — Wide, indeterminate tracks for page and upload states.</summary>

| variant | what it looks like |
|---|---|
| `bar` | indeterminate runner |
| `bar-stripes` | barber-pole fill |
| `bar-dual` | two runners passing each other |
| `bar-segments` | discrete blocks filling in turn |
| `bar-pill` | a pill bouncing wall to wall |
| `bar-glow` | runner with a light bloom |
| `bar-wave` | gradient sliding under a fixed window |
| `bar-dots` | dots marching along a rail |
| `bar-snake` | thin runner that stretches and contracts |
| `bar-fill` | repeatedly filling left to right |

</details>

<details>
<summary><b>Grids</b> · 10 — Cell fields that pulse, flip, and cascade.</summary>

| variant | what it looks like |
|---|---|
| `grid` | 3x3 cells pulsing on a diagonal |
| `checker` | alternating cells trading places |
| `cascade` | a wave rolling from the top-left corner |
| `tiles` | cells flipping like a split-flap board |
| `pixel` | 4x4 field blinking in scattered order |
| `matrix` | rows sweeping downward |
| `mosaic` | cells cycling through the palette |
| `ripple-grid` | a pulse spreading from the centre cell |
| `domino` | cells tipping over one after another |
| `sparkle` | cells twinkling at different sizes |

</details>

<details>
<summary><b>Pulses</b> · 10 — Expanding rings for live, waiting, or listening states.</summary>

| variant | what it looks like |
|---|---|
| `rings` | sonar pulses in three hues |
| `radar` | sweeping cone over a ring |
| `sonar` | filled discs expanding outward |
| `echo` | rings that expand then snap back |
| `shockwave` | a ring that thins as it grows |
| `bloom` | soft gradient discs blooming open |
| `droplet` | a dot falling into its own ripple |
| `concentric` | three static rings breathing together |
| `aura` | a soft glow breathing behind a core |
| `beacon` | steady dot with an expanding halo |

</details>

<details>
<summary><b>Organic</b> · 10 — Playful, physical motion with personality.</summary>

| variant | what it looks like |
|---|---|
| `heart` | a heartbeat: a rotated square with two round lobes |
| `moon` | a crescent turning through its phases |
| `sun` | a core with rays reaching out |
| `flame` | a flickering teardrop |
| `bubble` | bubbles rising and popping |
| `jelly` | squash and stretch |
| `spring` | a coil compressing and releasing |
| `float` | an orb bobbing over its shadow |
| `leaf` | a teardrop tumbling as it turns |
| `windmill` | four blades turning together |

</details>

<details>
<summary><b>Skeletons</b> · 10 — Content-shaped placeholders — use these over spinners for page loads.</summary>

| variant | what it looks like |
|---|---|
| `shimmer` | a single sweeping block |
| `sk-text` | three lines of copy |
| `sk-card` | thumbnail with two lines beside it |
| `sk-avatar` | a circle and a name line |
| `sk-image` | a framed image placeholder |
| `sk-list` | stacked rows with leading bullets |
| `sk-table` | a header row above body rows |
| `sk-chip` | a row of tag placeholders |
| `sk-paragraph` | four lines of body copy |
| `sk-media` | a 16:9 block with a caption under it |

</details>

<details>
<summary><b>Dimensional</b> · 10 — Depth, 3D rotation, and orbital motion.</summary>

| variant | what it looks like |
|---|---|
| `helix` | two strands weaving past each other |
| `pendulum` | a Newton's cradle |
| `atom` | electron shells around a nucleus |
| `gyro` | nested rings turning on different axes |
| `coil` | stacked rings travelling down a spring |
| `vortex` | arcs drawn into a funnel |
| `prism` | three gradient triangles orbiting a centre |
| `torus` | a ring tumbling in 3D |
| `cylinder` | stacked ellipses rolling downward |
| `galaxy` | dots spiralling out from the core |

</details>

## Theming

The `colors` prop covers most cases. For anything else, override the custom properties — they
cascade, so one rule themes a whole subtree:

```css
.dashboard {
  --c1: #6366f1;    /* primary       */
  --c2: #ec4899;    /* secondary     */
  --c3: #22d3ee;    /* tertiary      */
  --size: 64px;     /* box size      */
  --speed: .9s;     /* base duration */

  --track: #1e1e2e;                                      /* rail behind progress bars */
  --grad: linear-gradient(90deg, var(--c1), var(--c3));  /* shared gradient           */
}
```

`--track` and `--grad` derive from `--c1`–`--c3` automatically; set them directly for finer control.

## Accessibility

- Each loader renders as `role="status"` with `aria-label`, so assistive tech announces it once.
- A decorative loader — one sitting beside visible "Loading…" text — should take `label={null}`,
  which switches it to `aria-hidden` and prevents a double announcement.
- Under `prefers-reduced-motion: reduce`, every animation slows to a single calm 4s linear cycle
  rather than stopping. A frozen loader reads as a crashed app, which is worse than gentle motion.

## Bundle size

| | raw | gzipped |
|---|---|---|
| JS | ~7 kB | **~2 kB** |
| CSS (all 100 variants) | ~58 kB | **~8 kB** |

One caveat, stated plainly: **the CSS is not tree-shakeable.** Class-based styles cannot be
dead-code eliminated, so importing a single variant still ships the sheet for all 100. That is a
fair trade for most apps. If you need only a handful and every kilobyte counts, copy the specific
`.ldr--*` blocks out of [`src/styles/`](./src/styles) into your own CSS and skip the package.

## Named exports

`Loader` is the main export. The original ten also have wrappers, kept for backward compatibility
with 1.0.x:

```tsx
import { Aurora, Orbit, Rings, Wave, Bars, Blob, Cube, Spiral, Bar, Grid } from "modern-loaders";
```

The other 90 are reached with `<Loader variant="…" />`. A hundred named exports would bloat the
API surface for no real gain.

## Browser support

Chrome 111+ · Safari 16.2+ · Firefox 113+ — the floor is set by `color-mix()`, alongside `mask`,
`aspect-ratio`, and `clip-path`. Older browsers degrade to solid shapes rather than breaking.

## Development

```bash
npm run dev          # demo gallery: search, family tabs, live palette / size / speed controls
npm run build        # typecheck, then emit dist/ (ESM + CJS + .d.ts + CSS)
npm run build:demo   # static demo site → dist-demo/
```

Adding a variant takes two edits: a `.ldr--<id>` block in `src/styles/`, and a row in
[`src/variants.ts`](./src/variants.ts). The component, the types, and the demo all read from that
one manifest.

## License

ISC © suman
