"use client";

import { useState } from "react";
import type { Mission } from "@/lib/content";

export interface MissionFeedback {
  ease: number;
  comment: string;
}

interface MissionCardProps {
  mission: Mission;
  accent: string;
  accentLight: string;
  feedback: Record<string, MissionFeedback>;
  onComplete: (id: string, data: MissionFeedback) => void;
  onUncomplete: (id: string) => void;
}

const EASE_LABELS = ["", "Muy difícil", "Difícil", "Normal", "Fácil", "Muy fácil"];

export function MissionCard({
  mission,
  accent,
  accentLight,
  feedback,
  onComplete,
  onUncomplete,
}: MissionCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [ease, setEase] = useState(0);
  const [comment, setComment] = useState("");

  const mf = feedback[mission.id];
  const isComplete = !!mf;

  const handleSave = () => {
    onComplete(mission.id, { ease, comment });
    setShowForm(false);
    setExpanded(false);
    setEase(0);
    setComment("");
  };

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden transition-all duration-200"
      style={{
        border: isComplete ? `2px solid ${accent}` : "2px solid #f5f5f4",
        boxShadow: expanded ? "0 4px 16px rgba(0,0,0,0.06)" : "none",
      }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-5 flex items-start gap-4"
      >
        <div
          className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold"
          style={{
            fontFamily: "var(--font-rubik), sans-serif",
            backgroundColor: mission.optional ? accentLight : accent,
            color: mission.optional ? accent : "white",
          }}
        >
          {mission.number}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3
              className="font-semibold text-stone-900 text-base"
              style={{ fontFamily: "var(--font-rubik), sans-serif" }}
            >
              {mission.title}
            </h3>
            {mission.optional && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-stone-100 text-stone-500 font-medium">
                Opcional
              </span>
            )}
            {isComplete && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">
                ✓ Completada
              </span>
            )}
          </div>
          {isComplete && mf.ease > 0 && (
            <p className="text-xs text-stone-400 mt-1">
              {mf.ease}/5 · {EASE_LABELS[mf.ease]}
            </p>
          )}
        </div>

        <span
          className="shrink-0 text-stone-400 text-lg mt-0.5 leading-none transition-transform duration-200"
          style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          ▾
        </span>
      </button>

      {expanded && (
        <div className="px-5 pb-5 border-t border-stone-50">
          <p className="text-stone-600 text-sm leading-relaxed mt-4 mb-5">
            {mission.description}
          </p>

          {mission.foundersNote && (
            <div
              className="rounded-xl p-3.5 mb-5 text-xs leading-relaxed border"
              style={{
                backgroundColor: accentLight,
                borderColor: `${accent}30`,
                color: accent,
              }}
            >
              <strong>Para maestros fundadores:</strong> {mission.foundersNote}
            </div>
          )}

          {!isComplete && !showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="w-full py-3 rounded-xl font-medium text-sm text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: accent }}
            >
              Marcar como completada
            </button>
          )}

          {!isComplete && showForm && (
            <div className="space-y-4">
              <div>
                <p
                  className="text-sm font-medium text-stone-800 mb-3"
                  style={{ fontFamily: "var(--font-rubik), sans-serif" }}
                >
                  ¿Qué tan fácil fue esta misión?
                </p>
                <div className="flex gap-1.5 mb-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      onClick={() => setEase(n)}
                      className="flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-150 border-2"
                      style={{
                        fontFamily: "var(--font-rubik), sans-serif",
                        backgroundColor: ease === n ? accent : "#f5f5f4",
                        borderColor: ease === n ? accent : "transparent",
                        color: ease === n ? "white" : "#78716c",
                      }}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-stone-400 px-0.5">
                  <span>Muy difícil</span>
                  <span>Muy fácil</span>
                </div>
                {ease > 0 && (
                  <p
                    className="text-xs text-stone-500 mt-2 text-center font-medium"
                    style={{ fontFamily: "var(--font-rubik), sans-serif" }}
                  >
                    {EASE_LABELS[ease]}
                  </p>
                )}
              </div>

              <div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="¿Algo que te confundió o te gustó? (opcional)"
                  className="w-full rounded-xl border border-stone-200 p-3.5 text-sm text-stone-700 placeholder-stone-400 resize-none outline-none focus:border-stone-300 transition-colors"
                  rows={3}
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-3 rounded-xl text-sm font-medium text-stone-500 bg-stone-100 hover:bg-stone-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  disabled={ease === 0}
                  className="flex-1 py-3 rounded-xl text-sm font-medium text-white transition-opacity disabled:opacity-40"
                  style={{ backgroundColor: accent }}
                >
                  Guardar
                </button>
              </div>
            </div>
          )}

          {isComplete && (
            <div>
              {mf.comment && (
                <div className="mb-3 rounded-xl p-3.5 bg-stone-50 text-xs text-stone-600 leading-relaxed italic">
                  "{mf.comment}"
                </div>
              )}
              <button
                onClick={() => onUncomplete(mission.id)}
                className="text-xs text-stone-400 underline underline-offset-2 hover:text-stone-600 transition-colors"
              >
                Desmarcar misión
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
