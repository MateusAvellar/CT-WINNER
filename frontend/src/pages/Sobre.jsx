import React from "react";

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
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="text-xs font-bold uppercase tracking-[0.3em] text-[color:var(--ct-red)]">
            / Sobre nós · Desde 2018
          </div>
          <h1 className="mt-3 font-display text-5xl uppercase leading-none md:text-7xl">
            Mais que um<br />centro de treinamento.
          </h1>
          <p className="mt-6 max-w-2xl text-base text-white/80 md:text-lg">
            O CT Winner nasceu em 2018 com uma missão: usar esporte e cultura como ferramentas de
            transformação social. Há <strong>8 anos</strong>, respeito e disciplina caminham junto com
            acolhimento e inclusão no Méier.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {valores.map((v) => (
            <div key={v.n} className="border-t-4 border-[color:var(--ct-red)] pt-5">
              <div className="font-display text-5xl text-slate-200">{v.n}</div>
              <h3 className="mt-1 font-display text-2xl uppercase text-[color:var(--ct-blue-dark)]">
                {v.t}
              </h3>
              <p className="mt-2 text-sm text-slate-600 md:text-base">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Space */}
      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-2">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.3em] text-[color:var(--ct-red)]">
              / Nosso Espaço
            </div>
            <h2 className="mt-2 font-display text-4xl uppercase text-[color:var(--ct-blue-dark)] md:text-5xl">
              Estrutura pensada para<br />quem está começando<br />e para quem compete.
            </h2>
            <ul className="mt-6 space-y-3 text-slate-700">
              <li className="flex gap-3"><span className="mt-2 h-2 w-2 bg-[color:var(--ct-red)]" />Tatame amplo para artes marciais e turmas infantis</li>
              <li className="flex gap-3"><span className="mt-2 h-2 w-2 bg-[color:var(--ct-red)]" />Sala de expressão para teatro</li>
              <li className="flex gap-3"><span className="mt-2 h-2 w-2 bg-[color:var(--ct-red)]" />Espaço de convivência para alunos e famílias</li>
              <li className="flex gap-3"><span className="mt-2 h-2 w-2 bg-[color:var(--ct-red)]" />Localização central no Méier, em frente ao colégio QI</li>
            </ul>
          </div>
          <div className="relative">
            <img
              src="/images/sala-tkd.jpeg"
              alt="Sala principal do CT Winner"
              className="w-full object-cover"
              style={{ aspectRatio: "4/3" }}
            />
            <div className="absolute -bottom-4 -left-4 bg-[color:var(--ct-red)] px-4 py-2 font-display text-lg uppercase text-white">
              Sala principal · dia de evento
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
