import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getBlogPosts } from "@/lib/blog";

export const metadata = {
    title: "Blog | DiptenZirveye Düşünce Ekosistemi",
    description: "Erteleme, odaklanma ve kişisel verimlilik üzerine güncel makaleler ve rehberler.",
};

export const revalidate = 60;

export default async function BlogIndeksSayfasi() {
    const posts = await getBlogPosts();
    const categories = ["Tümü", ...new Set(posts.map((p) => p.category))];

    return (
        <main className="min-h-screen bg-dz-white dark:bg-dz-black">
            <Navbar />

            <section className="relative pt-32 pb-20 px-4 overflow-hidden">
                <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-dz-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold font-display tracking-tight text-dz-black dark:text-dz-white mb-6 uppercase">
                        Düşünce Ekosistemi
                    </h1>
                    <p className="text-xl text-dz-grey-500 max-w-2xl mx-auto mb-12">
                        Zihnini yeniden yapılandırmak, ertelemeyi bırakmak ve potansiyelini zirveye taşımak için yazılar.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-3">
                        {categories.map((kat, index) => (
                            <span
                                key={index}
                                className={`px-5 py-2 rounded-full text-sm font-medium border ${index === 0 ? "bg-dz-orange-500 text-white border-dz-orange-500" : "bg-transparent text-dz-black dark:text-dz-white border-dz-grey-200 dark:border-dz-grey-700"}`}
                            >
                                {kat}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-10 px-4">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => {
                        const date = new Date(post.created_at).toLocaleDateString("tr-TR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        });

                        return (
                            <Link href={`/blog/${post.slug}`} key={post.id} className="group flex flex-col bg-dz-grey-50 dark:bg-dz-grey-900 border border-dz-grey-200 dark:border-dz-grey-800 rounded-2xl overflow-hidden hover:border-dz-orange-500/30 transition-all duration-300">
                                <div className="w-full h-48 bg-gradient-to-br from-dz-grey-800 to-dz-black relative overflow-hidden flex items-center justify-center">
                                    {post.cover_image ? (
                                        <Image src={post.cover_image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" loading="lazy" />
                                    ) : (
                                        <>
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                                            <span className="text-white/20 font-display font-bold text-4xl uppercase tracking-widest">{post.category}</span>
                                        </>
                                    )}
                                </div>

                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center justify-between text-xs text-dz-orange-500 mb-4 font-medium uppercase tracking-wider">
                                        <span>{post.category}</span>
                                        <div className="flex items-center gap-1.5 text-dz-grey-500">
                                            <Clock className="w-3 h-3" /> {post.read_time}
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-dz-black dark:text-dz-white mb-3 group-hover:text-dz-orange-500 transition-colors">
                                        {post.title}
                                    </h3>

                                    <p className="text-dz-grey-500 mb-6 flex-grow line-clamp-3">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto">
                                        <span className="text-sm text-dz-grey-400">{date}</span>
                                        <span className="flex items-center gap-2 text-dz-black dark:text-dz-white font-medium group-hover:text-dz-orange-500 transition-colors text-sm uppercase tracking-wide">
                                            Oku <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>

            <section className="py-24 px-4 bg-dz-grey-50 dark:bg-dz-grey-900 relative overflow-hidden">
                <div className="max-w-4xl mx-auto rounded-3xl bg-dz-white dark:bg-dz-black border border-dz-orange-500/20 p-10 md:p-16 text-center shadow-2xl relative">
                    <div className="absolute inset-0 bg-dz-orange-500/5 rounded-3xl pointer-events-none" />
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-dz-black dark:text-dz-white mb-6 uppercase">
                            Sürekli Okumak Yetmez, Harekete Geç
                        </h2>
                        <p className="text-lg text-dz-grey-500 mb-10 max-w-2xl mx-auto">
                            Erteleme alışkanlığını analiz edip sana özel 10 kitaplık çalışma programını çıkaralım. Tamamen ücretsiz testini şimdi çöz.
                        </p>
                        <Link href="/test" className="inline-flex items-center justify-center gap-3 bg-dz-orange-500 hover:bg-dz-orange-600 text-white font-bold text-lg py-4 px-10 rounded-xl transition-all duration-300 shadow-lg shadow-dz-orange-500/30">
                            Özel Planını Analiz Et <ArrowRight />
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
