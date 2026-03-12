import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/admin";

// POST /api/admin/notifications — send notification to users
export async function POST(req: NextRequest) {
  const admin = await isAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 403 });
  }

  const body = await req.json();
  const { title, message, type = "system", target = "all", userId, actionUrl } = body;

  if (!title || !message) {
    return NextResponse.json({ error: "Başlık ve mesaj gerekli" }, { status: 400 });
  }

  const supabase = await createClient();

  if (target === "single" && userId) {
    const { error } = await supabase.from("notifications").insert({
      user_id: userId,
      type,
      title,
      message,
      action_url: actionUrl || null,
    });
    if (error) {
      console.error("Notification insert error:", error.message);
      return NextResponse.json({ error: "İşlem başarısız" }, { status: 500 });
    }
    return NextResponse.json({ sent: 1 });
  }

  // Send to all users
  const { data: users, error: usersError } = await supabase
    .from("profiles")
    .select("id");

  if (usersError || !users) {
    return NextResponse.json({ error: "Kullanıcılar alınamadı" }, { status: 500 });
  }

  const rows = users.map((u) => ({
    user_id: u.id,
    type,
    title,
    message,
    action_url: actionUrl || null,
  }));

  if (rows.length === 0) {
    return NextResponse.json({ sent: 0 });
  }

  const { error } = await supabase.from("notifications").insert(rows);
  if (error) {
    console.error("Bulk notification insert error:", error.message);
    return NextResponse.json({ error: "İşlem başarısız" }, { status: 500 });
  }

  return NextResponse.json({ sent: rows.length });
}

// GET /api/admin/notifications — get notification stats
export async function GET() {
  const admin = await isAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 403 });
  }

  const supabase = await createClient();

  const { count: totalCount } = await supabase
    .from("notifications")
    .select("*", { count: "exact", head: true });

  const { count: unreadCount } = await supabase
    .from("notifications")
    .select("*", { count: "exact", head: true })
    .eq("is_read", false);

  return NextResponse.json({
    total: totalCount || 0,
    unread: unreadCount || 0,
  });
}
