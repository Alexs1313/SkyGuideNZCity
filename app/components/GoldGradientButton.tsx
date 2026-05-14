import React from 'react';
import {Pressable, StyleProp, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const DEFAULT_GOLD: [string, string] = ['#B38D2F', '#8B6914'];

type GoldGradientButtonProps = {
  onPress: () => void;
  children: React.ReactNode;
  colors?: [string, string];
  start?: {x: number; y: number};
  end?: {x: number; y: number};
  containerStyle?: StyleProp<ViewStyle>;
  gradientStyle?: StyleProp<ViewStyle>;
  hitSlop?: number;
};

const GoldGradientButton = ({
  onPress,
  children,
  colors = DEFAULT_GOLD,
  start = {x: 0.5, y: 0},
  end = {x: 0.5, y: 1},
  containerStyle,
  gradientStyle,
  hitSlop,
}: GoldGradientButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={hitSlop}
      style={({pressed}) => [
        containerStyle,
        pressed ? {opacity: 0.88} : null,
      ]}>
      <LinearGradient
        colors={colors}
        start={start}
        end={end}
        style={gradientStyle}>
        {children}
      </LinearGradient>
    </Pressable>
  );
};

export default GoldGradientButton;
