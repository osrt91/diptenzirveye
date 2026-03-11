-- ============================================================
-- DiptenZirveye - SITE SETTINGS TABLE
-- Admin panelden yonetilebilir site ayarlari
-- ============================================================

create table if not exists public.site_settings (
  key text primary key,
  value text not null default '',
  label text not null default '',
  category text not null default 'general',
  is_secret boolean default false,
  updated_at timestamptz default now()
);

-- RLS
alter table public.site_settings enable row level security;

-- Herkes okuyabilir (public keys icin), sadece admin yazabilir
drop policy if exists "Anyone can read non-secret settings" on public.site_settings;
create policy "Anyone can read non-secret settings"
  on public.site_settings for select
  using (is_secret = false);

drop policy if exists "Admins can read all settings" on public.site_settings;
create policy "Admins can read all settings"
  on public.site_settings for select
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.is_admin = true
    )
  );

drop policy if exists "Admins can insert settings" on public.site_settings;
create policy "Admins can insert settings"
  on public.site_settings for insert
  with check (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.is_admin = true
    )
  );

drop policy if exists "Admins can update settings" on public.site_settings;
create policy "Admins can update settings"
  on public.site_settings for update
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.is_admin = true
    )
  );

drop policy if exists "Admins can delete settings" on public.site_settings;
create policy "Admins can delete settings"
  on public.site_settings for delete
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.is_admin = true
    )
  );

-- Varsayilan ayarlar (upsert)
insert into public.site_settings (key, value, label, category, is_secret) values
  ('ga_id', '', 'Google Analytics ID (G-XXXXX)', 'analytics', false),
  ('gtm_id', '', 'Google Tag Manager ID (GTM-XXXXX)', 'analytics', false),
  ('clarity_id', '', 'Microsoft Clarity ID', 'analytics', false),
  ('fb_pixel_id', '', 'Facebook/Meta Pixel ID', 'analytics', false),
  ('tiktok_pixel_id', '', 'TikTok Pixel ID', 'analytics', false),
  ('google_site_verification', '', 'Google Search Console Dogrulama Kodu', 'seo', false),
  ('fb_domain_verification', '', 'Facebook Domain Dogrulama Kodu', 'seo', false),
  ('recaptcha_site_key', '', 'reCAPTCHA Site Key', 'security', false),
  ('recaptcha_secret_key', '', 'reCAPTCHA Secret Key', 'security', true),
  ('chatbot_enabled', 'true', 'AI Chatbot Aktif', 'chatbot', false),
  ('chatbot_welcome_message', 'Merhaba! Ben DiptenZirveye AI Danismanin. Sana nasil yardimci olabilirim? AI ogrenme yolculugun, hedeflerin veya platformumuz hakkinda her seyi sorabilirsin.', 'Chatbot Karsilama Mesaji', 'chatbot', false),
  ('chatbot_system_prompt', '', 'Chatbot Ozel System Prompt (bos birakilirsa varsayilan kullanilir)', 'chatbot', false)
on conflict (key) do nothing;

-- Admin icin tum ayarlari okuyan fonksiyon (secret dahil)
create or replace function public.admin_get_all_settings()
returns setof public.site_settings
language sql
security definer
as $$
  select * from public.site_settings order by category, key;
$$;

-- Public ayarlari okuyan fonksiyon (secret haric)
create or replace function public.get_public_settings()
returns setof public.site_settings
language sql
security definer
as $$
  select * from public.site_settings where is_secret = false order by category, key;
$$;
