-- ============================================================================
-- FAZ 1 SQL MIGRATION
-- ============================================================================

-- ============================================================================
-- 1. Update get_leaderboard to use LEFT JOIN
-- ============================================================================

CREATE OR REPLACE FUNCTION public.get_leaderboard(lim int DEFAULT 50)
RETURNS TABLE (
  rank bigint,
  user_id uuid,
  display_name text,
  total_xp int,
  level int
)
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
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

-- ============================================================================
-- 2. Add dz_coins column to user_progress
-- ============================================================================

ALTER TABLE public.user_progress 
  ADD COLUMN IF NOT EXISTS dz_coins int DEFAULT 0 NOT NULL;

-- ============================================================================
-- 3. Create grant_coins RPC function
-- ============================================================================

CREATE OR REPLACE FUNCTION public.grant_coins(
  p_user_id uuid,
  p_amount int,
  p_description text DEFAULT ''
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE user_progress
  SET dz_coins = dz_coins + p_amount,
      updated_at = now()
  WHERE user_id = p_user_id;
  
  IF NOT FOUND THEN
    INSERT INTO user_progress (user_id, dz_coins)
    VALUES (p_user_id, p_amount);
  END IF;
END;
$$;

GRANT EXECUTE ON FUNCTION public.grant_coins(uuid, int, text) TO authenticated;

-- ============================================================================
-- 4. Create spend_coins RPC function
-- ============================================================================

CREATE OR REPLACE FUNCTION public.spend_coins(
  p_user_id uuid,
  p_amount int,
  p_item_id text DEFAULT ''
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_balance int;
BEGIN
  SELECT dz_coins INTO current_balance
  FROM user_progress
  WHERE user_id = p_user_id
  FOR UPDATE;
  
  IF current_balance IS NULL OR current_balance < p_amount THEN
    RETURN false;
  END IF;
  
  UPDATE user_progress
  SET dz_coins = dz_coins - p_amount,
      updated_at = now()
  WHERE user_id = p_user_id;
  
  RETURN true;
END;
$$;

GRANT EXECUTE ON FUNCTION public.spend_coins(uuid, int, text) TO authenticated;

-- ============================================================================
-- 5. Create streak_history table for 90-day tracking
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.streak_history (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_date date NOT NULL DEFAULT current_date,
  xp_earned int DEFAULT 0,
  tasks_completed int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, activity_date)
);

ALTER TABLE public.streak_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own streak history"
  ON public.streak_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own streak history"
  ON public.streak_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own streak history"
  ON public.streak_history FOR UPDATE
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_streak_history_user_date
  ON public.streak_history(user_id, activity_date DESC);

-- ============================================================================
-- 6. Create record_daily_activity function (auto-records streak)
-- ============================================================================

CREATE OR REPLACE FUNCTION public.record_daily_activity(
  p_user_id uuid,
  p_xp int DEFAULT 0,
  p_tasks int DEFAULT 0
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO streak_history (user_id, activity_date, xp_earned, tasks_completed)
  VALUES (p_user_id, current_date, p_xp, p_tasks)
  ON CONFLICT (user_id, activity_date)
  DO UPDATE SET
    xp_earned = streak_history.xp_earned + p_xp,
    tasks_completed = streak_history.tasks_completed + p_tasks;
END;
$$;

GRANT EXECUTE ON FUNCTION public.record_daily_activity(uuid, int, int) TO authenticated;
