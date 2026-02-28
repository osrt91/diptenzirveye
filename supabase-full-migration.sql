-- ============================================================
-- DiptenZirveye — TAM VERİTABANI MİGRASYONU
-- Yeni Supabase projesi için tek seferde çalıştırılacak.
-- IF NOT EXISTS / ON CONFLICT kullanıldığı için tekrar çalıştırılabilir.
-- Tarih: 28 Şubat 2026
-- ============================================================


-- ============================================================
-- BÖLÜM 1: ANA TABLOLAR
-- ============================================================

CREATE TABLE IF NOT EXISTS public.waitlist (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text UNIQUE NOT NULL,
  name text,
  interest text,
  position int,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  avatar_url text,
  is_admin boolean DEFAULT false,
  role text DEFAULT 'user',
  referral_code text UNIQUE,
  polar_customer_id text,
  onboarding_completed boolean DEFAULT false,
  onboarding_goals text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.user_progress (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  total_xp int DEFAULT 0 NOT NULL,
  level int DEFAULT 1 NOT NULL,
  current_streak_days int DEFAULT 0 NOT NULL,
  dz_coins int DEFAULT 0 NOT NULL,
  last_activity_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.books (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  description text,
  long_description text,
  cover_url text,
  verb text,
  icon_name text,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.user_books (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  book_id uuid NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
  current_chapter int DEFAULT 1,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, book_id)
);

CREATE TABLE IF NOT EXISTS public.daily_tasks (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  completed boolean DEFAULT false,
  task_date date NOT NULL DEFAULT current_date,
  xp_reward int DEFAULT 10,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, title, task_date)
);

CREATE TABLE IF NOT EXISTS public.badges (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  icon_emoji text DEFAULT '🏅',
  xp_required int DEFAULT 0,
  category text DEFAULT 'xp',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.user_badges (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_id uuid NOT NULL REFERENCES public.badges(id) ON DELETE CASCADE,
  earned_at timestamptz DEFAULT now(),
  UNIQUE(user_id, badge_id)
);

CREATE TABLE IF NOT EXISTS public.study_sheets (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  book_id uuid REFERENCES public.books(id) ON DELETE SET NULL,
  title text NOT NULL,
  content text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.pomodoro_sessions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  duration_minutes int DEFAULT 25,
  completed boolean DEFAULT false,
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

CREATE TABLE IF NOT EXISTS public.notes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);


-- ============================================================
-- BÖLÜM 2: SOHBET SİSTEMİ
-- ============================================================

CREATE TABLE IF NOT EXISTS public.chat_rooms (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.chat_messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id uuid NOT NULL REFERENCES public.chat_rooms(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT content_not_empty CHECK (char_length(trim(content)) > 0),
  CONSTRAINT content_max_length CHECK (char_length(content) <= 2000)
);

CREATE INDEX IF NOT EXISTS idx_chat_messages_room_created ON public.chat_messages(room_id, created_at DESC);

CREATE TABLE IF NOT EXISTS public.chat_reports (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  message_id uuid NOT NULL REFERENCES public.chat_messages(id) ON DELETE CASCADE,
  reporter_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reason text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(message_id, reporter_id)
);

CREATE INDEX IF NOT EXISTS idx_chat_reports_message ON public.chat_reports(message_id);


-- ============================================================
-- BÖLÜM 3: PROMPT HUB
-- ============================================================

CREATE TABLE IF NOT EXISTS public.prompts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  category text NOT NULL DEFAULT 'genel',
  upvote_count integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.prompt_votes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  prompt_id uuid REFERENCES public.prompts(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(user_id, prompt_id)
);


-- ============================================================
-- BÖLÜM 4: PROMPT CHALLENGE
-- ============================================================

CREATE TABLE IF NOT EXISTS public.prompt_challenge_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  challenge_day int NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(user_id, challenge_day)
);


-- ============================================================
-- BÖLÜM 5: STREAK HISTORY (90 günlük takip)
-- ============================================================

CREATE TABLE IF NOT EXISTS public.streak_history (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_date date NOT NULL DEFAULT current_date,
  xp_earned int DEFAULT 0,
  tasks_completed int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, activity_date)
);

CREATE INDEX IF NOT EXISTS idx_streak_history_user_date ON public.streak_history(user_id, activity_date DESC);


-- ============================================================
-- BÖLÜM 6: BLOG
-- ============================================================

CREATE TABLE IF NOT EXISTS public.blog_posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  category text NOT NULL DEFAULT 'Genel',
  read_time text NOT NULL DEFAULT '3 Dk Okuma',
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE OR REPLACE FUNCTION update_blog_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS blog_posts_updated_at ON blog_posts;
CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_blog_updated_at();


-- ============================================================
-- BÖLÜM 7: KUPONLAR
-- ============================================================

CREATE TABLE IF NOT EXISTS public.coupons (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  code text UNIQUE NOT NULL,
  discount_percent integer NOT NULL CHECK (discount_percent > 0 AND discount_percent <= 100),
  max_uses integer DEFAULT NULL,
  used_count integer DEFAULT 0,
  active boolean DEFAULT true,
  expires_at timestamptz DEFAULT NULL,
  created_at timestamptz DEFAULT now()
);


-- ============================================================
-- BÖLÜM 8: REFERANSLAR & TESTIMONIALS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.referrals (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  referred_email text NOT NULL,
  referred_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'registered', 'premium')),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.testimonials (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  name text NOT NULL,
  role text DEFAULT '',
  text text NOT NULL,
  rating integer DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);


