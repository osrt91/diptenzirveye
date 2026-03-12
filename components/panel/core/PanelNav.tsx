"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Home, BookOpen, FileText, Medal, Clock, CalendarCheck, StickyNote, MessageSquare, Trophy, FlaskConical, User, Lightbulb, Rocket, Coins, Award, Target, GraduationCap, Map, Star } from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

type NavGroup = {
  label: string;
  defaultOpen?: boolean;
  items: NavItem[];
};

const groups: NavGroup[] = [
  {
    label: "",
    defaultOpen: true,
    items: [
      { href: "/panel", label: "Kontrol Merkezi", icon: <Home className="w-4 h-4" /> },
      { href: "/panel/prompt-challenge", label: "Günlük Görev", icon: <Target className="w-4 h-4" /> },
      { href: "/panel/ogrenme-yolu", label: "Öğrenme Yolu", icon: <Map className="w-4 h-4" /> },
    ],
  },
  {
    label: "Kitaplık",
    defaultOpen: true,
    items: [
      { href: "/panel/kitap", label: "Kitap", icon: <BookOpen className="w-4 h-4" /> },
      { href: "/panel/calisma-kagitlari", label: "Çalışma Kağıtları", icon: <FileText className="w-4 h-4" /> },
      { href: "/panel/kaynaklar", label: "Kaynaklar", icon: <FlaskConical className="w-4 h-4" /> },
    ],
  },
  {
    label: "AI Araçları",
    defaultOpen: false,
    items: [
      { href: "/panel/pomodoro", label: "Zihin Motoru", icon: <Clock className="w-4 h-4" /> },
      { href: "/panel/sohbet", label: "Sohbet", icon: <MessageSquare className="w-4 h-4" /> },
      { href: "/panel/quiz", label: "AI Bilgi Quiz", icon: <GraduationCap className="w-4 h-4" /> },
      { href: "/panel/prompt-hub", label: "Prompt Kütüphanesi", icon: <Lightbulb className="w-4 h-4" /> },
    ],
  },
  {
    label: "Araçlar",
    defaultOpen: false,
    items: [
      { href: "/panel/erteleme", label: "Eylem İvmesi", icon: <CalendarCheck className="w-4 h-4" /> },
      { href: "/panel/proje-planlayici", label: "Proje Planlayıcı", icon: <Rocket className="w-4 h-4" /> },
      { href: "/panel/not-defteri", label: "Not Defteri", icon: <StickyNote className="w-4 h-4" /> },
      { href: "/panel/motivasyon", label: "Günlük Motivasyon", icon: <Star className="w-4 h-4" /> },
    ],
  },
  {
    label: "Ödüller",
    defaultOpen: false,
    items: [
      { href: "/panel/rozetler", label: "Rozetler", icon: <Medal className="w-4 h-4" /> },
      { href: "/panel/sertifika", label: "Sertifikalarım", icon: <Award className="w-4 h-4" /> },
      { href: "/panel/siralama", label: "Liderlik Tablosu", icon: <Trophy className="w-4 h-4" /> },
      { href: "/panel/coin-shop", label: "DZ Coin Mağazası", icon: <Coins className="w-4 h-4" /> },
    ],
  },
  {
    label: "",
    defaultOpen: true,
    items: [
      { href: "/panel/profil", label: "Profil", icon: <User className="w-4 h-4" /> },
    ],
  },
];

export default function PanelNav() {
  const pathname = usePathname();

  // Auto-open group if it contains the active page
  const initialOpen = groups.reduce<Record<string, boolean>>((acc, group) => {
    const hasActive = group.items.some(
      (item) => pathname === item.href || (item.href !== "/panel" && pathname.startsWith(item.href))
    );
    acc[group.label] = group.defaultOpen || hasActive;
    return acc;
  }, {});

  const [openGroups, setOpenGroups] = useState(initialOpen);

  function toggleGroup(label: string) {
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  }

  return (
    <nav aria-label="Panel navigasyonu" className="p-3 space-y-1 overflow-y-auto">
      {groups.map((group) => {
        const isGroupOpen = openGroups[group.label] ?? group.defaultOpen;
        const hasLabel = group.label !== "";

        return (
          <div key={group.label || group.items[0]?.href}>
            {hasLabel && (
              <button
                onClick={() => toggleGroup(group.label)}
                className="flex items-center justify-between w-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-dz-grey-400 dark:text-dz-grey-600 hover:text-dz-grey-600 dark:hover:text-dz-grey-400 transition-colors"
              >
                {group.label}
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${isGroupOpen ? "" : "-rotate-90"}`}
                />
              </button>
            )}

            {isGroupOpen && (
              <div className="space-y-0.5">
                {group.items.map(({ href, label, icon }) => {
                  const isActive = pathname === href || (href !== "/panel" && pathname.startsWith(href));
                  return (
                    <Link
                      key={href}
                      href={href}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium transition-all duration-200 ${isActive
                        ? "bg-dz-orange-500/10 text-dz-orange-600 dark:text-dz-orange-400 border border-dz-orange-500/20"
                        : "text-dz-grey-600 hover:bg-dz-grey-100 dark:text-dz-grey-400 dark:hover:bg-dz-grey-800 border border-transparent"
                        }`}
                    >
                      <span className={isActive ? "text-dz-orange-500" : "text-dz-grey-400 dark:text-dz-grey-600"}>
                        {icon}
                      </span>
                      {label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
