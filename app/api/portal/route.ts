import { CustomerPortal } from "@polar-sh/nextjs";
import { createClient } from "@/lib/supabase/server";
import { NextRequest } from "next/server";

export const GET = CustomerPortal({
    accessToken: process.env.POLAR_ACCESS_TOKEN as string,

    // Resolve the Customer ID dynamically to show the portal for the logged in user
    getCustomerId: async (req: NextRequest) => {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            throw new Error("Unauthorized");
        }

        // You must store the Polar Customer ID in your database when they first purchase 
        // or use their Supabase UUID as customerExternalId and resolve it via Polar API,
        // For simplicity, if we mapped customerExternalId = user.id:
        // We would need to fetch the customer from Polar API using externalId, or save their polar_customer_id in our DB.
        // Assuming you save `polar_customer_id` in users table:
        const { data: userData } = await supabase
            .from("users")
            .select("polar_customer_id")
            .eq("id", user.id)
            .single();

        return userData?.polar_customer_id || "";
    },

    returnUrl: `${process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"}/panel`,

    server: process.env.NODE_ENV === "production" ? "production" : "sandbox",
});
