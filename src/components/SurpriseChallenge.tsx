import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  withRepeat,
} from 'react-native-reanimated';
import { Challenge } from '../hooks/useRandomizer';

interface SurpriseChallengeProps {
  challenge: Challenge | null;
}

export default function SurpriseChallenge({ challenge }: SurpriseChallengeProps) {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const pulseScale = useSharedValue(1);

  useEffect(() => {
    if (challenge) {
      opacity.value = withTiming(1, { duration: 500 });
      scale.value = withSpring(1, { damping: 12, stiffness: 150 });
      pulseScale.value = withSequence(
        withTiming(1.04, { duration: 600 }),
        withRepeat(
          withSequence(
            withTiming(1.02, { duration: 900 }),
            withTiming(1.0, { duration: 900 })
          ),
          -1,
          true
        )
      );
    } else {
      opacity.value = withTiming(0, { duration: 300 });
      scale.value = withTiming(0.8, { duration: 200 });
      pulseScale.value = withTiming(1, { duration: 200 });
    }
  }, [challenge]);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  if (!challenge) return null;

  return (
    <Animated.View style={[styles.wrapper, containerStyle]}>
      <Animated.View style={pulseStyle}>
        <LinearGradient
          colors={['#4c1d95', '#2d1b69', '#1a0d3e']}
          style={styles.card}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.header}>
            <Text style={styles.headerIcon}>⚡</Text>
            <Text style={styles.headerTitle}>DESAFIO SURPRESA</Text>
            <Text style={styles.headerIcon}>⚡</Text>
          </View>
          <View style={styles.divider} />
          <Text style={styles.description}>{challenge.descricao}</Text>
        </LinearGradient>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 4,
    marginBottom: 8,
  },
  card: {
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#7c3aed',
    padding: 16,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 14,
    elevation: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 10,
  },
  headerIcon: {
    fontSize: 16,
  },
  headerTitle: {
    color: '#a78bfa',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  divider: {
    height: 1,
    backgroundColor: '#4c1d9560',
    marginBottom: 12,
  },
  description: {
    color: '#e9d5ff',
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 22,
  },
});
