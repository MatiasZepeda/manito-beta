"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getRole, markSurveyDone, isSurveyDone, getProfile } from "@/lib/session";

const CORAL = "#f26a4b";
const CORAL_LIGHT = "#fde8e1";
const TEAL = "#1a7f8e";
const TEAL_LIGHT = "#d6f0f3";

interface SurveyData {
  role: string;
  overall_ease: number;
  role_specific: number;
  would_use: string;
  nps: number;
  liked_most: string;
  liked_least: string;
  would_change: string;
}

function ScaleButtons({
  value,
  onChange,
  min,
  max,
  leftLabel,
  rightLabel,
  accent,
}: {
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  leftLabel: string;
  rightLabel: string;
  accent: string;
}) {
  const nums = Array.from({ length: max - min + 1 }, (_, i) => i + min);
  return (
    <div>
      <div className="flex gap-1">
        {nums.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-150 border-2"
            style={{
              fontFamily: "var(--font-rubik), sans-serif",
              backgroundColor: value === n ? accent : "#f5f5f4",
              borderColor: value === n ? accent : "transparent",
              color: value === n ? "white" : "#78716c",
            }}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="flex justify-between text-xs text-stone-400 px-0.5 mt-1">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  );
}

const WOULD_USE_OPTIONS = [
  "Sí, definitivamente",
  "Probablemente",
  "No sé",
  "Probablemente no",
  "No",
];

export default function EncuestaPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [role, setRole] = useState<"cliente" | "maestro">("cliente");
  const [done, setDone] = useState(false);

  const [overallEase, setOverallEase] = useState(0);
  const [roleSpecific, setRoleSpecific] = useState(0);
  const [wouldUse, setWouldUse] = useState("");
  const [nps, setNps] = useState(-1);
  const [likedMost, setLikedMost] = useState("");
  const [likedLeast, setLikedLeast] = useState("");
  const [wouldChange, setWouldChange] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const r = getRole();
    if (!r) {
      router.replace("/");
      return;
    }
    setRole(r);
    if (isSurveyDone()) setDone(true);
    setReady(true);
  }, [router]);

  const accent = role === "cliente" ? CORAL : TEAL;
  const accentLight = role === "cliente" ? CORAL_LIGHT : TEAL_LIGHT;

  const validate = () => {
    const e: string[] = [];
    if (overallEase === 0) e.push("Califica la facilidad general de uso");
    if (roleSpecific === 0) e.push("Responde la pregunta específica de tu rol");
    if (!wouldUse) e.push("Indica si usarías la app");
    if (nps < 0) e.push("Indica cuánto la recomendarías");
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (errs.length > 0) {
      setErrors(errs);
      return;
    }
    const data: SurveyData = {
      role,
      overall_ease: overallEase,
      role_specific: roleSpecific,
      would_use: wouldUse,
      nps,
      liked_most: likedMost,
      liked_least: likedLeast,
      would_change: wouldChange,
    };
    localStorage.setItem("manito_survey_data", JSON.stringify(data));
    markSurveyDone();
    const profile = getProfile();
    if (profile) {
      fetch("/api/sync/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: profile.session_id,
          ...data,
        }),
      }).catch(() => {});
    }
    setDone(true);
  };

  if (!ready) return null;

  if (done) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center"
        style={{ backgroundColor: "#fdf9f6" }}
      >
        <div className="text-5xl mb-6">🎉</div>
        <h1
          className="text-2xl font-bold text-stone-900 mb-3 max-w-sm"
          style={{ fontFamily: "var(--font-rubik), sans-serif" }}
        >
          ¡Muchas gracias!
        </h1>
        <p className="text-stone-600 text-sm leading-relaxed max-w-xs mb-8">
          Tu feedback es exactamente lo que necesitamos para mejorar Manito
          antes del lanzamiento. Nos contactaremos contigo pronto.
        </p>
        <div className="bg-white rounded-2xl border border-stone-100 p-5 max-w-xs w-full">
          <p className="text-stone-600 text-sm mb-4 leading-relaxed">
            Si quieres agregar algo más, mándanos un audio o mensaje por
            WhatsApp. No es obligatorio.
          </p>
          <a
            href="https://wa.me/16088933997"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 text-white rounded-xl font-medium text-sm transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#25D366" }}
          >
            <span>💬</span> Abrir WhatsApp (opcional)
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16" style={{ backgroundColor: "#fdf9f6" }}>
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="mb-8">
          <span
            className="inline-block px-3 py-1 text-xs font-medium rounded-full mb-4 uppercase tracking-wide"
            style={{
              backgroundColor: accentLight,
              color: accent,
              fontFamily: "var(--font-rubik), sans-serif",
            }}
          >
            Cuestionario Final
          </span>
          <h1
            className="text-3xl font-bold text-stone-900 mb-3"
            style={{ fontFamily: "var(--font-rubik), sans-serif" }}
          >
            ¿Cómo te fue? 🙌
          </h1>
          <p className="text-stone-600 leading-relaxed">
            Son 7 preguntas, menos de 5 minutos. Tu opinión honesta es lo que
            más nos ayuda ahora mismo.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Q1: Overall ease */}
          <div className="bg-white rounded-2xl border border-stone-100 p-5">
            <p
              className="font-semibold text-stone-800 mb-1 text-sm"
              style={{ fontFamily: "var(--font-rubik), sans-serif" }}
            >
              1. ¿Qué tan fácil fue usar la app en general?
            </p>
            <p className="text-stone-400 text-xs mb-4">
              Considerando toda la experiencia desde que abriste la app.
            </p>
            <ScaleButtons
              value={overallEase}
              onChange={setOverallEase}
              min={1}
              max={10}
              leftLabel="Muy fácil"
              rightLabel="Muy difícil"
              accent={accent}
            />
          </div>

          {/* Q2: Role-specific */}
          <div className="bg-white rounded-2xl border border-stone-100 p-5">
            <p
              className="font-semibold text-stone-800 mb-1 text-sm"
              style={{ fontFamily: "var(--font-rubik), sans-serif" }}
            >
              {role === "cliente"
                ? "2. ¿Qué tan claro fue el proceso de publicar una solicitud?"
                : "2. ¿Qué tan útil te resultó el constructor de cotizaciones?"}
            </p>
            <p className="text-stone-400 text-xs mb-4">
              {role === "cliente"
                ? "Desde que entras hasta que envías la solicitud."
                : "Para armar y enviar una cotización a un cliente."}
            </p>
            <ScaleButtons
              value={roleSpecific}
              onChange={setRoleSpecific}
              min={1}
              max={5}
              leftLabel="Para nada"
              rightLabel="Totalmente"
              accent={accent}
            />
          </div>

          {/* Q3: Would use */}
          <div className="bg-white rounded-2xl border border-stone-100 p-5">
            <p
              className="font-semibold text-stone-800 mb-4 text-sm"
              style={{ fontFamily: "var(--font-rubik), sans-serif" }}
            >
              {role === "cliente"
                ? "3. ¿La usarías para buscar un maestro de verdad?"
                : "3. ¿La usarías en tu trabajo real para conseguir clientes?"}
            </p>
            <div className="space-y-2">
              {WOULD_USE_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setWouldUse(opt)}
                  className="w-full text-left px-4 py-3 rounded-xl text-sm border-2 transition-all duration-150"
                  style={{
                    backgroundColor: wouldUse === opt ? accentLight : "#f9f9f9",
                    borderColor: wouldUse === opt ? accent : "transparent",
                    color: wouldUse === opt ? accent : "#57534e",
                    fontFamily: "var(--font-rubik), sans-serif",
                    fontWeight: wouldUse === opt ? "600" : "400",
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Q4: NPS */}
          <div className="bg-white rounded-2xl border border-stone-100 p-5">
            <p
              className="font-semibold text-stone-800 mb-1 text-sm"
              style={{ fontFamily: "var(--font-rubik), sans-serif" }}
            >
              4. ¿La recomendarías a alguien que{" "}
              {role === "cliente"
                ? "necesita un maestro"
                : "trabaja como maestro"}
              ?
            </p>
            <p className="text-stone-400 text-xs mb-4">
              0 = Para nada, 10 = Seguro que sí
            </p>
            <ScaleButtons
              value={nps}
              onChange={setNps}
              min={0}
              max={10}
              leftLabel="Para nada"
              rightLabel="Seguro que sí"
              accent={accent}
            />
          </div>

          {/* Q5: Open questions */}
          <div className="bg-white rounded-2xl border border-stone-100 p-5 space-y-5">
            <div>
              <p
                className="font-semibold text-stone-800 mb-2 text-sm"
                style={{ fontFamily: "var(--font-rubik), sans-serif" }}
              >
                5. ¿Qué fue lo que más te gustó?
              </p>
              <textarea
                value={likedMost}
                onChange={(e) => setLikedMost(e.target.value)}
                placeholder="Lo que más te llamó la atención o te pareció bien hecho..."
                className="w-full rounded-xl border border-stone-200 p-3.5 text-sm text-stone-700 placeholder-stone-400 resize-none outline-none focus:border-stone-300 transition-colors"
                rows={3}
              />
            </div>

            <div>
              <p
                className="font-semibold text-stone-800 mb-2 text-sm"
                style={{ fontFamily: "var(--font-rubik), sans-serif" }}
              >
                6. ¿Qué fue lo que menos te gustó o más te confundió?
              </p>
              <textarea
                value={likedLeast}
                onChange={(e) => setLikedLeast(e.target.value)}
                placeholder="Lo que no funcionó, te costó entender o te generó fricción..."
                className="w-full rounded-xl border border-stone-200 p-3.5 text-sm text-stone-700 placeholder-stone-400 resize-none outline-none focus:border-stone-300 transition-colors"
                rows={3}
              />
            </div>

            <div>
              <p
                className="font-semibold text-stone-800 mb-2 text-sm"
                style={{ fontFamily: "var(--font-rubik), sans-serif" }}
              >
                7. ¿Qué le cambiarías o agregarías?
              </p>
              <textarea
                value={wouldChange}
                onChange={(e) => setWouldChange(e.target.value)}
                placeholder="Algo que echarías de menos, una función que le falta, o algo que harías diferente..."
                className="w-full rounded-xl border border-stone-200 p-3.5 text-sm text-stone-700 placeholder-stone-400 resize-none outline-none focus:border-stone-300 transition-colors"
                rows={3}
              />
            </div>
          </div>

          {/* Errors */}
          {errors.length > 0 && (
            <div className="rounded-xl bg-red-50 border border-red-100 p-4">
              <p className="text-sm font-medium text-red-700 mb-2">
                Por favor completa estas preguntas:
              </p>
              <ul className="space-y-1">
                {errors.map((err) => (
                  <li key={err} className="text-xs text-red-600">
                    · {err}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 rounded-xl text-white font-semibold text-base transition-opacity hover:opacity-90"
            style={{
              backgroundColor: accent,
              fontFamily: "var(--font-rubik), sans-serif",
            }}
          >
            Enviar feedback →
          </button>
        </form>
      </div>
    </div>
  );
}
