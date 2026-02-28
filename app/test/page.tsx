import TestAkisi from "@/components/test/TestAkisi";

export const metadata = {
    title: "Özel Planını Oluştur | DiptenZirveye",
    description: "Dipten Zirveye serüvenin için sana özel çalışma planını hazırlanıyor.",
};

export default function TestPage() {
    return (
        <main className="min-h-screen bg-dz-white dark:bg-dz-black text-dz-black dark:text-dz-white flex items-center justify-center py-12 px-4 selection:bg-dz-orange-500/30 selection:text-dz-orange-500">
            <div className="w-full max-w-2xl mx-auto">
                <TestAkisi />
            </div>
        </main>
    );
}
