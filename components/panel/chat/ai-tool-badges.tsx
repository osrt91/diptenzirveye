"use client";

/**
 * AI Araç Badge İkonları — Basitleştirilmiş geometrik SVG bileşenleri
 * Trademark kullanmadan tanınabilir formlar.
 */

export function ChatGPTIcon({ className = "w-8 h-8" }: { className?: string }) {
    return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="30" fill="#10A37F" />
            <path
                d="M32 16C24 16 18 22 18 28c0 3 1.5 5.5 4 7.5v8.5l5-3c1.5.5 3.2.7 5 .7 8 0 14-6 14-12.5S40 16 32 16z"
                fill="white"
                opacity="0.9"
            />
            <circle cx="26" cy="28" r="2" fill="#10A37F" />
            <circle cx="32" cy="28" r="2" fill="#10A37F" />
            <circle cx="38" cy="28" r="2" fill="#10A37F" />
        </svg>
    );
}

export function ClaudeIcon({ className = "w-8 h-8" }: { className?: string }) {
    return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="64" height="64" rx="16" fill="#D97757" />
            <path
                d="M48 24C48 24 43 28 32 28C21 28 16 24 16 24C16 38 24 44 32 44C40 44 48 38 48 24Z"
                fill="#FFF1EB"
            />
            <circle cx="26" cy="24" r="3" fill="#D97757" />
            <circle cx="38" cy="24" r="3" fill="#D97757" />
        </svg>
    );
}

export function GeminiIcon({ className = "w-8 h-8" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.993 0.5c-0.2 0-0.4 0.1-0.5 0.3l-2.8 4c-1.3 1.8-2.8 3.3-4.6 4.6-0.2 0.2-0.6 0.4-0.6 0.6s0.3 0.4 0.6 0.6c1.8 1.3 3.3 2.8 4.6 4.6l2.8 4c0.1 0.2 0.3 0.3 0.5 0.3s0.4-0.1 0.5-0.3l2.8-4c1.3-1.8 2.8-3.3 4.6-4.6 0.2-0.2 0.6-0.4 0.6-0.6s-0.3-0.4-0.6-0.6c-1.8-1.3-3.3-2.8-4.6-4.6l-2.8-4c-0.1-0.2-0.3-0.3-0.5-0.3z" fill="url(#geminiGradient)" />
            <circle cx="18.5" cy="5.5" r="1.5" fill="url(#geminiGradient)" />
            <circle cx="5.5" cy="18.5" r="1.5" fill="url(#geminiGradient)" />
            <defs>
                <linearGradient id="geminiGradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#1B6DFB" />
                    <stop offset="50%" stopColor="#A43BBA" />
                    <stop offset="100%" stopColor="#D2248A" />
                </linearGradient>
            </defs>
        </svg>
    );
}

export function MidjourneyIcon({ className = "w-8 h-8" }: { className?: string }) {
    return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="30" fill="#1A1A2E" />
            <path
                d="M18 40L26 20h4l-6 16h8l-6 16h-4l6-16h-8l6-16"
                fill="white"
                opacity="0.9"
            />
            <circle cx="42" cy="24" r="5" fill="#E94560" opacity="0.8" />
            <circle cx="44" cy="36" r="3" fill="#0F3460" opacity="0.6" />
        </svg>
    );
}

export function CursorIcon({ className = "w-8 h-8" }: { className?: string }) {
    return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="30" fill="#1E1E2E" />
            <path
                d="M24 18l18 14-8 2-4 8-6-24z"
                fill="url(#cursorGrad)"
                stroke="white"
                strokeWidth="1.5"
            />
            <defs>
                <linearGradient id="cursorGrad" x1="24" y1="18" x2="42" y2="42">
                    <stop stopColor="#A78BFA" />
                    <stop offset="1" stopColor="#7C3AED" />
                </linearGradient>
            </defs>
        </svg>
    );
}

