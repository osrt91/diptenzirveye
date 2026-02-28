import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://diptenzirveye.com";

  const staticPages = [
    { url: "", priority: 1, changeFrequency: "weekly" as const },
    { url: "/test", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/fiyatlar", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/kayit-ol", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/giris", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/iletisim", priority: 0.6, changeFrequency: "monthly" as const },
    { url: "/panel-onizleme", priority: 0.6, changeFrequency: "monthly" as const },
    { url: "/gizlilik", priority: 0.3, changeFrequency: "yearly" as const },
    { url: "/kosullar", priority: 0.3, changeFrequency: "yearly" as const },
    { url: "/kvkk", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  const posts = await getBlogPosts();

  return [
    ...staticPages.map((page) => ({
      url: `${siteUrl}${page.url}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at || post.created_at),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
