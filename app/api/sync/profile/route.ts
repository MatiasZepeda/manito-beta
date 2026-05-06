import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { session_id, name, email, phone, os, role } = body;
    if (!session_id) {
      return NextResponse.json({ error: "missing session_id" }, { status: 400 });
    }
    const sb = getSupabaseAdmin();
    const payload: Record<string, unknown> = { session_id, name, email, phone, os };
    if (role) payload.role = role;
    const { error } = await sb
      .from("beta_testers")
      .upsert(payload, { onConflict: "session_id" });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}
