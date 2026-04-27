import React from "react";
import { useNavigate } from "react-router-dom";
import { api, DAY_LABELS, DAYS_ORDER } from "../lib/ctw";
import { Pencil, Trash2, Plus, LogOut, X } from "lucide-react";

const TABS = [
  { k: "schedule", label: "Horários" },
  { k: "events", label: "Eventos" },
  { k: "modalities", label: "Modalidades" },
];

const emptyForm = {
  schedule: { day: "segunda", start_time: "18:00", end_time: "19:00", modality: "", professor: "" },
  events: { name: "", date: "", description: "", location: "CT Winner — Méier" },
  modalities: { name: "", description: "", target_audience: "", benefits: "", icon: "dumbbell", order: 0 },
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = React.useState("schedule");
  const [data, setData] = React.useState({ schedule: [], events: [], modalities: [] });
  const [editing, setEditing] = React.useState(null); // {id?, form}
  const [showForm, setShowForm] = React.useState(false);

  const endpoints = {
    schedule: "/schedule",
    events: "/events",
    modalities: "/modalities",
  };

  const load = React.useCallback(async () => {
    try {
      const [s, e, m] = await Promise.all([
        api.get("/schedule"),
        api.get("/events"),
        api.get("/modalities"),
      ]);
      setData({ schedule: s.data, events: e.data, modalities: m.data });
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("ctw_token");
        navigate("/admin/login");
      }
    }
  }, [navigate]);

  React.useEffect(() => {
    if (!localStorage.getItem("ctw_token")) {
      navigate("/admin/login");
      return;
    }
    api.get("/auth/me").catch(() => {
      localStorage.removeItem("ctw_token");
      navigate("/admin/login");
    });
    load();
  }, [navigate, load]);

  const logout = () => {
    localStorage.removeItem("ctw_token");
    navigate("/admin/login");
  };

  const openCreate = () => {
    setEditing({ form: { ...emptyForm[tab] } });
    setShowForm(true);
  };
  const openEdit = (item) => {
    setEditing({ id: item.id, form: { ...item } });
    setShowForm(true);
  };
  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
  };

  const save = async (e) => {
    e.preventDefault();
    const url = endpoints[tab];
    const payload = { ...editing.form };
    if (tab === "modalities") payload.order = Number(payload.order) || 0;
    try {
      if (editing.id) {
        await api.put(`${url}/${editing.id}`, payload);
      } else {
        await api.post(url, payload);
      }
      await load();
      closeForm();
    } catch (err) {
      alert("Erro ao salvar: " + (err.response?.data?.detail || err.message));
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Tem certeza?")) return;
    try {
      await api.delete(`${endpoints[tab]}/${id}`);
      await load();
    } catch (err) {
      alert("Erro ao excluir.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50" data-testid="admin-dashboard">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.3em] text-[color:var(--ct-red)]">
              / Painel CT Winner
            </div>
            <h1 className="font-display text-3xl uppercase text-[color:var(--ct-blue-dark)]">
              Administração
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="border border-slate-300 px-4 py-2 text-sm hover:border-[color:var(--ct-blue)]"
            >
              Ver site
            </button>
            <button
              onClick={logout}
              data-testid="admin-logout"
              className="flex items-center gap-2 bg-slate-900 px-4 py-2 text-sm text-white hover:bg-black"
            >
              <LogOut size={16} /> Sair
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex gap-2 border-b border-slate-200">
            {TABS.map((t) => (
              <button
                key={t.k}
                onClick={() => setTab(t.k)}
                data-testid={`admin-tab-${t.k}`}
                className={`px-5 py-3 font-display text-xl uppercase tracking-wider ${
                  tab === t.k
                    ? "border-b-2 border-[color:var(--ct-red)] text-[color:var(--ct-blue-dark)]"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <button
            onClick={openCreate}
            data-testid="admin-create-btn"
            className="ct-cta flex items-center gap-2 px-5 py-2.5 font-display text-lg"
          >
            <Plus size={18} /> Novo
          </button>
        </div>

        {/* Lists */}
        {tab === "schedule" && (
          <div className="overflow-x-auto border border-slate-200 bg-white">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-widest text-slate-500">
                <tr>
                  <th className="p-3 text-left">Dia</th>
                  <th className="p-3 text-left">Horário</th>
                  <th className="p-3 text-left">Modalidade</th>
                  <th className="p-3 text-left">Professor</th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody>
                {data.schedule.map((s) => (
                  <tr key={s.id} className="border-t border-slate-100" data-testid={`admin-slot-row-${s.id}`}>
                    <td className="p-3">{DAY_LABELS[s.day]}</td>
                    <td className="p-3 font-mono">{s.start_time}–{s.end_time}</td>
                    <td className="p-3 font-semibold">{s.modality}</td>
                    <td className="p-3 text-slate-600">{s.professor}</td>
                    <td className="p-3">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => openEdit(s)} className="p-2 text-slate-500 hover:text-[color:var(--ct-blue)]"><Pencil size={16} /></button>
                        <button onClick={() => remove(s.id)} className="p-2 text-slate-500 hover:text-[color:var(--ct-red)]"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "events" && (
          <div className="grid gap-4 md:grid-cols-2">
            {data.events.map((e) => (
              <div key={e.id} className="border border-slate-200 bg-white p-5" data-testid={`admin-event-${e.id}`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-mono text-xs text-slate-400">{e.date}</div>
                    <h3 className="font-display text-2xl uppercase text-[color:var(--ct-blue-dark)]">{e.name}</h3>
                    <p className="mt-1 text-sm text-slate-600">{e.description}</p>
                    {e.location && <p className="mt-1 text-xs text-slate-500">{e.location}</p>}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(e)} className="p-2 text-slate-500 hover:text-[color:var(--ct-blue)]"><Pencil size={16} /></button>
                    <button onClick={() => remove(e.id)} className="p-2 text-slate-500 hover:text-[color:var(--ct-red)]"><Trash2 size={16} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "modalities" && (
          <div className="grid gap-4 md:grid-cols-2">
            {data.modalities.map((m) => (
              <div key={m.id} className="border border-slate-200 bg-white p-5" data-testid={`admin-mod-${m.id}`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-mono text-xs text-slate-400">#{m.order} · {m.icon}</div>
                    <h3 className="font-display text-2xl uppercase text-[color:var(--ct-blue-dark)]">{m.name}</h3>
                    <p className="mt-1 text-sm text-slate-600">{m.description}</p>
                    <p className="mt-1 text-xs text-slate-500"><b>Público:</b> {m.target_audience}</p>
                    <p className="text-xs text-slate-500"><b>Benefícios:</b> {m.benefits}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(m)} className="p-2 text-slate-500 hover:text-[color:var(--ct-blue)]"><Pencil size={16} /></button>
                    <button onClick={() => remove(m.id)} className="p-2 text-slate-500 hover:text-[color:var(--ct-red)]"><Trash2 size={16} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Drawer / Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" onClick={closeForm}>
          <form
            onSubmit={save}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg border border-slate-200 bg-white p-6 shadow-2xl"
            data-testid="admin-form"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-2xl uppercase text-[color:var(--ct-blue-dark)]">
                {editing.id ? "Editar" : "Novo"} · {TABS.find(t=>t.k===tab).label}
              </h2>
              <button type="button" onClick={closeForm} className="p-1"><X size={20} /></button>
            </div>

            {tab === "schedule" && (
              <div className="space-y-3">
                <Field label="Dia">
                  <select className="input" value={editing.form.day} onChange={(e)=>setEditing({...editing, form:{...editing.form, day:e.target.value}})}>
                    {DAYS_ORDER.map(d=><option key={d} value={d}>{DAY_LABELS[d]}</option>)}
                  </select>
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Início (HH:MM)"><input className="input" required value={editing.form.start_time} onChange={(e)=>setEditing({...editing, form:{...editing.form, start_time:e.target.value}})} /></Field>
                  <Field label="Fim (HH:MM)"><input className="input" required value={editing.form.end_time} onChange={(e)=>setEditing({...editing, form:{...editing.form, end_time:e.target.value}})} /></Field>
                </div>
                <Field label="Modalidade"><input className="input" required value={editing.form.modality} onChange={(e)=>setEditing({...editing, form:{...editing.form, modality:e.target.value}})} /></Field>
                <Field label="Professor"><input className="input" required value={editing.form.professor} onChange={(e)=>setEditing({...editing, form:{...editing.form, professor:e.target.value}})} /></Field>
              </div>
            )}

            {tab === "events" && (
              <div className="space-y-3">
                <Field label="Nome"><input className="input" required value={editing.form.name} onChange={(e)=>setEditing({...editing, form:{...editing.form, name:e.target.value}})} /></Field>
                <Field label="Data"><input type="date" className="input" required value={editing.form.date} onChange={(e)=>setEditing({...editing, form:{...editing.form, date:e.target.value}})} /></Field>
                <Field label="Descrição"><textarea className="input min-h-[80px]" required value={editing.form.description} onChange={(e)=>setEditing({...editing, form:{...editing.form, description:e.target.value}})} /></Field>
                <Field label="Local"><input className="input" value={editing.form.location || ""} onChange={(e)=>setEditing({...editing, form:{...editing.form, location:e.target.value}})} /></Field>
              </div>
            )}

            {tab === "modalities" && (
              <div className="space-y-3">
                <Field label="Nome"><input className="input" required value={editing.form.name} onChange={(e)=>setEditing({...editing, form:{...editing.form, name:e.target.value}})} /></Field>
                <Field label="Descrição"><textarea className="input min-h-[80px]" required value={editing.form.description} onChange={(e)=>setEditing({...editing, form:{...editing.form, description:e.target.value}})} /></Field>
                <Field label="Público-alvo"><input className="input" required value={editing.form.target_audience} onChange={(e)=>setEditing({...editing, form:{...editing.form, target_audience:e.target.value}})} /></Field>
                <Field label="Benefícios"><input className="input" required value={editing.form.benefits} onChange={(e)=>setEditing({...editing, form:{...editing.form, benefits:e.target.value}})} /></Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Ícone (lucide)"><input className="input" value={editing.form.icon} onChange={(e)=>setEditing({...editing, form:{...editing.form, icon:e.target.value}})} /></Field>
                  <Field label="Ordem"><input type="number" className="input" value={editing.form.order} onChange={(e)=>setEditing({...editing, form:{...editing.form, order:e.target.value}})} /></Field>
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end gap-2">
              <button type="button" onClick={closeForm} className="border border-slate-300 px-4 py-2">Cancelar</button>
              <button type="submit" className="ct-cta px-5 py-2 font-display text-lg" data-testid="admin-form-submit">
                Salvar
              </button>
            </div>
          </form>
        </div>
      )}

      <style>{`.input{width:100%;border:1px solid #cbd5e1;padding:0.55rem 0.75rem;font-size:0.95rem}.input:focus{outline:none;border-color:var(--ct-blue)}`}</style>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold uppercase tracking-widest text-slate-500">{label}</span>
      {children}
    </label>
  );
}
