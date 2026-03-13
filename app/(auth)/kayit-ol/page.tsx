"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signUpAction, type SignUpState } from "@/app/auth/actions";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";

export default function SignupPage() {
  const [state, formAction, isPending] = useActionState<SignUpState, FormData>(signUpAction, null);

  if (state?.success) {
    return (
      <div className="space-y-6 text-center">
        <div className="font-display text-2xl font-bold text-dz-orange-500">
          E-postanı kontrol et
        </div>
        <p className="text-dz-grey-600 dark:text-dz-grey-400">
          Hesabını aktifleştirmek için gönderdiğimiz bağlantıya tıkla, ardından
          giriş yapabilirsin.
        </p>
        <Link
          href="/giris"
          className="inline-block rounded-lg bg-dz-orange-500 px-4 py-3 min-h-[44px] font-medium text-white hover:bg-dz-orange-600"
        >
          Giriş sayfasına git
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Link
          href="/"
          className="font-display text-2xl font-bold text-dz-black dark:text-dz-white"
        >
          <span className="font-black">Dipten</span><span className="font-normal text-dz-orange-500">Zirveye</span>
        </Link>
        <p className="mt-2 text-sm text-dz-grey-600 dark:text-dz-grey-400">
          Yeni hesap oluştur
        </p>
      </div>
      <form action={formAction} className="space-y-4">
        {state?.error && (
          <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-400">
            {state.error}
          </p>
        )}
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium">
            Ad (isteğe bağlı)
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Adın ve soyadın"
            className="w-full rounded-lg border border-dz-grey-200 bg-dz-grey-100 px-3 py-3 text-foreground dark:border-dz-grey-600 dark:bg-dz-grey-800"
          />
        </div>
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
            placeholder="ornek@email.com"
            className="w-full rounded-lg border border-dz-grey-200 bg-dz-grey-100 px-3 py-3 text-foreground dark:border-dz-grey-600 dark:bg-dz-grey-800"
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
            minLength={6}
            autoComplete="new-password"
            placeholder="En az 6 karakter"
            className="w-full rounded-lg border border-dz-grey-200 bg-dz-grey-100 px-3 py-3 text-foreground dark:border-dz-grey-600 dark:bg-dz-grey-800"
          />
          <p className="mt-1 text-xs text-dz-grey-400">En az 6 karakter</p>
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="w-full min-h-[44px] rounded-lg bg-dz-orange-500 px-4 py-3 font-medium text-white hover:bg-dz-orange-600 disabled:opacity-50"
        >
          {isPending ? "Kaydediliyor…" : "Kayıt ol"}
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
        Zaten hesabın var mı?{" "}
        <Link href="/giris" className="text-dz-orange-500 hover:underline">
          Giriş yap
        </Link>
      </p>
    </div>
  );
}
