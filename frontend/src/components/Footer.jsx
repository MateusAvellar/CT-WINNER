import React from "react";
import { Instagram, MapPin, Phone } from "lucide-react";
import { INSTAGRAM_URL, WHATSAPP_URL, ADDRESS } from "../lib/ctw";

export default function Footer() {
  return (
    <footer
      className="ct-grain relative mt-20 bg-[color:var(--ct-blue-dark)] text-white"
      data-testid="site-footer"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-4">
            <img
              src="/images/logo-secundaria.jpeg"
              alt="CT Winner"
              className="h-16 w-16 rounded-sm object-contain bg-white p-1"
            />
            <div>
              <div className="font-display text-3xl tracking-wide">CT WINNER</div>
              <div className="text-xs uppercase tracking-[0.3em] text-white/60">
                Esporte · Cultura · Inclusão
              </div>
            </div>
          </div>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-white/70">
            Um lugar especial para pessoas especiais. Há mais de uma década formando atletas, artistas
            e cidadãos em uma comunidade que acolhe, respeita e inspira.
          </p>
        </div>

        <div>
          <div className="mb-4 text-xs uppercase tracking-[0.3em] text-white/60">Contato</div>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 text-[color:var(--ct-red)]" />
              <span>{ADDRESS}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-[color:var(--ct-red)]" />
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="hover:underline">
                +55 21 98080-4225
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Instagram size={16} className="text-[color:var(--ct-red)]" />
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="hover:underline">
                @ctwinnerrj
              </a>
            </li>
          </ul>
        </div>

        <div>
          <div className="mb-4 text-xs uppercase tracking-[0.3em] text-white/60">Horários</div>
          <p className="text-sm text-white/70">
            Seg–Sex: 07h–21h<br />
            Sábado: 09h–13h<br />
            Domingo: Eventos
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="ct-cta mt-5 inline-block px-5 py-2.5 font-display text-base tracking-wide"
            data-testid="footer-cta-experimental"
          >
            Agendar Aula
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-5 py-5 text-xs text-white/50 sm:flex-row sm:items-center sm:px-8">
          <span>© {new Date().getFullYear()} Centro de Treinamento Winner. Todos os direitos reservados.</span>
          <span>R. Lopes da Cruz, 61 — Méier, Rio de Janeiro</span>
        </div>
      </div>
    </footer>
  );
}
