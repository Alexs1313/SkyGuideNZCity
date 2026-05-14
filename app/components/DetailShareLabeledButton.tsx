import React from 'react';
import {Image, Pressable, StyleSheet, Text} from 'react-native';

import {WHITE} from '../../colors';

type DetailShareLabeledButtonProps = {
  onPress: () => void;
};

const DetailShareLabeledButton = ({
  onPress,
}: DetailShareLabeledButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.row,
        pressed && styles.pressed,
      ]}>
      <Image
        source={require('../../assets/i/skguidenzcittytalshr.png')}
      />
      <Text style={styles.label}>Share</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: '#FFFFFF0F',
    borderWidth: 1,
    borderColor: '#FFFFFF1F',
  },
  label: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.88,
  },
});

export default DetailShareLabeledButton;
