export type DifficultyLevel = 'facil' | 'normal' | 'dificil';

export interface TagWeight {
  tag: string;
  weight: number;
}

export interface DifficultyConfig {
  label: string;
  tagWeights: TagWeight[];
  sixStarChance: number;
  surpriseChance: number;
}

const difficultyConfig: Record<DifficultyLevel, DifficultyConfig> = {
  facil: {
    label: 'Fácil',
    surpriseChance: 0.2,
    sixStarChance: 0.5,
    tagWeights: [
      { tag: 'forte', weight: 2.0 },
      { tag: 'raro', weight: 2.0 },
      { tag: 'comum', weight: 1.5 },
      { tag: 'iniciante', weight: 2.0 },
      { tag: 'tanque', weight: 1.0 },
      { tag: 'suporte', weight: 1.0 },
      { tag: 'agressivo', weight: 1.0 },
      { tag: 'assassino', weight: 0.8 },
      { tag: 'mago', weight: 1.0 },
      { tag: 'atirador', weight: 1.0 },
      { tag: 'magico', weight: 1.0 },
      { tag: 'guerra', weight: 1.0 },
    ],
  },
  normal: {
    label: 'Normal',
    surpriseChance: 0.35,
    sixStarChance: 0.3,
    tagWeights: [
      { tag: 'forte', weight: 1.0 },
      { tag: 'raro', weight: 1.0 },
      { tag: 'comum', weight: 1.0 },
      { tag: 'iniciante', weight: 1.0 },
      { tag: 'tanque', weight: 1.0 },
      { tag: 'suporte', weight: 1.0 },
      { tag: 'agressivo', weight: 1.0 },
      { tag: 'assassino', weight: 1.0 },
      { tag: 'mago', weight: 1.0 },
      { tag: 'atirador', weight: 1.0 },
      { tag: 'magico', weight: 1.0 },
      { tag: 'guerra', weight: 1.0 },
    ],
  },
  dificil: {
    label: 'Difícil',
    surpriseChance: 0.5,
    sixStarChance: 0.1,
    tagWeights: [
      { tag: 'forte', weight: 0.0 },
      { tag: 'raro', weight: 0.3 },
      { tag: 'comum', weight: 1.5 },
      { tag: 'iniciante', weight: 0.5 },
      { tag: 'tanque', weight: 0.8 },
      { tag: 'suporte', weight: 0.8 },
      { tag: 'agressivo', weight: 1.2 },
      { tag: 'assassino', weight: 1.5 },
      { tag: 'mago', weight: 1.0 },
      { tag: 'atirador', weight: 1.0 },
      { tag: 'magico', weight: 1.0 },
      { tag: 'guerra', weight: 1.0 },
    ],
  },
};

export default difficultyConfig;
