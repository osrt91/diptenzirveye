import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ToolMarquee from "@/components/ToolMarquee";
import SocialProof from "@/components/SocialProof";
import LeaderboardBlock from "@/components/LeaderboardBlock";
import Footer from "@/components/Footer";

const ProblemSection = dynamic(() => import("@/components/ProblemSection"));
const BookRoadmap = dynamic(() => import("@/components/BookRoadmap"));
const Benefits = dynamic(() => import("@/components/Benefits"));
const HowItWorks = dynamic(() => import("@/components/HowItWorks"));
const PanelPreview = dynamic(() => import("@/components/PanelPreview"));
const GamificationShowcase = dynamic(() => import("@/components/GamificationShowcase"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const EarningSection = dynamic(() => import("@/components/EarningSection"));
const Certifications = dynamic(() => import("@/components/Certifications"));
const PlannerShowcase = dynamic(() => import("@/components/PlannerShowcase"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const FounderOffer = dynamic(() => import("@/components/FounderOffer"));
const SocialProofToast = dynamic(() => import("@/components/SocialProofToast"));
const ScrollCTA = dynamic(() => import("@/components/ScrollCTA"));

export const metadata: Metadata = {
  title: "DiptenZirveye — AI Ustalık Serisi | Ana Sayfa",
  description:
    "10 kitap, 1 platform. Sıfırdan AI liderliğine. Kitap oku, XP kazan, rozetler topla ve toplulukla birlikte ilerle.",
  alternates: {
    canonical: "/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "DiptenZirveye",
  url: "https://diptenzirveye.com",
  description:
    "10 kitap, 1 platform. Sıfırdan AI liderliğine. Yapay zekayı sistematik kullanan kazanır.",
  sameAs: [],
  offers: {
    "@type": "Offer",
    name: "Zirve Masterclass (3 Aylık)",
    price: "999.99",
    priceCurrency: "TRY",
    availability: "https://schema.org/InStock",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "DiptenZirveye bana nasıl para kazandıracak?",
      acceptedAnswer: { "@type": "Answer", text: "Serideki 10 kitap ve sunduğumuz özel araçlar, teorik bilgiden ziyade pratik yeteneklere odaklanır. Prompt mühendisliği, AI ile içerik üretimi ve otomasyon stratejileriyle kendi işini kurabilir, mevcut işinde yükselip maaşını katlayabilir veya küresel pazarda yüksek ücretli bir Freelancer olabilirsin." },
    },
    {
      "@type": "Question",
      name: "Platformu kullanmak ücretsiz mi?",
      acceptedAnswer: { "@type": "Answer", text: "Evet! Kurucu üye olarak kayıt olduğunda giriş modülü (Kitap 1), temel çalışma kağıtları ve AI odaklanma seanslarımız gibi birçok özellikten kalıcı olarak ÜCRETSİZ faydalanırsın." },
    },
    {
      "@type": "Question",
      name: "XP, Rozetler ve Seviye sistemi ne işe yarıyor?",
      acceptedAnswer: { "@type": "Answer", text: "Kitapları tamamladıkça, Zihin Motoru seansları yaptıkça XP ve rozetler kazanırsın. Üst seviyelere çıkarak özel çekilişlere katılma, sürpriz Premium içeriklere erişme ve gizli discord yetkileri kazanma şansı yakalarsın." },
    },
    {
      "@type": "Question",
      name: "Mobil cihazdan kullanabilir miyim?",
      acceptedAnswer: { "@type": "Answer", text: "Evet! DiptenZirveye tam anlamıyla mobil uyumlu bir PWA (Progressive Web App) olarak çalışıyor. Telefonunun tarayıcısından ana ekrana ekleyerek uygulama gibi kullanabilir, çevrimdışı bile erişebilirsin." },
    },
    {
      "@type": "Question",
      name: "Ödeme yöntemleri nelerdir?",
      acceptedAnswer: { "@type": "Answer", text: "PayTR altyapısı ile kredi kartı, banka kartı ve havale/EFT ile ödeme yapabilirsin. Tüm ödemelerin SSL ile şifrelenmiş güvenli altyapıda gerçekleşir. İlk 7 gün koşulsuz iade garantisi vardır." },
    },
  ],
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />
      <Hero />
      <ToolMarquee />
      <SocialProof />
      <ProblemSection />
      <BookRoadmap />
      <Benefits />
      <HowItWorks />
      <PanelPreview />
      <GamificationShowcase />
      <Testimonials />
      <LeaderboardBlock />
      <EarningSection />
      <Certifications />
      <PlannerShowcase />
      <FAQ />
      <FounderOffer />
      <Footer />
      <SocialProofToast />
      <ScrollCTA />
    </main>
  );
}
