import React from "react";

const valores = [
  { n: "01", t: "Respeito", d: "O cumprimento começa antes do soco." },
  { n: "02", t: "Disciplina", d: "Consistência é o que diferencia resultado." },
  { n: "03", t: "Inclusão", d: "Um lugar onde todos cabem. Sem exceção." },
];

const galeria = [
  { src: "/images/equipe-taekwondo.jpeg", caption: "Equipe CT Winner · Taekwondo", tall: true },
  { src: "/images/bandeira-winner.jpeg", caption: "Bandeira oficial · Mestre Carlos Wagner" },
  { src: "/images/faixas-pretas.jpeg", caption: "Atletas formados · Faixas-pretas" },
  { src: "/images/atletas-brasileiro.jpeg", caption: "31 atletas classificados · Campeonato Brasileiro" },
  { src: "/images/titulo1.jpeg", caption: "Conquistas em competições" },
  { src: "/images/ilustrativa.jpeg", caption: "Combate infantil em torneio" },
  { src: "/images/sala-tkd.jpeg", caption: "Sala principal · dia de evento" },
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
        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <div className="text-xs font-bold uppercase tracking-[0.3em] text-[color:var(--ct-red)]">
            / Sobre nós · Desde 2018
          </div>
          <h1 className="mt-2 font-display text-5xl uppercase leading-none md:text-7xl">
            Mais que um<br />centro de treinamento.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-white/80 md:text-lg">
            O CT Winner nasceu em 2018 com uma missão: usar esporte e cultura como ferramentas de
            transformação social. Há <strong>8 anos</strong>, respeito e disciplina caminham junto com
            acolhimento e inclusão no Méier.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
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

      {/* Títulos / Galeria — imagens do CT */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.3em] text-[color:var(--ct-red)]">
                / Títulos & Momentos
              </div>
              <h2 className="mt-2 font-display text-4xl uppercase text-[color:var(--ct-blue-dark)] md:text-5xl">
                O CT em imagens.
              </h2>
              <p className="mt-3 max-w-xl text-sm text-slate-600 md:text-base">
                Competições, conquistas e treinos que contam a história da nossa equipe.
              </p>
            </div>
          </div>

          {/* Asymmetric mosaic */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4" data-testid="sobre-galeria">
            {galeria.map((g, i) => (
              <figure
                key={i}
                className={`group relative overflow-hidden bg-slate-900 ${
                  g.tall ? "col-span-2 row-span-2 md:col-span-2 md:row-span-2" : "col-span-1"
                }`}
                style={{ aspectRatio: g.tall ? "1/1.05" : "1/1" }}
              >
                <img
                  src={g.src}
                  alt={g.caption}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 text-xs font-semibold uppercase tracking-wider text-white opacity-0 transition group-hover:opacity-100">
                  {g.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Space */}
      <section>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 md:grid-cols-2">
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
              src="/images/equipe-taekwondo.jpeg"
              alt="Equipe CT Winner em treino"
              className="w-full object-cover"
              style={{ aspectRatio: "4/3" }}
            />
            <div className="absolute -bottom-4 -left-4 bg-[color:var(--ct-red)] px-4 py-2 font-display text-lg uppercase text-white">
              Equipe CT Winner
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
