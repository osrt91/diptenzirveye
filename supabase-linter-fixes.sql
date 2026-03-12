-- ============================================================
-- Supabase Linter Uyarıları Düzeltme
-- Supabase Dashboard SQL Editor'da çalıştır:
-- https://supabase.com/dashboard/project/jynyoattfrbwndonerpz/sql/new
-- ============================================================


-- ─── 1. FUNCTION SEARCH_PATH FIXES ─────────────────────────
-- Tüm fonksiyonlara SET search_path = '' ekleniyor.
-- Bu, search_path manipülasyonu ile yapılabilecek saldırıları önler.

-- 1a) update_blog_updated_at
CREATE OR REPLACE FUNCTION public.update_blog_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- 1b) handle_new_user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
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
$$;

-- 1c) toggle_prompt_vote
CREATE OR REPLACE FUNCTION public.toggle_prompt_vote(p_prompt_id uuid)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
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

-- 1d) admin_get_all_settings
CREATE OR REPLACE FUNCTION public.admin_get_all_settings()
RETURNS setof public.site_settings
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT * FROM public.site_settings ORDER BY category, key;
$$;

-- 1e) get_public_settings
CREATE OR REPLACE FUNCTION public.get_public_settings()
RETURNS setof public.site_settings
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT * FROM public.site_settings WHERE is_secret = false ORDER BY category, key;
$$;


-- ─── 2. RLS POLICY FIXES ───────────────────────────────────
-- Aşırı izin veren INSERT policy'leri sıkılaştırılıyor.
-- Service role (backend API) RLS'i bypass eder, o yüzden
-- system INSERT'leri etkilenmez.

-- 2a) notifications: INSERT sadece kendi user_id'sine
DROP POLICY IF EXISTS notifications_insert ON public.notifications;
CREATE POLICY notifications_insert ON public.notifications
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 2b) referrals: INSERT sadece kendi user_id'sine
DROP POLICY IF EXISTS "System can insert referrals" ON public.referrals;
CREATE POLICY referrals_own_insert ON public.referrals
  FOR INSERT
  WITH CHECK (auth.uid() = referrer_id);

-- 2c) waitlist: Sınırlı alan kontrolü (email zorunlu, spam önleme)
-- NOT: Waitlist anon kullanıcılar için açık olmalı (landing page formu).
-- Ancak sadece email alanının dolu olmasını zorunlu kılıyoruz.
DROP POLICY IF EXISTS "Waitlist public insert" ON public.waitlist;
CREATE POLICY waitlist_public_insert ON public.waitlist
  FOR INSERT TO anon, authenticated
  WITH CHECK (email IS NOT NULL AND email <> '');


-- ─── 3. DOĞRULAMA ──────────────────────────────────────────
-- Fonksiyonların search_path ayarını doğrula
SELECT
  p.proname AS function_name,
  pg_catalog.array_to_string(p.proconfig, ', ') AS config
FROM pg_catalog.pg_proc p
JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace
WHERE n.nspname = 'public'
  AND p.proname IN (
    'update_blog_updated_at',
    'handle_new_user',
    'toggle_prompt_vote',
    'admin_get_all_settings',
    'get_public_settings'
  )
ORDER BY p.proname;
