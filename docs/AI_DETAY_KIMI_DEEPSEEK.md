# DİPTENZİRVEYE™ — AI Araç Detay Dosyası: Kimi & DeepSeek

> **Yayın Tarihi:** Şubat 2026  
> **Seri:** DİPTENZİRVEYE™ AI Araçları Araştırma Serisi  
> **Kapsam:** Kimi (Moonshot AI) · DeepSeek (High-Flyer)  
> **Durum:** Aktif — Güncel veriler Şubat 2026 itibarıyla derlenmiştir.

---

## Kimi (Moonshot AI)

### Genel Tanım

| Bilgi | Detay |
|-------|-------|
| **Geliştiren Şirket** | Moonshot AI (月之暗面 — "Ayın Karanlık Yüzü") |
| **Kuruluş Tarihi** | Nisan 2023, Pekin, Çin |
| **Kurucular** | Yang Zhilin (CEO), Zhou Xinyu, Wu Yuxin — üçü de Tsinghua Üniversitesi mezunu |
| **Merkez** | Pekin, Haidian Bölgesi, Çin |
| **Değerleme** | ~3,8 milyar USD (Ekim 2025 itibarıyla) |
| **Çalışan Sayısı** | Hızla büyüyen ekip; Alibaba, Tencent, IDG Capital gibi dev yatırımcılardan toplam ~2 milyar USD fon |

Moonshot AI, Çin'in OpenAI'a en güçlü cevabı olarak konumlanıyor. Şirket adını Pink Floyd'un efsanevi "The Dark Side of the Moon" albümünden alıyor — kurucu Yang Zhilin'in favori albümü. İlk ürünleri Kimi, Ekim 2023'te piyasaya sürüldü ve 200.000 Çince karakter işleyebilmesiyle dikkat çekti. Mart 2024'te bu kapasite 2 milyon karaktere çıkarıldı.

**Temel Yetenekler ve Odak Alanı:**
- Çok modlu (multimodal) yapay zeka: metin, görsel, video
- Devasa bağlam penceresi ile uzun belge analizi
- Çoklu ajan orkestrasyonu (Agent Swarm) ile paralel görev yürütme
- Görsel kodlama: UI ekran görüntüsünden çalışan kod üretme
- Açık kaynak felsefesi ile erişilebilirlik

**2026'daki Güncel Durum (Şubat 2026 itibarıyla):**
- **Kimi K2.5** — 27 Ocak 2026'da yayınlanan amiral gemisi model
- **Kimi K1.5** — Ocak 2025'te yayınlanan, o1 seviyesinde performans gösteren önceki versiyon
- Kimi Web, Mobil Uygulama, API ve Kimi Code platformlarında aktif

---

### Teknik Özellikler

| Özellik | Kimi K2.5 (Güncel) | Kimi K1.5 |
|---------|-------------------|-----------|
| **Toplam Parametre** | 1 trilyon | Açıklanmadı |
| **Aktif Parametre** | 32 milyar (MoE) | — |
| **Eğitim Verisi** | ~15 trilyon karma token (metin + görsel) | — |
| **Bağlam Penceresi** | 256.000 token (~200 sayfa) | 128.000 token |
| **Mimari** | Mixture-of-Experts (MoE), Transformer tabanlı | Dense Transformer |
| **Lisans** | Modified MIT (açık kaynak, ticari kullanıma uygun) | Tescilli |

**Desteklenen Modaliteler:**
- Metin: Tam destek — çok dilli, Çince'de özellikle güçlü
- Görsel: Yerleşik görüntü anlama, ayrı vision encoder gerektirmez
- Video: Video akışı analizi ve çıkarım
- Kod: Görsel kodlama, ekran görüntüsünden UI kodu üretme

