const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

let recaptchaLoaded = false;

export function loadRecaptcha(): Promise<void> {
  if (recaptchaLoaded || !RECAPTCHA_SITE_KEY) return Promise.resolve();

  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.onload = () => {
      recaptchaLoaded = true;
      resolve();
    };
    document.head.appendChild(script);
  });
}

export async function getRecaptchaToken(action: string): Promise<string> {
  if (!RECAPTCHA_SITE_KEY) return "";

  if (!recaptchaLoaded) await loadRecaptcha();

  return new Promise((resolve) => {
    (window as unknown as { grecaptcha: { ready: (cb: () => void) => void; execute: (key: string, opts: { action: string }) => Promise<string> } }).grecaptcha.ready(async () => {
      const token = await (window as unknown as { grecaptcha: { execute: (key: string, opts: { action: string }) => Promise<string> } }).grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
      resolve(token);
    });
  });
}

export async function verifyRecaptchaToken(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey || !token) return true; // skip if not configured

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${secretKey}&response=${token}`,
  });

  const data = await res.json();
  return data.success && (data.score ?? 1) >= 0.5;
}
