-- =============================================================
-- Oura Sartoria — Supabase schema
--
-- Isay apne Supabase project ke SQL Editor mein paste karke RUN karo.
-- Iske baad `npm run seed` chala kar existing products database mein
-- daal do.
-- =============================================================

-- 1) Products table -------------------------------------------
create table if not exists public.products (
  id               text primary key,
  slug             text not null unique,
  name             text not null,
  category         text not null check (category in ('Formal','Casual','Linen','Kurta Collar','Denim')),
  price            integer not null check (price >= 0),
  compare_at_price integer,
  fabric           text not null default '',
  fit              text not null default '',
  colors           text[] not null default '{}',
  sizes            text[] not null default '{}',
  image            text not null default '',
  images           text[] not null default '{}',
  description      text not null default '',
  is_new           boolean not null default false,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- updated_at auto-update
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

-- 2) Row Level Security ----------------------------------------
-- Anonymous visitors shop data READ kar sakte hain.
-- Write/update/delete sirf service-role key (admin API) se hoga.
alter table public.products enable row level security;

drop policy if exists "products_read" on public.products;
create policy "products_read"
  on public.products for select
  to anon, authenticated
  using (true);

-- 3) Storage bucket for product images -------------------------
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

-- Public read of images (anonymous)
drop policy if exists "product_images_read" on storage.objects;
create policy "product_images_read"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'product-images');

-- Admin (service role) uploads/writes. Service-role key RLS bypass karta
-- hai, lekin ye policies future me auth.users-based admin ke liye ready hain.
drop policy if exists "product_images_write_admin" on storage.objects;
create policy "product_images_write_admin"
  on storage.objects for insert
  to service_role
  with check (bucket_id = 'product-images');

drop policy if exists "product_images_update_admin" on storage.objects;
create policy "product_images_update_admin"
  on storage.objects for update
  to service_role
  using (bucket_id = 'product-images')
  with check (bucket_id = 'product-images');

drop policy if exists "product_images_delete_admin" on storage.objects;
create policy "product_images_delete_admin"
  on storage.objects for delete
  to service_role
  using (bucket_id = 'product-images');

-- 4) Admin sessions table (agar baad mein user-based admin chahiye)
-- create table if not exists public.admin_sessions (
--   id uuid primary key default gen_random_uuid(),
--   token_hash text not null,
--   created_at timestamptz not null default now(),
--   expires_at timestamptz not null
-- );
