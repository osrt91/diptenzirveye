"use client";

import { useState } from "react";
import { Copy, CheckCircle2, Share2, Gift } from "lucide-react";

export default function ReferralCard({ userId }: { userId: string }) {
  const [copied, setCopied] = useState(false);
  const code = userId.slice(0, 8).toUpperCase();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://diptenzirveye.com";
  const link = `${siteUrl}/kayit-ol?ref=${code}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement("input");
      input.value = link;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareLink = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "DiptenZirveye — AI Ustalık Serisi",
        text: "AI ile gelir elde etmek istiyorsan bu platformu dene!",
        url: link,
      });
    } else {
      copyLink();
    }
  };

  return (
    <div className="bg-gradient-to-br from-dz-orange-500/5 to-dz-amber-400/5 border border-dz-orange-200 dark:border-dz-orange-500/20 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-dz-orange-500/10 flex items-center justify-center">
          <Gift className="w-5 h-5 text-dz-orange-500" />
        </div>
        <div>
          <h3 className="font-display font-bold text-dz-black dark:text-white">Arkadaşını Davet Et</h3>
          <p className="text-xs text-dz-grey-500">Linkini paylaş, birlikte öğrenin</p>
        </div>
      </div>

      <div className="flex gap-2 mb-3">
        <div className="flex-1 bg-dz-white dark:bg-dz-black border border-dz-grey-200 dark:border-dz-grey-700 rounded-lg px-3 py-2.5 text-sm font-mono text-dz-grey-600 dark:text-dz-grey-400 truncate">
          {link}
        </div>
        <button
          onClick={copyLink}
          aria-label={copied ? "Kopyalandı" : "Linki kopyala"}
          className={`px-3 rounded-lg transition-all ${copied ? "bg-green-500 text-white" : "bg-dz-orange-500 text-white hover:bg-dz-orange-600"}`}
        >
          {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
        <button
          onClick={shareLink}
          aria-label="Referans linkini paylaş"
          className="px-3 rounded-lg bg-dz-grey-100 dark:bg-dz-grey-800 text-dz-grey-600 dark:text-dz-grey-400 hover:bg-dz-grey-200 dark:hover:bg-dz-grey-700 transition-colors"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs text-dz-grey-500">
        Referans kodun: <span className="font-mono font-bold text-dz-orange-500">{code}</span>
      </p>
    </div>
  );
}
