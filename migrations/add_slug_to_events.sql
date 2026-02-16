-- Add slug column to events table
ALTER TABLE events ADD COLUMN IF NOT EXISTS slug TEXT;

-- Create unique index on slug
CREATE UNIQUE INDEX IF NOT EXISTS events_slug_idx ON events(slug);

-- Backfill slugs for existing records (optional - generates from title)
UPDATE events 
SET slug = LOWER(
  REGEXP_REPLACE(
    REGEXP_REPLACE(
      REGEXP_REPLACE(title, '[^\w\s-]', '', 'g'),
      '\s+', '-', 'g'
    ),
    '-+', '-', 'g'
  )
)
WHERE slug IS NULL;

-- Ensure no duplicate slugs after backfill
DO $$
DECLARE
  r RECORD;
  new_slug TEXT;
BEGIN
  FOR r IN 
    SELECT id, slug, ROW_NUMBER() OVER (PARTITION BY slug ORDER BY created_at) as rn
    FROM events
    WHERE slug IS NOT NULL
  LOOP
    IF r.rn > 1 THEN
      new_slug := r.slug || '-' || substr(md5(random()::text), 1, 4);
      UPDATE events SET slug = new_slug WHERE id = r.id;
    END IF;
  END LOOP;
END $$;

-- Make slug NOT NULL after backfill
ALTER TABLE events ALTER COLUMN slug SET NOT NULL;

-- Optional: Add comment
COMMENT ON COLUMN events.slug IS 'URL-friendly unique identifier for the thread';
