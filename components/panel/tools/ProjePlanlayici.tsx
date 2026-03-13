"use client";

import { useState, useEffect, useRef } from "react";

/* DİPTENZİRVEYE — Proje Başlangıç & Analiz Rehberi */

type TechChoices = {
  frontend: string;
  backend: string;
  database: string;
  styling: string;
  deploy: string;
  [key: string]: string;
};

type PlannerState = {
  mode: string;
  userLevel: number;
  projectName: string;
  projectType: string;
  projectDesc: string;
  audienceType: string;
  audienceSize: string;
  audienceTech: string;
  selectedFeatures: string[];
  techChoices: TechChoices;
  archPattern: string;
  checkedItems: string[];
  existingDesc: string;
  existingTech: string[];
  existingProblems: string[];
};

type RecItem = { tool: string; why: string; priority?: string };
type FixItem = { text: string; fix: string; priority?: string };
type WarningItem = { text: string; fix: string };
type Recs = { use: RecItem[]; avoid: RecItem[]; warnings: WarningItem[]; fixes: FixItem[]; tips: string[] };

// ─── DATA ────────────────────────────────────────────

const STEPS_NEW = [
  { id: "welcome", title: "Başlangıç", tag: "00" },
  { id: "level", title: "Senin Seviyen", tag: "01" },
  { id: "vision", title: "Proje Vizyonu", tag: "02" },
  { id: "audience", title: "Hedef Kitle", tag: "03" },
  { id: "features", title: "Özellikler", tag: "04" },
  { id: "techstack", title: "Teknoloji Seçimi", tag: "05" },
  { id: "architecture", title: "Mimari", tag: "06" },
  { id: "checklist", title: "Kontrol Listesi", tag: "07" },
  { id: "report", title: "Zirve Raporu", tag: "08" },
];

const STEPS_EXISTING = [
  { id: "welcome", title: "Başlangıç", tag: "00" },
  { id: "level", title: "Senin Seviyen", tag: "01" },
  { id: "existing", title: "Mevcut Projen", tag: "02" },
  { id: "problems", title: "Sorunlar", tag: "03" },
  { id: "report", title: "Zirve Raporu", tag: "04" },
];

const TECH_OPTIONS = {
  frontend: [
    { name: "Next.js 14", desc: "React fullstack, SSR/SSG, App Router", best: "Hızlı, SEO uyumlu", level: "Orta", levelMin: 1 },
    { name: "React + Vite", desc: "SPA, hızlı build, esnek yapı", best: "Dashboard, panel projeleri", level: "Başlangıç", levelMin: 0 },
    { name: "Astro", desc: "İçerik odaklı, partial hydration", best: "Blog, portfolio, statik site", level: "Başlangıç", levelMin: 0 },
    { name: "SvelteKit", desc: "Minimal boilerplate, derlemeli", best: "Performans öncelikli", level: "Orta", levelMin: 1 },
    { name: "Nuxt (Vue)", desc: "Vue tabanlı meta-framework", best: "Vue sevenler için", level: "Orta", levelMin: 1 },
  ],
  backend: [
    { name: "Supabase", desc: "PostgreSQL + Auth + Realtime + Storage", best: "Hızlı backend, BaaS, MVP", level: "Başlangıç", levelMin: 0 },
    { name: "Node.js + Express", desc: "Klasik REST API", best: "Özel API, tam kontrol", level: "Orta", levelMin: 1 },
    { name: "Next.js API Routes", desc: "Server Actions, Route Handlers", best: "Fullstack tek projede", level: "Orta", levelMin: 1 },
    { name: "Python + FastAPI", desc: "Hızlı, async, tip güvenli", best: "AI/ML, veri işleme", level: "Orta", levelMin: 1 },
    { name: "Firebase", desc: "Google BaaS, NoSQL", best: "Mobil, realtime", level: "Başlangıç", levelMin: 0 },
  ],
  database: [
    { name: "PostgreSQL", desc: "Güçlü ilişkisel DB", best: "Karmaşık veri ilişkileri", level: "Orta", levelMin: 1 },
    { name: "Supabase (Postgres)", desc: "Yönetilen PostgreSQL", best: "Hızlı kurulum, UI dahil", level: "Başlangıç", levelMin: 0 },
    { name: "MongoDB", desc: "NoSQL, belge tabanlı", best: "Esnek şema, hızlı prototip", level: "Başlangıç", levelMin: 0 },
    { name: "PlanetScale", desc: "Serverless MySQL", best: "Ölçeklenebilir", level: "Orta", levelMin: 1 },
  ],
  styling: [
    { name: "Tailwind CSS", desc: "Utility-first CSS", best: "Hızlı, tutarlı", level: "Başlangıç", levelMin: 0 },
    { name: "Shadcn/UI", desc: "Tailwind + Radix bileşenleri", best: "Profesyonel UI kiti", level: "Başlangıç", levelMin: 0 },
    { name: "CSS Modules", desc: "Scoped CSS", best: "İzole stiller", level: "Başlangıç", levelMin: 0 },
    { name: "Styled Components", desc: "CSS-in-JS", best: "Dinamik stiller", level: "Orta", levelMin: 1 },
  ],
  deploy: [
    { name: "Vercel", desc: "Next.js için en iyi", best: "Otomatik deploy", level: "Başlangıç", levelMin: 0 },
    { name: "Railway", desc: "Fullstack deploy", best: "Backend + DB bir arada", level: "Başlangıç", levelMin: 0 },
    { name: "Netlify", desc: "Statik + serverless", best: "Jamstack projeleri", level: "Başlangıç", levelMin: 0 },
    { name: "AWS / GCP", desc: "Bulut altyapısı", best: "Enterprise, tam kontrol", level: "İleri", levelMin: 2 },
  ],
};

const FEATURE_CATS = [
  { cat: "Kimlik & Güvenlik", items: ["Kullanıcı kayıt/giriş (Auth)", "Sosyal giriş (Google, GitHub)", "Rol bazlı yetkilendirme", "İki faktörlü doğrulama (2FA)", "Şifre sıfırlama"] },
  { cat: "Veri & İçerik", items: ["Veritabanı (CRUD işlemleri)", "Dosya yükleme / depolama", "Arama ve filtreleme", "Sayfalama (Pagination)", "Gerçek zamanlı veri (Realtime)"] },
  { cat: "UI & Deneyim", items: ["Responsive tasarım (mobil uyumlu)", "Karanlık/Aydınlık tema", "Çoklu dil desteği (i18n)", "Animasyonlar ve geçişler", "Bildirimler (Toast/Alert)"] },
  { cat: "Entegrasyon", items: ["Ödeme sistemi (Stripe/iyzico)", "E-posta gönderimi", "3. parti API entegrasyonu", "Webhook bağlantıları", "AI / LLM entegrasyonu"] },
  { cat: "Yönetim", items: ["Admin paneli / Dashboard", "Analitik ve raporlama", "CMS (İçerik yönetimi)", "Log ve hata takibi", "Kullanıcı geri bildirimi"] },
];

const CHECKLIST = [
  { section: "Planlama", items: [
    { text: "Proje amacı ve hedefleri belirlendi", tip: "Tek cümlede projenin ne yaptığını yaz" },
    { text: "Hedef kitle belirlendi", tip: "Kim kullanacak? Yaş, meslek, teknik seviye" },
    { text: "Rakip analizi yapıldı", tip: "Benzer 3-5 ürün incele" },
    { text: "MVP özellikleri belirlendi", tip: "Sadece temel özellikler" },
    { text: "Wireframe / taslak çizildi", tip: "Kağıt üzerinde bile olsa akışları çiz" },
  ]},
  { section: "Teknik Hazırlık", items: [
    { text: "Tech stack seçimi yapıldı", tip: "Frontend + Backend + DB + Deploy" },
    { text: "Klasör yapısı oluşturuldu", tip: "src/, components/, lib/, api/" },
    { text: "Git repository açıldı", tip: "GitHub/GitLab + .gitignore" },
    { text: "Geliştirme ortamı kuruldu", tip: "VS Code veya Cursor IDE" },
    { text: ".env dosyası planlandı", tip: "API key'ler, DB URL, secret'lar" },
  ]},
  { section: "Tasarım", items: [
    { text: "Renk paleti seçildi", tip: "Ana renk + vurgu + nötr tonlar" },
    { text: "UI kütüphanesi seçildi", tip: "Shadcn/UI, Radix, MUI" },
    { text: "Navigasyon planlandı", tip: "Header, sidebar, routing" },
    { text: "Responsive breakpoint'ler belirlendi", tip: "640px / 768px / 1024px" },
  ]},
  { section: "Backend", items: [
    { text: "Veritabanı şemaları tasarlandı", tip: "Tablolar, ilişkiler, tipler" },
    { text: "API endpoint'ler listelendi", tip: "GET /users, POST /auth/login" },
    { text: "Auth yöntemi seçildi", tip: "JWT, Session, OAuth" },
    { text: "Hata yönetimi planlandı", tip: "Try-catch, error boundary" },
  ]},
  { section: "Yayınlama", items: [
    { text: "Platform seçildi", tip: "Vercel, Railway, Netlify" },
    { text: "Domain bağlandı", tip: "Cloudflare, Namecheap" },
    { text: "HTTPS aktif", tip: "Çoğu platform otomatik sağlar" },
  ]},
];

