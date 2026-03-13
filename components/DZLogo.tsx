"use client";

import { motion } from "framer-motion";

type DZLogoProps = {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

const sizeMap = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-3xl",
  xl: "text-5xl",
};

export default function DZLogo({ size = "md", className = "" }: DZLogoProps) {
  return (
    <motion.span
      className={`font-display inline-block tracking-tight ${sizeMap[size]} ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <span className="font-black">Dipten</span>
      <span className="font-normal text-dz-orange-500">Zirveye</span>
    </motion.span>
  );
}
