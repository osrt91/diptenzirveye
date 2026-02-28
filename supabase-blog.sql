-- Blog Posts tablosu
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Genel',
  read_time TEXT NOT NULL DEFAULT '3 Dk Okuma',
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Güncelleme tarihini otomatik ayarla
CREATE OR REPLACE FUNCTION update_blog_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_blog_updated_at();

-- RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Blog posts are publicly readable"
  ON blog_posts FOR SELECT
  USING (published = true);

CREATE POLICY "Admins can manage blog posts"
  ON blog_posts FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'moderator')
    )
  );

-- Başlangıç verileri
INSERT INTO blog_posts (slug, title, excerpt, content, category, read_time, published) VALUES
(
  'erteleme-aliskanligini-kirmak-icin-2-dakika-kurali',
  'Erteleme Alışkanlığını Kırmak İçin ''2 Dakika Kuralı''',
  'Neden başlarken bu kadar zorlanıyoruz? Ve sadece 120 saniye ile hedeflerimize başlamak nasıl mümkün olabilir?',
  E'Neden başlamak her zaman bu kadar zordur? Çalışma masanıza oturursunuz, bilgisayarı açarsınız ve aniden masayı toplamak ya da e-postalarınızı onuncu kez kontrol etmek çok daha cazip gelir.\n\n## 2 Dakika Kuralı Nedir?\n\nBu kural çok basittir: Herhangi bir yeni alışkanlığa veya ertelediğiniz bir projeye başlarken, başlangıç süresini sadece **iki dakikaya** indirmektir.\n\n- "Okumaya başlayacağım" yerine "Sadece bir sayfa okuyacağım" deyin.\n- "Günün tüm işlerini bitireceğim" yerine "Sadece bilgisayarı açıp dosyayı isimlendireceğim" deyin.\n\n## Bitti, Mükemmelden İyidir\n\nAmaç işi bitirmek değil, sürtünmeyi ortadan kaldırmaktır. İki dakika sonra bırakma hakkınız her zaman vardır. Ancak Newton''un birinci hareket yasasında olduğu gibi: Hareket halindeki nesne, hareket etmeye devam etme eğilimindedir.',
  'Verimlilik',
  '3 Dk Okuma',
  true
),
(
  'derin-calisma-nedir-ve-nasil-uygulanir',
  'Derin Çalışma (Deep Work) Nedir ve Nasıl Uygulanır?',
  'Sürekli bildirimlerin olduğu bir dünyada, odaklanma yeteneği nadir ve paha biçilemez bir beceridir.',
  E'Cal Newport''un ortaya koyduğu Derin Çalışma (Deep Work) kavramı, dikkat dağıtıcılardan arınmış bir ortamda, bilişsel olarak zorlu görevlere tam konsantrasyonla odaklanma yeteneğidir.\n\n## Neden Derin Çalışma?\n\nDijital çağda dikkatimiz sürekli bölünüyor. Ortalama bir bilgi çalışanı her 11 dakikada bir kesintiye uğruyor ve odaklanmayı yeniden kazanması 25 dakika sürüyor.\n\n## Nasıl Uygulanır?\n\n1. **Ritüel oluşturun** — Her gün aynı saatte, aynı yerde çalışın.\n2. **Zaman blokları** — 90 dakikalık derin çalışma + 20 dakika mola.\n3. **Dijital detoks** — Çalışma süresinde tüm bildirimleri kapatın.\n4. **Pomodoro** — DiptenZirveye panelindeki Zihin Motoru ile odaklanma seansları yapın.',
  'Odaklanma',
  '5 Dk Okuma',
  true
),
(
  'mukemmelliyetcilik-tuzagindan-kurtulmak',
  'Mükemmelliyetçilik Tuzağından Kurtulmak: ''Bitti'' ''Mükemmel''den İyidir',
  'Her şeyin kusursuz olmasını beklemek, aslında projelerimizi bitirmememizin en büyük sebebidir.',
  E'Mükemmelliyetçilik, genellikle olumlu bir özellik olarak görülür. Ancak araştırmalar, mükemmelliyetçiliğin ertelemenin en güçlü tetikleyicilerinden biri olduğunu göstermektedir.\n\n## Mükemmel''in Düşmanı\n\n"İyi"nin düşmanı "kötü" değil, "mükemmel"dir. Bir projeyi mükemmel yapma isteği, çoğu zaman o projeyi hiç başlatmama veya yarım bırakma sonucunu doğurur.\n\n## Pratik Çözümler\n\n1. **MVP yaklaşımı** — Minimum uygulanabilir ürün ile başlayın.\n2. **%80 kuralı** — %80 tamamlanmış bir iş, %0 tamamlanmış mükemmel plandan iyidir.\n3. **Geri bildirim döngüsü** — Erken paylaşın, geri bildirim alın, iteratif iyileştirin.\n4. **Zaman sınırı** — Her göreve bir süre limiti koyun.',
  'Psikoloji',
  '4 Dk Okuma',
  true
);