const ARCH = [
  { name: "Monolith (Tek Parça)", desc: "Tüm kod tek projede.", best: "MVP, küçük projeler", risk: "Büyüdükçe zorlaşır", lvl: 0 },
  { name: "Fullstack Meta-Framework", desc: "Next.js/Nuxt ile her şey tek yerde.", best: "Çoğu modern proje", risk: "Vendor lock-in", lvl: 0 },
  { name: "Frontend + BaaS", desc: "React + Supabase/Firebase.", best: "Hızlı prototip, vibe coding", risk: "BaaS limitleri", lvl: 0 },
  { name: "Microservices", desc: "Bağımsız servisler.", best: "Büyük ekipler", risk: "DevOps karmaşıklığı", lvl: 2 },
  { name: "Jamstack", desc: "Statik + Headless CMS + API.", best: "Blog, e-ticaret", risk: "Dinamik özellikler zor", lvl: 1 },
];

const EXISTING_PROBLEMS = [
  { id: "slow", label: "Site / uygulama yavaş", cat: "Performans" },
  { id: "messy_code", label: "Kod karmaşık, düzensiz", cat: "Kod Kalitesi" },
  { id: "no_mobile", label: "Mobil uyumlu değil", cat: "UI/UX" },
  { id: "no_auth", label: "Giriş/kayıt sistemi yok veya sorunlu", cat: "Güvenlik" },
  { id: "no_deploy", label: "Canlıya alamıyorum (deploy sorunu)", cat: "DevOps" },
  { id: "no_db", label: "Veritabanı bağlantısı sorunlu", cat: "Backend" },
  { id: "ugly_ui", label: "Tasarım kötü/tutarsız görünüyor", cat: "UI/UX" },
  { id: "no_seo", label: "Google'da çıkmıyor (SEO sorunu)", cat: "SEO" },
  { id: "security", label: "Güvenlik endişem var", cat: "Güvenlik" },
  { id: "error_handling", label: "Hatalar düzgün yönetilmiyor", cat: "Kod Kalitesi" },
  { id: "no_testing", label: "Test yazmadım", cat: "Kod Kalitesi" },
  { id: "api_issues", label: "API entegrasyonu çalışmıyor", cat: "Backend" },
  { id: "scaling", label: "Kullanıcı artınca sorun çıkıyor", cat: "Performans" },
  { id: "confused", label: "Ne yapacağımı bilmiyorum, kayboldum", cat: "Planlama" },
];

// ─── SMART ENGINE ────────────────────────────────────