**Öne Çıkan Teknik Avantajlar:**
1. **Agent Swarm Teknolojisi:** 100 paralel alt-ajan, görev başına 1.500 koordineli araç çağrısı, PARL (Parallel Agent Reinforcement Learning) ile dinamik koordinasyon
2. **Çift Akıl Yürütme Modu:** "Thinking" (derin analiz) ve "Instant" (hızlı yanıt)
3. **Yerleşik Multimodal Mimari:** Ayrı modüller yerine tek çatı altında metin-görsel-video işleme
4. **HLE-Full Skoru:** 50,2% — GPT-5.2'nin 45,5%'ini geçiyor (araçlı benchmark)
5. **LiveCodeBench:** 85,0% — rekabetçi programlamada Claude Opus'u (82,2%) geride bırakıyor

**API Erişimi ve Fiyatlandırma:**
| Metrik | Fiyat |
|--------|-------|
| **Giriş Token** | $0,45 / milyon token |
| **Çıkış Token** | $2,25 / milyon token |
| **GPT-5.2 ile Kıyasla** | ~%30 daha ucuz |
| **ChatGPT ile Kıyasla** | ~%98 daha ucuz ($0,60 vs $30/M giriş) |
| **API Uyumluluğu** | OpenAI-uyumlu API formatı |

---

### Kullanım Alanları (Girişimci Perspektifinden)

**1. Toplu Belge Analizi ve Araştırma**
Agent Swarm ile 100 alt-ajan paralel çalışarak yüzlerce sayfalık dokümanı analiz eder. *Örnek:* Bir yatırım fonunun 50 şirketin yıllık raporunu tek seferde taratarak önemli finansal metrikleri çıkarması — klasik yöntemle haftalarca sürecek iş, saatler içinde tamamlanır.

**2. Görsel Tasarımdan Koda Dönüştürme**
UI ekran görüntülerinden, Figma tasarımlarından veya hatta el çizimi wireframe'lerden çalışan HTML/CSS/JS kodu üretir. *Örnek:* Startup'ların MVP aşamasında tasarımcıya bile ihtiyaç duymadan landing page oluşturması.

**3. Çok Dilli İçerik Üretimi (Çince Pazara Giriş)**
Çince'de son derece güçlü olan Kimi, Çin pazarına açılmak isteyen girişimciler için içerik lokalizasyonu, pazar araştırması ve müşteri iletişimi sağlar. *Örnek:* Türk e-ticaret markasının Çin Alibaba mağazası için ürün açıklamaları ve pazarlama metinleri oluşturması.

**4. Karmaşık Kodlama ve Refactoring Projeleri**
256K token bağlam penceresi ile tüm bir kod tabanını tek seferde analiz eder. *Örnek:* Legacy bir Django projesinin modern FastAPI'ye migration planının çıkarılması, bağımlılık haritasının oluşturulması.

**5. Çok Aşamalı Otomasyon İş Akışları**
Agent Swarm'ın 1.500 araç çağrısı kapasitesiyle kompleks iş süreçlerini otomatikleştirir. *Örnek:* Bir SaaS şirketinin günlük raporlama, veri çekme, analiz ve sunum hazırlama sürecini uçtan uca otomatize etmesi.

---

### Özel Yetenekler / Skill Dosyası

**Benzersiz Özellikler (Rakiplerden Farkı):**
- **Agent Swarm:** Hiçbir rakipte olmayan 100 eşzamanlı alt-ajan orkestrasyonu. ChatGPT'de yok, Claude'da yok, Gemini'de yok — yalnızca Kimi'de.
- **Görsel Kodlama:** Ekran görüntüsünden layout, CSS mantığı ve etkileşim kalıplarını anlayarak doğrudan production-ready kod üretir.
- **Açık Kaynak + Uygun Fiyat:** 1 trilyon parametrelik model Modified MIT lisansı ile açık kaynak — self-hosting mümkün.

**Gizli Güçler ve Az Bilinen Özellikler:**
- 4 farklı çalışma modu: Instant → Thinking → Agent → Agent Swarm (Beta)
- Döküman çıktıları: Docs, Slides, Sheets, Websites, Research Reports formatında doğrudan çıktı üretir
- Kimi Code aracı ile IDE entegrasyonu
- PARL sistemi sayesinde alt-ajanlar arası iletişim ve görev dağılımı tamamen otomatik

