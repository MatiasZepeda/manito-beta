import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        { error: "Supabase env vars missing on server" },
        { status: 500 }
      );
    }
    const body = await request.json();
    const {
      session_id, role, overall_ease, role_specific,
      would_use, nps, liked_most, liked_least, would_change,
    } = body;
    if (!session_id) {
      return NextResponse.json({ error: "missing session_id" }, { status: 400 });
    }
    const sb = getSupabaseAdmin();
    const { error } = await sb.from("final_surveys").upsert(
      {
        session_id, role, overall_ease, role_specific,
        would_use, nps,
        liked_most: liked_most ?? "",
        liked_least: liked_least ?? "",
        would_change: would_change ?? "",
      },
      { onConflict: "session_id" }
    );
    if (error) return NextResponse.json({ error: `Supabase: ${error.message}` }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: `Server crash: ${err instanceof Error ? err.message : String(err)}` },
      { status: 500 }
    );
  }
}
