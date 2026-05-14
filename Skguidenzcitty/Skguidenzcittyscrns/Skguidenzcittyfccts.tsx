import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Skguidenzcittylaytt from '../Skguidenzcittycompn/Skguidenzcittylaytt';
import {
  skguidenzcittyFcctsFilterItems,
  type SkguidenzcittyFcctsCategory,
  type SkguidenzcittyFcctsFilter,
  type SkguidenzcittyFcctsEntry,
} from './skguidenzcittyfcctsdata';

const SKGUIDENZCITTY_FCCTS_RANDOM_CATEGORIES: SkguidenzcittyFcctsCategory[] = [
  'wildlife',
  'maori',
  'adventure',
];

const GOLD = '#B38D2F';
const WHITE = '#FFFFFF';
const GREY = 'rgba(255,255,255,0.45)';
const BG = '#0A0A0A';

const SKGUIDENZCITTY_FCCTS_CHIPS: {
  id: SkguidenzcittyFcctsFilter;
  label: string;
  cover?: number;
  iconEmoji?: string;
}[] = [
  {id: 'all', label: 'All Facts'},
  {
    id: 'wildlife',
    label: 'Wildlife',
    iconEmoji: '🦜',
    cover: require('../../assets/i/skguidenzcittcat1.jpg'),
  },
  {
    id: 'maori',
    label: 'Māori',
    iconEmoji: '🪶',
    cover: require('../../assets/i/skguidenzcittcat2.jpg'),
  },
  {
    id: 'adventure',
    label: 'Adventure',
    iconEmoji: '🪂',
    cover: require('../../assets/i/skguidenzcittcat3.jpg'),
  },
];

function SkguidenzcittyfcctsChipStars({selected}: {selected: boolean}) {
  const skguidenzcittyfcctsStarTint = selected ? GOLD : '#FFFFFF66';
  return (
    <View style={styles.skguidenzcittyfcctsStarsRow}>
      <Text
        style={[
          styles.skguidenzcittyfcctsStarLarge,
          {color: skguidenzcittyfcctsStarTint},
        ]}>
        ✨
      </Text>
    </View>
  );
}

