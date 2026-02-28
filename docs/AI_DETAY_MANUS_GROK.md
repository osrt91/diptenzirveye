# 🤖 DİPTENZİRVEYE™ — AI Derinlik Dosyası: Manus & Grok

> **Yayın Tarihi İtibarıyla:** Şubat 2026  
> **Seri:** DİPTENZİRVEYE™ AI Araştırma Koleksiyonu  
> **Kapsam:** Manus AI (Meta/Monica) & Grok (xAI)  
> **Ton:** DZ — net, keskin, girişimci odaklı

---

## 📌 MANUS AI

### Genel Tanım

**Manus AI**, 2025 Mart ayında Çin merkezli **Monica (Butterfly Effect)** tarafından piyasaya sürülen, dünyanın ilk tam otonom genel amaçlı AI ajanıdır. Klasik chatbot'lardan farklı olarak sadece cevap vermez — **iş yapar**. Araştırma yapar, dosya oluşturur, web sitesi kurar, analiz raporları hazırlar ve bunları uçtan uca teslim eder.

- **Geliştiren:** Monica (Butterfly Effect) → **Aralık 2025'te Meta tarafından 2 milyar dolara satın alındı**
- **Merkez:** Başlangıçta Çin, şu an Meta bünyesinde (ABD)
- **Kuruluş/Lansman:** Mart 2025
- **2026 Durumu:** Meta şemsiyesi altında hızla büyüyor. 8 ayda 100 milyon dolar yıllık gelire (ARR) ulaştı. Manus 1.6 Max versiyonu aktif. Kullanıcı memnuniyeti %19.2 artış gösterdi.
- **Temel Odak:** Otonom görev yürütme — "Söyle, yapsın" felsefesi

### Teknik Özellikler

| Özellik | Detay |
|---------|-------|
| **Model Mimarisi** | Multi-agent sistemi (Planner + Execution + Verification Agent) |
| **Kullanılan LLM'ler** | Claude 3.5, Qwen-72B (hibrit kullanım) |
| **Kod Paradigması** | CodeAct — çalıştırılabilir Python kodu üretimi |
| **Çalışma Ortamı** | Bulut tabanlı izole Linux sandbox (dosya sistemi + terminal erişimi) |
| **Desteklenen Modaliteler** | Metin, görsel, ses, video |
| **Entegre Araç Sayısı** | 500+ (Snowflake, Tableau, Zapier, RPA, Stable Diffusion 3, Sora) |
| **Dil Desteği** | 60+ dilde gerçek zamanlı altyazı ve çeviri |
| **Görev Ayrıştırma Doğruluğu** | %98.7 (GAIA v1.1 benchmark) |
| **Context Window** | Manus 1.5/1.6 ile genişletilmiş (uzun konuşma ve çok adımlı iş akışı desteği) |

**API Erişimi ve Fiyatlandırma:**

| Plan | Aylık Fiyat | Kredi | Günlük Yenileme |
|------|-------------|-------|-----------------|
| **Ücretsiz** | $0 | — | 300 kredi/gün |
| **Standard** | $20 | 4.000 | 300/gün |
| **Customizable** | $40 | 8.000 | 300/gün |
| **Extended** | $200 | 40.000 | 300/gün |
| **Team** | Özel | Ölçeklenebilir | Özel |

> **DZ Notu:** Basit bir web araması 10-20 kredi, kapsamlı bir web uygulaması 900+ kredi tüketir. Krediler aylık devretmez — harcamayı planlaman gerek.

**Öne Çıkan Teknik Avantajlar:**
- Deterministik araç çağrıları — belirsiz "düşünme" yerine çalıştırılabilir kod
- Paralel sub-agent yürütme — güvenlik kontrolü, derleme ve test aynı anda çalışır
- RAG entegrasyonu ile gerçek zamanlı veri doğrulama
- Çakışan bilgileri otomatik işaretleme ve validasyon

### Kullanım Alanları (Girişimci Perspektifinden)

**1. Rakip ve Pazar Araştırması**
> Manus'a "Türkiye'deki SaaS pazarını analiz et, ilk 20 şirketi listele, gelir modellerini karşılaştır ve bir PDF rapor oluştur" de. 30 dakikada elinizde profesyonel bir rapor olur.

