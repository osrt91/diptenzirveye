import type { Metadata } from "next";
import { outfit, dmSans, dmMono } from "@/lib/fonts";
import ThemeProvider from "@/components/ThemeProvider";
import { ToastProvider } from "@/components/ui/Toast";
import InstallPrompt from "@/components/InstallPrompt";
import FloatingCoach from "@/components/panel/core/FloatingCoach";
import TrackingScripts, { TrackingNoscript } from "@/components/TrackingScripts";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://diptenzirveye.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DiptenZirveye — AI Ustalık Serisi",
    template: "%s | DiptenZirveye",
  },
  description:
    "10 kitap. 1 platform. Sıfırdan liderliğe. Yapay zekayı sistematik kullanan kazanır.",
  keywords: [
    "AI",
    "yapay zeka",
    "prompt mühendisliği",
    "AI araçları",
    "kişisel gelişim",
    "e-öğrenme",
    "DiptenZirveye",
  ],
  authors: [{ name: "DiptenZirveye" }],
  creator: "DiptenZirveye",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteUrl,
    siteName: "DiptenZirveye",
    title: "DiptenZirveye — AI Ustalık Serisi",
    description:
      "10 kitap. 1 platform. Sıfırdan liderliğe. Yapay zekayı sistematik kullanan kazanır.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "DiptenZirveye — AI Ustalık Serisi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DiptenZirveye — AI Ustalık Serisi",
    description:
      "10 kitap. 1 platform. Sıfırdan liderliğe. Yapay zekayı sistematik kullanan kazanır.",
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${outfit.variable} ${dmSans.variable} ${dmMono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="preconnect" href="https://bcelltvotdqqhkqbcuib.supabase.co" />
        <link rel="dns-prefetch" href="https://bcelltvotdqqhkqbcuib.supabase.co" />
        <meta name="theme-color" content="#f97316" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0a0a0c" media="(prefers-color-scheme: dark)" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="DiptenZirveye" />
        <link rel="apple-touch-icon" href="/icons/icon-192.svg" />

        {/* Dynamic tracking scripts from admin settings */}
        <TrackingScripts />

        {/* Theme detection + Service Worker registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("dz-theme");if(t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme:dark)").matches))document.documentElement.classList.add("dark")}catch(e){}})();if("serviceWorker"in navigator)window.addEventListener("load",function(){navigator.serviceWorker.register("/sw.js")})`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "DiptenZirveye",
              url: "https://diptenzirveye.com",
              description: "10 kitap. 1 platform. Sıfırdan liderliğe.",
              publisher: { "@type": "Organization", name: "DiptenZirveye" },
              potentialAction: {
                "@type": "SearchAction",
                target: "https://diptenzirveye.com/blog?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className="antialiased font-sans bg-background text-foreground min-h-screen flex flex-col">
        {/* GTM noscript fallback */}
        <TrackingNoscript />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-dz-orange-500 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold focus:shadow-lg"
        >
          İçeriğe Atla
        </a>
        <ThemeProvider>
          <ToastProvider>
            <main id="main-content" className="flex-1 flex flex-col">
              {children}
            </main>
            <InstallPrompt />
            <FloatingCoach
              chatbotEnabled={true}
              welcomeMessage="Selam! Bugün sana özel bir şey var — platformdaki 500+ Prompt'tan hangisini denemek istersin? Ya da AI seviyeni test edelim!"
            />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