const Skguidenzcittyfccts = () => {
  const skguidenzcittyfcctsInsets = useSafeAreaInsets();
  const [skguidenzcittyfcctsFilter, setSkguidenzcittyfcctsFilter] =
    useState<SkguidenzcittyFcctsFilter>('all');
  const skguidenzcittyfcctsListRef =
    useRef<FlatList<SkguidenzcittyFcctsEntry>>(null);
  const skguidenzcittyfcctsRandomScroll = useRef<{
    filter: SkguidenzcittyFcctsFilter;
    index: number;
  } | null>(null);

  const skguidenzcittyfcctsFiltered = useMemo(
    () => skguidenzcittyFcctsFilterItems(skguidenzcittyfcctsFilter),
    [skguidenzcittyfcctsFilter],
  );

  const skguidenzcittyfcctsCountLabel = useMemo(() => {
    const skguidenzcittyfcctsN = skguidenzcittyfcctsFiltered.length;
    const skguidenzcittyfcctsSuffix =
      skguidenzcittyfcctsFilter === 'all'
        ? 'FACTS'
        : `${skguidenzcittyfcctsFilter.toUpperCase()} FACTS`;
    return `${skguidenzcittyfcctsN} ${skguidenzcittyfcctsSuffix}`;
  }, [skguidenzcittyfcctsFiltered.length, skguidenzcittyfcctsFilter]);

  const skguidenzcittyfcctsShare = useCallback(
    (item: SkguidenzcittyFcctsEntry) => {
      Share.share({
        message: `${item.title}\n\n${item.body}`,
      });
    },
    [],
  );

  const skguidenzcittyfcctsRandom = useCallback(() => {
    const skguidenzcittyfcctsCat =
      SKGUIDENZCITTY_FCCTS_RANDOM_CATEGORIES[
        Math.floor(
          Math.random() * SKGUIDENZCITTY_FCCTS_RANDOM_CATEGORIES.length,
        )
      ];
    const skguidenzcittyfcctsPool =
      skguidenzcittyFcctsFilterItems(skguidenzcittyfcctsCat);
    if (skguidenzcittyfcctsPool.length === 0) {
      return;
    }
    const skguidenzcittyfcctsPickIdx = Math.floor(
      Math.random() * skguidenzcittyfcctsPool.length,
    );
    skguidenzcittyfcctsRandomScroll.current = {
      filter: skguidenzcittyfcctsCat,
      index: skguidenzcittyfcctsPickIdx,
    };
    setSkguidenzcittyfcctsFilter(skguidenzcittyfcctsCat);
  }, []);

  useEffect(() => {
    const skguidenzcittyfcctsPending = skguidenzcittyfcctsRandomScroll.current;
    if (!skguidenzcittyfcctsPending) {
      return;
    }
    if (skguidenzcittyfcctsPending.filter !== skguidenzcittyfcctsFilter) {
      skguidenzcittyfcctsRandomScroll.current = null;
      return;
    }
    const skguidenzcittyfcctsIdx = skguidenzcittyfcctsPending.index;
    skguidenzcittyfcctsRandomScroll.current = null;
    if (
      skguidenzcittyfcctsIdx < 0 ||
      skguidenzcittyfcctsIdx >= skguidenzcittyfcctsFiltered.length
    ) {
      return;
    }
    const skguidenzcittyfcctsRaf = requestAnimationFrame(() => {
      skguidenzcittyfcctsListRef.current?.scrollToIndex({
        index: skguidenzcittyfcctsIdx,
        animated: true,
        viewPosition: 0.12,
      });
    });
    return () => cancelAnimationFrame(skguidenzcittyfcctsRaf);
  }, [skguidenzcittyfcctsFiltered, skguidenzcittyfcctsFilter]);

  const skguidenzcittyfcctsRenderCard = useCallback(
    ({item}: {item: SkguidenzcittyFcctsEntry}) => (
      <View style={styles.skguidenzcittyfcctsCard}>
        <View style={styles.skguidenzcittyfcctsCardTop}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <View style={styles.skguidenzcittyfcctsIconRing}>
              <Text style={styles.skguidenzcittyfcctsIconEmoji}>
                {item.iconEmoji}
              </Text>
            </View>
            <View>
              <View style={styles.skguidenzcittyfcctsBadgeRow}>
                <Text style={styles.skguidenzcittyfcctsBadgeEmoji}>
                  {item.badgeEmoji}
                </Text>
                <Text style={styles.skguidenzcittyfcctsBadgeText}>
                  {item.categoryBadge}
                </Text>
              </View>
              <Text style={styles.skguidenzcittyfcctsCardTitle}>
                {item.title}
              </Text>
            </View>
          </View>

          <Pressable
            onPress={() => skguidenzcittyfcctsShare(item)}
            hitSlop={10}
            style={({pressed}) => [
              styles.skguidenzcittyfcctsShareBtn,
              pressed && styles.skguidenzcittyfcctsPressed,
            ]}>
            <Image
              source={require('../../assets/i/skguidenzcittytalshr.png')}
              style={styles.skguidenzcittyfcctsShareIcon}
            />
          </Pressable>
        </View>

        <Text style={styles.skguidenzcittyfcctsCardBody}>{item.body}</Text>
      </View>
    ),
    [skguidenzcittyfcctsShare],
  );

  const skguidenzcittyfcctsHeader = useMemo(
    () => (
      <>
        <View style={styles.skguidenzcittyfcctsHeaderRow}>
          <View style={styles.skguidenzcittyfcctsHeaderTitles}>
            <Text style={styles.skguidenzcittyfcctsKicker}>KNOWLEDGE</Text>
            <Text style={styles.skguidenzcittyfcctsTitle}>Tourist Facts</Text>
          </View>
          <Pressable
            onPress={skguidenzcittyfcctsRandom}
            style={({pressed}) => [
              styles.skguidenzcittyfcctsRandomBtn,
              pressed && styles.skguidenzcittyfcctsPressed,
            ]}>
            <Text style={styles.skguidenzcittyfcctsRandomIcon}>🎲</Text>
            <Text style={styles.skguidenzcittyfcctsRandomText}>Random</Text>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.skguidenzcittyfcctsChipsRow}>
          {SKGUIDENZCITTY_FCCTS_CHIPS.map(chip => {
            const skguidenzcittyfcctsChipOn =
              skguidenzcittyfcctsFilter === chip.id;
            return (
              <Pressable
                key={chip.id}
                onPress={() => setSkguidenzcittyfcctsFilter(chip.id)}
                style={({pressed}) => [
                  styles.skguidenzcittyfcctsChip,
                  skguidenzcittyfcctsChipOn && styles.skguidenzcittyfcctsChipOn,
                  pressed && styles.skguidenzcittyfcctsPressed,
                ]}>
                {chip.id === 'all' ? (
                  <View style={styles.skguidenzcittyfcctsChipAllInner}>
                    <SkguidenzcittyfcctsChipStars
                      selected={skguidenzcittyfcctsChipOn}
                    />
                    <Text
                      style={[
                        styles.skguidenzcittyfcctsChipLabelAll,
                        skguidenzcittyfcctsChipOn &&
                          styles.skguidenzcittyfcctsChipLabelAllOn,
                      ]}>
                      {chip.label}
                    </Text>
                  </View>
                ) : (
                  <ImageBackground
                    source={chip.cover}
                    style={styles.skguidenzcittyfcctsChipBg}
                    imageStyle={styles.skguidenzcittyfcctsChipBgImg}>
                    <LinearGradient
                      colors={[
                        'rgba(0, 0, 0, 0.79)',
                        'rgba(0, 0, 0, 0.81)',
                        'rgba(0, 0, 0, 0.88)',
                      ]}
                      locations={[0, 0.45, 1]}
                      style={StyleSheet.absoluteFill}
                    />
                    <View style={styles.skguidenzcittyfcctsChipImgInner}>
                      <View style={styles.skguidenzcittyfcctsChipIconWrap}>
                        <Text style={styles.skguidenzcittyfcctsChipIconEmoji}>
                          {chip.iconEmoji}
                        </Text>
                      </View>
                      <Text
                        style={[
                          styles.skguidenzcittyfcctsChipLabelImg,
                          skguidenzcittyfcctsChipOn &&
                            styles.skguidenzcittyfcctsChipLabelImgOn,
                        ]}
                        numberOfLines={1}>
                        {chip.label}
                      </Text>
                    </View>
                  </ImageBackground>
                )}
              </Pressable>
            );
          })}
        </ScrollView>

        <Text style={styles.skguidenzcittyfcctsCount}>
          {skguidenzcittyfcctsCountLabel}
        </Text>
      </>
    ),
    [
      skguidenzcittyfcctsFilter,
      skguidenzcittyfcctsCountLabel,
      skguidenzcittyfcctsRandom,
    ],
  );

  return (
    <Skguidenzcittylaytt>
      <View
        style={[
          styles.skguidenzcittyfcctsRoot,
          {paddingTop: skguidenzcittyfcctsInsets.top + 8},
        ]}>
        <FlatList
          ref={skguidenzcittyfcctsListRef}
          data={skguidenzcittyfcctsFiltered}
          scrollEnabled={false}
          keyExtractor={i => i.id}
          renderItem={skguidenzcittyfcctsRenderCard}
          ListHeaderComponent={skguidenzcittyfcctsHeader}
          contentContainerStyle={[
            styles.skguidenzcittyfcctsListContent,
            {paddingBottom: skguidenzcittyfcctsInsets.bottom + 100},
          ]}
          ItemSeparatorComponent={SkguidenzcittyfcctsSep}
          showsVerticalScrollIndicator={false}
          onScrollToIndexFailed={({index}) => {
            requestAnimationFrame(() => {
              skguidenzcittyfcctsListRef.current?.scrollToIndex({
                index,
                animated: true,
                viewPosition: 0.12,
              });
            });
          }}
        />
      </View>
    </Skguidenzcittylaytt>
  );
};

