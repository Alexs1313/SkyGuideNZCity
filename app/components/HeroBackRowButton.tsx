import React from 'react';
import {Image, Pressable, StyleSheet, Text} from 'react-native';

import {WHITE} from '../../colors';

type HeroBackRowButtonProps = {
  onPress: () => void;
};

const HeroBackRowButton = ({onPress}: HeroBackRowButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.row,
        pressed && styles.pressed,
      ]}>
      <Image
        source={require('../../assets/i/skguidenzcittytaoback.png')}
      />
      <Text style={styles.txt}>Back</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: 80,
    height: 60,
    justifyContent: 'center',
    borderRadius: 22,
    backgroundColor: '#00000080',
    borderWidth: 1,
    borderColor: '#FFFFFF26',
  },
  txt: {
    color: WHITE,
    fontSize: 17,
    fontWeight: '400',
  },
  pressed: {
    opacity: 0.88,
  },
});

export default HeroBackRowButton;
