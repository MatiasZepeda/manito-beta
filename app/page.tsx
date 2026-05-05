"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div
      className="min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center px-4 py-16"
      style={{ backgroundColor: "#fdf9f6" }}
    >
      <div className="text-center mb-12 max-w-lg">
        <span
          className="inline-block px-3 py-1 text-xs font-medium rounded-full mb-6 uppercase tracking-wide"
          style={{
            backgroundColor: "#fde8e1",
            color: "#f26a4b",
            fontFamily: "var(--font-rubik), sans-serif",
          }}
        >
          Beta Cerrada
        </span>
        <h1
          className="text-4xl font-bold text-stone-900 mb-4 leading-tight"
          style={{ fontFamily: "var(--font-rubik), sans-serif" }}
        >
          Gracias por probar
          <br />
          <span style={{ color: "#f26a4b" }}>Manito</span>
        </h1>
        <p className="text-stone-600 text-lg leading-relaxed">
          Esta guía te explica qué queremos que pruebes y cómo mandarnos tu
          feedback. Elige tu rol para empezar.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
        <Link href="/cliente" className="group block">
          <div
            className="bg-white rounded-2xl p-8 border-2 border-stone-100 text-center cursor-pointer transition-all duration-200 group-hover:shadow-lg"
            style={
              {
                "--hover-border": "#f26a4b",
              } as React.CSSProperties
            }
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "#f26a4b")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "#f5f5f4")
            }
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{ backgroundColor: "#fde8e1" }}
            >
              <span className="text-3xl">🏠</span>
            </div>
            <h2
              className="font-semibold text-xl text-stone-900 mb-2"
              style={{ fontFamily: "var(--font-rubik), sans-serif" }}
            >
              Soy Cliente
            </h2>
            <p className="text-stone-500 text-sm leading-relaxed">
              Voy a probar la app buscando y contratando maestros para mi casa
            </p>
            <span
              className="inline-block mt-5 px-4 py-2 text-white rounded-xl text-sm font-medium"
              style={{ backgroundColor: "#f26a4b" }}
            >
              Ver mis misiones →
            </span>
          </div>
        </Link>

        <Link href="/maestro" className="group block">
          <div
            className="bg-white rounded-2xl p-8 border-2 border-stone-100 text-center cursor-pointer transition-all duration-200 group-hover:shadow-lg"
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "#1a7f8e")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "#f5f5f4")
            }
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{ backgroundColor: "#d6f0f3" }}
            >
              <span className="text-3xl">🔧</span>
            </div>
            <h2
              className="font-semibold text-xl text-stone-900 mb-2"
              style={{ fontFamily: "var(--font-rubik), sans-serif" }}
            >
              Soy Maestro
            </h2>
            <p className="text-stone-500 text-sm leading-relaxed">
              Voy a probar la app como profesional ofreciendo mis servicios
            </p>
            <span
              className="inline-block mt-5 px-4 py-2 text-white rounded-xl text-sm font-medium"
              style={{ backgroundColor: "#1a7f8e" }}
            >
              Ver mis misiones →
            </span>
          </div>
        </Link>
      </div>

      <p className="mt-12 text-stone-400 text-sm text-center max-w-sm leading-relaxed">
        Si algo no funciona o no entiendes algo, eso es exactamente lo que
        necesitamos saber. No hay respuestas malas.
      </p>
    </div>
  );
}
