"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type WaitlistFormProps = {
  onSuccess?: (position: number) => void;
  variant?: "hero" | "inline";
};

export default function WaitlistForm({ onSuccess, variant = "hero" }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [interest, setInterest] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [position, setPosition] = useState(0);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, interest }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Bir hata oluþtu.");
        setStatus("error");
        return;
      }
      setPosition(data.position ?? 0);
      setStatus("success");
      onSuccess?.(data.position ?? 0);
    } catch {
      setMessage("Baðlantý hatasý. Lütfen tekrar dene.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl bg-dz-orange-50 dark:bg-dz-grey-800 p-6 text-center"
      >
        <p className="font-display font-semibold text-dz-orange-600 dark:text-dz-orange-400">
          Listeye eklendin.
        </p>
        <p className="mt-2 text-dz-grey-600 dark:text-dz-grey-400">
          Sýra numaran: <span className="font-mono font-medium text-dz-orange-500">#{position}</span>
        </p>
      </motion.div>
    );
  }

  const isHero = variant === "hero";
  return (
    <form onSubmit={handleSubmit} className={isHero ? "space-y-3" : "space-y-2"}>
      <div className={isHero ? "flex flex-col sm:flex-row gap-3" : "space-y-2"}>
        <input
          type="email"
          required
          placeholder="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-dz-grey-200 dark:border-dz-grey-600 bg-dz-white dark:bg-dz-grey-800 px-4 py-3 font-sans text-dz-black dark:text-dz-white placeholder:text-dz-grey-400 focus:border-dz-orange-400 focus:outline-none focus:ring-2 focus:ring-dz-orange-400/20"
        />
        <input
          type="text"
          placeholder="Ýsim (isteðe baðlý)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-dz-grey-200 dark:border-dz-grey-600 bg-dz-white dark:bg-dz-grey-800 px-4 py-3 font-sans text-dz-black dark:text-dz-white placeholder:text-dz-grey-400 focus:border-dz-orange-400 focus:outline-none focus:ring-2 focus:ring-dz-orange-400/20"
        />
      </div>
      <input
        type="text"
        placeholder="Ýlgi alanýn (örn: giriþimcilik, AI)"
        value={interest}
        onChange={(e) => setInterest(e.target.value)}
        className="w-full rounded-xl border border-dz-grey-200 dark:border-dz-grey-600 bg-dz-white dark:bg-dz-grey-800 px-4 py-3 font-sans text-dz-black dark:text-dz-white placeholder:text-dz-grey-400 focus:border-dz-orange-400 focus:outline-none focus:ring-2 focus:ring-dz-orange-400/20"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-xl bg-dz-orange-500 px-6 py-3 font-display font-semibold text-dz-white hover:bg-dz-orange-600 focus:outline-none focus:ring-2 focus:ring-dz-orange-400 focus:ring-offset-2 disabled:opacity-70"
      >
        {status === "loading" ? "Ekleniyor…" : "Bekleme listesine katýl"}
      </button>
      {message && (
        <p className="text-sm text-red-500 dark:text-red-400">{message}</p>
      )}
    </form>
  );
}
