import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return NextResponse.next({ request });
  }

  const response = NextResponse.next({ request });
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isPanel = path.startsWith("/panel");
  const isAdmin = path.startsWith("/admin");
  const isProtected = isPanel || isAdmin;
  const isAuthPage = path === "/giris" || path === "/kayit-ol";
  const isOnayBekliyor = path === "/onay-bekliyor";
  const emailConfirmed = user?.email_confirmed_at != null;

  if (isProtected && !user) {
    const redirect = new URL("/giris", request.url);
    redirect.searchParams.set("next", path);
    return NextResponse.redirect(redirect);
  }
  if (user && !emailConfirmed && isProtected) {
    return NextResponse.redirect(new URL("/onay-bekliyor", request.url));
  }
  if (user && emailConfirmed && (isAuthPage || isOnayBekliyor)) {
    return NextResponse.redirect(new URL("/panel", request.url));
  }

  return response;
}
