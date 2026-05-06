"use client";

import { useState, useEffect, useCallback } from "react";

interface MissionFeedbackRow {
  id: string;
  mission_id: string;
  ease: number;
  comment: string;
  completed_at: string;
}

interface SurveyRow {
  overall_ease: number;
  role_specific: number;
  would_use: string;
  nps: number;
  liked_most: string;
  liked_least: string;
  would_change: string;
}

interface Tester {
  id: string;
  session_id: string;
  name: string;
  email: string;
  phone: string;
  os: string;
  role: string | null;
  created_at: string;
  mission_feedback: MissionFeedbackRow[];
  final_surveys: SurveyRow[];
}

const ADMIN_KEY = "manito_admin_auth";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [testers, setTesters] = useState<Tester[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  const fetchData = useCallback(async (pwd: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/data", {
        headers: { Authorization: `Bearer ${pwd}` },
      });
      if (res.status === 401) {
        sessionStorage.removeItem(ADMIN_KEY);
        setAuthed(false);
        setError("Contraseña incorrecta");
        return;
      }
      const json = await res.json();
      setTesters(json.testers ?? []);
      setAuthed(true);
    } catch {
      setError("Error cargando datos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem(ADMIN_KEY);
    if (saved) {
      fetchData(saved);
    }
    setReady(true);
  }, [fetchData]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem(ADMIN_KEY, password);
    fetchData(password);
  };

  if (!ready) return null;

  if (!authed) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ backgroundColor: "#fdf9f6" }}
      >
        <div className="w-full max-w-sm bg-white rounded-2xl border border-stone-100 p-6 shadow-sm">
          <h1
            className="text-xl font-bold text-stone-900 mb-1"
            style={{ fontFamily: "var(--font-rubik), sans-serif" }}
          >
            Admin Dashboard
          </h1>
          <p className="text-stone-500 text-sm mb-5">Manito Beta Testing</p>
          <form onSubmit={handleLogin} className="space-y-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              autoFocus
              className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-400 transition-colors"
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 rounded-xl text-white font-medium text-sm transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "#f26a4b",
                fontFamily: "var(--font-rubik), sans-serif",
              }}
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  const surveysCompleted = testers.filter((t) => t.final_surveys?.length > 0).length;
  const allNps = testers
    .flatMap((t) => t.final_surveys ?? [])
    .map((s) => s.nps)
    .filter((n) => n != null);
  const avgNps =
    allNps.length > 0
      ? (allNps.reduce((a, b) => a + b, 0) / allNps.length).toFixed(1)
      : "—";

  return (
    <div className="min-h-screen pb-16" style={{ backgroundColor: "#fdf9f6" }}>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1
              className="text-2xl font-bold text-stone-900"
              style={{ fontFamily: "var(--font-rubik), sans-serif" }}
            >
              Admin Dashboard
            </h1>
            <p className="text-stone-500 text-sm mt-1">Manito Beta Testing</p>
          </div>
          <div className="flex gap-3 items-center">
            <button
              onClick={() => fetchData(sessionStorage.getItem(ADMIN_KEY) ?? "")}
              className="text-sm text-stone-500 hover:text-stone-800 transition-colors px-3 py-1.5 rounded-lg bg-white border border-stone-100"
            >
              Actualizar
            </button>
            <button
              onClick={() => {
                sessionStorage.removeItem(ADMIN_KEY);
                setAuthed(false);
              }}
              className="text-sm text-stone-400 hover:text-stone-600 transition-colors"
            >
              Cerrar sesión
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: "Total testers", value: testers.length },
            { label: "Clientes", value: testers.filter((t) => t.role === "cliente").length },
            { label: "Maestros", value: testers.filter((t) => t.role === "maestro").length },
            { label: "Encuestas completadas", value: surveysCompleted },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-xl border border-stone-100 p-4 text-center"
            >
              <p
                className="text-2xl font-bold text-stone-900"
                style={{ fontFamily: "var(--font-rubik), sans-serif" }}
              >
                {s.value}
              </p>
              <p className="text-xs text-stone-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {allNps.length > 0 && (
          <div className="bg-white rounded-xl border border-stone-100 p-4 mb-6 flex items-center gap-4">
            <div>
              <p
                className="text-3xl font-bold"
                style={{
                  color: "#f26a4b",
                  fontFamily: "var(--font-rubik), sans-serif",
                }}
              >
                {avgNps}
              </p>
              <p className="text-xs text-stone-400">NPS promedio (0-10)</p>
            </div>
            <div className="flex-1 text-sm text-stone-500 leading-relaxed">
              Basado en {allNps.length} encuesta{allNps.length !== 1 ? "s" : ""} completada{allNps.length !== 1 ? "s" : ""}.
            </div>
          </div>
        )}

        {loading && (
          <p className="text-stone-400 text-sm text-center py-10">Cargando...</p>
        )}

        {!loading && testers.length === 0 && (
          <p className="text-stone-400 text-sm text-center py-10">
            Aún no hay beta testers registrados.
          </p>
        )}

        <div className="space-y-3">
          {testers.map((t) => {
            const survey = t.final_surveys?.[0];
            const missionCount = t.mission_feedback?.length ?? 0;
            const isExpanded = expanded === t.id;
            return (
              <div
                key={t.id}
                className="bg-white rounded-2xl border border-stone-100 overflow-hidden"
              >
                <button
                  onClick={() => setExpanded(isExpanded ? null : t.id)}
                  className="w-full text-left p-5 flex items-center gap-4"
                >
                  <div className="flex-1 grid grid-cols-2 sm:grid-cols-5 gap-2 items-center min-w-0">
                    <div className="col-span-2 sm:col-span-1 min-w-0">
                      <p
                        className="font-semibold text-stone-900 text-sm truncate"
                        style={{ fontFamily: "var(--font-rubik), sans-serif" }}
                      >
                        {t.name}
                      </p>
                      <p className="text-xs text-stone-400 truncate">{t.email}</p>
                    </div>
                    <p className="text-xs text-stone-500 hidden sm:block uppercase">
                      {t.os}
                    </p>
                    <p className="text-xs text-stone-500 hidden sm:block capitalize">
                      {t.role ?? "Sin rol"}
                    </p>
                    <p className="text-xs text-stone-500 hidden sm:block">
                      {missionCount} misiones
                    </p>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full w-fit ${
                        survey
                          ? "bg-green-100 text-green-700"
                          : "bg-stone-100 text-stone-500"
                      }`}
                    >
                      {survey ? "✓ Encuesta" : "Pendiente"}
                    </span>
                  </div>
                  <span className="text-stone-400 text-lg shrink-0">
                    {isExpanded ? "▴" : "▾"}
                  </span>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-stone-50 pt-4 space-y-5">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      {[
                        ["Teléfono", t.phone],
                        ["OS", t.os],
                        ["Rol", t.role ?? "—"],
                        ["Registrado", new Date(t.created_at).toLocaleDateString("es-CL")],
                      ].map(([label, val]) => (
                        <div key={label}>
                          <span className="text-stone-400">{label}: </span>
                          <span className="text-stone-700 capitalize">{val}</span>
                        </div>
                      ))}
                    </div>

                    {t.mission_feedback?.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-2">
                          Misiones completadas ({missionCount})
                        </p>
                        <div className="space-y-1.5 max-h-48 overflow-y-auto">
                          {t.mission_feedback.map((m) => (
                            <div
                              key={m.id}
                              className="flex items-start gap-3 p-2.5 bg-stone-50 rounded-lg"
                            >
                              <span className="text-xs font-bold text-stone-500 w-12 shrink-0">
                                {m.mission_id}
                              </span>
                              <span className="text-xs text-stone-600">
                                Dificultad: {m.ease}/5
                              </span>
                              {m.comment && (
                                <span className="text-xs text-stone-500 italic">
                                  &quot;{m.comment}&quot;
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {survey && (
                      <div>
                        <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-2">
                          Encuesta final
                        </p>
                        <div className="bg-stone-50 rounded-xl p-4 space-y-2 text-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <p>
                              <span className="text-stone-400">Facilidad: </span>
                              <strong>{survey.overall_ease}/10</strong>
                            </p>
                            <p>
                              <span className="text-stone-400">Específico: </span>
                              <strong>{survey.role_specific}/5</strong>
                            </p>
                            <p>
                              <span className="text-stone-400">¿Lo usaría?: </span>
                              <strong>{survey.would_use}</strong>
                            </p>
                            <p>
                              <span className="text-stone-400">NPS: </span>
                              <strong>{survey.nps}/10</strong>
                            </p>
                          </div>
                          {survey.liked_most && (
                            <p className="text-xs">
                              <span className="text-stone-400">Gustó: </span>
                              <span className="text-stone-600">{survey.liked_most}</span>
                            </p>
                          )}
                          {survey.liked_least && (
                            <p className="text-xs">
                              <span className="text-stone-400">No gustó: </span>
                              <span className="text-stone-600">{survey.liked_least}</span>
                            </p>
                          )}
                          {survey.would_change && (
                            <p className="text-xs">
                              <span className="text-stone-400">Cambiaría: </span>
                              <span className="text-stone-600">{survey.would_change}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
