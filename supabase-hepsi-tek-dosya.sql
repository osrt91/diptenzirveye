-- ============================================================
-- DiptenZirveye - TÜM VERİTABANI (TEK DOSYA)
-- Supabase SQL Editor'a yapıştırıp "Run" yapın. Hepsi bu.
-- Zaten var olan tablolar atlanır (IF NOT EXISTS).
-- Zaten var olan policyler için DROP IF EXISTS eklendi.
-- ============================================================

-- ============================================================
-- BÖLÜM 1: WAITLIST (Bekleme Listesi)
-- ============================================================
create table if not exists public.waitlist (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  name text,
  interest text,
  position int,
  created_at timestamptz default now()
);

-- ============================================================
-- BÖLÜM 2: ANA ŞEMA (Profiller, Kitaplar, XP, Rozetler vb.)
-- ============================================================

-- Profil: auth.users ile 1:1
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- XP ve level
create table if not exists public.user_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  total_xp int default 0 not null,
  level int default 1 not null,
  current_streak_days int default 0 not null,
  last_activity_date date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Kitaplar
create table if not exists public.books (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  description text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- Kitap ilerlemesi
create table if not exists public.user_books (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  book_id uuid not null references public.books(id) on delete cascade,
  current_chapter int default 1,
  completed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, book_id)
);

-- Günlük görevler
create table if not exists public.daily_tasks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  completed boolean default false,
  task_date date not null default current_date,
  xp_reward int default 10,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, title, task_date)
);

-- Rozetler
create table if not exists public.badges (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  name text not null,
  description text,
  icon_emoji text default '🏅',
  xp_required int default 0,
  created_at timestamptz default now()
);

-- Kullanıcı rozetleri
create table if not exists public.user_badges (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  badge_id uuid not null references public.badges(id) on delete cascade,
  earned_at timestamptz default now(),
  unique(user_id, badge_id)
);

-- Çalışma kağıtları
create table if not exists public.study_sheets (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  book_id uuid references public.books(id) on delete set null,
  title text not null,
  content text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Pomodoro
create table if not exists public.pomodoro_sessions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  duration_minutes int default 25,
  completed boolean default false,
  started_at timestamptz default now(),
  completed_at timestamptz
);

-- Not defteri
create table if not exists public.notes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  content text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- BÖLÜM 3: SOHBET SİSTEMİ
-- ============================================================

create table if not exists public.chat_rooms (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique not null,
  created_at timestamptz default now()
);

