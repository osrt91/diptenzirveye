"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function TestEkraniClient() {
  const [sonuc, setSonuc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  async function testLeaderboard() {
    setLoading(true);
    setSonuc(null);
    const { data, error } = await supabase.rpc("get_leaderboard", { lim: 3 });
    setLoading(false);
    if (error) {
      setSonuc(`Hata: ${error.message}`);
      return;
    }
    setSonuc(`OK — ${(data?.length ?? 0)} kayıt (ilk 3).`);
  }

  async function testChatRooms() {
    setLoading(true);
    setSonuc(null);
    const { data, error } = await supabase.from("chat_rooms").select("id, name, slug");
    setLoading(false);
    if (error) {
      setSonuc(`Hata: ${error.message}`);
      return;
    }
    setSonuc(`OK — ${data?.length ?? 0} oda: ${(data ?? []).map((r) => r.name).join(", ")}`);
  }

  async function testBooks() {
    setLoading(true);
    setSonuc(null);
    const { data, error } = await supabase.from("books").select("id, title").limit(5);
    setLoading(false);
    if (error) {
      setSonuc(`Hata: ${error.message}`);
      return;
    }
    setSonuc(`OK — ${data?.length ?? 0} kitap.`);
  }

  return (
    <section className="rounded-xl border border-dz-grey-200 dark:border-dz-grey-800 p-5 space-y-4">
      <h2 className="font-display font-semibold text-dz-black dark:text-dz-white">
        Hızlı test (istemci)
      </h2>
      <p className="text-sm text-dz-grey-600 dark:text-dz-grey-400">
        Aşağıdaki butonlarla API çağrılarını dene.
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={testLeaderboard}
          disabled={loading}
          className="rounded-lg border border-dz-grey-300 dark:border-dz-grey-600 px-3 py-1.5 text-sm font-medium disabled:opacity-50"
        >
          Leaderboard
        </button>
        <button
          type="button"
          onClick={testChatRooms}
          disabled={loading}
          className="rounded-lg border border-dz-grey-300 dark:border-dz-grey-600 px-3 py-1.5 text-sm font-medium disabled:opacity-50"
        >
          Sohbet odaları
        </button>
        <button
          type="button"
          onClick={testBooks}
          disabled={loading}
          className="rounded-lg border border-dz-grey-300 dark:border-dz-grey-600 px-3 py-1.5 text-sm font-medium disabled:opacity-50"
        >
          Kitaplar
        </button>
      </div>
      {sonuc && (
        <p className="text-sm text-dz-grey-700 dark:text-dz-grey-300 font-mono bg-dz-grey-100 dark:bg-dz-grey-800 rounded px-2 py-1">
          {sonuc}
        </p>
      )}
      <div className="pt-2 border-t border-dz-grey-200 dark:border-dz-grey-800 flex flex-wrap gap-3 text-sm">
        <Link href="/panel" className="text-dz-orange-500 hover:underline">
          Dashboard
        </Link>
        <Link href="/panel/siralama" className="text-dz-orange-500 hover:underline">
          Sıralama
        </Link>
        <Link href="/panel/sohbet" className="text-dz-orange-500 hover:underline">
          Sohbet
        </Link>
        <Link href="/" className="text-dz-orange-500 hover:underline">
          Ana sayfa
        </Link>
      </div>
    </section>
  );
}
