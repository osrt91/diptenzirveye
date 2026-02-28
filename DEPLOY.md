# DiptenZirveye — Deploy

## 0. Deploy kaydı (kayıtlı kalsın)

- **Kod:** Tüm değişiklikler GitHub `main` branch’ine push edildiğinde kayıtlıdır.
- **Canlı sürüm:** Vercel projesi GitHub’a bağlıysa her push sonrası otomatik production deploy yapılır.
- **Manuel deploy (isteğe bağlı):** Proje kökünde `diptenzirveye` klasörü içindeyken:
  ```bash
  npx vercel login
  npx vercel --prod --yes
  ```
  (`--yes` sormadan deploy eder; ilk seferde link için `npx vercel link` gerekebilir.)

## 1. Vercel’e deploy

**GitHub ile:** Vercel → Add New Project → repoyu seç → **Root Directory:** `diptenzirveye` (iç klasör).

**CLI ile:**
```bash
cd diptenzirveye
npx vercel login
npx vercel --prod
```
Environment Variables’ı Vercel Dashboard’dan ekleyin.

## 2. Ortam değişkenleri (Vercel)

| Değişken | Açıklama |
|----------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase proje URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role (webhook/admin) |
| `NEXT_PUBLIC_SITE_URL` | Canlı site URL (örn. https://diptenzirveye.com) |
| `NEXT_PUBLIC_BASE_URL` | Genelde `NEXT_PUBLIC_SITE_URL` ile aynı |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `POLAR_ACCESS_TOKEN`, `POLAR_WEBHOOK_SECRET`, `POLAR_ORGANIZATION_ID` | Polar abonelik (varsa) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics (isteğe bağlı) |
| `PAYTR_MERCHANT_ID`, `PAYTR_MERCHANT_KEY`, `PAYTR_MERCHANT_SALT` | PayTR (isteğe bağlı) |

## 3. Deploy sonrası

**Supabase:** Authentication → URL Configuration → Site URL ve Redirect URLs’i canlı domain ile güncelle (`https://yourdomain.com`, `https://*.vercel.app/**`).

**Polar:** Webhooks → Webhook URL: `https://yourdomain.com/api/webhook/polar`; secret’ı `POLAR_WEBHOOK_SECRET` ile aynı yap.

## 4. Kontrol listesi

- [ ] Vercel’e deploy (Root Directory: `diptenzirveye`)
- [ ] Tüm env değişkenleri Vercel’de tanımlandı
- [ ] Supabase Site URL ve Redirect URLs güncellendi
- [ ] Polar webhook URL canlı domain ile güncellendi
- [ ] Canlıda giriş/kayıt ve panel test edildi

## 5. Güvenlik (özet)

- E-posta doğrulama: Supabase → Authentication → Email → Confirm email açık.
- Panel yalnızca doğrulanmış e-postalara açık; doğrulanmamayanlar `/onay-bekliyor`’a yönlendirilir.
- Rate limiting: Giriş/kayıt IP başına sınırlı (`lib/rate-limit.ts`). Çok instance’da Upstash Redis / Vercel KV kullanın.
- Güvenlik başlıkları: `next.config.ts` içinde X-Frame-Options, X-Content-Type-Options vb. ayarlı.
