import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y contraseña requeridos" },
        { status: 400 }
      );
    }

    // Hardcoded admin credentials for simplicity
    const admins: Record<string, string> = {
      "matias@manito-beta.app": "manito2026",
      "nacho@manito-beta.app": "manito2026",
      "martin@manito-beta.app": "manito2026",
    };

    if (admins[email] !== password) {
      return NextResponse.json(
        { error: "Email o contraseña incorrectos" },
        { status: 401 }
      );
    }

    // Create response with session cookie
    const response = NextResponse.json({ ok: true, email });
    response.cookies.set("admin_session", email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