-- ============================================================
-- BÖLÜM 9: TRIGGER (Yeni kullanıcı → otomatik profil + progress)
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (
    new.id,
    COALESCE(
      new.raw_user_meta_data->>'full_name',
      new.raw_user_meta_data->>'name',
      split_part(new.email, '@', 1)
    )
  );
  INSERT INTO public.user_progress (user_id)
  VALUES (new.id);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ============================================================
-- BÖLÜM 10: RLS (Row Level Security)
-- ============================================================

ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_sheets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pomodoro_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prompt_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prompt_challenge_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.streak_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;


-- ============================================================
-- BÖLÜM 11: POLICY'LER
-- ============================================================

-- Waitlist
DROP POLICY IF EXISTS "Waitlist public insert" ON public.waitlist;
CREATE POLICY "Waitlist public insert" ON public.waitlist FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "Waitlist admin read" ON public.waitlist;
CREATE POLICY "Waitlist admin read" ON public.waitlist FOR SELECT USING (false);

-- Profiles
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
CREATE POLICY "Users can read own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
DROP POLICY IF EXISTS "Admin can read all profiles" ON public.profiles;
CREATE POLICY "Admin can read all profiles" ON public.profiles FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin = true) OR auth.uid() = id);

-- User Progress
DROP POLICY IF EXISTS "Users can read own progress" ON public.user_progress;
CREATE POLICY "Users can read own progress" ON public.user_progress FOR ALL USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Admin can read all progress" ON public.user_progress;
CREATE POLICY "Admin can read all progress" ON public.user_progress FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin = true) OR auth.uid() = user_id);

-- Books
DROP POLICY IF EXISTS "Books are readable by all" ON public.books;
CREATE POLICY "Books are readable by all" ON public.books FOR SELECT USING (true);

-- User Books
DROP POLICY IF EXISTS "Users can manage own user_books" ON public.user_books;
CREATE POLICY "Users can manage own user_books" ON public.user_books FOR ALL USING (auth.uid() = user_id);

-- Daily Tasks
DROP POLICY IF EXISTS "Users can manage own daily_tasks" ON public.daily_tasks;
CREATE POLICY "Users can manage own daily_tasks" ON public.daily_tasks FOR ALL USING (auth.uid() = user_id);

-- Badges
DROP POLICY IF EXISTS "Badges are readable by all" ON public.badges;
CREATE POLICY "Badges are readable by all" ON public.badges FOR SELECT USING (true);
DROP POLICY IF EXISTS "Users can read own user_badges" ON public.user_badges;
CREATE POLICY "Users can read own user_badges" ON public.user_badges FOR ALL USING (auth.uid() = user_id);

-- Study Sheets
DROP POLICY IF EXISTS "Users can manage own study_sheets" ON public.study_sheets;
CREATE POLICY "Users can manage own study_sheets" ON public.study_sheets FOR ALL USING (auth.uid() = user_id);

-- Pomodoro
DROP POLICY IF EXISTS "Users can manage own pomodoro_sessions" ON public.pomodoro_sessions;
CREATE POLICY "Users can manage own pomodoro_sessions" ON public.pomodoro_sessions FOR ALL USING (auth.uid() = user_id);

-- Notes
DROP POLICY IF EXISTS "Users can manage own notes" ON public.notes;
CREATE POLICY "Users can manage own notes" ON public.notes FOR ALL USING (auth.uid() = user_id);

