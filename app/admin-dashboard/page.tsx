"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface SurveyResponse {
  id: string;
  session_id: string;
  role: "cliente" | "profesional";
  overall_ease: number;
  role_specific: number;
  would_use: string;
  nps: number;
  liked_most: string;
  liked_least: string;
  would_change: string;
  completed_at?: string;
}

interface MissionFeedback {
  id: string;
  session_id: string;
  mission_id: string;
  role: string;
  ease: number;
  comment: string;
  completed_at?: string;
}

const MISSION_NAMES: Record<string, string> = {
  c1: "Agrega tu primera propiedad",
  c2: "Crea tu primera solicitud",
  c3: "Entérate de cómo va tu solicitud",
  c4: "Contrata a un profesional",
  c5: "Coordina con tu profesional",
  c6: "Cierra el trabajo",
  c7: "Habla con Manny",
  cA: "Guarda un favorito",
  cB: "Notificaciones",
  cC: "Cambia tu contraseña",
  cD: "Historial de trabajos",
  cE: "Reporta un problema",
  p1: "Perfil profesional",
  p2: "Zona y servicios",
  p3: "Agenda",
  p4: "Pricebook",
  p5: "Encuentra un trabajo",
  p6: "Cotiza un trabajo",
  p7: "Proyecto completo",
  p8: "Reagenda una visita",
  p9: "Coordina con tu cliente",
  pA: "Orden de cambio",
  pB: "Crea tu empresa",
  pC: "Análisis de desempeño",
};

