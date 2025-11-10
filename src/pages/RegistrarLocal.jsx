import FilePicker from "../components/FilePicker";
import {
  Flex,
  Heading,
  Separator,
  Text,
  TextField,
  Select,
  Dialog,
} from "@radix-ui/themes";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/ui/Button";
import StadiumZoneMap from "../components/StadiumZoneMap";
import TheaterZoneMap from "../components/TheaterZoneMap";
import SeatMapEditor from "../components/SeatMapEditor";

export const RegistrarLocal = () => {
  const navigate = useNavigate();
  const [errors] = useState({});
  const [successOpen, setSuccessOpen] = useState(false);

  const [tipoEspacio, setTipoEspacio] = useState("");

  // ====== ESTADIO ======
  const [zonesState, setZonesState] = useState({});
  const [enabledIds, setEnabledIds] = useState([]);
  const [selectedZoneId, setSelectedZoneId] = useState(null);
  const [zoneSeatDist, setZoneSeatDist] = useState({}); // { [zonaId]: boolean }
  const [seatMapsByZone, setSeatMapsByZone] = useState({}); // { [zonaId]: { rows, cols, blocked:[] } }

  // ====== TEATRO ======
  const [theaterZonesState, setTheaterZonesState] = useState({});
  const [theaterEnabledIds, setTheaterEnabledIds] = useState([]);
  const [selectedTheaterZoneId, setSelectedTheaterZoneId] = useState(null);
  const [theaterZoneSeatDist, setTheaterZoneSeatDist] = useState({}); // { [zonaId]: boolean }
  const [theaterSeatMapsByZone, setTheaterSeatMapsByZone] = useState({}); // { [zonaId]: { rows, cols, blocked:[] } }

  // ====== ESCENARIO (checkbox + seatmap único) ======
  const [escenarioHasSeatDist, setEscenarioHasSeatDist] = useState(false);
  const [escenarioSeatMap, setEscenarioSeatMap] = useState({
    rows: 10,
    cols: 12,
    blocked: [],
  });

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (typeof form.checkValidity === "function" && !form.checkValidity()) {
      form.reportValidity?.();
      return;
    }
    const data = Object.fromEntries(fd.entries());
    console.log("payload", data);
    setSuccessOpen(true);
  }

  // helpers igualdad superficial
  const shallowEqualObj = (a = {}, b = {}) => {
    const ak = Object.keys(a),
      bk = Object.keys(b);
    if (ak.length !== bk.length) return false;
    for (const k of ak) if (a[k] !== b[k]) return false;
    return true;
  };
  const arrayEqual = (a, b) => {
    if (a === b) return true;
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length)
      return false;
    for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
    return true;
  };

  // ====== onChange ESTADIO (soporta contrato viejo y nuevo) ======
  const handleStadiumChange = useCallback((arg1, arg2) => {
    if (Array.isArray(arg1) && arg2 && typeof arg2 === "object") {
      const en = arg1,
        map = arg2;
      setEnabledIds((prev) => (arrayEqual(prev, en) ? prev : en));
      setZonesState((prev) => (shallowEqualObj(prev, map) ? prev : map));
      setSelectedZoneId((prev) => prev);
      return;
    }
    const payload = arg1 || {};
    const { selected = [], map = {} } = payload;
    setZonesState((prev) => (shallowEqualObj(prev, map) ? prev : map));
    const en = Object.entries(map)
      .filter(([k, v]) => v !== "blocked" && k !== "escenario")
      .map(([k]) => k);
    setEnabledIds((prev) => (arrayEqual(prev, en) ? prev : en));
    const nextSel = selected[0] || null;
    setSelectedZoneId((prev) => (prev === nextSel ? prev : nextSel));
  }, []);

  const handleSeatDistToggle = useCallback(
    (checked) => {
      if (!selectedZoneId) return;
      setZoneSeatDist((m) => ({ ...m, [selectedZoneId]: checked }));
      if (!checked) {
        setSeatMapsByZone((prev) => {
          if (!(selectedZoneId in prev)) return prev;
          const cp = { ...prev };
          delete cp[selectedZoneId];
          return cp;
        });
      }
    },
    [selectedZoneId]
  );

  // ====== onChange TEATRO ======
  const handleTheaterChange = useCallback((arg1, arg2) => {
    if (Array.isArray(arg1) && arg2 && typeof arg2 === "object") {
      const en = arg1,
        map = arg2;
      setTheaterEnabledIds((prev) => (arrayEqual(prev, en) ? prev : en));
      setTheaterZonesState((prev) => (shallowEqualObj(prev, map) ? prev : map));
      setSelectedTheaterZoneId((prev) => prev);
      return;
    }
    const payload = arg1 || {};
    const { selected = [], map = {} } = payload;
    setTheaterZonesState((prev) => (shallowEqualObj(prev, map) ? prev : map));
    const en = Object.entries(map)
      .filter(([k, v]) => v !== "blocked" && k !== "escenario")
      .map(([k]) => k);
    setTheaterEnabledIds((prev) => (arrayEqual(prev, en) ? prev : en));
    const nextSel = selected[0] || null;
    setSelectedTheaterZoneId((prev) => (prev === nextSel ? prev : nextSel));
  }, []);

  const handleTheaterSeatDistToggle = useCallback(
    (checked) => {
      if (!selectedTheaterZoneId) return;
      setTheaterZoneSeatDist((m) => ({
        ...m,
        [selectedTheaterZoneId]: checked,
      }));
      if (!checked) {
        setTheaterSeatMapsByZone((prev) => {
          if (!(selectedTheaterZoneId in prev)) return prev;
          const cp = { ...prev };
          delete cp[selectedTheaterZoneId];
          return cp;
        });
      }
    },
    [selectedTheaterZoneId]
  );

  const handleTheaterSeatMapChange = useCallback(
    (m) => {
      if (!selectedTheaterZoneId || !m) return;
      setTheaterSeatMapsByZone((prev) => {
        const prevM = prev[selectedTheaterZoneId];
        const same =
          prevM &&
          prevM.rows === m.rows &&
          prevM.cols === m.cols &&
          arrayEqual(prevM.blocked, m.blocked);
        if (same) return prev;
        return {
          ...prev,
          [selectedTheaterZoneId]: {
            rows: m.rows,
            cols: m.cols,
            blocked: m.blocked,
          },
        };
      });
    },
    [selectedTheaterZoneId]
  );

  return (
    <main className="h-full bg-background-dark text-text">
      <section className="h-full flex items-center justify-center px-4 py-6 md:py-8">
        <div className="rounded-2xl bg-slate-950/95 p-10 md:p-12 ring-1 shadow-2xl max-w-5xl w-full">
          <form onSubmit={handleSubmit} noValidate>
            <Flex direction="column" gap="4">
              <div>
                <Text size="3" color="var(--color-text)">
                  Completa los datos del local a registrar para futuros
                  registros de eventos. Los campos marcados con{" "}
                  <span aria-hidden="true">*</span> son obligatorios.
                </Text>
              </div>
              <Separator my="2" size="4" />
              <div className="space-y-3">
                <Heading size="3">Datos del local</Heading>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <label htmlFor="nombre" className="text-sm font-medium">
                      Nombre del local <span className="text-red-500">*</span>
                    </label>
                    <TextField.Root
                      id="nombre"
                      name="nombre"
                      required
                      aria-describedby="nombre-help"
                      size="3"
                    ></TextField.Root>
                    <Text id="nombre-help" size="1" color="var(--color-text)">
                      Ingesa el nombre del local a registrar.
                    </Text>
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="direccion" className="text-sm font-medium">
                      Dirección del local{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <TextField.Root
                      id="direccion"
                      name="direccion"
                      required
                      aria-describedby="direccion-help"
                      size="3"
                    ></TextField.Root>
                    <Text
                      id="direccion-help"
                      size="1"
                      color="var(--color-text)"
                    >
                      Ingesa la dirección del local.
                    </Text>
                  </div>
                  <div className="w-full min-w-0 space-y-1">
                    <label
                      htmlFor="tipo_espacio"
                      className="block text-sm font-medium"
                    >
                      Tipo de espacio <span className="text-red-500">*</span>
                    </label>
                    <Select.Root
                      name="doc_tipo"
                      required
                      onValueChange={(val) => {
                        setTipoEspacio(val);
                        // reset total al cambiar tipo
                        setZonesState({});
                        setEnabledIds([]);
                        setSelectedZoneId(null);
                        setZoneSeatDist({});
                        setSeatMapsByZone({});

                        setTheaterZonesState({});
                        setTheaterEnabledIds([]);
                        setSelectedTheaterZoneId(null);
                        setTheaterZoneSeatDist({});
                        setTheaterSeatMapsByZone({});

                        setEscenarioHasSeatDist(false);
                        setEscenarioSeatMap({
                          rows: 10,
                          cols: 12,
                          blocked: [],
                        });
                      }}
                    >
                      <Select.Trigger
                        id="tipo_espacio"
                        size="3"
                        placeholder="Seleccione"
                        className="w-full"
                      />
                      <Select.Content
                        position="popper"
                        sideOffset={4}
                        className="w-(--radix-select-trigger-width)"
                      >
                        <Select.Item value="estadio">Estadio</Select.Item>
                        <Select.Item value="teatro">Teatro</Select.Item>
                        <Select.Item value="escenario">Escenario</Select.Item>
                      </Select.Content>
                    </Select.Root>
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="capacidad" className="text-sm font-medium">
                      Capacidad total <span className="text-red-500">*</span>
                    </label>
                    <TextField.Root
                      id="capacidad"
                      name="capacidad"
                      inputMode="numeric"
                      pattern="[0-9]{1,12}"
                      maxLength={12}
                      required
                      aria-describedby="capacidad-help"
                      size="3"
                    ></TextField.Root>
                    <Text
                      id="capacidad-help"
                      size="1"
                      color="var(--color-text)"
                    >
                      Ingrese la capacidad máxima registrada en los documentos
                      de seguridad.
                    </Text>
                  </div>
                </div>
              </div>

              {/* ====== ESTADIO ====== */}
              {tipoEspacio === "estadio" && (
                <>
                  <Separator my="2" size="4" />
                  <div className="space-y-2">
                    <Heading size="3">
                      Zonas del{" "}
                      {tipoEspacio.charAt(0).toUpperCase() +
                        tipoEspacio.slice(1)}
                    </Heading>
                    <Text size="2" color="gray">
                      Habilita o deshabilita las zonas disponibles. Selecciona
                      una zona para configurar si tiene distribución de asiento.
                    </Text>

                    <div className="rounded-xl border p-3">
                      <StadiumZoneMap onChange={handleStadiumChange} />
                    </div>

                    {selectedZoneId && (
                      <div className="space-y-3 rounded-lg border p-3 bg-zinc-50 dark:bg-zinc-900/30">
                        <div className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                          Zona seleccionada:{" "}
                          <span className="font-semibold">
                            {selectedZoneId}
                          </span>
                        </div>

                        <label className="inline-flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            className="size-4 accent-indigo-600"
                            checked={!!zoneSeatDist[selectedZoneId]}
                            onChange={(e) =>
                              handleSeatDistToggle(e.target.checked)
                            }
                          />
                          ¿La zona tiene distribución de asiento?
                        </label>

                        {zoneSeatDist[selectedZoneId] && (
                          <div className="rounded-xl border p-3">
                            <SeatMapEditor
                              key={selectedZoneId}
                              initialRows={
                                seatMapsByZone[selectedZoneId]?.rows ?? 10
                              }
                              initialCols={
                                seatMapsByZone[selectedZoneId]?.cols ?? 12
                              }
                              initialBlocked={
                                seatMapsByZone[selectedZoneId]?.blocked ?? []
                              }
                              onChange={handleSeatMapChange}
                              frontLabel="Frente"
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {/* Hidden estadio */}
                    <input
                      type="hidden"
                      name="stadium_zones_state"
                      value={JSON.stringify(zonesState)}
                    />
                    <input
                      type="hidden"
                      name="stadium_zones_enabled"
                      value={JSON.stringify(enabledIds)}
                    />
                    <input
                      type="hidden"
                      name="stadium_zones_seat_distribution"
                      value={JSON.stringify(zoneSeatDist)}
                    />
                    <input
                      type="hidden"
                      name="stadium_zones_seat_maps"
                      value={JSON.stringify(seatMapsByZone)}
                    />
                  </div>
                </>
              )}

              {/* ====== TEATRO ====== */}
              {tipoEspacio === "teatro" && (
                <>
                  <Separator my="2" size="4" />
                  <div className="space-y-2">
                    <Heading size="3">
                      Zonas del{" "}
                      {tipoEspacio.charAt(0).toUpperCase() +
                        tipoEspacio.slice(1)}
                    </Heading>
                    <Text size="2" color="gray">
                      Habilita o deshabilita las zonas disponibles. Selecciona
                      una zona para indicar si tiene distribución de asiento.
                    </Text>

                    <div className="rounded-xl border p-3">
                      <TheaterZoneMap onChange={handleTheaterChange} />
                    </div>

                    {selectedTheaterZoneId && (
                      <div className="space-y-3 rounded-lg border p-3 bg-zinc-50 dark:bg-zinc-900/30">
                        <div className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                          Zona seleccionada:{" "}
                          <span className="font-semibold">
                            {selectedTheaterZoneId}
                          </span>
                        </div>

                        <label className="inline-flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            className="size-4 accent-indigo-600"
                            checked={
                              !!theaterZoneSeatDist[selectedTheaterZoneId]
                            }
                            onChange={(e) =>
                              handleTheaterSeatDistToggle(e.target.checked)
                            }
                          />
                          ¿La zona tiene distribución de asiento?
                        </label>

                        {theaterZoneSeatDist[selectedTheaterZoneId] && (
                          <div className="rounded-xl border p-3">
                            <SeatMapEditor
                              key={`theater-${selectedTheaterZoneId}`}
                              initialRows={
                                theaterSeatMapsByZone[selectedTheaterZoneId]
                                  ?.rows ?? 10
                              }
                              initialCols={
                                theaterSeatMapsByZone[selectedTheaterZoneId]
                                  ?.cols ?? 12
                              }
                              initialBlocked={
                                theaterSeatMapsByZone[selectedTheaterZoneId]
                                  ?.blocked ?? []
                              }
                              onChange={handleTheaterSeatMapChange}
                              frontLabel="Frente"
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {/* Hidden teatro */}
                    <input
                      type="hidden"
                      name="theater_zones_state"
                      value={JSON.stringify(theaterZonesState)}
                    />
                    <input
                      type="hidden"
                      name="theater_zones_enabled"
                      value={JSON.stringify(theaterEnabledIds)}
                    />
                    <input
                      type="hidden"
                      name="theater_zones_seat_distribution"
                      value={JSON.stringify(theaterZoneSeatDist)}
                    />
                    <input
                      type="hidden"
                      name="theater_zones_seat_maps"
                      value={JSON.stringify(theaterSeatMapsByZone)}
                    />
                  </div>
                </>
              )}

              {/* ====== ESCENARIO (checkbox + seatmap condicional) ====== */}
              {tipoEspacio === "escenario" && (
                <>
                  <Separator my="2" size="4" />
                  <div className="space-y-2">
                    <Heading size="3">
                      Distribución de asientos del Escenario
                    </Heading>
                    <label className="inline-flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        className="size-4 accent-indigo-600"
                        checked={escenarioHasSeatDist}
                        onChange={(e) =>
                          setEscenarioHasSeatDist(e.target.checked)
                        }
                      />
                      ¿El escenario tiene distribución de asientos?
                    </label>

                    {escenarioHasSeatDist && (
                      <div className="rounded-xl border p-3">
                        <SeatMapEditor
                          key="escenario-seatmap"
                          initialRows={escenarioSeatMap.rows}
                          initialCols={escenarioSeatMap.cols}
                          initialBlocked={escenarioSeatMap.blocked}
                          onChange={(m) => {
                            if (!m) return;
                            setEscenarioSeatMap((prev) => {
                              const same =
                                prev &&
                                prev.rows === m.rows &&
                                prev.cols === m.cols &&
                                arrayEqual(prev.blocked, m.blocked);
                              return same
                                ? prev
                                : {
                                    rows: m.rows,
                                    cols: m.cols,
                                    blocked: m.blocked,
                                  };
                            });
                          }}
                          frontLabel="Frente"
                        />
                      </div>
                    )}

                    {/* Hidden escenario */}
                    <input
                      type="hidden"
                      name="escenario_seat_distribution"
                      value={escenarioHasSeatDist ? "true" : "false"}
                    />
                    <input
                      type="hidden"
                      name="escenario_seat_map"
                      value={JSON.stringify(escenarioSeatMap)}
                    />
                  </div>
                </>
              )}

              <Separator my="2" size="4" />

              <div className="space-y-2">
                <Heading size="3">Documentación</Heading>
                <Text size="2" color="var(--color-text)">
                  Solo se acepta un único archivo en formato .zip o .rar.
                </Text>
                <FilePicker
                  labelText="Adjuntar croquis y documentación de registro público."
                  name="archivo"
                  required
                  accept=".zip,.rar"
                  multiple={false}
                  error={errors.archivo}
                />
              </div>
              <Flex gap="3" justify="end" mt="3">
                <Button variant="gray">
                  <Link to="/">Cancelar</Link>
                </Button>
                <Button type="submit">Enviar solicitud</Button>
              </Flex>
            </Flex>
          </form>
        </div>
      </section>
      <Dialog.Root open={successOpen} onOpenChange={setSuccessOpen}>
        <Dialog.Content
          size="3"
          className="max-w-md"
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <Dialog.Title></Dialog.Title>
          <Flex direction="column" align="center" gap="3">
            <CheckCircledIcon
              width={48}
              height={48}
              className="text-green-600"
            />
            <Heading size="4">¡Registro enviado!</Heading>
            <Text size="2" color="gray" align="center">
              Hemos recibido tu solicitud de registro de local. Te enviaremos
              una confirmación por correo.
            </Text>
            <Flex gap="3" mt="3">
              <Button onClick={() => navigate("/")} /* o a donde quieras */>
                Ir al inicio
              </Button>
            </Flex>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </main>
  );
};
