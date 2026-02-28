import { getSupabase } from "@/lib/supabase";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  read_time: string;
  published: boolean;
  created_at: string;
  updated_at: string;
};

const FALLBACK_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "erteleme-aliskanligini-kirmak-icin-2-dakika-kurali",
    title: "Erteleme Alışkanlığını Kırmak İçin '2 Dakika Kuralı'",
    excerpt: "Neden başlarken bu kadar zorlanıyoruz? Ve sadece 120 saniye ile hedeflerimize başlamak nasıl mümkün olabilir?",
    content: "",
    category: "Verimlilik",
    read_time: "3 Dk Okuma",
    published: true,
    created_at: "2026-02-24T00:00:00Z",
    updated_at: "2026-02-24T00:00:00Z",
  },
  {
    id: "2",
    slug: "derin-calisma-nedir-ve-nasil-uygulanir",
    title: "Derin Çalışma (Deep Work) Nedir ve Nasıl Uygulanır?",
    excerpt: "Sürekli bildirimlerin olduğu bir dünyada, odaklanma yeteneği nadir ve paha biçilemez bir beceridir.",
    content: "",
    category: "Odaklanma",
    read_time: "5 Dk Okuma",
    published: true,
    created_at: "2026-02-20T00:00:00Z",
    updated_at: "2026-02-20T00:00:00Z",
  },
  {
    id: "3",
    slug: "mukemmelliyetcilik-tuzagindan-kurtulmak",
    title: "Mükemmelliyetçilik Tuzağından Kurtulmak: 'Bitti' 'Mükemmel'den İyidir",
    excerpt: "Her şeyin kusursuz olmasını beklemek, aslında projelerimizi bitirmememizin en büyük sebebidir.",
    content: "",
    category: "Psikoloji",
    read_time: "4 Dk Okuma",
    published: true,
    created_at: "2026-02-15T00:00:00Z",
    updated_at: "2026-02-15T00:00:00Z",
  },
];

export async function getBlogPosts(): Promise<BlogPost[]> {
  const supabase = getSupabase();
  if (!supabase) return FALLBACK_POSTS;

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error || !data || data.length === 0) return FALLBACK_POSTS;
  return data;
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const supabase = getSupabase();
  if (!supabase) return FALLBACK_POSTS.find((p) => p.slug === slug) ?? null;

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error || !data) return FALLBACK_POSTS.find((p) => p.slug === slug) ?? null;
  return data;
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const supabase = getSupabase();
  if (!supabase) return FALLBACK_POSTS;

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return FALLBACK_POSTS;
  return data;
}
