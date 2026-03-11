"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Flag, AlertTriangle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { AdminReport } from "@/lib/admin";

export default function AdminReportsClient({
    initialReports,
}: {
    initialReports: AdminReport[];
}) {
    const [reports, setReports] = useState<AdminReport[]>(initialReports);

    const handleDeleteMessage = async (report: AdminReport) => {
        if (!confirm("Raporlanan mesajı silmek istediğinizden emin misiniz?")) return;
        const supabase = createClient();
        // This deletes the message, which cascades to delete the report too
        await supabase.rpc("admin_delete_message", { p_id: report.id });
        setReports((prev) => prev.filter((r) => r.id !== report.id));
    };

    if (reports.length === 0) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="font-display text-3xl font-bold text-dz-black dark:text-white tracking-tight">
                        Raporlar
                    </h1>
                    <p className="text-dz-grey-500 dark:text-white/40 text-sm mt-1">Mesaj raporları</p>
                </div>
                <div className="rounded-2xl border border-dz-grey-200 dark:border-white/5 bg-white dark:bg-white/[0.02] p-12 text-center">
                    <Flag className="w-8 h-8 text-dz-grey-300 dark:text-white/10 mx-auto mb-4" />
                    <p className="text-dz-grey-500 dark:text-white/30 text-sm">Henüz rapor bulunmuyor</p>
                    <p className="text-dz-grey-400 dark:text-white/15 text-xs mt-1">Kullanıcılar mesajları raporladığında burada görünecek</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-display text-3xl font-bold text-dz-black dark:text-white tracking-tight">
                    Raporlar
                </h1>
                <p className="text-dz-grey-500 dark:text-white/40 text-sm mt-1">
                    {reports.length} aktif rapor
                </p>
            </div>

            <div className="space-y-3">
                {reports.map((report, i) => (
                    <motion.div
                        key={report.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className="rounded-2xl border border-red-500/10 bg-red-500/[0.02] p-5 space-y-3"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-red-400/50" />
                                <span className="text-xs text-dz-grey-500 dark:text-white/40">
                                    <strong className="text-dz-grey-600 dark:text-white/60">{report.reporter_name}</strong> tarafından raporlandı
                                </span>
                            </div>
                            <span className="text-[10px] text-dz-grey-400 dark:text-white/20 font-mono">
                                {new Date(report.created_at).toLocaleString("tr-TR")}
                            </span>
                        </div>

                        {report.reason && (
                            <div className="text-xs text-dz-grey-500 dark:text-white/50 bg-dz-grey-50 dark:bg-white/[0.03] rounded-lg px-3 py-2">
                                <strong className="text-dz-grey-500 dark:text-white/30">Sebep:</strong> {report.reason}
                            </div>
                        )}

                        <div className="rounded-xl bg-dz-grey-50 dark:bg-white/[0.03] border border-dz-grey-200 dark:border-white/5 p-4">
                            <p className="text-xs text-dz-grey-500 dark:text-white/30 mb-1">
                                {report.author_name} yazdı:
                            </p>
                            <p className="text-sm text-dz-grey-600 dark:text-white/60">{report.message_content}</p>
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={() => handleDeleteMessage(report)}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-xs font-medium hover:bg-red-500/20 transition-all"
                            >
                                <Trash2 className="w-3 h-3" /> Mesajı Sil
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
