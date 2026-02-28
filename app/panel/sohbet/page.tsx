import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import SohbetClient from "@/components/panel/chat/SohbetClient";
import { Skeleton } from "@/components/ui/Skeleton";

const DEFAULT_ROOM_SLUG = "genel";
const MESSAGE_LIMIT = 100;

async function SohbetContent() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/giris");

  const { data: room } = await supabase
    .from("chat_rooms")
    .select("id, name, slug")
    .eq("slug", DEFAULT_ROOM_SLUG)
    .single();

  if (!room) {
    return (
      <div className="rounded-xl border border-dz-grey-200 dark:border-dz-grey-800 p-6 text-center text-dz-grey-600 dark:text-dz-grey-400">
        Genel sohbet odası bulunamadı.
      </div>
    );
  }

  const { data: messages } = await supabase
    .from("chat_messages")
    .select("id, content, created_at, user_id")
    .eq("room_id", room.id)
    .order("created_at", { ascending: true })
    .limit(MESSAGE_LIMIT);

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name")
    .eq("id", user.id)
    .single();

  const userDisplayName = profile?.display_name || user.user_metadata?.full_name || user.email?.split("@")[0] || "AI Yolcusu";

  return (
    <SohbetClient
      rooms={[room]}
      roomId={room.id}
      roomName={room.name}
      roomSlug={room.slug}
      initialMessages={messages ?? []}
      currentUserId={user.id}
      currentUserName={userDisplayName}
    />
  );
}

export default async function SohbetPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-dz-black dark:text-dz-white">
        Komünite & Prompt Havuzu
      </h1>
      <p className="text-sm text-dz-grey-600 dark:text-dz-grey-400">
        Diğer AI liderleriyle tanış, en etkili promptlarını paylaş ve beraber geliş.
      </p>
      <Suspense
        fallback={
          <div className="rounded-xl border border-dz-grey-200 dark:border-dz-grey-800 p-4 space-y-4">
            <Skeleton className="h-8 w-40" />
            <div className="space-y-3 min-h-[200px]">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-10 w-1/2" />
              <Skeleton className="h-10 w-2/3" />
            </div>
            <Skeleton className="h-10 w-full" />
          </div>
        }
      >
        <SohbetContent />
      </Suspense>
    </div>
  );
}
