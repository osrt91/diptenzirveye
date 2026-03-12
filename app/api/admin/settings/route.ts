import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/admin";

export async function GET() {
  const admin = await isAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 403 });
  }

  const supabase = await createClient();
  const { data, error } = await supabase.rpc("admin_get_all_settings");

  if (error) {
    console.error("Settings fetch error:", error.message);
    return NextResponse.json({ error: "İşlem başarısız" }, { status: 500 });
  }

  return NextResponse.json({ settings: data ?? [] });
}

export async function PUT(req: NextRequest) {
  const admin = await isAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 403 });
  }

  const { key, value } = await req.json();
  if (!key || typeof key !== "string") {
    return NextResponse.json({ error: "Geçersiz key" }, { status: 400 });
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("site_settings")
    .update({ value: value ?? "", updated_at: new Date().toISOString() })
    .eq("key", key);

  if (error) {
    console.error("Settings update error:", error.message);
    return NextResponse.json({ error: "İşlem başarısız" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
