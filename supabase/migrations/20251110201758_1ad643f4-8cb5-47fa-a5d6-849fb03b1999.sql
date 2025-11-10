-- Create mini_sessions table for Between-Session Companion feature
CREATE TABLE public.mini_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  mood INTEGER CHECK (mood >= 1 AND mood <= 10),
  anxiety INTEGER CHECK (anxiety >= 1 AND anxiety <= 10),
  energy INTEGER CHECK (energy >= 1 AND energy <= 10),
  tags TEXT[],
  focus TEXT NOT NULL,
  user_text_primary TEXT,
  user_text_secondary TEXT,
  urge_level INTEGER CHECK (urge_level >= 1 AND urge_level <= 10),
  coaching TEXT,
  summary TEXT,
  shared_with_therapist BOOLEAN DEFAULT false
);

-- Enable RLS
ALTER TABLE public.mini_sessions ENABLE ROW LEVEL SECURITY;

-- Users can view their own mini-sessions
CREATE POLICY "Users can view own mini sessions"
ON public.mini_sessions
FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own mini-sessions
CREATE POLICY "Users can insert own mini sessions"
ON public.mini_sessions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own mini-sessions
CREATE POLICY "Users can update own mini sessions"
ON public.mini_sessions
FOR UPDATE
USING (auth.uid() = user_id);

-- Add indexes for performance
CREATE INDEX idx_mini_sessions_user_id ON public.mini_sessions(user_id);
CREATE INDEX idx_mini_sessions_created_at ON public.mini_sessions(created_at DESC);