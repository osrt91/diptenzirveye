import { NextRequest, NextResponse } from "next/server";
import { generatePaytrToken } from "@/lib/paytr";
import { createClient } from "@/lib/supabase/server";

const PLANS: Record<string, { name: string; price: number }> = {
    "masterclass": { name: "Zirve Masterclass", price: 249000 },
    "masterclass-3ay": { name: "Zirve Masterclass (3 Aylık)", price: 249000 },
    "aylik": { name: "Aylık Erişim", price: 39000 },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

export async function POST(req: NextRequest) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user?.email) {
            return NextResponse.json({ error: "Giriş yapmalısınız." }, { status: 401 });
        }

        const { planId } = await req.json();
        const plan = PLANS[planId];

        if (!plan) {
            return NextResponse.json({ error: "Geçersiz plan." }, { status: 400 });
        }

        const merchant_id = process.env.PAYTR_MERCHANT_ID;
        const merchant_key = process.env.PAYTR_MERCHANT_KEY;
        const merchant_salt = process.env.PAYTR_MERCHANT_SALT;

        if (!merchant_id || !merchant_key || !merchant_salt) {
            return NextResponse.json({ error: "Ödeme altyapısı yapılandırılmamış." }, { status: 503 });
        }

        const merchant_oid = "DZ" + Date.now();
        const user_ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
        const user_basket = Buffer.from(JSON.stringify([
            [plan.name, plan.price / 100, 1]
        ])).toString("base64");

        const params = {
            merchant_id,
            user_ip,
            merchant_oid,
            email: user.email,
            payment_amount: plan.price,
            user_basket,
            debug_on: process.env.NODE_ENV === "production" ? 0 : 1,
            no_shipping: 1,
            merchant_ok_url: `${siteUrl}/panel?status=success`,
            merchant_fail_url: `${siteUrl}/fiyatlar?status=fail`,
            user_name: user.user_metadata?.full_name || user.email.split("@")[0],
            user_address: "AI Ecosystem",
            user_phone: user.phone || "05555555555",
            currency: "TL",
            test_mode: process.env.NODE_ENV === "production" ? 0 : 1,
            merchant_salt,
            merchant_key,
        };

        const token = generatePaytrToken(params);

        // 3. PayTR'a istek atıp iframe URL al
        const response = await fetch("https://www.paytr.com/odeme/api/get-token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(Object.fromEntries(Object.entries({ ...params, paytr_token: token }).map(([k, v]) => [k, String(v)]))),
        });

        const data = await response.json();

        if (data.status === "success") {
            return NextResponse.json({ token: data.token });
        } else {
            return NextResponse.json({ error: data.reason }, { status: 400 });
        }

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ error: "Ödeme başlatılamadı." }, { status: 500 });
    }
}
