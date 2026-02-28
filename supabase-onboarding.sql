-- Onboarding Wizard: Add onboarding fields to profiles table
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS onboarding_completed boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS onboarding_goals text[] DEFAULT '{}';

-- Update RLS: Users can update their own onboarding fields
-- (existing update policy should cover this, but ensure it exists)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' 
    AND policyname = 'Users can update own profile'
  ) THEN
    CREATE POLICY "Users can update own profile" 
      ON public.profiles FOR UPDATE 
      USING (auth.uid() = id);
  END IF;
END $$;
