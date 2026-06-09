"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { saveProfile, getProfile } from "@/lib/session";

type OS = "ios" | "android";

export default function RegistroPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [os, setOs] = useState<OS | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (getProfile()) {
      router.replace("/");
      return;
    }
    setReady(true);
  }, [router]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Tu nombre es requerido";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Ingresa un email válido";
    if (!phone.trim() || phone.replace(/\D/g, "").length < 8)
      e.phone = "Ingresa un teléfono válido";
    if (!os) e.os = "Selecciona tu sistema operativo";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    const profile = saveProfile({ name: name.trim(), email: email.trim(), phone: phone.trim(), os: os! });
    fetch("/api/sync/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    }).catch(() => {});
    router.push("/");
  };

  if (!ready) return null;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ backgroundColor: "#fdf9f6" }}
    >
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Image
            src="/logo.png"
            alt="Manito"
            width={120}
            height={60}
            className="h-14 w-auto object-contain"
            priority
          />
        </div>

        <div className="bg-white rounded-2xl border border-stone-100 p-6 shadow-sm">
          <span
            className="inline-block px-3 py-1 text-xs font-medium rounded-full mb-4 uppercase tracking-wide"
            style={{
              backgroundColor: "#fde8e1",
              color: "#f26a4b",
              fontFamily: "var(--font-rubik), sans-serif",
            }}
          >
            Beta Cerrada
          </span>
          <h1
            className="text-2xl font-bold text-stone-900 mb-2"
            style={{ fontFamily: "var(--font-rubik), sans-serif" }}
          >
            Antes de empezar
          </h1>
          <p className="text-stone-500 text-sm mb-6 leading-relaxed">
            Necesitamos algunos datos para identificarte como beta tester. Solo
            se usan para organizar el feedback.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className="block text-sm font-medium text-stone-700 mb-1.5"
                style={{ fontFamily: "var(--font-rubik), sans-serif" }}
              >
                Nombre completo
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
                className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm text-stone-800 placeholder-stone-400 outline-none focus:border-stone-400 transition-colors"
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                className="block text-sm font-medium text-stone-700 mb-1.5"
                style={{ fontFamily: "var(--font-rubik), sans-serif" }}
              >
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm text-stone-800 placeholder-stone-400 outline-none focus:border-stone-400 transition-colors"
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                className="block text-sm font-medium text-stone-700 mb-1.5"
                style={{ fontFamily: "var(--font-rubik), sans-serif" }}
              >
                Teléfono
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+56 9 1234 5678"
                className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm text-stone-800 placeholder-stone-400 outline-none focus:border-stone-400 transition-colors"
              />
              {errors.phone && (
                <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label
                className="block text-sm font-medium text-stone-700 mb-2"
                style={{ fontFamily: "var(--font-rubik), sans-serif" }}
              >
                ¿Qué sistema operativo usas?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(["ios", "android"] as OS[]).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setOs(option)}
                    className="py-3 rounded-xl text-sm font-medium border-2 transition-all duration-150"
                    style={{
                      backgroundColor: os === option ? "#f26a4b" : "#f5f5f4",
                      borderColor: os === option ? "#f26a4b" : "transparent",
                      color: os === option ? "white" : "#78716c",
                      fontFamily: "var(--font-rubik), sans-serif",
                    }}
                  >
                    {option === "ios" ? "🍎 iOS" : "🤖 Android"}
                  </button>
                ))}
              </div>
              {errors.os && (
                <p className="text-xs text-red-500 mt-1">{errors.os}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl text-white font-medium text-sm transition-opacity hover:opacity-90 mt-2"
              style={{
                backgroundColor: "#f26a4b",
                fontFamily: "var(--font-rubik), sans-serif",
              }}
            >
              Empezar el testing →
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-stone-400 mt-6 leading-relaxed max-w-xs mx-auto">
          Tus datos son privados y solo se usan para organizar el feedback de
          esta beta cerrada.
        </p>
      </div>
    </div>
  );
}
