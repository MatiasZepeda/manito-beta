import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const adminSession = request.cookies.get("admin_session")?.value;
    if (!adminSession) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const sb = getSupabaseAdmin();
    const { data, error } = await sb
      .from("final_surveys")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching surveys:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
