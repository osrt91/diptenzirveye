/**
 * Inline SVG book cover component — zero external images, infinitely scalable.
 * Each book gets a unique color palette; the cover renders title + number + branding.
 */

const PALETTES: Record<string, { bg: string; accent: string; text: string; sub: string }> = {
  "01": { bg: "#1a1a2e", accent: "#f97316", text: "#ffffff", sub: "#f9731680" },
  "02": { bg: "#0f0f23", accent: "#a855f7", text: "#ffffff", sub: "#a855f780" },
  "03": { bg: "#1e293b", accent: "#3b82f6", text: "#ffffff", sub: "#3b82f680" },
  "04": { bg: "#18181b", accent: "#ef4444", text: "#ffffff", sub: "#ef444480" },
  "05": { bg: "#14532d", accent: "#22c55e", text: "#ffffff", sub: "#22c55e80" },
  "06": { bg: "#1c1917", accent: "#f59e0b", text: "#ffffff", sub: "#f59e0b80" },
  "07": { bg: "#0c4a6e", accent: "#06b6d4", text: "#ffffff", sub: "#06b6d480" },
  "08": { bg: "#1e1b4b", accent: "#818cf8", text: "#ffffff", sub: "#818cf880" },
  "09": { bg: "#431407", accent: "#fb923c", text: "#ffffff", sub: "#fb923c80" },
  "10": { bg: "#0a0a0a", accent: "#f97316", text: "#ffffff", sub: "#fbbf2480" },
};

type BookCoverProps = {
  number: string;
  title: string;
  className?: string;
};

export default function BookCover({ number, title, className = "" }: BookCoverProps) {
  const p = PALETTES[number] ?? PALETTES["01"];

  // Split title into max 2 lines of ~18 chars
  const words = title.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const w of words) {
    if (current && (current + " " + w).length > 18) {
      lines.push(current);
      current = w;
    } else {
      current = current ? current + " " + w : w;
    }
  }
  if (current) lines.push(current);
  const titleLines = lines.slice(0, 3);

  return (
    <svg
      viewBox="0 0 280 400"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={`${title} kitap kapağı`}
    >
      <defs>
        <linearGradient id={`bg-${number}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={p.bg} />
          <stop offset="100%" stopColor={p.accent} stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id={`accent-${number}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.accent} />
          <stop offset="100%" stopColor={p.accent} stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="280" height="400" rx="12" fill={`url(#bg-${number})`} />

      {/* Spine shadow */}
      <rect x="0" y="0" width="8" height="400" rx="12" fill={p.accent} opacity="0.4" />

      {/* Top accent line */}
      <rect x="30" y="30" width="60" height="3" rx="1.5" fill={p.accent} />

      {/* Book number */}
      <text
        x="250"
        y="70"
        textAnchor="end"
        fontFamily="system-ui, sans-serif"
        fontWeight="900"
        fontSize="64"
        fill={p.sub}
      >
        {number}
      </text>

      {/* Decorative circle */}
      <circle cx="140" cy="180" r="50" fill="none" stroke={p.accent} strokeWidth="1" opacity="0.2" />
      <circle cx="140" cy="180" r="30" fill={p.accent} opacity="0.1" />

      {/* Icon placeholder — abstract geometric */}
      <rect x="120" y="160" width="40" height="40" rx="8" fill={p.accent} opacity="0.25" />
      <rect x="126" y="166" width="28" height="28" rx="4" fill="none" stroke={p.accent} strokeWidth="2" opacity="0.6" />

      {/* Title */}
      {titleLines.map((line, i) => (
        <text
          key={i}
          x="30"
          y={260 + i * 30}
          fontFamily="system-ui, sans-serif"
          fontWeight="800"
          fontSize="22"
          fill={p.text}
          letterSpacing="-0.02em"
        >
          {line}
        </text>
      ))}

      {/* Bottom divider */}
      <rect x="30" y="345" width="220" height="1" fill={p.accent} opacity="0.3" />

      {/* Branding */}
      <text
        x="30"
        y="375"
        fontFamily="system-ui, sans-serif"
        fontWeight="900"
        fontSize="12"
        fill={p.text}
        opacity="0.6"
      >
        Dipten
      </text>
      <text
        x="74"
        y="375"
        fontFamily="system-ui, sans-serif"
        fontWeight="400"
        fontSize="12"
        fill={p.accent}
        opacity="0.8"
      >
        Zirveye
      </text>

      {/* Volume label */}
      <text
        x="250"
        y="375"
        textAnchor="end"
        fontFamily="system-ui, sans-serif"
        fontWeight="700"
        fontSize="10"
        fill={p.text}
        opacity="0.4"
        letterSpacing="0.1em"
      >
        CİLT {number}
      </text>
    </svg>
  );
}
