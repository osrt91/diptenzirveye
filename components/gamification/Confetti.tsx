"use client";

import { useCallback, useRef } from "react";

/**
 * Confetti animasyonu — rozet kazanma, kitap tamamlama gibi anlarda kullanılır.
 * Canvas-based, hafif, bağımlılık gerektirmez.
 */
export function useConfetti() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const fire = useCallback(() => {
        // Canvas oluştur
        let canvas = canvasRef.current;
        if (!canvas) {
            canvas = document.createElement("canvas");
            canvas.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99999";
            document.body.appendChild(canvas);
            canvasRef.current = canvas;
        }

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const colors = ["#F97316", "#F59E0B", "#EF4444", "#10B981", "#3B82F6", "#8B5CF6", "#EC4899"];
        const particles: {
            x: number;
            y: number;
            vx: number;
            vy: number;
            w: number;
            h: number;
            color: string;
            rotation: number;
            rotationSpeed: number;
            gravity: number;
            opacity: number;
        }[] = [];

        // 100 parçacık oluştur
        for (let i = 0; i < 100; i++) {
            particles.push({
                x: canvas.width / 2 + (Math.random() - 0.5) * 200,
                y: canvas.height / 2 - 100,
                vx: (Math.random() - 0.5) * 15,
                vy: Math.random() * -15 - 5,
                w: Math.random() * 8 + 4,
                h: Math.random() * 6 + 3,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 10,
                gravity: 0.3 + Math.random() * 0.2,
                opacity: 1,
            });
        }

        let frame = 0;
        const maxFrames = 120;

        function animate() {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                p.x += p.vx;
                p.vy += p.gravity;
                p.y += p.vy;
                p.rotation += p.rotationSpeed;
                p.opacity = Math.max(0, 1 - frame / maxFrames);

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.globalAlpha = p.opacity;
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                ctx.restore();
            });

            frame++;
            if (frame < maxFrames) {
                requestAnimationFrame(animate);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                if (canvas.parentNode) {
                    canvas.parentNode.removeChild(canvas);
                    canvasRef.current = null;
                }
            }
        }

        requestAnimationFrame(animate);
    }, []);

    return fire;
}