create table if not exists public.chat_messages (
  id uuid default gen_random_uuid() primary key,
  room_id uuid not null references public.chat_rooms(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  content text not null,
  created_at timestamptz default now(),
  constraint content_not_empty check (char_length(trim(content)) > 0),
  constraint content_max_length check (char_length(content) <= 2000)
);

create index if not exists idx_chat_messages_room_created on public.chat_messages(room_id, created_at desc);

-- Mesaj raporlama
create table if not exists public.chat_reports (
  id uuid default gen_random_uuid() primary key,
  message_id uuid not null references public.chat_messages(id) on delete cascade,
  reporter_id uuid not null references auth.users(id) on delete cascade,
  reason text,
  created_at timestamptz default now(),
  unique(message_id, reporter_id)
);

create index if not exists idx_chat_reports_message on public.chat_reports(message_id);

-- ============================================================
-- BÖLÜM 4: TRIGGER (Yeni kullanıcı = otomatik profil)
-- ============================================================

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)));
  insert into public.user_progress (user_id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- BÖLÜM 5: RLS (Row Level Security)
-- ============================================================

alter table public.waitlist enable row level security;
alter table public.profiles enable row level security;
alter table public.user_progress enable row level security;
alter table public.books enable row level security;
alter table public.user_books enable row level security;
alter table public.daily_tasks enable row level security;
alter table public.badges enable row level security;
alter table public.user_badges enable row level security;
alter table public.study_sheets enable row level security;
alter table public.pomodoro_sessions enable row level security;
alter table public.notes enable row level security;
alter table public.chat_rooms enable row level security;
alter table public.chat_messages enable row level security;
alter table public.chat_reports enable row level security;

-- ============================================================
-- BÖLÜM 6: POLICY'LER (Zaten varsa önce drop)
-- ============================================================

-- Waitlist
drop policy if exists "Waitlist public insert" on public.waitlist;
create policy "Waitlist public insert" on public.waitlist
  for insert to anon, authenticated with check (true);
drop policy if exists "Waitlist admin read" on public.waitlist;
create policy "Waitlist admin read" on public.waitlist
  for select using (false);

-- Profiles
drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile" on public.profiles for select using (auth.uid() = id);
drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- User Progress
drop policy if exists "Users can read own progress" on public.user_progress;
create policy "Users can read own progress" on public.user_progress for all using (auth.uid() = user_id);

-- Books
drop policy if exists "Books are readable by all" on public.books;
create policy "Books are readable by all" on public.books for select using (true);

-- User Books
drop policy if exists "Users can manage own user_books" on public.user_books;
create policy "Users can manage own user_books" on public.user_books for all using (auth.uid() = user_id);

-- Daily Tasks
drop policy if exists "Users can manage own daily_tasks" on public.daily_tasks;
create policy "Users can manage own daily_tasks" on public.daily_tasks for all using (auth.uid() = user_id);

-- Badges
drop policy if exists "Badges are readable by all" on public.badges;
create policy "Badges are readable by all" on public.badges for select using (true);
drop policy if exists "Users can read own user_badges" on public.user_badges;
create policy "Users can read own user_badges" on public.user_badges for all using (auth.uid() = user_id);

-- Study Sheets
drop policy if exists "Users can manage own study_sheets" on public.study_sheets;
create policy "Users can manage own study_sheets" on public.study_sheets for all using (auth.uid() = user_id);

-- Pomodoro
drop policy if exists "Users can manage own pomodoro_sessions" on public.pomodoro_sessions;
create policy "Users can manage own pomodoro_sessions" on public.pomodoro_sessions for all using (auth.uid() = user_id);

-- Notes
drop policy if exists "Users can manage own notes" on public.notes;
create policy "Users can manage own notes" on public.notes for all using (auth.uid() = user_id);

-- Chat Rooms
drop policy if exists "Authenticated can read rooms" on public.chat_rooms;
create policy "Authenticated can read rooms" on public.chat_rooms
  for select to authenticated using (true);

-- Chat Messages
drop policy if exists "Authenticated can read messages" on public.chat_messages;
create policy "Authenticated can read messages" on public.chat_messages
  for select to authenticated using (true);
drop policy if exists "Users can insert own message" on public.chat_messages;
create policy "Users can insert own message" on public.chat_messages
  for insert to authenticated with check (auth.uid() = user_id);
drop policy if exists "Users can delete own message" on public.chat_messages;
create policy "Users can delete own message" on public.chat_messages
  for delete to authenticated using (auth.uid() = user_id);

-- Chat Reports
drop policy if exists "Users can report messages" on public.chat_reports;
create policy "Users can report messages" on public.chat_reports
  for insert to authenticated with check (auth.uid() = reporter_id);
drop policy if exists "Users can read own reports" on public.chat_reports;
create policy "Users can read own reports" on public.chat_reports
  for select to authenticated using (auth.uid() = reporter_id);

-- ============================================================
-- BÖLÜM 7: LEADERBOARD FONKSİYONU
-- ============================================================

create or replace function public.get_leaderboard(lim int default 50)
returns table (
  rank bigint,
  user_id uuid,
  display_name text,
  total_xp int,
  level int
)
language sql
security definer
stable
set search_path = public
as $$
  select
    row_number() over (order by p.total_xp desc)::bigint as rank,
    p.user_id,
    coalesce(nullif(trim(pr.display_name), ''), 'Zirveci') as display_name,
    p.total_xp,
    p.level
  from user_progress p
  join profiles pr on pr.id = p.user_id
  order by p.total_xp desc
  limit greatest(1, least(lim, 200));
$$;

grant execute on function public.get_leaderboard(int) to anon;
grant execute on function public.get_leaderboard(int) to authenticated;

-- ============================================================
-- BÖLÜM 8: SEED VERİLERİ (Kitaplar + Rozetler + Chat Odaları)
-- ============================================================

-- 10 Kitap
insert into public.books (slug, title, description, sort_order) values
  ('1-ai-devrimini-anlamak', 'AI Devrimini Anlamak', 'Yapay zekanın temellerini ve dünyayı nasıl değiştirdiğini kavramak.', 1),
  ('2-temeller', 'Prompt Mühendisliği 2026', 'AI ile doğru iletişim kurma sanatını ustalıkla öğrenmek.', 2),
  ('3-prompt-ustaligi', 'AI Araçları Rehberi', 'Binlerce araç arasından sana en uygun olanları filtrelemek.', 3),
  ('4-zihin-os', 'Ertelemeden Çıkış Sistemi', 'Dikkat dağıtıcıları yenip derin çalışma moduna geçmek.', 4),
  ('5-kurucu-dna', 'AI ile İlk Gelirim', 'Öğrendiklerini paraya çevirmenin en pratik ve hızlı yolları.', 5),
  ('6-dijital-kenar', 'İçerik İmparatorluğu', 'Durmadan, yorulmadan kaliteli dijital varlıklar üretmek.', 6),
  ('7-kariyer-mimari', 'Otomasyon Mimarı', 'Sen uyurken senin için çalışan sistemler inşa etmek.', 7),
  ('8-uretici-ai', 'AI ile Ölçek', 'Küçük başarıları devasa sistemlere dönüştürmek.', 8),
  ('9-servet-kodu', 'AI Liderliği', 'Kendi alanında AI destekli otorite konumuna yükselmek.', 9),
  ('10-zirve-protokolu', 'AI Çağının Mimarı', 'Artık bir tüketici değil, geleceği inşa eden bir üreticisin.', 10)
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  sort_order = excluded.sort_order;

-- Rozetler (category sütunu ile)
insert into public.badges (slug, name, description, icon_emoji, xp_required) values
  ('ilk-adim', 'İlk Adım', 'İlk giriş yaptın', '🌟', 0),
  ('10-xp', 'XP Toplayıcı', '10 XP kazandın', '⭐', 10),
  ('50-xp', 'Yükselen', '50 XP', '🔥', 50),
  ('100-xp', 'Yıldız', '100 XP', '💫', 100),
  ('streak-3', '3 Gün Seri', '3 gün üst üste aktif', '📅', 0),
  ('streak-7', 'Haftalık', '7 gün seri', '🏆', 0)
on conflict (slug) do nothing;

-- Genel sohbet odası
insert into public.chat_rooms (slug, name) values ('genel', 'Genel Sohbet')
on conflict (slug) do nothing;

-- Kitap bazlı sohbet odaları (her kitap için bir oda)
insert into public.chat_rooms (slug, name)
select b.slug, b.title
from public.books b
where not exists (select 1 from public.chat_rooms r where r.slug = b.slug);

-- ============================================================
-- BÖLÜM 9: KİTAP EKOSİSTEMİ GÜNCELLEMESİ (Ek sütunlar)
-- ============================================================

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='books' AND column_name='cover_url') THEN
        ALTER TABLE public.books ADD COLUMN cover_url text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='books' AND column_name='long_description') THEN
        ALTER TABLE public.books ADD COLUMN long_description text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='books' AND column_name='verb') THEN
        ALTER TABLE public.books ADD COLUMN verb text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='books' AND column_name='icon_name') THEN
        ALTER TABLE public.books ADD COLUMN icon_name text;
    END IF;
