import React from "react";
import { Instagram, MapPin, MessageCircle, Navigation } from "lucide-react";
import { ADDRESS, INSTAGRAM_URL, MAP_SRC, WHATSAPP_URL } from "../lib/ctw";

export default function Contato() {
  return (
    <div data-testid="contato-page">
      <section className="border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="text-xs font-bold uppercase tracking-[0.3em] text-[color:var(--ct-red)]">
            / Local & Contato
          </div>
          <h1 className="mt-3 font-display text-6xl uppercase leading-none text-[color:var(--ct-blue-dark)] md:text-7xl">
            Venha nos<br />visitar.
          </h1>
          <p className="mt-6 max-w-xl text-slate-600">
            Estamos em frente ao colégio QI, no mezanino. Área de fácil acesso, no coração do Méier.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-5">
        <div className="md:col-span-3">
          <div className="aspect-[16/11] w-full overflow-hidden border border-slate-200">
            <iframe
              title="CT Winner Maps"
              src={MAP_SRC}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              data-testid="location-map"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="space-y-6 border border-slate-200 p-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.3em] text-[color:var(--ct-red)]">
                Endereço
              </div>
              <div className="mt-2 flex items-start gap-2 text-slate-700">
                <MapPin size={18} className="mt-1 text-[color:var(--ct-blue)]" />
                {ADDRESS}
              </div>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.3em] text-[color:var(--ct-red)]">
                Referências
              </div>
              <p className="mt-2 text-slate-700">Em frente ao colégio QI · Mezanino · Estacionamento próximo.</p>
            </div>
            <div className="grid grid-cols-1 gap-3 pt-2">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="ct-cta flex items-center justify-center gap-2 px-5 py-3 font-display text-lg tracking-wider"
                data-testid="contato-whatsapp"
              >
                <MessageCircle size={18} /> WhatsApp
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="ct-outline flex items-center justify-center gap-2 px-5 py-3 font-display text-lg tracking-wider"
                data-testid="contato-instagram"
              >
                <Instagram size={18} /> @ctwinnerrj
              </a>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS)}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-slate-900 px-5 py-3 font-display text-lg tracking-wider text-white transition hover:-translate-y-1"
                data-testid="contato-rotas"
              >
                <Navigation size={18} /> Como Chegar
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
