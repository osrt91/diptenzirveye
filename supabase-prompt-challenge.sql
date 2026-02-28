-- Prompt Challenge Submissions Table
CREATE TABLE IF NOT EXISTS public.prompt_challenge_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  challenge_day int NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(user_id, challenge_day)
);

-- Enable RLS
ALTER TABLE public.prompt_challenge_submissions ENABLE ROW LEVEL SECURITY;

-- Users can read their own submissions
CREATE POLICY "Users can read own challenge submissions"
  ON public.prompt_challenge_submissions FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own submissions
CREATE POLICY "Users can insert own challenge submissions"
  ON public.prompt_challenge_submissions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Admins can read all submissions
CREATE POLICY "Admins can read all challenge submissions"
  ON public.prompt_challenge_submissions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );
