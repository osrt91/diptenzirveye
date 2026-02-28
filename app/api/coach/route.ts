import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GOOGLE_API_KEY ?? "";

const MOTIVATIONAL_MESSAGES = [
    "Başarı bir maraton, sprint değil. Bugünkü küçük adımın yarınki büyük sıçramanın temelidir. Zihin Motoru (Focus Engine) ile günlük odaklanma seanslarına devam et, momentum asla durmasın.",
    "Her gün platformda geçirdiğin her dakika, seni rakiplerinden bir adım öne taşıyor. Nexus Protokolü ile hedeflerini net tut ve Eylem İvmesi Serisi ile ertelemeyi tamamen devre dışı bırak.",
    "AI çağında en büyük avantaj, 'öğrenmeyi öğrenmek'. Sen zaten bu yolda ilerliyorsun. Momentum Spectrum çarkını kullanarak zayıf noktalarını tespit et ve Chaos Filter ile görevlerini önceliklendir.",
    "Yapay zeka araçlarını sadece bilmek yetmez, ustalaşmak gerekir. ChatGPT, Claude ve Gemini rozetlerini kazanarak yetkinliklerini kanıtla. Her rozet, dijital CV'ne eklenen bir yetkinlik belgesi.",
];

export async function POST(req: NextRequest) {
    try {
        const { question, userContext } = await req.json();

        // Basit motivasyon (soru yoksa)
        if (!question) {
            const randomMessage =
                MOTIVATIONAL_MESSAGES[Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)];
            return NextResponse.json({ response: randomMessage });
        }

        // AI key yoksa statik cevap
        if (!API_KEY) {
            return NextResponse.json({
                response:
                    "Şu an koçunuz çevrimdışı. Ancak şunu hatırla: En önemli adım bir sonraki adım. Paneldeki Zihin Motoru seansını başlat ve bugünkü hedefine odaklan!",
            });
        }

        const contextStr = userContext
            ? `Kullanıcı bilgileri: XP: ${userContext.xp || 0}, Level: ${userContext.level || 1}, Seri: ${userContext.streak || 0} gün`
            : "";

        const prompt = `Sen "DiptenZirveye" platformunun AI Koçusun. Kısa, motive edici, aksiyona yönelik cevaplar veriyorsun.
${contextStr}

Kullanıcının sorusu: "${question}"

Kurallar:
1. Maksimum 3-4 cümle.
2. Platformdaki modüllere yönlendir: Zihin Motoru, Eylem İvmesi, Nexus Protokolü, Momentum Spectrum, Chaos Filter.
3. Motive edici ama gerçekçi ol. Boş vaatler verme.
4. Samimi "sen" dili kullan.`;

        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        return NextResponse.json({ response: responseText });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Coach API Hatası:", message);

        return NextResponse.json({
            response:
                "Koçun şu an meşgul, ama sana bir ipucu bırakayım: Bugün tek bir mikro-görev tamamla. Sadece bir tane. O momentum her şeyi değiştirir.",
        });
    }
}
