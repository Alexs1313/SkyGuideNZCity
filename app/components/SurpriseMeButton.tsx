import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

import {GOLD} from '../../colors';

type SurpriseMeButtonProps = {
  onPress: () => void;
  label?: string;
};

const SurpriseMeButton = ({
  onPress,
  label = 'Surprise Me',
}: SurpriseMeButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [styles.btn, pressed && styles.pressed]}>
      <Text style={styles.icon}>🎲</Text>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: GOLD,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
  },
  pressed: {
    opacity: 0.88,
  },
  icon: {
    fontSize: 14,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default SurpriseMeButton;
