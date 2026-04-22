import { useState, useCallback } from 'react';
import { weightedRandom, weightedRandomMany } from '../utils/weightedRandom';
import difficultyConfig, { DifficultyLevel } from '../config/difficulty';
import championsData from '../data/champions.json';
import relicsData from '../data/relics.json';
import adventuresData from '../data/adventures.json';
import challengesData from '../data/challenges.json';

export interface Champion {
  id: string;
  nome: string;
  estrelas: number;
  tags: string[];
  imagePath: string;
}

export interface Relic {
  id: string;
  nome: string;
  raridade: 'comum' | 'rara' | 'epica' | 'assinatura';
  tags: string[];
  imagePath: string;
}

export interface Adventure {
  id: string;
  nome: string;
  dificuldade: string;
  tags: string[];
  imagePath: string;
}

export interface Challenge {
  id: string;
  descricao: string;
}

export interface RandomizerResult {
  champion: Champion | null;
  relics: Relic[];
  adventure: Adventure | null;
  challenge: Challenge | null;
}

export interface LineToggles {
  champion: boolean;
  relics: boolean;
  adventure: boolean;
}

const champions = championsData as Champion[];
const relics = relicsData as Relic[];
const adventures = adventuresData as Adventure[];
const challenges = challengesData as Challenge[];

export function useRandomizer() {
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('normal');
  const [toggles, setToggles] = useState<LineToggles>({
    champion: true,
    relics: true,
    adventure: true,
  });
  const [result, setResult] = useState<RandomizerResult>({
    champion: null,
    relics: [],
    adventure: null,
    challenge: null,
  });
  const [isRolling, setIsRolling] = useState(false);

  const toggleLine = useCallback((line: keyof LineToggles) => {
    setToggles((prev) => ({ ...prev, [line]: !prev[line] }));
  }, []);

  const roll = useCallback(async () => {
    setIsRolling(true);

    // Simulate brief async for animation trigger
    await new Promise((resolve) => setTimeout(resolve, 50));

    const config = difficultyConfig[difficulty];

    let champion: Champion | null = null;
    if (toggles.champion) {
      // Filter by star count based on difficulty
      const roll6Star = Math.random() < config.sixStarChance;
      const starFilter = roll6Star ? 6 : 3;
      const championPool = champions.filter((c) => c.estrelas === starFilter);
      const fallback = championPool.length > 0 ? championPool : champions;
      champion = weightedRandom(fallback, config);
    }

    let pickedRelics: Relic[] = [];
    if (toggles.relics) {
      pickedRelics = weightedRandomMany(relics, 3, config, false);
    }

    let adventure: Adventure | null = null;
    if (toggles.adventure) {
      adventure = weightedRandom(adventures, config);
    }

    let challenge: Challenge | null = null;
    if (Math.random() < config.surpriseChance) {
      const idx = Math.floor(Math.random() * challenges.length);
      challenge = challenges[idx];
    }

    setResult({
      champion,
      relics: pickedRelics,
      adventure,
      challenge,
    });

    setIsRolling(false);
  }, [difficulty, toggles]);

  return {
    difficulty,
    setDifficulty,
    toggles,
    toggleLine,
    result,
    isRolling,
    roll,
  };
}
