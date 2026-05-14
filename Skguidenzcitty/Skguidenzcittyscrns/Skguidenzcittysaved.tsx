import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useMemo} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Skguidenzcittylaytt from '../Skguidenzcittycompn/Skguidenzcittylaytt';

import type {SkguidenzcittyStackParamList} from '../Skguidenzcittyroute/Skguidenzcittystack';
import {
  SKGUIDENZCITTY_LOCS_ITEMS,
  skguidenzcittyLocsHeroForIndex,
} from './skguidenzcittylocsdata';
import type {SkguidenzcittyLocEntry} from './skguidenzcittylocstypes';
import {useSkguidenzcittylocsSaved} from './skguidenzcittylocssavedctx';

const GOLD = '#B38D2F';
const GOLD_GRAD_TOP = '#B38D2F';
const GOLD_GRAD_BOTTOM = '#8B6914';
const WHITE = '#FFFFFF';
const GREY = 'rgba(255,255,255,0.45)';
const BG = '#0A0A0A';

function skguidenzcittySavedCoordsShort(lat: number, lon: number): string {
  const la = lat >= 0 ? 'N' : 'S';
  const lo = lon >= 0 ? 'E' : 'W';
  return `${Math.abs(lat).toFixed(2)}°${la}, ${Math.abs(lon).toFixed(2)}°${lo}`;
}

type SkguidenzcittyTabParamList = {
  Skguidenzcittylocs: undefined;
  Skguidenzcittysaved: undefined;
  Skguidenzcittymap: undefined;
  Skguidenzcittyblog: undefined;
  Skguidenzcittyfccts: undefined;
  Skguidenzcittyquiz: undefined;
};

type SkguidenzcittySavedNav = CompositeNavigationProp<
  BottomTabNavigationProp<SkguidenzcittyTabParamList, 'Skguidenzcittysaved'>,
  StackNavigationProp<SkguidenzcittyStackParamList>
>;

