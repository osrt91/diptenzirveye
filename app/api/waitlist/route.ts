import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { waitlistSchema, validateInput } from "@/lib/schemas";
import { sanitizeEmail, sanitizeTextInput } from "@/lib/sanitize";
import { checkWaitlistRateLimit } from "@/lib/rate-limit";

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const real = request.headers.get("x-real-ip");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  if (real) return real;
  return "unknown";
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = checkWaitlistRateLimit(ip);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Çok fazla deneme. Lütfen daha sonra tekrar deneyin." },
      { status: 429 }
    );
  }

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase yapılandırılmamış." },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();

    const parsed = validateInput(waitlistSchema, body);
    if ("error" in parsed) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const { email: rawEmail, name: rawName, interest: rawInterest } = parsed.data;
    const email = sanitizeEmail(rawEmail);
    const name = rawName ? sanitizeTextInput(rawName) : null;
    const interest = rawInterest ? sanitizeTextInput(rawInterest) : null;

    const { count } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true });

    const nextPosition = (count ?? 0) + 1;

    const { error } = await supabase.from("waitlist").insert({
      email,
      name: name || null,
      interest: interest || null,
      position: nextPosition,
    });

    if (error) {
      if (error.code === "23505") {
        const { data: existing } = await supabase
          .from("waitlist")
          .select("position")
          .eq("email", email)
          .single();
        return NextResponse.json(
          { position: existing?.position ?? 0, message: "Bu e-posta zaten listede." },
          { status: 200 }
        );
      }
      return NextResponse.json(
        { error: "Kayıt eklenemedi." },
        { status: 500 }
      );
    }

    return NextResponse.json({ position: nextPosition });
  } catch (e) {
    console.error("Waitlist error:", e);
    return NextResponse.json(
      { error: "Beklenmeyen hata." },
      { status: 500 }
    );
  }
}
