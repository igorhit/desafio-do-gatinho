import React, { useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withRepeat,
  withSequence,
  cancelAnimation,
} from 'react-native-reanimated';

interface GatinhoButtonProps {
  onPress: () => void;
  isRolling: boolean;
}

export default function GatinhoButton({ onPress, isRolling }: GatinhoButtonProps) {
  const scale = useSharedValue(1);
  const glowOpacity = useSharedValue(0.5);
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (isRolling) {
      rotation.value = withRepeat(
        withTiming(360, { duration: 600 }),
        -1,
        false
      );
      glowOpacity.value = withRepeat(
        withSequence(withTiming(1, { duration: 300 }), withTiming(0.3, { duration: 300 })),
        -1,
        true
      );
    } else {
      cancelAnimation(rotation);
      cancelAnimation(glowOpacity);
      rotation.value = withTiming(0, { duration: 200 });
      glowOpacity.value = withTiming(0.5, { duration: 300 });
    }
  }, [isRolling]);

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.93, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10, stiffness: 200 });
  };

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.glow, glowStyle]} />
      <Animated.View style={buttonStyle}>
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={onPress}
          activeOpacity={1}
          disabled={isRolling}
        >
          <LinearGradient
            colors={isRolling ? ['#5b21b6', '#4c1d95'] : ['#7c3aed', '#6d28d9', '#5b21b6']}
            style={styles.button}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Animated.Text style={[styles.icon, iconStyle]}>🐱</Animated.Text>
            <Text style={styles.label}>{isRolling ? 'Sorteando...' : 'Gatinho!'}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    alignItems: 'center',
    marginVertical: 12,
  },
  glow: {
    position: 'absolute',
    width: '110%',
    height: '200%',
    borderRadius: 20,
    backgroundColor: '#7c3aed',
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: '#a78bfa50',
    shadowColor: '#4c1d95',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 10,
  },
  icon: {
    fontSize: 26,
  },
  label: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
