"use client";

import { useActionState } from "react";
import Link from "next/link";
import { resetPasswordAction, type ResetPasswordState } from "@/app/auth/actions";

export default function SifremiUnuttumPage() {
  const [state, formAction, isPending] = useActionState<ResetPasswordState, FormData>(resetPasswordAction, null);

  if (state?.success) {
    return (
      <div className="space-y-6 text-center">
        <div className="font-display text-2xl font-bold text-dz-orange-500">
          E-postanı kontrol et
        </div>
        <p className="text-dz-grey-600 dark:text-dz-grey-400">
          Şifre sıfırlama bağlantısı e-posta adresine gönderildi. Gelen kutunu
          (ve spam klasörünü) kontrol et.
        </p>
        <Link
          href="/giris"
          className="inline-block rounded-lg bg-dz-orange-500 px-4 py-3 min-h-[44px] font-medium text-white hover:bg-dz-orange-600"
        >
          Giriş sayfasına dön
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
          Şifreni sıfırla
        </p>
      </div>
      <form action={formAction} className="space-y-4">
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
            placeholder="ornek@email.com"
            className="w-full rounded-lg border border-dz-grey-200 bg-dz-grey-100 px-3 py-3 text-foreground dark:border-dz-grey-600 dark:bg-dz-grey-800"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="w-full min-h-[44px] rounded-lg bg-dz-orange-500 px-4 py-3 font-medium text-white hover:bg-dz-orange-600 disabled:opacity-50"
        >
          {isPending ? "Gönderiliyor…" : "Sıfırlama bağlantısı gönder"}
        </button>
      </form>
      <p className="text-center text-sm text-dz-grey-600 dark:text-dz-grey-400">
        Şifreni hatırladın mı?{" "}
        <Link href="/giris" className="text-dz-orange-500 hover:underline">
          Giriş yap
        </Link>
      </p>
    </div>
  );
}
