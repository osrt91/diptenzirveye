import { createClient } from "@/lib/supabase/server";
import AdminTestimonialsClient from "@/components/admin/AdminTestimonialsClient";

export default async function AdminTestimonialsPage() {
    const supabase = await createClient();

    const { data: testimonials } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

    return <AdminTestimonialsClient initialTestimonials={testimonials ?? []} />;
}
