import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();

  try {
    const { code } = await request.json();
    if (!code || typeof code !== "string") {
      return NextResponse.json({ error: "Kupon kodu gerekli." }, { status: 400 });
    }

    const normalized = code.trim().toUpperCase();

    const { data: coupon, error } = await supabase
      .from("coupons")
      .select("*")
      .eq("code", normalized)
      .eq("active", true)
      .single();

    if (error || !coupon) {
      return NextResponse.json({ error: "Geçersiz kupon kodu." }, { status: 404 });
    }

    if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
      return NextResponse.json({ error: "Bu kuponun süresi dolmuş." }, { status: 410 });
    }

    if (coupon.max_uses !== null && coupon.used_count >= coupon.max_uses) {
      return NextResponse.json({ error: "Bu kupon kullanım limitine ulaştı." }, { status: 410 });
    }

    const originalPrice = 999.99;
    const discountedPrice = +(originalPrice * (1 - coupon.discount_percent / 100)).toFixed(2);

    return NextResponse.json({
      valid: true,
      code: coupon.code,
      discount_percent: coupon.discount_percent,
      original_price: originalPrice,
      discounted_price: discountedPrice,
    });
  } catch {
    return NextResponse.json({ error: "Beklenmeyen hata." }, { status: 500 });
  }
}
