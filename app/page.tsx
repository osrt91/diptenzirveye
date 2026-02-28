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

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
