import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Relic } from '../hooks/useRandomizer';
import ItemCard from './ItemCard';
import SectionRow from './SectionRow';

interface RelicSlotProps {
  relics: Relic[];
  enabled: boolean;
  onToggle: () => void;
}

export default function RelicSlot({ relics, enabled, onToggle }: RelicSlotProps) {
  return (
    <SectionRow label="Relíquias" icon="💎" enabled={enabled} onToggle={onToggle}>
      {relics.length > 0 ? (
        relics.map((relic, index) => (
          <ItemCard
            key={relic.id}
            title={relic.nome}
            rarity={relic.raridade}
            imagePath={relic.imagePath}
            revealIndex={index + 1}
            size="md"
          />
        ))
      ) : (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>3 relíquias serão sorteadas</Text>
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
