import { NextRequest, NextResponse } from "next/server";
import { generatePaytrToken } from "@/lib/paytr";

export async function POST(req: NextRequest) {
    try {
        const { planId, email, name, phone } = await req.json();

        // 1. Plan verilerini al (Normalde DB'den gelir)
        const price = planId === "masterclass" ? 249000 : 39000; // Kuruş cinsinden

        // 2. PayTR Ayarları (ENV'den gelmeli)
        const merchant_id = process.env.PAYTR_MERCHANT_ID || "TEST_ID";
        const merchant_key = process.env.PAYTR_MERCHANT_KEY || "TEST_KEY";
        const merchant_salt = process.env.PAYTR_MERCHANT_SALT || "TEST_SALT";

        const merchant_oid = "DZ" + Date.now(); // Benzersiz sipariş ID
        const user_ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
        const user_basket = Buffer.from(JSON.stringify([
            [planId === "masterclass" ? "Zirve Masterclass" : "Aylık Erişim", price / 100, 1]
        ])).toString("base64");

        const params = {
            merchant_id,
            user_ip,
            merchant_oid,
            email: email || "test@test.com",
            payment_amount: price,
            user_basket,
            debug_on: 1,
            no_shipping: 1,
            merchant_ok_url: `${process.env.NEXT_PUBLIC_BASE_URL}/panel?status=success`,
            merchant_fail_url: `${process.env.NEXT_PUBLIC_BASE_URL}/fiyatlar?status=fail`,
            user_name: name || "Değerli Üye",
            user_address: "AI Ecosystem",
            user_phone: phone || "05555555555",
            currency: "TL",
            test_mode: 1,
            merchant_salt,
            merchant_key,
        };

        const token = generatePaytrToken(params);

        // 3. PayTR'a istek atıp iframe URL al
        const response = await fetch("https://www.paytr.com/odeme/api/get-token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ ...params, paytr_token: token } as any),
        });

        const data = await response.json();

        if (data.status === "success") {
            return NextResponse.json({ token: data.token });
        } else {
            return NextResponse.json({ error: data.reason }, { status: 400 });
        }

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Ödeme Hatası:", message);
        return NextResponse.json({ error: "Ödeme başlatılamadı." }, { status: 500 });
    }
}
