import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';

interface SectionRowProps {
  label: string;
  icon: string;
  enabled: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export default function SectionRow({ label, icon, enabled, onToggle, children }: SectionRowProps) {
  const opacity = useSharedValue(enabled ? 1 : 0.35);

  useEffect(() => {
    opacity.value = withTiming(enabled ? 1 : 0.35, { duration: 250 });
  }, [enabled]);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>{icon}</Text>
        <Text style={styles.label}>{label}</Text>
        <TouchableOpacity
          onPress={onToggle}
          style={[styles.toggle, enabled ? styles.toggleOn : styles.toggleOff]}
          activeOpacity={0.7}
        >
          <View style={[styles.knob, enabled ? styles.knobOn : styles.knobOff]} />
        </TouchableOpacity>
      </View>
      <Animated.View
        style={[styles.content, animStyle]}
        pointerEvents={enabled ? 'auto' : 'none'}
      >
        {children}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  icon: {
    fontSize: 18,
    marginRight: 8,
  },
  label: {
    flex: 1,
    color: '#e5e7eb',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  toggle: {
    width: 44,
    height: 24,
    borderRadius: 12,
    padding: 3,
    justifyContent: 'center',
  },
  toggleOn: {
    backgroundColor: '#7c3aed',
  },
  toggleOff: {
    backgroundColor: '#374151',
  },
  knob: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#fff',
  },
  knobOn: {
    alignSelf: 'flex-end',
  },
  knobOff: {
    alignSelf: 'flex-start',
  },
  content: {
    gap: 8,
  },
  disabled: {
    opacity: 1,
  },
});
