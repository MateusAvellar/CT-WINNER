import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Instagram, Menu, X } from "lucide-react";
import { INSTAGRAM_URL, WHATSAPP_URL } from "../lib/ctw";

const links = [
  { to: "/", label: "Início" },
  { to: "/atividades", label: "Atividades" },
  { to: "/horarios", label: "Horários" },
  { to: "/eventos", label: "Eventos" },
  { to: "/sobre", label: "Sobre" },
  { to: "/contato", label: "Local" },
];

export default function Header() {
  const [open, setOpen] = React.useState(false);
  return (
    <header
      className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl"
      data-testid="site-header"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link to="/" className="flex items-center gap-3" data-testid="logo-home-link">
          <img
            src="/images/logo-main.png"
            alt="CT Winner — Centro de Treinamento"
            className="h-12 w-auto sm:h-14"
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              data-testid={`nav-${l.label.toLowerCase()}`}
              className={({ isActive }) =>
                `ct-link-anim text-sm font-semibold uppercase tracking-widest ${
                  isActive ? "text-[color:var(--ct-red)]" : "text-slate-700"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            data-testid="header-instagram"
            className="flex h-10 w-10 items-center justify-center border border-slate-300 text-slate-700 transition hover:border-[color:var(--ct-red)] hover:text-[color:var(--ct-red)]"
            aria-label="Instagram"
          >
            <Instagram size={18} />
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            data-testid="header-cta-experimental"
            className="ct-cta px-5 py-2.5 font-display text-lg tracking-wide"
          >
            Aula Experimental
          </a>
        </div>

        <button
          className="inline-flex h-10 w-10 items-center justify-center border border-slate-300 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
          data-testid="mobile-menu-toggle"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white md:hidden" data-testid="mobile-menu">
          <div className="flex flex-col px-5 py-4">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-3 font-semibold uppercase tracking-widest ${
                    isActive ? "text-[color:var(--ct-red)]" : "text-slate-700"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="ct-cta mt-3 px-5 py-3 text-center font-display text-lg"
            >
              Aula Experimental
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
