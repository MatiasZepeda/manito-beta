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
  created_at?: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [surveys, setSurveys] = useState<SurveyResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterRole, setFilterRole] = useState<"todos" | "cliente" | "profesional">("todos");

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      const res = await fetch("/api/admin/surveys");
      if (!res.ok) {
        if (res.status === 401) {
          router.push("/admin-login");
          return;
        }
        throw new Error("Error fetching surveys");
      }
      const { data } = await res.json();
      setSurveys(data || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    document.cookie = "admin_session=; max-age=0; path=/";
    router.push("/admin-login");
  };

  const filtered = surveys.filter(
    (s) => filterRole === "todos" || s.role === filterRole
  );

  const stats = {
    total: surveys.length,
    clientes: surveys.filter((s) => s.role === "cliente").length,
    profesionales: surveys.filter((s) => s.role === "profesional").length,
    promNPS: surveys.length > 0 ? (surveys.reduce((sum, s) => sum + s.nps, 0) / surveys.length).toFixed(1) : 0,
  };

  return (
    <div
      className="min-h-screen pb-16"
      style={{ backgroundColor: "#fdf9f6" }}
    >
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
            <p className="text-stone-500 text-sm mt-1">Respuestas del Survey</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            Cerrar sesión
          </button>
        </div>

        {/* Stats */}
        {!loading && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { label: "Total", value: stats.total, color: "#1c1c1c" },
              { label: "Clientes", value: stats.clientes, color: "#f26a4b" },
              { label: "Profesionales", value: stats.profesionales, color: "#1a7f8e" },
              { label: "Prom. NPS", value: stats.promNPS, color: "#059669" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-xl p-4 border border-stone-100"
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

        {/* Filter */}
        <div className="mb-4">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value as any)}
            className="px-3 py-2 text-sm border border-stone-200 rounded-lg bg-white outline-none"
          >
            <option value="todos">Todos los roles</option>
            <option value="cliente">Solo Clientes</option>
            <option value="profesional">Solo Profesionales</option>
          </select>
        </div>

        {/* Responses */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-stone-500">Cargando...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-stone-400">Sin respuestas aún</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((survey) => {
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
                        style={{
                          backgroundColor: accentLight,
                          color: accent,
                        }}
                      >
                        {survey.role}
                      </span>
                    </div>
                    {survey.created_at && (
                      <span className="text-xs text-stone-400">
                        {new Date(survey.created_at).toLocaleDateString("es-CL")}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    <div>
                      <div className="text-xs text-stone-500">Facilidad</div>
                      <div className="text-xl font-bold text-stone-900">
                        {survey.overall_ease}/5
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
                        <div className="font-semibold text-stone-700 mb-1">
                          👍 Lo mejor
                        </div>
                        <p className="text-stone-600">{survey.liked_most}</p>
                      </div>
                    )}
                    {survey.liked_least && (
                      <div>
                        <div className="font-semibold text-stone-700 mb-1">
                          👎 Lo mejorable
                        </div>
                        <p className="text-stone-600">{survey.liked_least}</p>
                      </div>
                    )}
                    {survey.would_change && (
                      <div>
                        <div className="font-semibold text-stone-700 mb-1">
                          ✏️ Cambiarías
                        </div>
                        <p className="text-stone-600">{survey.would_change}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
