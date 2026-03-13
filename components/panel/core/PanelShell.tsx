"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import PanelNav from "./PanelNav";
import PanelUserMenu from "./PanelUserMenu";
import MobileSidebarToggle from "./MobileSidebarToggle";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/components/ThemeProvider";
import { XPAnimationProvider } from "@/components/gamification/XPAnimation";

import NotificationBell from "./NotificationBell";
import { useCoins } from "@/lib/hooks/useCoins";
import { Coins } from "lucide-react";
import { useSupabase } from "@/lib/hooks/useSupabase";

function CoinBalance() {
  const { balance, loading } = useCoins();
  return (
    <Link
      href="/panel/coin-shop"
      className="flex items-center gap-2 mx-4 my-3 px-3 py-2 rounded-xl bg-dz-amber-500/10 border border-dz-amber-500/20 hover:bg-dz-amber-500/15 transition-colors"
    >
      <Coins className="w-4 h-4 text-dz-amber-500" />
      <span className="font-display text-sm font-bold text-dz-amber-500">
        {loading ? "—" : balance}
      </span>
      <span className="text-[10px] text-dz-grey-500 uppercase font-bold tracking-wider">DZ Coin</span>
    </Link>
  );
}

export default function PanelShell({
  user,
  children,
  chatbotConfig,
}: {
  user: User;
  children: React.ReactNode;
  chatbotConfig?: { chatbotEnabled: boolean; welcomeMessage: string };
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme } = useTheme();
  const pushInitialized = useRef(false);
  const fcmInitialized = useRef(false);
  const supabase = useSupabase();

  // Sync native status bar with theme
  useEffect(() => {
    try {
      const { isNative } = require("@/lib/capacitor");
      if (!isNative) return;

      if (theme === "dark") {
        import("@/lib/capacitor").then((m) => m.setStatusBarDark()).catch(() => {});
      } else {
        import("@/lib/capacitor").then((m) => m.setStatusBarLight()).catch(() => {});
      }
    } catch {
      // Not on native platform
    }
  }, [theme]);

  // One-time push notification registration on native
  useEffect(() => {
    if (pushInitialized.current) return;
    pushInitialized.current = true;

    try {
      const { isNative } = require("@/lib/capacitor");
      if (!isNative) return;

      import("@/lib/capacitor")
        .then((m) => m.initPushNotifications())
        .catch(() => {});
    } catch {
      // Not on native platform
    }
  }, []);

  // Firebase web push — register token and listen for foreground messages
  useEffect(() => {
    if (fcmInitialized.current) return;
    fcmInitialized.current = true;

    import("@/lib/firebase")
      .then(async ({ requestNotificationPermission, onForegroundMessage }) => {
        const token = await requestNotificationPermission();
        if (token) {
          // Save FCM token to user profile for server-side push
          const { data: { user: u } } = await supabase.auth.getUser();
          if (u) {
            await supabase
              .from("profiles")
              .update({ fcm_token: token })
              .eq("id", u.id);
          }
        }

        // Listen for foreground notifications
        onForegroundMessage((payload) => {
          if (Notification.permission === "granted") {
            new Notification(payload.title, {
              body: payload.body,
              icon: "/icons/icon-192.svg",
            });
          }
        });
      })
      .catch(() => {});
  }, [supabase]);

  const handleToggleSidebar = useCallback(() => {
    setSidebarOpen((o) => !o);
  }, []);

  return (
    <XPAnimationProvider>
      <div className="min-h-screen bg-background flex">
        <a
          href="#panel-main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:top-4 focus:left-1/2 focus:-translate-x-1/2 focus:rounded-lg focus:bg-dz-orange-500 focus:px-4 focus:py-2 focus:text-white focus:text-sm focus:font-medium"
        >
          İçeriğe atla
        </a>

        <MobileSidebarToggle
          isOpen={sidebarOpen}
          onToggle={handleToggleSidebar}
        />

        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
            aria-hidden="true"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={`fixed inset-y-0 left-0 z-40 w-56 border-r border-dz-grey-200 dark:border-dz-grey-800 bg-background flex flex-col shrink-0 transition-transform duration-200 lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <div className="p-4 border-b border-dz-grey-200 dark:border-dz-grey-800 flex items-center justify-between">
            <Link
              href="/panel"
              className="font-display font-bold text-lg text-dz-black dark:text-dz-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="font-black">Dipten</span><span className="font-normal">Zirveye</span>
            </Link>
            <div className="flex items-center gap-1">
              <NotificationBell />
              <ThemeToggle />
            </div>
          </div>
          <div onClick={() => setSidebarOpen(false)}>
            <PanelNav />
          </div>
          <div className="mt-auto border-t border-dz-grey-200 dark:border-dz-grey-800">
            <CoinBalance />
            <div className="p-4 pt-0">
              <PanelUserMenu user={user} />
            </div>
          </div>
        </aside>

        <main id="panel-main" className="flex-1 overflow-auto p-6 pt-16 lg:pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom,1.5rem))]">
          <div className="max-w-[1400px] mx-auto">{children}</div>
        </main>
      </div>
    </XPAnimationProvider>
  );
}