**2. MVP Web Sitesi / Landing Page Oluşturma**
> Bir ürün fikriniz var ama kodlama bilmiyorsunuz? "Bu ürün için modern bir landing page yap, responsive olsun, form entegrasyonu ekle" komutuyla çalışan bir site teslim alırsınız.

**3. Finansal Modelleme ve Tablo Analizi**
> Excel veya CSV dosyanızı yükleyin, "Bu verilerden 3 yıllık projeksiyon çıkar, grafikleriyle birlikte" deyin. Manus 1.6 ile geliştirilmiş spreadsheet yetenekleri bunu kolaylaştırır.

**4. İçerik Üretim Otomasyonu**
> "Bu 5 makaleyi özetle, her biri için sosyal medya paylaşım metni yaz, bir PowerPoint sunumu hazırla." Manus hepsini tek seferde yapar — dosyaları indirmeniz yeter.

**5. Çok Dilli Ürün Dokümantasyonu**
> "Bu kullanım kılavuzunu İngilizce, Almanca ve Arapça'ya çevir, her biri için ayrı PDF oluştur." 60+ dil desteğiyle global ölçekte düşünebilirsiniz.

### Özel Yetenekler / Benzersiz Özellikler

**Agent Mimarisi — Üçlü Koordinasyon:**
- **Planner Agent (Stratejist):** Görevi analiz eder, adımlara böler. Claude 3.5 ve Answer Set Programming kullanır.
- **Knowledge Agent (Bilgi Motoru):** Qwen-72B + Hibrit RAG ile gerçek zamanlı web verisi, API ve belge tabanlarını birleştirir.
- **Execution Agent (İcracı):** CodeAct paradigmasıyla çalıştırılabilir Python kodu üretir ve sandbox'ta çalıştırır.
- **Verification Agent (Kalite Kontrol):** Sonuçları doğrular ve tutarsızlıkları işaretler.

**Browser Operator — Çift Katmanlı Tarayıcı:**
- **Yerel Tarayıcı:** Mevcut oturum açmış hesaplarınızı kullanır (kendi IP adresinizle). CAPTCHA ve güvenlik kontrollerinden kaçınır. Premium araçlara erişim sağlar.
- **Bulut Tarayıcı:** İzole sandbox ortamında genel web araştırması ve görev yürütme.

**Dosya Oluşturma Yetenekleri:**
- PowerPoint sunumları, PDF raporlar, web siteleri, spreadsheet'ler, görseller
- Basit görevler ~5 dakika, karmaşık projeler 10-80 dakika

**Sub-Agent Yapısı:**
- Alt modüller paralel çalışır (güvenlik, derleme, test)
- Sonuçlar merkezi planlayıcıda birleştirilir
- Dinamik hedef ayrıştırma — belirsiz hedefleri bile çalıştırılabilir adımlara dönüştürür

**Manus 1.6 Max (Güncel En Güçlü Versiyon):**
- Tek seferde görev tamamlama oranında artış
- Mobil uygulama geliştirme desteği
- Design View — interaktif görsel oluşturma ve düzenleme
- Geliştirilmiş finansal modelleme ve spreadsheet yetenekleri

> **DZ Notu:** Manus'un resmi bir "ULTRA modu" adı altında özelliği bulunmuyor (Şubat 2026 itibarıyla). Ancak **Quality Mode** (ücretli plan gerektirir) 27+ sayfalık derinlemesine raporlar üretir ve Speed Mode'a göre %20 daha fazla kredi harcar. Pratikte "ULTRA" diyebileceğiniz en yakın deneyim budur.

### Prompt Rehberi

**Manus ile Çalışırken Altın Kurallar:**
1. **Net hedef belirle** — "Bir şeyler yap" değil, "X sonucunu Y formatında teslim et" de
2. **Çıktı formatını belirt** — PDF mi, Excel mi, web sitesi mi? Söyle.
3. **Adımları sıralama** — Manus bunu kendisi yapar. Sen sadece nihai hedefi tanımla.
4. **Dosya yükle** — Veri varsa yükle, Manus üzerinden çalışsın.
5. **Quality Mode seç** — Derinlemesine analiz istiyorsan Speed değil Quality kullan.

