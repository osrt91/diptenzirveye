# DİPTENZİRVEYE™ — PART 7: DOPAMİN & PARA KAZANMA MOTORU

> **Versiyon:** 1.0 · **Tarih:** 22 Şubat 2026  
> **Kapsam:** Dopamin mühendisliği, davranış psikolojisi, gelir motoru, DZ Coin ekonomisi  
> **Hedef:** Kullanıcı her giriş yaptığında beyin "bir kez daha" desin — ve bu süreçte gerçek değer üretsin.

---

## İÇİNDEKİLER

1. [A. DOPAMİN MÜHENDİSLİĞİ TEMELLERİ](#a-dopamin-mühendisliği-temelleri)
2. [B. ÖDÜL ZAMANLAMA MATRİSİ](#b-ödül-zamanlama-matrisi)
3. [C. XP HESAPLAMA MOTORU](#c-xp-hesaplama-motoru)
4. [D. DZ COİN EKONOMİSİ (DERİN)](#d-dz-coin-ekonomisi-derin)
5. [E. PARA KAZANMA KANALLARI (DETAYLİ)](#e-para-kazanma-kanalları-detaylı)
6. [F. SEZONLUK ETKİNLİK SİSTEMİ](#f-sezonluk-etkinlik-sistemi)
7. [G. KULLANICI YOLCULUĞU SENARYOLARI](#g-kullanıcı-yolculuğu-senaryoları)
8. [H. ANTİ-SÖMÜRÜ SİSTEMİ](#h-anti-sömürü-sistemi)
9. [I. ANİMASYON & SES BLUEPRINT'İ](#i-animasyon--ses-blueprintı)
10. [J. PSİKOLOJİK HOOK DÖNGÜLERİ](#j-psikolojik-hook-döngüleri)

---

# A. DOPAMİN MÜHENDİSLİĞİ TEMELLERİ

---

## A.1 — Beynin Ödül Devresi

Dopamin salgılanması **ödülün kendisinde** değil, **ödül beklentisinde** zirve yapar. Platform tasarımı bu bilimsel gerçeğe dayanır.

### Dopamin Tetikleme Formülü

```
Dopamin Tepkisi = (Beklenti Gerilimi × Sürpriz Faktörü) + Sosyal Karşılaştırma + İlerleme Görselliği
```

| Bileşen | Platform Karşılığı | Etki Gücü |
|---------|--------------------|-----------|
| **Beklenti Gerilimi** | "Level'a ne kadar kaldı?", "Streak kaybedecek miyim?", "Hazine sandığında ne var?" | Çok Yüksek |
| **Sürpriz Faktörü** | Tahmin edilemeyen ödüller: loot drop, bonus çark, çift XP saati | Çok Yüksek |
| **Sosyal Karşılaştırma** | Leaderboard, "X seni geçti!", profil kartı karşılaştırma | Yüksek |
| **İlerleme Görselliği** | XP barı, tamamlama yüzdesi, rozet koleksiyonu | Orta-Yüksek |
| **Kayıp Korkusu** | Streak sıfırlanma, rozet grileşme, sıralama düşme | Yüksek |
| **Sahiplik Duygusu** | "Benim rozetlerim", "Benim kütüphanem", "Benim streak'im" | Orta |

---

## A.2 — Nir Eyal Hook Modeli Uygulaması

Her platform etkileşimi 4 adımlı Hook Modeli'ne uyar:

### Döngü 1: Günlük Check-in Hook'u

```
TRIGGER (Tetikleyici)
├── Dış: Sabah 09:00 push notification "Günlük hedefin hazır!"
└── İç: Alışkanlık — telefonu açınca otomatik DZ'ye girme

ACTION (Eylem)
└── Dashboard'u aç → günlük görevlere bak → 1 görev seç

VARIABLE REWARD (Değişken Ödül)
├── XP kazanımı (beklenen)
├── Streak devam (rahatlatıcı)
├── Sürpriz bonus (%15 şans) — "Çift XP Saati aktif!"
└── Leaderboard sıralama değişimi (merak)

INVESTMENT (Yatırım)
├── Streak 1 gün uzadı (kaybetme korkusu artar)
├── DZ Coin birikti (çekime yaklaşıyor)
└── Profil XP'si arttı (level'a yaklaşıyor)
```

### Döngü 2: Kitap Okuma Hook'u

```
TRIGGER
├── Dış: "Kitabının 3. bölümü seni bekliyor" bildirimi
└── İç: "Bölüm tamamlama" dopamini beklentisi

ACTION
└── Bölümü oku → çalışma kağıdını doldur → gönder

VARIABLE REWARD
├── XP + DZ Coin (beklenen)
├── Çalışma kağıdı kalite puanı (%0-100, sürpriz)
├── Peer review isteği gelme şansı (sosyal)
└── Rozet kilidi açılma (%20 şans, bölüm bazlı)

INVESTMENT
├── Kitap ilerleme barı doldu
├── Yeni bilgi/beceri kazanıldı (değer hissi)
└── Bir sonraki bölümün kilidi açıldı (merak)
```

### Döngü 3: Para Kazanma Hook'u

```
TRIGGER
├── Dış: "Bu ay 450 DZ Coin kazandın! Minimum çekime 50 Coin kaldı"
└── İç: "Gerçek para kazanıyorum" motivasyonu

ACTION
└── İçerik üret / peer review yap / mentörlük yap / referral paylaş

VARIABLE REWARD
├── DZ Coin kazanımı (değişken miktar)
├── İçeriğe gelen görüntülenme/beğeni (sosyal onay)
├── Leaderboard yükselişi
└── "Para Makinesi" gizli rozeti (%5 şans)

INVESTMENT
├── İçerik kütüphanesi büyüdü (pasif gelir potansiyeli)
├── Mentee sayısı arttı (sürekli gelir)
├── Platform itibarı yükseldi (daha fazla fırsat)
└── Referral ağı genişledi
```

---

## A.3 — BJ Fogg Davranış Modeli

```
Davranış = Motivasyon × Yetenek × Tetikleyici
```

Platform bu formülü şöyle uygular:

| Parametre | Düşükse Ne Yaparız |
|-----------|-------------------|
| **Motivasyon düşük** | Sürpriz ödüllerle dopamin yükselt, streak kaybetme korkusu tetikle, sosyal kanıtla motive et ("150 kişi bu haftaki challenge'a katıldı") |
| **Yetenek düşük** | Görevleri mikro-adımlara böl ("2 dakika kural"), AI asistanla yardım et, video tutorial göster |
| **Tetikleyici yok** | Push notification, e-posta, in-app bildirim, SMS (opt-in) |

---

# B. ÖDÜL ZAMANLAMA MATRİSİ

---

## B.1 — Ödül Frekansı Tasarımı

Ödüllerin zamanlaması kritiktir. Çok sık = değersizleşir. Çok seyrek = motivasyon düşer.

### Anlık Ödüller (Her Eylemde)

| Eylem | Ödül | Gecikme | Görsel Feedback |
|-------|------|---------|-----------------|
| Bölüm okundu işaretle | +15 XP + 5 Coin | 0ms | Sayı animasyonu + ding |
| Çalışma kağıdı gönder | +15-40 XP + 10-30 Coin | 0ms | Yeşil tik + confetti mini |
| Pomodoro tamamla | +10 XP + 5 Coin | 0ms | Timer patlama efekti |
| Günlük check-in | +5 XP + streak +1 | 0ms | Alev büyüme |
| Kart tamamla (Kanban) | +5-50 XP + 5-50 Coin | 0ms | Kart kayma animasyonu |

### Kısa Vadeli Ödüller (Günlük/Haftalık)

| Ödül | Frekans | Koşul | Değer |
|------|---------|-------|-------|
| Günlük bonus XP | Günde 1 | Tüm günlük görevleri tamamla | 2x o günkü XP |
| Haftalık hazine sandığı | Haftada 1 | Haftanın en az 5 gününde aktif ol | Rastgele: 50-200 Coin |
| Haftalık sprint ödülü | Haftada 1 | Top 10'a gir | 100-500 Coin |
| Bonus çark | Her 5 görevde 1 | 5 görev tamamla | 2x, 3x veya 5x XP (ağırlıklı) |

### Orta Vadeli Ödüller (Aylık)

| Ödül | Frekans | Koşul | Değer |
|------|---------|-------|-------|
| Aylık rozet | Ayda 1 | O ay en az 20 gün aktif | Özel aylık rozet + 200 Coin |
| Kitap tamamlama rozeti | Kitap başına 1 | Kitabı %100 tamamla | 100-500 XP + 25-200 Coin |
| Level up | Değişken | XP eşiğine ulaş | Ayrıcalık + 50 Coin |
| Challenge şampiyonluğu | Değişken | Challenge'da 1. ol | 500-2.000 Coin |

### Uzun Vadeli Ödüller (3+ Ay)

| Ödül | Koşul | Değer |
|------|-------|-------|
| 90 gün streak | 90 gün kesintisiz | 500 Coin + Çeyrek rozeti + özel profil çerçevesi |
| 5 kitap tamamla | İlk 5 kitabı bitir | 1.000 Coin + "Yarı Yol" rozeti + mentörlük hakkı |
| Level 10 | 5.500 XP | VIP erişim + sınırsız çekim + yıllık etkinlik daveti |
| 10 kitap tamamla | Seriyi bitir | 5.000 Coin + "Zirve" taç çerçevesi + ömür boyu premium |

---

## B.2 — Bonus Çark Mekanizması

Her 5 görev tamamlamada dönen çark:

```
Çark Dilimleri (8 dilim):
┌─────────────────────────────┐
│  ×2 XP  │  ×2 XP  │  ×3 XP │  ← %37.5 olasılık (×2)
│  ×3 XP  │  ×5 XP  │  25 Coin│  ← %25 olasılık (×3)
│  50 Coin │ GİZLİ   │        │  ← %12.5 (×5), %12.5 (25C)
│         │ ROZET!   │        │  ← %6.25 (50C), %6.25 (gizli)
└─────────────────────────────┘
```

| Dilim | İçerik | Olasılık | Renk |
|-------|--------|----------|------|
| 1 | ×2 XP (mevcut görev) | %25 | Yeşil |
| 2 | ×2 XP (mevcut görev) | %12.5 | Yeşil |
| 3 | ×3 XP (mevcut görev) | %18.75 | Mavi |
| 4 | ×3 XP (mevcut görev) | %6.25 | Mavi |
| 5 | ×5 XP (mevcut görev) | %12.5 | Mor |
| 6 | 25 DZ Coin | %12.5 | Altın |
| 7 | 50 DZ Coin | %6.25 | Altın parlak |
| 8 | Gizli Rozet ipucu | %6.25 | Gökkuşağı |

**Çark Animasyonu:**
1. Çark belirir (0.5s fade in)
2. "Çevir!" butonu nabız atar
3. Kullanıcı tıklar → çark hızlı döner (2s)
4. Yavaşlayarak durur (1.5s — yavaşlama gerilim yaratır)
5. Kazanım parlar + ses efekti (1s)
6. Sonuç gösterilir + XP/Coin eklenir

---

## B.3 — Hazine Sandığı Detayları

Haftalık 1 sandık, hafta boyunca biriken "sandık anahtarı" ile açılır.

### Anahtar Kazanma

| Eylem | Anahtar |
|-------|---------|
| Her gün aktif ol | +1 anahtar/gün |
| Challenge tamamla | +2 anahtar |
| Peer review yap | +1 anahtar |
| Streak 7+ gün | +1 bonus anahtar |

### Sandık Tipleri

| Sandık | Anahtar Gereksinimi | İçerik |
|--------|---------------------|--------|
| **Bronz Sandık** | 3 anahtar | 20-50 Coin + rastgele eşya |
| **Gümüş Sandık** | 5 anahtar | 50-150 Coin + nadir eşya şansı |
| **Altın Sandık** | 7 anahtar | 150-500 Coin + nadir rozet şansı + premium şablon |

### Sandık İçerik Havuzu

| Eşya | Sandık | Nadir mi? |
|------|--------|-----------|
| 20-50 DZ Coin | Bronz/Gümüş/Altın | Normal |
| 50-150 DZ Coin | Gümüş/Altın | Normal |
| 150-500 DZ Coin | Altın | Nadir |
| Özel profil çerçevesi | Gümüş/Altın | Nadir |
| Premium prompt şablonu (5 adet) | Gümüş/Altın | Normal |
| 24 saat çift XP boost | Bronz/Gümüş/Altın | Nadir |
| Gizli rozet | Altın | Çok Nadir |
| Streak freeze (1 gün) | Gümüş/Altın | Nadir |
| AI araç deneme kuponu (7 gün) | Altın | Çok Nadir |
| Özel avatar aksesuar | Bronz/Gümüş/Altın | Normal |

**Sandık Açma Animasyonu:**
1. Sandık ekranın ortasında belirir (hafif sallanma)
2. Kullanıcı tıklar → sandık titrer
3. Kapak açılır → altın ışık yayılır
4. İçerik birer birer yukarı uçar (her biri 0.5s arayla)
5. Her eşya için ayrı ses efekti (coin: ching, rozet: unlock, boost: power-up)
6. Nadir eşya gelirse ekran parlar + "NADİR!" yazısı

---

## B.4 — Loot Drop Sistemi

Rastgele görev tamamlamada %5 şansla düşen özel eşyalar.

| Eşya | Nadir mi? | Düşme Şansı | Etkisi |
|------|-----------|-------------|--------|
| **Deneyim İksiri** | Normal | %3 | Sonraki 1 saat tüm XP %50 fazla |
| **Altın Kalkan** | Nadir | %1.5 | Streak 3 gün korunur (freeze) |
| **Gölge Rozeti** | Çok Nadir | %0.4 | Gizli bir rozet ipucu haritası |
| **Ejderha Alevi** | Efsanevi | %0.1 | Streak alevi permanent olarak özel efekt kazanır |

**Loot Drop Anı:**
1. Görev tamamlandıktan sonra normal ödül gösterilir
2. 1 saniye bekle...
3. Ekranın üstünden parlayan bir kutu düşer (slow-motion)
4. "NADİR EŞYA!" veya "EFSANEVİ EŞYA!" yazısı
5. Eşya açılır + özel ses efekti
6. Kullanıcı "Paylaş" butonu görür (Twitter/Instagram)

---

# C. XP HESAPLAMA MOTORU

---

## C.1 — Temel XP Formülü

```
Kazanılan XP = Baz XP × Zorluk Çarpanı × Streak Çarpanı × Zaman Bonusu × Kalite Çarpanı
```

### Parametreler

| Parametre | Değer Aralığı | Açıklama |
|-----------|---------------|----------|
| **Baz XP** | 5-100 | Görev tipine göre sabit |
| **Zorluk Çarpanı** | 1.0-2.0 | Görev zorluğu (1-5 yıldız): 1.0 / 1.2 / 1.4 / 1.7 / 2.0 |
| **Streak Çarpanı** | 1.0-2.5 | Streak uzunluğuna göre: 0-2 gün: 1.0 / 3-6 gün: 1.1 / 7-13: 1.2 / 14-20: 1.3 / 21-29: 1.4 / 30-59: 1.5 / 60-89: 1.6 / 90-179: 1.75 / 180-364: 2.0 / 365+: 2.5 |
| **Zaman Bonusu** | 1.0-1.3 | Erken tamamlarsan bonus: Deadline'dan 3+ gün önce: 1.3 / 1-2 gün önce: 1.15 / Zamanında: 1.0 / Geç: 0.8 |
| **Kalite Çarpanı** | 0.5-1.5 | Çalışma kağıdı kalitesi (AI değerlendirmesi veya peer review): Eksik: 0.5 / Yeterli: 1.0 / İyi: 1.2 / Mükemmel: 1.5 |

### Hesaplama Örnekleri

**Senaryo 1: Yeni Başlayan**
```
Görev: Kitap 01, Bölüm 1 çalışma kağıdı
Baz XP: 25
Zorluk: 2 yıldız → ×1.2
Streak: 2 gün → ×1.0
Zaman: Zamanında → ×1.0
Kalite: İyi → ×1.2

Kazanılan XP = 25 × 1.2 × 1.0 × 1.0 × 1.2 = 36 XP
```

**Senaryo 2: Deneyimli Kullanıcı**
```
Görev: Kitap 05, Niş Analizi Raporu
Baz XP: 40
Zorluk: 4 yıldız → ×1.7
Streak: 45 gün → ×1.5
Zaman: 2 gün erken → ×1.15
Kalite: Mükemmel → ×1.5

Kazanılan XP = 40 × 1.7 × 1.5 × 1.15 × 1.5 = 176 XP
```

---

## C.2 — XP Kaynakları Tam Listesi

### Okuma Eylemleri

| Eylem | Baz XP | Koşul |
|-------|--------|-------|
| Bölüm okundu işaretle | 15 | Minimum 5 dakika bölümde kal (sayfa süresi kontrolü) |
| Kitap tamamla | 100 | Tüm bölümler okundu |
| İkinci kez okuma | 5 | Daha önce okunan bölümü tekrar aç ve 3+ dk kal |

### Uygulama Eylemleri

| Eylem | Baz XP | Koşul |
|-------|--------|-------|
| Çalışma kağıdı — Yansıma | 15 | Min 100 kelime yaz |
| Çalışma kağıdı — Aksiyon Planı | 25 | Tüm checkboxları işaretle |
| Çalışma kağıdı — Matris | 20 | Tüm hücreleri doldur |
| Çalışma kağıdı — Quiz | 30 | %70+ doğru (ilk denemede %90+: bonus) |
| Çalışma kağıdı — Çıktı Yükleme | 35 | Dosya yükle ve açıklama yaz |
| Çalışma kağıdı — Video/Ses | 40 | Min 30 sn kayıt |
| Çalışma kağıdı — Peer Review | 25 | Min 50 kelime geri bildirim |

### Kanban Eylemleri

| Eylem | Baz XP | Koşul |
|-------|--------|-------|
| Kart oluştur | 2 | — |
| Kart tamamla | 5-50 | Zorluk puanına göre |
| Tüm panodaki kartları tamamla | 100 | Pano %100 |
| Checklist öğesi tamamla | 3 | — |

### Sosyal Eylemler

| Eylem | Baz XP | Koşul |
|-------|--------|-------|
| Peer review yap | 25 | Min 50 kelime |
| Forum sorusuna cevap yaz | 15 | Min 100 kelime |
| İçerik üret (blog, şablon) | 50 | Moderasyondan geçmeli |
| Başkasının çıktısını beğen | 2 | Günde max 20 |
| Upvote al | 5 | Başkası senin içeriğini beğendi |

### Sistem Eylemleri

| Eylem | Baz XP | Koşul |
|-------|--------|-------|
| Günlük check-in | 5 | Günde 1 |
| Pomodoro tamamla | 10 | 25 dk tam |
| Profil güncelle | 10 | Tek seferlik |
| İlk kitap satın al | 50 | Tek seferlik |
| Bug raporu (onaylı) | 100 | Admin onaylı |

---

## C.3 — Anti-Inflasyon XP Kuralları

| Kural | Açıklama |
|-------|----------|
| **Günlük XP Tavanı** | Tek günde max 500 XP kazanılabilir (sağlıklı kullanım) |
| **Tekrar Azalması** | Aynı görev tekrar yapılırsa XP %50 azalır (3. kez %25, sonra 0) |
| **AFK Kontrolü** | "Bölüm okundu" için sayfada minimum süre şartı |
| **Kalite Filtresi** | 10 kelimeden kısa çalışma kağıtları 0 XP |
| **Hız Sınırı** | Ardışık 2 görev arası min 30 saniye |

---

# D. DZ COİN EKONOMİSİ (DERİN)

---

## D.1 — Ekonomik Denge Tasarımı

DZ Coin ekonomisi bir oyun ekonomisi gibi yönetilmeli: enflasyon kontrol altında, değer algısı yüksek.

### Para Akışı

```
KAYNAK (Coin Girişi)                    ÇIKIŞ (Coin Çıkışı)
─────────────────                       ─────────────────
Görev tamamlama      ──┐           ┌── Gerçek para çekimi
Streak bonusu        ──┤           ├── Streak freeze satın alma
Challenge ödülü      ──┤  DZ Coin  ├── Premium şablon satın alma
Peer review          ──┤  HAVUZU   ├── AI araç deneme kuponu
Referral             ──┤           ├── Özel profil çerçevesi/avatar
İçerik geliri        ──┤           ├── Boost satın alma (çift XP)
Mentörlük            ──┤           ├── Challenge giriş ücreti (opsiyonel)
Hazine sandığı       ──┘           └── Coin yakma (deflasyonist mekanizma)
```

### Aylık Coin Denge Tablosu (Ortalama Aktif Kullanıcı)

| Kaynak | Aylık Kazanım (Coin) |
|--------|---------------------|
| Görev tamamlama (günde ~3 görev) | 300-450 |
| Streak bonusu | 50-200 |
| Haftalık sandık (4×) | 80-200 |
| Peer review (haftada 2) | 120 |
| Challenge (ayda 2) | 100-500 |
| Sürpriz ödüller | 50-150 |
| **Toplam Aylık Kazanım** | **700-1.700 Coin** |

| Harcama | Aylık Harcama (Coin) |
|---------|---------------------|
| Streak freeze (1-2 kez) | 100 |
| Boost satın alma | 50-200 |
| Premium şablon | 0-150 |
| Avatar/çerçeve | 0-300 |
| **Toplam Aylık Harcama** | **150-750 Coin** |

| | Aylık Net |
|---|-----------|
| **Net birikim** | **550-950 Coin/ay** |
| **TL karşılığı** | **5.50-9.50 TL/ay** (temel kullanıcı) |

### Level 7+ İçerik Üretici

| Kaynak | Aylık Kazanım |
|--------|---------------|
| Temel kazanımlar | 700-1.700 |
| İçerik üretimi (ayda 4 yazı) | 400-2.000 |
| Mentörlük (2 mentee) | 400 |
| Referral (ayda 3) | 300-1.050 |
| **Toplam** | **1.800-5.150 Coin** |
| **TL karşılığı** | **18-51.50 TL/ay** |

### Level 9-10 Uzman

| Kaynak | Aylık Kazanım |
|--------|---------------|
| Temel + İçerik | 1.800-5.150 |
| Mentörlük (5 mentee, 1 grup) | 1.500 |
| Workshop (ayda 1) | 1.000-3.000 |
| Affiliate satış | 500-2.000 |
| **Toplam** | **4.800-11.650 Coin** |
| **TL karşılığı** | **48-116.50 TL/ay** (sadece platform içi) |

---

## D.2 — DZ Coin Değer Koruma Mekanizmaları

| Mekanizma | Açıklama | Etki |
|-----------|----------|------|
| **Günlük Kazanım Tavanı** | Tek günde max 200 Coin kazanılabilir (görev bazlı) | Enflasyon kontrolü |
| **Coin Yakma** | Bazı premium eşyalar Coin ile satın alınır ve yakılır (dolaşımdan çıkar) | Arz azaltma |
| **Çekim Komisyonu** | %10 komisyon (çekilen Coin'den düşülür) | Platform geliri + arz kontrolü |
| **Minimum Çekim Eşiği** | 500 Coin (5 TL) — küçük miktarlar birikmeye devam eder | Harcama teşviki |
| **Sezonluk Sıfırlama Yok** | Coin asla sıfırlanmaz — güven oluşturur | Uzun vadeli bağlılık |
| **Dinamik Oran** | Gerekirse oran 100:1'den 120:1'e veya 150:1'e ayarlanabilir | Fiyat istikrarı |
| **Kazanım Zorluk Artışı** | Level arttıkça aynı Coin için daha zorlu görevler | Doğal deflasyon |

---

## D.3 — Coin Harcama Mağazası

Kullanıcılar Coin'lerini çekmek yerine platform içi harcamaya teşvik edilir:

| Ürün | Fiyat (Coin) | Açıklama |
|------|-------------|----------|
| **Streak Freeze (1 gün)** | 50 | Streak'i 1 gün koru |
| **Çift XP Boost (1 saat)** | 75 | 1 saat boyunca tüm XP ×2 |
| **Çift XP Boost (24 saat)** | 250 | 24 saat boyunca tüm XP ×2 |
| **Özel Avatar** | 100-500 | Premium avatar karakterleri |
| **Profil Çerçevesi** | 200-1.000 | Animasyonlu profil çerçeveleri |
| **Profil Banner** | 150-750 | Özel profil arka planları |
| **İsim Rengi** | 300 | İsmin leaderboard'da renkli görünür |
| **Premium Prompt Paketi (10 adet)** | 200 | Özenle hazırlanmış prompt şablonları |
| **AI Araç Deneme (7 gün)** | 500 | Partner AI aracına 7 günlük erişim |
| **Extra Hazine Anahtarı** | 75 | Sandık açmak için +1 anahtar |
| **Challenge Bilet (özel)** | 100 | Özel yüksek ödüllü challenge'a katıl |
| **Mentör Randevu Jetonu** | 300 | Top mentörlerden 30 dk 1:1 seans |

---

# E. PARA KAZANMA KANALLARI (DETAYLI)

---

## E.1 — Kanal 1: İçerik Üretimi Programı

### Katılım Koşulları

| Koşul | Değer |
|-------|-------|
| Minimum Level | 7 (Uzman) |
| Minimum tamamlanan kitap | 3 |
| Platform yaşı | 60+ gün |
| Aktif streak | 7+ gün |

### İçerik Tipleri ve Kazanım Detayları

#### Blog Yazısı

| Parametre | Değer |
|-----------|-------|
| **Minimum kelime** | 800 |
| **Sabit ödül** | 100 Coin |
| **Görüntülenme bonusu** | 5 Coin / 100 görüntülenme (max 500 Coin/yazı) |
| **Beğeni bonusu** | 2 Coin / beğeni |
| **"Editör Seçimi" bonusu** | +200 Coin (admin seçimi) |
| **Moderasyon süresi** | 24-48 saat |
| **Aylık limit** | Max 10 yazı |

**Kalite Kriterleri:**
- Orijinal içerik (plagiarism kontrolü)
- DİPTENZİRVEYE™ ton ve stili ile uyumlu
- Pratik, uygulanabilir bilgi içermeli
- En az 1 görsel/tablo/infografik
- Doğru Türkçe, yazım hatasız

#### Prompt Şablonu

| Parametre | Değer |
|-----------|-------|
| **Sabit ödül** | 50 Coin |
| **Kullanım bonusu** | 3 Coin / kullanım (max 300 Coin/şablon) |
| **Minimum puan** | Topluluk 4+ yıldız (5 üzerinden) |
| **Moderasyon** | AI otomatik kontrol + admin inceleme |

#### Vaka Çalışması

| Parametre | Değer |
|-----------|-------|
| **Sabit ödül** | 300 Coin |
| **Görüntülenme bonusu** | 10 Coin / 100 görüntülenme (max 1.000 Coin) |
| **Koşul** | Gerçek sonuçlarla desteklenmiş (ekran görüntüsü, gelir kanıtı) |
| **Bonus** | "Verified Case Study" rozeti (toplulukta güvenilirlik) |

---

## E.2 — Kanal 2: Mentörlük Programı

### Mentör Olma Koşulları

| Koşul | Değer |
|-------|-------|
| Minimum Level | 9 (Mentor) |
| Minimum tamamlanan kitap | 7 |
| Minimum peer review | 30 |
| Topluluk puanı | 4.5+ yıldız |
| Platform yaşı | 120+ gün |

### Mentörlük Tipleri

#### 1:1 Mentörlük

```
Mentör:                          Mentee:
├── Max 5 mentee aynı anda       ├── Mentör seçer (veya eşleştirilir)
├── Haftalık 1 seans (30 dk)     ├── Aylık 99 TL (veya 500 DZ Coin)
├── Kazanım: 200 Coin/mentee/ay  ├── Sınırsız mesajlaşma
├── Mentee ilerlerse bonus        ├── Özel görev atama
└── Mentee bırakırsa ceza yok    └── İlerleme raporu alma

Mentör Bonusları:
- Mentee level atlarsa: +50 Coin
- Mentee kitap tamamlarsa: +100 Coin
- Mentee ilk gelirini kazanırsa: +500 Coin (tek seferlik)
- 3+ mentee aynı anda aktifse: ×1.5 tüm mentörlük gelirleri
```

#### Grup Mentörlük

```
- 5-10 kişilik gruplar
- Haftalık 1 grup seans (45 dk)
- Kazanım: 500 Coin/grup/ay
- Grup üyelerinin birbirine de XP kazandırması (peer effect)
```

#### AMA (Ask Me Anything) Oturumları

```
- Canlı Q&A formatı
- Max 50 katılımcı
- 60 dakika
- Kazanım: 300 Coin + katılımcı sayısı × 5 Coin
- Kayıt arşivlenir → pasif görüntülenme geliri
```

---

## E.3 — Kanal 3: Referral Program Detayları

### Referral Kod Sistemi

Her kullanıcı (Level 6+) benzersiz bir referral kodu alır:

```
Kod formatı: DZ-[KullanıcıAdı]-[4-hane]
Örnek: DZ-AHMET-7K4X
```

### Çok Katmanlı Referral Ödülleri

```
Kademe 1 (Direkt Referral):
├── Kayıt oldu: +50 Coin
├── İlk kitap satın aldı: +100 Coin
├── Level 3'e ulaştı: +200 Coin
├── İlk çalışma kağıdını gönderdi: +50 Coin
└── 30 gün aktif kaldı: +300 Coin
    TOPLAM POTANSİYEL: 700 Coin/referral

Kademe 2 (Referralın Referralı):
├── Kayıt oldu: +25 Coin
├── İlk kitap satın aldı: +50 Coin
└── Level 3'e ulaştı: +100 Coin
    TOPLAM POTANSİYEL: 175 Coin/2. kademe

Max kademe derinliği: 2
```

### Referral Takip Dashboard'u

```
┌─────────────────────────────────────────────┐
│  SENİN REFERRAL KODUN: DZ-AHMET-7K4X       │
│  [Kopyala] [Paylaş]                         │
│                                             │
│  📊 Özet                                    │
│  ├── Toplam referral: 12                    │
│  ├── Aktif referral: 8                      │
│  ├── Bu ay kazanılan: 1.250 Coin            │
│  └── Tüm zamanlar: 4.800 Coin              │
│                                             │
│  📋 Detay                                   │
│  ├── Mehmet ⭐ Level 5 — 700 Coin kazandın  │
│  ├── Ayşe ⭐ Level 3 — 400 Coin kazandın   │
│  ├── Can 🔄 Level 1 — 50 Coin kazandın     │
│  └── ... (12 kişi)                          │
└─────────────────────────────────────────────┘
```

---

## E.4 — Kanal 4: Affiliate Satış Programı

### Affiliate Link Sistemi

```
Standart link: mindguru.net/kitap/ai-devrimini-anlamak
Affiliate link: mindguru.net/kitap/ai-devrimini-anlamak?ref=DZ-AHMET-7K4X
```

### Komisyon Yapısı

| Ürün | Fiyat | Komisyon (%) | Kazanım (Coin) |
|------|-------|-------------|----------------|
| Kitap (tek) | 149-299 TL | %15 | 2.235-4.485 Coin |
| 5 Kitap Paketi | 599 TL | %15 | 8.985 Coin |
| 10 Kitap Paketi | 999 TL | %15 | 14.985 Coin |
| Premium Üyelik (aylık) | 99 TL/ay | %20 (ilk ay) | 1.980 Coin |
| Premium Üyelik (yıllık) | 799 TL | %20 | 15.980 Coin |
| Workshop bileti | 199-499 TL | %10 | 1.990-4.990 Coin |

### Cookie Süresi

- Affiliate cookie: 30 gün
- Kullanıcı 30 gün içinde satın alırsa komisyon geçerli

---

## E.5 — Kanal 5: Gelir Paylaşım Programı (Level 10)

Level 10 kullanıcılar platforma getirdikleri değer oranında gelir paylaşımına katılır:

| Parametre | Değer |
|-----------|-------|
| **Havuz** | Aylık platform gelirinin %5'i |
| **Dağıtım** | Katkı puanına göre orantılı |
| **Katkı Puanı** | İçerik üretimi + mentörlük + referral + topluluk katkısı ağırlıklı ortalama |
| **Ödeme** | Aylık, banka havalesi |
| **Minimum** | 100 TL |

---

# F. SEZONLUK ETKİNLİK SİSTEMİ

---

## F.1 — Sezon Takvimi

Her 3 ayda bir yeni sezon başlar. Her sezonun teması, özel challengeları, sınırlı süreli rozetleri ve ödülleri vardır.

| Sezon | Dönem | Tema | Özel Rozet |
|-------|-------|------|------------|
| **Sezon 1: Uyanış** | Nisan-Haziran 2026 | "Dipten başla, ilk adımı at" | Uyanış Savaşçısı |
| **Sezon 2: İvme** | Temmuz-Eylül 2026 | "Hız kazan, momentum kur" | İvme Mimarı |
| **Sezon 3: Hasat** | Ekim-Aralık 2026 | "Sonuçlarını topla, ilk gelirini gör" | Hasat Ustası |
| **Sezon 4: Zirve** | Ocak-Mart 2027 | "Zirveye doğru son sprint" | Zirve Muhafızı |

### Sezon Mekanikleri

| Mekanik | Açıklama |
|---------|----------|
| **Sezon Puan Tablosu** | Her sezon sıfırdan başlayan ayrı puan tablosu (toplam XP sıfırlanmaz, sadece sezon puanı) |
| **Sezon Ödül Yolu** | 10 aşamalı ödül yolu — her aşamada artan ödül (Battle Pass benzeri) |
| **Sınırlı Süreli Rozetler** | Sadece o sezonda kazanılabilir, sonra koleksiyoner eşyası olur |
| **Sezon Challenge'ı** | 3 aylık büyük hedef: "Bu sezon 3 kitap tamamla" gibi |
| **Sezon Finali** | Son hafta özel etkinlik + 2x ödüller |

### Sezon Ödül Yolu Örneği (Sezon 1: Uyanış)

| Aşama | Puan | Ödül |
|-------|------|------|
| 1 | 100 | 50 DZ Coin |
| 2 | 300 | Özel avatar aksesuar (Uyanış temalı) |
| 3 | 600 | 150 DZ Coin + 24 saat çift XP |
| 4 | 1.000 | Uyanış profil çerçevesi |
| 5 | 1.500 | 300 DZ Coin + Altın Hazine Sandığı |
| 6 | 2.200 | Uyanış rozeti (Nadir) |
| 7 | 3.000 | 500 DZ Coin + özel isim rengi |
| 8 | 4.000 | Premium prompt paketi (20 adet) |
| 9 | 5.500 | 1.000 DZ Coin + Uyanış Savaşçısı rozeti (Çok Nadir) |
| 10 | 7.500 | 2.000 DZ Coin + Animasyonlu profil efekti (Efsanevi) |

---

# G. KULLANICI YOLCULUĞU SENARYOLARI

---

## G.1 — Senaryo: "Başlangıç Ayşe" (Hafta 1-4)

```
Profil: 28 yaş, ofis çalışanı, AI öğrenmek istiyor, erteleme sorunu var
Giriş motivasyonu: Instagram'da DZ reklamı gördü

HAFTA 1:
Pazartesi: Kayıt + onboarding (50 XP) → Level 1→2 (ilk dopamin!)
Salı: Kitap 01, Bölüm 1 okudu (15 XP) + çalışma kağıdı (36 XP)
Çarşamba: Bölüm 2 okudu + çalışma kağıdı (51 XP) + 3 gün streak (alev ikonu!)
Perşembe: İlk Pomodoro denedi (10 XP) + Bölüm 3 (15 XP)
Cuma: Bölüm 4 okudu (15 XP) + quiz %85 (30 XP) → ilk bonus çark! (×3 XP!)
Cumartesi: Bölüm 5 tamamladı + 7 günlük görev listesine başladı
Pazar: 7 gün streak! → +10 DZ Coin + %20 XP bonus

Hafta sonu: Level 3 (Öğrenci) atlama → kutlama animasyonu!
Haftalık kazanım: ~350 XP + 75 DZ Coin
Duygusal durum: "Bu gerçekten eğlenceli, devam edebilirim!"

HAFTA 2-4:
- Kitap 01 tamamladı → "AI Temelleri" rozeti (+100 XP +25 Coin)
- Kitap 04'e başladı (erteleme sorunu için)
- 21 gün streak (büyük milestone!) → +50 Coin + rozet
- İlk peer review yaptı → +25 XP +15 Coin
- Level 4'e yaklaşıyor

1. Ay Sonu:
├── Level: 4 (Pratisyen)
├── Streak: 25 gün
├── Coin: 310
├── Tamamlanan: 1 kitap + 2. kitap %40
├── Duygusal durum: "Bu platform bana gerçekten yardımcı oluyor"
└── Churn riski: DÜŞÜK (streak bağımlılığı + ilerleme görselliği)
```

## G.2 — Senaryo: "Girişimci Mehmet" (Ay 2-6)

```
Profil: 32 yaş, dijital pazarlamacı, kendi işini kurmak istiyor
Level 5, 3 kitap tamamlamış, 45 gün streak

AY 2:
- Kitap 05 (AI ile İlk Gelirim) okuyor
- İş Projesi Panosu oluşturdu: "AI Danışmanlık İşi"
- Niş bulma çalışma kağıdını doldurdu (kalite: Mükemmel → 1.5x çarpan)
- İlk dijital ürünü oluşturdu → "İlk Gelir" challenge'ına katıldı

AY 3:
- Level 6 (Stratejist) → Referral programı açıldı!
- 3 arkadaşına referral gönderdi → 2'si kaydoldu (+100 Coin)
- İlk gerçek dünya gelirini kazandı (Instagram'dan ilk satış!)
- Platformda "İlk Satışımı Yaptım!" vaka çalışması paylaştı (+300 Coin)

AY 4:
- Level 7 (Uzman) → İçerik üretimi açıldı!
- İlk blog yazısını yazdı: "AI ile Niş Bulma Rehberim" (+100 Coin + 250 görüntülenme bonusu)
- Prompt şablonları paylaştı (5 adet) (+250 Coin)
- 90 gün streak → +500 Coin! + "Çeyrek" rozeti (Çok Nadir)

AY 5-6:
- İçerik üretimi düzenli gelir getiriyor (~800 Coin/ay)
- Referral ağı 8 kişiye ulaştı
- Level 8'e ulaştı → Topluluk eğitmeni
- İlk çekim talebi: 2.500 Coin → 25 TL (komisyon sonrası 22.50 TL)
- Gerçek dünya geliri: Aylık 12.000 TL (AI danışmanlık)

6. Ay Sonu:
├── Level: 8 (Usta)
├── Streak: 155 gün
├── Toplam Coin kazanılmış: 8.400
├── Toplam Coin çekilmiş: 2.500 (22.50 TL)
├── Gerçek dünya geliri: 12.000 TL/ay
├── Platform içi aylık gelir: ~1.500 Coin
└── Duygusal durum: "Bu platform hayatımı değiştirdi"
```

## G.3 — Senaryo: "Uzman Zeynep" (Ay 6-12)

```
Profil: 35 yaş, 8 kitap tamamlamış, Level 9, toplulukta tanınan isim
Mentör olmak istiyor

AY 6-8:
- Level 9 (Mentor) → Mentörlük programı açıldı
- 3 mentee aldı → 600 Coin/ay mentörlük geliri
- Grup mentörlük başlattı (7 kişilik) → 500 Coin/ay
- İlk AMA oturumu → 300 Coin + 35 katılımcı × 5 = 475 Coin

AY 9-10:
- Level 10 (Zirve) → VIP + sınırsız çekim + gelir paylaşım programı
- 5 mentee + 2 grup → 1.500 + 1.000 = 2.500 Coin/ay mentörlük
- İçerik + referral: ~2.000 Coin/ay
- Gelir paylaşım programından: ~3.000 Coin/ay
- 365 gün streak! → 5.000 Coin + "Yıl" rozeti + Süpernova efekti

AY 11-12:
- Platform içi aylık gelir: ~7.500 Coin = 75 TL (komisyon sonrası 67.50 TL)
- Gerçek dünya geliri: 45.000 TL/ay (AI otomasyon ajansı)
- Workshop düzenledi → 25 katılımcı × 199 TL = 4.975 TL (platform komisyonu sonrası ~4.000 TL)

12. Ay Sonu:
├── Level: 10 (Zirve)
├── Streak: 340 gün
├── Toplam Coin kazanılmış: 52.000
├── Toplam Coin çekilmiş: 35.000 (315 TL)
├── Gerçek dünya geliri: 45.000 TL/ay
├── Workshop geliri: 4.000 TL/ay (ortalama)
├── Platform içi gelir: ~675 TL/ay
├── Toplam aylık gelir: ~49.675 TL
└── Duygusal durum: "Bu platform sadece bir eğitim değil, bir kariyer"
```

---

# H. ANTİ-SÖMÜRÜ SİSTEMİ

---

## H.1 — Bot ve Sahte Hesap Koruması

| Koruma | Mekanizma | Uygulama |
|--------|-----------|----------|
| **Kayıt** | reCAPTCHA v3 + e-posta doğrulama | Her kayıtta |
| **Hız Sınırı** | Ardışık görev arası min 30 sn | Her eylemde |
| **IP Kontrolü** | Aynı IP'den max 3 hesap | Kayıtta |
| **Davranış Analizi** | Anormal hızdaki tamamlamaları flag'le | Sürekli |
| **Okuma Süresi** | Bölüm "okundu" için min 5 dk sayfada kalma | Her bölümde |
| **Çalışma Kağıdı Kalitesi** | 10 kelimeden kısa = 0 XP/Coin, AI plagiarism kontrolü | Her gönderimde |
| **İlk Çekim Onayı** | İlk DZ Coin çekiminde admin manuel onay | Tek seferlik |
| **KYC (isteğe bağlı)** | 1.000 TL üzeri çekim için TC kimlik doğrulama | Büyük çekimlerde |

---

## H.2 — XP/Coin Farming Önleme

| Kural | Detay |
|-------|-------|
| **Günlük XP tavanı** | 500 XP/gün |
| **Günlük Coin tavanı** | 200 Coin/gün (görev bazlı) |
| **Beğeni spam** | Aynı kullanıcıya günde max 3 beğeni |
| **Peer review kalitesi** | 50 kelimeden kısa review = 0 Coin |
| **Referral doğrulama** | Referral Coin'i sadece referral 7 gün aktif kaldıktan sonra yatar |
| **Self-referral** | Aynı cihaz/IP ile referral engelli |
| **İçerik moderasyonu** | Otomatik AI + manuel admin inceleme |

---

## H.3 — Adil Oyun Politikası

```
DİPTENZİRVEYE™ ADİL OYUN KURALLARI:

1. Bot, otomasyon veya script kullanımı yasaktır
2. Sahte hesap açmak yasaktır
3. Başkasının çalışmasını kopyalamak yasaktır
4. Sahte peer review yazmak yasaktır
5. Referral manipülasyonu yasaktır

İHLAL YAPTIRIM:
├── 1. İhlal: Uyarı + 7 gün XP/Coin kazanım durdurma
├── 2. İhlal: 30 gün askıya alma + tüm DZ Coin dondurma
└── 3. İhlal: Kalıcı ban + DZ Coin iptali
```

---

# I. ANİMASYON & SES BLUEPRINT'İ

---

## I.1 — Animasyon Spesifikasyonları

### XP Kazanımı Animasyonu

```css
/* Temel XP animasyonu */
@keyframes xpGain {
  0% { transform: translateY(0); opacity: 1; font-size: 14px; }
  50% { transform: translateY(-30px); opacity: 1; font-size: 20px; color: #FFD700; }
  100% { transform: translateY(-60px); opacity: 0; font-size: 24px; }
}

/* XP sayacı artış animasyonu */
@keyframes xpCountUp {
  /* Counter JS ile kontrol edilir: eski değerden yeni değere 800ms'de sayar */
  /* Her 50ms'de +1 artır, yüksek XP'lerde +5 veya +10 */
}

/* Altın parçacık efekti */
@keyframes goldParticle {
  0% { transform: translate(0, 0) scale(1); opacity: 1; }
  100% { transform: translate(var(--dx), var(--dy)) scale(0); opacity: 0; }
  /* 8-12 parçacık rastgele yönlere dağılır */
}
```

### Level Up Animasyonu

```
Zamanlama (toplam 4 saniye):

0.0s — Ekran overlay (siyah, %80 opaklık, 0.3s fade in)
0.3s — Eski level numarası ortada, büyük (2s)
0.5s — Eski level çatlar + parçalanır (shatter efekti)
1.0s — Altın ışık patlaması (merkeze doğru radyal gradient animasyon)
1.2s — Yeni level numarası belirir (scale: 0 → 1.2 → 1.0, spring easing)
1.5s — Yeni unvan kartı alttan kayarak gelir (slide up + fade in)
2.0s — Açılan ayrıcalıklar listesi sırayla belirir (her biri 0.2s arayla)
2.5s — Konfeti yağmuru başlar (canvas confetti, 2s sürer)
3.5s — "Paylaş" ve "Devam Et" butonları belirir
4.0s — Overlay'e tıklanabilir hale gelir
```

### Streak Alevi Animasyonu

```
Streak uzunluğuna göre alev büyüklüğü ve rengi:

1-6 gün:    🔥 Küçük alev, turuncu (#FF6B35)
             Hafif titreşim (2px, 1.5s döngü)

7-13 gün:   🔥🔥 Orta alev, kırmızı-turuncu gradient
             Orta titreşim + hafif parıltı

14-20 gün:  🔥🔥🔥 Büyük alev, kırmızı (#FF2D00)
             Güçlü titreşim + sürekli parıltı

21-29 gün:  🔥🔥🔥🔥 Mavi çekirdekli alev (#1E90FF dış, #FF4500 iç)
             Dönen parçacıklar

30-59 gün:  Altın alev (#FFD700) + yıldız parçacıkları
             Alev etrafında altın hale

60-89 gün:  Platin alev (#E5E4E2) + çift parçacık yörüngesi
             Alev kalkan efekti

90-179:     Elmas alev (#B9F2FF) + gökkuşağı parçacıkları
             Alev etrafında kristal kırılma

180-364:    Kozmik alev (nebula renkleri) + yıldız patlaması
             Galaksi parçacıkları

365+:       Süpernova: Tüm efektler birleşik + pulse wave
             Profilde permanenet kozmik aura
```

---

## I.2 — Ses Efekti Spesifikasyonları

| Ses | Süre | Ton | Format | Dosya Boyutu |
|-----|------|-----|--------|-------------|
| xp-gain.mp3 | 0.3s | Tiz, tatlı "ding" (C6 nota) | MP3 128kbps | ~5KB |
| level-up.mp3 | 1.2s | Yükselen 3 nota: C4→E4→G4 (majör akor) | MP3 128kbps | ~20KB |
| coin-drop.mp3 | 0.4s | Metalik "ching-ching" | MP3 128kbps | ~7KB |
| badge-unlock.mp3 | 0.8s | Mekanik kilit açma + parlama | MP3 128kbps | ~12KB |
| task-complete.mp3 | 0.2s | Tatmin edici "pop" (balonpatlatma) | MP3 128kbps | ~4KB |
| streak-fire.mp3 | 0.5s | Hızlı "whoosh" + kısa alev | MP3 128kbps | ~8KB |
| pomodoro-end.mp3 | 1.0s | Kristal çan sesi | MP3 128kbps | ~15KB |
| surprise.mp3 | 0.6s | Sihirli pırıltı sesi | MP3 128kbps | ~9KB |
| error.mp3 | 0.3s | Yumuşak "buzz" (rahatsız etmeden) | MP3 128kbps | ~5KB |
| chest-open.mp3 | 1.5s | Ahşap kapak + altın dökülmesi | MP3 128kbps | ~22KB |
| rare-drop.mp3 | 1.0s | Epik keşif sesi (sinematik hit) | MP3 128kbps | ~15KB |
| spin-wheel.mp3 | 2.5s | Hızlı tıkırtı → yavaşlayan tıkırtı → final ding | MP3 128kbps | ~35KB |

**Toplam ses dosyası boyutu: ~157KB** (performans dostu)

---

# J. PSİKOLOJİK HOOK DÖNGÜLERİ

---

## J.1 — FOMO (Fear of Missing Out) Kullanımı

| Mekanizma | Uygulama | Etik Sınır |
|-----------|----------|------------|
| Sınırlı süreli challenge | "Bu challenge 48 saatte bitiyor!" | Haftada max 2 |
| Sezonluk rozetler | "Bu rozet sadece bu sezonda kazanılabilir" | Sezon başına 3-5 rozet |
| Çift XP saati | "1 saat içinde tüm XP ×2!" (rastgele başlar) | Haftada 1-2 kez |
| Early bird | "İlk 50 katılımcıya özel bonus" | Ayda 1 |
| Topluluk milestone | "Platform 1.000 kullanıcıya ulaştı! Kutlama bonusu: 100 Coin" | Doğal |

## J.2 — Endowed Progress Effect

İnsanlar zaten başlanmış bir hedefe devam etme eğilimindedir.

| Uygulama | Açıklama |
|----------|----------|
| Kayıtta 50 XP ver | "Zaten Level 2'ye yarı yoldasın!" |
| İlk kitapta %10 ilerleme göster | "Kitabın %10'unu keşfettin!" (intro sayılır) |
| Boş rozet koleksiyonu göster | "10 rozet boşluğu — ilk rozetini kazan!" |
| Level barı %5 dolu başlasın | Boş bar demotive eder, %5 dolu bar motive eder |

## J.3 — Zeigarnik Etkisi

Yarım kalan işler zihinimizi meşgul eder. Bunu kullanıyoruz:

| Uygulama | Açıklama |
|----------|----------|
| Yarım bırakılan bölüm | "Bölüm 3'ü yarıda bıraktın — %60'ta kaldı" (ilerleme barı ile) |
| Eksik çalışma kağıtları | "2 çalışma kağıdı eksik — tamamla ve rozetini al!" |
| Yarım Kanban panosu | "Panondaki 3 kart seni bekliyor" |
| Yaklaşan deadline | "Görevin 2 gün sonra sona eriyor" |

## J.4 — Social Proof (Sosyal Kanıt)

| Uygulama | Açıklama |
|----------|----------|
| Kayıt sayfasında | "1.247 kişi bu ay katıldı" |
| Kitap sayfasında | "348 kişi bu kitabı tamamladı" |
| Challenge'da | "Bu challenge'a 89 kişi katıldı" |
| Çalışma kağıdında | "Bu kağıdı 156 kişi doldurdu" |
| Dashboard'da | "Topluluk bu hafta 12.500 Pomodoro tamamladı" |

## J.5 — İkigai Bağlantısı

Platform, kullanıcının 4 İkigai sorusunu yanıtlamasına yardımcı olur:

```
NEYİ SEVİYORSUN?
→ Onboarding quiz + kitap önerileri ile keşfet

NEYİ İYİ YAPIYORSUN?
→ Çalışma kağıtları ve çıktılar ile ortaya koy

DÜNYA NE İSTİYOR?
→ Niş bulma (Kitap 05) + pazar araştırması

NE İÇİN PARA ALIRSIN?
→ AI becerileri + dijital ürün + danışmanlık + mentörlük
```

**Platform bu 4 soruyu birleştirdiğinde:**
- Kullanıcı sadece öğrenmiyor → anlam buluyor
- Sadece para kazanmıyor → değer üretiyor
- Sadece ilerlemiyor → dönüşüyor

---

> **DİPTENZİRVEYE™** — Her XP bir adım. Her Coin bir kanıt. Her rozet bir iz.  
> *Dip, utanılacak bir yer değil. Zirve ise hak edilecek bir yer.*  
> *Aradaki her adım — ölçülebilir, ödüllendirilebilir ve gerçek.*
