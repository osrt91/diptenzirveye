import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "E-posta gerekli.")
    .email("Geçerli bir e-posta adresi gir."),
  password: z
    .string()
    .min(1, "Şifre gerekli."),
  next: z
    .string()
    .optional()
    .default("/panel")
    .refine(
      (v) => !v || (v.startsWith("/") && !v.startsWith("//")),
      "Geçersiz yönlendirme adresi."
    ),
});

export type SignInInput = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
  email: z
    .string()
    .min(1, "E-posta gerekli.")
    .email("Geçerli bir e-posta adresi gir."),
  password: z
    .string()
    .min(6, "Şifre en az 6 karakter olmalı."),
  name: z
    .string()
    .min(2, "İsim en az 2 karakter olmalı.")
    .max(100, "İsim en fazla 100 karakter olabilir."),
});

export type SignUpInput = z.infer<typeof signUpSchema>;

export const waitlistSchema = z.object({
  email: z
    .string()
    .min(1, "E-posta gerekli.")
    .email("Geçerli bir e-posta adresi gir."),
  name: z
    .string()
    .max(100)
    .optional()
    .default(""),
  interest: z
    .string()
    .max(500)
    .optional()
    .default(""),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;

export const chatMessageSchema = z.object({
  content: z
    .string()
    .min(1, "Mesaj boş olamaz.")
    .max(2000, "Mesaj en fazla 2000 karakter olabilir."),
  roomId: z
    .string()
    .uuid("Geçersiz oda kimliği."),
});

export type ChatMessageInput = z.infer<typeof chatMessageSchema>;

export function validateInput<T>(schema: z.ZodSchema<T>, data: unknown): { data: T; error?: never } | { data?: never; error: string } {
  const result = schema.safeParse(data);
  if (!result.success) {
    const firstError = result.error.issues[0]?.message ?? "Geçersiz veri.";
    return { error: firstError };
  }
  return { data: result.data };
}
