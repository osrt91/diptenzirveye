"use client";

/**
 * Gamification ses efektleri yöneticisi.
 * Kullanıcı ayarından ses açılıp kapatılabilir.
 */

type SoundType = "xp" | "badge" | "levelUp" | "streakFire" | "complete" | "click";

const FREQUENCIES: Record<SoundType, { notes: number[]; duration: number; type: OscillatorType; volume: number }> = {
    xp: { notes: [523.25, 659.25, 783.99], duration: 0.12, type: "sine", volume: 0.25 },
    badge: { notes: [523.25, 659.25, 783.99, 1046.5, 1318.5], duration: 0.15, type: "triangle", volume: 0.3 },
    levelUp: { notes: [261.63, 329.63, 392.0, 523.25, 659.25, 783.99, 1046.5], duration: 0.18, type: "square", volume: 0.2 },
    streakFire: { notes: [440, 554.37, 659.25], duration: 0.1, type: "sawtooth", volume: 0.15 },
    complete: { notes: [523.25, 659.25, 783.99, 1046.5], duration: 0.15, type: "sine", volume: 0.3 },
    click: { notes: [800], duration: 0.03, type: "sine", volume: 0.1 },
};

let _soundEnabled = true;

export function setSoundEnabled(enabled: boolean) {
    _soundEnabled = enabled;
    if (typeof window !== "undefined") {
        localStorage.setItem("dz-sound-enabled", enabled ? "1" : "0");
    }
}

export function getSoundEnabled(): boolean {
    if (typeof window !== "undefined") {
        const stored = localStorage.getItem("dz-sound-enabled");
        if (stored !== null) {
            _soundEnabled = stored === "1";
        }
    }
    return _soundEnabled;
}

export function playSound(type: SoundType) {
    if (!_soundEnabled) return;
    try {
        const config = FREQUENCIES[type];
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = config.type;
        gain.gain.setValueAtTime(config.volume, ctx.currentTime);

        const now = ctx.currentTime;
        config.notes.forEach((freq, i) => {
            osc.frequency.setValueAtTime(freq, now + i * config.duration);
        });

        const totalDuration = config.notes.length * config.duration;
        gain.gain.exponentialRampToValueAtTime(0.001, now + totalDuration + 0.3);

        osc.start(now);
        osc.stop(now + totalDuration + 0.4);
    } catch {
        // AudioContext not available
    }
}