-- Chat Rooms
DROP POLICY IF EXISTS "Authenticated can read rooms" ON public.chat_rooms;
CREATE POLICY "Authenticated can read rooms" ON public.chat_rooms FOR SELECT TO authenticated USING (true);

-- Chat Messages
DROP POLICY IF EXISTS "Authenticated can read messages" ON public.chat_messages;
CREATE POLICY "Authenticated can read messages" ON public.chat_messages FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "Users can insert own message" ON public.chat_messages;
CREATE POLICY "Users can insert own message" ON public.chat_messages FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can delete own message" ON public.chat_messages;
CREATE POLICY "Users can delete own message" ON public.chat_messages FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Chat Reports
DROP POLICY IF EXISTS "Users can report messages" ON public.chat_reports;
CREATE POLICY "Users can report messages" ON public.chat_reports FOR INSERT TO authenticated WITH CHECK (auth.uid() = reporter_id);
DROP POLICY IF EXISTS "Users can read own reports" ON public.chat_reports;
CREATE POLICY "Users can read own reports" ON public.chat_reports FOR SELECT TO authenticated USING (auth.uid() = reporter_id);

-- Prompts
DROP POLICY IF EXISTS "Prompts herkes okuyabilir" ON public.prompts;
CREATE POLICY "Prompts herkes okuyabilir" ON public.prompts FOR SELECT USING (true);
DROP POLICY IF EXISTS "Prompts auth insert" ON public.prompts;
CREATE POLICY "Prompts auth insert" ON public.prompts FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Prompts sahip delete" ON public.prompts;
CREATE POLICY "Prompts sahip delete" ON public.prompts FOR DELETE USING (auth.uid() = user_id);

-- Prompt Votes
DROP POLICY IF EXISTS "Votes herkes okuyabilir" ON public.prompt_votes;
CREATE POLICY "Votes herkes okuyabilir" ON public.prompt_votes FOR SELECT USING (true);
DROP POLICY IF EXISTS "Votes auth insert" ON public.prompt_votes;
CREATE POLICY "Votes auth insert" ON public.prompt_votes FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Votes sahip delete" ON public.prompt_votes;
CREATE POLICY "Votes sahip delete" ON public.prompt_votes FOR DELETE USING (auth.uid() = user_id);

-- Prompt Challenge
DROP POLICY IF EXISTS "Users can read own challenge submissions" ON public.prompt_challenge_submissions;
CREATE POLICY "Users can read own challenge submissions" ON public.prompt_challenge_submissions FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can insert own challenge submissions" ON public.prompt_challenge_submissions;
CREATE POLICY "Users can insert own challenge submissions" ON public.prompt_challenge_submissions FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Admins can read all challenge submissions" ON public.prompt_challenge_submissions;
CREATE POLICY "Admins can read all challenge submissions" ON public.prompt_challenge_submissions FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));

-- Streak History
DROP POLICY IF EXISTS "Users can read own streak history" ON public.streak_history;
CREATE POLICY "Users can read own streak history" ON public.streak_history FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can insert own streak history" ON public.streak_history;
CREATE POLICY "Users can insert own streak history" ON public.streak_history FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can update own streak history" ON public.streak_history;
CREATE POLICY "Users can update own streak history" ON public.streak_history FOR UPDATE USING (auth.uid() = user_id);

-- Blog Posts
DROP POLICY IF EXISTS "Blog posts are publicly readable" ON public.blog_posts;
CREATE POLICY "Blog posts are publicly readable" ON public.blog_posts FOR SELECT USING (published = true);
DROP POLICY IF EXISTS "Admins can manage blog posts" ON public.blog_posts;
CREATE POLICY "Admins can manage blog posts" ON public.blog_posts FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'moderator')));

-- Coupons
DROP POLICY IF EXISTS "Coupons are publicly readable for validation" ON public.coupons;
CREATE POLICY "Coupons are publicly readable for validation" ON public.coupons FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admins can manage coupons" ON public.coupons;
CREATE POLICY "Admins can manage coupons" ON public.coupons FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'moderator')));

-- Referrals
DROP POLICY IF EXISTS "Users can see their own referrals" ON public.referrals;
CREATE POLICY "Users can see their own referrals" ON public.referrals FOR SELECT USING (referrer_id = auth.uid());
DROP POLICY IF EXISTS "System can insert referrals" ON public.referrals;
CREATE POLICY "System can insert referrals" ON public.referrals FOR INSERT WITH CHECK (true);