**Entegrasyonlar ve Eklentiler:**
- OpenAI-uyumlu API (mevcut OpenAI entegrasyonlarına doğrudan bağlanır)
- Kimi Web platformu (ücretsiz erişim)
- Kimi Mobil Uygulama
- Kimi Code (geliştirici odaklı IDE eklentisi)

---

### Prompt Rehberi

**En İyi Sonuç Veren Prompt Yapısı:**
Kimi, yapılandırılmış ve katmanlı prompt'lardan en iyi sonucu verir. Agent Swarm modunda görev ayrıştırmasını kendisi yapar; ancak net hedefler ve çıktı formatı belirtilmelidir.

```
[ROL] — Kimi'ye bir uzmanlık alanı ata
[GÖREV] — Net ve ölçülebilir hedef belirt
[BAĞLAM] — Gerekli arka plan bilgisini ver
[FORMAT] — Çıktı formatını tanımla
[KISITLAMALAR] — Sınırları ve kuralları belirt
```

**Hazır Kullanım Promptları (DZ Tonunda):**

**Prompt 1 — Pazar Araştırması:**
> "Bir pazar araştırma uzmanı olarak, Türkiye'deki SaaS pazarının 2026 trendlerini analiz et. Agent Swarm modunu kullanarak en az 20 farklı kaynaktan veri topla. Çıktıyı şu formatta ver: (1) Pazar Büyüklüğü, (2) Büyüme Oranı, (3) En Aktif Segmentler, (4) Fırsat Alanları. Her maddeye veri kaynağı ekle. Dip notu: Bu araştırma DİPTENZİRVEYE™ vizyonuyla yapılıyor — sıradan değil, stratejik düşün."

**Prompt 2 — Kod Üretimi:**
> "Senior full-stack developer olarak bu ekran görüntüsünü analiz et ve React + Tailwind CSS ile pixel-perfect bir implementasyon oluştur. Responsive olsun, dark mode desteklesin. Kodu modüler yaz, her bileşeni ayrı dosyada ver. Kalite standardı: production-ready."

**Prompt 3 — İçerik Stratejisi:**
> "Dijital içerik stratejisti olarak, bir kişisel gelişim markası için 30 günlük LinkedIn içerik planı oluştur. Her gönderi için: (1) Hook cümlesi, (2) Ana mesaj, (3) CTA, (4) Hashtag önerisi. Ton: %70 profesyonel, %20 ilham verici, %10 cesur. Hedef kitle: 25-40 yaş arası girişimciler."

**Prompt 4 — Belge Analizi:**
> "Hukuk danışmanı olarak bu sözleşmeyi analiz et. Thinking modunu kullan ve şu başlıklarda detaylı rapor çıkar: (1) Risk Alanları, (2) Belirsiz Maddeler, (3) Tavsiye Edilen Değişiklikler, (4) Genel Değerlendirme. Her maddeyi hukuki gerekçesiyle açıkla."

**Prompt 5 — Toplu Veri İşleme:**
> "Veri mühendisi olarak Agent Swarm modunu aktifleştir. Bu 15 CSV dosyasını paralel olarak analiz et: her dosya için (1) veri kalitesi skoru, (2) eksik değer oranı, (3) aykırı değer tespiti, (4) dosyalar arası korelasyon analizi. Sonuçları tek bir özet tabloda birleştir."

---

### DİPTENZİRVEYE™ Serisinde Yeri

