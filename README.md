# DiptenZirveye Platform

Landing page ve bekleme listesi (Faz 1). Next.js 14+, Supabase, Tailwind, Framer Motion.

## Geliştirme

```bash
npm install
cp .env.local.example .env.local
# .env.local içine NEXT_PUBLIC_SUPABASE_URL ve NEXT_PUBLIC_SUPABASE_ANON_KEY ekle
npm run dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) açın.

## Supabase

1. [Supabase](https://supabase.com) projesi oluşturun.
2. SQL Editor'da `supabase-waitlist.sql` dosyasındaki tabloyu çalıştırın.
3. RLS kullanıyorsanız, `waitlist` tablosu için anon insert/select policy ekleyin (dosyadaki yorum satırlarına bakın).
4. Settings → API'den URL ve anon key'i alıp `.env.local` içine yazın.

## Deploy

Vercel adımları, ortam değişkenleri, Supabase/Polar ayarları ve kontrol listesi: **[DEPLOY.md](./DEPLOY.md)**. Root Directory: `diptenzirveye`.
