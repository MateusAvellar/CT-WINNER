import React from "react";
import { api, DAY_LABELS, DAYS_ORDER } from "../lib/ctw";

function isNowInSlot(slot, now) {
  const dayIdx = (now.getDay() + 6) % 7; // Monday=0
  const dayKey = DAYS_ORDER[dayIdx];
  if (slot.day !== dayKey) return false;
  const hhmm = now.toLocaleTimeString("pt-BR", {
    timeZone: "America/Sao_Paulo", hour: "2-digit", minute: "2-digit", hour12: false,
  });
  return slot.start_time <= hhmm && hhmm < slot.end_time;
}

export default function Horarios() {
  const [slots, setSlots] = React.useState([]);
  const [now, setNow] = React.useState(new Date());

  React.useEffect(() => {
    api.get("/schedule").then((r) => setSlots(r.data)).catch(() => {});
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);

  const grouped = DAYS_ORDER.reduce((acc, d) => {
    acc[d] = slots.filter((s) => s.day === d);
    return acc;
  }, {});

  // Get Brasilia day for highlight
  const brDay = new Date(now.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
  const brDayIdx = (brDay.getDay() + 6) % 7;
  const brDayKey = DAYS_ORDER[brDayIdx];
  const brTimeStr = brDay.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

  return (
    <div data-testid="horarios-page">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="text-xs font-bold uppercase tracking-[0.3em] text-[color:var(--ct-red)]">
            / Grade de Horários
          </div>
          <h1 className="mt-3 font-display text-6xl uppercase leading-none text-[color:var(--ct-blue-dark)] md:text-7xl">
            Quando<br />treinar.
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-2">
              <span className="ct-live-dot" />
              <span className="font-semibold text-slate-700">Aula acontecendo agora</span>
            </div>
            <div className="text-slate-500">
              Horário de Brasília: <span className="font-semibold">{brTimeStr}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {DAYS_ORDER.map((d) => (
            <div
              key={d}
              className={`border p-6 ${
                d === brDayKey
                  ? "border-[color:var(--ct-blue)] bg-gradient-to-br from-white to-blue-50"
                  : "border-slate-200 bg-white"
              }`}
              data-testid={`day-card-${d}`}
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-3xl uppercase tracking-tight text-[color:var(--ct-blue-dark)]">
                  {DAY_LABELS[d]}
                </h3>
                {d === brDayKey && (
                  <span className="bg-[color:var(--ct-red)] px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                    Hoje
                  </span>
                )}
              </div>
              {grouped[d].length === 0 ? (
                <p className="text-sm text-slate-400">Sem aulas neste dia.</p>
              ) : (
                <ul className="space-y-3">
                  {grouped[d].map((s) => {
                    const live = isNowInSlot(s, now);
                    return (
                      <li
                        key={s.id}
                        className={`flex items-center gap-3 border-l-2 pl-3 py-1 ${
                          live ? "border-[color:var(--ct-green,#10B981)]" : "border-slate-200"
                        }`}
                        data-testid={`slot-${s.id}`}
                      >
                        <div className="w-3">
                          {live && <span className="ct-live-dot" data-testid="live-dot" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-baseline justify-between gap-2">
                            <span className="font-display text-xl text-[color:var(--ct-blue-dark)]">
                              {s.modality}
                            </span>
                            <span className="font-mono text-sm text-slate-600">
                              {s.start_time}–{s.end_time}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500">{s.professor}</div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