-- Testimonials
DROP POLICY IF EXISTS "Approved testimonials are public" ON public.testimonials;
CREATE POLICY "Approved testimonials are public" ON public.testimonials FOR SELECT USING (approved = true);
DROP POLICY IF EXISTS "Authenticated users can submit testimonials" ON public.testimonials;
CREATE POLICY "Authenticated users can submit testimonials" ON public.testimonials FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS "Admins can manage testimonials" ON public.testimonials;
CREATE POLICY "Admins can manage testimonials" ON public.testimonials FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'moderator')));


-- ============================================================
-- BÖLÜM 12: FONKSİYONLAR
-- ============================================================

-- Leaderboard
CREATE OR REPLACE FUNCTION public.get_leaderboard(lim int DEFAULT 50)
RETURNS TABLE (rank bigint, user_id uuid, display_name text, total_xp int, level int)
LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public AS $$
  SELECT
    row_number() OVER (ORDER BY p.total_xp DESC)::bigint AS rank,
    p.user_id,
    COALESCE(NULLIF(TRIM(pr.display_name), ''), 'Zirveci') AS display_name,
    COALESCE(p.total_xp, 0) AS total_xp,
    COALESCE(p.level, 1) AS level
  FROM user_progress p
  LEFT JOIN profiles pr ON pr.id = p.user_id
  ORDER BY p.total_xp DESC
  LIMIT GREATEST(1, LEAST(lim, 200));
$$;

-- Grant coins
CREATE OR REPLACE FUNCTION public.grant_coins(p_user_id uuid, p_amount int, p_description text DEFAULT '')
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  UPDATE user_progress SET dz_coins = dz_coins + p_amount, updated_at = now() WHERE user_id = p_user_id;
  IF NOT FOUND THEN INSERT INTO user_progress (user_id, dz_coins) VALUES (p_user_id, p_amount); END IF;
END; $$;

-- Spend coins
CREATE OR REPLACE FUNCTION public.spend_coins(p_user_id uuid, p_amount int, p_item_id text DEFAULT '')
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE current_balance int;
BEGIN
  SELECT dz_coins INTO current_balance FROM user_progress WHERE user_id = p_user_id FOR UPDATE;
  IF current_balance IS NULL OR current_balance < p_amount THEN RETURN false; END IF;
  UPDATE user_progress SET dz_coins = dz_coins - p_amount, updated_at = now() WHERE user_id = p_user_id;
  RETURN true;
END; $$;

-- Record daily activity
CREATE OR REPLACE FUNCTION public.record_daily_activity(p_user_id uuid, p_xp int DEFAULT 0, p_tasks int DEFAULT 0)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO streak_history (user_id, activity_date, xp_earned, tasks_completed)
  VALUES (p_user_id, current_date, p_xp, p_tasks)
  ON CONFLICT (user_id, activity_date)
  DO UPDATE SET xp_earned = streak_history.xp_earned + p_xp, tasks_completed = streak_history.tasks_completed + p_tasks;
END; $$;

-- Toggle prompt vote
CREATE OR REPLACE FUNCTION public.toggle_prompt_vote(p_prompt_id uuid)
RETURNS json LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE v_user_id uuid := auth.uid(); v_exists boolean;
BEGIN
  SELECT EXISTS(SELECT 1 FROM public.prompt_votes WHERE user_id = v_user_id AND prompt_id = p_prompt_id) INTO v_exists;
  IF v_exists THEN
    DELETE FROM public.prompt_votes WHERE user_id = v_user_id AND prompt_id = p_prompt_id;
    UPDATE public.prompts SET upvote_count = GREATEST(upvote_count - 1, 0) WHERE id = p_prompt_id;
    RETURN json_build_object('voted', false);
  ELSE
    INSERT INTO public.prompt_votes (user_id, prompt_id) VALUES (v_user_id, p_prompt_id);
    UPDATE public.prompts SET upvote_count = upvote_count + 1 WHERE id = p_prompt_id;
    RETURN json_build_object('voted', true);
  END IF;
END; $$;

-- Admin: is_admin helper
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public AS $$
  SELECT COALESCE((SELECT is_admin FROM public.profiles WHERE id = auth.uid()), false);
$$;

