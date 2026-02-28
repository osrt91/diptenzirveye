# DİPTENZİRVEYE™ — PART 6: PLATFORM GÜÇLENDİRME SİSTEMİ

> **Versiyon:** 1.0 · **Tarih:** 22 Şubat 2026  
> **Kapsam:** Kullanıcı Çalışma Alanı, Trello Görev Yönetimi, Dopamin Gamification, Gerçek Para Kazanma, Bağımlılık UX  
> **Felsefe:** Kullanıcı öğrensin, uygulasın, kazansın — ve asla bırakmak istemesin.

---

## İÇİNDEKİLER

1. [A. KULLANICI ÇALIŞMA ALANI (WORKSPACE)](#a-kullanıcı-çalışma-alanı-workspace)
2. [B. TRELLO BENZERİ GÖREV/PROJE YÖNETİMİ](#b-trello-benzeri-görevproje-yönetimi)
3. [C. DOPAMIN GAMİFİCATİON SİSTEMİ](#c-dopamin-gamification-sistemi)
4. [D. GERÇEK PARA KAZANMA MEKANİZMASI](#d-gerçek-para-kazanma-mekanizması)
5. [E. BAĞIMLILIK YAPAN UX TASARIMI](#e-bağımlılık-yapan-ux-tasarımı)
6. [F. TEKNİK MİMARİ (WordPress Entegrasyonu)](#f-teknik-mimari-wordpress-entegrasyonu)
7. [G. VERİTABANI ŞEMASI](#g-veritabanı-şeması)
8. [H. LANSMAN YOL HARİTASI](#h-lansman-yol-haritası)

---

# A. KULLANICI ÇALIŞMA ALANI (WORKSPACE)

---

## A.1 — Konsept

Her kullanıcı kendi **kişisel çalışma alanına** sahip olur. Bu alan bir "dijital ofis" gibi çalışır: kitap notları, çalışma kağıtları, görev panoları, hedef takibi ve üretim araçları tek bir yerde toplanır.

**Vizyon:** "Notion + Trello + Duolingo birleşimi — ama DİPTENZİRVEYE™ markasıyla."

---

## A.2 — Workspace Modülleri

### A.2.1 — Kişisel Dashboard (Ana Ekran)

| Widget | Açıklama | Veri Kaynağı |
|--------|----------|--------------|
| **Günlük Odak Kartı** | Bugün yapılacak 3 ana görev (otomatik önerilir) | AI + kullanıcı tercihi |
| **XP Termometresi** | Günlük XP hedefi ve mevcut durum (animasyonlu) | `dz_xp_log` |
| **Streak Alevi** | Aktif seri gün sayısı + alev animasyonu | `dz_streaks` |
| **Aktif Kitap İlerlemesi** | Şu an okunan kitabın yüzde çubuğu | `dz_progress` |
| **Haftalık Isı Haritası** | GitHub benzeri 7 günlük aktivite ısı haritası | `dz_daily_activity` |
| **Sıralama Pozisyonu** | Topluluk içindeki sıralama (haftalık değişim oku) | `dz_leaderboard` |
| **Para Kasası** | Kazanılan toplam DZ Coin ve çekilebilir bakiye | `dz_wallet` |

### A.2.2 — Çalışma Kağıtları (Worksheets)

Her kitap bölümüne bağlı interaktif çalışma kağıtları. Kullanıcı bunları doldurmadan bölümü "tamamlandı" olarak işaretleyemez.

**Çalışma Kağıdı Tipleri:**

| Tip | Açıklama | XP Değeri | Örnek |
|-----|----------|-----------|-------|
| **Yansıma Formu** | Açık uçlu sorular — kullanıcı kendi düşüncelerini yazar | 15 XP | "Bu bölümden çıkardığın en önemli 3 ders nedir?" |
| **Aksiyon Planı** | Adım adım yapılacaklar listesi (checkbox) | 25 XP | "Niş bulma: 1) Rakip analizi yap ☐ 2) Talep araştır ☐ 3) Test ürünü oluştur ☐" |
| **Matris Doldurucu** | Tablo formatında karşılaştırma/değerlendirme | 20 XP | "AI Araç Değerlendirme Matrisi: Araç — Fiyat — Puan — Not" |
| **Quiz** | Çoktan seçmeli bilgi kontrolü (min %70 geçme notu) | 30 XP | "LLM'lerin hallüsinasyon oranını azaltmanın en etkili yolu nedir?" |
| **Çıktı Yükleme** | Ekran görüntüsü, PDF veya link paylaşma | 35 XP | "İlk prompt denemenizin ekran görüntüsünü yükleyin" |
| **Video/Ses Kaydı** | 60 saniyelik sesli/görüntülü yansıma | 40 XP | "Bu hafta öğrendiğin en önemli şeyi 60 saniyede anlat" |
| **Peer Review** | Başka bir kullanıcının çıktısını değerlendir | 25 XP | "Bu kullanıcının niş analizini incele ve geri bildirim ver" |

**Çalışma Kağıdı Akışı:**

```
Bölümü Oku → Çalışma Kağıdını Aç → Doldur/Yükle → Gönder
    → Otomatik XP Kazanımı → Bölüm Tamamlandı İşareti
    → Sonraki Bölüm Kilidi Açılır
```

### A.2.3 — Not Defteri (Personal Notes)

Her kullanıcı sınırsız not oluşturabilir. Notlar kitaplara, bölümlere veya genel alana bağlanabilir.

| Özellik | Açıklama |
|---------|----------|
| **Zengin Metin Editörü** | Bold, italic, başlık, liste, link, görsel ekleme |
| **Etiketleme** | Notları etiketle: #niş-bulma #prompt #AI-araçları |
| **Kitap Bağlantısı** | Notu bir kitap bölümüne pin'le — o bölümü açarken not yan panelde görünür |
| **Arama** | Full-text arama tüm notlar içinde |
| **Dışa Aktarım** | PDF veya Markdown olarak indir |
| **AI Asistan** | "Bu notumu özetle", "Aksiyon maddeleri çıkar", "Blog yazısına dönüştür" |

### A.2.4 — Hedef Takvimi

| Özellik | Açıklama |
|---------|----------|
| **90 Günlük Hedef Planı** | Ertelemeden Çıkış Sistemi (Kitap 04) ile entegre — 21+30+30 gün yapısı |
| **Haftalık Sprint** | Her pazartesi otomatik haftalık hedef belirleme ekranı gelir |
| **Günlük Check-in** | Sabah: "Bugünkü 3 odak noktam" / Akşam: "Bugün ne başardım" |
| **Milestone Kutlamaları** | 7, 14, 21, 30, 60, 90 gün tamamlandığında özel kutlama animasyonu |
| **Takvim Görünümü** | Aylık görünüm: yeşil = aktif gün, kırmızı = kaçırılan gün, altın = ekstra verimli gün |

### A.2.5 — Kaynak Kütüphanesi

Kullanıcının kaydettiği harici kaynaklar, araçlar ve bağlantılar.

| Özellik | Açıklama |
|---------|----------|
| **Link Kaydetme** | URL yapıştır → otomatik başlık, açıklama ve önizleme |
| **Kategorize Et** | Araç, Makale, Video, Podcast, Şablon |
| **Puanlama** | 1-5 yıldız ile değerlendir |
| **Topluluk Paylaşımı** | "Bu kaynağı topluluğa öner" butonu → en çok önerilen kaynaklar liste başına çıkar |

---

## A.3 — Workspace Sayfaları (URL Yapısı)

```
/panel/                         → Ana Dashboard
/panel/kitaplarim/              → Kitap Kütüphanesi
/panel/kitaplarim/[kitap-id]/   → Tekil Kitap İlerleme
/panel/calisma-kagitlari/       → Tüm Çalışma Kağıtları
/panel/notlarim/                → Not Defteri
/panel/hedeflerim/              → Hedef Takvimi
/panel/gorev-panosu/            → Trello Panosu
/panel/kaynaklar/               → Kaynak Kütüphanesi
/panel/kasam/                   → Para Kasası / Cüzdan
/panel/profil/                  → Profil & Rozetler
/panel/topluluk/                → Topluluk Alanı
/panel/erteleme/                → Erteleme Planı Modülü
/panel/pomodoro/                → Pomodoro Zamanlayıcı
```

---

# B. TRELLO BENZERİ GÖREV/PROJE YÖNETİMİ

---

## B.1 — Konsept

Her kullanıcı bir veya birden fazla **Kanban panosu** oluşturabilir. Panolar kitap bazlı otomatik oluşturulabilir veya kullanıcı kendi iş projesi için sıfırdan kurabilir.

**Felsefe:** "Öğrendiklerini uygulamaya dökmek için gerçek bir proje yönetim aracı — ekstra uygulama gerekmez."

---

## B.2 — Pano Tipleri

| Pano Tipi | Açıklama | Otomatik mi? |
|-----------|----------|--------------|
| **Kitap Panosu** | Her kitap satın alındığında otomatik oluşur. Bölümler ve görevler kart olarak gelir. | Evet |
| **90 Gün Panosu** | Ertelemeden Çıkış Sistemi (Kitap 04) ile entegre. 21+30+30 gün kolonları. | Evet |
| **İş Projesi Panosu** | Kullanıcı kendi iş fikrini proje olarak yönetir. AI ile İlk Gelirim (Kitap 05) ile bağlantılı. | Manuel |
| **Öğrenme Yol Haritası** | Tüm seri boyunca ilerleme. 10 kitap 10 kolon. | Evet |
| **Serbest Pano** | Kullanıcı istediği konuda pano oluşturur. | Manuel |

---

## B.3 — Kanban Yapısı

### Varsayılan Kolonlar (Kitap Panosu)

```
📋 Yapılacak  →  📖 Okunuyor  →  ✍️ Uygulanıyor  →  📸 Çıktı Hazır  →  ✅ Tamamlandı
```

### Varsayılan Kolonlar (İş Projesi Panosu)

```
💡 Fikir  →  🔬 Araştırma  →  🛠️ Geliştirme  →  🧪 Test  →  🚀 Lansed  →  📈 Ölçekleme
```

### Varsayılan Kolonlar (90 Gün Panosu)

```
🧠 Farkındalık (1-21)  →  🔧 Alışkanlık (22-51)  →  ⚡ Verimlilik (52-81)  →  🏔️ Sürdürme (82-111)
```

---

## B.4 — Kart Özellikleri

Her kart aşağıdaki bilgileri taşır:

| Alan | Açıklama |
|------|----------|
| **Başlık** | Görevin adı |
| **Açıklama** | Detaylı açıklama (Markdown destekli) |
| **Etiketler** | Renkli etiketler: Acil, Önemli, Hızlı Kazanım, Araştırma, Uygulama |
| **Son Tarih** | Deadline — süresi dolduğunda kart kırmızıya döner |
| **Zorluk Puanı** | 1-5 arası zorluk (XP çarpanını belirler) |
| **XP Ödülü** | Kart tamamlandığında kazanılacak XP |
| **DZ Coin Ödülü** | Kart tamamlandığında kazanılacak coin (gerçek para) |
| **Checklist** | Alt görevler (checkbox listesi) |
| **Ek Dosya** | Görsel, PDF, link ekleme |
| **Yorum** | Kullanıcı kendi notlarını ekleyebilir |
| **İlgili Kitap/Bölüm** | Hangi kitap bölümüyle bağlantılı |
| **AI Öneri** | AI bu görev için ipucu veya kaynak önerir |
| **Tamamlama Kanıtı** | Ekran görüntüsü veya link (zorunlu bazı görevlerde) |

---

## B.5 — Otomasyon Kuralları

| Tetikleyici | Aksiyon |
|-------------|---------|
| Kitap satın alındığında | İlgili kitap panosunu otomatik oluştur, bölümleri kart olarak ekle |
| Kart "Tamamlandı"ya taşındığında | XP + DZ Coin otomatik yatır, başarı bildirimi göster |
| Kart deadline'ı geçtiğinde | Bildirim gönder, kartı kırmızı renge dönüştür, streak risk uyarısı |
| Tüm kartlar tamamlandığında | Pano rozeti kazan, kutlama animasyonu, sonraki kitap önerisi |
| Kullanıcı 3 gün panoyu açmadığında | Push notification: "Panondaki 2 görev seni bekliyor!" |
| Checklist %100 olduğunda | Kartı otomatik "Tamamlandı"ya taşı önerisi |
| Yeni kitap bölümü okunduğunda | İlgili panoda yeni görev kartı otomatik oluşsun |

---

## B.6 — AI Görev Asistanı

Kullanıcı panoya serbest metin yazarak görev ekleyebilir, AI bunu yapılandırır:

```
Kullanıcı yazar: "Instagram için 2 haftalık içerik planı hazırlamam lazım"

AI üretir:
├── Kart: "Hedef kitle persona oluştur" (Zorluk: 2, XP: 20)
├── Kart: "Rakip hesapları analiz et (5 adet)" (Zorluk: 3, XP: 30)
├── Kart: "İçerik sütunları belirle (3-4 sütun)" (Zorluk: 2, XP: 20)
├── Kart: "2 haftalık takvim oluştur" (Zorluk: 4, XP: 40)
├── Kart: "İlk 5 gönderiyi hazırla" (Zorluk: 4, XP: 40)
└── Kart: "Yayınla ve sonuçları kaydet" (Zorluk: 3, XP: 30)
```

---

# C. DOPAMIN GAMİFİCATİON SİSTEMİ

---

## C.1 — Temel Felsefe

Mevcut XP/Level/Streak sistemi temel bir iskelet. Bunu bir **dopamin mühendisliği** sistemine dönüştürüyoruz. Hedef: kullanıcı her etkileşimde beyninde küçük bir dopamin patlaması yaşamalı.

**İlham Kaynakları:**
- Duolingo (streak ve kayıp korkusu)
- Habitica (görev = RPG ödülü)
- Starbucks Rewards (kademeli ödül kilidi)
- LinkedIn (ilerleme barı psikolojisi)

---

## C.2 — Dopamin Tetikleyicileri

### C.2.1 — Anlık Ödüller (Instant Gratification)

| Tetikleyici | Görsel/Ses Efekti | Psikolojik Mekanizma |
|-------------|-------------------|----------------------|
| **XP Kazanımı** | Altın parçacıklar yukarı uçar + "ding" sesi + XP sayısı animasyonla artar | Variable ratio reinforcement |
| **Level Atla** | Tam ekran parıltı efekti + yeni unvan kartı + konfeti animasyonu | Achievement unlocking |
| **Streak Devam** | Alev büyür + "X gün — yanan bir makine!" mesajı | Loss aversion (kaybetme korkusu) |
| **Rozet Kazan** | Rozet dönüp gelir + koleksiyona eklenir + paylaşım butonu | Collection instinct |
| **Çalışma Kağıdı Tamamla** | Yeşil tik animasyonu + "Harika iş!" mikro-kutlama | Completion satisfaction |
| **Kart Tamamla (Trello)** | Kart kayarak "Tamamlandı"ya gider + hafif titreşim + coin düşme sesi | Task completion dopamine |
| **Günlük Check-in** | Takvimde o gün yeşil yanar + streak sayacı +1 animasyonu | Consistency reinforcement |

### C.2.2 — Sürpriz Ödüller (Variable Rewards)

Sürpriz ödüller tahmin edilemezdir — bu beynin en güçlü dopamin tetikleyicisidir.

| Sürpriz | Açıklama | Olasılık |
|---------|----------|----------|
| **Bonus XP Çarkı** | Her 5. görev tamamlamada bir çark döner: 2x, 3x veya 5x XP | Her 5 görevde 1 |
| **Gizli Rozet** | Belirli kombinasyonlarda açılan gizli rozetler (kullanıcı koşulları bilmez) | Gizli tetikleyiciler |
| **Hazine Sandığı** | Haftalık sürpriz sandık: DZ Coin, ekstra prompt şablonu veya premium araç deneme | Haftalık 1 |
| **Loot Drop** | Rastgele görev tamamladığında "Nadir Eşya" düşer (özel çerçeve, profil efekti) | %5 şans |
| **Çift XP Saati** | Rastgele 1 saatlik süre boyunca tüm kazanımlar 2x | Haftada 1-2 kez |
| **Community Spotlight** | "Bu Haftanın Yıldızı" — en aktif kullanıcı herkesin dashboardunda görünür | Haftalık 1 |

### C.2.3 — Kayıp Korkusu (Loss Aversion)

İnsanlar kazanmaktan çok kaybetmekten korkar. Bu mekanizmayı etik sınırlar içinde kullanıyoruz.

| Mekanizma | Açıklama | Etik Sınır |
|-----------|----------|------------|
| **Streak Freeze** | Streaki kaybetmek üzeresin! 50 DZ Coin ile 1 gün dondur | Ayda max 2 kullanım |
| **XP Decay** | 3 gün inaktifse XP'nin %2'si kaybolur (max 50 XP) | Başlangıç seviyesinde yok, sadece Level 3+ |
| **Rozet Parlaklığı** | Aktif olmayan kullanıcıların rozetleri grileşir, aktif olunca tekrar parlar | Sadece görsel, kayıp yok |
| **Sıralama Kayması** | "Geçen hafta 15. sıradaydın, şimdi 23. sıraya düştün" bildirimi | Haftada max 1 bildirim |
| **Partner Challenge** | Eşleştiğin partner seni geçti! Yakalamak için 2 görev tamamla | Opt-in, zorunlu değil |

---

## C.3 — Seviye Sistemi (Yeniden Tasarım)

### Seviye Haritası

| Seviye | XP | Unvan | Görsel | Özel Ayrıcalık |
|--------|----|-------|--------|----------------|
| 1 | 0 | **Keşifçi** | Bronz çerçeve | Temel panel erişimi |
| 2 | 100 | **Başlangıç** | Bronz + 1 yıldız | Çalışma kağıtlarına erişim |
| 3 | 300 | **Öğrenci** | Gümüş çerçeve | Not defteri, 1 serbest pano |
| 4 | 600 | **Pratisyen** | Gümüş + 1 yıldız | Peer review yapabilir, 2 serbest pano |
| 5 | 1.000 | **Uygulayıcı** | Altın çerçeve | AI asistana erişim, 3 serbest pano |
| 6 | 1.500 | **Stratejist** | Altın + 1 yıldız | Toplulukta mentor rozeti, referral sistemi |
| 7 | 2.200 | **Uzman** | Platin çerçeve | İçerik oluşturma hakkı (para kazanma), sınırsız pano |
| 8 | 3.000 | **Usta** | Platin + 1 yıldız | Topluluk eğitmeni olabilir, premium araç erişimi |
| 9 | 4.000 | **Mentor** | Elmas çerçeve | Mentörlük yaparak DZ Coin kazanır |
| 10 | 5.500 | **Zirve** | Elmas + Taç | VIP grup, yıllık etkinlik daveti, gelir paylaşım programı |

### Her Level-Up'ta Ne Olur

```
Level Up Anı:
1. Ekran kararır (0.5s)
2. Altın ışık patlaması (merkeze doğru)
3. Yeni seviye numarası büyük fontla belirir
4. Yeni unvan kartı kayarak gelir
5. Açılan ayrıcalıklar listesi gösterilir
6. Konfeti yağmuru (2s)
7. "Paylaş" butonu (Twitter/Instagram story formatında)
8. Bonus DZ Coin ödülü (+50 Coin)
```

---

## C.4 — Rozet Koleksiyonu (Genişletilmiş)

### Ana Rozetler (Kitap Bazlı)

| Rozet | Koşul | XP Bonus | DZ Coin |
|-------|-------|----------|---------|
| "AI Temelleri" | Kitap 01 tamamla | +100 | +25 |
| "Prompt Ustası" | Kitap 02 + 50 prompt yaz | +150 | +40 |
| "Araç Seçici" | Kitap 03 + kişisel stack kur | +100 | +30 |
| "Odak Ustası" | Kitap 04 + 90 gün tamamla | +200 | +75 |
| "İlk Gelir" | Kitap 05 + ilk satışı yap | +250 | +100 |
| "İçerik Mimarı" | Kitap 06 tamamla | +150 | +50 |
| "Otomasyon Mimarı" | Kitap 07 tamamla | +200 | +60 |
| "Ölçek Stratejisti" | Kitap 08 tamamla | +200 | +60 |
| "AI Lideri" | Kitap 09 tamamla | +250 | +80 |
| "AI Çağının Mimarı" | Kitap 10 tamamla | +500 | +200 |

### Gizli Rozetler

| Rozet | Gizli Koşul | Nadir mi? |
|-------|-------------|-----------|
| "Gece Kuşu" | Gece 00:00-05:00 arası 10 görev tamamla | Nadir |
| "Erken Kalkıcı" | 06:00-07:00 arası 7 gün üst üste check-in | Nadir |
| "Maratoncu" | Tek seansta 3 saat kesintisiz çalış (Pomodoro ile) | Çok Nadir |
| "Sosyal Kelebek" | 20 farklı kullanıcıya peer review yap | Nadir |
| "Hazine Avcısı" | 10 hazine sandığı aç | Normal |
| "Mükemmeliyetçi" | Bir kitabın tüm çalışma kağıtlarını %100 tamamla | Nadir |
| "İlk Adım" | Platforma ilk giriş + ilk çalışma kağıdını doldur | Normal |
| "Para Makinesi" | DZ Coin ile ilk gerçek para çekimini yap | Normal |
| "Mentor Ruhu" | 5 kullanıcıya mentörlük yap | Çok Nadir |
| "Koleksiyoner" | 25 rozet topla | Efsanevi |

### Rozet Nadirlikleri ve Çerçeveleri

| Nadirlik | Renk | Parlaklık | Sahip Yüzdesi |
|----------|------|-----------|---------------|
| Normal | Yeşil | Mat | %40+ |
| Nadir | Mavi | Hafif parlak | %15-40 |
| Çok Nadir | Mor | Parlak + hafif glow | %5-15 |
| Efsanevi | Altın | Yoğun glow + parçacık efekti | <%5 |

---

## C.5 — Streak Sistemi (Geliştirilmiş)

| Streak Günü | Bonus | Özel Efekt |
|-------------|-------|------------|
| 3 gün | +10% XP bonusu | Küçük alev ikonu |
| 7 gün | +20% XP bonusu + 10 DZ Coin | Orta alev + "Bir hafta!" mesajı |
| 14 gün | +30% XP bonusu + 25 DZ Coin | Büyük alev + mavi aura |
| 21 gün | +40% XP bonusu + 50 DZ Coin + "3 Hafta" rozeti | Ateş topu animasyonu |
| 30 gün | +50% XP bonusu + 100 DZ Coin + "Ay" rozeti | Altın alev + yıldız yağmuru |
| 60 gün | +60% XP bonusu + 200 DZ Coin + "2 Ay" rozeti | Platin alev + çift parçacık |
| 90 gün | +75% XP bonusu + 500 DZ Coin + "Çeyrek" rozeti (Çok Nadir) | Elmas alev + gökkuşağı efekti |
| 180 gün | +100% XP bonusu + 1.000 DZ Coin + "Yarı Yıl" rozeti (Efsanevi) | Kozmik alev |
| 365 gün | +150% XP bonusu + 5.000 DZ Coin + "Yıl" rozeti (Efsanevi) + Özel profil çerçevesi | Süpernova efekti |

---

## C.6 — Challenge Sistemi

### Bireysel Challengelar

| Challenge | Süre | Ödül | Açıklama |
|-----------|------|------|----------|
| "Hız Treni" | 24 saat | 3x XP + 50 Coin | 24 saat içinde 5 görev tamamla |
| "Kitap Kurdu" | 1 hafta | 200 XP + 100 Coin | 1 haftada tam bir kitap bitir |
| "Prompt Master" | 3 gün | 150 XP + 75 Coin | 3 günde 20 farklı prompt yaz ve test et |
| "Deep Worker" | 1 gün | 100 XP + 50 Coin | Bugün 4 Pomodoro seansı tamamla |
| "Sosyal Arı" | 1 hafta | 100 XP + 50 Coin | 5 peer review yap |

### Topluluk Challengeları

| Challenge | Süre | Ödül | Açıklama |
|-----------|------|------|----------|
| "Haftalık Sprint" | 7 gün | Top 10: 500 Coin | Bu hafta en çok XP kazanan 10 kişi |
| "Kitap Yarışı" | 30 gün | Top 3: 1.000 Coin | Bir ayda en çok kitap tamamlayan |
| "Mentor Maratonu" | 14 gün | Top 5: 750 Coin | En çok peer review yapan |
| "Streak Şampiyonası" | Sürekli | En uzun streak: 2.000 Coin | Platform genelinde en uzun streak |

---

## C.7 — Pomodoro Sistemi (Geliştirilmiş)

| Özellik | Açıklama |
|---------|----------|
| **Zamanlayıcı** | 25 dk çalışma + 5 dk mola (özelleştirilebilir) |
| **Seans Sayacı** | Günlük tamamlanan Pomodoro sayısı (hedef: 4-8) |
| **Odak Modu** | Pomodoro aktifken bildirimler susturulur, ekranda sadece timer |
| **XP Ödülü** | Her tamamlanan Pomodoro: +10 XP + 5 DZ Coin |
| **Ambient Ses** | Kahve dükkanı, yağmur, orman, lo-fi müzik seçenekleri |
| **Pomodoro Sıralama** | Bu hafta en çok Pomodoro yapan Top 10 |
| **Uzun Mola** | Her 4 Pomodoro'dan sonra 15-20 dk uzun mola + mini oyun |
| **İstatistik** | Haftalık/aylık Pomodoro istatistikleri, en verimli saat grafikleri |

---

# D. GERÇEK PARA KAZANMA MEKANİZMASI

---

## D.1 — Temel Felsefe

> "Bedavaya para kazanmak yok. Değer üret, karşılığını al."

Kullanıcılar gerçek emek harcayarak, gerçek değer üreterek para kazanır. Para kazanma mekanizması şeffaf ve hak bazlıdır.

---

## D.2 — DZ Coin Sistemi

### DZ Coin Nedir?

DZ Coin, platformun iç para birimidir. Kullanıcılar görevleri tamamlayarak, toplulukta değer üreterek ve başkalarına yardım ederek DZ Coin kazanır. DZ Coin gerçek paraya çevrilebilir.

### DZ Coin Kazanma Yolları

| Yol | Kazanım | Açıklama |
|-----|---------|----------|
| **Görev Tamamlama** | 5-50 Coin/görev | Zorluk seviyesine göre değişir |
| **Çalışma Kağıdı** | 10-30 Coin/kağıt | Kaliteli doldurulmuş kağıtlar daha fazla kazandırır |
| **Streak Bonusu** | 10-5.000 Coin | Streak uzunluğuna göre artan ödül |
| **Level Up** | 50 Coin/level | Her seviye atlayışta sabit bonus |
| **Peer Review** | 15 Coin/review | Başka kullanıcının çıktısını değerlendir |
| **İçerik Üretimi** | 100-500 Coin/içerik | Level 7+ kullanıcılar topluluk için içerik oluşturabilir |
| **Mentörlük** | 200 Coin/mentee/ay | Level 9+ kullanıcılar mentörlük yapabilir |
| **Referral** | 100 Coin/referral | Yeni üye getir (üye aktif olduktan sonra) |
| **Challenge Kazanma** | 50-2.000 Coin | Yarışmaları kazan |
| **Gizli Rozet** | 25-100 Coin | Gizli rozetleri keşfet |
| **Bug Report** | 50 Coin | Platform hatası bildir ve onaylansın |
| **Topluluk Yardımı** | 10-50 Coin | Forum/sohbette başkalarına yardım et, upvote al |

### DZ Coin → Gerçek Para Çevirme

| Parametre | Değer |
|-----------|-------|
| **Çevrim Oranı** | 100 DZ Coin = 1 TL (başlangıç oranı, arz-talebe göre güncellenir) |
| **Minimum Çekim** | 500 DZ Coin (= 5 TL) |
| **Çekim Yöntemleri** | Banka havalesi (IBAN), Papara, ininal |
| **Çekim Süresi** | 3-5 iş günü |
| **Aylık Çekim Limiti** | Level bazlı (aşağıda tablo) |
| **Platform Komisyonu** | %10 (çekim sırasında) |

### Level Bazlı Çekim Limitleri

| Level | Aylık Max Çekim | Neden? |
|-------|-----------------|--------|
| 1-4 | Çekim yok | Önce öğren ve uygula |
| 5 | 50 TL/ay | İlk kazanımları dene |
| 6 | 200 TL/ay | Referral + peer review geliri |
| 7 | 1.000 TL/ay | İçerik üretimi geliri başlar |
| 8 | 3.000 TL/ay | Topluluk eğitmenliği geliri |
| 9 | 10.000 TL/ay | Mentörlük geliri |
| 10 | Limitsiz | VIP — tüm gelir kanalları açık |

---

## D.3 — Gelir Kanalları (Kullanıcı Tarafı)

### Kanal 1: İçerik Üretimi (Level 7+)

Kullanıcılar platforma özel içerik üretir ve her görüntülenme/beğeni için DZ Coin kazanır.

| İçerik Tipi | Kazanım | Koşul |
|-------------|---------|-------|
| Blog Yazısı | 100 Coin + 5 Coin/100 görüntülenme | Min 800 kelime, moderasyondan geçmeli |
| Video Tutorial | 200 Coin + 10 Coin/100 görüntülenme | Min 3 dakika, konuyla ilgili |
| Prompt Şablonu | 50 Coin + 3 Coin/kullanım | Topluluk tarafından 4+ yıldız |
| Çalışma Kağıdı Şablonu | 150 Coin + 5 Coin/kullanım | Admin onaylı |
| Araç İncelemesi | 75 Coin + 5 Coin/100 görüntülenme | Min 500 kelime, deneyim bazlı |
| Vaka Çalışması | 300 Coin + 10 Coin/100 görüntülenme | Gerçek sonuçlarla desteklenmiş |

### Kanal 2: Mentörlük (Level 9+)

| Mentörlük Tipi | Kazanım | Açıklama |
|----------------|---------|----------|
| 1:1 Mentörlük | 200 Coin/mentee/ay | Max 5 mentee aynı anda |
| Grup Mentörlük | 500 Coin/grup/ay | 5-10 kişilik gruplar |
| Haftalık AMA | 300 Coin/seans | "Ask Me Anything" canlı oturum |

### Kanal 3: Referral Programı (Level 6+)

| Aşama | Kazanım |
|-------|---------|
| Yeni üye kaydoldu | 50 Coin |
| Yeni üye ilk kitabı satın aldı | 100 Coin |
| Yeni üye Level 3'e ulaştı | 200 Coin |
| Yeni üye kendi referralını getirdi | 50 Coin (2. kademe) |

### Kanal 4: Affiliate Satış

Kullanıcılar kitap ve ürünleri kendi referans linkleriyle paylaşır.

| Ürün | Komisyon | Ödeme |
|------|----------|-------|
| Kitap satışı | %15 | DZ Coin olarak |
| Premium üyelik | %20 (ilk ay) | DZ Coin olarak |
| Workshop/Etkinlik bileti | %10 | DZ Coin olarak |

### Kanal 5: Gerçek İş Geliri (Platform Dışı)

Kitaplar kullanıcıya gerçek dünyada para kazandıracak beceriler öğretir:

| Kitap | Öğrettiği Gelir Modeli | Tahmini Potansiyel |
|-------|------------------------|--------------------|
| Kitap 02 (Prompt) | Freelance prompt yazarlığı | 5.000-15.000 TL/ay |
| Kitap 05 (İlk Gelir) | Dijital ürün, danışmanlık, Instagram satış | 10.000-50.000 TL/ay |
| Kitap 06 (İçerik) | AI ile içerik ajansı | 20.000-100.000 TL/ay |
| Kitap 07 (Otomasyon) | Otomasyon hizmeti satışı | 15.000-75.000 TL/ay |

Platformda bu gelirleri raporlayan kullanıcılar "Gerçek Gelir" rozeti kazanır ve vaka çalışması olarak öne çıkarılır (izinle).

---

## D.4 — Para Kazanma Yol Haritası (Kullanıcı Perspektifi)

```
Level 1-4: ÖĞREN
├── Kitapları oku, çalışma kağıtlarını doldur
├── XP kazan, level atla
├── DZ Coin biriktirmeye başla (henüz çekim yok)
└── Beceriler geliştir

Level 5-6: İLK KAZANIMLAR
├── İlk DZ Coin çekimini yap (küçük ama motivasyon verici)
├── Referral programına katıl
├── Peer review yaparak ek kazanç
└── Gerçek dünyada ilk freelance işini al (Kitap 05 sayesinde)

Level 7-8: DÜZENLI GELİR
├── Platform içi içerik üret (blog, şablon, inceleme)
├── Topluluk eğitmenliği yap
├── Affiliate satış geliri
├── Gerçek dünyada düzenli müşteri portföyü
└── Aylık 1.000-3.000 TL platform geliri + iş geliri

Level 9-10: ÖLÇEKLEME
├── 1:1 ve grup mentörlük
├── Vaka çalışmaları yayınla
├── Workshop/webinar düzenle
├── 2. kademe referral geliri
└── Aylık 10.000+ TL platform geliri + iş geliri
```

---

## D.5 — Platform Gelir Modeli (İşletme Tarafı)

DZ Coin sistemi platformun da kazanmasını sağlar:

| Gelir Kaynağı | Açıklama |
|---------------|----------|
| **Kitap Satışı** | Her kitap 149-299 TL arası |
| **Premium Üyelik** | Aylık 99 TL / Yıllık 799 TL — tüm kitaplara + premium özelliklere erişim |
| **DZ Coin Komisyonu** | Her çekimde %10 komisyon |
| **Sponsorluk** | AI araç firmaları platformda yer alır (doğal entegrasyon) |
| **Workshop/Etkinlik** | Ücretli online/offline etkinlikler |
| **Kurumsal Paket** | Şirketlere toplu lisans (10+ kullanıcı) |

---

# E. BAĞIMLILIK YAPAN UX TASARIMI

---

## E.1 — Onboarding Akışı (İlk 5 Dakika)

İlk 5 dakika kullanıcının platformda kalıp kalmayacağını belirler.

```
Adım 1 — Kayıt (30s)
├── İsim, e-posta, şifre (minimal form)
└── Google/Apple ile giriş seçeneği

Adım 2 — Profil Avatarı Seçimi (20s)
├── 12 farklı avatar karakter (animasyonlu)
└── Kullanıcı adı seçimi

Adım 3 — "Neden Buradasın?" Quiz (60s)
├── "AI öğrenmek istiyorum" / "Para kazanmak istiyorum" / "Ertelemeyi yenmek istiyorum" / "Hepsi"
├── Cevaplara göre kişiselleştirilmiş yol haritası oluştur
└── İlk hedefi belirle

Adım 4 — İlk XP Kazanımı (30s)
├── "Profil bilgilerini tamamla" → 25 XP (anında animasyon!)
├── "İlk hedefini belirle" → 25 XP
└── Toplam: 50 XP — Level 1'den Level 2'ye atlayış yakın!

Adım 5 — İlk Kitap Önerisi (30s)
├── Quiz cevaplarına göre önerilen kitap
├── "Hemen Başla" butonu (parlak, nabız atan animasyon)
└── "İlk bölümü oku → ilk çalışma kağıdını doldur → ilk rozetini kazan" call-to-action

Adım 6 — Dashboard'a Hoş Geldin (30s)
├── Tüm widgetlar kısa açıklamalarla tanıtılır (tooltip tour)
├── "Günlük hedefin: 1 bölüm oku" şeklinde ilk görev atanır
└── AI asistan: "Merhaba! Ben senin DZ asistanınım. Herhangi bir sorunda bana sor."
```

---

## E.2 — Bildirim Stratejisi

### Push Notifications

| Bildirim | Zamanlama | Mesaj Örneği |
|----------|-----------|--------------|
| **Sabah Hatırlatma** | 09:00 | "Günaydın! Bugünkü hedefin seni bekliyor. ☀️" |
| **Streak Risk** | 20:00 (aktivite yoksa) | "Streak'in tehlikede! Bugün 1 görev tamamla ve alevi koru. 🔥" |
| **Level Yakın** | XP eşiğe %90 yaklaştığında | "Level 5'e sadece 50 XP kaldı! Son bir görevle atla. ⬆️" |
| **Challenge Başladı** | Challenge başlangıcında | "Yeni challenge: 'Hız Treni' başladı! 24 saat, 5 görev, 3x XP. 🚂" |
| **Topluluk** | Yorum/beğeni aldığında | "Ahmet senin çıktını beğendi. +5 DZ Coin kazandın! 👏" |
| **Sürpriz** | Rastgele (haftada 1-2) | "Sana bir sürpriz hazırladık! Giriş yap ve hazine sandığını aç. 🎁" |
| **Haftalık Özet** | Pazar 18:00 | "Bu hafta: 350 XP · 7 görev · 3. sıra. Harika bir haftaydı! 📊" |

### Bildirim Kuralları

- Günde max 3 bildirim
- Kullanıcı tercihine göre kapat/azalt
- Gece 22:00-08:00 arası bildirim gönderme
- İlk 7 günde daha sık (günde 2-3), sonra azalt (günde 1)
- Bildirime tıklama oranı düşerse sıklığı otomatik azalt

---

## E.3 — Mikro-Etkileşimler ve Animasyonlar

| Etkileşim | Animasyon | Süre |
|-----------|-----------|------|
| **Butona tıklama** | Hafif scale-down (0.95) + geri bounce | 200ms |
| **XP kazanımı** | Rakam yukarı kayarak artar + altın parıltı | 800ms |
| **Görev tamamlama** | Yeşil tik + confetti burst | 1.2s |
| **Level up** | Full-screen overlay + parçacık patlaması | 3s |
| **Streak artışı** | Alev büyüme animasyonu | 600ms |
| **Rozet kazanımı** | Rozet dönerek gelir + glow efekti | 1.5s |
| **Kart sürükleme (Trello)** | Smooth drag + hedef kolon highlight | Sürekli |
| **Progress bar** | Yumuşak dolma + renk geçişi | 1s |
| **Coin kazanımı** | Coin düşme animasyonu + "ching" sesi | 500ms |
| **Hata/Uyarı** | Hafif titreşim + kırmızı flash | 300ms |

---

## E.4 — Ses Tasarımı

| Olay | Ses | İsteğe Bağlı? |
|------|-----|----------------|
| **XP kazanımı** | Kısa, tatlı "ding" (Duolingo benzeri) | Evet |
| **Level up** | Yükselen melodi (3 nota: do-mi-sol) | Evet |
| **Streak devam** | Kısa "whoosh" + alev sesi | Evet |
| **Rozet kazanımı** | Metalik "unlock" sesi | Evet |
| **Coin kazanımı** | "Ching-ching" para sesi | Evet |
| **Görev tamamlama** | Tatmin edici "pop" | Evet |
| **Pomodoro bitti** | Çan sesi | Evet |
| **Mola bitti** | Yumuşak zil | Evet |

Tüm sesler Settings > Ses ayarlarından açılıp kapatılabilir.

---

## E.5 — Sosyal Özellikler

### Profil Kartı

Her kullanıcının herkese açık profil kartı:

```
┌─────────────────────────────────────┐
│  [Avatar]   Kullanıcı Adı           │
│  ⭐ Level 7 — Uzman                 │
│  🔥 45 Gün Streak                   │
│  📊 3.250 XP                        │
│  💰 1.200 DZ Coin                   │
│  📚 5/10 Kitap Tamamlandı           │
│                                     │
│  [Rozet 1] [Rozet 2] [Rozet 3] ... │
│                                     │
│  Son Aktivite: 2 saat önce          │
│  [Profili Gör] [Mesaj Gönder]       │
└─────────────────────────────────────┘
```

### Leaderboard Tabloları

| Tablo | Dönem | Görünürlük |
|-------|-------|------------|
| **Haftalık XP** | Pazartesi-Pazar | Herkes |
| **Aylık XP** | 1-30/31 | Herkes |
| **Tüm Zamanlar** | Başlangıçtan beri | Herkes |
| **Streak Sıralama** | Aktif streak | Herkes |
| **Coin Sıralama** | Toplam kazanılan | Level 5+ |
| **Kitap Sayısı** | Tamamlanan kitap | Herkes |
| **Mentor Sıralama** | Mentörlük puanı | Level 9+ |

### Topluluk Alanı

| Özellik | Açıklama |
|---------|----------|
| **Forum** | Kitap bazlı tartışma konuları |
| **Soru-Cevap** | Stack Overflow benzeri: soru sor, cevap ver, upvote al, DZ Coin kazan |
| **Showcase** | Kullanıcılar çıktılarını (iş, ürün, sonuç) sergiler |
| **Haftalık Spotlight** | En çok katkı yapan kullanıcı öne çıkarılır |
| **DM** | Kullanıcılar arası özel mesajlaşma |

---

# F. TEKNİK MİMARİ (WordPress Entegrasyonu)

---

## F.1 — Güncellenmiş Plugin Yapısı

```
/wp-content/plugins/dz-dashboard/
├── dz-dashboard.php                ← Ana plugin dosyası
├── /includes/
│   ├── class-xp-manager.php        ← XP hesaplama, level, XP log
│   ├── class-streak-manager.php    ← Streak kontrolü, freeze, cron
│   ├── class-progress.php          ← Kitap/bölüm ilerleme CRUD
│   ├── class-procrast.php          ← Erteleme Planı modülü
│   ├── class-badges.php            ← Rozet yönetimi (gizli rozetler dahil)
│   ├── class-workspace.php         ← Çalışma Alanı yönetimi (YENİ)
│   ├── class-worksheets.php        ← Çalışma Kağıtları CRUD (YENİ)
│   ├── class-kanban.php            ← Trello Pano yönetimi (YENİ)
│   ├── class-wallet.php            ← DZ Coin cüzdan yönetimi (YENİ)
│   ├── class-rewards.php           ← Dopamin ödül motoru (YENİ)
│   ├── class-challenges.php        ← Challenge sistemi (YENİ)
│   ├── class-referral.php          ← Referral program yönetimi (YENİ)
│   ├── class-leaderboard.php       ← Sıralama tabloları (YENİ)
│   ├── class-notes.php             ← Not defteri CRUD (YENİ)
│   ├── class-ai-assistant.php      ← AI görev asistanı (YENİ)
│   ├── class-notifications.php     ← Bildirim yönetimi (YENİ)
│   └── class-community.php         ← Topluluk/forum yönetimi (YENİ)
│
├── /shortcodes/
│   ├── [dz_dashboard]              ← Ana panel
│   ├── [dz_books]                  ← Kitaplarım
│   ├── [dz_procrast]               ← Erteleme Planı
│   ├── [dz_pomodoro]               ← Pomodoro
│   ├── [dz_profile]                ← Profil
│   ├── [dz_workspace]              ← Çalışma Alanı (YENİ)
│   ├── [dz_worksheets]             ← Çalışma Kağıtları (YENİ)
│   ├── [dz_kanban]                 ← Trello Panosu (YENİ)
│   ├── [dz_wallet]                 ← Para Kasası (YENİ)
│   ├── [dz_leaderboard]            ← Sıralama (YENİ)
│   ├── [dz_notes]                  ← Notlarım (YENİ)
│   ├── [dz_challenges]             ← Challengelar (YENİ)
│   ├── [dz_community]              ← Topluluk (YENİ)
│   └── [dz_referral]               ← Referral Panel (YENİ)
│
├── /assets/
│   ├── /css/
│   │   ├── dz-panel.css            ← Ana panel stilleri
│   │   ├── dz-kanban.css           ← Kanban pano stilleri (YENİ)
│   │   ├── dz-animations.css       ← Dopamin animasyonları (YENİ)
│   │   └── dz-worksheets.css       ← Çalışma kağıdı stilleri (YENİ)
│   ├── /js/
│   │   ├── dz-panel.js             ← Ana panel JS
│   │   ├── dz-kanban.js            ← Drag & drop Kanban (YENİ)
│   │   ├── dz-rewards.js           ← Animasyon + ses efektleri (YENİ)
│   │   ├── dz-pomodoro.js          ← Pomodoro timer
│   │   ├── dz-worksheets.js        ← Çalışma kağıdı etkileşimleri (YENİ)
│   │   └── dz-wallet.js            ← Cüzdan işlemleri (YENİ)
│   ├── /sounds/                     ← Ses efektleri (YENİ)
│   │   ├── xp-gain.mp3
│   │   ├── level-up.mp3
│   │   ├── coin-drop.mp3
│   │   ├── badge-unlock.mp3
│   │   ├── task-complete.mp3
│   │   ├── pomodoro-end.mp3
│   │   └── streak-fire.mp3
│   └── /images/
│       ├── /badges/                 ← Rozet görselleri
│       ├── /avatars/                ← Avatar seçenekleri (YENİ)
│       ├── /frames/                 ← Seviye çerçeveleri (YENİ)
│       └── /particles/              ← Parçacık efekt spriteları (YENİ)
│
├── /templates/
│   ├── dashboard.php
│   ├── kanban-board.php             ← Kanban pano şablonu (YENİ)
│   ├── worksheet-form.php           ← Çalışma kağıdı formu (YENİ)
│   ├── wallet-dashboard.php         ← Cüzdan sayfası (YENİ)
│   ├── leaderboard.php              ← Sıralama sayfası (YENİ)
│   ├── profile-card.php             ← Profil kartı (YENİ)
│   ├── reward-popup.php             ← Ödül popup şablonu (YENİ)
│   └── community-feed.php           ← Topluluk akışı (YENİ)
│
└── /api/                             ← REST API endpoints (YENİ)
    ├── class-api-xp.php
    ├── class-api-kanban.php
    ├── class-api-wallet.php
    ├── class-api-worksheets.php
    ├── class-api-challenges.php
    ├── class-api-leaderboard.php
    └── class-api-community.php
```

---

## F.2 — Ek Eklentiler

| # | Eklenti | Ne İşe Yarar | Neden Gerekli |
|---|---------|---------------|---------------|
| 15 | **OneSignal** | Push notification | Bildirim stratejisi için |
| 16 | **BuddyPress** | Topluluk, profil, mesajlaşma | Sosyal özellikler için |
| 17 | **bbPress** | Forum | Topluluk forumu için |
| 18 | **iyzico/Stripe Plugin** | Ödeme altyapısı | Kitap satışı + DZ Coin çekimi için |
| 19 | **WP Mail SMTP** | E-posta gönderimi | Bildirim e-postaları için |

---

## F.3 — REST API Endpoints

| Endpoint | Method | Açıklama |
|----------|--------|----------|
| `/wp-json/dz/v1/xp` | GET/POST | XP sorgula / XP ekle |
| `/wp-json/dz/v1/streak` | GET | Streak durumu |
| `/wp-json/dz/v1/kanban/boards` | GET/POST | Pano listesi / yeni pano oluştur |
| `/wp-json/dz/v1/kanban/boards/{id}/cards` | GET/POST/PATCH | Kartları yönet |
| `/wp-json/dz/v1/kanban/cards/{id}/move` | PATCH | Kartı kolon arası taşı |
| `/wp-json/dz/v1/wallet/balance` | GET | Bakiye sorgula |
| `/wp-json/dz/v1/wallet/withdraw` | POST | Çekim talebi |
| `/wp-json/dz/v1/wallet/transactions` | GET | İşlem geçmişi |
| `/wp-json/dz/v1/worksheets/{book_id}` | GET | Kitaba ait çalışma kağıtları |
| `/wp-json/dz/v1/worksheets/{id}/submit` | POST | Çalışma kağıdı gönder |
| `/wp-json/dz/v1/challenges` | GET | Aktif challengelar |
| `/wp-json/dz/v1/challenges/{id}/join` | POST | Challenge'a katıl |
| `/wp-json/dz/v1/leaderboard/{type}` | GET | Sıralama tablosu |
| `/wp-json/dz/v1/notes` | GET/POST/PATCH/DELETE | Not CRUD |
| `/wp-json/dz/v1/rewards/surprise` | GET | Sürpriz ödül kontrolü |
| `/wp-json/dz/v1/referral/code` | GET | Referral kodunu al |
| `/wp-json/dz/v1/community/posts` | GET/POST | Topluluk gönderileri |

---

# G. VERİTABANI ŞEMASI

---

## G.1 — Yeni Tablolar

### `dz_wallet` — Kullanıcı Cüzdanı

```sql
CREATE TABLE dz_wallet (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    balance INT DEFAULT 0,
    total_earned INT DEFAULT 0,
    total_withdrawn INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES wp_users(ID)
);
```

### `dz_wallet_transactions` — Cüzdan İşlemleri

```sql
CREATE TABLE dz_wallet_transactions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    type ENUM('earn', 'spend', 'withdraw', 'bonus', 'referral', 'content', 'mentor') NOT NULL,
    amount INT NOT NULL,
    source VARCHAR(100),
    description TEXT,
    status ENUM('completed', 'pending', 'cancelled') DEFAULT 'completed',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES wp_users(ID)
);
```

### `dz_kanban_boards` — Kanban Panoları

```sql
CREATE TABLE dz_kanban_boards (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    type ENUM('book', 'project', 'ninety_day', 'roadmap', 'free') NOT NULL,
    book_id BIGINT NULL,
    columns_json TEXT,
    is_archived TINYINT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES wp_users(ID)
);
```

### `dz_kanban_cards` — Kanban Kartları

```sql
CREATE TABLE dz_kanban_cards (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    board_id BIGINT NOT NULL,
    column_key VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    labels_json TEXT,
    due_date DATE NULL,
    difficulty INT DEFAULT 1,
    xp_reward INT DEFAULT 0,
    coin_reward INT DEFAULT 0,
    checklist_json TEXT,
    attachments_json TEXT,
    related_book_id BIGINT NULL,
    related_chapter INT NULL,
    position INT DEFAULT 0,
    is_completed TINYINT DEFAULT 0,
    completed_at DATETIME NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (board_id) REFERENCES dz_kanban_boards(id) ON DELETE CASCADE
);
```

### `dz_worksheets` — Çalışma Kağıtları

```sql
CREATE TABLE dz_worksheets (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    book_id BIGINT NOT NULL,
    chapter_num INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    type ENUM('reflection', 'action_plan', 'matrix', 'quiz', 'upload', 'video', 'peer_review') NOT NULL,
    questions_json TEXT NOT NULL,
    xp_reward INT DEFAULT 15,
    coin_reward INT DEFAULT 10,
    is_required TINYINT DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### `dz_worksheet_submissions` — Çalışma Kağıdı Gönderileri

```sql
CREATE TABLE dz_worksheet_submissions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    worksheet_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    answers_json TEXT NOT NULL,
    score INT NULL,
    status ENUM('submitted', 'reviewed', 'revision_needed') DEFAULT 'submitted',
    reviewer_id BIGINT NULL,
    review_comment TEXT NULL,
    xp_earned INT DEFAULT 0,
    coin_earned INT DEFAULT 0,
    submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    reviewed_at DATETIME NULL,
    FOREIGN KEY (worksheet_id) REFERENCES dz_worksheets(id),
    FOREIGN KEY (user_id) REFERENCES wp_users(ID)
);
```

### `dz_notes` — Kullanıcı Notları

```sql
CREATE TABLE dz_notes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(255),
    content LONGTEXT,
    book_id BIGINT NULL,
    chapter_num INT NULL,
    tags_json TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES wp_users(ID)
);
```

### `dz_challenges` — Challengelar

```sql
CREATE TABLE dz_challenges (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    type ENUM('individual', 'community') NOT NULL,
    duration_hours INT NOT NULL,
    goal_type VARCHAR(50) NOT NULL,
    goal_value INT NOT NULL,
    xp_reward INT DEFAULT 0,
    coin_reward INT DEFAULT 0,
    max_participants INT NULL,
    starts_at DATETIME NOT NULL,
    ends_at DATETIME NOT NULL,
    is_active TINYINT DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### `dz_challenge_participants` — Challenge Katılımları

```sql
CREATE TABLE dz_challenge_participants (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    challenge_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    progress INT DEFAULT 0,
    is_completed TINYINT DEFAULT 0,
    completed_at DATETIME NULL,
    joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (challenge_id) REFERENCES dz_challenges(id),
    FOREIGN KEY (user_id) REFERENCES wp_users(ID)
);
```

### `dz_referrals` — Referral Takibi

```sql
CREATE TABLE dz_referrals (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    referrer_id BIGINT NOT NULL,
    referred_id BIGINT NOT NULL,
    referral_code VARCHAR(20) NOT NULL,
    status ENUM('registered', 'first_purchase', 'level3', 'active') DEFAULT 'registered',
    total_coins_earned INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (referrer_id) REFERENCES wp_users(ID),
    FOREIGN KEY (referred_id) REFERENCES wp_users(ID)
);
```

### `dz_rewards_log` — Ödül Logu

```sql
CREATE TABLE dz_rewards_log (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    reward_type ENUM('surprise_box', 'loot_drop', 'double_xp', 'bonus_spin', 'spotlight') NOT NULL,
    reward_value TEXT,
    triggered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES wp_users(ID)
);
```

### `dz_daily_activity` — Günlük Aktivite

```sql
CREATE TABLE dz_daily_activity (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    activity_date DATE NOT NULL,
    xp_earned INT DEFAULT 0,
    coins_earned INT DEFAULT 0,
    tasks_completed INT DEFAULT 0,
    pomodoros_completed INT DEFAULT 0,
    worksheets_completed INT DEFAULT 0,
    study_minutes INT DEFAULT 0,
    UNIQUE KEY (user_id, activity_date),
    FOREIGN KEY (user_id) REFERENCES wp_users(ID)
);
```

---

# H. LANSMAN YOL HARİTASI

---

## H.1 — Geliştirme Fazları

### Faz 0: MVP Temel (Mart 2026) — Mevcut Plan

Mevcut PART4'teki temel panel: XP, streak, kitap takibi, erteleme planı.

### Faz 1: Workspace + Çalışma Kağıtları (Nisan 2026)

| Görev | Öncelik | Süre |
|-------|---------|------|
| Çalışma kağıdı sistemi geliştir | P0 | 2 hafta |
| Not defteri modülü | P1 | 1 hafta |
| Hedef takvimi | P1 | 1 hafta |
| Kaynak kütüphanesi | P2 | 3 gün |

### Faz 2: Trello Pano Sistemi (Mayıs 2026)

| Görev | Öncelik | Süre |
|-------|---------|------|
| Kanban pano core (drag & drop) | P0 | 2 hafta |
| Otomatik kitap panosu oluşturma | P0 | 3 gün |
| Kart özellikleri (etiket, checklist, deadline) | P0 | 1 hafta |
| Otomasyon kuralları | P1 | 1 hafta |
| AI görev asistanı | P2 | 1 hafta |

### Faz 3: Dopamin Gamification (Haziran 2026)

| Görev | Öncelik | Süre |
|-------|---------|------|
| Animasyon ve ses efektleri | P0 | 2 hafta |
| Sürpriz ödül motoru | P0 | 1 hafta |
| Genişletilmiş rozet sistemi (gizli rozetler) | P0 | 1 hafta |
| Challenge sistemi | P1 | 1 hafta |
| Geliştirilmiş streak (bonus, freeze) | P1 | 3 gün |

### Faz 4: Para Kazanma Sistemi (Temmuz 2026)

| Görev | Öncelik | Süre |
|-------|---------|------|
| DZ Coin cüzdan sistemi | P0 | 2 hafta |
| Coin kazanma entegrasyonu (tüm eylemler) | P0 | 1 hafta |
| Çekim sistemi (iyzico/banka) | P0 | 2 hafta |
| Referral program | P1 | 1 hafta |
| İçerik üretim + gelir modülü | P1 | 2 hafta |

### Faz 5: Topluluk + Sosyal (Ağustos 2026)

| Görev | Öncelik | Süre |
|-------|---------|------|
| Leaderboard tabloları | P0 | 1 hafta |
| Profil kartı sistemi | P0 | 3 gün |
| Forum (bbPress) entegrasyonu | P1 | 1 hafta |
| Peer review sistemi | P1 | 1 hafta |
| Topluluk showcase | P2 | 3 gün |
| Mesajlaşma (BuddyPress) | P2 | 1 hafta |

### Faz 6: Optimizasyon + Mentörlük (Eylül 2026)

| Görev | Öncelik | Süre |
|-------|---------|------|
| Mentörlük sistemi | P1 | 2 hafta |
| Performance optimizasyonu | P0 | 1 hafta |
| A/B test altyapısı | P1 | 1 hafta |
| Analytics dashboard (admin) | P1 | 1 hafta |
| Kullanıcı geri bildirim döngüsü | P0 | 3 gün |

---

## H.2 — Başarı Metrikleri (KPI)

| Metrik | Hedef (6. Ay) | Hedef (12. Ay) |
|--------|---------------|----------------|
| **Aktif Kullanıcı (MAU)** | 150 | 1.000 |
| **Günlük Aktif Kullanıcı (DAU)** | 40 | 300 |
| **DAU/MAU Oranı** | %27 | %30 |
| **Ortalama Streak** | 7 gün | 14 gün |
| **Kitap Tamamlama Oranı** | %35 | %50 |
| **Çalışma Kağıdı Tamamlama** | %60 | %75 |
| **DZ Coin Çekim Oranı** | %10 | %25 |
| **Referral ile Gelen Kullanıcı** | %15 | %30 |
| **Churn Rate (Aylık)** | <%15 | <%10 |
| **NPS Skoru** | 40+ | 55+ |
| **Ortalama Gelir/Kullanıcı (ARPU)** | 80 TL/ay | 120 TL/ay |

---

## H.3 — Risk Analizi

| Risk | Olasılık | Etki | Çözüm Stratejisi |
|------|----------|------|-------------------|
| DZ Coin enflasyonu (çok kolay kazanım) | Yüksek | Yüksek | Dinamik oran ayarlama, kazanım sınırlayıcıları, burn mekanizması |
| Kullanıcı bırakma (ilk 7 gün) | Orta | Yüksek | Onboarding optimizasyonu, ilk 7 gün yoğun bildirim, "quick win" görevleri |
| Gamification yorgunluğu | Orta | Orta | Düzenli yeni challenge ve sürpriz ekle, sezonluk tematik etkinlikler |
| Teknik performans sorunları | Düşük | Yüksek | Caching, lazy loading, DB optimizasyonu, CDN |
| Yasal sorunlar (para çekimi) | Düşük | Çok Yüksek | Hukuki danışmanlık, KVKK uyumu, finansal düzenleyici araştırması |
| Sahte hesap / bot sömürüsü | Orta | Yüksek | Captcha, rate limiting, manuel onay (ilk çekim), davranış analizi |

---

> **DİPTENZİRVEYE™** — Öğren. Uygula. Kazan. Tekrar et. Zirveye kadar dur*ma*.  
> *Bu platform bir ders kitabı değil — bir dönüşüm makinesi.*
