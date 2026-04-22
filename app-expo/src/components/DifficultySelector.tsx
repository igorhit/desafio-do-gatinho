import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DifficultyLevel } from '../config/difficulty';
import difficultyConfig from '../config/difficulty';

interface DifficultySelectorProps {
  difficulty: DifficultyLevel;
  onChange: (d: DifficultyLevel) => void;
}

const LEVELS: DifficultyLevel[] = ['facil', 'normal', 'dificil'];

const COLORS: Record<DifficultyLevel, { active: string; border: string; text: string }> = {
  facil: { active: '#059669', border: '#10b981', text: '#6ee7b7' },
  normal: { active: '#2563eb', border: '#3b82f6', text: '#93c5fd' },
  dificil: { active: '#dc2626', border: '#ef4444', text: '#fca5a5' },
};

export default function DifficultySelector({ difficulty, onChange }: DifficultySelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Dificuldade</Text>
      <View style={styles.row}>
        {LEVELS.map((level) => {
          const active = level === difficulty;
          const colors = COLORS[level];
          return (
            <TouchableOpacity
              key={level}
              onPress={() => onChange(level)}
              style={[
                styles.btn,
                { borderColor: colors.border },
                active && { backgroundColor: colors.active },
              ]}
              activeOpacity={0.75}
            >
              <Text style={[styles.btnText, active && { color: '#fff' }, !active && { color: colors.text }]}>
                {difficultyConfig[level].label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 4,
  },
  label: {
    color: '#9ca3af',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  btn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  btnText: {
    fontSize: 13,
    fontWeight: '700',
  },
});
