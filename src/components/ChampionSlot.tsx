import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Champion } from '../hooks/useRandomizer';
import ItemCard from './ItemCard';
import SectionRow from './SectionRow';

interface ChampionSlotProps {
  champion: Champion | null;
  enabled: boolean;
  onToggle: () => void;
}

export default function ChampionSlot({ champion, enabled, onToggle }: ChampionSlotProps) {
  const stars = champion ? (champion.estrelas === 6 ? '★★★★★★' : '★★★') : null;
  const badge = champion?.estrelas === 6 ? '6★' : champion ? '3★' : undefined;

  return (
    <SectionRow label="Campeão / Deck" icon="⚔️" enabled={enabled} onToggle={onToggle}>
      {champion ? (
        <ItemCard
          title={champion.nome}
          subtitle={stars ?? undefined}
          rarity={champion.estrelas === 6 ? 'assinatura' : 'rara'}
          imagePath={champion.imagePath}
          revealIndex={0}
          size="lg"
          badge={badge}
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
