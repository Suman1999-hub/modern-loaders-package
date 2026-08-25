import { useMemo, useEffect, useState } from "react";
import { Loader, VARIANTS, GROUPS, type LoaderVariant } from "../src";

const PALETTES = [
  { name: "Nebula", colors: ["#6366f1", "#ec4899", "#22d3ee"] },
  { name: "Sunset", colors: ["#f97316", "#ef4444", "#a855f7"] },
  { name: "Lagoon", colors: ["#06b6d4", "#10b981", "#84cc16"] },
  { name: "Candy",  colors: ["#f472b6", "#c084fc", "#38bdf8"] },
  { name: "Ember",  colors: ["#fbbf24", "#f43f5e", "#8b5cf6"] },
  { name: "Mono",   colors: ["#818cf8"] },
];

export function App() {
  const [size, setSize] = useState(52);
  const [speed, setSpeed] = useState(1);
  const [palette, setPalette] = useState(PALETTES[0]);
  const [dark, setDark] = useState(true);
  const [group, setGroup] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return VARIANTS.filter(
      (v) =>
        (group === "All" || v.group === group) &&
        (!q || v.id.includes(q) || v.label.toLowerCase().includes(q))
    );
  }, [group, query]);

  const copy = (id: LoaderVariant) => {
    navigator.clipboard?.writeText(`<Loader variant="${id}" />`);
    setCopied(id);
    setTimeout(() => setCopied(null), 1200);
  };

  return (
    <>
      <header>
        <h1>Modern Loaders</h1>
        <p className="sub">
          {VARIANTS.length} colorful, animated React loaders across {GROUPS.length} families.
          Pure CSS, zero runtime dependencies.
        </p>

        <div className="controls">
          <input
            className="search"
            type="search"
            placeholder="Search loaders…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <label>
            Size
            <input type="range" min={24} max={110} value={size}
                   onChange={(e) => setSize(+e.target.value)} />
            <b>{size}px</b>
          </label>
          <label>
            Speed
            <input type="range" min={0.3} max={3} step={0.1} value={speed}
                   onChange={(e) => setSpeed(+e.target.value)} />
            <b>{speed.toFixed(1)}s</b>
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
          <button className="ghost" onClick={() => setDark((d) => !d)}>
            {dark ? "Light" : "Dark"}
          </button>
        </div>

        <nav className="tabs">
          {["All", ...GROUPS.map((g) => g.name)].map((name) => (
            <button
              key={name}
              className={"tab" + (group === name ? " on" : "")}
              onClick={() => setGroup(name)}
            >
              {name}
              <span className="count">
                {name === "All" ? VARIANTS.length : VARIANTS.filter((v) => v.group === name).length}
              </span>
            </button>
          ))}
        </nav>

        {group !== "All" && (
          <p className="groupnote">{GROUPS.find((g) => g.name === group)?.description}</p>
        )}
      </header>

      <main className="grid">
        {shown.map((v) => (
          <article className="card" key={v.id}>
            <div className="stage">
              <Loader variant={v.id} size={size} speed={speed} colors={palette.colors} />
            </div>
            <div className="meta">
              <span className="name">{v.label}</span>
              <button className="code" onClick={() => copy(v.id)} title="Copy JSX">
                {copied === v.id ? "copied!" : v.id}
              </button>
            </div>
          </article>
        ))}
        {!shown.length && <p className="empty">No loader matches “{query}”.</p>}
      </main>
    </>
  );
}
