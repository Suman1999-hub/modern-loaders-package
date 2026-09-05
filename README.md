<div align="center">

<h1>modern-loaders</h1>

<p><b>336 ready-made loading animations for React.</b><br/>
One component, pure CSS motion, zero runtime dependencies.</p>

[![npm version](https://img.shields.io/npm/v/modern-loaders?style=flat-square&color=6366f1&label=npm)](https://www.npmjs.com/package/modern-loaders)
[![npm downloads](https://img.shields.io/npm/dm/modern-loaders?style=flat-square&color=ec4899&label=downloads)](https://www.npmjs.com/package/modern-loaders)
[![gzipped size](https://img.shields.io/bundlephobia/minzip/modern-loaders?style=flat-square&color=22d3ee&label=gzipped)](https://bundlephobia.com/package/modern-loaders)
[![types](https://img.shields.io/npm/types/modern-loaders?style=flat-square&color=8b5cf6)](https://www.npmjs.com/package/modern-loaders)
[![license](https://img.shields.io/npm/l/modern-loaders?style=flat-square&color=f59e0b)](./LICENSE)
[![GitHub](https://img.shields.io/github/stars/Suman1999-hub/modern-loaders-package?style=flat-square&color=64748b&label=GitHub)](https://github.com/Suman1999-hub/modern-loaders-package)

```bash
npm install modern-loaders
```

[![Browse all 336 loaders live](https://img.shields.io/badge/%E2%86%92%20Browse%20all%20336%20loaders%20live-6366f1?style=for-the-badge&labelColor=6366f1)](https://modern-loaders.netlify.app/)

</div>

---

## What is modern-loaders?

A library of **336 loading animations** for React, all behind a single
`<Loader />` component.

**The problem.** Every app needs loading states. Building them by hand means
writing CSS keyframes again and again. Most loader packages give you a handful
of spinners, or pull in a JavaScript animation runtime you did not ask for.

**This package.** Pick a loader by name, set the size, speed and colours if you
want, and ship. Every animation is plain CSS, so nothing runs on the main
thread and there is nothing to install alongside it.

### Why developers use it

- **336 variants across 36 families** — abstract families (spinners, dots, bars, shapes, neon, liquid, glitch, particles…) plus concrete ones that match what your app is actually doing: medical, space, weather, technology, AI, communication, security, developer, data, finance, transport, food, creative, physics, gaming.
- **Three props to learn.** `size`, `speed`, `colors`. Everything else has a sensible default.
- **Zero dependencies.** ~4 kB of JS. All motion is CSS keyframes — no rAF loop, no JS on the animation path.
- **Fully typed.** `variant` autocompletes every id, and a typo is a compile error.
- **Accessible by default.** Each loader is a labelled `role="status"` and honours `prefers-reduced-motion`.
- **Themeable without a build step.** Every value is a CSS custom property you can override.

---

## Installation

```bash
npm install modern-loaders
```

<details>
<summary>Using yarn or pnpm?</summary>

```bash
yarn add modern-loaders
```

```bash
pnpm add modern-loaders
```

</details>

**No CSS import needed.** The stylesheet is bundled and injects itself — nothing
to configure in Vite, Next.js, CRA, or Tailwind.

<sub>If your bundler strips side-effect imports, add
<code>import "modern-loaders/styles.css"</code>.</sub>

---

## Quick Start

### 1. Render a loader

```tsx
import { Loader } from "modern-loaders";

export default function App() {
  return <Loader />;
}
```

### 2. Pick a variant

Every loader has a name. Pass it as `variant`:

```tsx
<Loader variant="wave" />
```

### 3. Customise it

Set the size, speed and colours:

```tsx
<Loader
  variant="wave"
  size={72}
  speed={0.8}
  colors={["#f97316", "#ef4444", "#a855f7"]}
/>
```

Not sure which one to pick?
[**Browse all 336 in the live gallery →**](https://modern-loaders.netlify.app/)

---

## Contents

- [Choosing a loader](#choosing-a-loader)
- [Recipes](#recipes)
- [Customization](#customization)
- [API](#api)
- [All 336 variants](#all-336-variants)
- [Accessibility](#accessibility)
- [Bundle size](#bundle-size)
- [Browser support](#browser-support)
- [Contributing](#contributing)
- [License](#license)

---

## Choosing a loader

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

---

## Recipes

### A button that keeps its width while loading

```tsx
<button disabled={busy}>
  {busy ? (
    <Loader
      variant="pulse-dots"
      size={16}
      colors={["currentColor"]}
      label={null}
    />
  ) : (
    "Save"
  )}
</button>
```

`colors={["currentColor"]}` inherits the button's own text colour.
`label={null}` stops screen readers announcing "Loading" twice when the button
already conveys it.

### A skeleton shaped like the thing you're waiting for

```tsx
{isLoading ? (
  <Loader
    variant="sk-card"
    size={64}
  />
) : (
  <ArticleCard {...article} />
)}
```

### A full-page overlay

```tsx
<div
  style={{
    position: "fixed",
    inset: 0,
    display: "grid",
    placeItems: "center",
  }}
>
  <Loader
    variant="aurora"
    size={80}
    label="Loading your dashboard"
  />
</div>
```

### Build your own picker

The manifest is exported, so you can map over it:

```tsx
import { VARIANTS, Loader } from "modern-loaders";

VARIANTS
  .filter((variant) => variant.group === "Skeletons")
  .map((variant) => (
    <Loader
      key={variant.id}
      variant={variant.id}
    />
  ));
```

---

## Customization

The `colors` prop covers most cases. For anything else, override the CSS custom
properties — they cascade, so one rule themes a whole subtree:

```css
.dashboard {
  /* palette */
  --c1: #6366f1;
  --c2: #ec4899;
  --c3: #22d3ee;

  /* size and timing */
  --size: 64px;
  --speed: .9s;

  /* rail behind progress bars */
  --track: #1e1e2e;

  /* shared gradient */
  --grad: linear-gradient(
    90deg,
    var(--c1),
    var(--c3)
  );
}
```

`--track` and `--grad` derive from `--c1`–`--c3` automatically; set them
directly for finer control.

---

## API

### Props

| prop | type | default | description |
|---|---|---|---|
| `variant` | `LoaderVariant` | `"aurora"` | Which loader to render — any of the 336 ids below. |
| `size` | `number \| string` | `48` | Overall size. A number means pixels; strings pass through (`"3rem"`). |
| `speed` | `number \| string` | `1` | Base duration. A number means seconds; lower is faster. |
| `colors` | `string[]` | indigo / pink / cyan | One to three colours. Fewer are cycled, so a single colour gives a clean monochrome loader. |
| `label` | `string \| null` | `"Loading"` | Screen-reader text. Pass `null` to mark the loader decorative. |

Every other `div` prop — `className`, `style`, `id`, `onClick`, `data-*` —
passes straight through.

### Exports

| export | what it is |
|---|---|
| `Loader` | The component. |
| `VARIANTS` | Manifest of all 336: `{ id, label, group, cells }`. |
| `LOADER_VARIANTS` | Just the 336 ids, in display order. |
| `GROUPS` | The 36 families: `{ name, description }`. |

`Loader` is the main export. The original ten also have named wrappers, kept for
backward compatibility with 1.0.x:

```tsx
import {
  Aurora, Orbit, Rings, Wave, Bars,
  Blob, Cube, Spiral, Bar, Grid,
} from "modern-loaders";
```

Everything else is reached with `<Loader variant="…" />`. Two hundred named
exports would bloat the API surface for no real gain, and `variant`
autocompletes just as well.

### TypeScript

Types ship with the package — no `@types` install:

```tsx
import type {
  LoaderProps,
  LoaderVariant,
  LoaderGroup,
  VariantMeta,
} from "modern-loaders";

// a union of all 336 ids; typos fail to compile
const variant: LoaderVariant = "aurora";

// wrap Loader without re-declaring its props
function Busy(props: LoaderProps) {
  return <Loader {...props} />;
}
```

---

## All 336 variants

Every id maps to a `.ldr--<id>` CSS class. The tables below are the full
reference; to *see* them moving, use the [live gallery](https://modern-loaders.netlify.app/) — it renders
every variant with your own size, speed and colours, and copies the JSX for you.

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

<details>
<summary><b>Medical</b> · 8 — Physiology, diagnostics and the clinic.</summary>

| variant | what it looks like |
|---|---|
| `ecg` | a heart trace drawing itself across a monitor grid |
| `vitals` | three traces running at three different rhythms |
| `lungs` | a pair of lobes filling and emptying with the breath |
| `capsule` | a pill parting to release its granules, then closing |
| `syringe` | the plunger going down and a bead forming at the needle |
| `microscope` | a field of view drifting in and out of focus |
| `cell-divide` | one cell pinching in two, over and over |
| `blood-flow` | corpuscles carried along a vessel |

</details>

<details>
<summary><b>Space</b> · 8 — Astrophysics — discs, orbits, and things igniting.</summary>

| variant | what it looks like |
|---|---|
| `black-hole` | an accretion disc tilted around a lensed event horizon |
| `eclipse` | one body crossing another, corona flaring at totality |
| `star-birth` | a dust cloud collapsing, igniting, and dispersing |
| `constellation` | stars joined by lines drawn one segment at a time |
| `meteor-shower` | streaks raking across the sky on a shared diagonal |
| `solar-system` | planets keeping their own year on nested orbits |
| `rocket` | a climb with a flickering plume and stars falling past |
| `pulsar` | twin beams raking round from a spinning neutron star |

</details>

<details>
<summary><b>Nature</b> · 9 — Growing, burning, blowing and blooming.</summary>

| variant | what it looks like |
|---|---|
| `bloom-flower` | petals unfolding from a bud and closing again |
| `sprout` | a seedling pushing up and unfurling two leaves |
| `tree-grow` | a trunk throwing out branches, tip by tip |
| `smoke` | puffs curling up and thinning out |
| `tornado` | a funnel of debris touching down and swaying |
| `wind` | gusts streaming past at their own pace |
| `butterfly` | wings beating with a little perspective |
| `honeycomb` | cells capped one after another |
| `rainbow` | bands arcing in from the outside |

</details>

<details>
<summary><b>Weather</b> · 7 — Sky conditions, from a clear sun to a full storm.</summary>

| variant | what it looks like |
|---|---|
| `cloud-form` | puffs gathering into one cloud, then breaking apart |
| `storm` | a dark cloud dropping rain, lit from inside every few beats |
| `fog` | layered banks sliding past each other |
| `sun-clouds` | cloud cover drifting over a slow sun |
| `frost` | a crystal growing its six arms and their side branches |
| `sunbeam` | shafts of light swinging through a gap |
| `thermometer` | the column climbing and falling back |

</details>

<details>
<summary><b>Technology</b> · 9 — Hardware doing its job — power, radio, silicon, disks.</summary>

| variant | what it looks like |
|---|---|
| `battery` | cells charging in turn behind a travelling bolt |
| `wifi` | arcs acquiring outward from the source |
| `signal-tower` | a mast pushing rings out to both sides |
| `cpu` | a die working away behind its pins |
| `server-rack` | units blinking under a maintenance sweep |
| `packets` | traffic queueing at one node and arriving at the other |
| `data-transfer` | two devices trading rows in both directions at once |
| `hard-drive` | a platter spinning under a seeking head |
| `power-plug` | prongs seating into a socket and the line coming alive |

</details>

<details>
<summary><b>AI</b> · 8 — Models thinking: layers, signals, tokens and clusters.</summary>

| variant | what it looks like |
|---|---|
| `neural-net` | layers firing left to right along lit connections |
| `ai-think` | thoughts rippling out inside a soft brain shape |
| `synapse` | a signal jumping the cleft and lighting the far terminal |
| `ml-train` | gradient descent rolling into the bottom of the bowl |
| `token-stream` | words landing one at a time as they are generated |
| `attention` | a focus window sliding along the context |
| `robot-eyes` | a machine sweeping its gaze, blinking now and then |
| `embedding` | scattered points settling into their clusters |

</details>

<details>
<summary><b>Communication</b> · 8 — Messages leaving, arriving, and being understood.</summary>

| variant | what it looks like |
|---|---|
| `message-send` | a bubble launching out of the composer |
| `delivery-ticks` | sent, delivered, then read |
| `envelope` | the flap lifting and the letter sliding out |
| `bell` | a notification swinging in with its badge |
| `chat-threads` | a conversation filling in, turn by turn |
| `voice-wave` | a rendered clip with the playhead running over it |
| `mic-listen` | a capsule picking up level rings |
| `translate` | one script resolving into another |

</details>

<details>
<summary><b>Security</b> · 8 — Locks, scans and ciphers doing their checks.</summary>

| variant | what it looks like |
|---|---|
| `padlock` | the shackle lifting clear and dropping back |
| `fingerprint` | ridges read one pass at a time |
| `face-scan` | a mesh mapping itself onto a face outline |
| `qr-scan` | a code resolving under the reader |
| `encrypt` | plaintext blocks scrambling into cipher behind a wavefront |
| `key-turn` | a key going in and throwing the lock |
| `otp-code` | a one-time code arriving digit by digit |
| `vault` | a combination dial hunting for each number |

</details>

<details>
<summary><b>Developer</b> · 8 — The inner loop: compile, branch, build, ship.</summary>

| variant | what it looks like |
|---|---|
| `code-compile` | source rows collapsing into compiled blocks |
| `git-branch` | work splitting off the trunk and merging back in |
| `pipeline` | a build moving through its stages |
| `npm-install` | packages dropping in and stacking up |
| `container` | image layers stacking, then the container coming up |
| `k8s-pods` | replicas retiring while their replacements come up |
| `bug-fix` | a lens sweeping the file until the bad line goes green |
| `code-diff` | a patch landing, removals out and additions in |

</details>

<details>
<summary><b>Data</b> · 9 — Stores queried, files parsed, records moved.</summary>

| variant | what it looks like |
|---|---|
| `db-query` | a scan running down the store and rows coming back |
| `db-sync` | two stores reconciling records in both directions |
| `scatter-plot` | samples landing, then the fit drawn through them |
| `spreadsheet` | cells recalculating a row at a time |
| `file-scan` | a page read line by line under the head |
| `folder-scan` | folders opened and counted one after another |
| `cloud-sync` | a device and the cloud keeping each other current |
| `backup` | documents filed into the archive, which then seals |
| `data-funnel` | a wide intake narrowing to what actually gets through |

</details>

<details>
<summary><b>Finance</b> · 6 — Money changing hands and being checked.</summary>

| variant | what it looks like |
|---|---|
| `payment-card` | a card read, checked, and approved |
| `coin-flip` | a coin turning end over end and settling |
| `cart` | items dropped into the basket, one after another |
| `receipt` | a slip printing out line by line |
| `stock-candles` | a session printing candle by candle |
| `money-transfer` | funds arcing from one account to the other |

</details>

<details>
<summary><b>Transport</b> · 7 — Getting there: fixes, routes, wheels and wings.</summary>

| variant | what it looks like |
|---|---|
| `gps-locate` | a pin dropping and the fix tightening around it |
| `route-calc` | a path being solved between two stops |
| `compass` | a needle hunting and settling on north |
| `truck` | a delivery run with the road moving underneath |
| `package-track` | a parcel clearing each checkpoint on the way |
| `plane-path` | a flight tracing its great circle between cities |
| `traffic-light` | the signal running its full phase |

</details>

<details>
<summary><b>Food</b> · 6 — Things brewing, baking, tossing and popping.</summary>

| variant | what it looks like |
|---|---|
| `coffee-brew` | the cup filling drip by drip |
| `oven-bake` | a loaf rising behind the oven door |
| `pizza-slices` | slices swinging back into a whole |
| `pan-flip` | a toss, a turn, and a catch |
| `blender` | the jug pulling everything into the vortex |
| `toaster` | the slices browning and springing up |

</details>

<details>
<summary><b>Creative</b> · 8 — Studio tools: pencils, brushes, lenses and type.</summary>

| variant | what it looks like |
|---|---|
| `pencil-draw` | a line laid down and rubbed out again |
| `brush-stroke` | a loaded brush laying a wet band of colour |
| `palette` | wells of paint, each lifted as it is picked up |
| `camera-focus` | the iris stopping down and pulling focus |
| `film-strip` | frames running past the gate |
| `vinyl` | the record turning under the arm |
| `book-flip` | pages turning one at a time |
| `typeset` | glyphs settling into a headline and kerning true |

</details>

<details>
<summary><b>Physics</b> · 8 — Fields, charge, gravity and standing waves.</summary>

| variant | what it looks like |
|---|---|
| `magnetic-field` | flux running pole to pole |
| `lightning` | a bolt forking down and lighting the whole sky |
| `electric-arc` | a discharge jumping the gap and jittering |
| `gravity-well` | a mass denting the grid and dragging a body round |
| `interference` | two sources and the pattern where they meet |
| `pendulum-wave` | different lengths drifting in and out of phase |
| `newton-disc` | segments blurring toward white as the disc winds up |
| `resonance` | a string stepping up through its harmonics |

</details>

<details>
<summary><b>Gaming</b> · 7 — HUD and pickup motion lifted from games.</summary>

| variant | what it looks like |
|---|---|
| `health-bar` | damage chipping away, then a heal |
| `dice-roll` | a die tumbling and coming to rest |
| `level-up` | the bar topping out and the badge landing |
| `coin-collect` | pickups spinning up into the counter |
| `chomp` | a mouth working its way along the row |
| `sprite-march` | a squad stepping along in formation |
| `mana-orb` | a reservoir refilling behind glass |

</details>

---

## Accessibility

- Each loader renders as `role="status"` with `aria-label`, so assistive tech announces it once.
- A decorative loader — one sitting beside visible "Loading…" text — should take `label={null}`, which switches it to `aria-hidden` and prevents a double announcement.
- Under `prefers-reduced-motion: reduce`, every animation slows to a single calm 4s linear cycle rather than stopping. A frozen loader reads as a crashed app, which is worse than gentle motion.

---

## Bundle size

| | raw | gzipped |
|---|---|---|
| JS | ~29 kB | **~7 kB** |
| CSS (all 336 variants) | ~321 kB | **~47 kB** |

One caveat, stated plainly: **the CSS is not tree-shakeable.** Class-based
styles cannot be dead-code eliminated, so importing a single variant still ships
the sheet for all 336. At ~47 kB gzipped that is real weight, so if you only need
a handful it is worth opting out: copy
the specific `.ldr--*` blocks out of [`src/styles/`](./src/styles) into your own
CSS and skip the package — each block is self-contained apart from the shared
keyframes in [`00-base.css`](./src/styles/00-base.css).

---

## Browser support

Chrome 111+ · Safari 16.4+ · Firefox 113+ — the floor is set by `color-mix()`,
alongside `mask`, `aspect-ratio`, `clip-path`, and the individual `translate` /
`rotate` / `scale` properties. Older browsers degrade to solid shapes rather
than breaking.

Five variants — `neon-arc`, `pie`, `progress-ring`, `gradient-border`,
`color-cycle` — animate a registered custom property via `@property`
(Firefox 128+). Every use passes a fallback, so below that they render a
sensible static frame instead of disappearing.

---

## Contributing

```bash
# Live showcase with search and filters
npm run dev

# Typecheck, then build dist/
npm run build

# Build the static showcase
npm run build:demo
```

`build` emits ESM + CJS + `.d.ts` + CSS into `dist/`. `build:demo` writes the
static showcase to `dist-demo/`, which is what gets deployed to
[modern-loaders.netlify.app](https://modern-loaders.netlify.app/).

Adding a variant takes two edits: a `.ldr--<id>` block in `src/styles/`, and a
row in [`src/variants.ts`](./src/variants.ts). The component, the types, the
README catalogue and the showcase all read from that one manifest — `cells` is
how many `<span>` children the CSS expects.

Two rules keep the motion composable inside a variant: put a whole radial chain
(`rotate(…) translateY(…)`) in a single `transform` so the offset happens in the
rotated frame, and reach for the standalone `translate` / `rotate` / `scale`
properties when an element already animates `transform` — they compose instead
of overwriting it.

---

## License

ISC © suman

<div align="center">
<sub><a href="https://modern-loaders.netlify.app/">Live gallery</a> · <a href="https://www.npmjs.com/package/modern-loaders">npm</a> · <a href="https://github.com/Suman1999-hub/modern-loaders-package">GitHub</a></sub>
</div>
