# DİPTENZİRVEYE™ V1 — Proje Dosya Envanteri

> **Versiyon:** 1.0 · **Tarih:** 21 Şubat 2026  
> **Durum:** Soft Lansman Hazırlık · **Hedef:** 50–150 Kurucu Katılımcı

---

## İçindekiler

1. [Proje Dosya Envanteri](#1-proje-dosya-envanteri)
2. [Çakışma Haritası](#2-çakışma-haritası)
3. [Arşiv Önerisi](#3-arşiv-önerisi)

---

## 1. Proje Dosya Envanteri

### 1.1 Kök Dizin Yapısı

```
DİPTENZİRVEYE-V1/
│
├── 📚 kitaplar/
├── 🎮 panel/
├── 🎨 marka/
├── 📢 pazarlama/
├── ⚙️ teknik/
├── 📋 docs/
├── 🗃️ arsiv/
├── README.md
├── CHANGELOG.md
└── .env.example
```

---

### 1.2 Kitaplar (`/kitaplar/`)

Her kitap kendi klasöründe, standart alt yapıyla:

```
kitaplar/
├── 01-para-aklim/
│   ├── para-aklim-v1.md              # Ana metin (Markdown kaynak)
│   ├── para-aklim-v1.pdf             # Dışa aktarılmış PDF
│   ├── kapak/
│   │   ├── kapak-on.png              # Ön kapak (1400×2100px)
│   │   ├── kapak-arka.png            # Arka kapak
│   │   └── kapak-mockup.png          # 3D mockup
│   ├── gorseller/                    # Bölüm içi görseller, infografikler
│   ├── sablonlar/                    # Uygulama şablonları (worksheet PDF)
│   └── meta.json                     # Kitap metadata (başlık, versiyon, XP, zorluk)
│
├── 02-sifir-noktasi/
│   └── (aynı yapı)
│
├── 03-sermaye-oyunu/
│   └── (aynı yapı)
│
├── 04-zihin-os/
│   └── (aynı yapı)
│
├── 05-kurucu-dna/
│   └── (aynı yapı)
│
├── 06-dijital-kenar/
│   └── (aynı yapı)
│
├── 07-kariyer-mimari/
│   └── (aynı yapı)
│
├── 08-etki-alani/
│   └── (aynı yapı)
│
├── 09-servet-kodu/
│   └── (aynı yapı)
│
└── 10-zirve-protokolu/
    └── (aynı yapı)
```

**`meta.json` örnek yapı:**

```json
{
  "id": "01-para-aklim",
  "baslik": "PARA AKLIM",
  "alt_baslik": "Paranla Barış Yap, Zenginliğe Kapı Aç",
  "versiyon": "1.0.0",
  "zorluk": "Başlangıç",
  "toplam_xp": 500,
  "bolum_sayisi": 10,
  "tahmini_sayfa": 180,
  "okuma_suresi_saat": 5,
  "durum": "taslak",
  "son_guncelleme": "2026-02-21",
  "bagimliliklar": [],
  "capraz_referanslar": ["02-sifir-noktasi", "09-servet-kodu"]
}
```

---

### 1.3 Panel (`/panel/`)

Kullanıcı deneyim paneli — Okudum/Uyguladım/Çıktı + XP/Level/Streak + Pomodoro.

```
panel/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.tsx           # Ana gösterge paneli
│   │   │   ├── BookTracker.tsx         # Okudum/Uyguladım/Çıktı arayüzü
│   │   │   ├── XPBar.tsx              # XP ilerleme çubuğu
│   │   │   ├── LevelBadge.tsx         # Seviye rozeti
│   │   │   ├── StreakCounter.tsx       # Günlük seri takibi
│   │   │   ├── PomodoroTimer.tsx      # Pomodoro zamanlayıcı
│   │   │   ├── Leaderboard.tsx        # Opsiyonel sıralama tablosu
│   │   │   ├── ProfileCard.tsx        # Kullanıcı profil kartı
│   │   │   └── AchievementModal.tsx   # Başarı bildirimi
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Library.tsx            # Kitap kütüphanesi
│   │   │   ├── Progress.tsx           # İlerleme özeti
│   │   │   ├── Settings.tsx
│   │   │   └── Auth.tsx               # Giriş/Kayıt
│   │   ├── hooks/
│   │   │   ├── useXP.ts
│   │   │   ├── useStreak.ts
│   │   │   └── usePomodoro.ts
│   │   ├── styles/
│   │   │   ├── globals.css
│   │   │   ├── theme.ts              # Renk paleti, tipografi tokenleri
│   │   │   └── animations.css        # Mikro-animasyonlar (XP kazanımı vb.)
│   │   ├── utils/
│   │   │   ├── xp-calculator.ts
│   │   │   ├── level-thresholds.ts
│   │   │   └── streak-logic.ts
│   │   └── types/
│   │       ├── user.ts
│   │       ├── book.ts
│   │       └── progress.ts
│   ├── public/
│   │   ├── icons/
│   │   ├── images/
│   │   └── sounds/                    # Opsiyonel: XP/level-up ses efektleri
│   ├── package.json
│   └── tsconfig.json
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── auth.ts
│   │   │   ├── books.ts
│   │   │   ├── progress.ts
│   │   │   ├── xp.ts
│   │   │   ├── leaderboard.ts
│   │   │   └── pomodoro.ts
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   ├── Book.ts
│   │   │   ├── Progress.ts
│   │   │   ├── XPLog.ts
│   │   │   └── PomodoroSession.ts
│   │   ├── middleware/
│   │   │   ├── auth.ts
│   │   │   └── rateLimiter.ts
│   │   ├── services/
│   │   │   ├── xp-service.ts
│   │   │   ├── streak-service.ts
│   │   │   └── notification-service.ts
│   │   └── config/
│   │       ├── database.ts
│   │       ├── xp-config.ts           # XP kuralları ve eşik değerleri
│   │       └── level-config.ts        # Seviye gereksinimleri
│   ├── package.json
│   └── tsconfig.json
│
└── database/
    ├── migrations/
    ├── seeds/
    │   ├── books-seed.sql
    │   └── xp-thresholds-seed.sql
    └── schema.sql
```

---

### 1.4 Marka (`/marka/`)

```
marka/
├── logo/
│   ├── diptenzirvey-logo-primary.svg      # Ana logo (vektör)
│   ├── diptenzirvey-logo-primary.png      # Ana logo (PNG, 1024px)
│   ├── diptenzirvey-logo-white.svg        # Beyaz versiyon
│   ├── diptenzirvey-logo-dark.svg         # Koyu versiyon
│   ├── diptenzirvey-icon.svg              # Sadece ikon/amblem
│   └── favicon.ico
│
├── renk-paleti/
│   └── color-tokens.json                  # HEX, RGB, HSL değerleri
│
├── tipografi/
│   ├── font-files/                        # Lisanslı fontlar
│   └── typography-guide.md                # Kullanım kuralları
│
├── marka-kilavuzu/
│   ├── brand-guidelines-v1.pdf            # Kapsamlı marka kılavuzu
│   ├── tone-of-voice.md                   # Ses tonu rehberi
│   ├── do-dont.md                         # Yapılacaklar/Yapılmayacaklar
│   └── kullanim-ornekleri/                # Uygulama örnekleri
│
└── sablonlar/
    ├── sosyal-medya/
    │   ├── instagram-post-1080x1080.psd
    │   ├── instagram-story-1080x1920.psd
    │   ├── twitter-post-1200x675.psd
    │   └── linkedin-post-1200x627.psd
    ├── email/
    │   └── email-template.html
    └── sunum/
        └── pitch-deck-template.pptx
```

---

### 1.5 Pazarlama (`/pazarlama/`)

```
pazarlama/
├── lansman/
│   ├── soft-lansman-plani.md              # 50–150 kurucu katılımcı stratejisi
│   ├── lansman-takvimi.md                 # Gün gün eylem planı
│   ├── kurucu-katilimci-paketi.md         # Özel teklif içeriği
│   └── bekleme-listesi/
│       ├── landing-page-copy.md
│       └── form-ayarlari.md
│
├── sosyal-medya/
│   ├── icerik-takvimi.md                  # Aylık içerik planı
│   ├── hashtag-stratejisi.md
│   ├── gonderi-sablonlari/
│   │   ├── bilgi-karti.md                 # Bilgi paylaşım formatı
│   │   ├── alinti-karti.md                # Motivasyon alıntıları
│   │   ├── istatistik-karti.md            # Veri/istatistik paylaşımları
│   │   └── soru-karti.md                  # Etkileşim postları
│   └── platform-stratejileri/
│       ├── instagram.md
│       ├── twitter-x.md
│       ├── linkedin.md
│       └── youtube-community.md
│
├── email/
│   ├── hos-geldin-serisi/                 # 5 e-posta onboarding dizisi
│   │   ├── 01-hos-geldin.md
│   │   ├── 02-ilk-adim.md
│   │   ├── 03-panel-tanitim.md
│   │   ├── 04-ilk-kitap.md
│   │   └── 05-topluluk-daveti.md
│   ├── haftalik-bulten.md                 # Şablon
│   └── kampanya-emailleri/
│
├── seo/
│   ├── anahtar-kelimeler.md
│   ├── meta-descriptions.md
│   └── blog-konulari.md
│
└── metrikler/
    ├── kpi-tanimlari.md                   # Takip edilecek metrikler
    └── raporlama-sablonu.md
```

---

### 1.6 Teknik Altyapı (`/teknik/`)

```
teknik/
├── altyapi/
│   ├── hosting-secimi.md                  # Sunucu/hosting karşılaştırması
│   ├── domain-dns.md                      # Domain ve DNS ayarları
│   ├── ssl-sertifika.md
│   └── cdn-ayarlari.md
│
├── deployment/
│   ├── ci-cd-pipeline.yml                 # CI/CD yapılandırması
│   ├── docker-compose.yml                 # Container orchestration
│   ├── Dockerfile
│   └── deployment-checklist.md
│
├── guvenlik/
│   ├── guvenlik-politikasi.md
│   ├── veri-koruma.md                     # KVKK uyumluluk
│   ├── yetkilendirme-matrisi.md
│   └── penetrasyon-test-plani.md
│
├── monitoring/
│   ├── log-stratejisi.md
│   ├── alert-kurallari.md
│   ├── uptime-monitoring.md
│   └── performans-metrikleri.md
│
└── yedekleme/
    ├── backup-stratejisi.md
    ├── disaster-recovery.md
    └── backup-scripts/
```

---

### 1.7 Dokümantasyon (`/docs/`)

```
docs/
├── proje-plani/
│   ├── vizyon-misyon.md
│   ├── roadmap-v1.md
│   ├── milestone-tracker.md
│   └── risk-analizi.md
│
├── kullanici-rehberi/
│   ├── baslangic-rehberi.md               # Onboarding rehberi
│   ├── panel-kullanim.md                  # Panel kullanma kılavuzu
│   ├── xp-sistemi-aciklama.md             # XP/Level sistemi nasıl çalışır
│   ├── sss.md                             # Sıkça Sorulan Sorular
│   └── sorun-giderme.md
│
├── api-dokumantasyonu/
│   ├── api-overview.md
│   ├── endpoints.md
│   └── auth-flow.md
│
└── PART-dosyalari/
    ├── PART1_DOSYA_ENVANTERI.md            # (Bu dosya)
    ├── PART2_KITAP_SERISI.md
    └── (gelecek PART dosyaları)
```

---

### 1.8 Arşiv (`/arsiv/`)

```
arsiv/
├── v0-taslaklar/                          # İlk taslaklar ve iterasyonlar
├── reddedilen-fikirler/                   # Değerlendirilip elenmiş konseptler
├── eski-versiyonlar/                      # Önceki sürümler
└── referans-materyaller/                  # İlham kaynakları, araştırma notları
```

---

## 2. Çakışma Haritası

### 2.1 Kitaplar Arası Konu Örtüşmeleri

| Çakışma Alanı | Kitap A | Kitap B | Örtüşme Riski | Çözüm Stratejisi |
|---|---|---|---|---|
| Para-zihin ilişkisi | 01 · Para Aklım | 04 · Zihin OS | 🔴 Yüksek | Para Aklım → para odaklı psikoloji; Zihin OS → genel mental performans. Kesişim noktasında çapraz referans ver. |
| Temel finans bilgisi | 01 · Para Aklım | 02 · Sıfır Noktası | 🟡 Orta | Para Aklım → duygusal/psikolojik boyut; Sıfır Noktası → pratik/teknik boyut. Bölüm girişlerinde ayrımı netleştir. |
| Yatırım stratejileri | 03 · Sermaye Oyunu | 09 · Servet Kodu | 🔴 Yüksek | Sermaye Oyunu → yatırım temelleri ve araçlar; Servet Kodu → ileri strateji ve portföy optimizasyonu. Seviye farkını koru. |
| Girişimcilik zihniyet | 05 · Kurucu DNA | 04 · Zihin OS | 🟡 Orta | Kurucu DNA → girişimciye özel mindset; Zihin OS → genel zihin yönetimi. Kurucu DNA'da Zihin OS'a referans ver. |
| Kariyer ve iş kurma | 05 · Kurucu DNA | 07 · Kariyer Mimari | 🔴 Yüksek | Kurucu DNA → kendi işini kurma; Kariyer Mimari → kurumsal/profesyonel kariyer. Hedef kitleyi net ayır. |
| Dijital iş modelleri | 06 · Dijital Kenar | 05 · Kurucu DNA | 🟡 Orta | Dijital Kenar → dijital araçlar ve beceriler; Kurucu DNA → iş kurma süreci. Dijital Kenar'da araç odağını koru. |
| Liderlik temelleri | 08 · Etki Alanı | 05 · Kurucu DNA | 🟡 Orta | Etki Alanı → liderlik teorisi ve pratiği; Kurucu DNA → ekip kurma bölümünde temel liderlik. Derinliği Etki Alanı'na bırak. |
| Pasif gelir | 03 · Sermaye Oyunu | 09 · Servet Kodu | 🟡 Orta | Sermaye Oyunu → yatırım bazlı pasif gelir; Servet Kodu → çoklu gelir akışı sistemi. Kapsamı farklılaştır. |
| Alışkanlık oluşturma | 04 · Zihin OS | 10 · Zirve Protokolü | 🟡 Orta | Zihin OS → alışkanlık bilimi; Zirve Protokolü → entegre yaşam sistemi. Zirve'de referans ver, tekrar etme. |
| Hedef belirleme | 02 · Sıfır Noktası | 07 · Kariyer Mimari | 🟢 Düşük | Farklı bağlamlar (finansal vs. kariyer). Her kitapta kendi alanına özel hedefleme. |

---

### 2.2 Panel-Kitap Entegrasyon Çakışmaları

| Alan | Potansiyel Sorun | Çözüm |
|---|---|---|
| XP dağılımı | Bazı kitaplar daha fazla uygulama görevi içerebilir → XP dengesizliği | Standart XP çarpanı: her kitap toplam 500 XP. Görev sayısı değişse de toplam sabit. |
| Zorluk eşitsizliği | İleri seviye kitaplar az kullanıcı çekebilir → leaderboard dengesizliği | Zorluk çarpanı: İleri kitaplar 1.5x XP bonusu. |
| Streak mantığı | Kullanıcı aynı anda birden fazla kitap okuyabilir → streak karışıklığı | Streak = günlük herhangi bir aktivite. Kitap bazlı değil, platform bazlı. |
| Pomodoro uyumu | Her bölümün okuma süresi farklı → Pomodoro önerisi tutarsız | Her bölüm meta.json'da tahmini okuma süresi tutar. Pomodoro sayısı otomatik hesaplanır. |

---

### 2.3 Marka-İçerik Ton Çakışmaları

| Alan | Risk | Çözüm |
|---|---|---|
| Kitap tonu vs. panel tonu | Kitaplar daha "yazılı metin" tonu, panel daha "UI copy" tonu | Ton rehberi: Kitap = %80 profesyonel, %20 motive edici. Panel = %60 minimal, %30 enerjik, %10 premium. |
| Sosyal medya vs. kitap dili | Sosyal medya daha rahat olabilir → marka tutarsızlığı | Tüm kanallarda aynı kelime seti ve yasaklı kelimeler listesi kullan. |
| Motivasyonel içerik dozajı | Fazla motivasyon → "guru" algısı; az motivasyon → sönük | Her kitapta motivasyonel bölüm oranı max %20. Veri ve eylem odaklı kal. |

---

## 3. Arşiv Önerisi

### 3.1 Dosya İsimlendirme Kuralları

**Genel Format:**

```
[proje]-[kategori]-[aciklama]-v[versiyon].[uzanti]
```

**Örnekler:**

| Dosya Türü | İsimlendirme | Örnek |
|---|---|---|
| Kitap metni | `[kitap-id]-v[major].[minor].md` | `para-aklim-v1.0.md` |
| Kitap PDF | `[kitap-id]-v[major].[minor].pdf` | `para-aklim-v1.0.pdf` |
| Kapak görseli | `[kitap-id]-kapak-[tip].png` | `para-aklim-kapak-on.png` |
| Sosyal medya | `sm-[platform]-[tarih]-[konu].png` | `sm-ig-20260221-lansman.png` |
| E-posta | `email-[seri]-[sira].md` | `email-hosgeldin-01.md` |
| Doküman | `doc-[konu]-v[versiyon].md` | `doc-xp-sistemi-v1.md` |

**Kurallar:**

- Küçük harf, Türkçe karakter yok (dosya adlarında)
- Boşluk yerine tire (`-`)
- Tarih formatı: `YYYYMMDD`
- Versiyon formatı: Semantic Versioning (`major.minor.patch`)

---

### 3.2 Versiyon Yönetimi

**Git Stratejisi:**

```
main                    ← Canlıdaki kararlı sürüm
├── develop             ← Aktif geliştirme
├── feature/kitap-01    ← Kitap bazlı feature branch'ler
├── feature/panel-xp    ← Panel özellik geliştirmeleri
├── hotfix/bug-fix      ← Acil düzeltmeler
└── release/v1.0        ← Sürüm adayları
```

**Commit Mesajı Formatı:**

```
[kategori]: kısa açıklama

Kategoriler:
- kitap: Kitap içerik değişiklikleri
- panel: Panel geliştirmeleri
- marka: Marka materyalleri
- pazarlama: Pazarlama içerikleri
- teknik: Altyapı değişiklikleri
- docs: Dokümantasyon
- fix: Hata düzeltmeleri
```

**Örnek:**

```
kitap: para-aklim bölüm 3 düzenleme tamamlandı
panel: XP hesaplama servisine streak bonusu eklendi
marka: sosyal medya şablonları güncellendi
```

---

### 3.3 Yedekleme Stratejisi

| Katman | Yöntem | Sıklık | Saklama Süresi |
|---|---|---|---|
| **Katman 1 — Kod** | Git (GitHub/GitLab private repo) | Her commit | Sınırsız |
| **Katman 2 — Veritabanı** | Otomatik DB dump | Günlük | 90 gün |
| **Katman 3 — Medya** | Cloud storage sync (S3/R2) | Anlık (sync) | Sınırsız |
| **Katman 4 — Tam Yedek** | Full system snapshot | Haftalık | 12 ay |
| **Katman 5 — Felaket** | Farklı bölge/sağlayıcı kopya | Aylık | 24 ay |

**3-2-1 Kuralı:**
- **3** kopya (orijinal + 2 yedek)
- **2** farklı ortam (bulut + yerel)
- **1** offsite (farklı coğrafi konum)

---

### 3.4 Dosya Organizasyonu İlkeleri

1. **Tek Kaynak İlkesi:** Her içerik parçasının tek bir "master" dosyası olmalı. PDF, görseller vb. bu kaynaktan türetilir.

2. **Modülerlik:** Her kitap, her modül kendi kendine yeten bir birim. Bağımlılıklar `meta.json` ile takip edilir.

3. **Sıfır Tekrar:** Aynı içerik iki yerde tutulmaz. Çapraz referans kullanılır.

4. **Hazır Dağıtım:** `/kitaplar/XX/` klasörü her zaman dağıtıma hazır olmalı — kapak, PDF, meta hepsi bir arada.

5. **Temiz Geçmiş:** Reddedilen fikirler ve eski versiyonlar `/arsiv/` altında saklanır, aktif dizini kirletmez.

---

### 3.5 Durum Takip Matrisi

Her kitap ve modül için standart durum etiketleri:

| Durum | Anlamı | Renk Kodu |
|---|---|---|
| `taslak` | İlk yazım aşaması | 🔵 |
| `inceleme` | İçerik review'da | 🟡 |
| `duzenleme` | Editör düzenlemesi | 🟠 |
| `onay` | Son onay bekleniyor | 🟣 |
| `yayinda` | Canlıda, aktif | 🟢 |
| `arsiv` | Devre dışı, arşivde | ⚫ |

---

### 3.6 Kritik Dosya Kontrol Listesi (V1 Lansmanı)

Soft lansman öncesi hazır olması gereken minimum dosyalar:

| Öncelik | Dosya/Modül | Durum |
|---|---|---|
| 🔴 P0 | İlk kitap (Para Aklım) — metin + PDF + kapak | ⬜ |
| 🔴 P0 | Panel MVP — Okudum/Uyguladım/Çıktı akışı | ⬜ |
| 🔴 P0 | Panel MVP — XP/Level temel sistemi | ⬜ |
| 🔴 P0 | Panel MVP — Kullanıcı auth (kayıt/giriş) | ⬜ |
| 🔴 P0 | Landing page + bekleme listesi formu | ⬜ |
| 🟡 P1 | Marka kılavuzu (temel versiyon) | ⬜ |
| 🟡 P1 | Hoş geldin e-posta serisi (5 e-posta) | ⬜ |
| 🟡 P1 | 2. kitap (Sıfır Noktası) taslağı | ⬜ |
| 🟡 P1 | Sosyal medya şablonları (3–5 adet) | ⬜ |
| 🟡 P1 | Streak sistemi | ⬜ |
| 🟢 P2 | Pomodoro entegrasyonu | ⬜ |
| 🟢 P2 | Leaderboard (opsiyonel) | ⬜ |
| 🟢 P2 | SSS sayfası | ⬜ |
| 🟢 P2 | 3–5. kitaplar taslakları | ⬜ |
| 🟢 P2 | SEO içerik planı | ⬜ |

---

> **DİPTENZİRVEYE™** — Her dosya bir tuğla. Yapı sağlam olursa, zirve kaçınılmaz.
