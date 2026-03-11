import { createClient } from "@/lib/supabase/server";

export type SiteSetting = {
  key: string;
  value: string;
  label: string;
  category: string;
  is_secret: boolean;
  updated_at: string;
};

const settingsCache: { data: Map<string, string> | null; ts: number } = { data: null, ts: 0 };
const CACHE_TTL = 60_000; // 1 minute

export async function getSettings(): Promise<Map<string, string>> {
  if (settingsCache.data && Date.now() - settingsCache.ts < CACHE_TTL) {
    return settingsCache.data;
  }

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("site_settings")
      .select("key, value")
      .eq("is_secret", false);

    const map = new Map<string, string>();
    if (data) {
      for (const row of data) {
        if (row.value) map.set(row.key, row.value);
      }
    }

    settingsCache.data = map;
    settingsCache.ts = Date.now();
    return map;
  } catch {
    return settingsCache.data ?? new Map();
  }
}

export async function getSetting(key: string): Promise<string> {
  const settings = await getSettings();
  return settings.get(key) ?? "";
}

export async function getTrackingScripts(): Promise<{
  gaId: string;
  gtmId: string;
  clarityId: string;
  fbPixelId: string;
  tiktokPixelId: string;
  googleVerification: string;
  fbDomainVerification: string;
  recaptchaSiteKey: string;
  chatbotEnabled: boolean;
  chatbotWelcomeMessage: string;
}> {
  const s = await getSettings();
  return {
    gaId: s.get("ga_id") ?? process.env.NEXT_PUBLIC_GA_ID ?? "",
    gtmId: s.get("gtm_id") ?? process.env.NEXT_PUBLIC_GTM_ID ?? "",
    clarityId: s.get("clarity_id") ?? process.env.NEXT_PUBLIC_CLARITY_ID ?? "",
    fbPixelId: s.get("fb_pixel_id") ?? process.env.NEXT_PUBLIC_FB_PIXEL_ID ?? "",
    tiktokPixelId: s.get("tiktok_pixel_id") ?? process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID ?? "",
    googleVerification: s.get("google_site_verification") ?? process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
    fbDomainVerification: s.get("fb_domain_verification") ?? process.env.NEXT_PUBLIC_FACEBOOK_DOMAIN_VERIFICATION ?? "",
    recaptchaSiteKey: s.get("recaptcha_site_key") ?? process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "",
    chatbotEnabled: (s.get("chatbot_enabled") ?? "true") === "true",
    chatbotWelcomeMessage: s.get("chatbot_welcome_message") ?? "Merhaba! Ben DiptenZirveye AI Danışmanın. Sana nasıl yardımcı olabilirim?",
  };
}
