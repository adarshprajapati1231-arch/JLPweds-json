-- Supabase / Postgres schema for vendors table
CREATE TABLE IF NOT EXISTS public.vendors (
  id uuid PRIMARY KEY,
  email text UNIQUE,
  password_hash text,
  phone text,
  business_name text,
  slug text,
  seo_title text,
  seo_description text,
  image text,
  verified boolean DEFAULT false,
  rating numeric DEFAULT 4.8,
  review_count integer DEFAULT 0,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS vendors_slug_idx ON public.vendors (slug);
