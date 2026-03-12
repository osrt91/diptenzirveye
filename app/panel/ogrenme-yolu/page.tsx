import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import LearningPathClient from "@/components/panel/learning/LearningPathClient";

export const metadata = {
  title: "Öğrenme Yolu | DiptenZirveye",
};

export default async function OgrenmeYoluPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/giris");

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="font-display text-2xl font-bold text-dz-black dark:text-dz-white">
          Kişisel Öğrenme Yolu
        </h1>
        <p className="text-dz-grey-600 dark:text-dz-grey-400 mt-1">
          AI destekli, sana özel öğrenme planı
        </p>
      </div>
      <LearningPathClient />
    </div>
  );
}