**Hazır Kullanım Promptları (DZ Tonu):**

```
PROMPT 1 — Rakip Analizi
"Türkiye'deki e-ticaret sektöründeki ilk 10 şirketi araştır. Her biri için
gelir modeli, çalışan sayısı, kuruluş yılı ve güçlü/zayıf yönlerini
içeren bir karşılaştırma tablosu oluştur. Sonucu PDF olarak teslim et."
```

```
PROMPT 2 — Landing Page
"'DiptenZirveye' adlı bir kişisel gelişim markası için modern, koyu
temalı bir landing page oluştur. Hero section, 3 özellik kartı, bir
testimonial slider ve email kayıt formu olsun. Responsive tasarım şart."
```

```
PROMPT 3 — Finansal Projeksiyon
"Ekteki CSV dosyasındaki satış verilerinden yola çıkarak 2026-2028
arasında aylık bazda gelir projeksiyonu çıkar. Grafikleri ve özet
tabloyu içeren bir Excel dosyası oluştur."
```

```
PROMPT 4 — İçerik Makinesi
"Bu 3 blog yazısını özetle, her biri için bir LinkedIn paylaşım metni
yaz (DZ tonunda — keskin, motive edici, kısa), ve hepsini tek bir
PowerPoint sunumuna dönüştür."
```

```
PROMPT 5 — Pazar Giriş Stratejisi
"Almanya pazarına giriş yapmak isteyen bir Türk SaaS girişimi için
pazar analizi yap. Düzenleyici gereksinimler, rekabet haritası ve giriş
stratejisi önerilerini içeren 15+ sayfalık bir rapor hazırla."
```

### DİPTENZİRVEYE™ Serisinde Yeri

- **Kitap:** *"DİPTENZİRVEYE™ — AI ile Girişimcilik"* ana bölümü — "Otonom Ajanlara İşini Devret" başlığı altında
- **Ek Kitap:** *"DZ Dijital Araçlar Rehberi"* — Manus uygulama laboratuvarı bölümü
- **Panel Entegrasyonu Önerisi:** DZ Paneli'nde "AI Ajan Görev Merkezi" widget'ı — kullanıcının Manus API'si üzerinden doğrudan görev atayabileceği, durum takibi yapabileceği bir arayüz. Manus'un webhook desteği bunu mümkün kılar.

### Karşılaştırma Notu

| Kriter | Manus | ChatGPT | Claude | Grok |
|--------|-------|---------|--------|------|
| **Otonom Görev Yürütme** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| **Dosya Oluşturma** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| **Gerçek Zamanlı Veri** | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Kodlama Kalitesi** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Maliyet Etkinliği** | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Browser Otomasyonu** | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐⭐ |

> **Güçlü:** Rakipsiz otonom görev yürütme, dosya üretimi, browser otomasyonu. "İşini söyle, teslim alsın" modelinin en güçlü temsilcisi.  
> **Zayıf:** Kredi sistemi maliyetli olabilir, görev öncesi maliyet tahmini yok, karmaşık görevlerde bekleme süresi uzun (80 dakikaya kadar).

---

## 📌 GROK (xAI)

### Genel Tanım

**Grok**, Elon Musk'ın kurduğu **xAI** şirketinin geliştirdiği yapay zeka modelidir. İlk versiyonu 2023'te piyasaya sürülen Grok, Şubat 2025'te yayınlanan **Grok 3** ile büyük bir sıçrama yapmıştır. X (eski Twitter) platformuyla doğrudan entegrasyonu sayesinde gerçek zamanlı veri erişimi sunan nadir AI modellerinden biridir.

