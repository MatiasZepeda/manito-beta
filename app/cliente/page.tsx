"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { clienteMissions } from "@/lib/content";
import { MissionCard } from "@/components/MissionCard";
import type { MissionFeedback } from "@/components/MissionCard";
import { isSurveyDone, getProfile, getRole } from "@/lib/session";

const STORAGE_KEY = "manito-beta-cliente-v2";
const CORAL = "#f26a4b";
const CORAL_LIGHT = "#fde8e1";

export default function ClientePage() {
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
          role: getRole() ?? "cliente",
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

  const required = clienteMissions.filter((m) => !m.optional);
  const optional = clienteMissions.filter((m) => m.optional);
  const completedMissions = required.filter((m) => feedback[m.id]).length;
  const allRequiredDone = completedMissions === required.length;

  if (!ready) return null;

  return (
    <div className="min-h-screen pb-16" style={{ backgroundColor: "#fdf9f6" }}>
      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <span
            className="inline-block px-3 py-1 text-xs font-medium rounded-full mb-4 uppercase tracking-wide"
            style={{
              backgroundColor: CORAL_LIGHT,
              color: CORAL,
              fontFamily: "var(--font-rubik), sans-serif",
            }}
          >
            Guía Beta: Cliente
          </span>
          <h1
            className="text-3xl font-bold text-stone-900 mb-3"
            style={{ fontFamily: "var(--font-rubik), sans-serif" }}
          >
            Tus misiones 🏠
          </h1>
          <p className="text-stone-600 leading-relaxed">
            Usa la app como si fuera tu primera vez, sin que nadie te explique
            cómo hacerlo. Si algo no se entiende solo, eso es exactamente lo
            que necesitamos saber.
          </p>

          {/* Error report banner */}
          <div
            className="mt-4 rounded-xl p-4 border flex items-start gap-3"
            style={{ backgroundColor: "#fff9f0", borderColor: "#f2994a40" }}
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
                style={{ color: CORAL }}
              >
                Escribir por WhatsApp
              </a>
            </p>
          </div>

          {/* Progress */}
          <div className="mt-5 bg-white rounded-xl p-4 border border-stone-100">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-stone-600 font-medium">
                Misiones principales completadas
              </span>
              <span
                className="font-bold"
                style={{
                  color: CORAL,
                  fontFamily: "var(--font-rubik), sans-serif",
                }}
              >
                {completedMissions}/{required.length}
              </span>
            </div>
            <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(completedMissions / required.length) * 100}%`,
                  backgroundColor: CORAL,
                }}
              />
            </div>
          </div>
        </div>

        {/* Intro: ¿Qué es Manito? */}
        <details className="group mb-4 bg-white rounded-2xl border border-stone-100 overflow-hidden">
          <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
            <span
              className="font-semibold text-stone-800"
              style={{ fontFamily: "var(--font-rubik), sans-serif" }}
            >
              ¿Qué es Manito y por qué existe?
            </span>
            <span className="text-stone-400 text-lg transition-transform duration-200 group-open:rotate-180">
              ▾
            </span>
          </summary>
          <div className="px-5 pb-5 border-t border-stone-50 pt-4 text-stone-600 text-sm leading-relaxed space-y-3">
            <p>
              Encontrar un buen maestro en Chile es difícil. Le preguntas al
              vecino, buscas en el grupo del edificio, alguien te da el número
              del primo del portero, y todavía no sabes si el gallo va a
              aparecer o te va a cobrar lo que se le ocurra.
            </p>
            <p>
              Manito existe para que eso deje de ser así. Describes el trabajo
              que necesitas, los maestros te mandan sus cotizaciones, y tú
              eliges con quién trabajar. Todo dentro de la app, con precio
              acordado antes de que lleguen a tu casa.
            </p>
            <p>
              Estamos en beta. La app funciona, pero queremos que personas
              reales la prueben antes de abrirla al público. Y ahí entras tú.
            </p>
          </div>
        </details>

        {/* Expectations */}
        <div
          className="mb-6 rounded-2xl p-5 border"
          style={{
            backgroundColor: CORAL_LIGHT,
            borderColor: `${CORAL}30`,
          }}
        >
          <h3
            className="font-semibold mb-2"
            style={{
              color: CORAL,
              fontFamily: "var(--font-rubik), sans-serif",
            }}
          >
            Qué esperamos de ti
          </h3>
          <p className="text-stone-700 text-sm leading-relaxed">
            No necesitas saber nada de tecnología. Lo que nos sirve es que uses
            la app como cualquier persona que la descarga por primera vez sin
            que nadie le explique nada. Si algo no lo entendiste, eso es oro
            para nosotros. No hay respuestas buenas ni malas, solo datos.
          </p>
        </div>

        {/* Main missions */}
        <h2
          className="font-semibold text-stone-800 mb-3 text-lg"
          style={{ fontFamily: "var(--font-rubik), sans-serif" }}
        >
          Misiones principales
        </h2>
        <div className="space-y-3 mb-8">
          {required.map((mission) => (
            <MissionCard
              key={mission.id}
              mission={mission}
              accent={CORAL}
              accentLight={CORAL_LIGHT}
              feedback={feedback}
              onComplete={complete}
              onUncomplete={uncomplete}
            />
          ))}
        </div>

        {/* Optional missions */}
        <h2
          className="font-semibold text-stone-800 mb-1 text-lg"
          style={{ fontFamily: "var(--font-rubik), sans-serif" }}
        >
          Misiones opcionales
        </h2>
        <p className="text-stone-500 text-sm mb-3">
          Solo si te las asignamos específicamente.
        </p>
        <div className="space-y-3 mb-10">
          {optional.map((mission) => (
            <MissionCard
              key={mission.id}
              mission={mission}
              accent={CORAL}
              accentLight={CORAL_LIGHT}
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
            style={{ backgroundColor: "#fde8e1", borderColor: "#f26a4b" }}
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
              style={{ backgroundColor: "#f26a4b", fontFamily: "var(--font-rubik), sans-serif" }}
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
