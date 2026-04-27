import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Award, HeartHandshake, Sparkles, Users } from "lucide-react";
import { WHATSAPP_URL } from "../lib/ctw";
import { api } from "../lib/ctw";

const valueItems = [
  { icon: HeartHandshake, title: "Inclusão", text: "Espaço acolhedor para crianças, mulheres e iniciantes." },
  { icon: Sparkles, title: "Cultura", text: "Arte, esporte e formação humana em um só lugar." },
  { icon: Users, title: "Comunidade", text: "Mais do que alunos, uma família que cresce junto." },
  { icon: Award, title: "Excelência", text: "Professores qualificados e competições reconhecidas." },
];

export default function Home() {
  const [events, setEvents] = React.useState([]);
  const [mods, setMods] = React.useState([]);

  React.useEffect(() => {
    api.get("/events").then((r) => setEvents(r.data.slice(0, 3))).catch(() => {});
    api.get("/modalities").then((r) => setMods(r.data)).catch(() => {});
  }, []);

  return (
    <div data-testid="home-page">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[color:var(--ct-blue-dark)] text-white">
        <div
          className="ct-kb absolute inset-0 opacity-50"
          style={{
            backgroundImage: "url('/images/sala-tkd.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B205A]/90 via-[#0B205A]/70 to-[#0033A0]/70" aria-hidden />
        <div className="ct-grain absolute inset-0" aria-hidden />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-24 sm:px-8 md:grid-cols-12 md:py-36">
          <div className="md:col-span-8">
            <div className="mb-5 inline-flex items-center gap-3">
              <span className="h-[2px] w-10 bg-[color:var(--ct-red)]" />
              <span className="text-xs font-bold uppercase tracking-[0.35em] text-[color:var(--ct-red)]">
                Méier · Rio de Janeiro
              </span>
            </div>
            <h1
              className="font-display text-[clamp(3rem,9vw,7.5rem)] uppercase leading-[0.9] tracking-tight"
              data-testid="hero-title"
            >
              Lugar especial<br />
              <span className="text-[color:var(--ct-red)]">para pessoas</span><br />
              especiais.
            </h1>
            <p className="mt-8 max-w-xl text-lg text-white/80">
              Artes marciais, balé e teatro em um centro que acredita em disciplina com acolhimento,
              esporte com cultura e excelência com inclusão.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                data-testid="hero-cta-primary"
                className="ct-cta flex items-center gap-2 px-7 py-4 font-display text-xl tracking-wider"
              >
                AGENDAR AULA EXPERIMENTAL <ArrowRight size={20} />
              </a>
              <Link
                to="/atividades"
                data-testid="hero-cta-secondary"
                className="border-2 border-white/30 bg-white/5 px-7 py-4 font-display text-xl tracking-wider text-white transition hover:bg-white hover:text-[color:var(--ct-blue-dark)]"
              >
                VER MODALIDADES
              </Link>
            </div>
          </div>

          <div className="relative hidden md:col-span-4 md:block">
            <div className="absolute bottom-0 right-0 flex flex-col gap-6">
              <div className="border-l-4 border-[color:var(--ct-red)] pl-5">
                <div className="font-display text-5xl">8+</div>
                <div className="text-sm uppercase tracking-widest text-white/70">Modalidades</div>
              </div>
              <div className="border-l-4 border-[color:var(--ct-red)] pl-5">
                <div className="font-display text-5xl">10+</div>
                <div className="text-sm uppercase tracking-widest text-white/70">Anos no Méier</div>
              </div>
              <div className="border-l-4 border-[color:var(--ct-red)] pl-5">
                <div className="font-display text-5xl">500+</div>
                <div className="text-sm uppercase tracking-widest text-white/70">Alunos formados</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <span className="ct-section-num">01</span>
        <div className="relative grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="text-xs font-bold uppercase tracking-[0.3em] text-[color:var(--ct-red)]">
              / Nossos Valores
            </div>
            <h2 className="mt-3 font-display text-5xl uppercase tracking-tight text-[color:var(--ct-blue-dark)] md:text-6xl">
              Disciplina<br />com acolhimento.
            </h2>
            <p className="mt-6 max-w-md text-slate-600">
              Acreditamos que o tatame transforma vidas. Cada aula é construída para formar pessoas
              mais fortes por dentro — corpo, mente e comunidade.
            </p>
          </div>
          <div className="md:col-span-7">
            <div className="grid gap-5 sm:grid-cols-2">
              {valueItems.map((v) => (
                <div
                  key={v.title}
                  className="group border border-slate-200 p-6 transition hover:-translate-y-1 hover:border-[color:var(--ct-blue)]"
                  data-testid={`value-${v.title.toLowerCase()}`}
                >
                  <v.icon className="text-[color:var(--ct-red)]" size={28} />
                  <h3 className="mt-4 font-display text-2xl tracking-tight text-[color:var(--ct-blue-dark)]">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MODALITIES TEASER */}
      <section className="ct-diagonal relative overflow-hidden text-white">
        <div className="ct-grain absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.3em] text-white/70">
                / Atividades
              </div>
              <h2 className="mt-2 font-display text-5xl uppercase md:text-6xl">
                Oito caminhos,<br />uma família.
              </h2>
            </div>
            <Link
              to="/atividades"
              className="font-display text-lg tracking-wider text-white hover:text-[color:var(--ct-red)]"
              data-testid="modalities-view-all"
            >
              Ver todas →
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {mods.slice(0, 8).map((m, i) => (
              <div
                key={m.id}
                className="group relative border border-white/15 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-[color:var(--ct-red)] hover:bg-white/10"
                data-testid={`modality-card-${m.name}`}
              >
                <div className="font-display text-sm text-white/50">0{i + 1}</div>
                <div className="mt-4 font-display text-3xl uppercase">{m.name}</div>
                <p className="mt-3 text-sm text-white/70 line-clamp-3">{m.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS TEASER */}
      <section className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <span className="ct-section-num">03</span>
        <div className="relative mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.3em] text-[color:var(--ct-red)]">
              / Próximos Eventos
            </div>
            <h2 className="mt-2 font-display text-5xl uppercase text-[color:var(--ct-blue-dark)] md:text-6xl">
              O que vem<br />por aí.
            </h2>
          </div>
          <Link
            to="/eventos"
            className="font-display text-lg tracking-wider text-[color:var(--ct-blue-dark)] hover:text-[color:var(--ct-red)]"
            data-testid="events-view-all"
          >
            Ver todos →
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {events.map((e) => {
            const d = new Date(e.date + "T12:00:00");
            const day = d.getDate().toString().padStart(2, "0");
            const month = d.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "");
            return (
              <article
                key={e.id}
                className="flex gap-5 border border-slate-200 p-6 transition hover:-translate-y-1 hover:border-[color:var(--ct-blue)]"
                data-testid={`event-card-${e.id}`}
              >
                <div className="flex min-w-[72px] flex-col items-center justify-center bg-[color:var(--ct-blue-dark)] px-3 py-4 text-white">
                  <div className="font-display text-4xl leading-none">{day}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-widest">{month}</div>
                </div>
                <div>
                  <h3 className="font-display text-2xl uppercase leading-tight text-[color:var(--ct-blue-dark)]">
                    {e.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 line-clamp-3">{e.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* CTA BAND */}
      <section className="bg-[color:var(--ct-red)] text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-8 px-5 py-14 sm:px-8">
          <h3 className="font-display text-4xl uppercase leading-none md:text-5xl">
            Sua primeira aula é por nossa conta.
          </h3>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            data-testid="cta-band-whatsapp"
            className="inline-flex items-center gap-2 bg-white px-7 py-4 font-display text-xl tracking-wider text-[color:var(--ct-red)] transition hover:-translate-y-1"
          >
            FALAR NO WHATSAPP <ArrowRight size={20} />
          </a>
        </div>
      </section>
    </div>
  );
}
