import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import QuizEngine from "@/components/panel/quiz/QuizEngine";

export const metadata = {
  title: "Quiz | DiptenZirveye",
};

const SAMPLE_QUESTIONS = [
  {
    id: "q1",
    type: "multiple_choice" as const,
    question: "Prompt mühendisliğinde 'Chain of Thought' tekniği ne anlama gelir?",
    options: [
      "AI'ya adım adım düşünmesini söylemek",
      "Birden fazla AI modelini zincirlemek",
      "Promptları birbirine bağlamak",
      "AI'nın hafızasını uzatmak",
    ],
    correctIndex: 0,
    xp: 10,
  },
  {
    id: "q2",
    type: "ordering" as const,
    question: "Etkili bir prompt yazma adımlarını doğru sıraya koyun:",
    items: [
      "Rol ve bağlam tanımla",
      "Görevi açıkça belirt",
      "Çıktı formatını belirle",
      "Örnekler ver (few-shot)",
      "Kısıtlamaları ekle",
    ],
    correctOrder: [0, 1, 3, 4, 2],
    xp: 15,
  },
  {
    id: "q3",
    type: "fill_blank" as const,
    question: "Aşağıdaki prompt mühendisliği terimlerinin boşluklarını doldurun:",
    blankedText: "AI'ya belirli bir ___ vermek, yanıtların kalitesini artırır. Birden fazla örnek verme tekniğine ___ denir.",
    blanks: [
      { position: 0, answer: "rol", alternatives: ["persona", "karakter"] },
      { position: 1, answer: "few-shot", alternatives: ["few shot", "fewshot"] },
    ],
    xp: 15,
  },
  {
    id: "q4",
    type: "multiple_choice" as const,
    question: "Hangisi bir AI halüsinasyonunu (hallucination) önleme yöntemi DEĞİLDİR?",
    options: [
      "Kaynakları doğrulamayı istemek",
      "Sıcaklık (temperature) değerini düşürmek",
      "Promptu uzatmak",
      "Bilmiyorsan 'bilmiyorum' de demesini istemek",
    ],
    correctIndex: 2,
    xp: 10,
  },
  {
    id: "q5",
    type: "ordering" as const,
    question: "DiptenZirveye öğrenme yolculuğunu doğru sıraya koyun:",
    items: [
      "AI Devrimini Anlamak",
      "Prompt Mühendisliği",
      "AI Araçları Rehberi",
      "Ertelemeden Çıkış",
      "AI ile İlk Gelirim",
    ],
    correctOrder: [0, 1, 2, 3, 4],
    xp: 15,
  },
  {
    id: "q6",
    type: "fill_blank" as const,
    question: "AI kavramlarını tamamlayın:",
    blankedText: "Büyük dil modellerinin eğitiminde kullanılan yönteme ___ denir. Modelin yanıtlarını iyileştirmek için insan geri bildirimi ile yapılan eğitime ___ denir.",
    blanks: [
      { position: 0, answer: "pre-training", alternatives: ["pretraining", "ön eğitim"] },
      { position: 1, answer: "RLHF", alternatives: ["rlhf", "reinforcement learning from human feedback"] },
    ],
    xp: 15,
  },
  {
    id: "q7",
    type: "multiple_choice" as const,
    question: "Hangisi ChatGPT, Claude ve Gemini'nin ortak özelliğidir?",
    options: [
      "Hepsi Google tarafından geliştirilmiştir",
      "Hepsi Transformer mimarisini kullanır",
      "Hepsi açık kaynaklıdır",
      "Hepsi aynı eğitim verisini kullanır",
    ],
    correctIndex: 1,
    xp: 10,
  },
  {
    id: "q8",
    type: "ordering" as const,
    question: "AI ile gelir elde etme adımlarını sıralayın:",
    items: [
      "Bir niş alan belirle",
      "AI araçlarını öğren",
      "İlk projeyi tamamla",
      "Portföy oluştur",
      "Müşteri bul ve gelir elde et",
    ],
    correctOrder: [0, 1, 2, 3, 4],
    xp: 15,
  },
];

export default async function QuizPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/giris");

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="font-display text-2xl font-bold text-dz-black dark:text-dz-white">
          AI Bilgi Testi
        </h1>
        <p className="text-dz-grey-600 dark:text-dz-grey-400 mt-1">
          Sıralama, boşluk doldurma ve çoktan seçmeli sorularla bilgini test et.
        </p>
      </div>
      <QuizEngine
        title="AI Bilgi Testi"
        questions={SAMPLE_QUESTIONS}
        userId={user.id}
        quizId="ai-knowledge-v1"
      />
    </div>
  );
}
