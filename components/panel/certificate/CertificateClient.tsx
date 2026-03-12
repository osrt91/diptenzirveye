"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Award, BookOpen, FileText, Share2 } from "lucide-react";
import { isNative, shareContent } from "@/lib/capacitor";

interface CompletedBook {
  id: string;
  title: string;
  completed_at: string;
}

interface CertificateClientProps {
  userName: string;
  userId: string;
  completedBooks: CompletedBook[];
  totalXp: number;
  level: number;
}

async function generateCertificatePDF(
  userName: string,
  bookTitle: string,
  completedAt: string,
  certId: string
) {
  const { pdf, Document, Page, Text, View, StyleSheet, Image } =
    await import("@react-pdf/renderer");
  const QRCode = (await import("qrcode")).default;

  const qrDataUrl = await QRCode.toDataURL(
    `${typeof window !== "undefined" ? window.location.origin : "https://diptenzirveye.com"}/sertifika/dogrula/${certId}`,
    { width: 120, margin: 1, color: { dark: "#f97316" } }
  );

  const styles = StyleSheet.create({
    page: {
      padding: 40,
      backgroundColor: "#fdfaf7",
      fontFamily: "Helvetica",
    },
    border: {
      border: "3px solid #f97316",
      borderRadius: 8,
      padding: 40,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      color: "#f97316",
      marginBottom: 8,
      textAlign: "center",
      fontFamily: "Helvetica-Bold",
    },
    subtitle: {
      fontSize: 12,
      color: "#6b6560",
      marginBottom: 40,
      textAlign: "center",
      letterSpacing: 4,
      textTransform: "uppercase",
    },
    certText: {
      fontSize: 14,
      color: "#4a4540",
      marginBottom: 8,
      textAlign: "center",
    },
    userName: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#0d0d0d",
      marginBottom: 20,
      textAlign: "center",
      fontFamily: "Helvetica-Bold",
    },
    bookTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#f97316",
      marginBottom: 30,
      textAlign: "center",
      fontFamily: "Helvetica-Bold",
    },
    completionText: {
      fontSize: 11,
      color: "#6b6560",
      marginBottom: 40,
      textAlign: "center",
    },
    qrContainer: {
      alignItems: "center",
      marginTop: 20,
    },
    qrLabel: {
      fontSize: 8,
      color: "#9a9590",
      marginTop: 6,
      textAlign: "center",
    },
    footer: {
      marginTop: "auto",
      fontSize: 9,
      color: "#9a9590",
      textAlign: "center",
    },
    certId: {
      fontSize: 8,
      color: "#d4cec6",
      marginTop: 4,
      textAlign: "center",
    },
  });

  const CertDoc = () => (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.border}>
          <Text style={styles.title}>DiptenZirveye</Text>
          <Text style={styles.subtitle}>Tamamlama Sertifikası</Text>
          <Text style={styles.certText}>Bu sertifika</Text>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.certText}>
            adlı katılımcının aşağıdaki kitabı başarıyla tamamladığını
            belgelemektedir:
          </Text>
          <Text style={styles.bookTitle}>{bookTitle}</Text>
          <Text style={styles.completionText}>
            Tamamlanma Tarihi:{" "}
            {new Date(completedAt).toLocaleDateString("tr-TR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
          <View style={styles.qrContainer}>
            <Image src={qrDataUrl} style={{ width: 80, height: 80 }} />
            <Text style={styles.qrLabel}>QR kod ile doğrulayın</Text>
          </View>
          <Text style={styles.footer}>diptenzirveye.com</Text>
          <Text style={styles.certId}>Sertifika No: {certId}</Text>
        </View>
      </Page>
    </Document>
  );

  const blob = await pdf(<CertDoc />).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `DiptenZirveye-Sertifika-${bookTitle.replace(/\s+/g, "-")}.pdf`;
  link.click();
  URL.revokeObjectURL(url);
}

