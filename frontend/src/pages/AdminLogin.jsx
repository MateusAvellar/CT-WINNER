import React from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/ctw";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("ctw_token", data.access_token);
      navigate("/admin");
    } catch (err) {
      const d = err.response?.data?.detail;
      setError(typeof d === "string" ? d : "Falha no login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[color:var(--ct-blue-dark)]" data-testid="admin-login-page">
      <div className="ct-grain absolute inset-0" aria-hidden />
      <div className="relative flex min-h-screen items-center justify-center px-5 py-16">
        <form
          onSubmit={submit}
          className="w-full max-w-md border border-white/10 bg-white p-8 shadow-2xl"
          data-testid="admin-login-form"
        >
          <div className="text-xs font-bold uppercase tracking-[0.3em] text-[color:var(--ct-red)]">
            / Painel
          </div>
          <h1 className="mt-2 font-display text-4xl uppercase text-[color:var(--ct-blue-dark)]">
            Acesso Admin
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Gerencie horários, modalidades e eventos do CT Winner.
          </p>

          <label className="mt-6 block text-xs font-bold uppercase tracking-widest text-slate-600">
            E-mail
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full border border-slate-300 px-4 py-3 focus:border-[color:var(--ct-blue)] focus:outline-none"
            data-testid="admin-login-email"
          />

          <label className="mt-4 block text-xs font-bold uppercase tracking-widest text-slate-600">
            Senha
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full border border-slate-300 px-4 py-3 focus:border-[color:var(--ct-blue)] focus:outline-none"
            data-testid="admin-login-password"
          />

          {error && (
            <p className="mt-4 border-l-2 border-[color:var(--ct-red)] bg-red-50 px-3 py-2 text-sm text-red-700" data-testid="admin-login-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            data-testid="admin-login-submit"
            className="ct-cta mt-6 w-full px-5 py-3 font-display text-xl tracking-wider disabled:opacity-50"
          >
            {loading ? "ENTRANDO..." : "ENTRAR"}
          </button>
        </form>
      </div>
    </div>
  );
}