-- Admin: get stats
CREATE OR REPLACE FUNCTION public.admin_get_stats()
RETURNS json LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE result json;
BEGIN
  IF NOT public.is_admin() THEN RAISE EXCEPTION 'Yetkiniz yok'; END IF;
  SELECT json_build_object(
    'total_users', (SELECT count(*) FROM auth.users),
    'total_xp', (SELECT COALESCE(sum(total_xp), 0) FROM user_progress),
    'active_today', (SELECT count(DISTINCT user_id) FROM daily_tasks WHERE task_date = current_date),
    'total_books', (SELECT count(*) FROM books),
    'total_badges', (SELECT count(*) FROM badges),
    'total_prompts', (SELECT count(*) FROM prompts),
    'total_messages', (SELECT count(*) FROM chat_messages),
    'total_reports', (SELECT count(*) FROM chat_reports),
    'waitlist_count', (SELECT count(*) FROM waitlist)
  ) INTO result;
  RETURN result;
END; $$;

-- Admin: list users
CREATE OR REPLACE FUNCTION public.admin_list_users(lim int DEFAULT 50, off int DEFAULT 0, search text DEFAULT '')
RETURNS json LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE result json;
BEGIN
  IF NOT public.is_admin() THEN RAISE EXCEPTION 'Yetkiniz yok'; END IF;
  SELECT json_agg(u) INTO result FROM (
    SELECT p.id, p.display_name, p.avatar_url, p.is_admin, p.created_at,
      COALESCE(up.total_xp, 0) as total_xp, COALESCE(up.level, 1) as level,
      COALESCE(up.current_streak_days, 0) as streak,
      (SELECT count(*) FROM user_badges ub WHERE ub.user_id = p.id) as badge_count
    FROM profiles p LEFT JOIN user_progress up ON up.user_id = p.id
    WHERE search = '' OR p.display_name ILIKE '%' || search || '%'
    ORDER BY p.created_at DESC LIMIT lim OFFSET off
  ) u;
  RETURN COALESCE(result, '[]'::json);
END; $$;

-- Admin: update user XP
CREATE OR REPLACE FUNCTION public.admin_update_user_xp(target_user_id uuid, new_xp int)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.is_admin() THEN RAISE EXCEPTION 'Yetkiniz yok'; END IF;
  UPDATE user_progress SET total_xp = new_xp, level = GREATEST(1, new_xp / 100 + 1) WHERE user_id = target_user_id;
END; $$;

-- Admin: upsert book
CREATE OR REPLACE FUNCTION public.admin_upsert_book(p_id uuid DEFAULT NULL, p_slug text DEFAULT '', p_title text DEFAULT '', p_description text DEFAULT '', p_sort_order int DEFAULT 0, p_cover_url text DEFAULT '', p_verb text DEFAULT '', p_icon_name text DEFAULT '')
RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_id uuid;
BEGIN
  IF NOT public.is_admin() THEN RAISE EXCEPTION 'Yetkiniz yok'; END IF;
  IF p_id IS NOT NULL THEN
    UPDATE books SET slug=COALESCE(NULLIF(p_slug,''),slug), title=COALESCE(NULLIF(p_title,''),title), description=COALESCE(NULLIF(p_description,''),description), sort_order=p_sort_order, cover_url=COALESCE(NULLIF(p_cover_url,''),cover_url), verb=COALESCE(NULLIF(p_verb,''),verb), icon_name=COALESCE(NULLIF(p_icon_name,''),icon_name) WHERE id=p_id RETURNING id INTO v_id;
  ELSE
    INSERT INTO books (slug,title,description,sort_order,cover_url,verb,icon_name) VALUES (p_slug,p_title,p_description,p_sort_order,p_cover_url,p_verb,p_icon_name) RETURNING id INTO v_id;
  END IF;
  RETURN v_id;
END; $$;

