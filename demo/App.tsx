import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Loader, VARIANTS, GROUPS, type LoaderVariant, type VariantMeta } from "../src";

type Palette = { name: string; colors: string[] };

const PALETTES: Palette[] = [
  { name: "Nebula", colors: ["#6366f1", "#ec4899", "#22d3ee"] },
  { name: "Sunset", colors: ["#f97316", "#ef4444", "#a855f7"] },
  { name: "Lagoon", colors: ["#06b6d4", "#10b981", "#84cc16"] },
  { name: "Candy",  colors: ["#f472b6", "#c084fc", "#38bdf8"] },
  { name: "Ember",  colors: ["#fbbf24", "#f43f5e", "#8b5cf6"] },
  { name: "Slate",  colors: ["#94a3b8", "#64748b", "#cbd5e1"] },
  { name: "Mono",   colors: ["#818cf8"] },
];

const CATEGORIES = ["All", ...GROUPS.map((g) => g.name)];

const jsx = (id: string, size: number, speed: number, colors: string[]) =>
  `<Loader\n  variant="${id}"\n  size={${size}}\n  speed={${speed}}\n  colors={[${colors
    .map((c) => `"${c}"`)
    .join(", ")}]}\n/>`;

/** Copies text, falling back to a hidden textarea where the async API is blocked. */
async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.cssText = "position:fixed;opacity:0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  }
}

/**
 * Cards only mount their loader once they are near the viewport. With 212 live
 * CSS animations on one page that is the difference between a smooth scroll and
 * a stuttering one — and it costs no animation frames of its own.
 */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    if (seen) return;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);

  return [ref, seen] as const;
}

function useCopyFlag() {
  const [copied, setCopied] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const flag = useCallback(async (key: string, text: string) => {
    await copyText(text);
    setCopied(key);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(null), 1400);
  }, []);

  useEffect(() => () => window.clearTimeout(timer.current), []);
  return [copied, flag] as const;
}

function Card({
  v,
  size,
  speed,
  colors,
  copied,
  onCopy,
  onOpen,
}: {
  v: VariantMeta;
  size: number;
  speed: number;
  colors: string[];
  copied: boolean;
  onCopy: (id: LoaderVariant) => void;
  onOpen: (id: LoaderVariant) => void;
}) {
  const [ref, seen] = useInView<HTMLElement>();

  return (
    <article className="card" ref={ref}>
      <button className="stage" onClick={() => onOpen(v.id)} aria-label={`Open ${v.label} preview`}>
        {seen && <Loader variant={v.id} size={size} speed={speed} colors={colors} label={null} />}
      </button>
      <div className="meta">
        <span className="name">{v.label}</span>
        <button
          className={"chip-copy" + (copied ? " ok" : "")}
          onClick={() => onCopy(v.id)}
          title={`Copy variant="${v.id}"`}
        >
          {copied ? "copied" : v.id}
        </button>
      </div>
    </article>
  );
}

