"use client";

import { useState, useEffect } from "react";
import { clienteMissions } from "@/lib/content";
import { MissionCard } from "@/components/MissionCard";

const STORAGE_KEY = "manito-beta-cliente";
const CORAL = "#f26a4b";
const CORAL_LIGHT = "#fde8e1";

export default function ClientePage() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setCompleted(JSON.parse(saved));
    setReady(true);
  }, []);

  const toggle = (id: string) => {
    const next = completed.includes(id)
      ? completed.filter((x) => x !== id)
      : [...completed, id];
    setCompleted(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const required = clienteMissions.filter((m) => !m.optional);
  const optional = clienteMissions.filter((m) => m.optional);
  const completedMissions = required.filter((m) =>
    m.objectives.every((o) => completed.includes(o.id))
  ).length;

  if (!ready) return null;

  return (
    <div
      className="min-h-screen pb-16"
      style={{ backgroundColor: "#fdf9f6" }}
    >
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
            Guía Beta — Cliente
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
            <span className="text-stone-400 text-xs transition-transform duration-200 group-open:rotate-180">
              ▾
            </span>
          </summary>
          <div className="px-5 pb-5 border-t border-stone-50 pt-4 text-stone-600 text-sm leading-relaxed space-y-3">
            <p>
              Buscar maestro en Chile es un deporte extremo. Le preguntas al
              vecino, buscas en el grupo del edificio, alguien te da el número
              del primo del portero, y todavía no sabes si el gallo va a
              aparecer o te va a cobrar lo que se le ocurra.
            </p>
            <p>
              Manito existe para que eso deje de ser así. Describes el trabajo
              que necesitas, los maestros te mandan sus cotizaciones, y tú
              eliges con quién trabajar — todo dentro de la app, con precio
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
            para nosotros. No hay respuestas buenas ni malas — solo datos.
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
              completed={completed}
              onToggle={toggle}
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
              completed={completed}
              onToggle={toggle}
            />
          ))}
        </div>

        {/* Feedback */}
        <div className="bg-white rounded-2xl border-2 border-stone-100 p-6">
          <h2
            className="font-semibold text-stone-900 text-lg mb-1"
            style={{ fontFamily: "var(--font-rubik), sans-serif" }}
          >
            Cuando termines
          </h2>
          <p className="text-stone-600 text-sm mb-5 leading-relaxed">
            Mándanos tres audios de WhatsApp — uno por cada categoría de abajo.
            No tienes que escribir nada. Un audio relajado de 1 a 3 minutos por
            categoría está perfecto.
          </p>

          <a
            href="https://wa.me/16088933997"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 text-white rounded-xl font-medium text-sm transition-opacity hover:opacity-90 mb-5"
            style={{ backgroundColor: "#25D366" }}
          >
            <span>💬</span> Escríbenos por WhatsApp
          </a>

          <div className="space-y-2.5">
            {[
              {
                emoji: "💭",
                title: "Audio 1 — Tu impresión general",
                desc: "¿Tiene sentido el producto? ¿Lo usarías en tu vida real para buscar un maestro? ¿Qué le agregarías o cambiarías?",
              },
              {
                emoji: "🐛",
                title: "Audio 2 — Bugs o cosas que no funcionaron",
                desc: "Si algo se trabó o hizo algo inesperado: en qué pantalla estabas, qué hiciste justo antes, qué fue lo que ocurrió.",
              },
              {
                emoji: "🧭",
                title: "Audio 3 — Navegación",
                desc: "¿Qué tan fácil fue encontrar lo que buscabas? ¿Hubo algún momento donde no supiste qué hacer o adónde ir?",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-3 p-3.5 bg-stone-50 rounded-xl"
              >
                <span className="text-lg mt-0.5 shrink-0">{item.emoji}</span>
                <div>
                  <p className="font-medium text-stone-800 text-sm">
                    {item.title}
                  </p>
                  <p className="text-stone-500 text-xs mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
