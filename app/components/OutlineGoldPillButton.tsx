import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

import {GOLD} from '../../colors';

type OutlineGoldPillButtonProps = {
  onPress: () => void;
  label?: string;
};

const OutlineGoldPillButton = ({
  onPress,
  label = 'Back',
}: OutlineGoldPillButtonProps) => {
  return (
    <Pressable onPress={onPress} style={styles.pill}>
      <Text style={styles.txt}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pill: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: GOLD,
  },
  txt: {
    color: GOLD,
    fontWeight: '700',
  },
});

export default OutlineGoldPillButton;
