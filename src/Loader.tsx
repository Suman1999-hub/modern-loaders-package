import type { CSSProperties, HTMLAttributes } from "react";
import { VARIANTS, type LoaderVariant } from "./variants";
import "./loaders.css";

export { VARIANTS, GROUPS } from "./variants";
export type { LoaderVariant, LoaderGroup, VariantMeta } from "./variants";

/** Every variant id, in display order. */
export const LOADER_VARIANTS = VARIANTS.map((v) => v.id) as readonly LoaderVariant[];

/** How many <span> children each variant's CSS expects. */
const CELLS = Object.fromEntries(VARIANTS.map((v) => [v.id, v.cells])) as Record<
  LoaderVariant,
  number
>;

export interface LoaderProps extends Omit<HTMLAttributes<HTMLDivElement>, "color"> {
  /** Which loader to render. @default "aurora" */
  variant?: LoaderVariant;
  /** Box size. A number is treated as pixels. @default 48 */
  size?: number | string;
  /** Base animation duration. A number is treated as seconds. @default 1 */
  speed?: number | string;
  /**
   * One to three colors. Fewer than three are cycled, so a single color still
   * produces a coherent (monochrome) loader.
   */
  colors?: string[];
  /** Announced to screen readers. Pass `null` to render the loader as decorative. */
  label?: string | null;
}

const unit = (v: number | string | undefined, suffix: string) =>
  typeof v === "number" ? `${v}${suffix}` : v;

export function Loader({
  variant = "aurora",
  size = 48,
  speed = 1,
  colors,
  label = "Loading",
  className,
  style,
  ...rest
}: LoaderProps) {
  const vars: CSSProperties & Record<string, string | undefined> = {
    "--size": unit(size, "px"),
    "--speed": unit(speed, "s"),
  };

  if (colors?.length) {
    // Cycle whatever was given across the three slots the CSS reads.
    vars["--c1"] = colors[0];
    vars["--c2"] = colors[1 % colors.length];
    vars["--c3"] = colors[2 % colors.length];
  }

  return (
    <div
      {...rest}
      className={["ldr", `ldr--${variant}`, className].filter(Boolean).join(" ")}
      style={{ ...vars, ...style }}
      role={label ? "status" : undefined}
      aria-label={label ?? undefined}
      aria-hidden={label ? undefined : true}
    >
      {Array.from({ length: CELLS[variant] ?? 0 }, (_, i) => (
        <span key={i} />
      ))}
    </div>
  );
}

/**
 * Named wrappers for the original ten variants, kept for backward compatibility
 * with 1.0.x. The other 90 are reached through `<Loader variant="…" />` — a hundred
 * named exports would bloat the API surface for no real gain.
 */
type VariantProps = Omit<LoaderProps, "variant">;

export const Aurora = (p: VariantProps) => <Loader variant="aurora" {...p} />;
export const Orbit  = (p: VariantProps) => <Loader variant="orbit"  {...p} />;
export const Rings  = (p: VariantProps) => <Loader variant="rings"  {...p} />;
export const Wave   = (p: VariantProps) => <Loader variant="wave"   {...p} />;
export const Bars   = (p: VariantProps) => <Loader variant="bars"   {...p} />;
export const Blob   = (p: VariantProps) => <Loader variant="blob"   {...p} />;
export const Cube   = (p: VariantProps) => <Loader variant="cube"   {...p} />;
export const Spiral = (p: VariantProps) => <Loader variant="spiral" {...p} />;
export const Bar    = (p: VariantProps) => <Loader variant="bar"    {...p} />;
export const Grid   = (p: VariantProps) => <Loader variant="grid"   {...p} />;
