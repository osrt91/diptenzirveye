-- ============================================================
-- DiptenZirveye - ADMİN PANELİ SQL
-- Supabase SQL Editor'a yapıştırıp "Run" yapın.
-- ============================================================

-- 1. Profiles tablosuna is_admin sütunu ekle
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema='public' AND table_name='profiles' AND column_name='is_admin'
    ) THEN
        ALTER TABLE public.profiles ADD COLUMN is_admin boolean DEFAULT false;
    END IF;
END $$;

-- 1b. Profiles tablosuna role sutunu ekle (admin/moderator/user)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema='public' AND table_name='profiles' AND column_name='role'
    ) THEN
        ALTER TABLE public.profiles ADD COLUMN role text DEFAULT 'user';
    END IF;
END $$;

-- 2. Admin kontrolu icin helper fonksiyon
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT COALESCE(
    (SELECT is_admin FROM public.profiles WHERE id = auth.uid()),
    false
  );
$$;

-- 3. Admin istatistikleri fonksiyonu
CREATE OR REPLACE FUNCTION public.admin_get_stats()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result json;
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Yetkiniz yok';
  END IF;

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
END;
$$;

-- 4. Admin — Tüm kullanıcıları listele
CREATE OR REPLACE FUNCTION public.admin_list_users(
  lim int DEFAULT 50,
  off int DEFAULT 0,
  search text DEFAULT ''
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result json;
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Yetkiniz yok';
  END IF;

  SELECT json_agg(u) INTO result FROM (
    SELECT
      p.id,
      p.display_name,
      p.avatar_url,
      p.is_admin,
      p.created_at,
      COALESCE(up.total_xp, 0) as total_xp,
      COALESCE(up.level, 1) as level,
      COALESCE(up.current_streak_days, 0) as streak,
      (SELECT count(*) FROM user_badges ub WHERE ub.user_id = p.id) as badge_count
    FROM profiles p
    LEFT JOIN user_progress up ON up.user_id = p.id
    WHERE search = '' OR p.display_name ILIKE '%' || search || '%'
    ORDER BY p.created_at DESC
    LIMIT lim OFFSET off
  ) u;

  RETURN COALESCE(result, '[]'::json);
END;
$$;

-- 5. Admin — Kullanıcı XP güncelle
CREATE OR REPLACE FUNCTION public.admin_update_user_xp(
  target_user_id uuid,
  new_xp int
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Yetkiniz yok';
  END IF;

  UPDATE user_progress SET total_xp = new_xp, level = GREATEST(1, new_xp / 100 + 1)
  WHERE user_id = target_user_id;
END;
$$;

-- 6. Admin — Kitap CRUD
CREATE OR REPLACE FUNCTION public.admin_upsert_book(
  p_id uuid DEFAULT NULL,
  p_slug text DEFAULT '',
  p_title text DEFAULT '',
  p_description text DEFAULT '',
  p_sort_order int DEFAULT 0,
  p_cover_url text DEFAULT '',
  p_verb text DEFAULT '',
  p_icon_name text DEFAULT ''
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id uuid;
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Yetkiniz yok';
  END IF;

  IF p_id IS NOT NULL THEN
    UPDATE books SET
      slug = COALESCE(NULLIF(p_slug, ''), slug),
      title = COALESCE(NULLIF(p_title, ''), title),
      description = COALESCE(NULLIF(p_description, ''), description),
      sort_order = p_sort_order,
      cover_url = COALESCE(NULLIF(p_cover_url, ''), cover_url),
      verb = COALESCE(NULLIF(p_verb, ''), verb),
      icon_name = COALESCE(NULLIF(p_icon_name, ''), icon_name)
    WHERE id = p_id
    RETURNING id INTO v_id;
  ELSE
    INSERT INTO books (slug, title, description, sort_order, cover_url, verb, icon_name)
    VALUES (p_slug, p_title, p_description, p_sort_order, p_cover_url, p_verb, p_icon_name)
    RETURNING id INTO v_id;
  END IF;

  RETURN v_id;
END;
$$;

-- 7. Admin — Kitap sil
CREATE OR REPLACE FUNCTION public.admin_delete_book(p_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Yetkiniz yok';
  END IF;
  DELETE FROM books WHERE id = p_id;
END;
$$;

-- 8. Admin — Rozet CRUD
CREATE OR REPLACE FUNCTION public.admin_upsert_badge(
  p_id uuid DEFAULT NULL,
  p_slug text DEFAULT '',
  p_name text DEFAULT '',
  p_description text DEFAULT '',
  p_icon_emoji text DEFAULT '🏅',
  p_xp_required int DEFAULT 0,
  p_category text DEFAULT 'general'
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id uuid;
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Yetkiniz yok';
  END IF;

  IF p_id IS NOT NULL THEN
    UPDATE badges SET
      slug = COALESCE(NULLIF(p_slug, ''), slug),
      name = COALESCE(NULLIF(p_name, ''), name),
      description = COALESCE(NULLIF(p_description, ''), description),
      icon_emoji = p_icon_emoji,
      xp_required = p_xp_required,
      category = p_category
    WHERE id = p_id
    RETURNING id INTO v_id;
  ELSE
    INSERT INTO badges (slug, name, description, icon_emoji, xp_required, category)
    VALUES (p_slug, p_name, p_description, p_icon_emoji, p_xp_required, p_category)
    RETURNING id INTO v_id;
  END IF;

  RETURN v_id;
END;
$$;

-- 9. Admin — Rozet sil
CREATE OR REPLACE FUNCTION public.admin_delete_badge(p_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Yetkiniz yok';
  END IF;
  DELETE FROM badges WHERE id = p_id;
END;
$$;

-- 10. Admin — Mesaj sil
CREATE OR REPLACE FUNCTION public.admin_delete_message(p_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Yetkiniz yok';
  END IF;
  DELETE FROM chat_messages WHERE id = p_id;
END;
$$;

-- 11. Admin — Raporları listele
CREATE OR REPLACE FUNCTION public.admin_list_reports(lim int DEFAULT 50)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result json;
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Yetkiniz yok';
  END IF;

  SELECT json_agg(r) INTO result FROM (
    SELECT
      cr.id,
      cr.reason,
      cr.created_at,
      cm.content as message_content,
      cm.user_id as message_author_id,
      p_reporter.display_name as reporter_name,
      p_author.display_name as author_name
    FROM chat_reports cr
    JOIN chat_messages cm ON cm.id = cr.message_id
    LEFT JOIN profiles p_reporter ON p_reporter.id = cr.reporter_id
    LEFT JOIN profiles p_author ON p_author.id = cm.user_id
    ORDER BY cr.created_at DESC
    LIMIT lim
  ) r;

  RETURN COALESCE(result, '[]'::json);
END;
$$;

-- 12. Admin — Prompt sil (moderasyon)
CREATE OR REPLACE FUNCTION public.admin_delete_prompt(p_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Yetkiniz yok';
  END IF;
  DELETE FROM prompts WHERE id = p_id;
END;
$$;

-- 13. Admin policy: Admin tüm profilleri görebilir
DROP POLICY IF EXISTS "Admin can read all profiles" ON public.profiles;
CREATE POLICY "Admin can read all profiles" ON public.profiles
  FOR SELECT USING (public.is_admin() OR auth.uid() = id);

-- 14. Admin policy: Admin tüm user_progress'i görebilir
DROP POLICY IF EXISTS "Admin can read all progress" ON public.user_progress;
CREATE POLICY "Admin can read all progress" ON public.user_progress
  FOR SELECT USING (public.is_admin() OR auth.uid() = user_id);

-- Grant'lar
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

SELECT '✅ Admin paneli SQL yüklendi! Şimdi kendinizi admin yapın: UPDATE profiles SET is_admin = true WHERE id = ''KENDI-USER-ID-NIZZ'';' AS durum;
