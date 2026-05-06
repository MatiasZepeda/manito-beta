import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { session_id, mission_id, role, ease, comment, action } = body;
    if (!session_id || !mission_id) {
      return NextResponse.json({ error: "missing fields" }, { status: 400 });
    }
    const sb = getSupabaseAdmin();
    if (action === "uncomplete") {
      await sb
        .from("mission_feedback")
        .delete()
        .eq("session_id", session_id)
        .eq("mission_id", mission_id);
    } else {
      const { error } = await sb.from("mission_feedback").upsert(
        {
          session_id,
          mission_id,
          role,
          ease,
          comment: comment ?? "",
          completed_at: new Date().toISOString(),
        },
        { onConflict: "session_id,mission_id" }
      );
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}