| Alan | Detay |
|------|-------|
| **Anlatılacağı Kitap(lar)** | "DİPTENZİRVEYE™: AI Araçları Ansiklopedisi" · "DİPTENZİRVEYE™: Girişimcinin AI Silahları" |
| **Bölüm** | "Çin'in Sessiz Devrimi: Kimi ve Agent Swarm Çağı" — Bölüm 7 |
| **Alt Başlık** | "100 Ajan, Tek Komut: Paralel Düşüncenin Gücü" |
| **Panel Entegrasyonu** | Kimi, "Otomasyon ve Ölçekleme" panelinde canlı Agent Swarm demo'su ile sunulabilir. 100 alt-ajanın gerçek zamanlı çalışması seyirci için görsel bir şov olur. Ayrıca "Açık Kaynak AI" panelinde maliyet-performans analizi konusunda örnek vaka olarak kullanılabilir. |

---

### Karşılaştırma Notu

| Kriter | Kimi K2.5 | ChatGPT (GPT-5.2) | Claude (Opus 4.5) | Gemini (3.0 Pro) |
|--------|-----------|--------------------|--------------------|-------------------|
| **Fiyat (Giriş/M token)** | $0,45 | ~$15-30 | ~$15 | ~$3,50 |
| **Bağlam Penceresi** | 256K | 128K | 200K | 2M |
| **Açık Kaynak** | Evet (Modified MIT) | Hayır | Hayır | Hayır |
| **Agent Swarm** | 100 ajan | Yok | Yok | Yok |
| **Kodlama (LiveCodeBench)** | %85,0 | %83,5 | %82,2 | — |
| **HLE-Full (Araçlı)** | %50,2 | %45,5 | — | — |
| **Çince Yetkinlik** | Mükemmel | İyi | İyi | İyi |
| **Multimodal** | Metin+Görsel+Video | Metin+Görsel+Ses | Metin+Görsel | Metin+Görsel+Ses+Video |

**Güçlü Yönleri:** Fiyat-performans şampiyonu, Agent Swarm benzersiz, açık kaynak, görsel kodlama üstün.  
**Zayıf Yönleri:** İngilizce içerikte ChatGPT ve Claude'un gerisinde, ses modalitesi yok, ekosistemi henüz olgunlaşmamış.

---
---

## DeepSeek

### Genel Tanım

