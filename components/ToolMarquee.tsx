"use client";

import { topTierTools } from "./panel/chat/unified-tool-data";

const ToolItem = ({ tool }: { tool: (typeof topTierTools)[number] }) => (
    <div className="flex items-center gap-3 px-8 mx-4 group shrink-0">
        <tool.Icon className="w-8 h-8 opacity-75 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" />
        <span className="font-display font-medium text-dz-grey-600 dark:text-dz-grey-400 group-hover:text-dz-black dark:group-hover:text-dz-white transition-colors whitespace-nowrap">
            {tool.name}
        </span>
    </div>
);

export default function ToolMarquee() {
    const items = [...topTierTools, ...topTierTools];

    return (
        <section className="bg-dz-white dark:bg-background py-10 border-y border-dz-grey-100 dark:border-dz-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 mb-6">
                <p className="text-center text-xs font-bold tracking-widest text-dz-grey-400 dark:text-dz-grey-500 uppercase">
                    Öğreneceğin Platform ve Araçlar
                </p>
            </div>
            <div className="relative w-full overflow-hidden">
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-dz-white dark:from-background z-10" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-dz-white dark:from-background z-10" />

                <div className="animate-marquee flex items-center w-max">
                    {items.map((tool, i) => (
                        <ToolItem key={`a-${i}`} tool={tool} />
                    ))}
                    {items.map((tool, i) => (
                        <ToolItem key={`b-${i}`} tool={tool} />
                    ))}
                </div>
            </div>
        </section>
    );
}