export function ZapierIcon({ className = "w-8 h-8" }: { className?: string }) {
    return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="30" fill="#FF4A00" />
            <path
                d="M32 16v13.5M32 34.5V48M16 32h13.5M34.5 32H48M20.5 20.5l9.5 9.5M34 34l9.5 9.5M43.5 20.5L34 30M30 34l-9.5 9.5"
                stroke="white"
                strokeWidth="3.5"
                strokeLinecap="round"
            />
            <circle cx="32" cy="32" r="5" fill="white" />
        </svg>
    );
}

export function V0Icon({ className = "w-8 h-8" }: { className?: string }) {
    return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="30" fill="#000000" />
            <path d="M22 22l10 20 10-20" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export function PerplexityIcon({ className = "w-8 h-8" }: { className?: string }) {
    return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="30" fill="#20B2AA" />
            <path d="M24 24h16v16h-16zM32 16v8M32 40v8M16 32h8M40 32h8" stroke="white" strokeWidth="3" strokeLinecap="round" />
            <circle cx="32" cy="32" r="3" fill="white" />
        </svg>
    );
}

export function NotionIcon({ className = "w-8 h-8" }: { className?: string }) {
    return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="30" fill="#FFFFFF" stroke="#E5E5E5" strokeWidth="2" />
            <path d="M24 20v24L40 20v24" stroke="#000000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export function DeepSeekIcon({ className = "w-8 h-8" }: { className?: string }) {
    return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="30" fill="#4B8BF5" />
            <path d="M16 40C16 40 24 30 32 30C40 30 48 40 48 40" stroke="white" strokeWidth="4" strokeLinecap="round" />
            <path d="M26 24H38" stroke="white" strokeWidth="4" strokeLinecap="round" />
            <circle cx="24" cy="20" r="3" fill="white" />
            <circle cx="40" cy="20" r="3" fill="white" />
        </svg>
    );
}

export function KimiIcon({ className = "w-8 h-8" }: { className?: string }) {
    return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="30" fill="#1A1A24" />
            <path d="M42 20C42 20 34 28 34 38C34 48 42 52 42 52C28 52 18 42 18 28C18 14 28 8 28 8C26 12 42 20 42 20Z" fill="#FAD02C" />
        </svg>
    );
}

export function WindsurfIcon({ className = "w-8 h-8" }: { className?: string }) {
    return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="30" fill="#00E5FF" />
            <path d="M16 38L32 16L48 38H16Z" fill="white" opacity="0.9" />
            <path d="M12 44C18 40 22 48 32 44C42 40 46 48 52 44" stroke="white" strokeWidth="4" strokeLinecap="round" fill="none" />
        </svg>
    );
}

export function AntigravityIcon({ className = "w-8 h-8" }: { className?: string }) {
    return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="30" fill="#7C3BED" />
            <path d="M32 12L16 48L32 40L48 48L32 12Z" fill="white" />
            <circle cx="32" cy="32" r="6" fill="#7C3BED" />
        </svg>
    );
}

export function BananaIcon({ className = "w-8 h-8" }: { className?: string }) {
    return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="30" fill="#FFE135" />
            <path d="M20 20C20 30 30 44 48 40C38 48 20 44 14 30C16 26 20 20 20 20Z" fill="#8B4513" opacity="0.8" />
            <path d="M44 20C34 24 28 34 26 48C36 44 44 34 48 20Z" fill="#FFFFFF" opacity="0.4" />
        </svg>
    );
}

export function YandexIcon({ className = "w-8 h-8" }: { className?: string }) {
    return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="30" fill="#FC3F1D" />
            <path d="M38 16H34C26 16 22 20 22 28C22 36 26 40 34 40H38V16Z" fill="#FFFFFF" />
            <path d="M38 48H30L22 36" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export function GrokIcon({ className = "w-8 h-8" }: { className?: string }) {
    return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="30" fill="#000000" stroke="#333333" strokeWidth="2" />
            <path d="M20 44L44 20M20 20L44 44" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
            <circle cx="32" cy="32" r="4" fill="#000000" />
        </svg>
    );
}

export function KaggleIcon({ className = "w-8 h-8" }: { className?: string }) {
    return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="30" fill="#20BEFF" />
            <path d="M22 16V48" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
            <path d="M42 16L24 32L42 48" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
    );
}

