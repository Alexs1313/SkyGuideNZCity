import type {TextStyle} from 'react-native';

/** Веса шрифта (React Native `fontWeight`). */
export const fontWeight = {
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
} as const satisfies Record<string, NonNullable<TextStyle['fontWeight']>>;

/** Размеры текста (модульная шкала). */
export const fontSize = {
  caption2: 10,
  caption: 11,
  footnote: 12,
  subheadline: 13,
  callout: 14,
  body: 15,
  bodyLarge: 16,
  title3: 18,
  title2: 20,
  title1: 22,
  display3: 26,
  display2: 28,
} as const;

export const letterSpacing = {
  kicker: 1.2,
  badge: 0.6,
  label: 1,
} as const;

export const lineHeight = {
  body: 20,
} as const;
