import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-dz-white dark:bg-dz-black flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="relative inline-block mb-8">
          <span className="font-display text-[10rem] md:text-[12rem] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-dz-orange-500 to-dz-orange-500/10">
            404
          </span>
        </div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-dz-black dark:text-dz-white mb-4">
          Sayfa Bulunamadı
        </h1>
        <p className="text-dz-grey-500 dark:text-dz-grey-400 mb-8 leading-relaxed">
          Aradığınız sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak kullanılamıyor olabilir.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-dz-orange-500 hover:bg-dz-orange-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-dz-orange-500/20"
          >
            Ana Sayfaya Dön
          </Link>
          <Link
            href="/iletisim"
            className="inline-flex items-center justify-center gap-2 border border-dz-grey-200 dark:border-dz-grey-800 text-dz-black dark:text-dz-white font-bold py-3 px-8 rounded-xl hover:bg-dz-grey-100 dark:hover:bg-dz-grey-900 transition-all"
          >
            Bize Ulaşın
          </Link>
        </div>
      </div>
    </main>
  );
}