const Skguidenzcittysaved = () => {
  const skguidenzcittysavedNav = useNavigation<SkguidenzcittySavedNav>();
  const {isSaved, toggleSaved} = useSkguidenzcittylocsSaved();
  const skguidenzcittysavedInsets = useSafeAreaInsets();

  const skguidenzcittysavedItems = useMemo(
    () => SKGUIDENZCITTY_LOCS_ITEMS.filter(l => isSaved(l.id)),
    [isSaved],
  );

  const skguidenzcittysavedOpenDetail = useCallback(
    (locationId: string) => {
      skguidenzcittysavedNav.navigate('Skguidenzcittylocsdtl', {locationId});
    },
    [skguidenzcittysavedNav],
  );

  const skguidenzcittysavedExplore = useCallback(() => {
    skguidenzcittysavedNav.navigate('Skguidenzcittylocs');
  }, [skguidenzcittysavedNav]);

  if (skguidenzcittysavedItems.length === 0) {
    return (
      <Skguidenzcittylaytt>
        <View
          style={[
            styles.skguidenzcittysavedEmptyRoot,
            {paddingTop: skguidenzcittysavedInsets.top + 8},
          ]}>
          <View style={styles.skguidenzcittysavedEmptyHeader}>
            <Text style={styles.skguidenzcittysavedKicker}>COLLECTION</Text>
            <Text style={styles.skguidenzcittysavedTitle}>Saved Places</Text>
          </View>

          <View style={styles.skguidenzcittysavedEmptyCenter}>
            <View style={styles.skguidenzcittysavedEmptyIconWrap}>
              <Image
                source={require('../../assets/i/skguidenzcittytnosv.png')}
              />
            </View>
            <Text style={styles.skguidenzcittysavedEmptyHeading}>
              No saved places yet
            </Text>
            <Text style={styles.skguidenzcittysavedEmptySub}>
              Tap the bookmark icon on any location to save it here for later.
            </Text>
            <Pressable
              onPress={skguidenzcittysavedExplore}
              style={({pressed}) => [
                styles.skguidenzcittysavedCtaOuter,
                pressed && styles.skguidenzcittysavedPressed,
              ]}>
              <LinearGradient
                colors={[GOLD_GRAD_TOP, GOLD_GRAD_BOTTOM]}
                start={{x: 0.5, y: 0}}
                end={{x: 0.5, y: 1}}
                style={styles.skguidenzcittysavedCtaGrad}>
                <Text style={styles.skguidenzcittysavedCtaText}>
                  Explore Locations
                </Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </Skguidenzcittylaytt>
    );
  }

  const skguidenzcittysavedSub =
    skguidenzcittysavedItems.length === 1
      ? '1 location saved'
      : `${skguidenzcittysavedItems.length} locations saved`;

  return (
    <Skguidenzcittylaytt>
      <View
        style={[
          styles.skguidenzcittysavedListRoot,
          {paddingTop: skguidenzcittysavedInsets.top + 8},
        ]}>
        <View style={styles.skguidenzcittysavedHeader}>
          <Text style={styles.skguidenzcittysavedKicker}>COLLECTION</Text>
          <Text style={styles.skguidenzcittysavedTitle}>Saved Places</Text>
          <Text style={styles.skguidenzcittysavedSub}>
            {skguidenzcittysavedSub}
          </Text>
        </View>

        <FlatList
          data={skguidenzcittysavedItems}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          ItemSeparatorComponent={SkguidenzcittysavedSep}
          contentContainerStyle={[
            styles.skguidenzcittysavedListPad,
            {paddingBottom: skguidenzcittysavedInsets.bottom + 100},
          ]}
          renderItem={({item, index}) => (
            <SkguidenzcittysavedCard
              item={item}
              index={index}
              onOpen={() => skguidenzcittysavedOpenDetail(item.id)}
              onToggleBookmark={() => toggleSaved(item.id)}
            />
          )}
        />
      </View>
    </Skguidenzcittylaytt>
  );
};

function SkguidenzcittysavedCard({
  item,
  index,
  onOpen,
  onToggleBookmark,
}: {
  item: SkguidenzcittyLocEntry;
  index: number;
  onOpen: () => void;
  onToggleBookmark: () => void;
}) {
  const skguidenzcittysavedGi = SKGUIDENZCITTY_LOCS_ITEMS.findIndex(
    l => l.id === item.id,
  );
  const skguidenzcittysavedHero = skguidenzcittyLocsHeroForIndex(
    skguidenzcittysavedGi >= 0 ? skguidenzcittysavedGi : index,
  );

  return (
    <Pressable
      onPress={onOpen}
      style={({pressed}) => [
        styles.skguidenzcittysavedCard,
        pressed && styles.skguidenzcittysavedPressed,
      ]}>
      <ImageBackground
        source={skguidenzcittysavedHero}
        style={styles.skguidenzcittysavedCardBg}
        imageStyle={styles.skguidenzcittysavedCardBgImg}>
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.04)', 'rgba(0, 0, 0, 0.69)']}
          locations={[0.2, 1]}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.skguidenzcittysavedCardInner}>
          <View style={styles.skguidenzcittysavedCardTop}>
            <Text style={styles.skguidenzcittysavedCardBadge}>
              {item.badgeEmoji} {item.categoryBadge}
            </Text>
          </View>
          <Text style={styles.skguidenzcittysavedCardName}>{item.name}</Text>
          <Text style={styles.skguidenzcittysavedCardCoords}>
            {skguidenzcittySavedCoordsShort(item.lat, item.lon)}
          </Text>
        </View>

        <Pressable
          onPress={onToggleBookmark}
          hitSlop={10}
          style={({pressed}) => [
            styles.skguidenzcittysavedBmOuter,
            pressed && styles.skguidenzcittysavedPressed,
          ]}>
          <LinearGradient
            colors={['#00000080', '#00000080']}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            style={styles.skguidenzcittysavedBmGrad}>
            <Image
              source={require('../../assets/i/skguidenzcittytasvd.png')}
              style={styles.skguidenzcittysavedBmIcon}
            />
          </LinearGradient>
        </Pressable>
      </ImageBackground>
    </Pressable>
  );
}

