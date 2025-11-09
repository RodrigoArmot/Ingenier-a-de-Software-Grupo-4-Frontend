// SeatMapEditor.jsx
import { useEffect, useMemo, useState } from "react";

const STATES = ["available", "selected", "occupied", "blocked"];

function indexToLetters(i) {
    let n = i + 1, s = "";
    while (n > 0) {
        const r = (n - 1) % 26;
        s = String.fromCharCode(65 + r) + s;
        n = Math.floor((n - 1) / 26);
    }
    return s;
}

export default function SeatMapEditor({
    initialRows = 10,
    initialCols = 12,
    onChange,
    frontLabel = "Frente",
}) {
    const [rows, setRows] = useState(initialRows);
    const [cols, setCols] = useState(initialCols);

    // matriz de estados
    const [grid, setGrid] = useState(() =>
        Array.from({ length: initialRows }, () =>
        Array.from({ length: initialCols }, () => "available")
    ));

    const [mode, setMode] = useState("select"); // "select" | "block" | "occupy"
    const [isPainting, setIsPainting] = useState(false);

  // Redimensiona conservando estados
    useEffect(() => {
        setGrid((old) =>
            Array.from({ length: rows }, (_, r) =>
            Array.from({ length: cols }, (_, c) => old[r]?.[c] ?? "available")
        ));
    }, [rows, cols]);

  // Soltar “pintado” aunque el cursor/dedo salga del contenedor
    useEffect(() => {
        const up = () => setIsPainting(false);
        window.addEventListener("pointerup", up);
        return () => window.removeEventListener("pointerup", up);
    }, []);

  // Reporta cambios al padre
    useEffect(() => {
        if (!onChange) return;
        const selected = [];
        const occupied = [];
        const blocked = [];
        grid.forEach((r, ri) =>
            r.forEach((state, ci) => {
                const id = `${indexToLetters(ri)}${ci + 1}`;
                if (state === "selected") selected.push(id);
                if (state === "occupied") occupied.push(id);
                if (state === "blocked") blocked.push(id);
            })
        );
        onChange({ selected, occupied, blocked });
    }, [grid, onChange]);

    function seatId(r, c) {
        return `${indexToLetters(r)}${c + 1}`;
    }

    function toggleSeat(r, c) {
    setGrid((g) => {
        if (!g[r] || typeof g[r][c] === "undefined") return g;
        const next = g.map((row) => row.slice());
        const current = next[r][c];
        if (mode === "block") {
            next[r][c] = current === "blocked" ? "available" : "blocked";
        } else if (mode === "occupy") {
            next[r][c] = current === "occupied" ? "available" : "occupied";
        } else {
            if (current === "blocked" || current === "occupied") return next;
            next[r][c] = current === "selected" ? "available" : "selected";
        }
        return next;
    });
  }

    function clearAll() {
    setGrid((g) => g.map((row) => row.map(() => "available")));
  }

  function seatClass(s) {
    const base =
      "size-8 sm:size-9 rounded-md grid place-items-center text-[11px] font-semibold " +
      "outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600";
    if (s === "available") return base + " bg-blue-500 hover:bg-blue-600 text-white";
    if (s === "selected")  return base + " bg-amber-500 hover:bg-amber-600 text-white";
    if (s === "occupied")  return base + " bg-red-500 text-white cursor-not-allowed";
    return base + " bg-zinc-400 text-white cursor-not-allowed"; // blocked
  }

  const legend = useMemo(
    () => [
      ["Disponible", "bg-blue-500"],
      ["Seleccionado", "bg-amber-500"],
      ["Ocupado", "bg-red-500"],
      ["Bloqueado", "bg-zinc-400"],
    ],
    []
  );

  const rowCount = grid.length;
  const colCount = grid[0]?.length ?? 0;

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="inline-flex rounded-lg border border-zinc-300 p-1">
          {[
            ["select", "Seleccionar"],
            ["block", "Bloquear"],
            ["occupy", "Ocupar"],
          ].map(([k, label]) => (
            <button
              key={k}
              type="button"
              onClick={() => setMode(k)}
              className={
                "px-3 py-1.5 text-sm rounded-md " +
                (mode === k ? "bg-indigo-600 text-white" : "hover:bg-zinc-100")
              }
              aria-pressed={mode === k}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="ml-2 flex items-center gap-2">
          <span className="text-sm text-zinc-600">Filas</span>
          <button
            className="h-8 w-8 rounded-md border hover:bg-zinc-100"
            onClick={() => setRows((n) => Math.max(1, n - 1))}
            type="button"
            aria-label="Quitar fila"
          >
            –
          </button>
          <span className="w-6 text-center">{rows}</span>
          <button
            className="h-8 w-8 rounded-md border hover:bg-zinc-100"
            onClick={() => setRows((n) => Math.min(99, n + 1))}
            type="button"
            aria-label="Agregar fila"
          >
            +
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-zinc-600">Columnas</span>
          <button
            className="h-8 w-8 rounded-md border hover:bg-zinc-100"
            onClick={() => setCols((n) => Math.max(1, n - 1))}
            type="button"
            aria-label="Quitar columna"
          >
            –
          </button>
          <span className="w-6 text-center">{cols}</span>
          <button
            className="h-8 w-8 rounded-md border hover:bg-zinc-100"
            onClick={() => setCols((n) => Math.min(99, n + 1))}
            type="button"
            aria-label="Agregar columna"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={clearAll}
          className="ml-auto rounded-md border px-3 py-1.5 text-sm hover:bg-zinc-100"
        >
          Reset
        </button>
      </div>

      {/* Leyenda */}
      <div className="flex flex-wrap items-center gap-3">
        {legend.map(([name, bg]) => (
          <span key={name} className="inline-flex items-center gap-2 text-sm">
            <span className={`size-4 rounded ${bg}`} aria-hidden />
            {name}
          </span>
        ))}
      </div>

      {/* Mapa (grid 3×2: barra de frente | asientos | índices) */}
      <div className="inline-block rounded-xl border p-3 touch-none">
        <div
          // 2 columnas (labels | asientos), 3 filas (frente | asientos | índices)
          className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr_auto] gap-x-3"
          style={{ "--cols": `repeat(${colCount}, minmax(2rem,auto))` }}
        >
          {/* --- Barra FRONTAL (col 2, fila 1) --- */}
          <div className="col-start-2 row-start-1 mb-2">
            <div className="flex items-center justify-center mb-1">
              <span className="select-none text-[11px] font-medium text-zinc-500">
                {frontLabel}
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-zinc-300 dark:bg-zinc-600" />
          </div>

          {/* Etiquetas de filas (col 1, fila 2) */}
          <div className="mt-1 grid gap-1 col-start-1 row-start-2">
            {Array.from({ length: rowCount }).map((_, r) => (
              <div
                key={`label-${r}`}
                className="h-8 sm:h-9 w-5 grid place-items-center text-xs text-zinc-600"
                aria-hidden
              >
                {indexToLetters(r)}
              </div>
            ))}
          </div>

          {/* Asientos (col 2, fila 2) */}
          <div
            className="grid gap-1 col-start-2 row-start-2 justify-items-center"
            style={{ gridTemplateColumns: "var(--cols)" }}
            role="grid"
            aria-label="Mapa de asientos"
          >
            {grid.map((row, r) =>
              row.map((s, c) => {
                const id = seatId(r, c);
                const disabled = s === "blocked" || s === "occupied";
                return (
                  <button
                    key={id}
                    type="button"
                    role="gridcell"
                    aria-label={`Asiento ${id}`}
                    aria-disabled={disabled}
                    className={seatClass(s)}
                    onPointerDown={(e) => {
                      e.preventDefault();
                      setIsPainting(true);
                      toggleSeat(r, c);       // toggle una sola vez
                    }}
                    onPointerEnter={() => {
                      if (isPainting) toggleSeat(r, c); // “pintar” al pasar
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleSeat(r, c);     // accesible por teclado
                      }
                    }}
                  >
                    {c + 1}
                  </button>
                );
              })
            )}
          </div>

          {/* Índices de columnas (col 2, fila 3) */}
          <div
            className="grid gap-1 col-start-2 row-start-3 mt-2 justify-items-center"
            style={{ gridTemplateColumns: "var(--cols)" }}
            aria-hidden
          >
            {Array.from({ length: colCount }).map((_, c) => (
              <div
                key={`col-${c}`}
                className="text-center text-[11px] text-zinc-600"
              >
                {c + 1}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Exportar configuración */}
      <ExportConfig grid={grid} />
    </div>
  );
}

function ExportConfig({ grid }) {
    const payload = useMemo(() => {
        const data = { available: [], selected: [], occupied: [], blocked: [] };
        grid.forEach((row, ri) =>
            row.forEach((s, ci) => {
                const id = `${indexToLetters(ri)}${ci + 1}`;
                data[s].push(id);
            })
        );
        return JSON.stringify(data, null, 2);
    }, [grid]);

    return (
        <details className="rounded-lg border p-3">
            <summary className="cursor-pointer text-sm font-medium">Exportar configuración</summary>
            <textarea
            readOnly
            className="mt-2 w-full rounded-lg border p-2 text-xs"
            rows={8}
            value={payload}
            />
        </details>
    );
}
