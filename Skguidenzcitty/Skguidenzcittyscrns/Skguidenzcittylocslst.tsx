import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useMemo, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {
  SKGUIDENZCITTY_LOCS_ITEMS,
  skguidenzcittyLocsFilterItems,
  skguidenzcittyLocsHeroForIndex,
} from './skguidenzcittylocsdata';
import type {SkguidenzcittyStackParamList} from '../Skguidenzcittyroute/Skguidenzcittystack';
import type {SkguidenzcittyLocsFilter} from './skguidenzcittylocstypes';
import Skguidenzcittylaytt from '../Skguidenzcittycompn/Skguidenzcittylaytt';

const GOLD = '#B38D2F';
const GOLD_TEXT_ON_FILL = '#0A0A0A';
const WHITE = '#FFFFFF';
const GREY = 'rgba(255,255,255,0.45)';
const CHIP_BORDER = 'rgba(255,255,255,0.22)';

const SKGUIDENZCITTY_LOCS_FILTERS: {
  id: SkguidenzcittyLocsFilter;
  label: string;
  emoji: string;
}[] = [
  {id: 'all', label: 'All', emoji: '🌍'},
  {id: 'fjords', label: 'Fjords', emoji: '🌊'},
  {id: 'volcanoes', label: 'Volcanoes', emoji: '🌋'},
  {id: 'glaciers', label: 'Glaciers', emoji: '🧊'},
  {id: 'forests', label: 'Forests', emoji: '🌲'},
  {id: 'lakes', label: 'Lakes', emoji: '💧'},
];

type SkguidenzcittyLocsNav = StackNavigationProp<SkguidenzcittyStackParamList>;

