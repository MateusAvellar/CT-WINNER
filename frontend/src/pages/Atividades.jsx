import React from "react";
import { api, WHATSAPP_URL } from "../lib/ctw";
import { Flame, Shield, Swords, Target, Users, Mountain, Drama, Music, Dumbbell, ArrowRight } from "lucide-react";

const iconMap = {
  flame: Flame, shield: Shield, swords: Swords, target: Target,
  users: Users, mountain: Mountain, drama: Drama, music: Music,
};

export default function Atividades() {
  const [mods, setMods] = React.useState([]);

  React.useEffect(() => {
    api.get("/modalities").then((r) => setMods(r.data)).catch(() => {});
  }, []);

  return (
    <div data-testid="atividades-page">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="text-xs font-bold uppercase tracking-[0.3em] text-[color:var(--ct-red)]">
            / Atividades
          </div>
          <h1 className="mt-3 font-display text-6xl uppercase leading-none text-[color:var(--ct-blue-dark)] md:text-7xl">
            Escolha seu<br />caminho.
          </h1>
          <p className="mt-6 max-w-2xl text-slate-600">
            Aulas para todas as idades e experiências, ministradas por professores apaixonados. Do primeiro
            chute à primeira apresentação de teatro, estamos juntos.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {mods.map((m, i) => {
            const Icon = iconMap[m.icon] || Dumbbell;
            return (
              <div
                key={m.id}
                className="group relative flex flex-col border border-slate-200 p-8 transition hover:-translate-y-1 hover:border-[color:var(--ct-blue)] hover:shadow-lg"
                data-testid={`modalidade-${m.name}`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-display text-5xl leading-none text-slate-200">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <Icon size={36} className="text-[color:var(--ct-red)]" />
                </div>
                <h2 className="mt-6 font-display text-3xl uppercase tracking-tight text-[color:var(--ct-blue-dark)]">
                  {m.name}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{m.description}</p>
                <div className="mt-5 space-y-2 border-t border-slate-200 pt-5 text-sm">
                  <div>
                    <span className="font-semibold text-[color:var(--ct-blue-dark)]">Público: </span>
                    <span className="text-slate-600">{m.target_audience}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-[color:var(--ct-blue-dark)]">Benefícios: </span>
                    <span className="text-slate-600">{m.benefits}</span>
                  </div>
                </div>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 font-display text-lg tracking-wider text-[color:var(--ct-red)] hover:gap-3"
                >
                  EXPERIMENTAR <ArrowRight size={16} />
                </a>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
