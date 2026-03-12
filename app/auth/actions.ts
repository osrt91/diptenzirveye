"use server";

import { createClient } from "@/lib/supabase/server";
import { checkAuthRateLimit } from "@/lib/rate-limit";
import { signInSchema, signUpSchema, validateInput } from "@/lib/schemas";
import { sanitizeEmail, sanitizeTextInput } from "@/lib/sanitize";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export type AuthState = { error?: string } | null;
export type SignUpState = { error?: string; success?: boolean } | null;
export type ResetPasswordState = { error?: string; success?: boolean } | null;

async function getClientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  const real = h.get("x-real-ip");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  if (real) return real;
  return "unknown";
}

export async function signInAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const ip = await getClientIp();
  const limit = checkAuthRateLimit(ip);
  if (!limit.ok) {
    return {
      error: `Çok fazla deneme. ${limit.retryAfter ? `${Math.ceil(limit.retryAfter / 60)} dakika sonra tekrar dene.` : "Daha sonra tekrar dene."}`,
    };
  }

  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
    next: formData.get("next") || "/panel",
  };

  const parsed = validateInput(signInSchema, raw);
  if ("error" in parsed) return { error: parsed.error };

  const { email: rawEmail, password, next: rawNext } = parsed.data;
  // Only allow relative paths starting with /
  const nextUrl = rawNext?.startsWith("/") && !rawNext.startsWith("//") ? rawNext : "/panel";
  const email = sanitizeEmail(rawEmail);

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: "Giriş başarısız. Lütfen bilgilerinizi kontrol edin." };
  }

  if (data.user && !data.user.email_confirmed_at) {
    await supabase.auth.signOut();
    return {
      error: "Hesabını kullanmak için önce e-posta adresini doğrulaman gerekiyor. Gelen kutunu kontrol et.",
    };
  }

  redirect(nextUrl);
}

export async function signUpAction(_prev: SignUpState, formData: FormData): Promise<SignUpState> {
  const ip = await getClientIp();
  const limit = checkAuthRateLimit(ip);
  if (!limit.ok) {
    return {
      error: `Çok fazla deneme. ${limit.retryAfter ? `${Math.ceil(limit.retryAfter / 60)} dakika sonra tekrar dene.` : "Daha sonra tekrar dene."}`,
    };
  }

  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
    name: String(formData.get("name") || "").trim() || undefined,
  };

  const parsed = validateInput(signUpSchema, raw);
  if ("error" in parsed) return { error: parsed.error };

  const { email: rawEmail, password, name } = parsed.data;
  const email = sanitizeEmail(rawEmail);
  const fullName = name ? sanitizeTextInput(name) : undefined;

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/auth/callback`,
    },
  });

  if (error) {
    return { error: `Kayıt oluşturulamadı: ${error.message}` };
  }

  return { success: true };
}

export async function resetPasswordAction(_prev: ResetPasswordState, formData: FormData): Promise<ResetPasswordState> {
  const ip = await getClientIp();
  const limit = checkAuthRateLimit(ip);
  if (!limit.ok) {
    return {
      error: `Çok fazla deneme. ${limit.retryAfter ? `${Math.ceil(limit.retryAfter / 60)} dakika sonra tekrar dene.` : "Daha sonra tekrar dene."}`,
    };
  }

  const rawEmail = formData.get("email");
  if (!rawEmail || typeof rawEmail !== "string") {
    return { error: "E-posta adresi gerekli." };
  }

  const email = sanitizeEmail(rawEmail);

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/auth/callback?next=/panel/profil`,
  });

  if (error) {
    return { error: "Şifre sıfırlama e-postası gönderilemedi. Lütfen tekrar deneyin." };
  }

  return { success: true };
}
