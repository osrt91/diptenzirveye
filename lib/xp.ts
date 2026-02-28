/** XP → Level: her level için gerekli kümülatif XP (basit formül) */
const XP_PER_LEVEL = 100;

export function xpToLevel(totalXp: number): number {
  if (totalXp <= 0) return 1;
  return Math.floor(totalXp / XP_PER_LEVEL) + 1;
}

export function xpForNextLevel(totalXp: number): number {
  const currentLevel = xpToLevel(totalXp);
  return currentLevel * XP_PER_LEVEL - totalXp;
}

export function xpProgressInLevel(totalXp: number): number {
  const currentLevel = xpToLevel(totalXp);
  const xpAtLevelStart = (currentLevel - 1) * XP_PER_LEVEL;
  const xpInCurrentLevel = totalXp - xpAtLevelStart;
  return Math.min(1, xpInCurrentLevel / XP_PER_LEVEL);
}
