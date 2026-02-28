# DİPTENZİRVEYE™ — Diğer Önemli AI Araçları Detay Dosyası

> **Yayın tarihi itibarıyla (Şubat 2026)** güncel bilgilerdir.  
> Bu dosya, DİPTENZİRVEYE™ kitap serisinin tamamlayıcı araştırma kaynağıdır.  
> Ana dosya (ChatGPT, Claude, Gemini, DeepSeek, Kimi, Manus, Grok) için bkz: `AI_ARASTIRMA_DETAY.md`

---

## İçindekiler

1. [Perplexity AI](#perplexity-ai)
2. [Qwen (Alibaba)](#qwen-alibaba)
3. [Mistral AI](#mistral-ai)
4. [Cursor AI](#cursor-ai)
5. [Bolt.new](#boltnew)
6. [Lovable](#lovable)
7. [Replit](#replit)
8. [Mega Karşılaştırma Tablosu](#mega-karşılaştırma-tablosu)

---

# Perplexity AI

## Genel Tanım

**Şirket:** Perplexity AI Inc. (San Francisco, 2022)  
**Kurucu:** Aravind Srinivas (eski Google/DeepMind araştırmacısı)  
**Güncel Versiyon:** Sonar Pro + Deep Research (Şubat 2026)  
**Temel Yetenek:** Yapay zeka destekli gerçek zamanlı araştırma motoru — Google'ın bilgi tekelini kırmaya aday tek araç

Perplexity, klasik bir chatbot değil. Bir **cevap motoru**. Soruyu alır, web'i tarar, kaynakları sentezler ve **her cümlenin altına kaynak numarası koyar**. Girişimci için bu şu anlama gelir: artık 15 sekme açıp araştırma yapmak yok. Tek prompt, derlenmiş cevap.

## Teknik Özellikler

| Özellik | Detay |
|---------|-------|
| **Temel Model** | Sonar (özel model) + GPT-5.1 + Claude Opus 4.5 geçiş desteği |
| **Context Window** | Sonar Pro: yüksek bağlam (çoklu web sayfası sentezi) |
| **Deep Research** | Çoklu web araması + URL içerik çekme + çok adımlı muhakeme |
| **API Fiyatı** | Sonar: $1/1M token — Sonar Pro: $3 input, $15 output/1M token |
| **Özel Araçlar** | Labs (interaktif rapor/dashboard), Pages (makale oluşturucu), Kod Yorumlayıcı |

### Fiyatlandırma (Şubat 2026)

| Plan | Fiyat | Öne Çıkan |
|------|-------|-----------|
| **Free** | $0 | Temel arama, günlük sınırlı |
| **Pro** | $20/ay | 300+ arama/gün, Deep Research (20/gün), model seçimi |
| **Max** | $200/ay | Sınırsız Labs & Deep Research |
| **Education Pro** | $4.99/ay | Öğrenci/eğitimciler için (doğrulanmış) |
| **Enterprise Pro** | $40/kişi/ay | Kurumsal güvenlik, yönetim paneli |
| **Enterprise Max** | $325/kişi/ay | Tam kurumsal paket |

## Kullanım Alanları (Girişimci Perspektifinden)

1. **Pazar Araştırması:** "Türkiye'de 2026'da e-ticaret pazarının büyüklüğü nedir?" — kaynaklı, derlenmiş rapor
2. **Rakip Analizi:** Rakiplerin son haberlerini, fiyatlandırmalarını anlık tarama
3. **Akademik/Teknik Araştırma:** Paper özetleme, teknik kavramları kaynaklı açıklama
4. **İçerik Doğrulama:** Yazdığınız içeriklerdeki iddiaları kaynaklarla doğrulama
5. **Trend Takibi:** Spaces ile belirli konuları organize takip etme

## Özel Yetenekler

### Kaynak Gösterme Sistemi
Perplexity'nin en kritik farkı budur. Her yanıtın her paragrafında `[1]`, `[2]` gibi kaynak numaraları görürsünüz. Tıkladığınızda orijinal kaynağa gidersiniz. Bu, girişimci için **güvenilirlik kalkanı** demektir — yatırımcıya sunum yaparken "Perplexity'nin derlediği verilere göre..." diyebilirsiniz.

### Araştırma Motoru Yaklaşımı
Google size 10 mavi link verir, siz okursunuz. Perplexity o 10 linki okur, sentezler ve size **cevap** verir. Aradaki fark, girişimci için saatler değerinde zaman tasarrufu.

### Spaces (Koleksiyonlar)
Projeleriniz için ayrı araştırma alanları oluşturabilirsiniz. Örneğin "DİPTENZİRVEYE™ Kitap 3 Araştırma" diye bir Space açıp tüm sorularınızı orada toplayabilirsiniz. Ekip ile paylaşılabilir.

### Pro Search
Sonar Pro'nun gelişmiş versiyonu. Otomatik araç kullanımı, çoklu web araması ve URL içerik çekme ile karmaşık sorulara çok adımlı yanıtlar üretir. Basit bir soru sormuyorsunuz — Perplexity sizin yerinize **araştırma yapıyor**.

### Labs
Kodlama bilmeden interaktif raporlar, dashboardlar ve mini web uygulamaları oluşturabilirsiniz. Araştırma sonuçlarınızı görselleştirmenin en hızlı yolu.

## Prompt Rehberi (Türkçe)

**Prompt 1 — Pazar Araştırması:**
```
Türkiye'de 2026 yılında yapay zeka SaaS pazarının büyüklüğünü,
büyüme oranını ve en büyük 5 oyuncuyu araştır.
Kaynakları belirt ve verileri tablo formatında sun.
```

**Prompt 2 — Rakip Analizi:**
```
Şu üç şirketi karşılaştır: [Şirket A], [Şirket B], [Şirket C].
Fiyatlandırma, öne çıkan özellikler, kullanıcı sayısı ve
son 6 aydaki önemli gelişmeleri kaynaklı olarak raporla.
```

**Prompt 3 — Deep Research:**
```
"No-code platformların 2026'da geleneksel yazılım geliştirmeyi
ne ölçüde değiştirdiğini" araştır. Akademik makaleler, sektör
raporları ve uzman görüşlerini sentezle. En az 10 kaynak kullan.
```

## DİPTENZİRVEYE™ Serisinde Yeri

- **Kitap 2 — AI Araştırma & Strateji:** Pazar araştırması, rakip analizi, veri doğrulama
- **Kitap 4 — AI ile İçerik & Pazarlama:** İçerik araştırması, SEO anahtar kelime analizi
- **Kitap 6 — AI ile Karar Verme:** Kaynaklı veri derleme, stratejik karar destek

---

# Qwen (Alibaba)

## Genel Tanım

**Şirket:** Alibaba Cloud (Çin, Hangzhou)  
**Güncel Versiyon:** Qwen3.5 (Şubat 2026), Qwen3 serisi (Nisan 2025+)  
**Temel Yetenek:** Açık kaynak AI modellerin en kapsamlı ekosistemi — 397 milyar parametreye kadar, 201 dil desteği

Qwen, Batı'nın "kapalı kutu" AI modellerine karşı Çin'in açık kaynak cevabı. Ama bu sadece bir "Çin projesi" değil — dünyanın en büyük açık kaynak model ailelerinden biri. 0.6B'den 397B'ye kadar her boyutta model, her dilde çalışma kapasitesi. Girişimci için anlam: **kendi sunucunuzda, kendi kurallarınızla çalışan bir AI**.

## Teknik Özellikler

| Özellik | Detay |
|---------|-------|
| **Son Model** | Qwen3.5 (397B parametre, Şubat 2026) |
| **Model Ailesi** | Dense (0.6B–235B) + MoE (30B-A3B, 235B-A22B) |
| **Eğitim Verisi** | 36 trilyon token (Qwen3), 18T token (Qwen2.5) |
| **Dil Desteği** | 201 dil ve lehçe (Qwen3.5), 119 dil (Qwen3) |
| **Context Window** | 128K token |
| **Lisans** | Apache 2.0 (çoğu model) — ticari kullanım serbest |
| **Özel Modeller** | Qwen3-Coder (kodlama), Qwen3-VL (görsel), Qwen3-Math (matematik) |

### Fiyatlandırma

| Erişim Yolu | Maliyet |
|-------------|---------|
| **Açık Kaynak (Self-Host)** | Ücretsiz (kendi donanım maliyeti) |
| **Alibaba Cloud Model Studio** | Kullanıma göre token bazlı (rekabetçi fiyatlar) |
| **Qwen-Max (API)** | ~$2-4/1M token (premium model) |
| **Yerel Çalıştırma** | Ollama, vLLM, LM Studio ile ücretsiz |

## Kullanım Alanları (Girişimci Perspektifinden)

1. **Kendi AI Ürününü Kurma:** Apache 2.0 lisansı ile Qwen'i kendi SaaS ürününüzün motoru yapabilirsiniz — lisans ücreti yok
2. **Çok Dilli Müşteri Desteği:** 201 dil desteği ile global müşteri hizmeti chatbotu
3. **Veri Gizliliği Gerektiren Projeler:** Modeli kendi sunucunuzda çalıştırın, veri dışarı çıkmasın
4. **Kodlama Asistanı:** Qwen3-Coder ile özel geliştirme ortamı
5. **Maliyet Optimizasyonu:** Küçük modeller (0.6B–7B) edge cihazlarda bile çalışabilir

## Özel Yetenekler

### Çin/Alibaba Ekosistemi
Alibaba Cloud'un tüm servisleriyle entegre çalışır. DingTalk (Çin'in Slack'i), Taobao ve AliExpress üzerinden ticaret verileriyle beslenebilir. Çin pazarına girmek isteyen girişimciler için **altın anahtar**.

### Açık Kaynak Avantajı
Qwen'in en güçlü silahı budur. GPT-5 veya Claude Opus kullanmak için her ay yüzlerce dolar ödemeniz gerekir. Qwen3'ü kendi sunucunuza kurup **sınırsız, ücretsiz** kullanabilirsiniz. Apache 2.0 lisansı ile ticari ürüne de gömebilirsiniz — kimseye telif ödemeden.

### Çok Dilli Destek
201 dil ve lehçe desteği ile dünyada en geniş dil kapsamına sahip model. Türkçe dahil. Özellikle Orta Asya, Orta Doğu ve Güneydoğu Asya dilleri konusunda rakiplerinden belirgin şekilde üstün.

### Hibrit Muhakeme Motoru (Qwen3)
Qwen3'ün en ilginç özelliği: aynı model içinde **düşünme modu** ve **hızlı yanıt modu** arasında geçiş yapabilir. Karmaşık sorularda derinlemesine analiz, basit sorularda hızlı cevap. Bu, API maliyetini optimize eder.

### Özelleşmiş Modeller
- **Qwen3-Coder:** Otonom kodlama ajanı, agentic coding için optimize
- **Qwen3-VL:** Görsel-dil modeli (8B, 32B, 235B) — resim, video analizi
- **Qwen3-Math:** Matematik ve bilimsel hesaplama odaklı
- **Qwen3-Next:** Ultra verimli mimari

## Prompt Rehberi (Türkçe)

**Prompt 1 — Ürün Geliştirme:**
```
Bir e-ticaret platformu için ürün öneri sistemi tasarla.
Kullanıcının geçmiş alışverişlerine, göz atma geçmişine ve
demografik bilgilerine göre kişiselleştirilmiş öneriler sunan
bir Python kodu yaz. Qwen3-Coder ile uyumlu olsun.
```

**Prompt 2 — Çok Dilli İçerik:**
```
Aşağıdaki Türkçe ürün açıklamasını İngilizce, Arapça, Rusça
ve Çince'ye çevir. Her çevirinin yerel kültüre uygun pazarlama
dilinde olmasına dikkat et: [ürün açıklaması]
```

**Prompt 3 — Veri Analizi:**
```
Bu JSON verisindeki müşteri davranış kalıplarını analiz et.
Segmentasyon yap, her segment için satın alma olasılığını hesapla
ve sonuçları Türkçe bir rapor olarak sun: [veri]
```

## DİPTENZİRVEYE™ Serisinde Yeri

- **Kitap 3 — AI ile Ürün Geliştirme:** Kendi AI ürününü kurma, self-host senaryoları
- **Kitap 5 — AI ile Teknik Altyapı:** Açık kaynak model deployment, maliyet optimizasyonu
- **Kitap 7 — Global Ölçeklendirme:** Çok dilli AI stratejisi, Çin pazarı girişi

---

# Mistral AI

## Genel Tanım

**Şirket:** Mistral AI (Paris, Fransa, 2023)  
**Kurucular:** Arthur Mensch, Guillaume Lample, Timothée Lacroix (eski Meta/Google DeepMind)  
**Güncel Versiyon:** Mistral Large, Mistral Medium 3, Le Chat (Şubat 2026)  
**Temel Yetenek:** Avrupa'nın yapay zeka şampiyonu — gizlilik odaklı, GDPR uyumlu, rekabetçi fiyatlı

Mistral, Avrupa'nın "kendi AI'ımız olsun" ihtiyacından doğdu. ABD'li devlerin veri politikalarından rahatsız olan Avrupalı şirketler için **güvenli liman**. Ama sadece güvenlik değil — performans da var. Mistral Medium 3, Claude Sonnet'in %90 performansını **beşte bir fiyata** sunuyor.

## Teknik Özellikler

| Özellik | Detay |
|---------|-------|
| **Flagship Model** | Mistral Large (en güçlü) |
| **Verimli Model** | Mistral Medium 3 ($0.40 input / $2.00 output per 1M token) |
| **Hız** | Flash Answers: ~1000 kelime/saniye (sektörün en hızlılarından) |
| **Multimodal** | Metin, görsel, kod + OCR destekli belge anlama |
| **Özel Araçlar** | Code Interpreter, Image Generation (Flux Ultra), Web Search |
| **Arayüz** | Le Chat (web + mobil) |

### Fiyatlandırma (Şubat 2026)

| Plan | Fiyat | Öne Çıkan |
|------|-------|-----------|
| **Free** | €0 | Tüm temel özellikler, günlük sınırlı |
| **Pro** | €14.99/ay | Sınırsız mesaj, yeni modellere öncelikli erişim |
| **Team** | $24.99/kullanıcı/ay | 200 mesaj/kişi, 30GB depolama, entegrasyonlar |
| **Enterprise** | Özel fiyat | On-premise, SAML SSO, denetim logları, AB veri rezidansı |

### API Fiyatlandırma
| Model | Input (1M token) | Output (1M token) |
|-------|-------------------|---------------------|
| Mistral Medium 3 | $0.40 | $2.00 |
| Mistral Large | ~$2.00 | ~$6.00 |
| Mistral Small | ~$0.10 | ~$0.30 |

## Kullanım Alanları (Girişimci Perspektifinden)

1. **GDPR Uyumlu AI Entegrasyonu:** Avrupa müşterilerine hizmet veren girişimler için zorunluluk
2. **Düşük Maliyetli Yüksek Hacim:** Mistral Medium 3 ile yüksek hacimli API çağrıları — chatbot, içerik üretimi
3. **Kurumsal Belge İşleme:** OCR + doğal dil anlama ile fatura, sözleşme, rapor analizi
4. **Hızlı Prototipleme:** Le Chat'in ücretsiz planı ile AI fikirlerini test etme
5. **On-Premise Deployment:** Hassas verilerle çalışan sektörler (finans, sağlık, hukuk)

## Özel Yetenekler

### Avrupa Merkezli Yaklaşım
Mistral'in kuruluş felsefesi: **AI egemenliği Avrupa'da kalmalı**. Bu sadece bir slogan değil — somut farklar var:
- AB veri merkezlerinde barındırma garantisi
- GDPR tam uyumluluk
- Kurumsal veriler üzerinde sıfır saklama politikası
- BNP Paribas, AXA gibi Avrupa devleri zaten müşteri

### Gizlilik Odaklı Mimari
Avrupa şirketlerinin %61'i yerel barındırılan AI çözümlerini tercih ediyor. Mistral Enterprise bunu üç formatta sunuyor: on-premise (kendi sunucunuz), bulut (AB veri merkezleri) ve özel VPC (sanal özel bulut).

### Le Chat Arayüzü
Mistral'in ChatGPT alternatifi. Flash Answers özelliği ile **saniyede ~1000 kelime** üretebilir — bu, sektörün en hızlı yanıt sürelerinden biri. Kod çalıştırma, görsel üretme (Flux Ultra), web araması ve belge analizi tek arayüzde.

### Maliyet Verimliliği
Girişimciler için kritik: Mistral Medium 3, Claude Sonnet 3.7'nin performansının %90'ını sunarken **5 kat daha ucuz**. Aylık binlerce API çağrısı yapan bir startup için bu, binlerce dolar tasarruf demektir.

### Agent Builder
Le Chat Enterprise içinde özel AI ajanları oluşturabilirsiniz. Belge kütüphaneleri, veri bağlantıları ve özel talimatlarla departman bazlı asistanlar yaratma kapasitesi.

## Prompt Rehberi (Türkçe)

**Prompt 1 — Belge Analizi:**
```
Bu PDF sözleşmesini analiz et. Önemli maddeleri, riskleri ve
dikkat edilmesi gereken noktaları Türkçe olarak listele.
Hukuki terimleri sade bir dille açıkla.
```

**Prompt 2 — Hızlı İçerik Üretimi:**
```
E-ticaret sitemiz için 10 farklı ürün kategorisinde
SEO uyumlu meta açıklamaları yaz. Her biri 155 karakter
sınırında olsun. Kategoriler: [liste]
```

**Prompt 3 — Kurumsal Rapor:**
```
Bu satış verilerini analiz et ve yönetim kuruluna sunulacak
bir özet rapor hazırla. Trendleri, riskleri ve fırsatları
Türkçe olarak belirt. Grafikler için öneriler sun.
```

## DİPTENZİRVEYE™ Serisinde Yeri

- **Kitap 3 — AI ile Ürün Geliştirme:** Maliyet-performans optimizasyonu, API entegrasyonu
- **Kitap 5 — AI ile Teknik Altyapı:** GDPR uyumluluk, Avrupa pazarı stratejisi
- **Kitap 8 — AI Güvenlik & Etik:** Gizlilik odaklı AI kullanımı, veri egemenliği

---

# Cursor AI

## Genel Tanım

**Şirket:** Anysphere Inc. (San Francisco, 2022)  
**Güncel Versiyon:** Cursor v3.x (Şubat 2026)  
**Temel Yetenek:** Dünyanın ilk gerçek AI-native kod editörü — kodlamayı konuşmaya dönüştüren devrim

Cursor, VS Code'un bir fork'u olarak başladı ama artık tamamen farklı bir şey. Bir "editör" değil, bir **kodlama ortağı**. Dosyalarınızı anlıyor, projenizin bağlamını kavriyor ve siz "şunu yap" dediğinizde birden fazla dosyada aynı anda değişiklik yapabiliyor. **Vibe coding**'in doğduğu yer.

## Teknik Özellikler

| Özellik | Detay |
|---------|-------|
| **Temel** | VS Code fork'u — tüm VS Code eklentileriyle uyumlu |
| **AI Modelleri** | GPT-5-Turbo, Claude 3.7 Opus, cursor-small-v3 (özel distil model) |
| **Composer (Agent Mode)** | Çoklu dosya düzenleme ajanı — proje genelinde eşzamanlı değişiklik |
| **@Codebase** | RAG tabanlı proje indeksleme — tüm kod tabanını bağlam olarak kullanır |
| **Shadow Workspace** | Üretilen kodun derleme ve lint kontrolü (arka planda) |
| **Cursor Tab** | Çok satırlı tahmine dayalı kod önerisi motoru |
| **MCP Desteği** | Model Context Protocol — API, veritabanı, dokümantasyon entegrasyonu |

### Fiyatlandırma (Şubat 2026)

| Plan | Fiyat | Öne Çıkan |
|------|-------|-----------|
| **Hobby** | $0 | 2.000 tamamlama, 50 yavaş istek |
| **Pro** | $20/ay | Sınırsız tamamlama, 500 hızlı istek/ay |
| **Business** | $40/kullanıcı/ay | Gizlilik modu, merkezi faturalandırma, yönetim paneli |
| **Enterprise** | Özel fiyat | Özel dağıtım, SLA garantisi |

## Kullanım Alanları (Girişimci Perspektifinden)

1. **Hızlı MVP Geliştirme:** "Bir SaaS dashboard yap" deyince Composer tüm dosya yapısını kurar
2. **Mevcut Projeyi Anlama:** @Codebase ile yeni katıldığınız projeyi dakikalar içinde kavrayın
3. **Bug Düzeltme:** Hata mesajını yapıştırın, Cursor sorunu bulur ve düzeltir
4. **Kod Refactoring:** "Bu modülü TypeScript'e çevir" — toplu dönüşüm
5. **Dokümantasyon:** MCP ile API docs'u çekerek doğru entegrasyonlar yazma

## Özel Yetenekler

### Kod Editörü + AI Entegrasyonu
Cursor'ın farkı: AI bir "eklenti" değil, editörün **kendisi**. Her tuş vuruşunda AI devrede. Tab'a basınca çok satırlı kod önerisi, Ctrl+K ile seçili kodu dönüştürme, Composer ile proje genelinde agent modu. Kodlama deneyiminin her anı AI ile zenginleştirilmiş.

### Vibe Coding
Andrej Karpathy'nin popülerleştirdiği konsept Cursor'da hayat buluyor. **"Vibe coding"** = ne yapacağınızı doğal dilde anlatırsınız, AI kodu yazar. Siz sadece yönlendirirsiniz. Teknik detaylarla uğraşmak yerine **vizyona** odaklanırsınız.

### MCP (Model Context Protocol) Desteği
MCP sunucuları, Cursor ile dış servisler arasında köprü görevi görür:
- **Veritabanı bağlantısı:** AI doğrudan DB şemasını görerek sorgu yazar
- **API entegrasyonu:** Gerçek API dokümantasyonunu çekerek doğru endpoint kullanır
- **Tasarım araçları:** Figma dosyalarından kod üretir
- **Canlı veri:** Gerçek zamanlı bilgiye erişerek varsayım yapmak yerine gerçeğe dayalı kod üretir

### Shadow Workspace
Cursor'ın gizli silahı. AI kod ürettiğinde, arka planda **gölge çalışma alanında** kodu derler, lint'ten geçirir ve hata kontrolü yapar. Siz farkında olmadan, önerilen kodun çalıştığı doğrulanmış olur.

### @Codebase İndeksleme
Projenizin tamamını RAG (Retrieval-Augmented Generation) ile indeksler. "Bu projede kullanıcı kimlik doğrulaması nasıl çalışıyor?" diye sorduğunuzda, Cursor tüm ilgili dosyaları bulur ve bağlamsal bir yanıt verir. 100.000 satırlık projelerde bile etkili.

## Prompt Rehberi (Türkçe)

**Prompt 1 — MVP Oluşturma (Composer):**
```
Next.js 14 + Tailwind CSS + Supabase kullanarak bir müşteri
yönetim paneli oluştur. Müşteri listesi, detay sayfası,
ekleme/düzenleme formları ve arama özelliği olsun.
Supabase'de gerekli tabloları oluşturacak SQL migrationları da yaz.
```

**Prompt 2 — Bug Düzeltme:**
```
Bu hata mesajını al ve kök nedeni bul:
[hata mesajı yapıştır]
Düzeltmeyi tüm etkilenen dosyalarda uygula ve
neden bu hatanın oluştuğunu açıkla.
```

**Prompt 3 — Refactoring:**
```
@Codebase Bu projedeki tüm API çağrılarını analiz et.
Tekrar eden kalıpları belirle ve merkezi bir API katmanı oluştur.
Error handling, retry logic ve loading state yönetimini ekle.
```

## DİPTENZİRVEYE™ Serisinde Yeri

- **Kitap 3 — AI ile Ürün Geliştirme:** Ana geliştirme aracı, MVP oluşturma
- **Kitap 5 — AI ile Teknik Altyapı:** Kod editörü kurulumu, MCP entegrasyonu, workflow
- **Kitap 9 — AI Developer Toolkit:** Vibe coding metodolojisi, ileri düzey Cursor teknikleri

---

# Bolt.new

## Genel Tanım

**Şirket:** StackBlitz Inc. (San Francisco)  
**Güncel Versiyon:** Bolt.new (Şubat 2026)  
**Temel Yetenek:** Tarayıcıda çalışan tam yığın uygulama oluşturucu — kurulum yok, indirme yok, sadece prompt ve uygulama

Bolt.new, yazılım geliştirmenin demokratikleşmesinin en somut örneği. Tarayıcınızı açıyorsunuz, ne istediğinizi yazıyorsunuz ve **tam çalışan bir web uygulaması** çıkıyor — frontend, backend, veritabanı dahil. Yerel kurulum yok, terminal yok, npm install yok. **WebContainers** teknolojisi sayesinde Node.js tarayıcınızda çalışıyor.

## Teknik Özellikler

| Özellik | Detay |
|---------|-------|
| **Teknoloji** | WebContainers (tarayıcıda Node.js) |
| **Editör** | VS Code benzeri tarayıcı içi editör |
| **Önizleme** | Gerçek zamanlı canlı önizleme |
| **Deployment** | Bolt Hosting ile tek tıkla yayınlama |
| **Entegrasyonlar** | Supabase, Figma import, GitHub import |
| **Hata Yönetimi** | Otomatik test, refactoring, hata yakalama (%98 daha az hata) |
| **Dosya Yükleme** | Free: 10MB, Pro: 100MB |

### Fiyatlandırma (Şubat 2026)

| Plan | Fiyat | Token/Ay | Öne Çıkan |
|------|-------|----------|-----------|
| **Free** | $0 | 1M (300K/gün) | Bolt markalı, temel özellikler |
| **Pro** | $25/ay | 10M | Özel domain, marka yok, token devri |
| **Teams** | $30/kişi/ay | 10M/kişi | Ekip işbirliği, özel NPM, yönetim |
| **Enterprise** | Özel | Özel | SSO, denetim, özel destek |

> Not: Token'lar aktif abonelikte 2 aya kadar devredebilir.

## Kullanım Alanları (Girişimci Perspektifinden)

1. **MVP'den Ürüne:** İş fikrini 30 dakikada çalışan uygulamaya dönüştürme
2. **Müşteri Demosu:** Toplantıda canlı olarak "şöyle bir şey mi istiyorsunuz?" deyip anında prototip oluşturma
3. **Landing Page:** Pazarlama sayfalarını kod bilmeden oluşturma ve yayınlama
4. **Dahili Araçlar:** Şirket içi dashboard, form, raporlama araçları
5. **Eğitim/Workshop:** Katılımcılara canlı olarak uygulama geliştirme gösterisi

## Özel Yetenekler

### Tarayıcıda Tam Proje Oluşturma
Bolt'un devrimci farkı: **hiçbir şey yüklemenize gerek yok**. WebContainers teknolojisi, tarayıcınızda tam bir Node.js ortamı çalıştırır. npm paketleri kurar, sunucu başlatır, veritabanı bağlantısı yapar — hepsi tarayıcı sekmesinde. Bilgisayarınıza hiçbir şey yüklenmez.

### No-Code / Low-Code Köprüsü
Bolt, tam no-code (prompt ile uygulama) ve low-code (editörde ince ayar) arasında akıcı geçiş sağlar. Prompt ile başlayıp, sonra VS Code benzeri editörde detayları ayarlayabilirsiniz. Bu, teknik ve teknik olmayan ekip üyelerinin aynı projede çalışmasını sağlar.

### Figma & GitHub Import
Mevcut tasarımlarınızı (Figma) veya kod tabanınızı (GitHub) Bolt'a aktarabilirsiniz. Sıfırdan başlamak zorunda değilsiniz — mevcut projenizi AI ile geliştirmeye devam edebilirsiniz.

### Tek Tıkla Deployment
"Deploy" butonuna bastığınızda uygulamanız SSL sertifikalı bir URL'de canlı olur. Özel domain bağlama, Pro plandan itibaren mevcut. Hosting, Bolt altyapısında çalışır — ayrı bir sunucu yönetimi yok.

### Hata Azaltma (%98)
Bolt'un öne sürdüğü iddia: otomatik test, refactoring ve iterasyon ile geleneksel geliştirmeye göre %98 daha az hata. AI, ürettiği kodu test eder, hataları yakalar ve düzeltir — siz farkında bile olmadan.

## Prompt Rehberi (Türkçe)

**Prompt 1 — SaaS MVP:**
```
Bir abonelik yönetim platformu oluştur. Kullanıcı kayıt/giriş,
plan seçimi (Free/Pro/Enterprise), ödeme sayfası (Stripe benzeri UI),
kullanıcı dashboard'u ve admin paneli olsun.
React + Tailwind + Supabase kullan.
```

**Prompt 2 — Landing Page:**
```
Bir AI startup'ı için modern landing page yap.
Hero section, özellikler grid'i, fiyatlandırma tablosu,
müşteri yorumları carousel'ı ve iletişim formu olsun.
Koyu tema, gradient arka plan, animasyonlu geçişler kullan.
```

**Prompt 3 — Dahili Araç:**
```
Şirket içi görev takip uygulaması oluştur.
Kanban board (Todo/In Progress/Done), görev atama,
öncelik belirleme, tarih filtreleme ve basit raporlama olsun.
Verileri Supabase'de sakla.
```

## DİPTENZİRVEYE™ Serisinde Yeri

- **Kitap 1 — AI ile İlk Adım:** Kod bilmeden ilk uygulamanı yap
- **Kitap 3 — AI ile Ürün Geliştirme:** Hızlı MVP, prototipleme
- **Kitap 4 — AI ile Pazarlama:** Landing page ve kampanya sayfaları oluşturma

---

# Lovable

## Genel Tanım

**Şirket:** Lovable (eski adıyla GPT Engineer, İsveç/Avrupa)  
**Güncel Versiyon:** Lovable 2.0 (Şubat 2026)  
**Temel Yetenek:** Doğal dilde tam yığın web uygulaması oluşturma — Supabase entegrasyonu ile backend dahil

Lovable, "GPT Engineer" olarak başlayıp yeniden markalandı ve odağını netleştirdi: **hızlı prototipleme**. Bolt.new'e benzer ama farkı Supabase ile derin entegrasyon ve GitHub senkronizasyonu. Ürettiğiniz kodun **tam sahibisiniz** — istediğiniz zaman dışa aktarıp kendi sunucunuzda çalıştırabilirsiniz.

## Teknik Özellikler

| Özellik | Detay |
|---------|-------|
| **Frontend** | React (otomatik oluşturma) |
| **Backend** | Supabase (yerleşik entegrasyon) |
| **Editör** | Figma benzeri görsel editör + doğal dil |
| **Versiyon Kontrolü** | GitHub senkronizasyonu (otomatik) |
| **Deployment** | Tek tıkla yayınlama (SSL + özel domain) |
| **Kod Sahipliği** | Tam — istediğiniz zaman indirip çıkabilirsiniz |

### Fiyatlandırma (Şubat 2026) — Kredi Bazlı

| Plan | Fiyat | Kredi/Ay | Öne Çıkan |
|------|-------|----------|-----------|
| **Free** | $0 | 30 + 5 günlük | Temel deneyim |
| **Starter** | $20/ay | 100 + 5 günlük | Başlangıç projeleri |
| **Launch** | $50/ay | 200+ | Ciddi geliştirme |
| **Scale** | $200/ay | Binlerce | Yoğun kullanım |
| **Enterprise** | Özel | Özel | Kurumsal özellikler |

> Not: Yıllık faturalandırmada %16-20 indirim. Supabase altyapısı ek maliyet (~$300-600/yıl).

## Kullanım Alanları (Girişimci Perspektifinden)

1. **Startup MVP:** İş fikrini saatler içinde çalışan uygulamaya dönüştürme
2. **Müşteri Prototipi:** Ajanslar için müşteri taleplerine hızlı prototip
3. **İç Araçlar:** Şirket içi CRUD uygulamaları, form yönetimi, dashboard
4. **Freelancer Portalı:** Freelancerlar için hızlı proje teslimatı
5. **Hackathon:** Yarışmalarda saatler içinde tam çalışan ürün sunma

## Özel Yetenekler

### Hızlı Prototipleme
Lovable'ın en güçlü kartı: **hız**. Bir fikri anlatıyorsunuz, dakikalar içinde React frontend + Supabase backend ile çalışan bir prototip çıkıyor. Geleneksel geliştirmede haftalar sürecek iş, burada bir öğleden sonra.

### Supabase Entegrasyonu
Bolt.new'den farklı olarak, Lovable Supabase'i **birinci sınıf vatandaş** olarak ele alır:
- Otomatik tablo oluşturma
- Kullanıcı kimlik doğrulama (auth) kurulumu
- Row Level Security (RLS) yapılandırması
- Gerçek zamanlı veri senkronizasyonu
- Edge Functions desteği

Bu, ürettiğiniz uygulamanın sadece bir prototip değil, **üretime hazır bir backend** ile gelmesi demektir.

### GitHub Senkronizasyonu
Her proje otomatik olarak bir GitHub reposuna bağlanır. Her değişiklik commit olarak kaydedilir. Bu şu anlama gelir:
- Lovable'dan çıkıp Cursor'da geliştirmeye devam edebilirsiniz
- Ekibiniz Git workflow'u ile çalışabilir
- Kod hiçbir zaman "kaybolmaz"

### Görsel Editör
Figma benzeri bir canvas'ta pixel-perfect düzenlemeler yapabilirsiniz. Prompt ile oluşturulan UI'ı, sürükle-bırak ile ince ayar yapabilirsiniz. Tasarımcı ve geliştirici arasındaki köprü.

### Tam Kod Sahipliği
Lovable'ın en girişimci dostu özelliği: **kodunuz sizin**. İstediğiniz zaman tam kaynak kodunu indirip kendi sunucunuzda çalıştırabilirsiniz. Vendor lock-in yok. Bu, yatırımcılar için de önemli bir güvence.

## Prompt Rehberi (Türkçe)

**Prompt 1 — SaaS Uygulaması:**
```
Bir proje yönetim uygulaması oluştur. Kullanıcılar kayıt olup
giriş yapabilsin. Projeler oluşturabilsin, her projede görevler
ekleyebilsin. Görevlere durum (yapılacak/yapılıyor/bitti),
öncelik ve son tarih atanabilsin. Supabase kullan.
```

**Prompt 2 — E-Ticaret Prototipi:**
```
Basit bir e-ticaret vitrini oluştur. Ürün listesi, ürün detay
sayfası, sepet ve sipariş özeti olsun. Ürünler Supabase'den
gelsin. Responsive tasarım ve modern UI kullan.
```

**Prompt 3 — Dashboard:**
```
Bir sosyal medya analitik dashboard'u yap. Takipçi grafiği,
etkileşim oranları, en çok beğenilen gönderiler listesi ve
performans karşılaştırma tablosu olsun. Demo verilerle göster.
```

## DİPTENZİRVEYE™ Serisinde Yeri

- **Kitap 1 — AI ile İlk Adım:** İlk web uygulamanı oluşturma
- **Kitap 3 — AI ile Ürün Geliştirme:** MVP'den ürüne geçiş, Supabase backend
- **Kitap 5 — AI ile Teknik Altyapı:** Lovable → Cursor geçiş workflow'u

---

# Replit

## Genel Tanım

**Şirket:** Replit Inc. (San Francisco, 2016)  
**Kurucu:** Amjad Masad  
**Güncel Versiyon:** Replit Agent v3 (Şubat 2026)  
**Temel Yetenek:** Bulut IDE + otonom AI ajanı + tek tıkla deployment — yazılımın "YouTube'u" olmayı hedefliyor

Replit, diğer araçlardan farklı olarak **tam bir ekosistem**. Sadece kod üretmiyor — kodu yazıyor, çalıştırıyor, test ediyor, hata ayıklıyor ve **yayınlıyor**. Tek bir tarayıcı sekmesinde, fikirden ürüne giden yolun tamamı. Agent v3 ile artık "otonom geliştirici" seviyesinde — karmaşık mimari kararlar alabiliyor.

## Teknik Özellikler

| Özellik | Detay |
|---------|-------|
| **IDE** | Bulut tabanlı (tarayıcıda çalışır) |
| **AI Modelleri** | Claude Sonnet 4 + GPT-4o |
| **Agent Versiyonu** | v3 — otonom çoklu dosya geliştirme |
| **Extended Thinking** | Karmaşık mimari kararlar için derin düşünme modu |
| **Build Modları** | Fast build (3-5 dk) / Full build (10+ dk) |
| **Dil Desteği** | 50+ programlama dili |
| **Deployment** | Tek tıkla hosting, SSL, ölçeklendirme |
| **Özel Özellikler** | Figma import, screenshot-to-code, voice-to-code (mobil) |

### Fiyatlandırma (Şubat 2026) — Kullanıma Dayalı

Replit, geleneksel abonelik yerine **efor bazlı fiyatlandırma** kullanır:

| Özellik | Detay |
|---------|-------|
| **Basit İstekler** | Bug düzeltme, küçük değişiklik — düşük maliyet |
| **Karmaşık Build** | Tam özellik, entegrasyon — tek checkpoint'a paketlenmiş |
| **Aylık Krediler** | Abonelik planına dahil |
| **Kredi Paketleri** | Ek satın alma, hacim indirimi mevcut |
| **Harcama Takibi** | Gerçek zamanlı, bütçe limiti, kullanım uyarıları |

> Not: Kesin fiyatlar istek karmaşıklığına göre dinamik olarak belirlenir.

## Kullanım Alanları (Girişimci Perspektifinden)

1. **Sıfırdan Ürün:** "Bir fintech uygulaması yap" deyince Agent tüm mimariyi kurar
2. **Prototip → Ürün → Deployment:** Tek platformda fikir → kod → canlı
3. **Eğitim Platformu:** Kodlama öğrenenler için interaktif ortam
4. **Mobil Geliştirme:** Voice-to-code ile mobilde bile uygulama geliştirebilme
5. **Hızlı İterasyon:** Otonom debugging sayesinde hata düzeltme süresi minimumda

## Özel Yetenekler

### Bulut IDE + AI Agent
Replit'in en güçlü kartı: **her şey tek yerde**. Yerel kurulum yok, CI/CD pipeline yok, hosting ayarı yok. Agent kodunuzu yazar, test eder ve bir "Deploy" butonu ile dünyaya açar. Bu, özellikle teknik altyapısı olmayan girişimciler için devrimsel.

### Otonom Deployment
Replit'te "deployment" bir proje değil, bir buton tıklaması. Agent:
- SSL sertifikası otomatik kurulumu
- Domain bağlama
- Otomatik ölçeklendirme
- Sağlık izleme
- Hata logları

tüm bunları arka planda halleder.

### Extended Thinking Mode
Agent v3'ün en güçlü özelliklerinden biri: karmaşık isteklerde **derin düşünme moduna** geçer. Veritabanı şeması tasarımı, API mimarisi, güvenlik katmanı gibi konularda sadece kod yazmaz — **mimari kararlar** alır.

### Figma → Kod → Canlı
Tasarım sürecinin tamamını kapsar:
1. Figma'dan tasarım import
2. Screenshot'tan kod üretme
3. Agent ile geliştirme ve düzenleme
4. Tek tıkla deployment

### Voice-to-Code (Mobil)
Replit'in mobil uygulamasında sesli komutlarla kod yazdırabilirsiniz. Yolda bir fikriniz mi var? Telefonunuzu açıp "kullanıcı giriş sayfası ekle" demeniz yeterli.

### App Testing
Agent sadece kod yazmaz — kendi yazdığı kodu **test de eder**. Otomatik tarayıcı testi ile Agent kendi çalışmasını doğrular, hataları bulur ve düzeltir. İnsan müdahalesi minimumda.

## Prompt Rehberi (Türkçe)

**Prompt 1 — Tam Uygulama:**
```
Bir online randevu sistemi oluştur. İşletmeler hizmetlerini
ve müsait saatlerini tanımlayabilsin. Müşteriler randevu alabilsin.
E-posta bildirimi, takvim görünümü ve admin paneli olsun.
PostgreSQL veritabanı kullan ve deploy et.
```

**Prompt 2 — API Geliştirme:**
```
RESTful bir API oluştur: kullanıcı yönetimi (CRUD), JWT kimlik
doğrulama, rate limiting ve Swagger dokümantasyonu olsun.
Node.js + Express + PostgreSQL kullan. Otomatik testleri de yaz.
```

**Prompt 3 — Mevcut Projeyi Geliştirme:**
```
Bu projeye ödeme entegrasyonu ekle. Stripe API kullanarak
aylık abonelik sistemi kur. Webhook'ları handle et, başarılı
ve başarısız ödeme senaryolarını yönet. Test senaryolarını da ekle.
```

## DİPTENZİRVEYE™ Serisinde Yeri

- **Kitap 1 — AI ile İlk Adım:** Kodlama bilmeden ilk deployment
- **Kitap 3 — AI ile Ürün Geliştirme:** Otonom geliştirme, hızlı iterasyon
- **Kitap 5 — AI ile Teknik Altyapı:** Bulut IDE stratejisi, deployment workflow
- **Kitap 9 — AI Developer Toolkit:** Agent v3 ileri düzey kullanımı

---

# Mega Karşılaştırma Tablosu

> Tüm AI araçlarının kapsamlı karşılaştırması — yayın tarihi itibarıyla (Şubat 2026)

## Metin & Genel Amaçlı AI Modelleri

| AI | Tür | En Güçlü Alan | Context | Fiyat (Giriş) | Türkçe | DZ Kitap |
|-----|------|----------------|---------|----------------|--------|----------|
| **ChatGPT** | Genel Amaçlı LLM | Çok yönlülük, geniş ekosistem | 128K | $20/ay (Plus) | ★★★★★ | Kitap 1-9 |
| **Claude** | Genel Amaçlı LLM | Uzun bağlam, kodlama, güvenlik | 200K | $20/ay (Pro) | ★★★★☆ | Kitap 2, 3, 5, 8 |
| **Gemini** | Multimodal LLM | Google entegrasyonu, çoklu ortam | 2M | $19.99/ay (Advanced) | ★★★★★ | Kitap 1, 4, 6 |
| **DeepSeek** | Açık Kaynak LLM | Muhakeme, maliyet verimliliği | 128K | Ücretsiz (açık kaynak) | ★★★☆☆ | Kitap 3, 5 |
| **Kimi** | Uzun Bağlam LLM | Ultra uzun belge analizi | 2M+ | Ücretsiz (temel) | ★★☆☆☆ | Kitap 2 |
| **Grok** | Gerçek Zamanlı LLM | X/Twitter entegrasyonu, güncel veri | 128K | X Premium+ dahil | ★★★☆☆ | Kitap 4, 7 |
| **Perplexity** | Araştırma Motoru AI | Kaynaklı araştırma, veri derleme | Çoklu web | $20/ay (Pro) | ★★★★☆ | Kitap 2, 4, 6 |
| **Qwen** | Açık Kaynak LLM | Çok dilli, self-host, Çin ekosistemi | 128K | Ücretsiz (açık kaynak) | ★★★★☆ | Kitap 3, 5, 7 |
| **Mistral** | Avrupa LLM | GDPR uyumluluk, maliyet verimliliği | 128K | €14.99/ay (Pro) | ★★★☆☆ | Kitap 3, 5, 8 |

## Geliştirme & Kodlama Araçları

| AI | Tür | En Güçlü Alan | Context | Fiyat (Giriş) | Türkçe | DZ Kitap |
|-----|------|----------------|---------|----------------|--------|----------|
| **Cursor AI** | AI Kod Editörü | Vibe coding, çoklu dosya düzenleme | Proje bazlı | $20/ay (Pro) | Arayüz: ✗ / Kod: ★★★★☆ | Kitap 3, 5, 9 |
| **Bolt.new** | Tarayıcı App Builder | No-code tam yığın uygulama | Proje bazlı | $25/ay (Pro) | Arayüz: ✗ / İçerik: ★★★☆☆ | Kitap 1, 3, 4 |
| **Lovable** | AI Prototipleme | Supabase entegrasyonu, hızlı MVP | Proje bazlı | $20/ay (Starter) | Arayüz: ✗ / İçerik: ★★★☆☆ | Kitap 1, 3, 5 |
| **Replit** | Bulut IDE + Agent | Sıfırdan deployment, otonom geliştirme | Proje bazlı | Kullanıma dayalı | Arayüz: ✗ / İçerik: ★★★☆☆ | Kitap 1, 3, 5, 9 |
| **Manus** | Otonom AI Agent | Çoklu araç kullanımı, görev otomasyonu | Görev bazlı | Davet bazlı | ★★★☆☆ | Kitap 6, 7 |

## Medya & Yaratıcı AI Araçları

| AI | Tür | En Güçlü Alan | Context | Fiyat (Giriş) | Türkçe | DZ Kitap |
|-----|------|----------------|---------|----------------|--------|----------|
| **Midjourney** | Görsel Üretim | Sanatsal kalite, estetik tutarlılık | Prompt bazlı | $10/ay (Basic) | Prompt: ★★★☆☆ | Kitap 4 |
| **Runway** | Video Üretim/Düzenleme | AI video düzenleme, Gen-3 Alpha | Video bazlı | $12/ay (Standard) | Arayüz: ✗ | Kitap 4 |
| **Pika** | Video Üretim | Metin→video, görsel→video | Prompt bazlı | Ücretsiz (temel) | Prompt: ★★☆☆☆ | Kitap 4 |
| **ElevenLabs** | Ses Üretim/Klonlama | Ultra gerçekçi ses, çok dilli TTS | Metin bazlı | $5/ay (Starter) | ★★★★★ | Kitap 4, 7 |
| **Synthesia** | AI Video Avatar | Kurumsal video, eğitim içerikleri | Senaryo bazlı | $22/ay (Starter) | ★★★★☆ | Kitap 4, 7 |
| **HeyGen** | AI Video Avatar | Gerçek zamanlı avatar, çeviri | Video bazlı | $24/ay (Creator) | ★★★★☆ | Kitap 4, 7 |
| **Suno** | Müzik Üretim | Metin→şarkı, tam müzik prodüksiyon | Prompt bazlı | $8/ay (Pro) | Prompt: ★★★☆☆ | Kitap 4 |

## Karşılaştırma Özeti

### Hangi Aracı Ne Zaman Kullanmalı?

| Senaryo | Birincil Araç | Yedek Araç |
|---------|---------------|------------|
| **Genel soru-cevap, beyin fırtınası** | ChatGPT | Claude, Gemini |
| **Kaynaklı araştırma** | Perplexity | Gemini (Search) |
| **Uzun belge analizi** | Claude (200K) | Kimi (2M+) |
| **Kod yazma (profesyonel)** | Cursor AI | Claude (kodlama) |
| **No-code uygulama** | Bolt.new | Lovable |
| **Backend dahil MVP** | Lovable | Replit |
| **Otonom geliştirme + deployment** | Replit | Bolt.new |
| **Self-host AI** | Qwen (açık kaynak) | DeepSeek |
| **GDPR uyumlu AI** | Mistral | Qwen (self-host) |
| **Görsel üretim** | Midjourney | ChatGPT (DALL-E) |
| **Video üretim** | Runway | Pika |
| **Ses üretim** | ElevenLabs | — |
| **AI avatar video** | HeyGen | Synthesia |
| **Müzik üretim** | Suno | — |
| **Sosyal medya analizi** | Grok | Perplexity |
| **Görev otomasyonu** | Manus | Replit Agent |
| **Çok dilli içerik** | Qwen | Gemini |

---

## DİPTENZİRVEYE™ Kitap Bazlı AI Araç Haritası

| Kitap | Ana Araçlar | Destekleyici Araçlar |
|-------|-------------|---------------------|
| **Kitap 1 — AI ile İlk Adım** | ChatGPT, Gemini | Bolt.new, Lovable, Replit |
| **Kitap 2 — AI Araştırma & Strateji** | Perplexity, Claude | Kimi, ChatGPT |
| **Kitap 3 — AI ile Ürün Geliştirme** | Cursor AI, Claude | Bolt.new, Lovable, Replit, Qwen, Mistral, DeepSeek |
| **Kitap 4 — AI ile İçerik & Pazarlama** | ChatGPT, Midjourney | Runway, ElevenLabs, Synthesia, HeyGen, Pika, Suno, Bolt.new, Perplexity |
| **Kitap 5 — AI ile Teknik Altyapı** | Cursor AI, Qwen | Replit, Lovable, Mistral, DeepSeek |
| **Kitap 6 — AI ile Karar Verme** | Perplexity, Gemini | Manus, ChatGPT |
| **Kitap 7 — Global Ölçeklendirme** | Qwen, ElevenLabs | Synthesia, HeyGen, Grok, Manus |
| **Kitap 8 — AI Güvenlik & Etik** | Mistral, Claude | ChatGPT |
| **Kitap 9 — AI Developer Toolkit** | Cursor AI, Replit | Claude, ChatGPT |

---

> **DİPTENZİRVEYE™** — Her araç bir tuğla. Doğru sırayla, doğru yere koyarsanız kale olur.  
> Bu dosya, o kalenin malzeme listesidir.

---

*Son güncelleme: Şubat 2026*  
*Kaynak: WebSearch araştırması + resmi dokümantasyonlar*  
*DİPTENZİRVEYE™ serisi için hazırlanmıştır.*