function Details({
  v,
  index,
  total,
  colors,
  palette,
  onPalette,
  onClose,
  onStep,
}: {
  v: VariantMeta;
  index: number;
  total: number;
  colors: string[];
  palette: string;
  onPalette: (p: Palette) => void;
  onClose: () => void;
  onStep: (delta: number) => void;
}) {
  const [size, setSize] = useState(96);
  const [speed, setSpeed] = useState(1);
  const [surface, setSurface] = useState<"auto" | "light" | "dark">("auto");
  const [copied, flag] = useCopyFlag();
  const closeBtn = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onStep]);

  // It calls itself a dialog, so it should behave like one: take focus on open,
  // hand it back to whatever opened it on close.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeBtn.current?.focus();
    document.body.classList.add("locked");
    return () => {
      document.body.classList.remove("locked");
      opener?.focus?.();
    };
  }, []);

  const code = jsx(v.id, size, speed, colors);

  return (
    <div className="sheet-wrap" role="dialog" aria-modal="true" aria-label={`${v.label} loader`}>
      <div className="scrim" onClick={onClose} />
      <div className="sheet">
        <header className="sheet-head">
          <div>
            <h2>{v.label}</h2>
            <p className="sheet-sub">
              <span className="tag">{v.group}</span>
              <code>{v.id}</code>
            </p>
          </div>
          <div className="sheet-nav">
            <button className="icon" onClick={() => onStep(-1)} aria-label="Previous loader">‹</button>
            <span className="pos">{index + 1} / {total}</span>
            <button className="icon" onClick={() => onStep(1)} aria-label="Next loader">›</button>
            <button className="icon close" ref={closeBtn} onClick={onClose} aria-label="Close">✕</button>
          </div>
        </header>

        <div className={"sheet-stage surface-" + surface}>
          <Loader variant={v.id} size={size} speed={speed} colors={colors} />
        </div>

        <div className="sheet-controls">
          <label>
            Size <b>{size}px</b>
            <input type="range" min={20} max={180} value={size}
                   onChange={(e) => setSize(+e.target.value)} />
          </label>
          <label>
            Speed <b>{speed.toFixed(1)}s</b>
            <input type="range" min={0.2} max={4} step={0.1} value={speed}
                   onChange={(e) => setSpeed(+e.target.value)} />
          </label>
          <div className="seg" role="group" aria-label="Preview surface">
            {(["auto", "light", "dark"] as const).map((s) => (
              <button key={s} className={surface === s ? "on" : ""} onClick={() => setSurface(s)}>
                {s}
              </button>
            ))}
          </div>
          <div className="palettes">
            {PALETTES.map((p) => (
              <button
                key={p.name}
                className={"swatch" + (p.name === palette ? " on" : "")}
                title={p.name}
                aria-label={p.name}
                onClick={() => onPalette(p)}
                style={{
                  background: `linear-gradient(135deg, ${p.colors.join(", ")}${
                    p.colors.length === 1 ? `, ${p.colors[0]}` : ""
                  })`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="snippets">
          <div className="snippet">
            <div className="snippet-head">
              <span>Import</span>
              <button onClick={() => flag("imp", `import { Loader } from "modern-loaders";`)}>
                {copied === "imp" ? "copied" : "copy"}
              </button>
            </div>
            <pre>{`import { Loader } from "modern-loaders";`}</pre>
          </div>
          <div className="snippet">
            <div className="snippet-head">
              <span>Usage</span>
              <button onClick={() => flag("jsx", code)}>{copied === "jsx" ? "copied" : "copy"}</button>
            </div>
            <pre>{code}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export function App() {
  const [size, setSize] = useState(52);
  const [speed, setSpeed] = useState(1);
  const [palette, setPalette] = useState<Palette>(PALETTES[0]);
  const [dark, setDark] = useState(true);
  const [group, setGroup] = useState("All");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<LoaderVariant | null>(null);
  const [copied, flag] = useCopyFlag();
  const search = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("ml-theme");
    if (stored) setDark(stored === "dark");
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("ml-theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = document.activeElement?.tagName === "INPUT";
      if ((e.key === "/" && !typing) || (e.key === "k" && (e.metaKey || e.ctrlKey))) {
        e.preventDefault();
        search.current?.focus();
        search.current?.select();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return VARIANTS.filter(
      (v) =>
        (group === "All" || v.group === group) &&
        (!q ||
          v.id.includes(q) ||
          v.label.toLowerCase().includes(q) ||
          v.group.toLowerCase().includes(q))
    );
  }, [group, query]);

  // VARIANTS is stored in group order, so filtering keeps runs contiguous.
  const sections = useMemo(() => {
    const out: { group: string; items: VariantMeta[] }[] = [];
    for (const v of shown) {
      const last = out[out.length - 1];
      if (last && last.group === v.group) last.items.push(v);
      else out.push({ group: v.group, items: [v] });
    }
    return out;
  }, [shown]);

  const openIndex = open ? shown.findIndex((v) => v.id === open) : -1;
  const step = useCallback(
    (delta: number) => {
      if (!shown.length) return;
      const next = (openIndex + delta + shown.length) % shown.length;
      setOpen(shown[next].id);
    },
    [openIndex, shown]
  );

  // A variant filtered out from under an open sheet should close it, not strand it.
  useEffect(() => {
    if (open && openIndex === -1) setOpen(null);
  }, [open, openIndex]);

  const copyVariant = useCallback(
    (id: LoaderVariant) => flag(id, `<Loader variant="${id}" />`),
    [flag]
  );

  return (
    <>
      <header className="topbar">
        <div className="wrap topbar-in">
          <a className="brand" href="#top">
            <Loader variant="aurora" size={22} speed={2.4} label={null} />
            <span>modern-loaders</span>
          </a>
          <div className="topbar-actions">
            <span className="pill">v1.2</span>
            <button className="ghost" onClick={() => setDark((d) => !d)}>
              {dark ? "☀ Light" : "☾ Dark"}
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero wrap">
          <h1>
            {VARIANTS.length} loaders.
            <br />
            <span className="grad">One component.</span>
          </h1>
          <p className="lede">
            Pure-CSS motion across {GROUPS.length} families — spinners, liquid, glitch, particles,
            neon, elastic, and more. Zero runtime dependencies, fully typed, and every one of them
            respects <code>prefers-reduced-motion</code>.
          </p>
          <div className="install">
            <code>npm i modern-loaders</code>
            <button onClick={() => flag("install", "npm i modern-loaders")}>
              {copied === "install" ? "copied" : "copy"}
            </button>
          </div>
        </section>

        <div className="toolbar-shell">
          <div className="wrap toolbar">
            <div className="searchbox">
              <span aria-hidden="true">⌕</span>
              <input
                ref={search}
                type="search"
                placeholder="Search 212 loaders…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <kbd>/</kbd>
            </div>
            <label className="slider">
              Size <b>{size}</b>
              <input type="range" min={20} max={120} value={size}
                     onChange={(e) => setSize(+e.target.value)} />
            </label>
            <label className="slider">
              Speed <b>{speed.toFixed(1)}s</b>
              <input type="range" min={0.3} max={3} step={0.1} value={speed}
                     onChange={(e) => setSpeed(+e.target.value)} />
            </label>
            <div className="palettes">
              {PALETTES.map((p) => (
                <button
                  key={p.name}
                  className={"swatch" + (p.name === palette.name ? " on" : "")}
                  title={p.name}
                  aria-label={p.name}
                  onClick={() => setPalette(p)}
                  style={{
                    background: `linear-gradient(135deg, ${p.colors.join(", ")}${
                      p.colors.length === 1 ? `, ${p.colors[0]}` : ""
                    })`,
                  }}
                />
              ))}
            </div>
            <button
              className="ghost"
              onClick={() => setOpen(VARIANTS[Math.floor(Math.random() * VARIANTS.length)].id)}
            >
              Surprise me
            </button>
          </div>

          <nav className="rail-shell" aria-label="Categories">
            <div className="wrap rail">
              {CATEGORIES.map((name) => (
                <button
                  key={name}
                  className={"tab" + (group === name ? " on" : "")}
                  onClick={() => setGroup(name)}
                >
                  {name}
                  <span className="count">
                    {name === "All"
                      ? VARIANTS.length
                      : VARIANTS.filter((v) => v.group === name).length}
                  </span>
                </button>
              ))}
            </div>
          </nav>
        </div>

        <div className="wrap results">
          <p className="resultline">
            <b>{shown.length}</b> {shown.length === 1 ? "loader" : "loaders"}
            {query && <> matching “{query}”</>}
            {group !== "All" && <> in {group}</>}
          </p>

          {sections.map(({ group: g, items }) => (
            <section className="section" key={g}>
              <div className="section-head">
                <h2>{g}</h2>
                <p>{GROUPS.find((x) => x.name === g)?.description}</p>
              </div>
              <div className="grid">
                {items.map((v) => (
                  <Card
                    key={v.id}
                    v={v}
                    size={size}
                    speed={speed}
                    colors={palette.colors}
                    copied={copied === v.id}
                    onCopy={copyVariant}
                    onOpen={setOpen}
                  />
                ))}
              </div>
            </section>
          ))}

          {!shown.length && (
            <div className="empty">
              <Loader variant="ring-thin" size={40} colors={palette.colors} label={null} />
              <p>Nothing matches “{query}”.</p>
              <button className="ghost" onClick={() => { setQuery(""); setGroup("All"); }}>
                Clear filters
              </button>
            </div>
          )}
        </div>
      </main>

      <footer className="wrap foot">
        <p>
          {VARIANTS.length} variants · {GROUPS.length} families · ~4 kB of JS · MIT-friendly ISC
          licence.
        </p>
        <p className="muted">
          Every loader is a labelled <code>role="status"</code> and slows down rather than stopping
          under <code>prefers-reduced-motion</code>.
        </p>
      </footer>

      {open && openIndex > -1 && (
        <Details
          v={shown[openIndex]}
          index={openIndex}
          total={shown.length}
          colors={palette.colors}
          palette={palette.name}
          onPalette={setPalette}
          onClose={() => setOpen(null)}
          onStep={step}
        />
      )}
    </>
  );
}
