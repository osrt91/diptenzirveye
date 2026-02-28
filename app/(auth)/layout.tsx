import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(var(--dz-grey-400) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-dz-orange-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="relative z-10 w-full max-w-md bg-dz-white/80 dark:bg-dz-white/[0.03] backdrop-blur-xl border border-dz-grey-200 dark:border-dz-white/10 rounded-3xl p-8 shadow-2xl">
        {children}
      </div>
    </div>
  );
}