function SkguidenzcittysavedSep() {
  return <View style={styles.skguidenzcittysavedSep} />;
}

const styles = StyleSheet.create({
  skguidenzcittysavedEmptyRoot: {
    flex: 1,
    backgroundColor: BG,
    minHeight: '100%',
  },
  skguidenzcittysavedEmptyHeader: {
    paddingHorizontal: 20,
  },
  skguidenzcittysavedEmptyCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingBottom: 108,
  },
  skguidenzcittysavedListRoot: {
    flex: 1,
  },
  skguidenzcittysavedHeader: {
    paddingHorizontal: 20,

    paddingBottom: 8,
  },
  skguidenzcittysavedKicker: {
    color: GOLD,

    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1.2,
  },
  skguidenzcittysavedTitle: {
    marginTop: 4,
    color: WHITE,
    fontSize: 28,

    fontWeight: '700',
  },
  skguidenzcittysavedSub: {
    marginTop: 6,
    color: '#FFFFFF66',
    fontSize: 13,
    fontWeight: '400',

    marginBottom: 12,
  },
  skguidenzcittysavedEmptyHeading: {
    marginTop: 22,
    color: WHITE,
    fontSize: 28,
    fontWeight: '700',

    textAlign: 'center',
  },
  skguidenzcittysavedEmptySub: {
    marginTop: 18,
    color: '#FFFFFF99',
    fontSize: 18,
    lineHeight: 21,
    fontWeight: '400',
    textAlign: 'center',
  },
  skguidenzcittysavedEmptyIconWrap: {
    width: 120,
    height: 120,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: '#B38D2F33',
    backgroundColor: '#B38D2F14',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 40,
  },
  skguidenzcittysavedEmptyIconImg: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  skguidenzcittysavedCtaOuter: {
    marginTop: 28,
    width: '82%',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: GOLD,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.35,
    shadowRadius: 21,
    elevation: 8,
  },
  skguidenzcittysavedCtaGrad: {
    height: 71,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skguidenzcittysavedCtaText: {
    color: WHITE,
    fontSize: 16,

    fontWeight: '800',
  },
  skguidenzcittysavedListPad: {
    paddingHorizontal: 20,
    paddingTop: 4,
  },
  skguidenzcittysavedSep: {
    height: 14,
  },
  skguidenzcittysavedCard: {
    borderRadius: 22,
    overflow: 'hidden',

    borderWidth: 1,
    borderColor: '#B38D2F33',
    minHeight: 132,
  },
  skguidenzcittysavedCardBg: {
    flex: 1,
    minHeight: 132,
    justifyContent: 'center',
  },
  skguidenzcittysavedCardBgImg: {
    borderRadius: 22,
  },
  skguidenzcittysavedCardInner: {
    padding: 18,
  },
  skguidenzcittysavedCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  skguidenzcittysavedCardBadge: {
    color: GOLD,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  skguidenzcittysavedBmOuter: {
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#FFFFFF22',
    position: 'absolute',
    right: 11,
    top: 11,
  },
  skguidenzcittysavedBmGrad: {
    width: 33,
    height: 33,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skguidenzcittysavedBmIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
  skguidenzcittysavedCardName: {
    color: WHITE,
    fontSize: 18,
    fontWeight: '700',
  },
  skguidenzcittysavedCardCoords: {
    marginTop: 6,
    color: '#FFFFFF99',
    fontSize: 11,
    fontWeight: '500',
  },
  skguidenzcittysavedPressed: {
    opacity: 0.88,
  },
});

export default Skguidenzcittysaved;
