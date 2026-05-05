import type { Metadata } from "next";
import { Rubik, DM_Sans } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Manito Beta Testing",
  description: "Guía interactiva de beta testing para Manito",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${rubik.variable} ${dmSans.variable}`}>
      <body
        className="min-h-screen antialiased"
        style={{ fontFamily: "var(--font-dm), sans-serif" }}
      >
        <nav className="sticky top-0 z-50 bg-white border-b border-stone-100 shadow-sm">
          <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Manito"
                width={100}
                height={48}
                className="h-10 w-auto object-contain"
                priority
              />
              <span
                className="text-xs font-medium px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: "#fde8e1",
                  color: "#f26a4b",
                  fontFamily: "var(--font-rubik), sans-serif",
                }}
              >
                Beta
              </span>
            </Link>
            <div className="flex items-center gap-1">
              <Link
                href="/cliente"
                className="px-3 py-1.5 text-sm font-medium rounded-lg text-stone-600 transition-colors hover:bg-orange-50"
                style={{ color: undefined }}
              >
                Cliente
              </Link>
              <Link
                href="/maestro"
                className="px-3 py-1.5 text-sm font-medium rounded-lg text-stone-600 transition-colors hover:bg-teal-50"
              >
                Maestro
              </Link>
              <Link
                href="/feedback"
                className="px-3 py-1.5 text-sm font-medium rounded-lg text-stone-600 hover:bg-stone-100 transition-colors"
              >
                Feedback
              </Link>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
