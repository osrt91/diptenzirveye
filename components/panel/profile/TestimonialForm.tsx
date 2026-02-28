"use client";

import { useState } from "react";
import { Star, Send, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function TestimonialForm({ userName }: { userName: string }) {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setStatus("loading");

    const supabase = createClient();
    const { error } = await supabase.from("testimonials").insert({
      name: userName,
      role: role || "Kullanıcı",
      text: text.trim(),
      rating,
    });

    if (error) {
      setStatus("error");
    } else {
      setStatus("success");
      setText("");
      setRole("");
      setRating(5);
    }
  };

  if (status === "success") {
    return (
      <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-2xl p-6 text-center">
        <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-3" />
        <h3 className="font-display font-bold text-green-700 dark:text-green-400 mb-1">Yorumun Gönderildi!</h3>
        <p className="text-sm text-green-600 dark:text-green-400/80">Admin onayından sonra ana sayfada yayınlanacak.</p>
      </div>
    );
  }

  return (
    <div className="bg-dz-grey-50 dark:bg-dz-grey-900 border border-dz-grey-200 dark:border-dz-grey-800 rounded-2xl p-6">
      <h3 className="font-display font-bold text-dz-black dark:text-white mb-1">Deneyimini Paylaş</h3>
      <p className="text-xs text-dz-grey-500 mb-4">Yorumun admin onayından sonra ana sayfada görünecek.</p>

      <div className="flex gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <button key={i} onClick={() => setRating(i)} className="group">
            <Star className={`w-6 h-6 transition-colors ${i <= rating ? "text-dz-amber-400 fill-dz-amber-400" : "text-dz-grey-300 dark:text-dz-grey-700 group-hover:text-dz-amber-300"}`} />
          </button>
        ))}
      </div>

      <input
        value={role}
        onChange={(e) => setRole(e.target.value)}
        placeholder="Mesleğin (ör: Yazılım Geliştirici)"
        className="w-full rounded-lg border border-dz-grey-200 dark:border-dz-grey-700 bg-dz-white dark:bg-dz-black px-3 py-2 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-dz-orange-500/30"
      />

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        placeholder="DiptenZirveye deneyimini anlat..."
        className="w-full rounded-lg border border-dz-grey-200 dark:border-dz-grey-700 bg-dz-white dark:bg-dz-black px-3 py-2 text-sm mb-3 resize-none focus:outline-none focus:ring-2 focus:ring-dz-orange-500/30"
      />

      {status === "error" && <p className="text-xs text-red-500 mb-2">Bir hata oluştu. Tekrar deneyin.</p>}

      <button
        onClick={handleSubmit}
        disabled={!text.trim() || status === "loading"}
        className="flex items-center justify-center gap-2 w-full bg-dz-orange-500 hover:bg-dz-orange-600 text-white font-bold py-2.5 px-4 rounded-lg text-sm transition-colors disabled:opacity-40"
      >
        <Send className="w-4 h-4" /> {status === "loading" ? "Gönderiliyor..." : "Yorumu Gönder"}
      </button>
    </div>
  );
}