END $$;

-- Kitap detaylarını güncelle
UPDATE public.books SET verb='Anlarsın', icon_name='FaBrain',
  cover_url='https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop'
WHERE slug='1-ai-devrimini-anlamak';

UPDATE public.books SET verb='Konuşursun', icon_name='FaRobot',
  cover_url='https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600&auto=format&fit=crop'
WHERE slug='2-temeller';

UPDATE public.books SET verb='Seçersin', icon_name='FaFilter',
  cover_url='https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop'
WHERE slug='3-prompt-ustaligi';

UPDATE public.books SET verb='Odaklanırsın', icon_name='FaHourglassEnd',
  cover_url='https://images.unsplash.com/photo-1506784693919-ef06d93c28d2?q=80&w=600&auto=format&fit=crop'
WHERE slug='4-zihin-os';

UPDATE public.books SET verb='Kazanırsın', icon_name='FaMoneyBillWave',
  cover_url='https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?q=80&w=600&auto=format&fit=crop'
WHERE slug='5-kurucu-dna';

UPDATE public.books SET verb='Üretirsin', icon_name='FaPenNib' WHERE slug='6-dijital-kenar';
UPDATE public.books SET verb='Otomatize edersin', icon_name='FaCogs' WHERE slug='7-kariyer-mimari';
UPDATE public.books SET verb='Ölçeklersin', icon_name='FaChartLine' WHERE slug='8-uretici-ai';
UPDATE public.books SET verb='Liderlik edersin', icon_name='FaCrown' WHERE slug='9-servet-kodu';
UPDATE public.books SET verb='Çağı yönetirsin', icon_name='FaGlobe' WHERE slug='10-zirve-protokolu';

