// SeatMapEditor.jsx
import { useEffect, useMemo, useRef, useState } from "react";

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
  initialBlocked = [],             // <— NUEVO
  onChange,                        // espera { rows, cols, blocked }
  frontLabel = "Frente",
}) {
  const [rows, setRows] = useState(initialRows);
  const [cols, setCols] = useState(initialCols);

  // Matriz de estados ("available" | "blocked")
  const [grid, setGrid] = useState(() => {
    const base = Array.from({ length: initialRows }, () =>
      Array.from({ length: initialCols }, () => "available")
    );
    // aplicar inicialmente los bloqueados si vienen
    const blockedSet = new Set(initialBlocked);
    for (let r = 0; r < initialRows; r++) {
      for (let c = 0; c < initialCols; c++) {
        const id = `${indexToLetters(r)}${c + 1}`;
        if (blockedSet.has(id)) base[r][c] = "blocked";
      }
    }
    return base;
  });

  const [isPainting, setIsPainting] = useState(false);

  // Redimensionar conservando estados
  useEffect(() => {
    setGrid((old) =>
      Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => old[r]?.[c] ?? "available")
      )
    );
  }, [rows, cols]);

  // Soltar “pintado” aunque el cursor/dedo salga del contenedor
  useEffect(() => {
    const up = () => setIsPainting(false);
    window.addEventListener("pointerup", up);
    return () => window.removeEventListener("pointerup", up);
  }, []);

  function seatId(r, c) {
    return `${indexToLetters(r)}${c + 1}`;
  }

  // ÚNICA operación: toggle available <-> blocked
  function toggleSeat(r, c) {
    setGrid((g) => {
      if (!g[r] || typeof g[r][c] === "undefined") return g;
      const next = g.map((row) => row.slice());
      next[r][c] = next[r][c] === "blocked" ? "available" : "blocked";
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
    if (s === "blocked")  return base + " bg-zinc-400 text-white";
    return base + " bg-blue-500 hover:bg-blue-600 text-white";
  }

  const legend = useMemo(
    () => [
      ["Disponible", "bg-blue-500"],
      ["Bloqueado", "bg-zinc-400"],
    ],
    []
  );

  const rowCount = grid.length;
  const colCount = grid[0]?.length ?? 0;

  // --- Evitar loop: no dependas de la identidad de onChange ---
  const onChangeRef = useRef(onChange);
  useEffect(() => { onChangeRef.current = onChange; }, [onChange]);

  // Emite SOLO cuando cambia grid (y empaqueta rows/cols/blocked)
  useEffect(() => {
    if (!onChangeRef.current) return;
    const blocked = [];
    grid.forEach((r, ri) =>
      r.forEach((state, ci) => {
        if (state === "blocked") blocked.push(`${indexToLetters(ri)}${ci + 1}`);
      })
    );
    onChangeRef.current({ rows, cols, blocked });
  }, [grid, rows, cols]); // <- sin onChange aquí

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar (solo filas/columnas y reset) */}
      <div className="flex flex-wrap items-center gap-2">
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

      {/* Mapa (grid 3×2: frente | asientos | índices) */}
      <div className="inline-block rounded-xl border p-3 touch-none">
        <div
          className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr_auto] gap-x-3"
          style={{ "--cols": `repeat(${colCount}, minmax(2rem,auto))` }}
        >
          {/* Frente */}
          <div className="col-start-2 row-start-1 mb-2">
            <div className="mb-1 flex items-center justify-center">
              <span className="select-none text-[11px] font-medium text-zinc-500">
                {frontLabel}
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-zinc-300 dark:bg-zinc-600" />
          </div>

          {/* Etiquetas de filas */}
          <div className="mt-1 grid gap-1 col-start-1 row-start-2">
            {Array.from({ length: rowCount }).map((_, r) => (
              <div
                key={`label-${r}`}
                className="h-8 w-5 grid place-items-center text-xs text-zinc-600 sm:h-9"
                aria-hidden
              >
                {indexToLetters(r)}
              </div>
            ))}
          </div>

          {/* Asientos */}
          <div
            className="grid col-start-2 row-start-2 justify-items-center gap-1"
            style={{ gridTemplateColumns: "var(--cols)" }}
            role="grid"
            aria-label="Mapa de asientos"
          >
            {grid.map((row, r) =>
              row.map((s, c) => {
                const id = seatId(r, c);
                return (
                  <button
                    key={id}
                    type="button"
                    role="gridcell"
                    aria-label={`Asiento ${id}`}
                    className={seatClass(s)}
                    onPointerDown={(e) => {
                      e.preventDefault();
                      setIsPainting(true);
                      toggleSeat(r, c);
                    }}
                    onPointerEnter={() => {
                      if (isPainting) toggleSeat(r, c);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleSeat(r, c);
                      }
                    }}
                  >
                    {c + 1}
                  </button>
                );
              })
            )}
          </div>

          {/* Índices de columnas */}
          <div
            className="col-start-2 row-start-3 mt-2 grid justify-items-center gap-1"
            style={{ gridTemplateColumns: "var(--cols)" }}
            aria-hidden
          >
            {Array.from({ length: colCount }).map((_, c) => (
              <div key={`col-${c}`} className="text-center text-[11px] text-zinc-600">
                {c + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
