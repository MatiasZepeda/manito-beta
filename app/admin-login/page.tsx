"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Error al iniciar sesión");
        setLoading(false);
        return;
      }

      router.push("/admin-dashboard");
    } catch (err) {
      setError("Error de conexión");
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#fdf9f6" }}
    >
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1
            className="text-2xl font-bold text-stone-900"
            style={{ fontFamily: "var(--font-rubik), sans-serif" }}
          >
            Admin Dashboard
          </h1>
          <p className="text-stone-500 text-sm mt-1">Manito Beta Testing</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-stone-100 p-6"
        >
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-stone-700 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="matias@manito-beta.app"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-stone-200 rounded-lg text-sm outline-none focus:border-stone-400"
              disabled={loading}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-stone-700 mb-2"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-stone-200 rounded-lg text-sm outline-none focus:border-stone-400"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-stone-900 text-white rounded-lg font-medium text-sm transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Cargando..." : "Acceder"}
          </button>
        </form>

        <p className="text-center text-xs text-stone-400 mt-4">
          Acceso restringido
        </p>
      </div>
    </div>
  );
}
