import React from "react";

const timeline = [
  { y: "2010", t: "Início da jornada", d: "Primeiras turmas de Taekwondo no coração do Méier." },
  { y: "2014", t: "Ampliação do espaço", d: "Novo tatame e abertura para crianças a partir de 4 anos." },
  { y: "2018", t: "Cultura entra em cena", d: "Turmas de teatro e balé se juntam ao CT Winner." },
  { y: "2022", t: "Competições", d: "Alunos representando o CT em campeonatos estaduais." },
  { y: "2026", t: "Nova identidade digital", d: "Lançamento deste site para toda a comunidade." },
];

const valores = [
  { n: "01", t: "Respeito", d: "O cumprimento começa antes do soco." },
  { n: "02", t: "Disciplina", d: "Consistência é o que diferencia resultado." },
  { n: "03", t: "Inclusão", d: "Um lugar onde todos cabem. Sem exceção." },
];

export default function Sobre() {
  return (
    <div data-testid="sobre-page">
      <section className="relative overflow-hidden bg-[color:var(--ct-blue-dark)] text-white">
        <div className="ct-grain absolute inset-0" aria-hidden />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "url('/images/sala-tkd.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B205A]/90 to-[#0B205A]/30" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-5 py-28 sm:px-8">
          <div className="text-xs font-bold uppercase tracking-[0.3em] text-[color:var(--ct-red)]">
            / Sobre nós
          </div>
          <h1 className="mt-3 font-display text-6xl uppercase leading-none md:text-8xl">
            Mais que um<br />centro de treinamento.
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-white/80">
            O CT Winner nasceu com uma missão: usar esporte e cultura como ferramentas de transformação
            social. Aqui, respeito e disciplina caminham junto com acolhimento e inclusão.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {valores.map((v) => (
            <div key={v.n} className="border-t-4 border-[color:var(--ct-red)] pt-6">
              <div className="font-display text-6xl text-slate-200">{v.n}</div>
              <h3 className="mt-2 font-display text-3xl uppercase text-[color:var(--ct-blue-dark)]">
                {v.t}
              </h3>
              <p className="mt-3 text-slate-600">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Space */}
      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:grid-cols-2">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.3em] text-[color:var(--ct-red)]">
              / Nosso Espaço
            </div>
            <h2 className="mt-3 font-display text-5xl uppercase text-[color:var(--ct-blue-dark)]">
              Estrutura pensada para<br />quem está começando<br />e para quem compete.
            </h2>
            <ul className="mt-8 space-y-4 text-slate-700">
              <li className="flex gap-3"><span className="mt-2 h-2 w-2 bg-[color:var(--ct-red)]" />Tatame amplo para artes marciais e aulas infantis</li>
              <li className="flex gap-3"><span className="mt-2 h-2 w-2 bg-[color:var(--ct-red)]" />Sala de expressão para balé e teatro</li>
              <li className="flex gap-3"><span className="mt-2 h-2 w-2 bg-[color:var(--ct-red)]" />Espaço de convivência para alunos e famílias</li>
              <li className="flex gap-3"><span className="mt-2 h-2 w-2 bg-[color:var(--ct-red)]" />Localização central no Méier, fácil acesso</li>
            </ul>
          </div>
          <div className="relative">
            <img
              src="/images/sala-tkd.jpeg"
              alt="Sala principal do CT Winner"
              className="w-full object-cover"
              style={{ aspectRatio: "4/3" }}
            />
            <div className="absolute -bottom-4 -left-4 bg-[color:var(--ct-red)] px-5 py-3 font-display text-xl uppercase text-white">
              Sala principal · dia de evento
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <div className="text-xs font-bold uppercase tracking-[0.3em] text-[color:var(--ct-red)]">
          / Linha do Tempo
        </div>
        <h2 className="mt-3 font-display text-5xl uppercase text-[color:var(--ct-blue-dark)]">
          Nossa jornada.
        </h2>
        <div className="mt-12 relative border-l-2 border-slate-200 pl-8">
          {timeline.map((i) => (
            <div key={i.y} className="relative mb-10" data-testid={`timeline-${i.y}`}>
              <span className="absolute -left-[42px] top-1 h-4 w-4 rounded-full bg-[color:var(--ct-red)] ring-4 ring-white" />
              <div className="font-display text-3xl text-[color:var(--ct-blue-dark)]">{i.y}</div>
              <div className="font-display text-xl uppercase tracking-tight text-slate-700">{i.t}</div>
              <p className="mt-1 text-slate-600">{i.d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
