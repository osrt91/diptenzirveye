"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function OnayBekliyorClient() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<"idle" | "sent" | "error">("idle");
  const supabase = createClient();

  async function handleResend() {
    setLoading(true);
    setMessage("idle");
    const { data: { user } } = await supabase.auth.getUser();
    const email = user?.email;
    if (!email) {
      setMessage("error");
      setLoading(false);
      return;
    }
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
    });
    setLoading(false);
    if (error) {
      setMessage("error");
      return;
    }
    setMessage("sent");
  }

  return (
    <div className="space-y-6 text-center">
      <Link
        href="/"
        className="font-display text-2xl font-bold text-dz-black dark:text-dz-white"
      >
        Dipten<span className="text-dz-orange-500">Zirveye</span>
      </Link>
      <h1 className="font-display text-xl font-bold text-dz-black dark:text-dz-white">
        E-posta doğrulama gerekli
      </h1>
      <p className="text-dz-grey-600 dark:text-dz-grey-400">
        Panel’e erişmek için e-posta adresini doğrulaman gerekiyor. Gönderdiğimiz
        bağlantıya tıkla; ardından bu sayfadan tekrar giriş yapabilirsin.
      </p>
      <div className="space-y-3">
        <button
          type="button"
          onClick={handleResend}
          disabled={loading}
          className="rounded-lg bg-dz-orange-500 px-4 py-3 min-h-[44px] font-medium text-white hover:bg-dz-orange-600 disabled:opacity-50"
        >
          {loading ? "Gönderiliyor…" : "Doğrulama e-postasını tekrar gönder"}
        </button>
        {message === "sent" && (
          <p className="text-sm text-green-600 dark:text-green-400">
            E-posta tekrar gönderildi. Gelen kutunu kontrol et.
          </p>
        )}
        {message === "error" && (
          <p className="text-sm text-red-600 dark:text-red-400">
            Gönderilemedi. Bir süre sonra tekrar dene.
          </p>
        )}
      </div>
      <p className="text-sm text-dz-grey-500">
        <Link href="/giris" className="text-dz-orange-500 hover:underline">
          Giriş sayfasına dön
        </Link>
      </p>
    </div>
  );
}
