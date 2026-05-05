"use client";

import { useState } from "react";
import type { Mission } from "@/lib/content";

interface MissionCardProps {
  mission: Mission;
  accent: string;
  accentLight: string;
  completed: string[];
  onToggle: (id: string) => void;
}

export function MissionCard({
  mission,
  accent,
  accentLight,
  completed,
  onToggle,
}: MissionCardProps) {
  const [expanded, setExpanded] = useState(false);

  const completedCount = mission.objectives.filter((o) =>
    completed.includes(o.id)
  ).length;
  const total = mission.objectives.length;
  const isComplete = completedCount === total;

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
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-stone-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(completedCount / total) * 100}%`,
                  backgroundColor: accent,
                }}
              />
            </div>
            <span className="text-xs text-stone-400 shrink-0 tabular-nums">
              {completedCount}/{total}
            </span>
          </div>
        </div>

        <span
          className="text-stone-400 mt-1 transition-transform duration-200 text-xs"
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
              <strong>Para founders:</strong> {mission.foundersNote}
            </div>
          )}

          <div className="space-y-3">
            {mission.objectives.map((obj) => {
              const checked = completed.includes(obj.id);
              return (
                <div key={obj.id}>
                  <button
                    onClick={() => onToggle(obj.id)}
                    className="w-full flex items-start gap-3 text-left"
                  >
                    <div
                      className="mt-0.5 shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all"
                      style={{
                        backgroundColor: checked ? accent : "white",
                        borderColor: checked ? accent : `${accent}60`,
                      }}
                    >
                      {checked && (
                        <svg
                          width="10"
                          height="8"
                          viewBox="0 0 10 8"
                          fill="none"
                        >
                          <path
                            d="M1 4L3.5 6.5L9 1"
                            stroke="white"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                    <span
                      className="text-sm leading-relaxed transition-colors"
                      style={{
                        color: checked ? "#a8a29e" : "#1c1c1c",
                        textDecoration: checked ? "line-through" : "none",
                      }}
                    >
                      {obj.text}
                    </span>
                  </button>
                  {obj.tip && !checked && (
                    <div
                      className="mt-1.5 ml-8 rounded-lg px-3 py-2 text-xs leading-relaxed"
                      style={{
                        backgroundColor: accentLight,
                        color: accent,
                      }}
                    >
                      💡 {obj.tip}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
