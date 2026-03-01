# Kalan İşler — Güncel Özet

Bu dosya, Vercel / deploy ve yakın dönem kalan işleri listeler. Detaylı liste için `KALAN-ISLER.md` dosyasına bakın.

---

## Yapılanlar (Bu oturumda)

| İş | Durum |
|----|--------|
| Türkçe karakter düzeltmeleri (lib/schemas.ts, lib/action-handler.ts) | ✅ Tamamlandı |
| GitHub'a push (commit: Turkce karakter hatalarini duzelt) | ✅ Tamamlandı |
| Eski Vercel hesabından tüm projeler kaldırıldı | ✅ Tamamlandı |
| Vercel CLI logout (eski hesaptan çıkış) | ✅ Tamamlandı |

---

## Kalan İşler

### 1. Yeni Vercel hesabı — Proje kurulumu

- [ ] Yeni Vercel hesabında **Add New Project** → **Import** `osrt91/OGUZHAN-SERT`
- [ ] **Root Directory:** `diptenzirveye` olarak ayarla
- [ ] **Environment Variables** ekle (Production + Preview):
  - `NEXT_PUBLIC_SITE_URL`
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `POLAR_ACCESS_TOKEN`
  - `POLAR_WEBHOOK_SECRET`
- [ ] **Deploy** tetikle

### 2. Domain ve Supabase

- [ ] Custom domain: `diptenzirveye.com` yeni Vercel projesine bağla (DNS / Vercel Domain ayarları)
- [ ] Supabase: **Site URL** ve **Redirect URLs** içinde canlı domain’i ekle/güncelle

### 3. Polar (ödeme)

- [ ] Polar webhook URL’ini canlı ortam domain’ine göre güncelle

### 4. Mobil (isteğe bağlı)

- [ ] Android Studio ile APK build (JDK 17+, Capacitor hazır)
- [ ] Play Store / App Store için listing hazırlığı

---

## Notlar

- Local build başarılı: `npm run build` (63 sayfa, 0 hata).
- Eski Vercel hesabında build kotası dolduğu için projeler kaldırıldı; yeni hesapta temiz kota kullanılacak.
- Türkçe karakter düzeltmeleri GitHub’da; yeni Vercel’e ilk deploy’da otomatik gelecek.

---

*Son güncelleme: 1 Mart 2026*
