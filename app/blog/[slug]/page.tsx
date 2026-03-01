import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { notFound } from "next/navigation";
import { getBlogPost, getBlogPosts } from "@/lib/blog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const revalidate = 60;

export async function generateStaticParams() {
    const posts = await getBlogPosts();
    return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getBlogPost(slug);
    if (!post) return { title: "Yazı Bulunamadı | DiptenZirveye" };
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://diptenzirveye.com";
    return {
        title: `${post.title} | DiptenZirveye Blog`,
        description: post.excerpt,
        alternates: {
            canonical: `/blog/${slug}`,
        },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            publishedTime: post.created_at,
            modifiedTime: post.updated_at || post.created_at,
            url: `${siteUrl}/blog/${slug}`,
            siteName: "DiptenZirveye",
        },
    };
}

export default async function BlogPostSayfasi({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getBlogPost(slug);
    if (!post) notFound();

    const date = new Date(post.created_at).toLocaleDateString("tr-TR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const paragraphs = post.content
        ? post.content.split("\n\n").filter(Boolean)
        : [];

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://diptenzirveye.com";
    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.created_at,
        dateModified: post.updated_at || post.created_at,
        author: { "@type": "Organization", name: "DiptenZirveye" },
        publisher: { "@type": "Organization", name: "DiptenZirveye", url: siteUrl },
        mainEntityOfPage: `${siteUrl}/blog/${slug}`,
    };

    return (
        <main className="min-h-screen bg-dz-white dark:bg-dz-black text-dz-black dark:text-dz-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
            <Navbar />

            <article className="max-w-3xl mx-auto px-4 pt-32 pb-20">
                <Link href="/blog" className="inline-flex items-center gap-2 text-dz-grey-500 hover:text-dz-orange-500 transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4" /> Tüm Yazılara Dön
                </Link>

                <header className="mb-12">
                    <div className="flex items-center gap-4 text-sm font-medium uppercase tracking-wider mb-6">
                        <span className="text-dz-orange-500 px-3 py-1 bg-dz-orange-500/10 rounded-full border border-dz-orange-500/20">{post.category}</span>
                        <span className="text-dz-grey-500 flex items-center gap-1.5"><Clock className="w-3 h-3" /> {post.read_time}</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold font-display tracking-tight mb-4 leading-tight">
                        {post.title}
                    </h1>
                    <p className="text-lg text-dz-grey-500">{date}</p>
                </header>

                {post.cover_image ? (
                    <div className="w-full h-64 md:h-96 rounded-3xl mb-12 border border-dz-grey-200 dark:border-dz-grey-800 overflow-hidden relative">
                        <Image src={post.cover_image} alt={post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" priority />
                    </div>
                ) : (
                    <div className="w-full h-64 md:h-96 bg-gradient-to-br from-dz-grey-200 dark:from-dz-grey-800 to-dz-grey-100 dark:to-dz-black rounded-3xl mb-12 border border-dz-grey-200 dark:border-dz-grey-800 flex items-center justify-center">
                        <span className="text-dz-grey-300 dark:text-dz-grey-600 font-display font-bold text-6xl uppercase tracking-widest opacity-30">{post.category}</span>
                    </div>
                )}

                {paragraphs.length > 0 ? (
                    <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-dz-orange-500 mb-16 space-y-4">
                        {paragraphs.map((p, i) => {
                            if (p.startsWith("## ")) {
                                return <h2 key={i} className="text-2xl font-display font-bold mt-8 mb-4">{p.replace("## ", "")}</h2>;
                            }
                            if (p.startsWith("### ")) {
                                return <h3 key={i} className="text-xl font-display font-bold mt-6 mb-3">{p.replace("### ", "")}</h3>;
                            }
                            if (p.startsWith("- ") || p.startsWith("1. ")) {
                                const items = p.split("\n").filter(Boolean);
                                return (
                                    <ul key={i} className="list-disc pl-6 space-y-2">
                                        {items.map((item, j) => (
                                            <li key={j} className="text-dz-grey-600 dark:text-dz-grey-400">{item.replace(/^[-\d.]\s*/, "")}</li>
                                        ))}
                                    </ul>
                                );
                            }
                            return <p key={i} className="text-dz-grey-600 dark:text-dz-grey-400 leading-relaxed">{p}</p>;
                        })}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <p className="text-dz-grey-500">Bu yazının içeriği yakında eklenecek.</p>
                    </div>
                )}

                <div className="bg-dz-orange-500/5 border border-dz-orange-500/20 rounded-2xl p-8 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-dz-orange-500/10 blur-[40px] rounded-full pointer-events-none" />
                    <h3 className="text-2xl font-bold font-display mb-4 relative z-10">Erteleme Seviyeni Öğrenmek İster misin?</h3>
                    <p className="text-dz-grey-500 mb-6 relative z-10">
                        Kendi alışkanlıklarını analiz et ve senin için özel olarak hazırlanan 10 kitaplık çalışma planına hemen ulaş.
                    </p>
                    <Link href="/test" className="inline-flex items-center justify-center gap-3 bg-dz-orange-500 hover:bg-dz-orange-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-dz-orange-500/30 relative z-10">
                        Testi Çöz <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </article>

            <Footer />
        </main>
    );
}
