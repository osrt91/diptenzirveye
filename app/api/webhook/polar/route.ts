import { Webhooks } from "@polar-sh/nextjs";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

function getSupabaseAdmin(): SupabaseClient | null {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) return null;
    return createClient(url, key);
}

async function upgradeToPremium(
    supabase: SupabaseClient,
    userId: string,
    polarCustomerId: string
) {
    const { error } = await supabase
        .from("profiles")
        .update({
            role: "premium",
            polar_customer_id: polarCustomerId,
            updated_at: new Date().toISOString(),
        })
        .eq("id", userId);

    if (error) {
        console.error("Failed to update user to premium", error);
    }
}

export const POST = Webhooks({
    webhookSecret: process.env.POLAR_WEBHOOK_SECRET ?? "",

    onOrderPaid: async (payload) => {
        const supabaseAdmin = getSupabaseAdmin();
        if (!supabaseAdmin) return;

        const customerId = payload.data.customerId;
        const supabaseUserId = payload.data.customer?.externalId;

        if (supabaseUserId) {
            await upgradeToPremium(supabaseAdmin, supabaseUserId, customerId);
        } else {
            const email = payload.data.customer?.email;
            if (email) {
                const { data } = await supabaseAdmin.auth.admin.listUsers();
                const authUser = data?.users?.find((u) => u.email === email);
                if (authUser) {
                    await upgradeToPremium(supabaseAdmin, authUser.id, customerId);
                }
            }
        }
    },

    onSubscriptionActive: async (payload) => {
        const supabaseAdmin = getSupabaseAdmin();
        if (!supabaseAdmin) return;
        const supabaseUserId = payload.data.customer?.externalId;
        if (supabaseUserId) {
            await upgradeToPremium(supabaseAdmin, supabaseUserId, payload.data.customerId);
        }
    },

    onSubscriptionCanceled: async (payload) => {
        const supabaseAdmin = getSupabaseAdmin();
        if (!supabaseAdmin) return;
        const supabaseUserId = payload.data.customer?.externalId;
        if (supabaseUserId) {
            const { error } = await supabaseAdmin
                .from("profiles")
                .update({ role: "free" })
                .eq("id", supabaseUserId);
            if (error) console.error("Failed to downgrade user", error);
        }
    },
});
