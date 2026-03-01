# DiptenZirveye — Deploy Kılavuzu

> **Domain:** `diptenzirveye.com` | **Region:** `fra1` (Frankfurt) | **Framework:** Next.js 16

---

## 0. Deploy kaydı

- **Kod:** GitHub `main` branch'ine push edildiğinde kayıtlıdır.
- **Canlı sürüm:** Vercel projesi GitHub'a bağlıysa her push sonrası otomatik production deploy yapılır.
- **Manuel deploy:**
  ```bash
  cd diptenzirveye
  npx vercel login
  npx vercel --prod --yes
  ```

---

## 1. Vercel'e Deploy

### GitHub ile (önerilen)
1. [vercel.com/new](https://vercel.com/new) → GitHub reposunu seç
2. **Root Directory:** `diptenzirveye`
3. Framework: Next.js (otomatik algılanır)
4. Deploy

### CLI ile
```bash
cd diptenzirveye
npx vercel login
npx vercel link        # ilk seferde
npx vercel --prod
```

---

## 2. Vercel Ortam Değişkenleri

Vercel Dashboard → Project → Settings → Environment Variables

| Değişken | Değer | Zorunlu |
|----------|-------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://bcelltvotdqqhkqbcuib.supabase.co` | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | ✅ |
| `NEXT_PUBLIC_SITE_URL` | `https://diptenzirveye.com` | ✅ |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google OAuth Client ID | ✅ |
| `POLAR_ACCESS_TOKEN` | Polar access token | ✅ |
| `POLAR_WEBHOOK_SECRET` | Polar webhook secret | ✅ |
| `POLAR_ORGANIZATION_ID` | Polar org ID | İsteğe bağlı |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID (`G-XXXXXXXXXX`) | İsteğe bağlı |

---

## 3. Custom Domain Ayarı

### Vercel tarafı
1. Vercel Dashboard → Project → Settings → **Domains**
2. `diptenzirveye.com` ekle
3. `www.diptenzirveye.com` ekle (→ `diptenzirveye.com`'a redirect)
4. Vercel'in verdiği DNS kayıtlarını not al

### DNS tarafı (domain sağlayıcınızda)
| Tip | Ad | Değer |
|-----|-----|-------|
| A | `@` | `76.76.21.21` (Vercel) |
| CNAME | `www` | `cname.vercel-dns.com` |

> SSL sertifikası Vercel tarafından otomatik sağlanır.

---

## 4. Supabase Konfigürasyonu

### 4a. Site URL
1. [Supabase Dashboard](https://supabase.com/dashboard) → Projeniz → Authentication → URL Configuration
2. **Site URL:** `https://diptenzirveye.com`

### 4b. Redirect URLs
Aynı sayfada "Redirect URLs" bölümüne şunları ekleyin:

```
https://diptenzirveye.com/auth/callback
https://www.diptenzirveye.com/auth/callback
https://*.vercel.app/auth/callback
```

### 4c. Google OAuth (Supabase tarafı)
1. Authentication → Providers → Google
2. Client ID ve Client Secret doğru olmalı

### 4d. Google Cloud Console
1. [Google Cloud Console](https://console.cloud.google.com) → APIs & Services → Credentials
2. OAuth 2.0 Client → Authorized redirect URIs:
   ```
   https://bcelltvotdqqhkqbcuib.supabase.co/auth/v1/callback
   ```
3. Authorized JavaScript origins:
   ```
   https://diptenzirveye.com
   https://www.diptenzirveye.com
   ```

### 4e. Facebook OAuth (varsa)
1. [Meta Developers](https://developers.facebook.com) → App → Facebook Login → Settings
2. Valid OAuth Redirect URIs:
   ```
   https://bcelltvotdqqhkqbcuib.supabase.co/auth/v1/callback
   ```

---

## 5. Polar Konfigürasyonu

### Webhook URL
1. [Polar Dashboard](https://polar.sh) → Settings → Webhooks
2. **Endpoint URL:** `https://diptenzirveye.com/api/webhook/polar`
3. **Secret:** `.env.local` deki `POLAR_WEBHOOK_SECRET` ile aynı
4. **Events:** `order.paid`, `subscription.active`, `subscription.canceled`

### Kontrol
- Checkout route'ta `server` otomatik olarak `production` moduna geçer (`NODE_ENV === "production"`)
- Sandbox token değil, production token kullanıldığından emin olun

---

## 6. Deploy Kontrol Listesi

### Vercel
- [ ] Vercel'e deploy edildi (Root Directory: `diptenzirveye`)
- [ ] Tüm env değişkenleri Vercel'de tanımlandı
- [ ] `NEXT_PUBLIC_SITE_URL` = `https://diptenzirveye.com`
- [ ] Custom domain eklendi (`diptenzirveye.com` + `www`)
- [ ] DNS kayıtları domain sağlayıcıda tanımlandı
- [ ] SSL sertifikası aktif (Vercel otomatik)

### Supabase
- [ ] Site URL: `https://diptenzirveye.com`
- [ ] Redirect URLs eklendi (3 adet)
- [ ] Google OAuth provider ayarları doğru
- [ ] E-posta doğrulama (Confirm email) açık

### Google Cloud Console
- [ ] Authorized redirect URI: `https://bcelltvotdqqhkqbcuib.supabase.co/auth/v1/callback`
- [ ] Authorized JavaScript origins: `https://diptenzirveye.com`

### Polar
- [ ] Webhook URL: `https://diptenzirveye.com/api/webhook/polar`
- [ ] Webhook secret eşleşiyor
- [ ] Production token kullanılıyor (sandbox değil)

### Canlı Test
- [ ] Ana sayfa yükleniyor
- [ ] E-posta ile kayıt çalışıyor
- [ ] E-posta doğrulama linki çalışıyor
- [ ] Google OAuth çalışıyor
- [ ] Panel erişimi çalışıyor
- [ ] Admin panel erişimi çalışıyor
- [ ] Polar checkout çalışıyor
- [ ] Polar webhook tetikleniyor

---

## 7. Proxy (Auth Koruması — Next.js 16)

Root `proxy.ts` dosyası tüm sayfa isteklerinde çalışır (Next.js 16'da `middleware.ts` yerine `proxy.ts` kullanılır):

- Auth oturumunu otomatik yeniler
- `/panel/*` ve `/admin/*` giriş yapmamış kullanıcıları `/giris`'e yönlendirir
- E-posta doğrulanmamış kullanıcıları `/onay-bekliyor`'a yönlendirir
- Giriş yapmış kullanıcıları auth sayfalarından `/panel`'e yönlendirir

---

## 8. Güvenlik

- **E-posta doğrulama:** Supabase → Authentication → Email → Confirm email açık
- **Rate limiting:** `lib/rate-limit.ts` — IP başına sınırlı (prod'da Upstash Redis / Vercel KV önerilir)
- **Güvenlik başlıkları:** `next.config.ts` — X-Frame-Options, CSP, HSTS, X-Content-Type-Options
- **Proxy koruması:** `proxy.ts` — korumalı rotalar için auth kontrolü (Next.js 16)

---

*Son güncelleme: 28 Şubat 2026*
