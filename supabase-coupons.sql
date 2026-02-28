-- Kupon/İndirim Kodu Tablosu
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

-- RLS
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Coupons are publicly readable for validation"
  ON coupons FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage coupons"
  ON coupons FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'moderator')
    )
  );

-- Örnek kuponlar
INSERT INTO coupons (code, discount_percent, max_uses, active) VALUES
('HOSGELDIN', 20, 100, true),
('KURUCU14', 30, 14, true),
('AI2026', 15, NULL, true);
