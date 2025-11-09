// StadiumZoneMap.jsx
import { useEffect, useMemo, useState } from "react";

/** Config base de zonas (puedes editar posiciones/medidas/colores) */
const ZONES_BASE = [
  { id: "escenario", label: "ESCENARIO", color: "#111827", type: "rect", x: 350, y: 120, w: 300, h: 70, rx: 16 },
  { id: "platinum", label: "PLATINUM", color: "#ef4444", type: "rect", x: 270, y: 220, w: 460, h: 260, rx: 26 },
  { id: "vip",      label: "VIP",       color: "#38bdf8", type: "rect", x: 230, y: 500, w: 540, h: 200, rx: 100 },
  { id: "oriente",  label: "ORIENTE",   color: "#22c55e", type: "rect", x: 80,  y: 240, w: 160, h: 580, rx: 24 },
  { id: "occidente",label: "OCCIDENTE", color: "#22c55e", type: "rect", x: 760, y: 240, w: 160, h: 580, rx: 24 },
  { id: "norte",    label: "TRIBUNA NORTE", color: "#a78bfa", type: "rect", x: 230, y: 730, w: 540, h: 140, rx: 70 },
];

export default function StadiumZoneMap({
  frontLabel = "Frente",
  initialState,           // opcional: { [id]: boolean } → true=habilitado
  onChange,               // opcional: (enabledIds: string[], stateMap) => void
}) {
  const [zones, setZones] = useState(() =>
    ZONES_BASE.map(z => ({ ...z, enabled: initialState?.[z.id] ?? true }))
  );

  // Notificar cambios
  useEffect(() => {
    if (!onChange) return;
    const map = Object.fromEntries(zones.map(z => [z.id, z.enabled]));
    const enabledIds = zones.filter(z => z.enabled).map(z => z.id);
    onChange(enabledIds, map);
  }, [zones, onChange]);

  // Patrón de “deshabilitado”
  const patternId = "disabledPattern";

  /** Toggle de una zona */
  function toggleZone(id) {
    setZones(zs => zs.map(z => (z.id === id ? { ...z, enabled: !z.enabled } : z)));
  }

  /** Wrapper para cada zona con accesibilidad */
  function Zone({ z }) {
    const fill = z.enabled ? z.color : "#9ca3af"; // gris cuando está off
    return (
      <g
        role="button"
        tabIndex={0}
        aria-pressed={z.enabled}
        onClick={() => toggleZone(z.id)}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleZone(z.id); } }}
        className="cursor-pointer transition-opacity"
      >
        {z.type === "rect" ? (
          <rect x={z.x} y={z.y} width={z.w} height={z.h} rx={z.rx ?? 0}
                fill={fill} stroke="white" strokeWidth={4} />
        ) : null}
        {/* Rayado opcional encima cuando está deshabilitado */}
        {!z.enabled && (
          <rect x={z.x} y={z.y} width={z.w} height={z.h} rx={z.rx ?? 0}
                fill={`url(#${patternId})`} opacity={0.45} />
        )}
        {/* Etiqueta centrada */}
        <text
          x={z.x + z.w / 2}
          y={z.y + z.h / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          className="pointer-events-none select-none"
          fill={z.id === "escenario" ? "#fff" : "#111827"}
          style={{ fontWeight: 700, fontSize: z.id === "norte" ? 18 : 16 }}
        >
          {z.label}
        </text>
      </g>
    );
  }

  // Ancho de lienzo: 1000×1000 aprox para layout ovalado
  const viewBox = "0 0 1000 1000";

  // Bordes exteriores para dar sensación de estadio (opcional)
  const outer = useMemo(() => ({ cx: 500, cy: 520, rx: 460, ry: 420 }), []);
  const inner = useMemo(() => ({ cx: 500, cy: 520, rx: 430, ry: 390 }), []);

  return (
    <div className="flex flex-col gap-3">
      {/* Controles rápidos */}
      <div className="flex flex-wrap gap-2">
        {zones.map(z => (
          <button
            key={z.id}
            onClick={() => toggleZone(z.id)}
            className={`rounded-md border px-2 py-1 text-sm ${z.enabled ? "bg-zinc-100 dark:bg-zinc-800" : "opacity-60"}`}
            title={`Toggle ${z.label}`}
          >
            {z.label}
          </button>
        ))}
        <button
          onClick={() => setZones(ZONES_BASE.map(z => ({ ...z, enabled: true })))}
          className="ml-auto rounded-md border px-3 py-1 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          Habilitar todo
        </button>
      </div>

      {/* SVG */}
      <div className="rounded-xl border p-3 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.03),transparent_60%)]">
        <svg viewBox={viewBox} className="w-full h-auto">
          <defs>
            {/* Patrón diagonal para “deshabilitado” */}
            <pattern id={patternId} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="4" height="8" fill="#ffffff" />
            </pattern>
          </defs>

          {/* “Frente” (barra superior) */}
          <g transform="translate(200,80)">
            <text x="300" y="-10" textAnchor="middle" className="fill-zinc-500 select-none" style={{ fontSize: 12, fontWeight: 600 }}>
              {frontLabel}
            </text>
            <rect x="0" y="0" width="600" height="10" rx="5" className="fill-zinc-300 dark:fill-zinc-600" />
          </g>

          {/* Oval estadio decorativo */}
          <ellipse {...outer} fill="#e5e7eb" className="dark:fill-zinc-700" />
          <ellipse {...inner} fill="#111827" opacity={0.08} />

          {/* Zonas */}
          {zones.map(z => <Zone key={z.id} z={z} />)}
        </svg>
      </div>
    </div>
  );
}
