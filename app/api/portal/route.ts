import { CustomerPortal } from "@polar-sh/nextjs";
import { createClient } from "@/lib/supabase/server";
import { NextRequest } from "next/server";

export const GET = CustomerPortal({
    accessToken: process.env.POLAR_ACCESS_TOKEN as string,

    getCustomerId: async (req: NextRequest) => {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            throw new Error("Unauthorized");
        }

        const { data: profile } = await supabase
            .from("profiles")
            .select("polar_customer_id")
            .eq("id", user.id)
            .single();

        if (!profile?.polar_customer_id) {
            throw new Error("No Polar customer ID found");
        }
        return profile.polar_customer_id;
    },

    returnUrl: `${process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"}/panel`,

    server: process.env.NODE_ENV === "production" ? "production" : "sandbox",
});
