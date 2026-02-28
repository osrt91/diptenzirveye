"use client";

import { useEffect } from "react";

/**
 * İçerik koruma katmanı — kitap okuma sayfalarında kullanılır.
 * - Sağ tık engeli
 * - Copy/paste engeli
 * - Print engeli (Ctrl+P)
 * - Metin seçimi engeli (CSS ile)
 * - DevTools uyarısı
 */
export default function ContentProtection({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Sağ tık engelle
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
        };

        // Kopyalama engelle
        const handleCopy = (e: ClipboardEvent) => {
            e.preventDefault();
            e.clipboardData?.setData("text/plain", "Bu içerik telif hakkı ile korunmaktadır. © DiptenZirveye");
        };

        // Yazdırma ve DevTools kısayolları engelle
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ctrl+P (yazdırma)
            if (e.ctrlKey && e.key === "p") {
                e.preventDefault();
            }
            // Ctrl+S (kaydetme)
            if (e.ctrlKey && e.key === "s") {
                e.preventDefault();
            }
            // Ctrl+U (kaynak kodu)
            if (e.ctrlKey && e.key === "u") {
                e.preventDefault();
            }
            // F12
            if (e.key === "F12") {
                e.preventDefault();
            }
            // Ctrl+Shift+I (DevTools)
            if (e.ctrlKey && e.shiftKey && e.key === "I") {
                e.preventDefault();
            }
            // Ctrl+Shift+J (Console)
            if (e.ctrlKey && e.shiftKey && e.key === "J") {
                e.preventDefault();
            }
        };

        // Print engeli
        const handleBeforePrint = () => {
            document.body.style.visibility = "hidden";
        };
        const handleAfterPrint = () => {
            document.body.style.visibility = "visible";
        };

        document.addEventListener("contextmenu", handleContextMenu);
        document.addEventListener("copy", handleCopy);
        document.addEventListener("keydown", handleKeyDown);
        window.addEventListener("beforeprint", handleBeforePrint);
        window.addEventListener("afterprint", handleAfterPrint);

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
            document.removeEventListener("copy", handleCopy);
            document.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("beforeprint", handleBeforePrint);
            window.removeEventListener("afterprint", handleAfterPrint);
        };
    }, []);

    return (
        <div
            className="select-none"
            style={{ WebkitUserSelect: "none", userSelect: "none" }}
            onDragStart={(e) => e.preventDefault()}
        >
            {children}
        </div>
    );
}
