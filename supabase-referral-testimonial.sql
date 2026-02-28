-- Referans (Davet) Sistemi
CREATE TABLE IF NOT EXISTS referrals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  referred_email TEXT NOT NULL,
  referred_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'registered', 'premium')),
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can see their own referrals"
  ON referrals FOR SELECT
  USING (referrer_id = auth.uid());

CREATE POLICY "System can insert referrals"
  ON referrals FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can manage referrals"
  ON referrals FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'moderator')
    )
  );

-- Kullanıcı Yorumları (Testimonials)
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

CREATE POLICY "Approved testimonials are public"
  ON testimonials FOR SELECT
  USING (approved = true);

CREATE POLICY "Authenticated users can submit testimonials"
  ON testimonials FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can manage testimonials"
  ON testimonials FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'moderator')
    )
  );

-- Profiles tablosuna referral_code ekle (varsa atla)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='referral_code') THEN
    ALTER TABLE profiles ADD COLUMN referral_code TEXT UNIQUE;
  END IF;
END $$;
