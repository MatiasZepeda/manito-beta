"use client";

import { useState, useEffect } from "react";
import { maestroMissions } from "@/lib/content";
import { MissionCard } from "@/components/MissionCard";

const STORAGE_KEY = "manito-beta-maestro";
const TEAL = "#1a7f8e";
const TEAL_LIGHT = "#d6f0f3";

export default function MaestroPage() {
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

  const completedMissions = maestroMissions.filter((m) =>
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
              backgroundColor: TEAL_LIGHT,
              color: TEAL,
              fontFamily: "var(--font-rubik), sans-serif",
            }}
          >
            Guía Beta — Maestro
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

        {/* Intro: ¿Qué es Manito? */}
        <details className="group mb-4 bg-white rounded-2xl border border-stone-100 overflow-hidden">
          <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
            <span
              className="font-semibold text-stone-800"
              style={{ fontFamily: "var(--font-rubik), sans-serif" }}
            >
              ¿Qué es Manito y para qué te sirve?
            </span>
            <span className="text-stone-400 text-xs transition-transform duration-200 group-open:rotate-180">
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
          style={{
            backgroundColor: TEAL_LIGHT,
            borderColor: `${TEAL}30`,
          }}
        >
          <h3
            className="font-semibold mb-2"
            style={{
              color: TEAL,
              fontFamily: "var(--font-rubik), sans-serif",
            }}
          >
            Eres un maestro founder 🌟
          </h3>
          <p className="text-stone-700 text-sm leading-relaxed">
            Estás entre los primeros maestros en probar Manito. Martín va a
            coordinar una videollamada de WhatsApp contigo para acompañarte en
            el recorrido de todas las funciones. Eso es adicional a estas
            misiones — te va a contactar en los próximos días.
          </p>
        </div>

        {/* Missions */}
        <h2
          className="font-semibold text-stone-800 mb-3 text-lg"
          style={{ fontFamily: "var(--font-rubik), sans-serif" }}
        >
          Tus 13 misiones
        </h2>
        <div className="space-y-3 mb-10">
          {maestroMissions.map((mission) => (
            <MissionCard
              key={mission.id}
              mission={mission}
              accent={TEAL}
              accentLight={TEAL_LIGHT}
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
            Mándanos tres audios de WhatsApp — uno por cada categoría. No tienes
            que escribir nada. Un audio de 1 a 3 minutos por categoría está
            perfecto.
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
                desc: "¿Ves cómo Manito te podría ayudar a conseguir más pega o a organizar mejor tu trabajo? La impresión honesta, buena o mala.",
              },
              {
                emoji: "🐛",
                title: "Audio 2 — Bugs o cosas que no funcionaron",
                desc: "Qué pasó, en qué pantalla estabas, qué hiciste justo antes, qué fue lo que ocurrió. Entre más detalle, mejor.",
              },
              {
                emoji: "🧭",
                title: "Audio 3 — Navegación",
                desc: "¿Qué tan fácil fue encontrar lo que buscabas? ¿Hubo algún momento donde no supiste adónde ir o qué hacer?",
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
