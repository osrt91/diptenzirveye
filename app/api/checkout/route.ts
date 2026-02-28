import { Checkout } from "@polar-sh/nextjs";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_BASE_URL ??
    "http://localhost:3000";

const polarCheckout = Checkout({
    accessToken: process.env.POLAR_ACCESS_TOKEN as string,
    successUrl: `${siteUrl}/panel?payment=success`,
    returnUrl: siteUrl,
    server: process.env.NODE_ENV === "production" ? "production" : "sandbox",
    theme: "dark",
});

export const GET = async (req: NextRequest) => {
    // 1. Check if user is authenticated via Supabase
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        // Redirect to login/signup if unauthenticated
        const loginUrl = new URL("/kayit-ol", req.url);
        // You could pass ?next=/api/checkout?products=... to return here after login if desired
        return NextResponse.redirect(loginUrl);
    }

    // 2. Inject Supabase User details so Polar knows who is purchasing
    const url = new URL(req.url);
    url.searchParams.set("customerExternalId", user.id);
    if (user.email) {
        url.searchParams.set("customerEmail", user.email);
    }

    // 3. Delegate to Polar Next.js SDK
    return polarCheckout(new NextRequest(url, req));
};
