"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Bell, X, Trophy, Zap, Flame, BookOpen, MessageSquare } from "lucide-react";
import { useSupabase } from "@/lib/hooks/useSupabase";
import { motion, AnimatePresence } from "framer-motion";

type Notification = {
  id: string;
  type: string;
  title: string;
  message: string;
  is_read: boolean;
  action_url?: string;
  created_at: string;
};

const ICONS: Record<string, React.ReactNode> = {
  badge_earned: <Trophy className="w-4 h-4 text-dz-amber-500" />,
  level_up: <Zap className="w-4 h-4 text-dz-orange-500" />,
  streak_reminder: <Flame className="w-4 h-4 text-red-500" />,
  new_content: <BookOpen className="w-4 h-4 text-green-500" />,
  community: <MessageSquare className="w-4 h-4 text-blue-500" />,
  system: <Bell className="w-4 h-4 text-dz-grey-500" />,
};

export default function NotificationBell() {
  const supabase = useSupabase();
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(20);

    if (data) {
      setNotifications(data);
      setUnreadCount(data.filter((n) => !n.is_read).length);
    }
  }, [supabase]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  async function markAllRead() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("user_id", user.id)
      .eq("is_read", false);

    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    setUnreadCount(0);
  }

  async function markRead(id: string) {
    await supabase.from("notifications").update({ is_read: true }).eq("id", id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
    );
    setUnreadCount((c) => Math.max(0, c - 1));
  }

  function timeAgo(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins} dk önce`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} sa önce`;
    return `${Math.floor(hours / 24)} gün önce`;
  }

  return (
    <div className="relative">
      <button
        onClick={() => {
          setOpen(!open);
          if (!open) fetchNotifications();
        }}
        className="relative p-2 rounded-xl hover:bg-dz-grey-100 dark:hover:bg-dz-grey-800 transition-colors"
        aria-label="Bildirimler"
      >
        <Bell className="w-5 h-5 text-dz-grey-500" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-dz-orange-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center min-w-[18px] px-1"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </motion.span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="fixed right-2 left-2 sm:left-auto sm:absolute sm:right-0 top-14 sm:top-12 z-50 sm:w-80 max-w-sm max-h-[420px] rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 bg-dz-white dark:bg-dz-grey-900 shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-dz-grey-200 dark:border-dz-grey-800">
                <h3 className="font-display font-bold text-sm text-dz-black dark:text-dz-white">
                  Bildirimler
                </h3>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-[10px] font-bold text-dz-orange-500 hover:text-dz-orange-600 uppercase tracking-wider"
                    >
                      Tümünü Oku
                    </button>
                  )}
                  <button
                    onClick={() => setOpen(false)}
                    className="p-1 rounded-lg hover:bg-dz-grey-100 dark:hover:bg-dz-grey-800 text-dz-grey-400"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="overflow-y-auto max-h-[340px]">
                {notifications.length === 0 ? (
                  <div className="py-12 text-center text-sm text-dz-grey-500">
                    <Bell className="w-8 h-8 mx-auto mb-3 opacity-30" />
                    Henüz bildirim yok
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <button
                      key={notif.id}
                      onClick={() => {
                        markRead(notif.id);
                        if (notif.action_url) {
                          router.push(notif.action_url);
                        }
                        setOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 border-b border-dz-grey-100 dark:border-dz-grey-800 hover:bg-dz-grey-50 dark:hover:bg-dz-grey-800/50 transition-colors ${
                        !notif.is_read ? "bg-dz-orange-500/5" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 shrink-0">
                          {ICONS[notif.type] || ICONS.system}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-dz-black dark:text-dz-white truncate">
                            {notif.title}
                          </p>
                          <p className="text-xs text-dz-grey-500 line-clamp-2 mt-0.5 break-words overflow-wrap-anywhere">
                            {notif.message}
                          </p>
                          <p className="text-[10px] text-dz-grey-400 mt-1">
                            {timeAgo(notif.created_at)}
                          </p>
                        </div>
                        {!notif.is_read && (
                          <div className="w-2 h-2 rounded-full bg-dz-orange-500 shrink-0 mt-1.5" />
                        )}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
