-- ════════════════════════════════════════════════════════
-- DİPTENZİRVEYE — TÜM YENİ TABLOLAR (Tek Dosya)
-- Bu dosyayı Supabase SQL Editor'de çalıştırın
-- ════════════════════════════════════════════════════════

-- ─── 1. BLOG POSTS ────────────────────────────────────
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

CREATE OR REPLACE FUNCTION update_blog_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS blog_posts_updated_at ON blog_posts;
CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_blog_updated_at();

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Blog posts are publicly readable" ON blog_posts;
CREATE POLICY "Blog posts are publicly readable"
  ON blog_posts FOR SELECT USING (published = true);

DROP POLICY IF EXISTS "Admins can manage blog posts" ON blog_posts;
CREATE POLICY "Admins can manage blog posts"
  ON blog_posts FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'moderator')));

-- Blog başlangıç verileri
INSERT INTO blog_posts (slug, title, excerpt, content, category, read_time, published) VALUES
('erteleme-aliskanligini-kirmak-icin-2-dakika-kurali', 'Erteleme Alışkanlığını Kırmak İçin ''2 Dakika Kuralı''', 'Neden başlarken bu kadar zorlanıyoruz?', 'İçerik burada...', 'Verimlilik', '3 Dk Okuma', true),
('derin-calisma-nedir-ve-nasil-uygulanir', 'Derin Çalışma (Deep Work) Nedir ve Nasıl Uygulanır?', 'Odaklanma yeteneği nadir ve paha biçilemez bir beceridir.', 'İçerik burada...', 'Odaklanma', '5 Dk Okuma', true),
('mukemmelliyetcilik-tuzagindan-kurtulmak', 'Mükemmelliyetçilik Tuzağından Kurtulmak', 'Her şeyin kusursuz olmasını beklemek aslında en büyük engeldir.', 'İçerik burada...', 'Psikoloji', '4 Dk Okuma', true)
ON CONFLICT (slug) DO NOTHING;

-- ─── 2. KUPONLAR ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS coupons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  discount_percent INTEGER NOT NULL CHECK (discount_percent > 0 AND discount_percent <= 100),
  max_uses INTEGER DEFAULT NULL,
  used_count INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  expires_at TIMESTAMPTZ DEFAULT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Coupons are publicly readable for validation" ON coupons;
CREATE POLICY "Coupons are publicly readable for validation"
  ON coupons FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage coupons" ON coupons;
CREATE POLICY "Admins can manage coupons"
  ON coupons FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'moderator')));

INSERT INTO coupons (code, discount_percent, max_uses, active) VALUES
('HOSGELDIN', 20, 100, true),
('KURUCU14', 30, 14, true),
('AI2026', 15, NULL, true)
ON CONFLICT (code) DO NOTHING;

-- ─── 3. REFERANSLAR ───────────────────────────────────
CREATE TABLE IF NOT EXISTS referrals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  referred_email TEXT NOT NULL,
  referred_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'registered', 'premium')),
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can see their own referrals" ON referrals;
CREATE POLICY "Users can see their own referrals"
  ON referrals FOR SELECT USING (referrer_id = auth.uid());

DROP POLICY IF EXISTS "System can insert referrals" ON referrals;
CREATE POLICY "System can insert referrals"
  ON referrals FOR INSERT WITH CHECK (true);

-- ─── 4. KULLANICI YORUMLARI ───────────────────────────
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT '',
  text TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Approved testimonials are public" ON testimonials;
CREATE POLICY "Approved testimonials are public"
  ON testimonials FOR SELECT USING (approved = true);

DROP POLICY IF EXISTS "Authenticated users can submit testimonials" ON testimonials;
CREATE POLICY "Authenticated users can submit testimonials"
  ON testimonials FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Admins can manage testimonials" ON testimonials;
CREATE POLICY "Admins can manage testimonials"
  ON testimonials FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'moderator')));

-- ─── 5. PROFILES GÜNCELLEME ───────────────────────────
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='referral_code') THEN
    ALTER TABLE profiles ADD COLUMN referral_code TEXT UNIQUE;
  END IF;
END $$;
