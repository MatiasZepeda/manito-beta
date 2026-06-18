import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const adminSession = request.cookies.get("admin_session")?.value;
    if (!adminSession) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        { error: "Supabase env vars missing on server" },
        { status: 500 }
      );
    }

    const sb = getSupabaseAdmin();
    const { data, error } = await sb
      .from("mission_feedback")
      .select("*")
      .order("completed_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: `Supabase: ${error.message}` }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: `Server crash: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
}
