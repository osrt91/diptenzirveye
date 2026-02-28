import { Webhooks } from "@polar-sh/nextjs";
import { createClient, SupabaseClient } from "@supabase/supabase-js"; // Use service role for webhooks

// Lazy client so build succeeds when env vars are not set (e.g. on Vercel build)
function getSupabaseAdmin(): SupabaseClient | null {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) return null;
    return createClient(url, key);
}

/**
 * Handle Polar Webhooks
 * We listen for order payments or subscription activations to grant Premium access.
 */
export const POST = Webhooks({
    webhookSecret: process.env.POLAR_WEBHOOK_SECRET ?? "",

    onOrderPaid: async (payload) => {
        const supabaseAdmin = getSupabaseAdmin();
        if (!supabaseAdmin) {
            console.warn("Polar webhook: Supabase env not configured, skipping DB update");
            return;
        }
        // payload: { id: string, amount: number, customer_id: string, customer: { email, external_id }... }
        // payload.data is the Order object
        const customerId = payload.data.customerId;
        // If we passed the Supabase User ID as customerExternalId during checkout
        const supabaseUserId = payload.data.customer?.externalId;

        console.log("Polar Order Paid Event Received", { customerId, supabaseUserId });

        if (supabaseUserId) {
            // 1. Update user to premium
            const { error } = await supabaseAdmin
                .from("users")
                .update({
                    role: "premium",
                    polar_customer_id: customerId, // Save the polar ID for the portal
                    updated_at: new Date().toISOString()
                })
                .eq("id", supabaseUserId);

            if (error) {
                console.error("Failed to update user to premium", error);
            } else {
                console.log(`User ${supabaseUserId} upgraded to Premium!`);
            }
        } else {
            // Fallback: try to find user by email if external_id was missing
            const email = payload.data.customer?.email;
            if (email) {
                const { data: user } = await supabaseAdmin
                    .from("users")
                    .select("id")
                    .eq("email", email)
                    .single();

                if (user) {
                    await supabaseAdmin
                        .from("users")
                        .update({ role: "premium", polar_customer_id: customerId })
                        .eq("id", user.id);
                }
            }
        }
    },

    onSubscriptionActive: async (payload) => {
        const supabaseAdmin = getSupabaseAdmin();
        if (!supabaseAdmin) return;
        const supabaseUserId = payload.data.customer?.externalId;
        if (supabaseUserId) {
            await supabaseAdmin
                .from("users")
                .update({
                    role: "premium",
                    polar_customer_id: payload.data.customerId,
                })
                .eq("id", supabaseUserId);
        }
    },

    onSubscriptionCanceled: async (payload) => {
        const supabaseAdmin = getSupabaseAdmin();
        if (!supabaseAdmin) return;
        const supabaseUserId = payload.data.customer?.externalId;
        if (supabaseUserId) {
            await supabaseAdmin
                .from("users")
                .update({
                    role: "free",
                })
                .eq("id", supabaseUserId);
        }
    }
});
