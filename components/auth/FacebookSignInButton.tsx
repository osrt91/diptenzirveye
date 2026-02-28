"use client";

import { createClient } from "@/lib/supabase/client";
import { FaFacebook } from "react-icons/fa";

export default function FacebookSignInButton() {
    const handleFacebookSignIn = async () => {
        const supabase = createClient();
        await supabase.auth.signInWithOAuth({
            provider: "facebook",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
    };

    return (
        <button
            type="button"
            onClick={handleFacebookSignIn}
            className="w-full flex items-center justify-center gap-3 rounded-xl border border-dz-grey-200 dark:border-dz-grey-700 bg-[#1877F2] hover:bg-[#166FE5] px-4 py-3 text-sm font-semibold text-white transition-colors"
        >
            <FaFacebook className="w-5 h-5 text-white" />
            Facebook ile Devam Et
        </button>
    );
}