export default function CertificateClient({
  userName,
  userId,
  completedBooks,
  totalXp,
  level,
}: CertificateClientProps) {
  const [generatingId, setGeneratingId] = useState<string | null>(null);

  async function handleShare(book: CompletedBook) {
    const certId = `DZ-${userId.slice(0, 8).toUpperCase()}-${book.id.slice(0, 8).toUpperCase()}`;
    const shareUrl = `${typeof window !== "undefined" ? window.location.origin : "https://diptenzirveye.com"}/sertifika/dogrula/${certId}`;
    const shareTitle = `DiptenZirveye Sertifika - ${book.title}`;
    const shareText = `${userName}, "${book.title}" kitabını başarıyla tamamladı!`;

    try {
      if (isNative) {
        await shareContent(shareTitle, shareText, shareUrl);
        return;
      }

      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title: shareTitle, text: shareText, url: shareUrl });
        return;
      }

      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
      }
    } catch {
      // User cancelled or share not supported
    }
  }

  async function handleDownload(book: CompletedBook) {
    setGeneratingId(book.id);
    try {
      const certId = `DZ-${userId.slice(0, 8).toUpperCase()}-${book.id.slice(0, 8).toUpperCase()}`;
      await generateCertificatePDF(
        userName,
        book.title,
        book.completed_at,
        certId
      );
    } finally {
      setGeneratingId(null);
    }
  }

  if (completedBooks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 bg-dz-white dark:bg-dz-grey-900 p-12 text-center"
      >
        <BookOpen className="w-16 h-16 mx-auto text-dz-grey-300 dark:text-dz-grey-600 mb-4" />
        <h3 className="font-display text-xl font-bold text-dz-black dark:text-dz-white mb-2">
          Henüz Sertifikan Yok
        </h3>
        <p className="text-sm text-dz-grey-500 max-w-sm mx-auto">
          Kitapları tamamladıkça sertifikaların burada görünecek. Kütüphaneden
          bir kitap seçerek başla!
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-dz-orange-500/30 bg-gradient-to-r from-dz-orange-500/5 via-dz-amber-500/5 to-dz-orange-500/5 p-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-dz-orange-500 to-dz-amber-500 flex items-center justify-center text-white shrink-0">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-dz-black dark:text-dz-white">
              {completedBooks.length} Sertifika Kazanıldı
            </h2>
            <p className="text-sm text-dz-grey-500">
              Seviye {level} · {totalXp} XP
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2">
        {completedBooks.map((book, idx) => {
          const certId = `DZ-${userId.slice(0, 8).toUpperCase()}-${book.id.slice(0, 8).toUpperCase()}`;
          const isGenerating = generatingId === book.id;
          return (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 bg-dz-white dark:bg-dz-grey-900 p-6 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-dz-orange-500/5 blur-[50px] rounded-full pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-dz-orange-500/10 flex items-center justify-center text-dz-orange-500">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-green-500 uppercase tracking-wider bg-green-500/10 px-2 py-0.5 rounded-full">
                    ✓ Tamamlandı
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-dz-black dark:text-dz-white mb-1">
                  {book.title}
                </h3>
                <p className="text-xs text-dz-grey-400 mb-1">
                  {new Date(book.completed_at).toLocaleDateString("tr-TR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-[10px] text-dz-grey-300 dark:text-dz-grey-600 font-mono mb-4">
                  {certId}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDownload(book)}
                    disabled={isGenerating}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-dz-orange-500 to-dz-amber-500 text-white font-bold py-2.5 px-4 rounded-xl shadow-lg shadow-dz-orange-500/20 hover:shadow-xl hover:shadow-dz-orange-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        PDF Hazırlanıyor...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        Sertifika İndir
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleShare(book)}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-dz-grey-200 dark:border-dz-grey-700 text-dz-grey-700 dark:text-dz-grey-300 font-bold text-sm hover:bg-dz-grey-50 dark:hover:bg-dz-grey-800 transition-colors"
                    aria-label="Sertifika paylaş"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
