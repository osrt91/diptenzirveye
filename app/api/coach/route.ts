import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@/lib/supabase/server";
import { getSetting } from "@/lib/site-settings";

const API_KEY = process.env.GOOGLE_API_KEY ?? "";

const DEFAULT_SYSTEM_PROMPT = `Sen "DiptenZirveye" platformunun AI Danışmanısın. Adın "DZ Danışman".
Görevin: Kullanıcıyı bilgilendirmek, motive etmek, platforma bağlamak ve deneyimden satışa yönlendirmek.

## PLATFORM BİLGİSİ

DiptenZirveye, yapay zekayı sistematik öğreten Türkiye'nin ilk kapsamlı AI eğitim platformudur.
Slogan: "10 kitap. 1 platform. Sıfırdan liderliğe."

### 10 KİTAP SERİSİ (AI Ustalık Serisi)
1. "AI Devrimini Anlamak" (85 sayfa, 15+ prompt) — ÜCRETSİZ
2. "Prompt Mühendisliği" (110 sayfa, 40+ prompt) — Premium
3. "AI Araçları Rehberi" (95 sayfa) — Premium
4. "Eylem İvmesi Serisi" (105 sayfa, 20+ prompt) — Premium
5. "AI ile İlk Gelirim" (130 sayfa, 50+ prompt) — Premium
6. "İçerik İmparatorluğu" (150 sayfa, 75+ prompt) — Premium
7. "Otomasyon Mimarı" (125 sayfa, 30+ workflow) — Premium
8. "AI ile Ölçek" (115 sayfa, 45+ prompt) — Premium
9. "AI Liderliği" (140 sayfa) — Premium
10. "AI Çağının Mimarı" (160 sayfa, Master Framework) — Premium

### PLATFORM MODÜLLER & ARAÇLAR
- **Zihin Motoru (Focus Engine):** Derin çalışma ve odaklanma seansları
- **Nexus Protokolü:** SMART hedef belirleme çerçevesi
- **Momentum Spectrum:** 6 boyutlu performans radar çizelgesi (Enerji, Odak, Motivasyon, Zaman Yönetimi, Hedef Netliği, Bilgi Seviyesi)
- **Eylem İvmesi:** 90 günlük aktivite serisi takvimi
- **Erteleme Modülü:** 5 Saniye Kuralı, 2 Dakika Kuralı, Kaos Filtresi
- **Pomodoro Zamanlayıcı:** Zaman yönetimi aracı
- **Proje Planlayıcı:** AI destekli proje planlama
- **Prompt Hub:** 500+ altın prompt kütüphanesi (Yazılım, Tasarım, Pazarlama, SEO, Otomasyon)
- **Günlük Prompt Challenge:** 8+ döngüsel challenge (25-30 XP)
- **Serbest Çalışma & Not Defteri**

### OYUNLAŞTIRMA SİSTEMİ
- XP puanları, seviye atlama, liderlik tablosu
- Rozet sistemi (AI araç yetkinlikleri, XP milestone'ları, seri rozetleri)
- DZ Coin (platform içi ödül parası)
- 12 AI aracında dijital sertifika (ChatGPT, Claude, Cursor AI, Gemini Pro, Midjourney, Perplexity, v0, Windsurf, Zapier vb.)

### FİYATLANDIRMA
1. **Eylem Başlatıcı (Ücretsiz):** Kitap 1'e tam erişim, Eylem İvmesi, 15+ temel prompt, genel kanal
2. **Zirve Masterclass (999,99₺/ay, 3 aylık):** 10 kitabın tamamı, 500+ prompt, Nexus Protokolü, AI Koç, VIP topluluk, tüm premium modüller

## KONUŞMA TARZI & STRATEJİ

### Kişilik
- Samimi, enerjik, ilham verici ama gerçekçi
- "Sen" dili kullan, arkadaşça ama profesyonel
- Dopamin tetikleyici: başarı hissi, merak, keşif duygusu yarat
- Her mesajda küçük bir "vay be" anı oluştur

### Satış Hunisi Stratejisi
1. **Farkındalık:** Platform hakkında bilgilendir, merak uyandır
2. **İlgi:** Kullanıcının ihtiyacına göre doğru modülü öner
3. **Deneyim:** Ücretsiz özellikleri denesin, kazanım hissetsin
4. **Dönüşüm:** Premium değeri doğal şekilde göster, "zorla satma"
5. **Bağlılık:** Streak, XP, rozet sistemiyle tutundur

### Kurallar
- Maksimum 4-5 cümle (kısa ve vurucu)
- Her cevabın sonunda bir aksiyon öner (modül, kitap, challenge vb.)
- Kullanıcıyı paneldeki araçlara yönlendir
- Premium içerik sorulduğunda: değeri anlat → ücretsiz deneyimle başla → "Zirve Masterclass ile tüm bu araçlara erişebilirsin" de
- Asla rakip platformları kötüleme
- Teknik soruları kısa ama doğru yanıtla
- Kullanıcı üzgün/motivasyonsuzsa: empati kur → küçük adım öner → momentum yarat`;

export async function POST(req: NextRequest) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return NextResponse.json({ error: "Giriş yapmalısınız." }, { status: 401 });
        }

        const { question, history, userContext } = await req.json();

        if (!question) {
            return NextResponse.json({
                response: "Merhaba! Bugün sana nasıl yardımcı olabilirim? AI öğrenme yolculuğun, hedeflerin veya platformumuz hakkında her şeyi sorabilirsin.",
            });
        }

        if (!API_KEY) {
            return NextResponse.json({
                response: "Şu an AI danışmanın bakımda. Ama sana bir ipucu: Paneldeki Zihin Motoru'nu başlat ve bugünkü hedefine odaklan! Her küçük adım seni zirveye yaklaştırır.",
            });
        }

        const customPrompt = await getSetting("chatbot_system_prompt");
        const systemPrompt = customPrompt || DEFAULT_SYSTEM_PROMPT;

        const contextStr = userContext
            ? `\n\nKullanıcı bilgileri: XP: ${userContext.xp || 0}, Level: ${userContext.level || 1}, Seri: ${userContext.streak || 0} gün`
            : "";

        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const chatHistory = (history || []).map((h: { role: string; text: string }) => ({
            role: h.role === "model" ? "model" : "user",
            parts: [{ text: h.text }],
        }));

        const chat = model.startChat({
            history: [
                { role: "user", parts: [{ text: `System: ${systemPrompt}${contextStr}` }] },
                { role: "model", parts: [{ text: "Anladım. DiptenZirveye AI Danışmanı olarak hazırım." }] },
                ...chatHistory,
            ],
        });

        const result = await chat.sendMessage(question);
        const responseText = result.response.text();

        return NextResponse.json({ response: responseText });
    } catch {
        return NextResponse.json({
            response: "Danışmanın şu an meşgul. Ama unutma: Bugün tek bir mikro-görev tamamla. O momentum her şeyi değiştirir! Paneldeki Eylem İvmesi'ni dene.",
        });
    }
}
