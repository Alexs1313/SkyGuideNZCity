import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

/** Те же оттенки, что на экране онбординга. */
const ONBOARD_GOLD = '#C9A24A';

type OnboardingOutlineBackButtonProps = {
  onPress: () => void;
};

const OnboardingOutlineBackButton = ({
  onPress,
}: OnboardingOutlineBackButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.btn,
        pressed && styles.pressed,
      ]}>
      <Text style={styles.label}>Back</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: 90,
    height: 55,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#B38D2F66',
    backgroundColor: '#B38D2F14',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: ONBOARD_GOLD,
    fontSize: 16,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.88,
  },
});

export default OnboardingOutlineBackButton;
