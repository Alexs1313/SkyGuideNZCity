import React from 'react';
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {FACT_FILTER_CHIPS} from '../constants/factsFilters';
import type {FactFilter} from '../data/factsData';
import {GOLD} from '../../colors';

function FactsChipStars({selected}: {selected: boolean}) {
  const tint = selected ? GOLD : '#FFFFFF66';
  return (
    <View style={styles.starsRow}>
      <Text style={[styles.starLarge, {color: tint}]}>✨</Text>
    </View>
  );
}

type FactsFilterChipsProps = {
  filter: FactFilter;
  onFilterChange: (next: FactFilter) => void;
};

const FactsFilterChips = ({filter, onFilterChange}: FactsFilterChipsProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}>
      {FACT_FILTER_CHIPS.map(chip => {
        const on = filter === chip.id;
        return (
          <Pressable
            key={chip.id}
            onPress={() => onFilterChange(chip.id)}
            style={({pressed}) => [
              styles.chip,
              on && styles.chipOn,
              pressed && styles.pressed,
            ]}>
            {chip.id === 'all' ? (
              <View style={styles.chipAllInner}>
                <FactsChipStars selected={on} />
                <Text
                  style={[
                    styles.labelAll,
                    on && styles.labelAllOn,
                  ]}>
                  {chip.label}
                </Text>
              </View>
            ) : chip.cover != null ? (
              <ImageBackground
                source={chip.cover}
                style={styles.chipBg}
                imageStyle={styles.chipBgImg}>
                <LinearGradient
                  colors={[
                    'rgba(0, 0, 0, 0.79)',
                    'rgba(0, 0, 0, 0.81)',
                    'rgba(0, 0, 0, 0.88)',
                  ]}
                  locations={[0, 0.45, 1]}
                  style={StyleSheet.absoluteFill}
                />
                <View style={styles.chipImgInner}>
                  <View style={styles.iconWrap}>
                    <Text style={styles.iconEmoji}>{chip.iconEmoji}</Text>
                  </View>
                  <Text
                    style={[
                      styles.labelImg,
                      on && styles.labelImgOn,
                    ]}
                    numberOfLines={1}>
                    {chip.label}
                  </Text>
                </View>
              </ImageBackground>
            ) : null}
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    paddingVertical: 14,
    gap: 10,
    paddingRight: 20,
    paddingLeft: 20,
  },
  chip: {
    width: 98,
    minHeight: 70,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#FFFFFF22',
    backgroundColor: '#141414',
    overflow: 'hidden',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  chipOn: {
    borderColor: GOLD,
    borderWidth: 1,
    backgroundColor: '#B38D2F26',
  },
  chipAllInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 5,
    gap: 10,
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 4,
  },
  starLarge: {
    fontSize: 28,
    lineHeight: 32,
    fontWeight: '700',
    marginBottom: 2,
  },
  labelAll: {
    color: '#FFFFFFB3',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  labelAllOn: {
    color: GOLD,
  },
  chipBg: {
    width: '100%',
    minHeight: 75,
    justifyContent: 'flex-end',
  },
  chipBgImg: {
    borderRadius: 16,
  },
  chipImgInner: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 12,
    paddingBottom: 10,
    justifyContent: 'space-between',
  },
  iconWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 36,
  },
  iconEmoji: {
    fontSize: 30,
    textShadowColor: 'rgba(0,0,0,0.65)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 3,
  },
  labelImg: {
    color: '#FFFFFF8C',
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
    paddingTop: 8,
  },
  labelImgOn: {
    color: GOLD,
  },
  pressed: {
    opacity: 0.88,
  },
});

export default FactsFilterChips;