function generateRecs(a: PlannerState): Recs {
  const { projectType, audienceType, audienceTech, selectedFeatures, techChoices, archPattern, userLevel, mode, existingTech, existingProblems, existingDesc } = a;
  const use: RecItem[] = [], avoid: RecItem[] = [], warnings: WarningItem[] = [], fixes: FixItem[] = [], tips: string[] = [];
  const lvl = userLevel || 0;

  // ─── MEVCUT PROJE ANALİZİ ─────────
  if (mode === "existing") {
    const desc = (existingDesc || "").toLowerCase();
    const tech = existingTech || [];
    const probs = existingProblems || [];

    // Teknoloji bazlı öneriler
    if (tech.includes("html_css")) {
      if (lvl === 0) {
        use.push({ tool: "Tailwind CSS", why: "CSS yazmayı 10x hızlandırır, class bazlı çalışır", priority: "kritik" });
        use.push({ tool: "Bir CSS framework öğren", why: "Saf CSS ile büyük proje yönetmek çok zor", priority: "kritik" });
        avoid.push({ tool: "Saf CSS ile devam etmek", why: "Büyüdükçe yönetilemez, Tailwind'e geç" });
      }
      if (!tech.includes("react") && !tech.includes("vue")) {
        use.push({ tool: "React veya Vue öğren", why: "Component bazlı düşünmek projeyi organize eder", priority: "yüksek" });
        avoid.push({ tool: "Sadece HTML dosyaları ile büyük proje", why: "Tekrar eden kodlar, bakım kabusa döner" });
      }
    }
    if (tech.includes("react") && !tech.includes("nextjs")) {
      use.push({ tool: "Next.js'e geçiş düşün", why: "React'ın üstüne SSR, routing, API routes ekler", priority: "yüksek" });
    }
    if (tech.includes("nextjs")) {
      use.push({ tool: "App Router (Next.js 14)", why: "Pages Router eskidi, App Router yeni standart", priority: "yüksek" });
      use.push({ tool: "Server Components", why: "Client-side JS'i azaltır, performans artar", priority: "orta" });
    }
    if (tech.includes("wordpress")) {
      if (desc.includes("yavaş") || probs.includes("slow")) {
        fixes.push({ text: "WordPress'in yavaşlık sorunu", fix: "Hosting'i Cloudflare veya WP Engine'e taşı, cache plugin ekle", priority: "kritik" });
      }
      use.push({ tool: "Headless WordPress + Next.js", why: "WordPress'i sadece CMS olarak kullan, frontend'i Next.js yap", priority: "orta" });
      avoid.push({ tool: "Daha fazla WordPress plugin eklemek", why: "Her plugin siteyi yavaşlatır ve güvenlik riski oluşturur" });
    }
    if (tech.includes("jquery")) {
      fixes.push({ text: "jQuery kullanımı 2026'da modası geçmiş", fix: "React veya Vue'ya geçiş planla, jQuery'yi kademeli kaldır", priority: "yüksek" });
      avoid.push({ tool: "Yeni jQuery kodu yazmak", why: "Modern framework'ler her şeyi daha iyi yapıyor" });
    }
    if (tech.includes("php") && !tech.includes("wordpress")) {
      use.push({ tool: "Laravel (PHP devam edeceksen)", why: "Modern PHP framework, MVC yapısı", priority: "orta" });
      use.push({ tool: "Veya Node.js/Next.js'e geçiş", why: "JavaScript ekosistemi daha geniş, iş imkanı fazla", priority: "orta" });
    }
    if (tech.includes("firebase")) {
      use.push({ tool: "Firestore Security Rules", why: "Güvenlik kurallarını mutlaka tanımla", priority: "kritik" });
      if (probs.includes("scaling")) {
        fixes.push({ text: "Firebase maliyeti kullanıcı artınca patlıyor", fix: "Sorgu optimizasyonu yap, gereksiz read'leri azalt", priority: "yüksek" });
      }
    }
    if (tech.includes("supabase")) {
      use.push({ tool: "Row Level Security (RLS)", why: "Veritabanı düzeyinde güvenlik, mutlaka aç", priority: "kritik" });
      use.push({ tool: "Supabase Edge Functions", why: "Serverless backend mantığı için", priority: "orta" });
    }

    // Sorun bazlı çözümler
    if (probs.includes("slow")) {
      fixes.push({ text: "Performans sorunu", fix: "Chrome DevTools → Lighthouse testi yap, skorları gör", priority: "kritik" });
      use.push({ tool: "Lazy loading (resimler + bileşenler)", why: "Sayfa yüklenme süresini dramatik azaltır", priority: "kritik" });
      use.push({ tool: "Image Optimization (next/image veya Cloudinary)", why: "Büyük resimler en yaygın yavaşlık sebebi", priority: "kritik" });
      avoid.push({ tool: "Optimize edilmemiş resim yüklemek", why: "5MB'lık PNG yerine WebP kullan, boyutu 90% azalır" });
    }
    if (probs.includes("messy_code")) {
      fixes.push({ text: "Düzensiz kod yapısı", fix: "ESLint + Prettier kur, otomatik formatlama aç", priority: "kritik" });
      use.push({ tool: "ESLint + Prettier", why: "Kodu otomatik düzenler, tutarlılık sağlar", priority: "kritik" });
      use.push({ tool: "Component bazlı yapı", why: "Her UI parçasını ayrı dosyaya böl", priority: "yüksek" });
      tips.push("Dosya başına 100 satırı geçme kuralı koy — büyük dosyaları parçala");
    }
    if (probs.includes("no_mobile")) {
      fixes.push({ text: "Mobil uyumsuzluk", fix: "Tailwind CSS'in responsive class'larını kullan: sm:, md:, lg:", priority: "kritik" });
      use.push({ tool: "Mobile-first tasarım yaklaşımı", why: "Önce mobil yap, sonra büyüt — tersi çok zor", priority: "kritik" });
      avoid.push({ tool: "Sabit piksel genişlikleri (width: 1200px)", why: "Responsive bozulur, % veya max-width kullan" });
    }
    if (probs.includes("no_auth")) {
      fixes.push({ text: "Auth sistemi eksik/sorunlu", fix: "Supabase Auth veya NextAuth.js kur, kendi yazmaya çalışma", priority: "kritik" });
      use.push({ tool: "Supabase Auth veya Clerk", why: "Hazır auth çözümleri, sosyal giriş dahil", priority: "kritik" });
      avoid.push({ tool: "Kendi auth sistemi yazmak", why: "Güvenlik açıkları kaçınılmaz, hazır çözüm kullan" });
    }
    if (probs.includes("no_deploy")) {
      fixes.push({ text: "Deploy yapamıyorum", fix: "Vercel'e GitHub repo'nu bağla → otomatik deploy", priority: "kritik" });
      use.push({ tool: "Vercel veya Railway", why: "Git push = otomatik canlıya alma, ücretsiz başlangıç", priority: "kritik" });
      avoid.push({ tool: "FTP ile dosya yüklemek", why: "2026'da kabul edilemez, CI/CD kullan" });
      tips.push("Adım: 1) GitHub'a push et 2) Vercel.com'da 'Import Project' 3) Bitti!");
    }
    if (probs.includes("no_db")) {
      fixes.push({ text: "Veritabanı bağlantı sorunu", fix: ".env dosyasında DATABASE_URL doğru mu kontrol et", priority: "kritik" });
      if (lvl === 0) {
        use.push({ tool: "Supabase (görsel DB yönetimi)", why: "Tablo oluşturmak için SQL bilmene gerek yok, UI var", priority: "kritik" });
      }
      tips.push(".env dosyasını .gitignore'a eklemeyi unutma — API key'ler GitHub'da görünmesin!");
    }
    if (probs.includes("ugly_ui")) {
      fixes.push({ text: "Tutarsız / kötü tasarım", fix: "Shadcn/UI kur, hazır bileşenleri kullan — her şey otomatik güzel", priority: "yüksek" });
      use.push({ tool: "Shadcn/UI + Tailwind CSS", why: "Profesyonel UI anında, kopyala-yapıştır", priority: "kritik" });
      use.push({ tool: "Bir renk paleti seç ve sadece onu kullan", why: "3-4 renk yeterli, fazlası karmaşa yaratır", priority: "yüksek" });
      avoid.push({ tool: "Rastgele renkler ve fontlar karıştırmak", why: "Tutarsızlığın #1 sebebi" });
    }
    if (probs.includes("no_seo")) {
      fixes.push({ text: "SEO sorunu", fix: "Next.js + metadata API kullan, her sayfaya title/description ekle", priority: "yüksek" });
      use.push({ tool: "Next.js Metadata API", why: "Her sayfanın title, description, og:image'ını tanımla", priority: "yüksek" });
      use.push({ tool: "Google Search Console", why: "Ücretsiz, sitenin Google'daki durumunu gösterir", priority: "yüksek" });
      avoid.push({ tool: "Client-side rendering (SPA) SEO için", why: "Google bot JS'i iyi render edemez, SSR şart" });
    }
    if (probs.includes("security")) {
      fixes.push({ text: "Güvenlik endişesi", fix: "Snyk veya Semgrep ile kodu tara, açıkları bul", priority: "kritik" });
      use.push({ tool: "Snyk / Semgrep", why: "Otomatik güvenlik taraması, ücretsiz planları var", priority: "kritik" });
      use.push({ tool: "HTTPS (SSL)", why: "Şifreli bağlantı olmazsa olmaz", priority: "kritik" });
      avoid.push({ tool: "API key'leri frontend kodunda tutmak", why: "Herkes görebilir — .env + backend'de sakla" });
      avoid.push({ tool: "AI kodunu review'sız yayına almak", why: "%24.7 güvenlik açığı riski" });
    }
    if (probs.includes("error_handling")) {
      fixes.push({ text: "Hata yönetimi eksik", fix: "Try-catch blokları + Error Boundary + toast bildirimler", priority: "yüksek" });
      use.push({ tool: "Sentry", why: "Production hatalarını otomatik yakalar ve bildirir", priority: "yüksek" });
      use.push({ tool: "React Error Boundary", why: "Bir bileşen çökünce tüm sayfa çökmez", priority: "yüksek" });
    }
    if (probs.includes("confused")) {
      fixes.push({ text: "Kaybolmuş hissediyorsun", fix: "Bu normal! Şu sırayı takip et: 1) Tek özellik seç 2) O özelliği bitir 3) Sonraki", priority: "kritik" });
      tips.push("Bir seferde tek şeye odaklan. Todo list yap, en önemli 3 şeyi yaz, sadece onlara bak.");
      tips.push("Cursor IDE veya Claude kullanarak 'bu dosyayı açıkla' de — kodu anlamak kolaylaşır.");
    }
    if (probs.includes("no_testing")) {
      if (lvl === 0) {
        tips.push("Acemi seviyede test yazmak önceliğin olmasın — önce çalışan ürün, sonra test.");
      } else {
        use.push({ tool: "Vitest + React Testing Library", why: "Hızlı, basit test altyapısı", priority: "orta" });
      }
    }
    if (probs.includes("api_issues")) {
      fixes.push({ text: "API entegrasyon sorunu", fix: "Postman veya Thunder Client ile API'yi önce izole test et", priority: "yüksek" });
      use.push({ tool: "Postman / Insomnia", why: "API'yi tarayıcı dışında test etmek sorunları hızlı bulur", priority: "yüksek" });
      tips.push("Console.log ile response'u yazdır — 401 ise token sorunu, 500 ise backend sorunu, 404 ise URL yanlış.");
    }

    // Genel mevcut proje önerileri
    use.push({ tool: "TypeScript", why: "Hataları kod yazarken yakalar, refactor kolaylaşır", priority: lvl === 0 ? "orta" : "kritik" });
    use.push({ tool: "Git + GitHub", why: "Her değişikliği kaydet, geri alabilmelisin", priority: "kritik" });

    if (lvl === 0) {
      tips.push("Cursor IDE kullan — AI ile kod yazarken yanında bir mentor gibi çalışır.");
      tips.push("Her gün 1 saat bile olsa çalış, tutarlılık hızdan önemli.");
    }
  }

  // ─── YENİ PROJE ANALİZİ ─────────
  if (mode === "new") {
    if (techChoices.frontend === "Next.js 14") {
      use.push({ tool: "Vercel", why: "Next.js'in resmi platformu, sıfır ayar", priority: "kritik" });
      use.push({ tool: "Server Actions", why: "API yazmadan form işlemleri", priority: "yüksek" });
      if (techChoices.deploy && !["Vercel", "Railway"].includes(techChoices.deploy)) {
        warnings.push({ text: `Next.js için ${techChoices.deploy} uyumsuz`, fix: "Vercel'e geç" });
      }
      avoid.push({ tool: "Express.js (ayrı backend)", why: "Next.js API Routes zaten var" });
    }
    if (techChoices.frontend === "Astro") {
      avoid.push({ tool: "Redux / Zustand", why: "Astro statik site, state yönetimi gereksiz" });
      use.push({ tool: "Astro Islands", why: "Sadece interaktif yerlerde JS yükle", priority: "yüksek" });
    }
    if (techChoices.backend === "Supabase") {
      use.push({ tool: "Supabase Auth", why: "Hazır auth, sosyal giriş dahil", priority: "kritik" });
      use.push({ tool: "Row Level Security (RLS)", why: "DB düzeyinde güvenlik, mutlaka aç", priority: "kritik" });
      avoid.push({ tool: "Kendi Auth yazmak", why: "Supabase Auth hazır, riskini azalt" });
      avoid.push({ tool: "MongoDB (ayrı)", why: "Supabase zaten PostgreSQL içeriyor" });
    }
    if (techChoices.styling === "Tailwind CSS") {
      use.push({ tool: "Shadcn/UI", why: "Tailwind ile uyumlu hazır bileşenler", priority: "yüksek" });
      avoid.push({ tool: "Bootstrap", why: "Tailwind ile karıştırmak çakışma yaratır" });
      avoid.push({ tool: "Inline style", why: "Tailwind varken tutarsızlık yaratır" });
    }

    if (projectType === "E-Ticaret") {
      use.push({ tool: "Stripe veya iyzico", why: "Güvenli ödeme, PCI uyumlu", priority: "kritik" });
      avoid.push({ tool: "Kendi ödeme sistemi yazmak", why: "PCI riski, güvenlik açığı" });
    }
    if (projectType === "SaaS Uygulama") {
      use.push({ tool: "Stripe Subscriptions", why: "Abonelik yönetimi", priority: "yüksek" });
      use.push({ tool: "Resend / Loops", why: "Transactional e-posta", priority: "orta" });
    }
    if (projectType === "Dashboard / Panel") {
      use.push({ tool: "Recharts / Tremor", why: "React grafik kütüphaneleri", priority: "yüksek" });
      use.push({ tool: "TanStack Table", why: "Güçlü tablo bileşeni", priority: "yüksek" });
    }
    if (projectType === "Landing Page") {
      use.push({ tool: "Framer Motion", why: "Etkileyici animasyonlar", priority: "orta" });
      avoid.push({ tool: "Karmaşık backend", why: "Form için Formspree yeter" });
    }
    if (audienceTech === "Teknik değil") {
      use.push({ tool: "Onboarding akışı", why: "Teknik olmayan kullanıcılar rehberlik ister", priority: "yüksek" });
      avoid.push({ tool: "UI'da teknik jargon", why: "'Deploy' yerine 'Yayınla' yaz" });
    }
    if (selectedFeatures.includes("AI / LLM entegrasyonu")) {
      use.push({ tool: "Vercel AI SDK + Claude API", why: "Streaming, structured output", priority: "yüksek" });
      avoid.push({ tool: "API key'i frontend'de tutmak", why: "Güvenlik açığı" });
    }
    if (selectedFeatures.length > 12) {
      warnings.push({ text: `${selectedFeatures.length} özellik — MVP için fazla`, fix: "5-7 özelliğe düşür" });
    }
    if (archPattern === "Microservices" && lvl < 2) {
      warnings.push({ text: "Microservices senin seviyen için karmaşık", fix: "Monolith veya Meta-Framework yeterli" });
    }

    // Seviye bazlı genel
    use.push({ tool: "TypeScript", why: "2026 standardı, tip güvenliği", priority: lvl === 0 ? "orta" : "kritik" });
    use.push({ tool: "Git + GitHub", why: "Versiyon kontrolü şart", priority: "kritik" });
    use.push({ tool: "ESLint + Prettier", why: "Otomatik kod düzeni", priority: "yüksek" });
    use.push({ tool: "Snyk / Semgrep", why: "Güvenlik taraması", priority: "yüksek" });
    avoid.push({ tool: "jQuery", why: "2026'da modası geçti" });
    avoid.push({ tool: "FTP deploy", why: "CI/CD kullan" });
    avoid.push({ tool: "AI kodunu review'sız yayınlamak", why: "%24.7 güvenlik açığı" });

    if (lvl === 0) {
      tips.push("Cursor IDE ile başla — AI kodlama asistanı, acemiler için ideal.");
      tips.push("Önce küçük bir proje yap (todo app), sonra büyük projeye geç.");
    }
  }

  // Genel ipuçları (her iki mod için de)
  if (tips.length === 0) {
    tips.push("Bu raporu bir AI asistanına (Claude, ChatGPT) yapıştırarak detaylı yol haritası isteyebilirsin.");
    if (lvl <= 1) {
      tips.push("Projeye başlamadan önce README.md dosyası yaz — amacı, kurulumu ve kullanımı açıkla.");
    }
    tips.push("Her hafta projenin durumunu değerlendir — küçük adımlar büyük sonuçlar yaratır.");
  }

  const seen = new Set<string>();
  const dedup = (arr: RecItem[]) => arr.filter((x) => { if (seen.has(x.tool)) return false; seen.add(x.tool); return true; });

  return { use: dedup(use), avoid: dedup(avoid), warnings, fixes, tips };
}