-- ============================================================
-- BÖLÜM 10: AI ARAÇ ROZETLERİ & KATEGORİ SİSTEMİ
-- ============================================================

-- Badges tablosuna category sütunu ekle (yoksa)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema='public' AND table_name='badges' AND column_name='category'
    ) THEN
        ALTER TABLE public.badges ADD COLUMN category text DEFAULT 'xp';
    END IF;
END $$;

-- Mevcut rozetlerin kategorilerini ayarla
UPDATE public.badges SET category = 'general' WHERE slug = 'ilk-adim';
UPDATE public.badges SET category = 'xp' WHERE slug IN ('10-xp', '50-xp', '100-xp');
UPDATE public.badges SET category = 'streak' WHERE slug IN ('streak-3', 'streak-7');

-- AI Araç rozetlerini ekle
INSERT INTO public.badges (slug, name, description, icon_emoji, xp_required, category) VALUES
  ('chatgpt-kullanici', 'ChatGPT Kullanıcısı', 'ChatGPT ile ilk prompt mühendisliği görevini tamamla', '🤖', 0, 'ai-tool'),
  ('claude-kullanici', 'Claude Kullanıcısı', 'Claude AI ile derinlemesine analiz yap', '🧠', 0, 'ai-tool'),
  ('gemini-kullanici', 'Gemini Kullanıcısı', 'Google Gemini ile multimodal çalış', '✨', 0, 'ai-tool'),
  ('midjourney-kullanici', 'Midjourney Kullanıcısı', 'Midjourney ile ilk görsel üretimini tamamla', '🎨', 0, 'ai-tool'),
  ('cursor-kullanici', 'Cursor Kullanıcısı', 'Cursor AI ile kod yaz', '💻', 0, 'ai-tool'),
  ('zapier-kullanici', 'Zapier Kullanıcısı', 'Zapier ile otomasyon kur', '⚡', 0, 'ai-tool')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category;

-- ============================================================
-- BÖLÜM 11: PROMPT HUB (Prompt Kütüphanesi & Upvote)
-- ============================================================