export function HuggingFaceIcon({ className = "w-8 h-8" }: { className?: string }) {
    return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="30" fill="#FFD21E" />
            {/* Eyes */}
            <circle cx="22" cy="26" r="4" fill="#000000" />
            <circle cx="42" cy="26" r="4" fill="#000000" />
            {/* Smile */}
            <path d="M24 38C24 38 28 44 32 44C36 44 40 38 40 38" stroke="#000000" strokeWidth="4" strokeLinecap="round" fill="none" />
            {/* Hugging hands */}
            <path d="M12 30C16 34 20 50 32 50C44 50 48 34 52 30" stroke="#000000" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.4" />
        </svg>
    );
}

export function FigmaIcon({ className = "w-8 h-8" }: { className?: string }) {
    return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="30" fill="#1E1E1E" />
            <circle cx="24" cy="20" r="6" fill="#F24E1E" />
            <path d="M24 14H32C35.3137 14 38 16.6863 38 20C38 23.3137 35.3137 26 32 26H24V14Z" fill="#FF7262" />
            <circle cx="24" cy="32" r="6" fill="#A259FF" />
            <path d="M24 26H32C35.3137 26 38 28.6863 38 32C38 35.3137 35.3137 38 32 38H24V26Z" fill="#1ABCFE" />
            <path d="M24 38C20.6863 38 18 40.6863 18 44C18 47.3137 20.6863 50 24 50C27.3137 50 30 47.3137 30 44V38H24Z" fill="#0ACF83" />
        </svg>
    );
}

export function CopilotIcon({ className = "w-8 h-8" }: { className?: string }) {
    return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="30" fill="#24292E" />
            <path d="M24 36c0 4 4 8 8 8s8-4 8-8v-8c0-4-4-8-8-8s-8 4-8 8v8z" stroke="white" strokeWidth="3" fill="none" />
            <circle cx="28" cy="32" r="2" fill="white" />
            <circle cx="36" cy="32" r="2" fill="white" />
        </svg>
    );
}

export function TrelloIcon({ className = "w-8 h-8" }: { className?: string }) {
    return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="64" height="64" rx="16" fill="#0079BF" />
            <rect x="14" y="14" width="14" height="36" rx="3" fill="#FFFFFF" opacity="0.9" />
            <rect x="36" y="14" width="14" height="24" rx="3" fill="#FFFFFF" opacity="0.9" />
        </svg>
    );
}

// Araç adına göre ikon döndüren helper
export function CanvaIcon({ className = "w-8 h-8" }: { className?: string }) {
    return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="30" fill="#00C4CC" />
            <path d="M32 16C23.1634 16 16 23.1634 16 32C16 40.8366 23.1634 48 32 48C40.8366 48 48 40.8366 48 32C48 23.1634 40.8366 16 32 16ZM32 42C26.4772 42 22 37.5228 22 32C22 26.4772 26.4772 22 32 22C37.5228 22 42 26.4772 42 32C42 37.5228 37.5228 42 32 42Z" fill="white" />
            <circle cx="32" cy="32" r="6" fill="white" />
        </svg>
    );
}

export const AI_TOOL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
    chatgpt: ChatGPTIcon,
    claude: ClaudeIcon,
    gemini: GeminiIcon,
    midjourney: MidjourneyIcon,
    cursor: CursorIcon,
    zapier: ZapierIcon,
    v0: V0Icon,
    perplexity: PerplexityIcon,
    notion: NotionIcon,
    copilot: CopilotIcon,
    deepseek: DeepSeekIcon,
    kimi: KimiIcon,
    windsurf: WindsurfIcon,
    antigravity: AntigravityIcon,
    banana: BananaIcon,
    yandex: YandexIcon,
    grok: GrokIcon,
    kaggle: KaggleIcon,
    huggingface: HuggingFaceIcon,
    figma: FigmaIcon,
    trello: TrelloIcon,
    canva: CanvaIcon,
};

export function getAIToolIcon(slug: string) {
    // slug: "chatgpt-kullanici" → "chatgpt"
    const key = slug.replace(/-kullanici$/, "");
    return AI_TOOL_ICONS[key] || null;
}