// ─── COMPONENT ───────────────────────────────────────

export default function ProjePlanlayici() {
  const [step, setStep] = useState(0);
  const [a, setA] = useState<PlannerState>({
    mode: "", userLevel: 0, projectName: "", projectType: "", projectDesc: "",
    audienceType: "", audienceSize: "", audienceTech: "",
    selectedFeatures: [], techChoices: { frontend: "", backend: "", database: "", styling: "", deploy: "" },
    archPattern: "", checkedItems: [],
    existingDesc: "", existingTech: [], existingProblems: [],
  });
  const [expTip, setExpTip] = useState<string | null>(null);
  const [rTab, setRTab] = useState("fixes");
  const ref = useRef<HTMLDivElement>(null);

  const STEPS = a.mode === "existing" ? STEPS_EXISTING : STEPS_NEW;
  useEffect(() => { ref.current?.scrollTo({ top: 0, behavior: "smooth" }); }, [step]);

  // Reset report tab to the first available tab when reaching the report step
  useEffect(() => {
    if (STEPS[step]?.id === "report") {
      const firstTab = a.mode === "existing" ? "fixes" : "use";
      setRTab(firstTab);
    }
  }, [step, a.mode, STEPS]);

  const set = (k: keyof PlannerState, v: string | number | string[] | TechChoices) => setA((p) => ({ ...p, [k]: v }));
  const toggleArr = (k: "selectedFeatures" | "checkedItems" | "existingTech" | "existingProblems", v: string) => { const s = a[k]; set(k, s.includes(v) ? s.filter((x) => x !== v) : [...s, v]); };

  const progress = Math.round((step / (STEPS.length - 1)) * 100);
  const totalC = CHECKLIST.reduce((x, s) => x + s.items.length, 0);
  const doneC = a.checkedItems.length;
  const recs = generateRecs(a);

  const C = (active: boolean, opts?: { col?: boolean }): string => {
    const base = `flex ${opts?.col ? "flex-col items-start gap-0.5 p-3" : "items-center justify-center px-4 py-2.5"} rounded-lg text-[13px] cursor-pointer font-sans transition-all border-none text-left`;
    return active
      ? `${base} font-bold bg-dz-orange-500 text-white shadow-lg shadow-dz-orange-500/30`
      : `${base} font-medium bg-dz-grey-100 dark:bg-dz-grey-800 text-dz-grey-600 dark:text-dz-grey-300 hover:bg-dz-grey-200 dark:hover:bg-dz-grey-700`;
  };
  const inpCls = "w-full min-w-0 px-3.5 py-2.5 rounded-lg border-[1.5px] border-dz-grey-200 dark:border-dz-grey-700 text-sm font-sans outline-none mb-4 bg-dz-white dark:bg-dz-grey-900 text-dz-black dark:text-dz-white focus:border-dz-orange-500 transition-colors overflow-hidden text-ellipsis";
  const H2 = ({ t, d }: { t: string; d: string }) => (<><h2 className="text-2xl font-extrabold text-dz-black dark:text-dz-white font-display tracking-tight mb-1">{t}</h2><p className="text-sm text-dz-grey-500 dark:text-dz-grey-400 mb-5 font-sans leading-relaxed">{d}</p></>);
  const Lbl = ({ t }: { t: string }) => <div className="font-bold text-[11px] text-dz-grey-600 dark:text-dz-grey-400 mb-1.5 font-mono tracking-widest uppercase">{t}</div>;
  const Tip = ({ s, children }: { s: string; children: React.ReactNode }) => <div className="p-3 bg-dz-orange-500/10 dark:bg-dz-orange-500/5 rounded-lg border border-dz-orange-200 dark:border-dz-orange-500/20 border-l-[3px] border-l-dz-orange-500 text-[13px] text-dz-grey-700 dark:text-dz-grey-300 font-sans leading-relaxed mt-3.5"><strong className="text-dz-orange-600 dark:text-dz-orange-500">{s} </strong>{children}</div>;

  const priBadgeCls = (p: string) => {
    const m: Record<string, string> = {
      kritik: "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-300 dark:border-red-500/30",
      yüksek: "bg-orange-50 dark:bg-dz-orange-500/10 text-dz-orange-600 dark:text-dz-orange-400 border border-orange-200 dark:border-dz-orange-500/30",
      orta: "bg-dz-grey-100 dark:bg-dz-grey-800 text-dz-grey-600 dark:text-dz-grey-400 border border-dz-grey-200 dark:border-dz-grey-700",
    };
    return `text-[9px] px-2 py-0.5 rounded-full font-mono font-semibold tracking-wider uppercase shrink-0 ${m[p] || m.orta}`;
  };

  const InlineRecs = () => {
    if (a.mode !== "new" || recs.warnings.length === 0) return null;
    return (
      <div className="mt-4 p-3.5 bg-amber-50 dark:bg-amber-500/10 rounded-xl border border-orange-200 dark:border-dz-orange-500/30">
        <div className="font-display text-xs font-bold text-dz-orange-600 dark:text-dz-orange-400 uppercase tracking-wider mb-2">⚠ Anlık Uyarılar</div>
        {recs.warnings.map((w, i) => (
          <div key={i} className="text-[13px] text-orange-900 dark:text-orange-300 mb-1.5 font-sans">
            <strong>{w.text}</strong> → <span className="text-green-700 dark:text-green-400">{w.fix}</span>
          </div>
        ))}
      </div>
    );
  };

  // ─── STEPS ─────────────────────────────────────────

  const renderStep = () => {
    const sid = STEPS[step]?.id;

    if (sid === "welcome") return (
      <div className="text-center py-5">
        <div className="font-mono text-[10px] tracking-[.14em] uppercase text-dz-orange-500 border border-dz-orange-500/30 inline-block px-3.5 py-1 rounded-full mb-5">proje başlangıç & analiz rehberi · 2026</div>
        <div className="text-4xl font-display text-dz-black dark:text-dz-white tracking-tighter leading-none mb-1"><span className="font-black">Dipten</span><span className="font-normal text-dz-orange-500">Zirveye</span><sup className="text-sm text-dz-grey-400">™</sup></div>
        <div className="font-mono text-[10px] tracking-[.16em] uppercase text-dz-grey-500 mb-7">sistematik proje planlama</div>
        <p className="text-[15px] text-dz-grey-600 dark:text-dz-grey-400 max-w-[480px] mx-auto mb-8 leading-relaxed font-sans">Yeni bir projeye mi başlıyorsun, yoksa mevcut projeni mi düzeltmek istiyorsun? Sana özel <strong>KULLAN / KULLANMA</strong> raporu çıkaralım.</p>

        <div className="flex flex-col sm:flex-row gap-3.5 justify-center max-w-[500px] mx-auto">
          <button onClick={() => { set("mode", "new"); setStep(1); }} className="flex-1 p-5 rounded-xl border-2 border-dz-grey-200 dark:border-dz-grey-700 bg-dz-grey-50 dark:bg-dz-grey-900 text-left transition-all hover:border-dz-orange-400 cursor-pointer">
            <div className="text-[28px] mb-1.5">🚀</div>
            <div className="font-display text-base font-bold text-dz-black dark:text-dz-white mb-1">Yeni Proje</div>
            <div className="text-xs text-dz-grey-500 leading-relaxed">Sıfırdan başlıyorum, plan lazım</div>
          </button>
          <button onClick={() => { set("mode", "existing"); setStep(1); }} className="flex-1 p-5 rounded-xl border-2 border-dz-orange-500 bg-orange-50 dark:bg-dz-orange-500/10 text-left transition-all hover:bg-orange-100 dark:hover:bg-dz-orange-500/15 cursor-pointer">
            <div className="text-[28px] mb-1.5">🔧</div>
            <div className="font-display text-base font-bold text-dz-orange-600 dark:text-dz-orange-400 mb-1">Mevcut Proje</div>
            <div className="text-xs text-orange-900 dark:text-orange-300 leading-relaxed">Projem var, düzeltmek istiyorum</div>
          </button>
        </div>
      </div>
    );

    if (sid === "level") return (
      <div>
        <H2 t="Senin Seviyen" d="Öneriler seviyene göre kişiselleştirilecek. Dürüst ol!" />
        <div className="flex flex-col gap-2.5">
          {[
            { v: 0, t: "Acemi / Yeni Başlıyorum", d: "HTML/CSS öğreniyorum veya ilk projemi yapıyorum. Kod yazmak yeni.", icon: "🌱" },
            { v: 1, t: "Orta Seviye", d: "React/Next.js kullandım, birkaç proje yaptım ama hâlâ öğreniyorum.", icon: "🌿" },
            { v: 2, t: "İleri Seviye", d: "Üretimde çalışan projelerim var, mimari kararlar alabiliyorum.", icon: "🌳" },
          ].map(l => (
            <button key={l.v} onClick={() => set("userLevel", l.v)} className={`flex items-start gap-3.5 p-4 rounded-xl cursor-pointer text-left transition-all ${a.userLevel === l.v ? "border-2 border-dz-orange-500 bg-orange-50 dark:bg-dz-orange-500/10" : "border-[1.5px] border-dz-grey-200 dark:border-dz-grey-700 bg-dz-grey-50 dark:bg-dz-grey-900 hover:border-dz-orange-400"}`}>
              <span className="text-[28px] shrink-0">{l.icon}</span>
              <div>
                <div className={`font-bold text-[15px] font-display ${a.userLevel === l.v ? "text-dz-orange-600 dark:text-dz-orange-400" : "text-dz-black dark:text-dz-white"}`}>{l.t}</div>
                <div className="text-[13px] text-dz-grey-500 leading-relaxed mt-0.5">{l.d}</div>
              </div>
            </button>
          ))}
        </div>
        {a.userLevel === 0 && <Tip s="Acemi misin?">Harika! Bu rehber tam sana göre. Her adımda ne yapman gerektiğini basitçe anlatacağız.</Tip>}
      </div>
    );

    // ─── MEVCUT PROJE ADIMLARI ────────
    if (sid === "existing") return (
      <div>
        <H2 t="Mevcut Projen" d="Projende ne kullanıyorsun? Ne kadar çok bilgi verirsen o kadar iyi öneri alırsın." />
        <Lbl t="Projeyi kısaca anlat" />
        <textarea className={`${inpCls} min-h-[80px] max-h-[200px] resize-y overflow-auto`} placeholder="Örn: React ile bir e-ticaret sitesi yapıyorum, ödeme kısmı sorunlu, mobilde kötü görünüyor..." value={a.existingDesc} onChange={e => set("existingDesc", e.target.value)} />
        <Lbl t="Hangi teknolojileri kullanıyorsun?" />
        <div className="flex flex-wrap gap-1.5 mb-4 min-w-0">
          {[
            { v: "html_css", l: "HTML / CSS" }, { v: "javascript", l: "JavaScript" }, { v: "react", l: "React" }, { v: "nextjs", l: "Next.js" },
            { v: "vue", l: "Vue.js" }, { v: "svelte", l: "Svelte" }, { v: "typescript", l: "TypeScript" }, { v: "tailwind", l: "Tailwind CSS" },
            { v: "nodejs", l: "Node.js" }, { v: "python", l: "Python" }, { v: "php", l: "PHP" }, { v: "wordpress", l: "WordPress" },
            { v: "supabase", l: "Supabase" }, { v: "firebase", l: "Firebase" }, { v: "mongodb", l: "MongoDB" }, { v: "postgresql", l: "PostgreSQL" },
            { v: "jquery", l: "jQuery" }, { v: "bootstrap", l: "Bootstrap" },
          ].map(t => (
            <button key={t.v} onClick={() => toggleArr("existingTech", t.v)} className={`${C(a.existingTech.includes(t.v))} shrink-0`}>{t.l}</button>
          ))}
        </div>
      </div>
    );

    if (sid === "problems") return (
      <div>
        <H2 t="Sorunların Ne?" d="Projende yaşadığın sorunları seç. Birden fazla seçebilirsin." />
        <div className="flex flex-col gap-1.5">
          {EXISTING_PROBLEMS.map(p => {
            const sel = a.existingProblems.includes(p.id);
            return (
              <button key={p.id} onClick={() => toggleArr("existingProblems", p.id)} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left cursor-pointer transition-all ${sel ? "border-2 border-dz-orange-500 bg-orange-50 dark:bg-dz-orange-500/10" : "border-[1.5px] border-dz-grey-200 dark:border-dz-grey-700 bg-dz-grey-50 dark:bg-dz-grey-900 hover:border-dz-orange-400"}`}>
                <div className={`w-5 h-5 rounded shrink-0 flex items-center justify-center text-[13px] font-bold ${sel ? "bg-dz-orange-500 text-white" : "border-2 border-dz-grey-500"}`}>{sel ? "✓" : ""}</div>
                <div className="flex-1">
                  <div className={`font-semibold text-sm font-sans ${sel ? "text-dz-orange-600 dark:text-dz-orange-400" : "text-dz-black dark:text-dz-white"}`}>{p.label}</div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-dz-grey-100 dark:bg-dz-grey-800 text-dz-grey-500 font-mono font-medium">{p.cat}</span>
              </button>
            );
          })}
        </div>
        {a.existingProblems.length > 0 && <div className="mt-3.5 text-[13px] text-dz-orange-600 dark:text-dz-orange-400 font-mono">{a.existingProblems.length} sorun seçildi — raporda çözüm önerileri göreceksin</div>}
      </div>
    );

    // ─── YENİ PROJE ADIMLARI ──────────
    if (sid === "vision") return (
      <div>
        <H2 t="Proje Vizyonu" d="Büyük resmi çizelim." />
        <Lbl t="Proje Adı" /><input className={inpCls} placeholder="örn: TaskFlow, ShopEase..." value={a.projectName} onChange={e => set("projectName", e.target.value)} />
        <Lbl t="Proje Türü" />
        <div className="grid grid-cols-2 gap-1.5 mb-4 min-w-0">
          {["SaaS Uygulama", "E-Ticaret", "Portfolio / Blog", "Dashboard / Panel", "Mobil Uygulama", "Landing Page", "Sosyal Platform", "Diğer"].map(t => (
            <button key={t} onClick={() => set("projectType", t)} className={`${C(a.projectType === t)} truncate`}>{t}</button>
          ))}
        </div>
        <Lbl t="Tek cümlede anlat" />
        <textarea className={`${inpCls} min-h-[70px] max-h-[200px] resize-y overflow-auto`} placeholder="Freelancer'ların projelerini yönettiği bir SaaS uygulaması..." value={a.projectDesc} onChange={e => set("projectDesc", e.target.value)} />
        <InlineRecs />
      </div>
    );

    if (sid === "audience") return (
      <div>
        <H2 t="Hedef Kitle" d="Kim kullanacak?" />
        <Lbl t="Kullanıcı Tipi" />
        <div className="grid grid-cols-2 gap-1.5 mb-4 min-w-0">
          {[{ v: "B2C", d: "Son kullanıcı" }, { v: "B2B", d: "Şirketler" }, { v: "Dahili", d: "Kendi ekibin" }, { v: "Geliştirici", d: "Teknik kullanıcılar" }].map(t => (
            <button key={t.v} onClick={() => set("audienceType", t.v)} className={C(a.audienceType === t.v, { col: true })}><span className="font-bold">{t.v}</span><span className="text-[11px] opacity-70 truncate max-w-full">{t.d}</span></button>
          ))}
        </div>
        <Lbl t="Beklenen Kullanıcı" />
        <div className="flex gap-1.5 mb-4 flex-wrap">
          {["1-50", "50-500", "500-5K", "5K+"].map(s => <button key={s} onClick={() => set("audienceSize", s)} className={C(a.audienceSize === s)}>{s}</button>)}
        </div>
        <Lbl t="Teknik Seviye" />
        <div className="flex gap-1.5 flex-wrap">
          {["Teknik değil", "Temel", "Orta", "Geliştirici"].map(s => <button key={s} onClick={() => set("audienceTech", s)} className={C(a.audienceTech === s)}>{s}</button>)}
        </div>
        <InlineRecs />
      </div>
    );

    if (sid === "features") return (
      <div>
        <H2 t="Özellik Seçimi" d="MVP için sadece olmazsa olmazları seç." />
        {a.selectedFeatures.length > 0 && <div className={`mb-3 px-3.5 py-1.5 rounded-lg text-xs font-mono border ${a.selectedFeatures.length > 10 ? "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border-red-300 dark:border-red-500/30" : "bg-orange-50 dark:bg-dz-orange-500/10 text-dz-orange-600 dark:text-dz-orange-400 border-orange-200 dark:border-dz-orange-500/30"}`}>{a.selectedFeatures.length} seçildi{a.selectedFeatures.length > 10 && " — MVP için çok fazla!"}</div>}
        {FEATURE_CATS.map(cat => (
          <div key={cat.cat} className="mb-4">
            <div className="font-bold text-[11px] text-dz-grey-600 dark:text-dz-grey-400 font-mono tracking-wider uppercase border-b border-dz-grey-200 dark:border-dz-grey-700 pb-1 mb-2">{cat.cat}</div>
            <div className="flex flex-wrap gap-1.5 min-w-0">{cat.items.map(i => <button key={i} onClick={() => toggleArr("selectedFeatures", i)} className={`${C(a.selectedFeatures.includes(i))} shrink-0`}>{i}</button>)}</div>
          </div>
        ))}
        <InlineRecs />
      </div>
    );

    if (sid === "techstack") return (
      <div>
        <H2 t="Teknoloji Seçimi" d="Her katman için en uygun aracı seç." />
        {Object.entries(TECH_OPTIONS).map(([cat, opts]) => {
          const names: Record<string, string> = { frontend: "Frontend", backend: "Backend", database: "Veritabanı", styling: "UI / Stil", deploy: "Yayınlama" };
          return (
            <div key={cat} className="mb-5">
              <Lbl t={names[cat]} />
              <div className="flex flex-col gap-1">
                {opts.map(o => {
                  const sel = a.techChoices[cat] === o.name;
                  const tooHard = o.levelMin > a.userLevel;
                  return (
                    <button key={o.name} onClick={() => !tooHard && setA(p => ({ ...p, techChoices: { ...p.techChoices, [cat]: o.name } }))} className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-left transition-all ${tooHard ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${sel ? "border-2 border-dz-orange-500 bg-orange-50 dark:bg-dz-orange-500/10" : "border-[1.5px] border-dz-grey-200 dark:border-dz-grey-700 bg-dz-grey-50 dark:bg-dz-grey-900 hover:border-dz-orange-400"}`}>
                      <div className={`w-4 h-4 rounded-full shrink-0 ${sel ? "border-[5px] border-dz-orange-500" : "border-2 border-dz-grey-500"}`} />
                      <div className="flex-1">
                        <div className={`font-bold text-[13px] font-sans ${sel ? "text-dz-orange-600 dark:text-dz-orange-400" : "text-dz-black dark:text-dz-white"}`}>{o.name} {tooHard && <span className="text-[10px] text-red-600">(seviyenin üstü)</span>}</div>
                        <div className="text-[11.5px] text-dz-grey-500">{o.desc}</div>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold ${o.level === "Başlangıç" ? "bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400" : o.level === "Orta" ? "bg-orange-50 dark:bg-dz-orange-500/10 text-dz-orange-600 dark:text-dz-orange-400" : "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400"}`}>{o.level}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
        <InlineRecs />
      </div>
    );

    if (sid === "architecture") return (
      <div>
        <H2 t="Mimari" d="Projenin genel yapısı." />
        <div className="flex flex-col gap-2">
          {ARCH.map(ar => {
            const sel = a.archPattern === ar.name;
            const hard = ar.lvl > a.userLevel;
            return (
              <button key={ar.name} onClick={() => !hard && set("archPattern", ar.name)} className={`text-left p-3.5 rounded-xl transition-all ${hard ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${sel ? "border-2 border-dz-orange-500 bg-orange-50 dark:bg-dz-orange-500/10" : "border-[1.5px] border-dz-grey-200 dark:border-dz-grey-700 bg-dz-grey-50 dark:bg-dz-grey-900 hover:border-dz-orange-400"}`}>
                <div className={`font-bold text-sm font-display mb-0.5 ${sel ? "text-dz-orange-600 dark:text-dz-orange-400" : "text-dz-black dark:text-dz-white"}`}>{ar.name} {hard && <span className="text-[10px] text-red-600">(ileri seviye)</span>}</div>
                <div className="text-xs text-dz-grey-500 mb-1.5">{ar.desc}</div>
                <div className="flex gap-3.5 text-[11px]">
                  <span className="text-green-700 dark:text-green-400 font-semibold">En iyi: {ar.best}</span>
                  <span className="text-red-600 dark:text-red-400 font-semibold">Risk: {ar.risk}</span>
                </div>
              </button>
            );
          })}
        </div>
        <InlineRecs />
      </div>
    );

    if (sid === "checklist") return (
      <div>
        <H2 t="Kontrol Listesi" d={`Başlamadan önce: ${doneC}/${totalC}`} />
        <div className="h-1.5 bg-dz-grey-200 dark:bg-dz-grey-700 rounded-full mb-5 overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-300 ${doneC === totalC ? "bg-green-500" : "bg-gradient-to-r from-dz-orange-500 to-amber-400"}`} style={{ width: `${(doneC / totalC) * 100}%` }} />
        </div>
        {CHECKLIST.map(sec => (
          <div key={sec.section} className="mb-4">
            <div className="font-bold text-[11px] text-dz-grey-600 dark:text-dz-grey-400 font-mono tracking-wider uppercase border-b border-dz-grey-200 dark:border-dz-grey-700 pb-1 mb-2">{sec.section}</div>
            {sec.items.map((it, i) => {
              const done = a.checkedItems.includes(it.text);
              const tk = `${sec.section}-${i}`;
              return (
                <div key={i} className="mb-1">
                  <div onClick={() => toggleArr("checkedItems", it.text)} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer ${done ? "bg-green-50 dark:bg-green-500/10 border border-green-300 dark:border-green-500/30" : "bg-dz-grey-100 dark:bg-dz-grey-800 border border-dz-grey-200 dark:border-dz-grey-700"}`}>
                    <div className={`w-[18px] h-[18px] rounded shrink-0 flex items-center justify-center text-xs font-bold ${done ? "bg-green-500 text-white" : "border-2 border-dz-grey-500"}`}>{done ? "✓" : ""}</div>
                    <span className={`flex-1 text-[13px] ${done ? "text-green-700 dark:text-green-400 line-through opacity-70" : "text-dz-grey-600 dark:text-dz-grey-400"}`}>{it.text}</span>
                    <button onClick={e => { e.stopPropagation(); setExpTip(expTip === tk ? null : tk); }} className="bg-transparent border-none cursor-pointer text-dz-grey-500 text-xs px-1">?</button>
                  </div>
                  {expTip === tk && <div className="ml-7 mt-1 px-3 py-1.5 bg-orange-50 dark:bg-dz-orange-500/10 rounded-md text-xs text-dz-orange-600 dark:text-dz-orange-400 border border-orange-200 dark:border-dz-orange-500/30">{it.tip}</div>}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );

    // ─── ZİRVE RAPORU ─────────────────
    if (sid === "report") {
      const isExisting = a.mode === "existing";
      const tabs = isExisting
        ? [{ id: "fixes", l: "🔧 Düzelt", c: recs.fixes.length }, { id: "use", l: "✓ Kullan", c: recs.use.length }, { id: "avoid", l: "✗ Kullanma", c: recs.avoid.length }, { id: "tips", l: "💡 İpuçları", c: recs.tips.length }]
        : [{ id: "use", l: "✓ Kullan", c: recs.use.length }, { id: "avoid", l: "✗ Kullanma", c: recs.avoid.length }, { id: "warnings", l: "⚠ Uyarılar", c: recs.warnings.length }, { id: "tips", l: "💡 İpuçları", c: recs.tips.length }];

      const activeTab = tabs.find(t => t.id === rTab) ? rTab : tabs[0].id;

      return (
        <div>
          <H2 t="Zirve Raporu" d={isExisting ? "Mevcut projendeki sorunların analizi ve çözüm önerileri." : "Seçimlerine göre kişiselleştirilmiş proje analizi."} />

          <div className={`grid gap-2 mb-4 ${tabs.length === 4 ? "grid-cols-4" : "grid-cols-3"}`}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setRTab(t.id)} className={`p-3 rounded-xl cursor-pointer text-center transition-all ${activeTab === t.id ? "border-2 border-dz-orange-500 bg-orange-50 dark:bg-dz-orange-500/10" : "border-[1.5px] border-dz-grey-200 dark:border-dz-grey-700 bg-dz-grey-50 dark:bg-dz-grey-900 hover:border-dz-orange-400"}`}>
                <div className={`text-[22px] font-extrabold font-display ${activeTab === t.id ? "text-dz-orange-500" : "text-dz-black dark:text-dz-white"}`}>{t.c}</div>
                <div className={`text-[11px] font-semibold font-sans truncate ${activeTab === t.id ? "text-dz-orange-600 dark:text-dz-orange-400" : "text-dz-grey-500"}`}>{t.l}</div>
              </button>
            ))}
          </div>

          {activeTab === "fixes" && (
            <div>
              <div className="p-3.5 bg-red-50 dark:bg-red-500/10 rounded-xl border border-red-300 dark:border-red-500/30 mb-3.5">
                <div className="font-display font-bold text-sm text-red-600 dark:text-red-400 mb-0.5">Önce Bunları Düzelt</div>
                <div className="text-xs text-red-900 dark:text-red-300">Seçtiğin sorunlara göre acil çözüm adımları.</div>
              </div>
              {recs.fixes.map((f, i) => (
                <div key={i} className="p-3.5 rounded-xl border border-dz-grey-200 dark:border-dz-grey-700 bg-dz-grey-50 dark:bg-dz-grey-900 mb-2">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-sm">🔧</span>
                    <span className="font-bold text-sm text-dz-black dark:text-dz-white font-sans flex-1">{f.text}</span>
                    {f.priority && <span className={priBadgeCls(f.priority)}>{f.priority}</span>}
                  </div>
                  <div className="text-[13px] text-green-700 dark:text-green-400 font-semibold font-sans px-3 py-2 bg-green-50 dark:bg-green-500/10 rounded-lg border border-green-300 dark:border-green-500/30">→ {f.fix}</div>
                </div>
              ))}
              {recs.fixes.length === 0 && <div className="text-center p-7 text-dz-grey-500">Sorun seçilmedi — önceki adıma dönüp sorunlarını seç.</div>}
            </div>
          )}

          {activeTab === "use" && (
            <div>
              <div className="p-3.5 bg-green-50 dark:bg-green-500/10 rounded-xl border border-green-300 dark:border-green-500/30 mb-3.5">
                <div className="font-display font-bold text-sm text-green-700 dark:text-green-400 mb-0.5">Projende Kullan</div>
                <div className="text-xs text-green-800 dark:text-green-300">Seçimlerine göre önerilen araç ve teknolojiler.</div>
              </div>
              {recs.use.length === 0 ? (
                <div className="text-center p-7 text-dz-grey-500">Önceki adımlarda seçim yaparak kişiselleştirilmiş öneriler al.</div>
              ) : recs.use.map((r, i) => (
                <div key={i} className={`flex gap-3 px-3.5 py-2.5 rounded-lg items-start mb-0.5 ${i % 2 === 0 ? "bg-dz-grey-50 dark:bg-dz-grey-900" : "bg-dz-grey-100 dark:bg-dz-grey-800"}`}>
                  <div className="w-[22px] h-[22px] rounded shrink-0 mt-0.5 bg-green-500 text-white flex items-center justify-center text-[13px] font-bold">✓</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-[13.5px] text-dz-black dark:text-dz-white">{r.tool}</div>
                    <div className="text-xs text-dz-grey-600 dark:text-dz-grey-400 leading-relaxed">{r.why}</div>
                  </div>
                  {r.priority && <span className={priBadgeCls(r.priority)}>{r.priority}</span>}
                </div>
              ))}
            </div>
          )}

          {activeTab === "avoid" && (
            <div>
              <div className="p-3.5 bg-red-50 dark:bg-red-500/10 rounded-xl border border-red-300 dark:border-red-500/30 mb-3.5">
                <div className="font-display font-bold text-sm text-red-600 dark:text-red-400 mb-0.5">Projende Kullanma</div>
                <div className="text-xs text-red-900 dark:text-red-300">Bu araçlar uyumsuz, modası geçmiş veya riskli.</div>
              </div>
              {recs.avoid.length === 0 ? (
                <div className="text-center p-7 text-dz-grey-500">Seçimlerine göre kaçınman gereken bir şey bulunamadı.</div>
              ) : recs.avoid.map((r, i) => (
                <div key={i} className={`flex gap-3 px-3.5 py-2.5 rounded-lg items-start mb-0.5 ${i % 2 === 0 ? "bg-dz-grey-50 dark:bg-dz-grey-900" : "bg-dz-grey-100 dark:bg-dz-grey-800"}`}>
                  <div className="w-[22px] h-[22px] rounded shrink-0 mt-0.5 bg-red-500 text-white flex items-center justify-center text-[13px] font-bold">✗</div>
                  <div className="min-w-0">
                    <div className="font-bold text-[13.5px] text-dz-black dark:text-dz-white">{r.tool}</div>
                    <div className="text-xs text-dz-grey-600 dark:text-dz-grey-400 leading-relaxed">{r.why}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "warnings" && (
            <div>
              {recs.warnings.length === 0 ? (
                <div className="text-center p-7 text-green-500 font-semibold text-[15px] font-sans">Seçimlerinde çakışma yok!</div>
              ) : recs.warnings.map((w, i) => (
                <div key={i} className="p-3.5 rounded-xl border border-orange-200 dark:border-dz-orange-500/30 bg-amber-50 dark:bg-amber-500/10 mb-2">
                  <div className="font-bold text-sm text-dz-orange-600 dark:text-dz-orange-400 mb-1">⚠ {w.text}</div>
                  <div className="text-[13px] text-green-700 dark:text-green-400 font-semibold px-2.5 py-1.5 bg-green-50 dark:bg-green-500/10 rounded-md">→ {w.fix}</div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "tips" && (
            <div>
              {recs.tips.length === 0 ? (
                <div className="text-center p-7 text-dz-grey-500">Daha fazla adım doldurdukça ipuçları burada belirecek.</div>
              ) : recs.tips.map((t, i) => (
                <div key={i} className="px-3.5 py-3 bg-orange-50 dark:bg-dz-orange-500/10 rounded-lg border border-orange-200 dark:border-dz-orange-500/30 text-[13px] text-orange-900 dark:text-orange-300 mb-1.5 leading-relaxed">💡 {t}</div>
              ))}
            </div>
          )}

          <Tip s="Sonraki Adım:">Bu raporu Claude'a veya Cursor IDE'ye yapıştır: &ldquo;Bu plana göre projemi düzenle / oluştur.&rdquo; KULLAN listesindeki araçları referans al.</Tip>
        </div>
      );
    }

    return null;
  };

  const isReport = STEPS[step]?.id === "report";

  return (
    <div className="flex h-[calc(100vh-4rem)] lg:h-[calc(100vh-1.5rem)] font-sans bg-background overflow-hidden -m-6">

      {/* Sidebar */}
      <div className="hidden md:flex w-56 bg-dz-grey-100 dark:bg-dz-grey-900 flex-col shrink-0 border-r border-dz-grey-200 dark:border-dz-grey-800">
        <div className="px-4 py-4 border-b border-dz-grey-200 dark:border-dz-grey-800">
          <div className="font-display text-sm font-bold tracking-wide text-dz-black dark:text-dz-white">
            <span className="font-black">Dipten</span><span className="font-normal text-dz-orange-500">Zirveye</span><sup className="text-[8px] text-dz-grey-400">™</sup>
          </div>
          <div className="font-mono text-[9px] tracking-widest uppercase text-dz-grey-500 mt-1">
            {a.mode === "existing" ? "proje analizi" : a.mode === "new" ? "yeni proje" : "proje planlayıcı"}
          </div>
        </div>
        <div className="flex-1 p-1.5 overflow-y-auto">
          {STEPS.map((s, i) => {
            const ac = step === i, dn = i < step;
            return (
              <button
                key={s.id + i}
                onClick={() => setStep(i)}
                className={`flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg text-[12.5px] font-medium text-left mb-0.5 transition-all border-l-[3px] ${
                  ac
                    ? "bg-dz-orange-500/15 text-dz-orange-500 font-bold border-dz-orange-500"
                    : dn
                    ? "text-dz-grey-600 dark:text-dz-grey-400 border-transparent hover:bg-dz-grey-200/50 dark:hover:bg-dz-grey-800/50"
                    : "text-dz-grey-500 border-transparent hover:bg-dz-grey-200/50 dark:hover:bg-dz-grey-800/50"
                }`}
              >
                <span className={`font-mono text-[10px] font-semibold min-w-[14px] ${ac ? "text-dz-orange-500" : dn ? "text-green-500" : "text-dz-grey-500"}`}>
                  {dn ? "✓" : s.tag}
                </span>
                {s.title}
              </button>
            );
          })}
        </div>
        <div className="px-3.5 py-3 border-t border-dz-grey-200 dark:border-dz-grey-800">
          <div className="font-mono text-[9px] tracking-widest uppercase text-dz-grey-500 mb-1.5">ilerleme</div>
          <div className="h-1 bg-dz-grey-200 dark:bg-dz-grey-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-dz-orange-500 to-dz-amber-400 rounded-full transition-all duration-400"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="font-mono text-[10px] text-dz-orange-500 text-right mt-1 font-semibold">{progress}%</div>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Mobile progress bar */}
        {step > 0 && (
          <div className="md:hidden px-4 pt-3 pb-1 bg-dz-white dark:bg-dz-grey-900 border-b border-dz-grey-200 dark:border-dz-grey-800">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-[10px] text-dz-grey-500 uppercase tracking-wider">
                {STEPS[step]?.title}
              </span>
              <span className="font-mono text-[10px] text-dz-orange-500 font-semibold">{progress}%</span>
            </div>
            <div className="h-1 bg-dz-grey-200 dark:bg-dz-grey-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-dz-orange-500 to-dz-amber-400 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
        <div ref={ref} className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 pb-20">
          <div className={`mx-auto ${isReport ? "max-w-4xl" : "max-w-xl"}`}>{renderStep()}</div>
        </div>
        {step > 0 && (
          <div className="px-4 sm:px-8 py-3 border-t border-dz-grey-200 dark:border-dz-grey-800 flex justify-between items-center bg-background/95 backdrop-blur-md">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              className="px-5 py-2 rounded-lg border-[1.5px] border-dz-grey-200 dark:border-dz-grey-700 bg-transparent text-sm font-semibold text-dz-grey-600 dark:text-dz-grey-300 hover:border-dz-orange-400 transition-colors"
            >
              ← Geri
            </button>
            <span className="font-mono text-[11px] text-dz-grey-400">{step}/{STEPS.length - 1}</span>
            {step < STEPS.length - 1 ? (
              <button
                onClick={() => setStep(Math.min(STEPS.length - 1, step + 1))}
                className="px-5 py-2 rounded-lg bg-dz-orange-500 hover:bg-dz-orange-600 text-sm font-bold text-white font-display tracking-wide shadow-lg shadow-dz-orange-500/25 transition-all"
              >
                Sonraki →
              </button>
            ) : (
              <button
                onClick={() => { setStep(0); setA(p => ({ ...p, mode: "" })); setRTab("fixes"); }}
                className="px-5 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-sm font-bold text-white font-display transition-colors"
              >
                Baştan Başla
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
