"use client";

import type { User } from "@supabase/supabase-js";
import { useSupabase } from "@/lib/hooks/useSupabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut, User as UserIcon } from "lucide-react";

export default function PanelUserMenu({ user }: { user: User }) {
  const router = useRouter();
  const supabase = useSupabase();
  const displayName =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split("@")[0] ||
    "Kullanıcı";

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-dz-orange-500/10 text-dz-orange-500 flex items-center justify-center shrink-0">
          <span className="font-bold text-lg">{displayName.charAt(0).toUpperCase()}</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-dz-black dark:text-dz-white truncate" title={user.email ?? ""}>
            {displayName}
          </p>
          <p className="text-xs text-dz-grey-500 truncate" title={user.email ?? ""}>
            {user.email}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Link
          href="/panel/profil"
          className="flex items-center justify-center gap-2 rounded-lg border border-dz-grey-200 dark:border-dz-grey-800 px-3 py-2 text-xs font-medium text-dz-black dark:text-dz-white hover:bg-dz-grey-100 dark:hover:bg-dz-grey-800 transition-colors"
        >
          <UserIcon className="w-4 h-4" />
          Profil
        </Link>
        <button
          type="button"
          onClick={handleSignOut}
          className="flex items-center justify-center gap-2 rounded-lg bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 px-3 py-2 text-xs font-medium hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Çıkış
        </button>
      </div>
    </div>
  );
}
