import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text} from 'react-native';

import {GOLD} from '../../colors';

export type EmojiFilterChip = {
  id: string;
  label: string;
  emoji: string;
};

type EmojiFilterChipRowProps = {
  chips: EmojiFilterChip[];
  selectedId: string;
  onSelect: (id: string) => void;
  /** `compact` — меньше вертикальный padding (как на карте). */
  variant?: 'default' | 'compact';
};

const EmojiFilterChipRow = ({
  chips,
  selectedId,
  onSelect,
  variant = 'default',
}: EmojiFilterChipRowProps) => {
  const rowPad = variant === 'compact' ? styles.rowCompact : styles.rowDefault;
  const chipPad =
    variant === 'compact' ? styles.chipCompact : styles.chipDefault;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.row, rowPad]}>
      {chips.map(chip => {
        const on = selectedId === chip.id;
        return (
          <Pressable
            key={chip.id}
            onPress={() => onSelect(chip.id)}
            style={({pressed}) => [
              styles.chip,
              chipPad,
              on && styles.chipOn,
              pressed && styles.pressed,
            ]}>
            <Text
              style={[
                styles.emoji,
                variant === 'compact' && styles.emojiCompact,
              ]}>
              {chip.emoji}
            </Text>
            <Text style={[styles.label, on && styles.labelOn]}>
              {chip.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    gap: 10,
    paddingRight: 20,
    paddingLeft: 20,
  },
  rowDefault: {
    paddingVertical: 16,
  },
  rowCompact: {
    paddingVertical: 16,
    marginBottom: 4,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFFFFF1F',
    backgroundColor: '#FFFFFF0F',
  },
  chipDefault: {
    paddingVertical: 10,
  },
  chipCompact: {
    paddingVertical: 8,
  },
  chipOn: {
    backgroundColor: GOLD,
    borderColor: GOLD,
  },
  emoji: {
    fontSize: 14,
  },
  emojiCompact: {
    fontSize: 12,
  },
  label: {
    color: '#FFFFFFA6',
    fontSize: 13,
    fontWeight: '600',
  },
  labelOn: {
    color: '#FFFFFF',
  },
  pressed: {
    opacity: 0.88,
  },
});

export default EmojiFilterChipRow;