const Skguidenzcittylocslst = () => {
  const skguidenzcittylocsNav = useNavigation<SkguidenzcittyLocsNav>();
  const [skguidenzcittylocsFilter, setSkguidenzcittylocsFilter] =
    useState<SkguidenzcittyLocsFilter>('all');
  const skguidenzcittylocsInsets = useSafeAreaInsets();

  const skguidenzcittylocsFiltered = useMemo(
    () => skguidenzcittyLocsFilterItems(skguidenzcittylocsFilter),
    [skguidenzcittylocsFilter],
  );

  const skguidenzcittylocsOpenDetail = useCallback(
    (locationId: string) => {
      skguidenzcittylocsNav.navigate('Skguidenzcittylocsdtl', {locationId});
    },
    [skguidenzcittylocsNav],
  );

  const skguidenzcittylocsRandom = useCallback(() => {
    const skguidenzcittylocsPool = skguidenzcittylocsFiltered;
    if (skguidenzcittylocsPool.length === 0) {
      return;
    }
    const skguidenzcittylocsPick =
      skguidenzcittylocsPool[
        Math.floor(Math.random() * skguidenzcittylocsPool.length)
      ];
    skguidenzcittylocsOpenDetail(skguidenzcittylocsPick.id);
  }, [skguidenzcittylocsFiltered, skguidenzcittylocsOpenDetail]);

  const skguidenzcittylocsCountLabel = useMemo(() => {
    const skguidenzcittylocsN = skguidenzcittylocsFiltered.length;
    const skguidenzcittylocsLabel =
      skguidenzcittylocsFilter === 'all'
        ? 'ALL LOCATIONS'
        : `${skguidenzcittylocsFilter.toUpperCase()} LOCATIONS`;
    return `${skguidenzcittylocsN} ${skguidenzcittylocsLabel}`;
  }, [skguidenzcittylocsFiltered.length, skguidenzcittylocsFilter]);

  return (
    <Skguidenzcittylaytt>
      <View
        style={[
          styles.skguidenzcittylocsHeaderPad,
          {paddingTop: skguidenzcittylocsInsets.top + 8},
        ]}>
        <View style={styles.skguidenzcittylocsHeaderRow}>
          <View style={styles.skguidenzcittylocsHeaderTitles}>
            <Text style={styles.skguidenzcittylocsKicker}>DISCOVER</Text>
            <Text style={styles.skguidenzcittylocsTitle}>Locations</Text>
          </View>
          <Pressable
            onPress={skguidenzcittylocsRandom}
            style={({pressed}) => [
              styles.skguidenzcittylocsRandomBtn,
              pressed && styles.skguidenzcittylocsPressed,
            ]}>
            <Text style={styles.skguidenzcittylocsRandomIcon}>🎲</Text>
            <Text style={styles.skguidenzcittylocsRandomText}>Random</Text>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.skguidenzcittylocsChipsRow}>
          {SKGUIDENZCITTY_LOCS_FILTERS.map(chip => {
            const skguidenzcittylocsSelected =
              skguidenzcittylocsFilter === chip.id;
            return (
              <Pressable
                key={chip.id}
                onPress={() => setSkguidenzcittylocsFilter(chip.id)}
                style={({pressed}) => [
                  styles.skguidenzcittylocsChip,
                  skguidenzcittylocsSelected && styles.skguidenzcittylocsChipOn,
                  pressed && styles.skguidenzcittylocsPressed,
                ]}>
                <Text style={styles.skguidenzcittylocsChipEmoji}>
                  {chip.emoji}
                </Text>
                <Text
                  style={[
                    styles.skguidenzcittylocsChipLabel,
                    skguidenzcittylocsSelected &&
                      styles.skguidenzcittylocsChipLabelOn,
                  ]}>
                  {chip.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <Text style={styles.skguidenzcittylocsCount}>
          {skguidenzcittylocsCountLabel}
        </Text>
      </View>

      <FlatList
        data={skguidenzcittylocsFiltered}
        scrollEnabled={false}
        keyExtractor={item => item.id}
        contentContainerStyle={[
          styles.skguidenzcittylocsListPad,
          {paddingBottom: skguidenzcittylocsInsets.bottom + 100},
        ]}
        ItemSeparatorComponent={SkguidenzcittylocsFlatSep}
        renderItem={({item, index}) => {
          const skguidenzcittylocsGlobalIndex =
            SKGUIDENZCITTY_LOCS_ITEMS.findIndex(l => l.id === item.id);
          const skguidenzcittylocsHero = skguidenzcittyLocsHeroForIndex(
            skguidenzcittylocsGlobalIndex >= 0
              ? skguidenzcittylocsGlobalIndex
              : index,
          );
          return (
            <Pressable
              onPress={() => skguidenzcittylocsOpenDetail(item.id)}
              style={({pressed}) => [
                styles.skguidenzcittylocsCard,
                pressed && styles.skguidenzcittylocsPressed,
              ]}>
              <ImageBackground
                source={skguidenzcittylocsHero}
                style={styles.skguidenzcittylocsCardBg}
                imageStyle={styles.skguidenzcittylocsCardBgImg}>
                <LinearGradient
                  colors={['rgba(0, 0, 0, 0.04)', 'rgba(0, 0, 0, 0.69)']}
                  locations={[0.2, 1]}
                  style={StyleSheet.absoluteFill}
                />
                <View style={styles.skguidenzcittylocsCardInner}>
                  <View style={{}}>
                    <View style={styles.skguidenzcittylocsCardTop}>
                      <Text style={styles.skguidenzcittylocsCardBadge}>
                        {item.badgeEmoji} {item.categoryBadge}
                      </Text>
                    </View>
                    <Text style={styles.skguidenzcittylocsCardName}>
                      {item.name}
                    </Text>
                    <Text
                      style={styles.skguidenzcittylocsCardTag}
                      numberOfLines={1}>
                      {item.tagline}
                    </Text>
                  </View>
                  <Image
                    source={require('../../assets/i/skguidenzcittytaonarr.png')}
                  />
                </View>
              </ImageBackground>
            </Pressable>
          );
        }}
      />
    </Skguidenzcittylaytt>
  );
};

const styles = StyleSheet.create({
  skguidenzcittylocsChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,

    borderWidth: 1,
    borderColor: '#FFFFFF1F',
    backgroundColor: '#FFFFFF0F',
  },

  skguidenzcittylocsRoot: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  skguidenzcittylocsHeaderPad: {
    paddingBottom: 8,
  },
  skguidenzcittylocsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  skguidenzcittylocsHeaderTitles: {
    flex: 1,
    paddingRight: 12,
  },
  skguidenzcittylocsKicker: {
    color: GOLD,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1.2,
  },
  skguidenzcittylocsTitle: {
    marginTop: 4,
    color: WHITE,
    fontSize: 28,
    fontWeight: '700',
  },
  skguidenzcittylocsRandomBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#B38D2F',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
  },
  skguidenzcittylocsRandomIcon: {
    fontSize: 14,
  },
  skguidenzcittylocsRandomText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  skguidenzcittylocsChipsRow: {
    paddingVertical: 16,
    gap: 10,
    paddingRight: 20,
    paddingLeft: 20,
  },

  skguidenzcittylocsChipOn: {
    backgroundColor: GOLD,
    borderColor: GOLD,
  },
  skguidenzcittylocsChipEmoji: {
    fontSize: 14,
  },
  skguidenzcittylocsChipLabel: {
    color: '#FFFFFFA6',
    fontSize: 13,
    fontWeight: '600',
  },
  skguidenzcittylocsChipLabelOn: {
    color: '#FFFFFF',
  },
  skguidenzcittylocsCount: {
    color: GREY,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.8,

    marginBottom: 4,
    marginTop: 10,
    paddingLeft: 20,
  },
  skguidenzcittylocsListPad: {
    paddingHorizontal: 20,
    paddingTop: 4,
  },
  skguidenzcittylocsSep: {
    height: 14,
  },
  skguidenzcittylocsCard: {
    borderRadius: 22,
    overflow: 'hidden',
    minHeight: 108,
  },
  skguidenzcittylocsCardBg: {
    flex: 1,
    minHeight: 108,
    justifyContent: 'flex-end',
  },
  skguidenzcittylocsCardBgImg: {
    borderRadius: 22,
  },
  skguidenzcittylocsCardInner: {
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  skguidenzcittylocsCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  skguidenzcittylocsCardBadge: {
    color: GOLD,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  skguidenzcittylocsChevron: {
    color: WHITE,
    fontSize: 28,
    fontWeight: '300',
    marginTop: -4,
  },
  skguidenzcittylocsCardName: {
    color: WHITE,
    fontSize: 18,

    fontWeight: '700',
  },
  skguidenzcittylocsCardTag: {
    marginTop: 6,
    color: '#FFFFFF99',
    fontSize: 11,

    fontWeight: '500',
  },
  skguidenzcittylocsPressed: {
    opacity: 0.88,
  },
});

function SkguidenzcittylocsFlatSep() {
  return <View style={styles.skguidenzcittylocsSep} />;
}

export default Skguidenzcittylocslst;