-- Admin: delete book
CREATE OR REPLACE FUNCTION public.admin_delete_book(p_id uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN IF NOT public.is_admin() THEN RAISE EXCEPTION 'Yetkiniz yok'; END IF; DELETE FROM books WHERE id=p_id; END; $$;

-- Admin: upsert badge
CREATE OR REPLACE FUNCTION public.admin_upsert_badge(p_id uuid DEFAULT NULL, p_slug text DEFAULT '', p_name text DEFAULT '', p_description text DEFAULT '', p_icon_emoji text DEFAULT '🏅', p_xp_required int DEFAULT 0, p_category text DEFAULT 'general')
RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_id uuid;
BEGIN
  IF NOT public.is_admin() THEN RAISE EXCEPTION 'Yetkiniz yok'; END IF;
  IF p_id IS NOT NULL THEN
    UPDATE badges SET slug=COALESCE(NULLIF(p_slug,''),slug), name=COALESCE(NULLIF(p_name,''),name), description=COALESCE(NULLIF(p_description,''),description), icon_emoji=p_icon_emoji, xp_required=p_xp_required, category=p_category WHERE id=p_id RETURNING id INTO v_id;
  ELSE
    INSERT INTO badges (slug,name,description,icon_emoji,xp_required,category) VALUES (p_slug,p_name,p_description,p_icon_emoji,p_xp_required,p_category) RETURNING id INTO v_id;
  END IF;
  RETURN v_id;
END; $$;

-- Admin: delete badge
CREATE OR REPLACE FUNCTION public.admin_delete_badge(p_id uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN IF NOT public.is_admin() THEN RAISE EXCEPTION 'Yetkiniz yok'; END IF; DELETE FROM badges WHERE id=p_id; END; $$;

-- Admin: delete message
CREATE OR REPLACE FUNCTION public.admin_delete_message(p_id uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN IF NOT public.is_admin() THEN RAISE EXCEPTION 'Yetkiniz yok'; END IF; DELETE FROM chat_messages WHERE id=p_id; END; $$;

-- Admin: list reports
CREATE OR REPLACE FUNCTION public.admin_list_reports(lim int DEFAULT 50)
RETURNS json LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE result json;
BEGIN
  IF NOT public.is_admin() THEN RAISE EXCEPTION 'Yetkiniz yok'; END IF;
  SELECT json_agg(r) INTO result FROM (
    SELECT cr.id, cr.reason, cr.created_at, cm.content as message_content, cm.user_id as message_author_id,
      p_reporter.display_name as reporter_name, p_author.display_name as author_name
    FROM chat_reports cr JOIN chat_messages cm ON cm.id=cr.message_id
    LEFT JOIN profiles p_reporter ON p_reporter.id=cr.reporter_id
    LEFT JOIN profiles p_author ON p_author.id=cm.user_id
    ORDER BY cr.created_at DESC LIMIT lim
  ) r;
  RETURN COALESCE(result, '[]'::json);
END; $$;

-- Admin: delete prompt
CREATE OR REPLACE FUNCTION public.admin_delete_prompt(p_id uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN IF NOT public.is_admin() THEN RAISE EXCEPTION 'Yetkiniz yok'; END IF; DELETE FROM prompts WHERE id=p_id; END; $$;


-- ============================================================
-- BÖLÜM 13: GRANT'LAR
-- ============================================================

GRANT EXECUTE ON FUNCTION public.get_leaderboard(int) TO anon;
GRANT EXECUTE ON FUNCTION public.get_leaderboard(int) TO authenticated;
GRANT EXECUTE ON FUNCTION public.grant_coins(uuid, int, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.spend_coins(uuid, int, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.record_daily_activity(uuid, int, int) TO authenticated;
GRANT EXECUTE ON FUNCTION public.toggle_prompt_vote(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_get_stats() TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_list_users(int, int, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_update_user_xp(uuid, int) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_upsert_book(uuid, text, text, text, int, text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_delete_book(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_upsert_badge(uuid, text, text, text, text, int, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_delete_badge(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_delete_message(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_list_reports(int) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_delete_prompt(uuid) TO authenticated;


-- ============================================================
-- BÖLÜM 14: STORAGE (Avatar bucket)
-- ============================================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('avatars', 'avatars', true, 2097152, ARRAY['image/png','image/jpeg','image/webp'])
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "avatar_upload" ON storage.objects;
CREATE POLICY "avatar_upload" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'avatars' AND (storage.foldername(name))[1] = 'avatars');

DROP POLICY IF EXISTS "avatar_update" ON storage.objects;
CREATE POLICY "avatar_update" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = 'avatars');

DROP POLICY IF EXISTS "avatar_read" ON storage.objects;
CREATE POLICY "avatar_read" ON storage.objects FOR SELECT TO public
  USING (bucket_id = 'avatars');


-- ============================================================
-- BÖLÜM 15: SEED VERİLERİ
-- ============================================================

-- 10 Kitap
INSERT INTO public.books (slug, title, description, sort_order, verb, icon_name, cover_url) VALUES
  ('1-ai-devrimini-anlamak', 'AI Devrimini Anlamak', 'Yapay zekanın temellerini ve dünyayı nasıl değiştirdiğini kavramak.', 1, 'Anlarsın', 'FaBrain', 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop'),
  ('2-temeller', 'Prompt Mühendisliği 2026', 'AI ile doğru iletişim kurma sanatını ustalıkla öğrenmek.', 2, 'Konuşursun', 'FaRobot', 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600&auto=format&fit=crop'),
  ('3-prompt-ustaligi', 'AI Araçları Rehberi', 'Binlerce araç arasından sana en uygun olanları filtrelemek.', 3, 'Seçersin', 'FaFilter', 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop'),
  ('4-zihin-os', 'Ertelemeden Çıkış Sistemi', 'Dikkat dağıtıcıları yenip derin çalışma moduna geçmek.', 4, 'Odaklanırsın', 'FaHourglassEnd', 'https://images.unsplash.com/photo-1506784693919-ef06d93c28d2?q=80&w=600&auto=format&fit=crop'),
  ('5-kurucu-dna', 'AI ile İlk Gelirim', 'Öğrendiklerini paraya çevirmenin en pratik ve hızlı yolları.', 5, 'Kazanırsın', 'FaMoneyBillWave', 'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?q=80&w=600&auto=format&fit=crop'),
  ('6-dijital-kenar', 'İçerik İmparatorluğu', 'Durmadan, yorulmadan kaliteli dijital varlıklar üretmek.', 6, 'Üretirsin', 'FaPenNib', NULL),
  ('7-kariyer-mimari', 'Otomasyon Mimarı', 'Sen uyurken senin için çalışan sistemler inşa etmek.', 7, 'Otomatize edersin', 'FaCogs', NULL),
  ('8-uretici-ai', 'AI ile Ölçek', 'Küçük başarıları devasa sistemlere dönüştürmek.', 8, 'Ölçeklersin', 'FaChartLine', NULL),
  ('9-servet-kodu', 'AI Liderliği', 'Kendi alanında AI destekli otorite konumuna yükselmek.', 9, 'Liderlik edersin', 'FaCrown', NULL),
  ('10-zirve-protokolu', 'AI Çağının Mimarı', 'Artık bir tüketici değil, geleceği inşa eden bir üreticisin.', 10, 'Çağı yönetirsin', 'FaGlobe', NULL)
ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, description=EXCLUDED.description, sort_order=EXCLUDED.sort_order, verb=EXCLUDED.verb, icon_name=EXCLUDED.icon_name, cover_url=COALESCE(EXCLUDED.cover_url, books.cover_url);

-- Rozetler
INSERT INTO public.badges (slug, name, description, icon_emoji, xp_required, category) VALUES
  ('ilk-adim', 'İlk Adım', 'İlk giriş yaptın', '🌟', 0, 'general'),
  ('10-xp', 'XP Toplayıcı', '10 XP kazandın', '⭐', 10, 'xp'),
  ('50-xp', 'Yükselen', '50 XP', '🔥', 50, 'xp'),
  ('100-xp', 'Yeni Başlayanlar', '100 XP topla', '🌱', 100, 'xp'),
  ('500-xp', 'Gelisen Yetenek', '500 XP topla', '📈', 500, 'xp'),
  ('1000-xp', 'Deneyimli', '1000 XP topla', '⭐', 1000, 'xp'),
  ('2500-xp', 'Uzman', '2500 XP topla', '💎', 2500, 'xp'),
  ('5000-xp', 'Usta', '5000 XP topla', '🔥', 5000, 'xp'),
  ('10000-xp', 'Efsane', '10000 XP topla', '👑', 10000, 'xp'),
  ('streak-3', '3 Gün Serisi', 'Üst üste 3 gün aktif ol', '🔥', 0, 'streak'),
  ('streak-7', 'Haftalık Savaşçı', 'Üst üste 7 gün aktif ol', '⚡', 0, 'streak'),
  ('streak-14', 'Disiplin Ustası', 'Üst üste 14 gün aktif ol', '💪', 0, 'streak'),
  ('streak-30', 'Ay Yıldızı', 'Üst üste 30 gün aktif ol', '🌟', 0, 'streak'),
  ('streak-60', 'Demir İrade', 'Üst üste 60 gün aktif ol', '🏅', 0, 'streak'),
  ('streak-100', 'Yüz Gün Efsanesi', 'Üst üste 100 gün aktif ol', '🏆', 0, 'streak'),
  ('streak-365', 'Yıl Boyunca', 'Üst üste 365 gün aktif ol', '👑', 0, 'streak'),
  ('chatgpt-kullanici', 'ChatGPT Kullanıcısı', 'ChatGPT ile ilk prompt mühendisliği görevini tamamla', '🤖', 0, 'ai-tool'),
  ('claude-kullanici', 'Claude Kullanıcısı', 'Claude AI ile derinlemesine analiz yap', '🧠', 0, 'ai-tool'),
  ('gemini-kullanici', 'Gemini Kullanıcısı', 'Google Gemini ile multimodal çalış', '✨', 0, 'ai-tool'),
  ('midjourney-kullanici', 'Midjourney Kullanıcısı', 'Midjourney ile ilk görsel üretimini tamamla', '🎨', 0, 'ai-tool'),
  ('cursor-kullanici', 'Cursor Kullanıcısı', 'Cursor AI ile kod yaz', '💻', 0, 'ai-tool'),
  ('zapier-kullanici', 'Zapier Kullanıcısı', 'Zapier ile otomasyon kur', '⚡', 0, 'ai-tool'),
  ('book-1-tamamla', 'İlk Adım', 'AI Devrimini Anlamak kitabını tamamla', '📖', 100, 'book'),
  ('book-3-tamamla', 'Araç Ustası', '3 kitabı tamamla', '📚', 300, 'book'),
  ('book-5-tamamla', 'Bilgi Savaşçısı', '5 kitabı tamamla', '⚔️', 500, 'book'),
  ('book-10-tamamla', 'Zirve Fatihi', 'Tüm 10 kitabı tamamla', '🏆', 1000, 'book'),
  ('ilk-mesaj', 'Ses Ver', 'Sohbette ilk mesajını gönder', '💬', 0, 'community'),
  ('10-mesaj', 'Aktif Üye', '10 mesaj paylaş', '🗣️', 0, 'community'),
  ('ilk-prompt-hub', 'Prompt Paylaşıcı', 'Prompt Hub''a ilk paylaşımını yap', '💡', 0, 'community'),
  ('pomodoro-10', 'Odak Makinesi', '10 Pomodoro oturumu tamamla', '🎯', 0, 'activity'),
  ('pomodoro-50', 'Zihin Motoru', '50 Pomodoro oturumu tamamla', '🧠', 0, 'activity'),
  ('note-10', 'Not Ustası', '10 not oluştur', '📝', 0, 'activity')
ON CONFLICT (slug) DO UPDATE SET name=EXCLUDED.name, description=EXCLUDED.description, category=EXCLUDED.category;

-- Genel sohbet odası
INSERT INTO public.chat_rooms (slug, name) VALUES ('genel', 'Genel Sohbet') ON CONFLICT (slug) DO NOTHING;

-- Kitap sohbet odaları
INSERT INTO public.chat_rooms (slug, name)
SELECT b.slug, b.title FROM public.books b
WHERE NOT EXISTS (SELECT 1 FROM public.chat_rooms r WHERE r.slug = b.slug);

-- Kuponlar
INSERT INTO public.coupons (code, discount_percent, max_uses, active) VALUES
  ('HOSGELDIN', 20, 100, true),
  ('KURUCU14', 30, 14, true),
  ('AI2026', 15, NULL, true)
ON CONFLICT (code) DO NOTHING;

-- Blog yazıları
INSERT INTO public.blog_posts (slug, title, excerpt, content, category, read_time, published) VALUES
  ('erteleme-aliskanligini-kirmak-icin-2-dakika-kurali', 'Erteleme Alışkanlığını Kırmak İçin ''2 Dakika Kuralı''', 'Neden başlarken bu kadar zorlanıyoruz?', 'İçerik burada...', 'Verimlilik', '3 Dk Okuma', true),
  ('derin-calisma-nedir-ve-nasil-uygulanir', 'Derin Çalışma (Deep Work) Nedir ve Nasıl Uygulanır?', 'Odaklanma yeteneği nadir ve paha biçilemez bir beceridir.', 'İçerik burada...', 'Odaklanma', '5 Dk Okuma', true),
  ('mukemmelliyetcilik-tuzagindan-kurtulmak', 'Mükemmelliyetçilik Tuzağından Kurtulmak', 'Her şeyin kusursuz olmasını beklemek aslında en büyük engeldir.', 'İçerik burada...', 'Psikoloji', '4 Dk Okuma', true)
ON CONFLICT (slug) DO NOTHING;


-- ============================================================
-- TAMAMLANDI!
-- ============================================================
SELECT '✅ Tüm tablolar, fonksiyonlar, policy''ler, seed verileri ve storage başarıyla yüklendi!' AS durum;