function SkguidenzcittyfcctsSep() {
  return <View style={styles.skguidenzcittyfcctsSep} />;
}

const styles = StyleSheet.create({
  skguidenzcittyfcctsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  skguidenzcittyfcctsRoot: {
    flex: 1,
    backgroundColor: BG,
  },
  skguidenzcittyfcctsListContent: {
    paddingTop: 0,
  },

  skguidenzcittyfcctsHeaderTitles: {
    flex: 1,
    paddingRight: 12,
  },
  skguidenzcittyfcctsKicker: {
    color: GOLD,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1.2,
  },
  skguidenzcittyfcctsTitle: {
    marginTop: 4,
    color: WHITE,
    fontSize: 28,
    fontWeight: '700',
  },
  skguidenzcittyfcctsRandomBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: GOLD,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
  },
  skguidenzcittyfcctsRandomIcon: {
    fontSize: 14,
  },
  skguidenzcittyfcctsRandomText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  skguidenzcittyfcctsChipsRow: {
    paddingVertical: 14,
    gap: 10,
    paddingRight: 20,
    paddingLeft: 20,
  },
  skguidenzcittyfcctsChip: {
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
  skguidenzcittyfcctsChipOn: {
    borderColor: GOLD,
    borderWidth: 1,
    backgroundColor: '#B38D2F26',
  },
  skguidenzcittyfcctsChipAllInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,

    paddingVertical: 5,
    gap: 10,
  },
  skguidenzcittyfcctsStarsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 4,
  },
  skguidenzcittyfcctsStarSmall: {
    fontSize: 15,

    lineHeight: 18,
    fontWeight: '700',
  },
  skguidenzcittyfcctsStarLarge: {
    fontSize: 28,
    lineHeight: 32,
    fontWeight: '700',
    marginBottom: 2,
  },
  skguidenzcittyfcctsChipLabelAll: {
    color: '#FFFFFFB3',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  skguidenzcittyfcctsChipLabelAllOn: {
    color: GOLD,
  },
  skguidenzcittyfcctsChipBg: {
    width: '100%',
    minHeight: 75,

    justifyContent: 'flex-end',
  },
  skguidenzcittyfcctsChipBgImg: {
    borderRadius: 16,
  },
  skguidenzcittyfcctsChipImgInner: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 12,
    paddingBottom: 10,
    justifyContent: 'space-between',
  },
  skguidenzcittyfcctsChipIconWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    minHeight: 36,
  },
  skguidenzcittyfcctsChipIconEmoji: {
    fontSize: 30,
    textShadowColor: 'rgba(0,0,0,0.65)',

    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 3,
  },
  skguidenzcittyfcctsChipLabelImg: {
    color: '#FFFFFF8C',
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
    paddingTop: 8,
  },
  skguidenzcittyfcctsChipLabelImgOn: {
    color: GOLD,
  },
  skguidenzcittyfcctsCount: {
    color: GREY,
    fontSize: 11,
    fontWeight: '600',

    letterSpacing: 0.8,
    marginBottom: 6,

    marginTop: 4,

    paddingHorizontal: 20,
  },
  skguidenzcittyfcctsSep: {
    height: 14,
  },
  skguidenzcittyfcctsCard: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#FFFFFF14',
    backgroundColor: '#FFFFFF0C',
    padding: 16,
    marginHorizontal: 20,
  },
  skguidenzcittyfcctsCardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  skguidenzcittyfcctsIconRing: {
    width: 36,
    height: 36,
    borderRadius: 10,

    backgroundColor: '#B38D2F1F',
    borderWidth: 1,
    borderColor: '#B38D2F33',

    alignItems: 'center',
    justifyContent: 'center',
  },
  skguidenzcittyfcctsIconEmoji: {
    fontSize: 15,
  },
  skguidenzcittyfcctsShareBtn: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#FFFFFF0D',
    borderWidth: 1,

    borderColor: '#FFFFFF1A',
  },
  skguidenzcittyfcctsShareIcon: {
    width: 18,
    height: 18,
    tintColor: '#FFFFFFB3',

    resizeMode: 'contain',
  },
  skguidenzcittyfcctsBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  skguidenzcittyfcctsBadgeEmoji: {
    fontSize: 12,
  },
  skguidenzcittyfcctsBadgeText: {
    color: GOLD,
    fontSize: 10,
    fontWeight: '700',

    letterSpacing: 1,
  },
  skguidenzcittyfcctsCardTitle: {
    color: WHITE,
    fontSize: 15,

    fontWeight: '700',
  },
  skguidenzcittyfcctsCardBody: {
    color: '#FFFFFFAD',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  skguidenzcittyfcctsPressed: {
    opacity: 0.88,
  },
});

export default Skguidenzcittyfccts;
