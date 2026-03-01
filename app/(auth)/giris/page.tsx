"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { signInAction, type AuthState } from "@/app/auth/actions";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";

function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/panel";
  const [state, formAction, isPending] = useActionState<AuthState, FormData>(signInAction, null);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Link
          href="/"
          className="font-display text-2xl font-bold text-dz-black dark:text-dz-white"
        >
          Dipten<span className="text-dz-orange-500">Zirveye</span>
        </Link>
        <p className="mt-2 text-sm text-dz-grey-600 dark:text-dz-grey-400">
          Hesabına giriş yap
        </p>
      </div>
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="next" value={next} />
        {state?.error && (
          <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-400">
            {state.error}
          </p>
        )}
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">
            E-posta
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-lg border border-dz-grey-200 bg-dz-grey-100 px-3 py-2 text-foreground dark:border-dz-grey-600 dark:bg-dz-grey-800"
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium">
            Şifre
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="w-full rounded-lg border border-dz-grey-200 bg-dz-grey-100 px-3 py-2 text-foreground dark:border-dz-grey-600 dark:bg-dz-grey-800"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg bg-dz-orange-500 px-4 py-2 font-medium text-white hover:bg-dz-orange-600 disabled:opacity-50"
        >
          {isPending ? "Giriş yapılıyor…" : "Giriş yap"}
        </button>
      </form>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-dz-grey-200 dark:border-dz-grey-700" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-3 text-dz-grey-500">veya</span>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <GoogleSignInButton />
      </div>
      <p className="text-center text-sm text-dz-grey-600 dark:text-dz-grey-400">
        Hesabın yok mu?{" "}
        <Link href="/kayit-ol" className="text-dz-orange-500 hover:underline">
          Kayıt ol
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-center text-dz-grey-500">Yükleniyor…</div>}>
      <LoginForm />
    </Suspense>
  );
}
