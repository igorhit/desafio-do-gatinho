import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

import { useRandomizer } from '../src/hooks/useRandomizer';
import ChampionSlot from '../src/components/ChampionSlot';
import RelicSlot from '../src/components/RelicSlot';
import AdventureSlot from '../src/components/AdventureSlot';
import SurpriseChallenge from '../src/components/SurpriseChallenge';
import DifficultySelector from '../src/components/DifficultySelector';
import GatinhoButton from '../src/components/GatinhoButton';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MAX_WIDTH = Math.min(SCREEN_WIDTH, 480);

export default function HomeScreen() {
  const { difficulty, setDifficulty, toggles, toggleLine, result, isRolling, roll } =
    useRandomizer();

  const headerShake = useSharedValue(0);
  const contentOpacity = useSharedValue(1);
  const prevRollingRef = useRef(false);

  useEffect(() => {
    if (prevRollingRef.current && !isRolling) {
      // Reveal animation on results
      contentOpacity.value = withSequence(
        withTiming(0.3, { duration: 80 }),
        withTiming(1, { duration: 300 })
      );
      headerShake.value = withSequence(
        withSpring(-6, { damping: 5, stiffness: 400 }),
        withSpring(6, { damping: 5, stiffness: 400 }),
        withSpring(0, { damping: 8, stiffness: 300 })
      );
    }
    prevRollingRef.current = isRolling;
  }, [isRolling]);

  const headerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: headerShake.value }],
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
  }));

  return (
    <LinearGradient colors={['#0d1117', '#111827', '#0d1117']} style={styles.bg}>
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <View style={styles.centered}>
          {/* Header */}
          <Animated.View style={[styles.header, headerStyle]}>
            <Text style={styles.headerIcon}>🐱</Text>
            <View>
              <Text style={styles.headerTitle}>Desafio do Gatinho</Text>
              <Text style={styles.headerSub}>Legends of Runeterra Randomizer</Text>
            </View>
          </Animated.View>

          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Difficulty */}
            <DifficultySelector difficulty={difficulty} onChange={setDifficulty} />

            <View style={styles.divider} />

            {/* Button */}
            <GatinhoButton onPress={roll} isRolling={isRolling} />

            <View style={styles.divider} />

            {/* Results */}
            <Animated.View style={[styles.results, contentStyle]}>
              {/* Surprise Challenge — appears above everything when active */}
              <SurpriseChallenge challenge={result.challenge} />

              <ChampionSlot
                champion={result.champion}
                enabled={toggles.champion}
                onToggle={() => toggleLine('champion')}
              />

              <View style={styles.sectionDivider} />

              <RelicSlot
                relics={result.relics}
                enabled={toggles.relics}
                onToggle={() => toggleLine('relics')}
              />

              <View style={styles.sectionDivider} />

              <AdventureSlot
                adventure={result.adventure}
                enabled={toggles.adventure}
                onToggle={() => toggleLine('adventure')}
              />
            </Animated.View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  safe: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
    width: '100%',
    maxWidth: MAX_WIDTH,
  },
  headerIcon: {
    fontSize: 36,
  },
  headerTitle: {
    color: '#f9fafb',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  headerSub: {
    color: '#6b7280',
    fontSize: 11,
    letterSpacing: 0.5,
  },
  scroll: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    maxWidth: MAX_WIDTH,
    alignSelf: 'center',
    width: '100%',
  },
  divider: {
    height: 1,
    backgroundColor: '#1f2937',
    marginVertical: 12,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#1f2937',
    marginVertical: 8,
  },
  results: {
    gap: 4,
  },
});
