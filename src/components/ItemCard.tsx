import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  withSequence,
  runOnJS,
} from 'react-native-reanimated';
import { useEffect } from 'react';

type Rarity = 'comum' | 'rara' | 'epica' | 'assinatura' | 'default';

interface RarityStyle {
  border: string;
  glow: string;
  gradientColors: [string, string, ...string[]];
  label: string;
}

const RARITY_STYLES: Record<Rarity, RarityStyle> = {
  comum: {
    border: '#6b7280',
    glow: '#6b728040',
    gradientColors: ['#1f2937', '#111827'],
    label: 'Comum',
  },
  rara: {
    border: '#3b82f6',
    glow: '#3b82f660',
    gradientColors: ['#1e3a5f', '#111827'],
    label: 'Rara',
  },
  epica: {
    border: '#8b5cf6',
    glow: '#8b5cf660',
    gradientColors: ['#2d1b69', '#111827'],
    label: 'Épica',
  },
  assinatura: {
    border: '#f59e0b',
    glow: '#f59e0b80',
    gradientColors: ['#3d2200', '#1c1000'],
    label: 'Assinatura',
  },
  default: {
    border: '#374151',
    glow: '#37415140',
    gradientColors: ['#1f2937', '#111827'],
    label: '',
  },
};

interface ItemCardProps {
  title: string;
  subtitle?: string;
  rarity?: Rarity;
  imagePath?: string;
  revealIndex?: number;
  size?: 'sm' | 'md' | 'lg';
  badge?: string;
}

const PLACEHOLDER_COLORS: Record<Rarity, string> = {
  comum: '#4b5563',
  rara: '#2563eb',
  epica: '#7c3aed',
  assinatura: '#d97706',
  default: '#374151',
};

export default function ItemCard({
  title,
  subtitle,
  rarity = 'default',
  imagePath,
  revealIndex = 0,
  size = 'md',
  badge,
}: ItemCardProps) {
  const rs = RARITY_STYLES[rarity];
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.7);
  const rotateY = useSharedValue(90);

  useEffect(() => {
    const delay = revealIndex * 180;
    const timer = setTimeout(() => {
      opacity.value = withTiming(1, { duration: 350 });
      scale.value = withSpring(1, { damping: 14, stiffness: 180 });
      rotateY.value = withSpring(0, { damping: 16, stiffness: 160 });
    }, delay);
    return () => clearTimeout(timer);
  }, [revealIndex]);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { scale: scale.value },
      { perspective: 800 },
      { rotateY: `${rotateY.value}deg` },
    ],
  }));

  const cardSize = size === 'sm' ? styles.cardSm : size === 'lg' ? styles.cardLg : styles.cardMd;
  const imgSize = size === 'sm' ? 48 : size === 'lg' ? 88 : 64;
  const isSignature = rarity === 'assinatura';

  return (
    <Animated.View style={[styles.wrapper, animStyle]}>
      {isSignature && (
        <View style={[styles.signatureGlow, { shadowColor: rs.glow }]} />
      )}
      <LinearGradient
        colors={rs.gradientColors}
        style={[styles.card, cardSize, { borderColor: rs.border, shadowColor: rs.glow }]}
      >
        <View
          style={[
            styles.imageContainer,
            { width: imgSize, height: imgSize, backgroundColor: PLACEHOLDER_COLORS[rarity] },
          ]}
        >
          <Text style={styles.placeholderIcon}>⚔️</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          {subtitle ? (
            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          ) : null}
          {rarity !== 'default' && (
            <View style={[styles.rarityBadge, { borderColor: rs.border }]}>
              <Text style={[styles.rarityLabel, { color: rs.border }]}>{rs.label}</Text>
            </View>
          )}
        </View>
        {badge ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        ) : null}
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  signatureGlow: {
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderRadius: 16,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1.5,
    padding: 10,
    gap: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 6,
  },
  cardSm: { minHeight: 70 },
  cardMd: { minHeight: 88 },
  cardLg: { minHeight: 108 },
  imageContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  placeholderIcon: {
    fontSize: 24,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  title: {
    color: '#f3f4f6',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 20,
  },
  subtitle: {
    color: '#9ca3af',
    fontSize: 12,
  },
  rarityBadge: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 1,
    marginTop: 2,
  },
  rarityLabel: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 8,
    backgroundColor: '#f59e0b',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    color: '#000',
    fontSize: 10,
    fontWeight: '800',
  },
});
