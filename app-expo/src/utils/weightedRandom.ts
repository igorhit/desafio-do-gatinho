import { DifficultyConfig } from '../config/difficulty';

export interface Weighted {
  id: string;
  tags: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

function computeItemWeight(item: Weighted, config: DifficultyConfig): number {
  if (item.tags.length === 0) return 1;

  const tagWeightMap = new Map(config.tagWeights.map((tw) => [tw.tag, tw.weight]));

  let totalWeight = 0;
  for (const tag of item.tags) {
    const w = tagWeightMap.get(tag);
    if (w !== undefined) {
      totalWeight += w;
    } else {
      totalWeight += 1;
    }
  }
  const avgWeight = totalWeight / item.tags.length;

  // If any tag has weight 0, exclude item entirely
  for (const tag of item.tags) {
    const w = tagWeightMap.get(tag);
    if (w !== undefined && w === 0) return 0;
  }

  return avgWeight;
}

export function weightedRandom<T extends Weighted>(
  pool: T[],
  config: DifficultyConfig
): T | null {
  const weights = pool.map((item) => computeItemWeight(item, config));
  const totalWeight = weights.reduce((sum, w) => sum + w, 0);

  if (totalWeight === 0) {
    // Fallback: uniform random if all weights are 0
    return pool.length > 0 ? pool[Math.floor(Math.random() * pool.length)] : null;
  }

  let rand = Math.random() * totalWeight;
  for (let i = 0; i < pool.length; i++) {
    rand -= weights[i];
    if (rand <= 0) return pool[i];
  }

  return pool[pool.length - 1];
}

export function weightedRandomMany<T extends Weighted>(
  pool: T[],
  count: number,
  config: DifficultyConfig,
  allowDuplicates = false
): T[] {
  const results: T[] = [];
  let remaining = [...pool];

  for (let i = 0; i < count; i++) {
    if (remaining.length === 0) break;
    const picked = weightedRandom(remaining, config);
    if (!picked) break;
    results.push(picked);
    if (!allowDuplicates) {
      remaining = remaining.filter((item) => item.id !== picked.id);
    }
  }

  return results;
}