- **Geliştiren:** xAI (Elon Musk)
- **Kuruluş:** 2023, merkez ABD (San Francisco)
- **Temel Odak:** İleri düzey muhakeme, gerçek zamanlı bilgi erişimi, espritüel ve sansürsüz iletişim tonu
- **2026 Durumu (Şubat 2026):**
  - **Grok 3** (Şubat 2025) — ana model, aktif kullanımda
  - **Grok 3 Mini / Mini-Fast** — hafif ve hızlı alternatifler
  - **Grok 4** (Temmuz 2025) — 256K context, en gelişmiş muhakeme
  - **Grok 4.1 Fast** — 2 milyon token context window ile en geniş bağlam penceresi
  - **Aurora** — görsel üretim modeli
  - **Colossus** süper bilgisayarı üzerinde eğitim (200.000 NVIDIA H100 GPU)

### Teknik Özellikler

| Özellik | Grok 3 | Grok 3 Mini | Grok 4 | Grok 4.1 Fast |
|---------|--------|-------------|--------|---------------|
| **Context Window** | 131K token | 128K token | 256K token | 2M token |
| **Girdi Fiyatı** | $3.00/M token | $0.30/M token | $3.00/M token | $0.20/M token |
| **Çıktı Fiyatı** | $15.00/M token | $0.50/M token | $15.00/M token | $0.50/M token |
| **Hız** | 65 token/sn | Yüksek | Orta | Çok yüksek |
| **MMLU** | 79.9 | — | — | — |
| **AIME (Matematik)** | ~%93 | — | — | — |
| **HumanEval (Kod)** | %88.7 | — | — | — |

**Eğitim Altyapısı:** Colossus süper bilgisayarı — 200.000 NVIDIA H100 GPU, Grok 2'ye göre 10 kat daha fazla hesaplama gücü

**Desteklenen Modaliteler:** Metin, görsel (giriş + Aurora ile üretim), kod yorumlayıcı, araç entegrasyonu

**API Erişimi:**
- OpenAI SDK formatıyla uyumlu (kolay entegrasyon)
- 600 istek/dakika rate limit
- X Premium/Premium+ aboneliği veya doğrudan API erişimi
- Web (grok.com), iOS ve Android uygulamaları

### Kullanım Alanları (Girişimci Perspektifinden)

**1. Gerçek Zamanlı Pazar Duygu Analizi**
> X platformundaki canlı verileri analiz ederek bir ürün lansmanı, kriz veya trend hakkında anlık kamuoyu görüşünü çıkarır. "Son 24 saatte 'kripto' hakkında X'te neler konuşuluyor, genel duygu olumlu mu olumsuz mu?" diye sorduğunuzda canlı veriye dayalı cevap alırsınız.

**2. Derinlemesine Araştırma (DeepSearch)**
> Grok'un DeepSearch özelliği web ve X'i aktif olarak tarar, birden fazla kaynağı sentezler, çelişkili verileri muhakeme eder. Bir yatırım kararı öncesi "Bu sektördeki son gelişmeleri, riskleri ve fırsatları DeepSearch ile araştır" demeniz yeterli.

**3. Matematik ve Mühendislik Problemleri**
> AIME'de %93, HumanEval'de %88.7 — Grok 3, karmaşık matematik ve kodlama görevlerinde en güçlü modellerden biri. Mühendislik hesaplamaları, algoritma tasarımı ve veri bilimi problemlerinde güvenilir bir yardımcı.

**4. Hızlı İçerik Üretimi ve Espritüel Metin Yazımı**
> Grok'un diğer AI'lardan ayrılan en belirgin özelliklerinden biri espritüel ve doğrudan tonu. Sosyal medya içerikleri, reklam metinleri veya podcast scriptleri için "sansürsüz, gerçekçi ve esprili" bir ton arıyorsanız Grok tam size göre.

**5. Görsel Üretim (Aurora)**
> Aurora modeli ile metin açıklamasından fotogerçekçi görseller üretebilirsiniz. Logo tasarımı, ürün mockup'ları, sosyal medya görselleri — 30-60 saniyede teslim. DALL-E 3, Flux ve Imagen 3'ten daha yüksek performans gösteriyor (özellikle metin rendering ve portre konusunda).

### Özel Yetenekler / Benzersiz Özellikler

