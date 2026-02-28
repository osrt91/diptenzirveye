import { ActionError } from "@/lib/errors";

type ActionResult<T> = { data: T; error?: never } | { data?: never; error: string };

export async function withActionHandler<T>(
  fn: () => Promise<T>
): Promise<ActionResult<T>> {
  try {
    const data = await fn();
    return { data };
  } catch (err) {
    if (err instanceof ActionError) {
      return { error: err.message };
    }
    return { error: "Beklenmeyen bir hata oluştu. Lütfen tekrar dene." };
  }
}