| Bilgi | Detay |
|-------|-------|
| **Geliştiren Şirket** | DeepSeek (深度求索) |
| **Ana Şirket** | High-Flyer Capital Management (kantitatif hedge fon) |
| **Kuruluş Tarihi** | Temmuz 2023 |
| **Kurucu** | Liang Wenfeng (High-Flyer'ın da kurucu ortağı) |
| **Merkez** | Hangzhou, Zhejiang, Çin |
| **Çalışan Sayısı** | ~160 kişi (2025 itibarıyla) |
| **Finansman Modeli** | High-Flyer tarafından finanse ediliyor — dış yatırım almadı |

DeepSeek, yapay zeka dünyasının en büyük sürprizlerinden biri. Bir hedge fon'un yan projesi olarak başlayıp, Ocak 2025'te ChatGPT'yi App Store'da tahtından indiren uygulama oldu. Eğitim maliyeti yalnızca ~6 milyon dolar olan DeepSeek-V3, sektördeki milyar dolarlık bütçelere sahip rakiplerine kafa tutarak "verimlilik devrimi"nin sembolü haline geldi. Tüm modelleri MIT Lisansı ile açık kaynak olarak yayınlıyorlar.

**Temel Yetenekler ve Odak Alanı:**
- Derin akıl yürütme (chain-of-thought reasoning)
- Matematik ve kodlamada rekabetçi düzey performans
- Açık kaynak felsefesi ve radikal maliyet verimliliği
- Mixture-of-Experts mimarisi ile kaynak optimizasyonu

**2026'daki Güncel Durum (Şubat 2026 itibarıyla):**
- **DeepSeek-V3.2** — En güncel amiral gemisi model (2025 sonu yayınlandı)
- **DeepSeek-V3.2-Speciale** — Yüksek hesaplama gerektiren görevler için özel versiyon
- **DeepSeek-R1** — Akıl yürütme odaklı model (Ocak 2025)
- **DeepSeek-R1 Distilled Variants** — Daha hafif ve ucuz versiyonlar
- Web uygulaması, mobil uygulama ve API üzerinden aktif hizmet

---

### Teknik Özellikler

| Özellik | DeepSeek-V3.2 | DeepSeek-R1 |
|---------|---------------|-------------|
| **Toplam Parametre** | ~685 milyar | 671 milyar |
| **Aktif Parametre** | 37 milyar (MoE) | 37 milyar (MoE) |
| **Bağlam Penceresi** | 128K token | 128K token |
| **Mimari** | MoE + Transformer | MoE + Transformer (V3 tabanlı) |
| **Maks. Çıkış** | 8K (varsayılan), 64K (reasoner modu) | 8K (varsayılan) |
| **Lisans** | MIT (tam açık kaynak) | MIT (tam açık kaynak) |

**Mimari Detaylar:**
- **Multi-Head Latent Attention (MLA):** Daha verimli dikkat mekanizması
- **Mixture-of-Experts (MoE):** 685 milyar parametreden yalnızca 37 milyarı aktif — radikal verimlilik
- **Multi-Token Prediction (MTP):** Aynı anda birden fazla token tahmini
- **DeepSeek Sparse Attention (DSA):** V3.2'ye özel, uzun bağlamda hesaplama karmaşıklığını düşüren mekanizma
- **YaRN Tekniği:** Bağlam penceresini aşamalı genişletme (4K → 32K → 128K)

**Desteklenen Modaliteler:**
- Metin: Tam destek — çok dilli, güçlü akıl yürütme
- Kod: HumanEval %80,2+, rekabetçi programlama düzeyinde
- Görsel: Sınırlı (R1'de multimodal destek yok, V3.2'de temel düzeyde)
- Ses / Video: Desteklenmiyor

**Öne Çıkan Teknik Avantajlar:**
1. **Radikal Maliyet Verimliliği:** V3 modeli ~6 milyon dolara eğitildi (rakipler yüz milyonlarca harcıyor)
2. **MMLU Skoru:** %90,8 — GPT-4'ün %86-87'sini geçiyor
3. **V3.2-Speciale:** 2025 Uluslararası Matematik Olimpiyatı'nda (IMO) altın madalya seviyesinde performans
4. **Otomatik Bağlam Önbellekleme:** Tekrarlayan prefix'lerde %90 maliyet düşüşü
5. **Thinking + Tool-Use Entegrasyonu:** Akıl yürütme sürecini araç çağrılarıyla birleştirebilen nadir modellerden

**API Erişimi ve Fiyatlandırma:**

| Metrik | deepseek-chat | deepseek-reasoner | Cache Hit |
|--------|---------------|-------------------|-----------|
| **Giriş Token** | $0,28/M | $0,28/M | $0,028/M (%90 indirim) |
| **Çıkış Token** | $0,42/M | $0,42/M | — |
| **R1 Distilled** | $0,03-0,27/M | — | — |

*Sektörün en uygun fiyatlı büyük dil modeli. Cache hit mekanizmasıyla maliyetler neredeyse sıfıra yaklaşıyor.*

---

### Kullanım Alanları (Girişimci Perspektifinden)

**1. Karmaşık Problem Çözme ve Stratejik Analiz**
R1'in uzun chain-of-thought akıl yürütmesi, çok katmanlı iş problemlerini adım adım çözer. *Örnek:* Bir startup'ın 3 farklı pazara giriş senaryosunu maliyet, risk ve büyüme potansiyeli açısından detaylı analiz ettirmesi — her senaryo için 20+ sayfalık stratejik rapor.

**2. Matematik ve Finans Modelleme**
IMO altın madalya seviyesinde matematik yetkinliği, finans modellemede rakipsiz doğruluk sağlar. *Örnek:* Bir fintech startup'ının kredi risk skorlama algoritmasını geliştirmesi, Monte Carlo simülasyonları çalıştırması.

**3. Açık Kaynak Self-Hosting ve Özelleştirme**
MIT lisansı ile modeli kendi sunucunuzda çalıştırabilir, fine-tune edebilir ve ticari olarak kullanabilirsiniz. *Örnek:* Bir sağlık teknolojisi şirketinin DeepSeek'i kendi tıbbi veri seti ile fine-tune ederek HIPAA uyumlu, özel bir AI asistanı oluşturması.

**4. Kod Üretimi ve Otomasyonu**
HumanEval'de güçlü performans, V3.2'de thinking + tool-use entegrasyonu. *Örnek:* DevOps ekibinin CI/CD pipeline'larını otomatik oluşturması, hata ayıklama ve kod review süreçlerini hızlandırması.

**5. Maliyet-Bilinçli Ölçekleme**
Cache hit mekanizmasıyla tekrarlayan görevlerde %90 maliyet düşüşü. *Örnek:* Bir e-ticaret platformunun günlük 10 milyon müşteri sorgusunu DeepSeek API ile yanıtlaması — aylık maliyet ChatGPT'nin 1/50'si.

---

### Özel Yetenekler / Skill Dosyası

**Benzersiz Özellikler (Rakiplerden Farkı):**
- **Verimlilik Devrimi:** 6 milyon dolarlık eğitim bütçesiyle sektörün en güçlü modellerinden birini üretti. Bu, yapay zeka demokratikleşmesinin manifestosu.
- **Thinking + Tool-Use Füzyonu:** V3.2, akıl yürütme sürecinde araç çağrılarını entegre eden ilk modellerden. Düşünürken aynı anda API çağırabilir, veritabanı sorgulayabilir, dosya işleyebilir.
- **Hedge Fon DNA'sı:** Kantitatif finans geçmişi, modele sayısal doğruluk ve analitik derinlik konusunda benzersiz bir avantaj veriyor.

**Gizli Güçler ve Az Bilinen Özellikler:**
- V3.2-Speciale, sınırlı sayıda kullanıcıya sunulan yüksek performanslı varyant — Gemini-3.0-Pro seviyesinde
- Agentic Task Synthesis: 1.800+ simüle edilmiş ortamda 85.000+ karmaşık talimat ile eğitilmiş ajan yetenekleri
- PPO/GRPO tabanlı ölçeklenebilir pekiştirmeli öğrenme pipeline'ı
- R1 Distilled varyantlar: Düşük kaynaklı ortamlarda bile çalışabilen hafif modeller ($0,03/M token)
- Otomatik context caching: Aynı prefix'i paylaşan isteklerde dramatik maliyet düşüşü

**Entegrasyonlar ve Eklentiler:**
- OpenAI-uyumlu API (drop-in replacement)
- DeepSeek Web Uygulaması (chat.deepseek.com)
- DeepSeek Mobil Uygulama
- Hugging Face üzerinden model indirme ve self-hosting
- NVIDIA NIM desteği
- JSON output, tool calls ve chat prefix completion desteği

---

### Prompt Rehberi

**En İyi Sonuç Veren Prompt Yapısı:**
DeepSeek, özellikle `deepseek-reasoner` modunda uzun düşünme zincirleriyle çalışır. Karmaşık problemleri adım adım çözmesi için problem tanımını net yapın ve düşünme sürecini yönlendirin.

```
[PROBLEM] — Çözülecek sorunu net tanımla
[VERİLER] — Mevcut verileri ve kısıtlamaları sun
[ADIMLAR] — İstenen analiz adımlarını listele
[ÇIKTI] — Beklenen çıktı formatını belirt
[KALİTE] — Doğrulama ve kalite kriterleri ekle
```

**Hazır Kullanım Promptları (DZ Tonunda):**

**Prompt 1 — Stratejik Analiz:**
> "Kıdemli iş stratejisti olarak düşün. Şu sorunu deepseek-reasoner modunda adım adım analiz et: Türkiye'de bir B2B SaaS startup'ı olarak ilk 1 milyon dolar ARR'a ulaşmak için en verimli strateji nedir? Göz önünde bulundur: (1) Türkiye pazar dinamikleri, (2) B2B satış döngüsü, (3) Birim ekonomisi, (4) Büyüme kaldıraçları. Her adımı gerekçesiyle açıkla. Çıktı: 10 sayfalık stratejik yol haritası. Kalite: Her öneriye sayısal dayanak ekle."

**Prompt 2 — Kod Mimarisi:**
> "Principal software architect olarak bu mikroservis mimarisini analiz et. Thinking modunu kullanarak şu soruları yanıtla: (1) Darboğaz noktaları nerede? (2) Ölçekleme stratejisi ne olmalı? (3) Hangi servisler birleştirilebilir? (4) Maliyet optimizasyonu önerileri? Her yanıtı teknik gerekçeyle destekle. Çıktı formatı: Mimari Decision Records (ADR)."

**Prompt 3 — Finansal Modelleme:**
> "Kantitatif finans analisti olarak, bu startup için 5 yıllık finansal projeksiyon modeli oluştur. Parametreler: [gelir, gider, büyüme oranı]. Üç senaryo çalış: İyimser, Baz, Kötümser. Her senaryoda: (1) Aylık nakit akışı, (2) Break-even noktası, (3) Birim ekonomisi metrikleri, (4) Hassasiyet analizi. Formülleri göster, varsayımları açıkla."

**Prompt 4 — Araştırma Sentezi:**
> "Akademik araştırmacı olarak şu konu hakkında kapsamlı bir literatür taraması sentezi yap: [konu]. Thinking modunu kullanarak: (1) Ana teorik çerçeveleri özetle, (2) Çelişkili bulguları karşılaştır, (3) Araştırma boşluklarını tespit et, (4) Gelecek araştırma yönergeleri öner. Ton: Akademik ama erişilebilir."

**Prompt 5 — Otomasyon Scripti:**
> "DevOps mühendisi olarak şu iş akışını otomatize eden bir Python scripti yaz: [iş akışı tanımı]. Gereksinimler: (1) Hata yönetimi kapsamlı olsun, (2) Loglama ekle, (3) .env ile konfigürasyon yönetimi, (4) Retry mekanizması, (5) Unit testler dahil. Kodu modüler yaz, her fonksiyonu docstring ile belgele."

---

### DİPTENZİRVEYE™ Serisinde Yeri

| Alan | Detay |
|------|-------|
| **Anlatılacağı Kitap(lar)** | "DİPTENZİRVEYE™: AI Araçları Ansiklopedisi" · "DİPTENZİRVEYE™: Sıfırdan Zirveye AI ile İş Kurma" |
| **Bölüm** | "6 Milyon Dolarlık Devrim: DeepSeek ve Verimliliğin Gücü" — Bölüm 5 |
| **Alt Başlık** | "Herkes İçin AI: Açık Kaynak Manifestosu" |
| **Panel Entegrasyonu** | DeepSeek, "Maliyet Verimliliği ve Ölçekleme" panelinde sunulabilir. Canlı demo: Aynı görevi ChatGPT ve DeepSeek ile paralel çalıştırıp maliyet karşılaştırması yapmak. "Açık Kaynak AI" panelinde self-hosting demo'su, fine-tuning süreci gösterilebilir. Ayrıca "Girişimci için Finansal Modelleme" atölyesinde DeepSeek-Reasoner kullanılarak gerçek zamanlı model oluşturma yapılabilir. |

---

### Karşılaştırma Notu

| Kriter | DeepSeek V3.2/R1 | ChatGPT (GPT-5.2) | Claude (Opus 4.5) | Gemini (3.0 Pro) |
|--------|-------------------|--------------------|--------------------|-------------------|
| **Fiyat (Giriş/M token)** | $0,28 (cache: $0,028) | ~$15-30 | ~$15 | ~$3,50 |
| **Bağlam Penceresi** | 128K | 128K | 200K | 2M |
| **Açık Kaynak** | Evet (MIT) | Hayır | Hayır | Hayır |
| **MMLU Skoru** | %90,8 | %86-87 | — | — |
| **Matematik (IMO)** | Altın madalya (Speciale) | Güçlü | — | Güçlü |
| **Multimodal** | Sınırlı (metin + kod odaklı) | Metin+Görsel+Ses | Metin+Görsel | Metin+Görsel+Ses+Video |
| **Akıl Yürütme** | Derin CoT, thinking+tool-use | Güçlü | Güçlü | En güçlü (2.5 Pro) |
| **Eğitim Maliyeti** | ~$6M | Milyarlarca$ | — | Milyarlarca$ |

**Güçlü Yönleri:** Sektörün en düşük maliyeti, açık kaynak esnekliği, üstün matematiksel akıl yürütme, hedge fon DNA'sıyla sayısal derinlik, self-hosting imkanı.  
**Zayıf Yönleri:** Multimodal yetenekler zayıf (ses ve video yok), İngilizce doğal dil üretiminde ChatGPT ve Claude'un gerisinde, güvenlik filtreleri tartışmalı, eklenti/plugin ekosistemi yok.

---
---

## Kimi vs DeepSeek: Doğrudan Karşılaştırma

| Kriter | Kimi K2.5 | DeepSeek V3.2/R1 |
|--------|-----------|-------------------|
| **En Güçlü Alan** | Agent Swarm + Multimodal | Derin Akıl Yürütme + Maliyet |
| **Fiyat** | $0,45/M giriş | $0,28/M giriş (cache: $0,028) |
| **Parametre** | 1T toplam / 32B aktif | 685B toplam / 37B aktif |
| **Bağlam** | 256K token | 128K token |
| **Açık Kaynak** | Modified MIT | MIT (tam açık) |
| **Multimodal** | Metin + Görsel + Video | Metin + Kod (sınırlı görsel) |
| **Ajan Yeteneği** | 100 paralel ajan | Thinking + Tool-Use |
| **Matematik** | Güçlü | Üstün (IMO altın) |
| **Kodlama** | Üstün (LiveCodeBench %85) | Güçlü (HumanEval %80,2) |
| **Çince Yetkinlik** | Mükemmel | Çok İyi |
| **Self-Hosting** | Mümkün | Mümkün (daha yaygın topluluk) |

### DZ Perspektifi: Hangisini Ne Zaman Kullan?

**Kimi'yi Seç:**
- Büyük ölçekli otomasyon ve paralel görev yönetimi gerektiğinde
- Görsel tasarımdan kod üretmek istediğinde
- Çok modlu (metin + görsel + video) iş akışlarında
- Çin pazarına yönelik içerik ve iletişimde

**DeepSeek'i Seç:**
- Karmaşık matematiksel ve analitik problemlerde
- Bütçe kısıtlı ölçekleme projelerinde
- Self-hosting ve model özelleştirme gerektiğinde
- Finansal modelleme ve stratejik analiz çalışmalarında

> *"İkisi de Çin'den, ikisi de açık kaynak, ikisi de devrimci. Ama biri orkestra şefi gibi yüz ajanı yönetiyor, diğeri bir matematikçi gibi problemlerin derinliklerine dalıyor. Girişimci olarak ikisini de araç kutunda tutmalısın — birini otomasyon için, diğerini analiz için."*
>
> — **DİPTENZİRVEYE™ Perspektifi**

---

> **Dosya Sonu Notu:** Bu araştırma Şubat 2026 itibarıyla güncel kaynaklardan derlenmiştir. AI alanındaki hızlı gelişmeler nedeniyle model versiyonları, fiyatlandırma ve benchmark skorları değişiklik gösterebilir. Güncel bilgi için resmi kaynaklara başvurunuz.
>
> **Kaynaklar:** Moonshot AI resmi platformu, DeepSeek API dokümanları, bağımsız benchmark analizleri, sektör karşılaştırma raporları ve teknoloji basını sentezlenmiştir.

---

*DİPTENZİRVEYE™ — Her bilgi bir silah, her araç bir kaldıraç.*
