"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { maestroMissions } from "@/lib/content";
import { MissionCard } from "@/components/MissionCard";
import type { MissionFeedback } from "@/components/MissionCard";
import { isSurveyDone } from "@/lib/session";

const STORAGE_KEY = "manito-beta-maestro-v2";
const TEAL = "#1a7f8e";
const TEAL_LIGHT = "#d6f0f3";

export default function MaestroPage() {
  const [feedback, setFeedback] = useState<Record<string, MissionFeedback>>({});
  const [ready, setReady] = useState(false);
  const [writeText, setWriteText] = useState("");
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
  };

  const uncomplete = (id: string) => {
    const next = { ...feedback };
    delete next[id];
    setFeedback(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const completedMissions = maestroMissions.filter((m) => feedback[m.id]).length;
  const allRequiredDone = completedMissions === maestroMissions.length;

  const handleSendText = () => {
    const msg = encodeURIComponent(
      writeText.trim() || "Hola, tengo feedback sobre la beta de Manito."
    );
    window.open(`https://wa.me/16088933997?text=${msg}`, "_blank");
  };

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

        {/* Feedback */}
        <div className="bg-white rounded-2xl border-2 border-stone-100 p-6">
          <h2
            className="font-semibold text-stone-900 text-lg mb-1"
            style={{ fontFamily: "var(--font-rubik), sans-serif" }}
          >
            Cuando termines
          </h2>
          <p className="text-stone-600 text-sm mb-4 leading-relaxed">
            Mándanos un audio de WhatsApp con tus impresiones sobre la app. No
            tienes que preparar nada, habla natural. Puedes comentar sobre
            cualquier cosa, por ejemplo:
          </p>

          <div className="space-y-2 mb-5">
            {[
              {
                emoji: "💭",
                text: "¿Ves cómo Manito te podría ayudar a conseguir más pega o a organizar mejor tu trabajo? La impresión honesta, buena o mala.",
              },
              {
                emoji: "🐛",
                text: "Cosas que no funcionaron o no entendiste: qué pantalla, qué pasó, qué hiciste antes.",
              },
              {
                emoji: "🧭",
                text: "Qué tan fácil o difícil fue navegar: ¿hubo algún momento donde no supiste adónde ir o qué hacer?",
              },
            ].map((item) => (
              <div
                key={item.text}
                className="flex gap-3 p-3 bg-stone-50 rounded-xl"
              >
                <span className="text-base shrink-0">{item.emoji}</span>
                <p className="text-stone-600 text-xs leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <a
            href="https://wa.me/16088933997"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 text-white rounded-xl font-medium text-sm transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#25D366" }}
          >
            <span>💬</span> Mandar audio por WhatsApp
          </a>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-stone-100" />
            <span className="text-xs text-stone-400 shrink-0">
              o escríbenos aquí
            </span>
            <div className="flex-1 h-px bg-stone-100" />
          </div>

          <textarea
            value={writeText}
            onChange={(e) => setWriteText(e.target.value)}
            placeholder="Escribe tu feedback aquí y lo enviamos por WhatsApp..."
            className="w-full rounded-xl border border-stone-200 p-3.5 text-sm text-stone-700 placeholder-stone-400 resize-none outline-none focus:border-stone-300 transition-colors mb-3"
            rows={4}
          />

          <button
            onClick={handleSendText}
            className="w-full py-3 rounded-xl font-medium text-sm transition-opacity hover:opacity-90 border-2"
            style={{ borderColor: "#25D366", color: "#25D366" }}
          >
            Enviar por WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
