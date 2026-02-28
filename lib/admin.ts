import { createClient } from "@/lib/supabase/server";

/** Server-side admin check — kullanıcının admin olup olmadığını doğrular */
export async function isAdmin(): Promise<boolean> {
    try {
        const supabase = await createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (!user) return false;

        const { data } = await supabase
            .from("profiles")
            .select("is_admin")
            .eq("id", user.id)
            .single();

        return data?.is_admin === true;
    } catch {
        return false;
    }
}

/** Re-export admin utility types */
export type AdminStats = {
    total_users: number;
    total_xp: number;
    active_today: number;
    total_books: number;
    total_badges: number;
    total_prompts: number;
    total_messages: number;
    total_reports: number;
    waitlist_count: number;
};

export type AdminUser = {
    id: string;
    display_name: string | null;
    avatar_url: string | null;
    is_admin: boolean;
    role?: string;
    created_at: string;
    total_xp: number;
    level: number;
    streak: number;
    badge_count: number;
};

export type AdminReport = {
    id: string;
    reason: string | null;
    created_at: string;
    message_content: string;
    message_author_id: string;
    reporter_name: string;
    author_name: string;
};