type Tab = "encuestas" | "misiones";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [surveys, setSurveys] = useState<SurveyResponse[]>([]);
  const [missions, setMissions] = useState<MissionFeedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [filterRole, setFilterRole] = useState<"todos" | "cliente" | "profesional">("todos");
  const [tab, setTab] = useState<Tab>("encuestas");
  const [expandedTesters, setExpandedTesters] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setFetchError(null);
    setLoading(true);
    try {
      const [surveyRes, missionRes] = await Promise.all([
        fetch("/api/admin/surveys"),
        fetch("/api/admin/missions"),
      ]);

      if (surveyRes.status === 401 || missionRes.status === 401) {
        router.push("/admin-login");
        return;
      }

      if (!surveyRes.ok) {
        let msg = `Error ${surveyRes.status}`;
        try { const b = await surveyRes.json(); if (b.error) msg = b.error; } catch {}
        throw new Error(msg);
      }
      if (!missionRes.ok) {
        let msg = `Error ${missionRes.status}`;
        try { const b = await missionRes.json(); if (b.error) msg = b.error; } catch {}
        throw new Error(msg);
      }

      const surveyData = await surveyRes.json();
      const missionData = await missionRes.json();
      setSurveys(surveyData.data || []);
      setMissions(missionData.data || []);
    } catch (error) {
      setFetchError(error instanceof Error ? `${error.name}: ${error.message}` : "Error cargando datos");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
    router.push("/admin-login");
  };

  const filteredSurveys = surveys.filter(
    (s) => filterRole === "todos" || s.role === filterRole
  );
  const filteredMissions = missions.filter(
    (m) => filterRole === "todos" || m.role === filterRole
  );

  const missionsBySession = filteredMissions.reduce<Record<string, MissionFeedback[]>>((acc, m) => {
    (acc[m.session_id] ??= []).push(m);
    return acc;
  }, {});

  const surveyStats = {
    total: surveys.length,
    clientes: surveys.filter((s) => s.role === "cliente").length,
    profesionales: surveys.filter((s) => s.role === "profesional").length,
    promNPS: surveys.length > 0 ? (surveys.reduce((sum, s) => sum + s.nps, 0) / surveys.length).toFixed(1) : "–",
  };

  const missionStats = {
    total: missions.length,
    testers: new Set(missions.map((m) => m.session_id)).size,
    promEase: missions.length > 0 ? (missions.reduce((sum, m) => sum + m.ease, 0) / missions.length).toFixed(1) : "–",
    conComentario: missions.filter((m) => m.comment && m.comment.trim()).length,
  };

  return (
    <div className="min-h-screen pb-16" style={{ backgroundColor: "#fdf9f6" }}>
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1
              className="text-3xl font-bold text-stone-900"
              style={{ fontFamily: "var(--font-rubik), sans-serif" }}
            >
              Admin Dashboard
            </h1>
            <p className="text-stone-500 text-sm mt-1">Beta Testing — Misiones y Encuestas</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            Cerrar sesión
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {([["misiones", `Misiones (${new Set(missions.map((m) => m.session_id)).size} testers)`], ["encuestas", `Encuestas (${surveys.length})`]] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
              style={{
                backgroundColor: tab === key ? "#1c1c1c" : "white",
                color: tab === key ? "white" : "#57534e",
                border: tab === key ? "none" : "1px solid #e7e5e4",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Filter */}
        <div className="mb-4">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value as "todos" | "cliente" | "profesional")}
            className="px-3 py-2 text-sm border border-stone-200 rounded-lg bg-white outline-none"
          >
            <option value="todos">Todos los roles</option>
            <option value="cliente">Solo Clientes</option>
            <option value="profesional">Solo Profesionales</option>
          </select>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-stone-500">Cargando...</p>
          </div>
        ) : fetchError ? (
          <div className="text-center py-12">
            <p className="text-red-600 font-medium mb-2">Error al cargar</p>
            <p className="text-stone-500 text-sm mb-4">{fetchError}</p>
            <button
              onClick={() => fetchAll()}
              className="px-4 py-2 text-sm font-medium text-white bg-stone-800 rounded-lg hover:bg-stone-900 transition-colors"
            >
              Reintentar
            </button>
          </div>
        ) : tab === "misiones" ? (
          <>
            {/* Mission Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { label: "Feedback total", value: missionStats.total, color: "#1c1c1c" },
                { label: "Testers", value: missionStats.testers, color: "#7c3aed" },
                { label: "Prom. Facilidad", value: missionStats.promEase, color: "#059669" },
                { label: "Con comentario", value: missionStats.conComentario, color: "#d97706" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-xl p-4 border border-stone-100">
                  <div
                    className="text-2xl font-bold"
                    style={{ color: stat.color, fontFamily: "var(--font-rubik), sans-serif" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-stone-500 text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Missions by session */}
            {Object.keys(missionsBySession).length === 0 ? (
              <div className="text-center py-12">
                <p className="text-stone-400">Sin feedback de misiones aún</p>
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(missionsBySession).map(([sessionId, feedbacks]) => {
                  const role = feedbacks[0]?.role;
                  const accent = role === "cliente" ? "#f26a4b" : "#1a7f8e";
                  const accentLight = role === "cliente" ? "#fde8e1" : "#d6f0f3";
                  const sorted = [...feedbacks].sort((a, b) => a.mission_id.localeCompare(b.mission_id));
                  return (
                    <div key={sessionId} className="bg-white rounded-2xl border border-stone-100">
                      <button
                        onClick={() => {
                          const next = new Set(expandedTesters);
                          if (next.has(sessionId)) next.delete(sessionId);
                          else next.add(sessionId);
                          setExpandedTesters(next);
                        }}
                        className="w-full text-left p-5 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-stone-400">
                            {sessionId.substring(0, 8)}
                          </span>
                          <span
                            className="px-2 py-0.5 rounded-full text-xs font-medium capitalize"
                            style={{ backgroundColor: accentLight, color: accent }}
                          >
                            {role}
                          </span>
                          <span className="text-xs text-stone-400">
                            {feedbacks.length} misiones · prom {(feedbacks.reduce((s, f) => s + f.ease, 0) / feedbacks.length).toFixed(1)}/5
                          </span>
                        </div>
                        <span
                          className="text-stone-400 text-lg transition-transform duration-200"
                          style={{ transform: expandedTesters.has(sessionId) ? "rotate(180deg)" : "rotate(0deg)" }}
                        >
                          ▾
                        </span>
                      </button>
                      {expandedTesters.has(sessionId) && (
                        <div className="px-5 pb-5 space-y-3">
                          {sorted.map((fb) => (
                            <div key={fb.id} className="border border-stone-100 rounded-xl p-3">
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                  <span
                                    className="text-xs font-bold px-1.5 py-0.5 rounded"
                                    style={{ backgroundColor: accentLight, color: accent }}
                                  >
                                    {fb.mission_id.toUpperCase()}
                                  </span>
                                  <span className="text-sm font-medium text-stone-700">
                                    {MISSION_NAMES[fb.mission_id] || fb.mission_id}
                                  </span>
                                </div>
                                <span className="text-sm font-bold text-stone-900">{fb.ease}/5</span>
                              </div>
                              {fb.comment && fb.comment.trim() && (
                                <p className="text-sm text-stone-600 mt-1 pl-1">
                                  💬 {fb.comment}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          <>
            {/* Survey Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { label: "Total", value: surveyStats.total, color: "#1c1c1c" },
                { label: "Clientes", value: surveyStats.clientes, color: "#f26a4b" },
                { label: "Profesionales", value: surveyStats.profesionales, color: "#1a7f8e" },
                { label: "Prom. NPS", value: surveyStats.promNPS, color: "#059669" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-xl p-4 border border-stone-100">
                  <div
                    className="text-2xl font-bold"
                    style={{ color: stat.color, fontFamily: "var(--font-rubik), sans-serif" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-stone-500 text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Survey responses */}
            {filteredSurveys.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-stone-400">Sin respuestas aún</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredSurveys.map((survey) => {
                  const accent = survey.role === "cliente" ? "#f26a4b" : "#1a7f8e";
                  const accentLight = survey.role === "cliente" ? "#fde8e1" : "#d6f0f3";
                  return (
                    <div
                      key={survey.id}
                      className="bg-white rounded-2xl border border-stone-100 p-5"
                    >
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-stone-400">
                            {survey.session_id.substring(0, 8)}
                          </span>
                          <span
                            className="px-2 py-0.5 rounded-full text-xs font-medium capitalize"
                            style={{ backgroundColor: accentLight, color: accent }}
                          >
                            {survey.role}
                          </span>
                        </div>
                        {survey.completed_at && (
                          <span className="text-xs text-stone-400">
                            {new Date(survey.completed_at).toLocaleDateString("es-CL")}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                        <div>
                          <div className="text-xs text-stone-500">Facilidad</div>
                          <div className="text-xl font-bold text-stone-900">
                            {survey.overall_ease}/10
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-stone-500">Específico</div>
                          <div className="text-xl font-bold text-stone-900">
                            {survey.role_specific}/5
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-stone-500">NPS</div>
                          <div className="text-xl font-bold text-stone-900">
                            {survey.nps}/10
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-stone-500">Usaría</div>
                          <div className="text-xs font-medium text-stone-700">
                            {survey.would_use}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 text-sm">
                        {survey.liked_most && (
                          <div>
                            <div className="font-semibold text-stone-700 mb-1">👍 Lo mejor</div>
                            <p className="text-stone-600">{survey.liked_most}</p>
                          </div>
                        )}
                        {survey.liked_least && (
                          <div>
                            <div className="font-semibold text-stone-700 mb-1">👎 Lo mejorable</div>
                            <p className="text-stone-600">{survey.liked_least}</p>
                          </div>
                        )}
                        {survey.would_change && (
                          <div>
                            <div className="font-semibold text-stone-700 mb-1">✏️ Cambiarías</div>
                            <p className="text-stone-600">{survey.would_change}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