-- Prompts tablosu
CREATE TABLE IF NOT EXISTS public.prompts (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    category text NOT NULL DEFAULT 'genel',
    upvote_count integer NOT NULL DEFAULT 0,
    created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.prompts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Prompts herkes okuyabilir" ON public.prompts;
CREATE POLICY "Prompts herkes okuyabilir"
    ON public.prompts FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Prompts auth insert" ON public.prompts;
CREATE POLICY "Prompts auth insert"
    ON public.prompts FOR INSERT
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Prompts sahip delete" ON public.prompts;
CREATE POLICY "Prompts sahip delete"
    ON public.prompts FOR DELETE
    USING (auth.uid() = user_id);

-- Prompt oy tablosu
CREATE TABLE IF NOT EXISTS public.prompt_votes (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    prompt_id uuid REFERENCES public.prompts(id) ON DELETE CASCADE NOT NULL,
    created_at timestamptz DEFAULT now() NOT NULL,
    UNIQUE(user_id, prompt_id)
);

ALTER TABLE public.prompt_votes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Votes herkes okuyabilir" ON public.prompt_votes;
CREATE POLICY "Votes herkes okuyabilir"
    ON public.prompt_votes FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Votes auth insert" ON public.prompt_votes;
CREATE POLICY "Votes auth insert"
    ON public.prompt_votes FOR INSERT
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Votes sahip delete" ON public.prompt_votes;
CREATE POLICY "Votes sahip delete"
    ON public.prompt_votes FOR DELETE
    USING (auth.uid() = user_id);

-- Upvote RPC fonksiyonu
CREATE OR REPLACE FUNCTION public.toggle_prompt_vote(p_prompt_id uuid)
RETURNS json LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
    v_user_id uuid := auth.uid();
    v_exists boolean;
BEGIN
    SELECT EXISTS(
        SELECT 1 FROM public.prompt_votes
        WHERE user_id = v_user_id AND prompt_id = p_prompt_id
    ) INTO v_exists;

    IF v_exists THEN
        DELETE FROM public.prompt_votes
        WHERE user_id = v_user_id AND prompt_id = p_prompt_id;
        UPDATE public.prompts SET upvote_count = GREATEST(upvote_count - 1, 0)
        WHERE id = p_prompt_id;
        RETURN json_build_object('voted', false);
    ELSE
        INSERT INTO public.prompt_votes (user_id, prompt_id)
        VALUES (v_user_id, p_prompt_id);
        UPDATE public.prompts SET upvote_count = upvote_count + 1
        WHERE id = p_prompt_id;
        RETURN json_build_object('voted', true);
    END IF;
END;
$$;

-- Örnek prompt verileri
INSERT INTO public.prompts (user_id, title, content, category, upvote_count) VALUES
  ((SELECT id FROM auth.users LIMIT 1),
   'Freelance Teklif Yazıcı', 'Benim için [alan] konusunda profesyonel bir freelance teklif yaz. Müşteriye değer önerisini net sun, fiyatlandırmayı şeffaf tut ve güven veren bir ton kullan.', 'freelance', 12),
  ((SELECT id FROM auth.users LIMIT 1),
   'SEO Blog Yazısı Optimizasyonu', '[Konu] hakkında SEO uyumlu, 1500 kelimelik bir blog yazısı yaz. H1, H2, meta description, alt text önerilerini de ekle.', 'icerik', 8),
  ((SELECT id FROM auth.users LIMIT 1),
   'SaaS Landing Page Copy', 'Bir [ürün türü] SaaS uygulaması için dönüşüm odaklı landing page metni yaz. Hero, özellikler, sosyal kanıt ve CTA bölümlerini dahil et.', 'saas', 15),
  ((SELECT id FROM auth.users LIMIT 1),
   'Veri Analizi Promptu', 'Bu veri setini analiz et: [veri]. Temel trendleri, anomalileri ve aksiyon önerilerini raporla. Grafik önerileri de sun.', 'veri', 6),
  ((SELECT id FROM auth.users LIMIT 1),
   'LinkedIn İçerik Stratejisi', 'LinkedIn''de [sektör] alanında thought leader olmak için haftalık içerik takvimi oluştur. Her gün için post türü ve örnek kanca cümleleri ver.', 'icerik', 22)
ON CONFLICT DO NOTHING;

-- ============================================================
-- BOLUM EXTRA: STORAGE (Avatar yukleme)
-- ============================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('avatars', 'avatars', true, 2097152, ARRAY['image/png','image/jpeg','image/webp'])
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "avatar_upload" ON storage.objects;
CREATE POLICY "avatar_upload" ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'avatars' AND (storage.foldername(name))[1] = 'avatars');

DROP POLICY IF EXISTS "avatar_update" ON storage.objects;
CREATE POLICY "avatar_update" ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = 'avatars');

DROP POLICY IF EXISTS "avatar_read" ON storage.objects;
CREATE POLICY "avatar_read" ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'avatars');

-- ============================================================
-- TAMAMLANDI!
-- ============================================================
SELECT 'Tum tablolar, policyler, seed verileri, storage ve Prompt Hub basariyla yuklendi!' AS durum;
