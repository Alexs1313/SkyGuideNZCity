import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {GOLD, WHITE} from '../../colors';

const GOLD_GRAD_TOP = '#C9A24A';
const GOLD_GRAD_BOTTOM = '#8B6B2A';

type DetailSaveToggleButtonProps = {
  saved: boolean;
  onPress: () => void;
};

const DetailSaveToggleButton = ({
  saved,
  onPress,
}: DetailSaveToggleButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.press,
        saved && styles.glow,
        pressed && styles.pressed,
      ]}>
      {saved ? (
        <LinearGradient
          colors={[GOLD_GRAD_TOP, GOLD_GRAD_BOTTOM]}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          style={styles.grad}>
          <Image
            source={require('../../assets/i/skguidenzcittytasvdd.png')}
          />
          <Text style={styles.txtOn}>Saved</Text>
        </LinearGradient>
      ) : (
        <View style={styles.outline}>
          <Image
            source={require('../../assets/i/skguidenzcittytasvd.png')}
          />
          <Text style={styles.txt}>Save</Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  press: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  glow: {
    shadowColor: GOLD,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  grad: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 52,
  },
  outline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 52,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#B38D2F59',
    backgroundColor: '#B38D2F1A',
  },
  txt: {
    color: GOLD,
    fontSize: 16,
    fontWeight: '700',
  },
  txtOn: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '800',
  },
  pressed: {
    opacity: 0.88,
  },
});

export default DetailSaveToggleButton;
