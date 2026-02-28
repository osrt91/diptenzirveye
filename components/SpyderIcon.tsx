"use client";

export function SpyderIcon({ className = "w-8 h-8" }: { className?: string }) {
    return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Spyder web representation */}
            <circle cx="32" cy="32" r="30" fill="#FF0000" />

            {/* Inner spider body / lines */}
            <path
                d="M32 12V52M12 32H52"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.5"
            />
            {/* Web circles */}
            <circle cx="32" cy="32" r="12" stroke="white" strokeWidth="1.5" opacity="0.6" fill="none" />
            <circle cx="32" cy="32" r="22" stroke="white" strokeWidth="1.5" opacity="0.4" fill="none" />

            <circle cx="32" cy="32" r="4" fill="white" />
            <path
                d="M20 20L44 44M20 44L44 20"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}
