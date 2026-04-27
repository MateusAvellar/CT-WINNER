import React from "react";
import { api, WHATSAPP_URL } from "../lib/ctw";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

export default function Eventos() {
  const [events, setEvents] = React.useState([]);
  React.useEffect(() => {
    api.get("/events").then((r) => setEvents(r.data)).catch(() => {});
  }, []);
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = events.filter((e) => e.date >= today);
  const past = events.filter((e) => e.date < today);

  return (
    <div data-testid="eventos-page">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="text-xs font-bold uppercase tracking-[0.3em] text-[color:var(--ct-red)]">
            / Agenda
          </div>
          <h1 className="mt-3 font-display text-6xl uppercase leading-none text-[color:var(--ct-blue-dark)] md:text-7xl">
            Próximos<br />eventos.
          </h1>
          <p className="mt-6 max-w-xl text-slate-600">
            Competições, apresentações culturais, aulas abertas. A vida no CT Winner vai muito além do tatame.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-[2px] w-10 bg-[color:var(--ct-red)]" />
          <h2 className="font-display text-3xl uppercase text-[color:var(--ct-blue-dark)]">
            Em breve
          </h2>
        </div>

        {upcoming.length === 0 ? (
          <p className="text-slate-500">Nenhum evento futuro programado. Fique de olho nas redes!</p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {upcoming.map((e) => {
              const d = new Date(e.date + "T12:00:00");
              return (
                <article
                  key={e.id}
                  className="group relative border border-slate-200 p-8 transition hover:-translate-y-1 hover:border-[color:var(--ct-blue)]"
                  data-testid={`evento-${e.id}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-center justify-center bg-[color:var(--ct-blue-dark)] px-5 py-3 text-white">
                        <div className="font-display text-4xl leading-none">
                          {d.getDate().toString().padStart(2, "0")}
                        </div>
                        <div className="text-[10px] uppercase tracking-widest">
                          {d.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "")}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-display text-2xl uppercase tracking-tight text-[color:var(--ct-blue-dark)]">
                          {e.name}
                        </h3>
                        <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                          <Calendar size={14} />
                          {d.toLocaleDateString("pt-BR", { dateStyle: "full" })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="mt-5 text-slate-600">{e.description}</p>
                  {e.location && (
                    <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                      <MapPin size={14} />
                      {e.location}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}

        {past.length > 0 && (
          <>
            <div className="mt-16 mb-6 flex items-center gap-3">
              <div className="h-[2px] w-10 bg-slate-300" />
              <h2 className="font-display text-2xl uppercase text-slate-400">Arquivo</h2>
            </div>
            <ul className="divide-y divide-slate-200 border-y border-slate-200">
              {past.map((e) => (
                <li key={e.id} className="flex items-center justify-between py-3 text-sm">
                  <span className="text-slate-600">{e.name}</span>
                  <span className="font-mono text-slate-400">{e.date}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      <section className="bg-[color:var(--ct-blue-dark)] text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-8 px-5 py-12 sm:px-8">
          <h3 className="font-display text-3xl uppercase md:text-4xl">Quer participar do próximo evento?</h3>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="ct-cta inline-flex items-center gap-2 px-6 py-3 font-display text-lg"
          >
            Fale conosco <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </div>
  );
}