**X (Twitter) Entegrasyonu — Rakipsiz Avantaj:**
- Diğer hiçbir büyük AI modeli X platformunun canlı veri akışına doğrudan erişime sahip değil
- Herkese açık paylaşımlar, trendler ve konuşmalar gerçek zamanlı olarak analiz edilir
- Duygu analizi, marka izleme, kriz yönetimi ve pazar araştırması için altın madeni
- **Sınırlama:** Yalnızca herkese açık (public) paylaşımlara erişim var — özel hesaplar, korumalı tweetler ve DM'ler erişilemez

**Think Mode & Big Brain Mode:**
- **Think Mode:** Grok 3 Mini kullanarak hızlı adım-adım muhakeme. Günlük sorular için ideal.
- **Big Brain Mode:** Tam Grok 3 modeli ile maksimum analitik derinlik. Karmaşık problemler için.
- Her iki mod da insan benzeri problem çözme — görev ayrıştırma ve öz-düzeltme mekanizmaları içerir.

**DeepSearch & DeeperSearch:**
- **DeepSearch:** Web ve X'i aktif olarak tarar, birden fazla kaynağı sentezler, çelişkili verileri muhakeme eder. SuperGrok planında ($30/ay) 2 saatte 30 sorgu.
- **DeeperSearch:** Premium katmanda daha yoğun araştırma — 2 saatte 10 derinlemesine arama.

**Aurora Görsel Üretimi:**
- Otoregresif görsel üretim modeli
- Fotogerçekçi render, hassas metin-görsel dönüşümü
- Görsel düzenleme ve çok modlu girdi desteği
- 3 en-boy oranı: 3:2 (yatay), 2:3 (dikey), 1:1 (kare)
- Gerçek dünya varlıkları, metin, logo ve portre konusunda rakiplerinden üstün

**Espritüel ve Sansürsüz Ton:**
- Hitchhiker's Guide to the Galaxy'den ilham alan kişilik
- Diğer AI'ların kaçındığı sorulara doğrudan cevap verme eğilimi
- DZ serisi için doğal bir uyum — keskin, dobra, gerçekçi

### Prompt Rehberi

**Grok ile Çalışırken Altın Kurallar:**
1. **Gerçek zamanlı veri istiyorsan belirt** — "X'teki güncel verilere göre..." diye başla
2. **Think/Big Brain modunu seç** — Basit soru: Think. Derin analiz: Big Brain.
3. **DeepSearch'ü tetikle** — Araştırma soruları için "kapsamlı araştır" veya "DeepSearch kullan" ifadelerini ekle
4. **Espritüel tonu kucakla** — Grok doğrudan ve esprili. Bunu avantaja çevir.
5. **Aurora için detaylı betimleme yaz** — Görsel üretimde ne kadar detaylı yazarsan o kadar iyi sonuç alırsın

**Hazır Kullanım Promptları (DZ Tonu):**

```
PROMPT 1 — Trend Analizi
"X platformundaki son 48 saatteki verilere göre 'yapay zeka girişimcilik'
konusundaki genel duyguyu analiz et. En çok etkileşim alan 10 paylaşımı
listele ve genel eğilimi özetle. DZ perspektifinden yorumla."
```

```
PROMPT 2 — Derinlemesine Araştırma
"DeepSearch kullanarak 2026'da Türkiye'deki AI startup ekosistemini
araştır. Fonlama trendleri, öne çıkan girişimler ve büyüme fırsatlarını
içeren kapsamlı bir analiz sun. Kaynaklarını belirt."
```

```
PROMPT 3 — Kod ve Algoritma
"Python ile bir duygu analizi pipeline'ı oluştur. X API'sinden veri
çeksin, her tweet'i olumlu/olumsuz/nötr olarak sınıflandırsın ve sonuçları
bir dashboard'da görselleştirsin. Big Brain modunda çalış."
```

```
PROMPT 4 — Görsel Üretim (Aurora)
"Aurora ile DİPTENZİRVEYE™ markası için koyu arka planlı, altın
tonlarında tipografi içeren, modern ve premium hissiyat veren bir
sosyal medya görseli oluştur. 1:1 kare format."
```

