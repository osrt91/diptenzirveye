# DiptenZirveye — Test Sprint Checklist
**Tarih:** 11 Mart 2026
**Ortam:** https://diptenzirveye.com (Production)

---

## 1. LANDING PAGE (Anasayfa)

- [ ] Anasayfa yükleniyor mu? (https://diptenzirveye.com)
- [ ] Dark/Light tema geçişi çalışıyor mu?
- [ ] Mobil responsive görünüm (telefon, tablet)
- [ ] Hero bölümü CTA butonları doğru yönlendiriyor mu?
- [ ] Kitap yol haritası (BookRoadmap) kaydırılabiliyor mu?
- [ ] Fiyatlandırma kartları görünüyor mu?
- [ ] FAQ açılır-kapanır çalışıyor mu?
- [ ] Footer linkleri doğru mu?
- [ ] PWA install prompt çıkıyor mu? (mobilde)
- [ ] "İçeriğe Atla" accessibility linki çalışıyor mu?

## 2. SEO & META

- [ ] Anasayfa `<title>`: "DiptenZirveye — AI Ustalık Serisi"
- [ ] OG image yükleniyor mu? (/og-image.png)
- [ ] JSON-LD WebSite schema var mı? (sayfa kaynağında kontrol)
- [ ] FAQPage JSON-LD var mı?
- [ ] robots.txt erişilebilir mi? (/robots.txt)
- [ ] sitemap.xml erişilebilir mi? (/sitemap.xml)
- [ ] Blog yazısı OG image'ı var mı?

## 3. AUTH (Kimlik Doğrulama)

### 3a. Admin Girişi
- [ ] bilgi@diptenzirveye.com / 123123 ile giriş yap
- [ ] Otomatik /admin paneline yönlendiriliyor mu?
- [ ] /panel adresine gitmeye çalışınca /admin'e dönüyor mu?

### 3b. Danışman Girişi
- [ ] test@diptenzirveye.com / 123123 ile giriş yap
- [ ] Otomatik /panel'e yönlendiriliyor mu?
- [ ] /admin adresine gitmeye çalışınca /panel'e dönüyor mu?

### 3c. Kayıt Ol
- [ ] Yeni kullanıcı kayıt formu çalışıyor mu?
- [ ] E-posta doğrulama maili gidiyor mu?
- [ ] Google OAuth butonu çalışıyor mu?

### 3d. Şifre Sıfırlama
- [ ] /sifremi-unuttum sayfası açılıyor mu?
- [ ] E-posta gönderimi çalışıyor mu?

## 4. ADMIN PANELİ (/admin)

- [ ] Genel Bakış dashboard yükleniyor mu?
- [ ] Kullanıcılar listesi görünüyor mu?
- [ ] Kitaplar yönetimi çalışıyor mu?
- [ ] Rozetler sayfası açılıyor mu?
- [ ] Mesajlar sayfası açılıyor mu?
- [ ] Raporlar sayfası açılıyor mu?
- [ ] Promptlar yönetimi çalışıyor mu?
- [ ] Blog Yazıları CRUD çalışıyor mu?
- [ ] Kuponlar oluşturma/silme çalışıyor mu?
- [ ] Yorumlar (testimonials) yönetimi çalışıyor mu?
- [ ] **Site Ayarları** sayfası açılıyor mu?
  - [ ] Analitik kategorisi (GA, GTM, Clarity, FB Pixel, TikTok) görünüyor mu?
  - [ ] SEO kategorisi (Google verification, FB domain) görünüyor mu?
  - [ ] Güvenlik kategorisi (reCAPTCHA) görünüyor mu?
  - [ ] Chatbot kategorisi (enabled, welcome message, system prompt) görünüyor mu?
  - [ ] Bir ayarı değiştirip "Kaydet" → "Kaydedildi" feedback'i geliyor mu?
  - [ ] Secret alanlar gizli gösteriliyor mu? (göz ikonu ile toggle)

## 5. DANIŞMAN / KULLANICI PANELİ (/panel)

### 5a. Dashboard
- [ ] Panel ana sayfası yükleniyor mu?
- [ ] XP, Level, Streak bilgileri görünüyor mu?
- [ ] DZ Coin bakiyesi sidebar'da görünüyor mu?
- [ ] Günlük Prompt Challenge kartı var mı?

### 5b. Modüller
- [ ] Kütüphane (kitap listesi) açılıyor mu?
- [ ] Kitap okuma sayfası çalışıyor mu?
- [ ] Sohbet (AI chat) açılıyor mu?
- [ ] Prompt Hub açılıyor mu? (kategoriler, arama)
- [ ] Çalışma Kağıtları listesi var mı?
- [ ] Nexus Protokolü çalışıyor mu?
- [ ] Momentum Spectrum radar çizelgesi çiziliyor mu?
- [ ] Pomodoro zamanlayıcı çalışıyor mu?
- [ ] Erteleme Modülü (3 tab) açılıyor mu?
- [ ] Proje Planlayıcı açılıyor mu?
- [ ] Not Defteri CRUD çalışıyor mu?
- [ ] Öğrenme Yolu sayfası açılıyor mu?
- [ ] Rozetler grid'i görünüyor mu?
- [ ] Sertifika sayfası açılıyor mu?
- [ ] Sıralama (leaderboard) yükleniyor mu?
- [ ] Profil sayfası düzenlenebiliyor mu?
- [ ] Coin Shop açılıyor mu?

### 5c. AI Chatbot (FloatingCoach)
- [ ] Sağ alt köşede turuncu bot butonu görünüyor mu?
- [ ] Tıklanınca chatbot penceresi açılıyor mu?
- [ ] "AI Danışman" başlığı doğru mu?
- [ ] Karşılama mesajı gösteriliyor mu?
- [ ] Mesaj yazıp gönderilince yanıt geliyor mu? (GOOGLE_API_KEY gerekli)
- [ ] API key yoksa fallback mesajı gösteriliyor mu?

## 6. BLOG

- [ ] /blog sayfası açılıyor mu?
- [ ] Blog yazıları listeleniyor mu?
- [ ] Tek yazı sayfası (/blog/[slug]) açılıyor mu?
- [ ] Yazı meta bilgileri (title, description, OG) doğru mu?

## 7. DİĞER SAYFALAR

- [ ] /fiyatlar sayfası açılıyor mu?
- [ ] /iletisim sayfası açılıyor mu?
- [ ] /gizlilik sayfası açılıyor mu?
- [ ] /kosullar sayfası açılıyor mu?
- [ ] /kvkk sayfası açılıyor mu?
- [ ] /test akışı çalışıyor mu? (6 soru → AI analiz → sonuç)

## 8. MOBİL UYUMLULUK

- [ ] Anasayfa mobilde düzgün görünüyor mu?
- [ ] Navbar hamburger menü çalışıyor mu?
- [ ] Panel sidebar mobilde açılıp kapanıyor mu?
- [ ] Admin sidebar mobilde çalışıyor mu?
- [ ] Butonlar min 44px touch target'a sahip mi?
- [ ] Chatbot mobilde düzgün pozisyonlanıyor mu?

## 9. PERFORMANS

- [ ] Lighthouse skoru (mobil): Performance > 70
- [ ] Lighthouse skoru (mobil): Accessibility > 85
- [ ] Lighthouse skoru (mobil): Best Practices > 85
- [ ] Lighthouse skoru (mobil): SEO > 90
- [ ] İlk sayfa yükleme < 3 saniye
- [ ] TTFB < 800ms

## 10. GÜVENLİK

- [ ] CSP header'ı mevcut mu? (Content-Security-Policy)
- [ ] X-Frame-Options: DENY var mı?
- [ ] HSTS header'ı var mı?
- [ ] X-Content-Type-Options: nosniff var mı?
- [ ] HTTPS zorunlu mu? (HTTP → HTTPS redirect)
- [ ] Admin API'leri yetkisiz erişime kapalı mı? (403 dönmeli)

---

## KNOWN ISSUES (Bilinen Eksikler)

| Sorun | Etki | Çözüm |
|-------|------|-------|
| GOOGLE_API_KEY yok | AI Coach, Learning Path, Test Analysis çalışmaz | Vercel env'e ekle |
| PAYTR credentials yok | Ödeme sistemi çalışmaz | PayTR'den al, Vercel env'e ekle |
| Google OAuth redirect | Production'da OAuth çalışmayabilir | Google Console'da redirect URI güncelle |
| Supabase Auth URL | Mail linkleri yanlış URL'ye gidebilir | Supabase Dashboard → Auth → URL Configuration |
| Firebase | Entegre değil | Gerekirse eklenecek |
| Google Merchant Center | Entegre değil | Gerekirse eklenecek |

---

**Sprint Durumu:** HAZIR (Test edilmeye hazır)
**Son Deploy:** 11 Mart 2026
**Production URL:** https://diptenzirveye.com
