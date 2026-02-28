"use client";

import { motion } from "framer-motion";

type DZLogoProps = {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

const sizeMap = {
  sm: { width: 32, height: 14 },
  md: { width: 48, height: 20 },
  lg: { width: 72, height: 30 },
  xl: { width: 120, height: 50 },
};

export default function DZLogo({ size = "md", className = "" }: DZLogoProps) {
  const { width, height } = sizeMap[size];

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 160"
      width={width}
      height={height}
      className={`inline-block shrink-0 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <defs>
        <linearGradient id="dz-mgrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F5C842" stopOpacity={0.9} />
          <stop offset="60%" stopColor="#D4A03C" stopOpacity={0.6} />
          <stop offset="100%" stopColor="#2A3562" stopOpacity={0.3} />
        </linearGradient>
        <linearGradient id="dz-mgrad2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8892B0" stopOpacity={0.4} />
          <stop offset="100%" stopColor="#2A3562" stopOpacity={0.15} />
        </linearGradient>
      </defs>

      <polygon points="80,160 170,55 260,160" fill="url(#dz-mgrad2)" />
      <polygon points="340,160 440,50 540,160" fill="url(#dz-mgrad2)" />
      <polygon points="180,160 300,20 420,160" fill="url(#dz-mgrad)" />
      <polygon points="280,25 300,20 320,25 310,22 290,22" fill="#FFF8E8" opacity={0.9} />

      <motion.circle
        cx={300}
        cy={12}
        r={4}
        fill="#F5C842"
        animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.4, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "300px 12px" }}
      />
    </motion.svg>
  );
}
