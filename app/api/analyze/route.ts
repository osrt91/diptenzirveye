import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@/lib/supabase/server";

const API_KEY = process.env.GOOGLE_API_KEY ?? "";

function generateStaticAnalysis(answers: Record<string, string>): string {
    const hedef = answers.hedef;
    const durum = answers.durum;

    let text = "Analiz sonuçlarına göre, senin için en uygun başlangıç noktasını belirledik. ";

    if (hedef === "erteleme") {
        text +=
            "Erteleme alışkanlığını yenmek için Eylem İvmesi Serisi (Action Momentum) modülündeki '5 Saniye Kuralı' ve '2 Dakika Kuralı' tekniklerini hemen uygulamaya başlamalısın. Bu mikro-adımlar beyninin direnç mekanizmasını devre dışı bırakarak harekete geçmeni sağlayacak.";
    } else if (hedef === "odak") {
        text +=
            "Derin çalışma kapasiteni artırmak için Zihin Motoru (Focus Engine) modülünü aktif olarak kullanmaya başla. 25 dakikalık odak seansları ile başla ve zamanla süreyi artır. Nexus Protokolü (Stratejik Hedefleme) ile hedeflerini netleştermen, odaklanma sürecini destekleyecek.";
    } else if (hedef === "motivasyon") {
        text +=
            "Sürdürülebilir motivasyon için XP ve rozet sistemimizdeki günlük görevleri takip etmen kritik. Her küçük tamamlama, beyninde dopamin döngüsü oluşturarak momentum kazanmanı sağlar. Momentum Spectrum çarkını kullanarak motivasyon seviyeni düzenli ölçümle.";
    } else {
        text +=
            "AI ile gelir elde etme hedefin için kitap serisindeki 'AI ile İlk Gelirim' modülünden başla. Prompt mühendisliği becerilerini geliştirdikçe ChatGPT, Claude ve Midjourney rozetlerini kazanarak yetkinliklerini kanıtla.";
    }

    if (durum === "baslangic") {
        text += " Başlangıç seviyesindesin — bu tamamen normal ve harika bir avantaj. Nexus Protokolü ile net, ölçülebilir hedefler koyarak ilk adımını at.";
    } else if (durum === "yarim_birakma") {
        text += " Yarım bırakma eğilimin için Chaos Filter (Hiper-Odak Planlayıcı) modülü biçilmiş kaftan. Görevlerini Eisenhower matrisine dökerek önceliklendirmen, bitirme oranını dramatik şekilde artıracak.";
    } else if (durum === "tikanma") {
        text += " Tıkanma noktasını aşmak için Momentum Spectrum çarkıyla zayıf alanlarını tespit et. Genellikle 'Hedef Netliği' veya 'Zaman Yönetimi' boyutunda bir kalibrasyon ihtiyacı olur.";
    }

    return text;
}

export async function POST(req: NextRequest) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { answers } = await req.json();

        if (!answers || Object.keys(answers).length === 0) {
            return NextResponse.json(
                { error: "Yanıtlar eksik." },
                { status: 400 }
            );
        }

        // API key yoksa veya AI başarısız olursa statik analiz dön
        if (!API_KEY) {
            return NextResponse.json({ analysis: generateStaticAnalysis(answers) });
        }

        const answersStr = Object.entries(answers)
            .map(([key, val]) => `- ${key}: ${val}`)
            .join("\n");

        const prompt = `Sen "DiptenZirveye" platformunun üst düzey AI Strateji Koçusun.
Kullanıcı onboarding testini tamamladı. Yanıtları:
${answersStr}

Görev: Bu yanıtlara dayanarak kullanıcının mevcut yetkinliğini analiz et ve 2-3 paragraftan oluşan motive edici, kişiselleştirilmiş bir "Stratejik Yol Haritası" yaz.

Kurallar:
1. Profesyonel, vizyoner ve ROI odaklı bir dil kullan.
2. Şu modülleri uygun yerlerde kullan:
   - "Eylem İvmesi Serisi (Action Momentum)" — erteleme yenme teknikleri
   - "Zihin Motoru (Focus Engine)" — pomodoro/derin çalışma
   - "Nexus Protokolü (Stratejik Hedefleme)" — SMART hedef belirleme
   - "Momentum Spectrum" — performans kalibrasyon çarkı
   - "Chaos Filter" — Eisenhower matrisi planlayıcı
3. Kullanıcının hedef ve durumuna göre hangi modülden başlaması gerektiğini net söyle.
4. Liste YAPMA, akıcı paragraf yaz. DiptenZirveye'nin bir parçası olduğunu hissettir.
5. Maksimum 250 kelime.`;

        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        return NextResponse.json({ analysis: responseText });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        // Fallback: AI başarısız olursa statik analiz
        try {
            const body = await req.clone().json();
            if (body.answers) {
                return NextResponse.json({
                    analysis: generateStaticAnalysis(body.answers),
                });
            }
        } catch {
            // Body parse da başarısız olursa genel mesaj
        }

        return NextResponse.json(
            { error: "Analiz sırasında bir sorun oluştu." },
            { status: 500 }
        );
    }
}

