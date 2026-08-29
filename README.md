<div align="center">

# modern-loaders

**212 colorful, animated loaders for React.**

Pure CSS motion behind one typed component — no runtime dependencies, no SVG, no images.

[![npm](https://img.shields.io/npm/v/modern-loaders?color=6366f1&label=npm)](https://www.npmjs.com/package/modern-loaders)
[![size](https://img.shields.io/bundlephobia/minzip/modern-loaders?color=ec4899&label=gzipped)](https://bundlephobia.com/package/modern-loaders)
[![types](https://img.shields.io/npm/types/modern-loaders?color=22d3ee)](https://www.npmjs.com/package/modern-loaders)
[![license](https://img.shields.io/npm/l/modern-loaders?color=8b5cf6)](./LICENSE)
[![demo](https://img.shields.io/badge/demo-live-10b981)](https://modern-loaders.netlify.app/)

### [**→ Browse all 212 loaders live**](https://modern-loaders.netlify.app/)

Search by name, filter by family, tune size / speed / palette, and copy the JSX for any of them.

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

- **212 variants across 20 families** — spinners, dots, bars, shapes, progress, grids, pulses, organic, skeletons, dimensional, neon, liquid, glitch, particles, futuristic, elastic, minimal, gradient, kinetic, and premium.
- **Three props to learn.** `size`, `speed`, `colors`. Everything else has a sensible default.
- **Zero dependencies.** ~4 kB of JS. All motion is CSS keyframes — no rAF loop, no JS on the animation path.
- **Fully typed.** `variant` autocompletes every id, and a typo is a compile error.
- **Accessible by default.** Each loader is a labelled `role="status"` and honours `prefers-reduced-motion`.
- **Themeable without a build step.** Every value is a CSS custom property you can override.

## Usage

### Props

| prop | type | default | description |
|---|---|---|---|
| `variant` | `LoaderVariant` | `"aurora"` | Which loader to render — any of the 212 ids below. |
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
| Onboarding, upload, sync | **Premium** | Restrained, product-grade motion that won't date. |
| Dense UI — toolbars, table cells | **Minimal** | Small and low-contrast; won't pull the eye off the data. |
| Games, launch screens, dev tools | **Neon**, **Futuristic**, **Glitch** | Loud on purpose. Best on a dark surface. |
| Playful or brand-forward moments | **Liquid**, **Particles**, **Elastic**, **Kinetic** | Physical motion people actually watch. |

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

## All 212 variants

Every id maps to a `.ldr--<id>` CSS class. The tables below are the full reference; to *see* them
moving, use the [live gallery](https://modern-loaders.netlify.app/) — it renders every variant with
your own size, speed, and colours, and copies the JSX for you.

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

<details>
<summary><b>Neon</b> · 12 — Light that hums, blooms, and flickers alight.</summary>

| variant | what it looks like |
|---|---|
| `neon-ring` | a glass tube that hums, with a lit filament turning inside it |
| `neon-pulse` | a white-hot filament breathing inside its own bloom |
| `neon-tube` | a light bouncing wall to wall inside a glass capsule |
| `neon-sign` | bars igniting one by one, with the stutter of a real tube |
| `laser` | a scan line crossing a screen, scanlines and all |
| `light-trail` | two lights chasing each other on nested tracks |
| `neon-arc` | a tube of light growing and shrinking as it turns |
| `plasma` | churning light held inside a containment ring |
| `strobe` | halos firing outward on hard steps, not a smooth ripple |
| `glow-dots` | a chain of bulbs handing the current along |
| `retro-grid` | a synthwave horizon rushing toward you |
| `firefly` | soft lights drifting and blinking out of step |

</details>

<details>
<summary><b>Liquid</b> · 11 — Fluid behaviour — filling, pouring, rippling, merging.</summary>

| variant | what it looks like |
|---|---|
| `liquid-fill` | a vessel filling and draining behind a rolling surface |
| `drip` | a drop swelling at a nozzle, letting go, and landing in the pool |
| `metaball` | two drops pulling a neck between them, then merging |
| `wave-tank` | two swells sloshing past each other at a steady level |
| `ripple-pool` | rings spreading across a surface seen at a low angle |
| `mercury` | a bead of liquid metal wobbling under its own weight |
| `lava` | heavy blobs climbing a warm capsule and sinking back |
| `ink` | a drop of colour blooming out through water |
| `splash` | a drop hitting the surface and throwing up a crown |
| `whirl` | liquid spun into a funnel, with the eye opening at the centre |
| `pour` | a stream running into a glass that fills, then empties |

</details>

<details>
<summary><b>Glitch</b> · 11 — Digital damage: tearing, static, dropout, corruption.</summary>

| variant | what it looks like |
|---|---|
| `glitch-block` | a mark tearing into its colour channels and snapping back |
| `glitch-text` | lines of copy slipping out of register mid-render |
| `rgb-split` | three channels drifting apart and recombining |
| `scanlines` | a CRT panel with the raster rolling through it |
| `static-noise` | untuned signal, hard-cut frame to frame |
| `datamosh` | horizontal slices sliding off their own frame |
| `corrupt-bar` | a progress track that keeps losing its place |
| `signal-loss` | reception bars dropping out and clawing back |
| `vhs` | tracking damage crawling up a taped frame |
| `pixel-drift` | a tile field losing alignment, then re-seating |
| `terminal` | a prompt typing a line, cursor still blinking |

</details>

<details>
<summary><b>Particles</b> · 11 — Fields of small things falling, bursting, drifting, swarming.</summary>

| variant | what it looks like |
|---|---|
| `confetti` | paper tumbling down through the frame |
| `firework` | sparks thrown out and pulled back down by gravity |
| `snow` | soft flakes settling with a lazy sideways drift |
| `embers` | sparks lifting off a fire and burning out |
| `starfield` | stars stretching into streaks as you jump to light speed |
| `dust` | motes turning slowly in a shaft of light |
| `burst` | a ring of dots detonating outward and snapping home |
| `swarm` | a flock tightening into a knot and scattering again |
| `rain` | streaks coming down onto a wet line |
| `magnet` | particles dragged into a core, then released |
| `nebula` | coloured gas turning slowly, with stars picking out through it |

</details>

<details>
<summary><b>Futuristic</b> · 12 — Reticles, reactors, and hardware that does not exist yet.</summary>

| variant | what it looks like |
|---|---|
| `hud-ring` | instrument rings ticking against each other |
| `reactor` | a white-hot core inside a segmented containment ring |
| `hologram` | a projection standing in its own light cone |
| `warp` | frames rushing past you down a tunnel |
| `targeting` | brackets closing onto a lock |
| `circuit` | pulses running the traces of a board |
| `barcode` | a code being read, line by line |
| `quantum` | a particle taking every position it might occupy |
| `portal` | a gateway swirling open, two currents against each other |
| `shield` | an energy field taking hits and holding |
| `satellite` | bodies sweeping their own inclined orbits |
| `teleport` | slices dematerialising and coming back together |

</details>

<details>
<summary><b>Elastic</b> · 11 — Spring physics with genuine overshoot and recoil.</summary>

| variant | what it looks like |
|---|---|
| `rubber-band` | a band strung between two pins and plucked |
| `bungee` | a weight dropping on a cord that stretches to catch it |
| `trampoline` | a ball landing on a sheet that bows and throws it back |
| `wobble` | a weighted shape rocking past level and settling back |
| `pogo` | a hop with the squash on landing and a shadow that keeps up |
| `elastic-bar` | a pill that stretches into the direction it is thrown |
| `catapult` | flung up and over, then reset out of sight |
| `yo-yo` | spinning down the string and climbing back up it |
| `elastic-ring` | a hoop squashed along an axis that keeps turning |
| `snap-dots` | a thread pulled taut until it lets go |
| `chain` | a swing running down a linked strand, one bead behind the last |

</details>

<details>
<summary><b>Minimal</b> · 11 — Quiet motion for dense UI, toolbars, and inline text.</summary>

| variant | what it looks like |
|---|---|
| `hairline` | a lit segment travelling a thin rule |
| `tick` | a hand stepping round a quiet dial |
| `quarter` | one arc, snapping a quarter-turn at a time |
| `dot-fade` | one dot, one slow breath |
| `underline` | a rule tracking back and forth beneath a word |
| `pill-swap` | a pill stretching to the far end and collecting itself |
| `bracket` | two marks closing in on the point between them |
| `slash` | a single stroke wiping through a frame |
| `micro-dots` | the plainest ellipsis there is |
| `ring-thin` | a hairline ring with one short arc gliding round it |
| `crosshair` | two hairlines finding each other |

</details>

<details>
<summary><b>Gradient</b> · 11 — Colour itself is the animation.</summary>

| variant | what it looks like |
|---|---|
| `mesh` | a soft mesh gradient drifting under itself |
| `hue-ring` | a colour wheel turning while the colours themselves travel |
| `gradient-orb` | a lit sphere with the highlight sliding over it |
| `chroma` | three colour fields overlapping and pulling apart |
| `ombre` | one long gradient revealed a band at a time |
| `iridescent` | an oil-slick sheen crawling across a disc |
| `sunrise` | a disc climbing over its own horizon |
| `refract` | a beam split into its colours by a prism |
| `gradient-border` | a lit frame with the colour running round the edge |
| `color-cycle` | one block, the gradient axis sweeping right round it |
| `northern` | light curtains folding across the sky |

</details>

<details>
<summary><b>Kinetic</b> · 11 — Mechanisms — gears, cranks, belts, beams, and escapements.</summary>

| variant | what it looks like |
|---|---|
| `gears` | two toothed wheels driving each other |
| `metronome` | a weighted arm keeping time |
| `hourglass` | sand running out, then the whole thing turns over |
| `piston` | a head driven up and down by a crank |
| `carousel` | panels turning past you on a ring |
| `clockwork` | three hands, three speeds, one dial |
| `abacus` | beads counted back and forth along their rails |
| `conveyor` | crates carried along and sent round again |
| `pie` | a wedge sweeping the full turn, then handing over to the next colour |
| `seesaw` | a beam tipping between two weights |
| `roller` | balls rolling round the inside of a track |

</details>

<details>
<summary><b>Premium</b> · 11 — Product-grade motion for onboarding, uploads, and sync.</summary>

| variant | what it looks like |
|---|---|
| `logo-morph` | a brand mark fanning apart and re-forming |
| `card-stack` | the top card dealt to the back, over and over |
| `progress-ring` | a track filling round, with the head lit |
| `pill-progress` | a soft track with a glide and a glass sweep over it |
| `glass-ring` | frosted glass with one specular arc travelling the rim |
| `orbit-avatar` | a team circling a hub, each face staying upright |
| `checklist` | tasks ticking off one after another |
| `upload-cloud` | chevrons lifting into the cloud |
| `sync` | two arrows chasing each other round the loop |
| `steps` | a stepper advancing one node at a time |
| `spark-line` | a chart drawing itself under a moving read head |

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
| JS | ~18 kB | **~4 kB** |
| CSS (all 212 variants) | ~166 kB | **~24 kB** |

One caveat, stated plainly: **the CSS is not tree-shakeable.** Class-based styles cannot be
dead-code eliminated, so importing a single variant still ships the sheet for all 212. At ~24 kB
gzipped that is a fair trade for most apps, but it is real weight. If you need only a handful and
every kilobyte counts, copy the specific `.ldr--*` blocks out of [`src/styles/`](./src/styles)
into your own CSS and skip the package — each block is self-contained apart from the shared
keyframes in [`00-base.css`](./src/styles/00-base.css).

## Named exports

`Loader` is the main export. The original ten also have wrappers, kept for backward compatibility
with 1.0.x:

```tsx
import { Aurora, Orbit, Rings, Wave, Bars, Blob, Cube, Spiral, Bar, Grid } from "modern-loaders";
```

Everything else is reached with `<Loader variant="…" />`. Two hundred named exports would bloat
the API surface for no real gain, and `variant` autocompletes just as well.

## Browser support

Chrome 111+ · Safari 16.4+ · Firefox 113+ — the floor is set by `color-mix()`, alongside `mask`,
`aspect-ratio`, `clip-path`, and the individual `translate` / `rotate` / `scale` properties. Older
browsers degrade to solid shapes rather than breaking.

Five variants — `neon-arc`, `pie`, `progress-ring`, `gradient-border`, `color-cycle` — animate a
registered custom property via `@property` (Firefox 128+). Every use passes a fallback, so below
that they render a sensible static frame instead of disappearing.

## Development

```bash
npm run dev          # showcase: search, 20 family filters, live size / speed / palette, detail sheet
npm run build        # typecheck, then emit dist/ (ESM + CJS + .d.ts + CSS)
npm run build:demo   # static showcase → dist-demo/ (deployed to modern-loaders.netlify.app)
```

Adding a variant takes two edits: a `.ldr--<id>` block in `src/styles/`, and a row in
[`src/variants.ts`](./src/variants.ts). The component, the types, the README catalogue, and the
showcase all read from that one manifest — `cells` is how many `<span>` children the CSS expects.

Two rules keep the motion composable inside a variant: put a whole radial chain
(`rotate(…) translateY(…)`) in a single `transform` so the offset happens in the rotated frame,
and reach for the standalone `translate` / `rotate` / `scale` properties when an element already
animates `transform` — they compose instead of overwriting it.

## License

ISC © suman
