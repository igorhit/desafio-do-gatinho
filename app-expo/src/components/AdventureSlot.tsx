import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Adventure } from '../hooks/useRandomizer';
import ItemCard from './ItemCard';
import SectionRow from './SectionRow';

const DIFFICULTY_RARITY: Record<string, 'comum' | 'rara' | 'epica'> = {
  facil: 'comum',
  medio: 'rara',
  dificil: 'epica',
};

interface AdventureSlotProps {
  adventure: Adventure | null;
  enabled: boolean;
  onToggle: () => void;
}

export default function AdventureSlot({ adventure, enabled, onToggle }: AdventureSlotProps) {
  const rarity = adventure ? DIFFICULTY_RARITY[adventure.dificuldade] ?? 'comum' : 'comum';
  const diffLabel =
    adventure?.dificuldade === 'facil'
      ? 'Fácil'
      : adventure?.dificuldade === 'medio'
      ? 'Médio'
      : adventure?.dificuldade === 'dificil'
      ? 'Difícil'
      : '';

  return (
    <SectionRow label="Aventura" icon="🗺️" enabled={enabled} onToggle={onToggle}>
      {adventure ? (
        <ItemCard
          title={adventure.nome}
          subtitle={diffLabel}
          rarity={rarity}
          imagePath={adventure.imagePath}
          revealIndex={4}
          size="lg"
        />
      ) : (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Aperte "Gatinho!" para sortear</Text>
        </View>
      )}
    </SectionRow>
  );
}

const styles = StyleSheet.create({
  empty: {
    height: 80,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#6b7280',
    fontSize: 13,
  },
});