```
PROMPT 5 — Espritüel İçerik
"Bir girişimcinin sabah motivasyonu için 5 tweet yaz. Grok tarzında —
dobra, esprili, gerçekçi. Boş motivasyon klişelerinden uzak dur.
'Dipten zirveye' temasını işle ama bıktırma."
```

### DİPTENZİRVEYE™ Serisinde Yeri

- **Kitap:** *"DİPTENZİRVEYE™ — AI ile Girişimcilik"* — "Gerçek Zamanlı Zekâ: Grok ve X Verisiyle Karar Almak" bölümü
- **Ek Kitap:** *"DZ Dijital Araçlar Rehberi"* — Grok API entegrasyonu ve Aurora uygulama laboratuvarı
- **Panel Entegrasyonu Önerisi:** DZ Paneli'nde "Trend Radar" widget'ı — Grok API ile X'teki canlı trendleri takip eden, duygu analizi gösteren ve kullanıcıya anlık pazar sinyalleri sunan bir modül. xAI API'nin OpenAI SDK uyumluluğu entegrasyonu kolaylaştırır.

### Karşılaştırma Notu

| Kriter | Grok 3 | ChatGPT | Claude | Manus |
|--------|--------|---------|--------|-------|
| **Gerçek Zamanlı Veri** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ |
| **Muhakeme Derinliği** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Kod Üretimi** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Görsel Üretim** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| **Kişilik / Ton** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| **Otonom Görev Yürütme** | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Fiyat/Performans** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |

> **Güçlü:** X entegrasyonu ile gerçek zamanlı veri erişimi rakipsiz. Muhakeme ve matematik yetenekleri üst düzey. Aurora ile görsel üretim kaliteli. Espritüel ton DZ serisine doğal uyum sağlar.  
> **Zayıf:** Otonom görev yürütme ve dosya oluşturma konusunda Manus'un gerisinde. X dışı kaynaklara erişimde sınırlılıklar var. API maliyetleri yoğun kullanımda yükselebilir ($15/M çıktı token).

---

## 🔀 MANUS vs GROK — Karşılaştırmalı Özet

| Boyut | Manus AI | Grok (xAI) |
|-------|----------|------------|
| **Ne Yapar?** | İşini alır, yapar, teslim eder | Düşünür, araştırır, anlık bilgi verir |
| **Metafor** | Sanal çalışan / dijital asistan | Akıllı danışman / trend analist |
| **En İyi Olduğu Alan** | Otonom görev yürütme, dosya üretimi | Gerçek zamanlı veri, muhakeme, araştırma |
| **DZ Serisinde Rolü** | "İşi yaptıran motor" | "Piyasayı okuyan radar" |
| **Kimler İçin?** | Tek kişilik girişimciler, küçük ekipler | Trend takipçileri, veri odaklı karar alıcılar |
| **Birlikte Kullanım** | Grok'un analiz ettiği trendi Manus'a iş olarak ver | Manus'un ürettiği raporu Grok'un verileriyle doğrula |

> **DZ Tavsiyesi:** Bu iki AI birbirinin rakibi değil, tamamlayıcısı. Grok piyasanın nabzını tutar, Manus o nabza göre harekete geçer. Akıllı girişimci ikisini birlikte kullanır.

---

## 📋 Kaynaklar ve Notlar

- Tüm bilgiler yayın tarihi itibarıyla (Şubat 2026) günceldir
- Fiyatlandırma ve özellikler hızla değişebilir — resmi siteleri düzenli kontrol edin
- Manus: [manus.im](https://manus.im) | Grok: [grok.com](https://grok.com) | xAI API: [docs.x.ai](https://docs.x.ai)
- Bu dosya DİPTENZİRVEYE™ serisi kapsamında hazırlanmıştır — ticari kullanım ve yeniden dağıtım hakları DZ lisansına tabidir

---

> *"Yapay zekâ bir araçtır — ama doğru aracı, doğru işe koşan kazanır. Grok sana piyasayı okur, Manus o okumanın gereğini yapar. Sen de ortada oturup 'girişimci' olduğunu sanma — ikisini de aç ve harekete geç."*  
> — **DİPTENZİRVEYE™**
