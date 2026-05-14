import React from 'react';
import {Image, Pressable, StyleSheet, Text} from 'react-native';

import {WHITE} from '../../colors';
import {
  fontSize,
  fontWeight,
} from '../../typography';

type BlogDetailBackButtonProps = {
  onPress: () => void;
};

const BlogDetailBackButton = ({onPress}: BlogDetailBackButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [styles.btn, pressed && styles.pressed]}>
      <Image
        source={require('../../assets/i/skguidenzcittytaoback.png')}
        style={styles.icon}
      />
      <Text style={styles.label}>Back</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    width: 80,
    height: 62,
    borderRadius: 18,
    justifyContent: 'center',
    backgroundColor: '#00000080',
    borderWidth: 1,
    borderColor: '#FFFFFF26',
  },
  icon: {
    width: 14,
    height: 14,
    tintColor: WHITE,
    resizeMode: 'contain',
  },
  label: {
    color: WHITE,
    fontSize: fontSize.subheadline,
    fontWeight: fontWeight.bold,
  },
  pressed: {
    opacity: 0.88,
  },
});

export default BlogDetailBackButton;
