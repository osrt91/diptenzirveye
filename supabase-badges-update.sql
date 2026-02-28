-- ============================================================
-- DiptenZirveye - ROZET GUNCELLEMESI
-- Yeni kategoriler: Kitap Tamamlama + Topluluk Rozetleri
-- ============================================================

-- Kitap Tamamlama Rozetleri
INSERT INTO public.badges (slug, name, description, icon_emoji, xp_required) VALUES
  ('book-1-tamamla', 'Ilk Adim', 'AI Devrimini Anlamak kitabini tamamla', '📖', 100),
  ('book-3-tamamla', 'Arac Ustasi', '3 kitabi tamamla', '📚', 300),
  ('book-5-tamamla', 'Bilgi Savascisi', '5 kitabi tamamla', '⚔️', 500),
  ('book-10-tamamla', 'Zirve Fatihi', 'Tum 10 kitabi tamamla - Tam sertifika', '🏆', 1000)
ON CONFLICT (slug) DO NOTHING;

-- Topluluk Rozetleri
INSERT INTO public.badges (slug, name, description, icon_emoji, xp_required) VALUES
  ('ilk-mesaj', 'Ses Ver', 'Sohbette ilk mesajini gonder', '💬', 0),
  ('10-mesaj', 'Aktif Uye', '10 mesaj paylas', '🗣️', 0),
  ('ilk-prompt-hub', 'Prompt Paylasici', 'Prompt Hub''a ilk paylasimini yap', '💡', 0),
  ('pomodoro-10', 'Odak Makinesi', '10 Pomodoro oturumu tamamla', '🎯', 0),
  ('pomodoro-50', 'Zihin Motoru', '50 Pomodoro oturumu tamamla', '🧠', 0),
  ('note-10', 'Not Ustasi', '10 not olustur', '📝', 0)
ON CONFLICT (slug) DO NOTHING;

-- XP Seviye Rozetleri (ekstra)
INSERT INTO public.badges (slug, name, description, icon_emoji, xp_required) VALUES
  ('100-xp', 'Yeni Baslayanlar', '100 XP topla', '🌱', 100),
  ('500-xp', 'Gelisen Yetenek', '500 XP topla', '📈', 500),
  ('1000-xp', 'Deneyimli', '1000 XP topla', '⭐', 1000),
  ('2500-xp', 'Uzman', '2500 XP topla', '💎', 2500),
  ('5000-xp', 'Usta', '5000 XP topla', '🔥', 5000),
  ('10000-xp', 'Efsane', '10000 XP topla', '👑', 10000)
ON CONFLICT (slug) DO NOTHING;

-- Seri (Streak) Rozetleri
INSERT INTO public.badges (slug, name, description, icon_emoji, xp_required) VALUES
  ('streak-3', '3 Gun Serisi', 'Ust uste 3 gun aktif ol', '🔥', 0),
  ('streak-7', 'Haftalik Savasci', 'Ust uste 7 gun aktif ol', '⚡', 0),
  ('streak-14', 'Disiplin Ustasi', 'Ust uste 14 gun aktif ol', '💪', 0),
  ('streak-30', 'Ay Yildizi', 'Ust uste 30 gun aktif ol', '🌟', 0),
  ('streak-60', 'Demir Irade', 'Ust uste 60 gun aktif ol', '🏅', 0),
  ('streak-100', 'Yuz Gun Efsanesi', 'Ust uste 100 gun aktif ol', '🏆', 0),
  ('streak-365', 'Yil Boyunca', 'Ust uste 365 gun aktif ol - Tam yil!', '👑', 0)
ON CONFLICT (slug) DO NOTHING;

SELECT 'Rozet guncellemesi basariyla tamamlandi! Toplam ' || count(*) || ' rozet.' AS durum FROM public.badges;
