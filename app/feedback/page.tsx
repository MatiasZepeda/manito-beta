"use client";

import { useState, useEffect } from "react";

interface FeedbackEntry {
  id: string;
  tester: string;
  role: "cliente" | "maestro";
  category: "impresion" | "bugs" | "navegacion" | "otro";
  notes: string;
  date: string;
}

const STORAGE_KEY = "manito-beta-feedback";

const CATEGORIES = {
  impresion: { label: "Impresión general", emoji: "💭" },
  bugs: { label: "Bugs", emoji: "🐛" },
  navegacion: { label: "Navegación", emoji: "🧭" },
  otro: { label: "Otro", emoji: "📝" },
};

export default function FeedbackPage() {
  const [entries, setEntries] = useState<FeedbackEntry[]>([]);
  const [ready, setReady] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [filterRole, setFilterRole] = useState<string>("todos");
  const [filterCat, setFilterCat] = useState<string>("todas");

  const [form, setForm] = useState({
    tester: "",
    role: "cliente" as "cliente" | "maestro",
    category: "impresion" as FeedbackEntry["category"],
    notes: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setEntries(JSON.parse(saved));
    setReady(true);
  }, []);

  const save = (next: FeedbackEntry[]) => {
    setEntries(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const addEntry = () => {
    if (!form.tester.trim() || !form.notes.trim()) return;
    const entry: FeedbackEntry = {
      id: Date.now().toString(),
      ...form,
      date: new Date().toLocaleDateString("es-CL"),
    };
    save([entry, ...entries]);
    setForm({ tester: "", role: "cliente", category: "impresion", notes: "" });
    setShowForm(false);
  };

  const deleteEntry = (id: string) => {
    save(entries.filter((e) => e.id !== id));
  };

  const filtered = entries.filter((e) => {
    const roleOk = filterRole === "todos" || e.role === filterRole;
    const catOk = filterCat === "todas" || e.category === filterCat;
    return roleOk && catOk;
  });

  if (!ready) return null;

  return (
    <div
      className="min-h-screen pb-16"
      style={{ backgroundColor: "#fdf9f6" }}
    >
      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-3xl font-bold text-stone-900 mb-3"
            style={{ fontFamily: "var(--font-rubik), sans-serif" }}
          >
            Feedback de testers
          </h1>
          <p className="text-stone-600 leading-relaxed">
            Acá vas documentando el feedback que recibís. Cada vez que un tester
            te mande sus audios de WhatsApp, agrega un resumen acá para tener
            todo consolidado.
          </p>
        </div>

        {/* How testers send feedback */}
        <div className="bg-white rounded-2xl border border-stone-100 p-5 mb-6">
          <h2
            className="font-semibold text-stone-900 mb-3"
            style={{ fontFamily: "var(--font-rubik), sans-serif" }}
          >
            Cómo recibir feedback de los testers
          </h2>
          <p className="text-stone-600 text-sm leading-relaxed mb-4">
            Al finalizar sus misiones, cada tester te manda tres audios de
            WhatsApp al número de Manito.
          </p>
          <a
            href="https://wa.me/16088933997"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-white rounded-xl font-medium text-sm transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#25D366" }}
          >
            <span>💬</span> Abrir WhatsApp Business
          </a>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {Object.entries(CATEGORIES)
              .filter(([k]) => k !== "otro")
              .map(([, v]) => (
                <div
                  key={v.label}
                  className="text-center p-3 bg-stone-50 rounded-xl text-sm text-stone-600"
                >
                  <div className="text-xl mb-1">{v.emoji}</div>
                  <div className="font-medium text-xs">{v.label}</div>
                </div>
              ))}
          </div>
        </div>

        {/* Stats */}
        {entries.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { label: "Total", value: entries.length, color: "#1c1c1c" },
              {
                label: "Clientes",
                value: entries.filter((e) => e.role === "cliente").length,
                color: "#f26a4b",
              },
              {
                label: "Maestros",
                value: entries.filter((e) => e.role === "maestro").length,
                color: "#1a7f8e",
              },
              {
                label: "Bugs",
                value: entries.filter((e) => e.category === "bugs").length,
                color: "#d97706",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-xl p-4 border border-stone-100 text-center"
              >
                <div
                  className="text-2xl font-bold"
                  style={{
                    color: stat.color,
                    fontFamily: "var(--font-rubik), sans-serif",
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-stone-500 text-xs mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Filters + Add button */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-3 py-1.5 text-sm border border-stone-200 rounded-lg bg-white text-stone-700 outline-none"
          >
            <option value="todos">Todos los roles</option>
            <option value="cliente">Clientes</option>
            <option value="maestro">Maestros</option>
          </select>
          <select
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
            className="px-3 py-1.5 text-sm border border-stone-200 rounded-lg bg-white text-stone-700 outline-none"
          >
            <option value="todas">Todas las categorías</option>
            {Object.entries(CATEGORIES).map(([k, v]) => (
              <option key={k} value={k}>
                {v.emoji} {v.label}
              </option>
            ))}
          </select>
          <div className="flex-1" />
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-1.5 text-sm font-medium text-white rounded-lg transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#f26a4b" }}
          >
            + Agregar feedback
          </button>
        </div>

        {/* Add form modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
              <h3
                className="font-semibold text-stone-900 text-lg mb-5"
                style={{ fontFamily: "var(--font-rubik), sans-serif" }}
              >
                Agregar feedback
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    Tester
                  </label>
                  <input
                    type="text"
                    placeholder="Nombre del tester"
                    value={form.tester}
                    onChange={(e) =>
                      setForm({ ...form, tester: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm outline-none focus:border-stone-400"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      Rol
                    </label>
                    <select
                      value={form.role}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          role: e.target.value as "cliente" | "maestro",
                        })
                      }
                      className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm outline-none focus:border-stone-400"
                    >
                      <option value="cliente">Cliente</option>
                      <option value="maestro">Maestro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      Categoría
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          category: e.target.value as FeedbackEntry["category"],
                        })
                      }
                      className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm outline-none focus:border-stone-400"
                    >
                      {Object.entries(CATEGORIES).map(([k, v]) => (
                        <option key={k} value={k}>
                          {v.emoji} {v.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    Notas / resumen del audio
                  </label>
                  <textarea
                    placeholder="Qué dijo el tester..."
                    value={form.notes}
                    onChange={(e) =>
                      setForm({ ...form, notes: e.target.value })
                    }
                    rows={4}
                    className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm outline-none focus:border-stone-400 resize-none"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-2 text-sm font-medium text-stone-600 bg-stone-100 rounded-xl hover:bg-stone-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={addEntry}
                  className="flex-1 py-2 text-sm font-medium text-white rounded-xl transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#f26a4b" }}
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Entries list */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-stone-400">
            <div className="text-4xl mb-3">📭</div>
            <p className="font-medium text-stone-500">
              {entries.length === 0
                ? "Aún no hay feedback registrado"
                : "No hay entradas con ese filtro"}
            </p>
            {entries.length === 0 && (
              <p className="text-sm mt-1">
                Agrega el primer feedback cuando recibas los audios
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((entry) => {
              const cat = CATEGORIES[entry.category];
              const isCliente = entry.role === "cliente";
              const accent = isCliente ? "#f26a4b" : "#1a7f8e";
              const accentLight = isCliente ? "#fde8e1" : "#d6f0f3";
              return (
                <div
                  key={entry.id}
                  className="bg-white rounded-2xl border border-stone-100 p-5"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span
                        className="font-semibold text-stone-900"
                        style={{ fontFamily: "var(--font-rubik), sans-serif" }}
                      >
                        {entry.tester}
                      </span>
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-medium capitalize"
                        style={{
                          backgroundColor: accentLight,
                          color: accent,
                        }}
                      >
                        {entry.role}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-stone-100 text-stone-600">
                        {cat.emoji} {cat.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-stone-400">{entry.date}</span>
                      <button
                        onClick={() => deleteEntry(entry.id)}
                        className="text-stone-300 hover:text-red-400 transition-colors text-sm"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  <p className="text-stone-700 text-sm leading-relaxed whitespace-pre-wrap">
                    {entry.notes}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
