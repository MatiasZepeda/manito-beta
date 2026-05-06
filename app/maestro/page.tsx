"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { maestroMissions } from "@/lib/content";
import { MissionCard } from "@/components/MissionCard";
import type { MissionFeedback } from "@/components/MissionCard";
import { isSurveyDone, getProfile, getRole } from "@/lib/session";

const STORAGE_KEY = "manito-beta-maestro-v2";
const TEAL = "#1a7f8e";
const TEAL_LIGHT = "#d6f0f3";

export default function MaestroPage() {
  const [feedback, setFeedback] = useState<Record<string, MissionFeedback>>({});
  const [ready, setReady] = useState(false);
  const [surveyDone, setSurveyDone] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setFeedback(JSON.parse(saved));
    setSurveyDone(isSurveyDone());
    setReady(true);
  }, []);

  const complete = (id: string, data: MissionFeedback) => {
    const next = { ...feedback, [id]: data };
    setFeedback(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    const profile = getProfile();
    if (profile) {
      fetch("/api/sync/mission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: profile.session_id,
          mission_id: id,
          role: getRole() ?? "maestro",
          ease: data.ease,
          comment: data.comment,
          action: "complete",
        }),
      }).catch(() => {});
    }
  };

  const uncomplete = (id: string) => {
    const next = { ...feedback };
    delete next[id];
    setFeedback(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    const profile = getProfile();
    if (profile) {
      fetch("/api/sync/mission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: profile.session_id,
          mission_id: id,
          action: "uncomplete",
        }),
      }).catch(() => {});
    }
  };

  const completedMissions = maestroMissions.filter((m) => feedback[m.id]).length;
  const allRequiredDone = completedMissions === maestroMissions.length;

  if (!ready) return null;

  return (
    <div className="min-h-screen pb-16" style={{ backgroundColor: "#fdf9f6" }}>
      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <span
            className="inline-block px-3 py-1 text-xs font-medium rounded-full mb-4 uppercase tracking-wide"
            style={{
              backgroundColor: TEAL_LIGHT,
              color: TEAL,
              fontFamily: "var(--font-rubik), sans-serif",
            }}
          >
            Guía Beta: Maestro
          </span>
          <h1
            className="text-3xl font-bold text-stone-900 mb-3"
            style={{ fontFamily: "var(--font-rubik), sans-serif" }}
          >
            Tus misiones 🔧
          </h1>
          <p className="text-stone-600 leading-relaxed">
            Usa la app como si fuera tu primera vez. Si algo te costó encontrar
            o no tenía sentido para tu forma de trabajar, eso es exactamente lo
            que necesitamos saber. Tú eres el experto en la pega.
          </p>

          {/* Error report banner */}
          <div
            className="mt-4 rounded-xl p-4 border flex items-start gap-3"
            style={{ backgroundColor: "#f0f9fa", borderColor: `${TEAL}30` }}
          >
            <span className="text-lg shrink-0">📸</span>
            <p className="text-sm text-stone-600 leading-relaxed">
              <strong className="text-stone-800">¿Ves algún error?</strong>{" "}
              Mándanos un pantallazo de lo que ves por WhatsApp y cuéntanos
              dónde ocurrió.{" "}
              <a
                href="https://wa.me/16088933997"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
                style={{ color: TEAL }}
              >
                Escribir por WhatsApp
              </a>
            </p>
          </div>

          {/* Progress */}
          <div className="mt-5 bg-white rounded-xl p-4 border border-stone-100">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-stone-600 font-medium">
                Misiones completadas
              </span>
              <span
                className="font-bold"
                style={{
                  color: TEAL,
                  fontFamily: "var(--font-rubik), sans-serif",
                }}
              >
                {completedMissions}/{maestroMissions.length}
              </span>
            </div>
            <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(completedMissions / maestroMissions.length) * 100}%`,
                  backgroundColor: TEAL,
                }}
              />
            </div>
          </div>
        </div>

        {/* Intro */}
        <details className="group mb-4 bg-white rounded-2xl border border-stone-100 overflow-hidden">
          <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
            <span
              className="font-semibold text-stone-800"
              style={{ fontFamily: "var(--font-rubik), sans-serif" }}
            >
              ¿Qué es Manito y para qué te sirve?
            </span>
            <span className="text-stone-400 text-lg transition-transform duration-200 group-open:rotate-180">
              ▾
            </span>
          </summary>
          <div className="px-5 pb-5 border-t border-stone-50 pt-4 text-stone-600 text-sm leading-relaxed space-y-3">
            <p>
              La pega entra de boca en boca no más. Y cuando el teléfono no
              suena, no hay mucho que hacer. Manito existe para que eso cambie:
              clientes que necesitan maestros como tú publican sus trabajos
              dentro de la app, tú ves las solicitudes, decides cuáles te
              interesan, mandas tu cotización, y si te eligen, el trabajo queda
              coordinado ahí mismo.
            </p>
            <p>
              Sin depender de contactos, sin regatear por WhatsApp, y con el
              precio acordado antes de que pongas un pie en la casa del cliente.
            </p>
            <p>
              Estamos en beta. La app funciona, pero queremos que maestros
              reales la prueben antes de abrirla al público. Tu experiencia como
              profesional vale más que cualquier otra cosa en este momento.
            </p>
          </div>
        </details>

        {/* Founders callout */}
        <div
          className="mb-6 rounded-2xl p-5 border"
          style={{ backgroundColor: TEAL_LIGHT, borderColor: `${TEAL}30` }}
        >
          <h3
            className="font-semibold mb-2"
            style={{
              color: TEAL,
              fontFamily: "var(--font-rubik), sans-serif",
            }}
          >
            Eres un maestro fundador 🌟
          </h3>
          <p className="text-stone-700 text-sm leading-relaxed">
            Estás entre los primeros maestros en probar Manito. Martín va a
            coordinar una videollamada de WhatsApp contigo para acompañarte en
            el recorrido de todas las funciones. Eso es adicional a estas
            misiones. Te va a contactar en los próximos días.
          </p>
        </div>

        {/* Missions */}
        <h2
          className="font-semibold text-stone-800 mb-3 text-lg"
          style={{ fontFamily: "var(--font-rubik), sans-serif" }}
        >
          Tus {maestroMissions.length} misiones
        </h2>
        <div className="space-y-3 mb-10">
          {maestroMissions.map((mission) => (
            <MissionCard
              key={mission.id}
              mission={mission}
              accent={TEAL}
              accentLight={TEAL_LIGHT}
              feedback={feedback}
              onComplete={complete}
              onUncomplete={uncomplete}
            />
          ))}
        </div>

        {/* Survey banner */}
        {allRequiredDone && !surveyDone && (
          <div
            className="mb-6 rounded-2xl p-5 border-2 text-center"
            style={{ backgroundColor: TEAL_LIGHT, borderColor: TEAL }}
          >
            <p className="text-2xl mb-2">🎯</p>
            <h3
              className="font-bold text-stone-900 mb-2"
              style={{ fontFamily: "var(--font-rubik), sans-serif" }}
            >
              ¡Terminaste todas las misiones!
            </h3>
            <p className="text-stone-600 text-sm mb-4 leading-relaxed">
              Ahora viene lo más importante: el cuestionario final. Son 7
              preguntas y menos de 5 minutos.
            </p>
            <button
              onClick={() => router.push("/encuesta")}
              className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: TEAL, fontFamily: "var(--font-rubik), sans-serif" }}
            >
              Ir al cuestionario final →
            </button>
          </div>
        )}

        {allRequiredDone && surveyDone && (
          <div
            className="mb-6 rounded-2xl p-5 border-2 text-center"
            style={{ backgroundColor: "#f0fdf4", borderColor: "#86efac" }}
          >
            <p className="text-2xl mb-2">✅</p>
            <h3
              className="font-bold text-stone-900 mb-1"
              style={{ fontFamily: "var(--font-rubik), sans-serif" }}
            >
              ¡Cuestionario completado!
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Gracias por tu feedback. Te contactaremos pronto.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
