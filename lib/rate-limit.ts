/**
 * Basit IP bazlı rate limiter (bellek içi).
 * Production'da çok instance kullanıyorsanız Upstash Redis / Vercel KV ile değiştirin.
 */
const store = new Map<
  string,
  { count: number; resetAt: number }
>();

const WINDOW_MS = 15 * 60 * 1000; // 15 dakika
const MAX_ATTEMPTS = 10; // 15 dk içinde max giriş/kayıt denemesi

export function checkAuthRateLimit(ip: string): { ok: boolean; retryAfter?: number } {
  const now = Date.now();
  const entry = store.get(ip);

  if (!entry) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true };
  }

  if (now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true };
  }

  if (entry.count >= MAX_ATTEMPTS) {
    return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }

  entry.count += 1;
  return { ok: true };
}

const WAITLIST_WINDOW_MS = 15 * 60 * 1000; // 15 dakika
const WAITLIST_MAX = 5; // 15 dk içinde max 5 kayıt

export function checkWaitlistRateLimit(ip: string): { ok: boolean; retryAfter?: number } {
  const now = Date.now();
  const key = `waitlist:${ip}`;
  const entry = store.get(key);

  if (!entry) {
    store.set(key, { count: 1, resetAt: now + WAITLIST_WINDOW_MS });
    return { ok: true };
  }

  if (now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + WAITLIST_WINDOW_MS });
    return { ok: true };
  }

  if (entry.count >= WAITLIST_MAX) {
    return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }

  entry.count += 1;
  return { ok: true };
}
