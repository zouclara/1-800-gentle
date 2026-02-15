-- Add parent_id to comments for reply threading
-- Run this in Supabase SQL Editor if replies are not working

ALTER TABLE public.comments
ADD COLUMN IF NOT EXISTS parent_id uuid REFERENCES public.comments(id) ON DELETE CASCADE;
