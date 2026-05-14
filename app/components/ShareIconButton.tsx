import React from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';

type ShareIconButtonProps = {
  onPress: () => void;
  hitSlop?: number;
};

const ShareIconButton = ({onPress, hitSlop = 10}: ShareIconButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={hitSlop}
      style={({pressed}) => [styles.btn, pressed && styles.pressed]}>
      <Image
        source={require('../../assets/i/skguidenzcittytalshr.png')}
        style={styles.icon}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#FFFFFF0D',
    borderWidth: 1,
    borderColor: '#FFFFFF1A',
  },
  icon: {
    width: 18,
    height: 18,
    tintColor: '#FFFFFFB3',
    resizeMode: 'contain',
  },
  pressed: {
    opacity: 0.88,
  },
});

export default ShareIconButton;
