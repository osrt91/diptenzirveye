import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [profileRes, progressRes, booksRes] = await Promise.all([
    supabase
      .from("profiles")
      .select("onboarding_goals, display_name")
      .eq("id", user.id)
      .single(),
    supabase
      .from("user_progress")
      .select("total_xp, level, current_streak_days")
      .eq("user_id", user.id)
      .single(),
    supabase
      .from("user_books")
      .select("book:books(title, slug, sort_order), current_chapter, completed_at")
      .eq("user_id", user.id),
  ]);

  const goals = profileRes.data?.onboarding_goals ?? [];
  const xp = progressRes.data?.total_xp ?? 0;
  const level = progressRes.data?.level ?? 1;
  const streak = progressRes.data?.current_streak_days ?? 0;
  type UserBookEntry = {
    book: { title: string; slug: string; sort_order: number } | { title: string; slug: string; sort_order: number }[] | null;
    current_chapter: number;
    completed_at: string | null;
  };

  const completedBooks = (booksRes.data ?? []).filter((b: UserBookEntry) => b.completed_at != null).length;
  const activeBooks = (booksRes.data ?? []).filter((b: UserBookEntry) => b.completed_at == null);

  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      path: generateStaticPath(goals, level, completedBooks),
    });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `Sen DiptenZirveye AI öğrenme platformunun kişisel koçusun. Kullanıcıya özel bir öğrenme yol haritası oluştur.

Kullanıcı bilgileri:
- Hedefler: ${goals.length > 0 ? goals.join(", ") : "Belirtilmemiş"}
- Seviye: ${level} (Toplam XP: ${xp})
- Seri: ${streak} gün
- Tamamlanan kitap: ${completedBooks}/10
- Aktif kitaplar: ${activeBooks.map((b: UserBookEntry) => {
  const book = Array.isArray(b.book) ? b.book[0] : b.book;
  return book?.title ?? "Bilinmeyen";
}).join(", ") || "Yok"}

Platform modülleri:
1. 10 Kitaplık Ekosistem (AI Devrimi, Prompt Mühendisliği, AI Araçları, Erteleme Çıkış, AI Gelir, İçerik İmparatorluğu, Otomasyon, AI Ölçek, AI Liderliği, AI Mimarı)
2. Zihin Motoru (Pomodoro)
3. Eylem İvmesi (Erteleme kırma)
4. Prompt Hub (Prompt paylaşma)
5. Günlük Prompt Challenge
6. Not Defteri
7. Rozetler ve XP sistemi

JSON formatında yanıt ver (başka bir şey yazma):
{
  "summary": "1-2 cümle kişisel özet",
  "nextSteps": [
    { "title": "Adım başlığı", "description": "Kısa açıklama", "action": "Yapılması gereken", "link": "/panel/kitap veya ilgili link", "priority": "high/medium/low" }
  ],
  "weeklyPlan": [
    { "day": "Pazartesi", "task": "Günlük görev", "duration": "30 dk" }
  ],
  "tips": ["İpucu 1", "İpucu 2", "İpucu 3"]
}

Maksimum 5 nextSteps, 7 weeklyPlan (her gün için 1), 3 tips ver.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return NextResponse.json({ path: parsed });
    }
    return NextResponse.json({
      path: generateStaticPath(goals, level, completedBooks),
    });
  } catch {
    return NextResponse.json({
      path: generateStaticPath(goals, level, completedBooks),
    });
  }
}

function generateStaticPath(goals: string[], level: number, completedBooks: number) {
  const nextSteps = [];

  if (completedBooks === 0) {
    nextSteps.push({
      title: "İlk Kitabını Seç",
      description: "Kütüphaneden AI Devrimini Anlamak kitabıyla başla",
      action: "Kitabı aç ve ilk bölümü oku",
      link: "/panel/kitap",
      priority: "high",
    });
  }

  if (goals.includes("erteleme")) {
    nextSteps.push({
      title: "Eylem İvmesi Başlat",
      description: "5 saniyelik kural ile ertelemeyi kır",
      action: "Eylem İvmesi modülünü aç",
      link: "/panel/erteleme",
      priority: "high",
    });
  }

  if (goals.includes("odak")) {
    nextSteps.push({
      title: "Zihin Motoru Oturumu",
      description: "25 dakikalık odaklanma seansı başlat",
      action: "Pomodoro zamanlayıcısını başlat",
      link: "/panel/pomodoro",
      priority: "high",
    });
  }

  if (goals.includes("gelir")) {
    nextSteps.push({
      title: "Prompt Mühendisliği Öğren",
      description: "AI ile gelir elde etmenin temeli doğru promptlar yazmak",
      action: "Prompt Hub'da günlük challenge tamamla",
      link: "/panel/prompt-challenge",
      priority: "medium",
    });
  }

  nextSteps.push({
    title: "Günlük Görevlerini Tamamla",
    description: "Her gün görevlerini tamamlayarak XP ve streak kazan",
    action: "Dashboard'daki görevlere bak",
    link: "/panel",
    priority: "medium",
  });

  return {
    summary: `Seviye ${level} ile iyi gidiyorsun! ${completedBooks > 0 ? `${completedBooks} kitap tamamladın.` : "Henüz başlangıçtasın, ilk kitabınla yolculuğa başla!"} Hedeflerine ulaşmak için aşağıdaki adımları takip et.`,
    nextSteps: nextSteps.slice(0, 5),
    weeklyPlan: [
      { day: "Pazartesi", task: "1 bölüm oku + Not çıkar", duration: "30 dk" },
      { day: "Salı", task: "Prompt Challenge tamamla", duration: "15 dk" },
      { day: "Çarşamba", task: "Zihin Motoru + 1 bölüm oku", duration: "45 dk" },
      { day: "Perşembe", task: "Quiz çöz + Rozet kontrol", duration: "20 dk" },
      { day: "Cuma", task: "Prompt Hub'da prompt paylaş", duration: "15 dk" },
      { day: "Cumartesi", task: "2 bölüm oku + Özet çıkar", duration: "45 dk" },
      { day: "Pazar", task: "Haftayı değerlendir + Yeni hedef koy", duration: "15 dk" },
    ],
    tips: [
      "Her gün en az 15 dakika ayır — tutarlılık hızdan önemli.",
      "Öğrendiklerini hemen uygula — not al, prompt yaz, proje başlat.",
      "Streak'ini kırma — küçük adımlar bile sayılır.",
    ],
  };
}
