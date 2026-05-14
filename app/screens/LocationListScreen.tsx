import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useMemo, useState} from 'react';
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

import EmojiFilterChipRow from '../components/EmojiFilterChipRow';
import ScreenHeader from '../components/ScreenHeader';
import ScreenLayout from '../components/ScreenLayout';
import SurpriseMeButton from '../components/SurpriseMeButton';
import {LOCATION_FILTER_CHIPS} from '../constants/locationFilters';
import {
  LOCATIONS,
  filterLocationsByCategory,
  heroImageForLocationIndex,
} from '../data/locationsData';
import type {RootStackParamList} from '../navigation/RootStack';
import type {LocationFilter} from '../data/locationTypes';

const GOLD = '#B38D2F';
const GOLD_TEXT_ON_FILL = '#0A0A0A';
const WHITE = '#FFFFFF';
const GREY = 'rgba(255,255,255,0.45)';

type LocationsStackNav = StackNavigationProp<RootStackParamList>;

const LocationListScreen = () => {
  const locsNav = useNavigation<LocationsStackNav>();
  const [locsFilter, setListFilter] = useState<LocationFilter>('all');
  const locsInsets = useSafeAreaInsets();

  const locsFiltered = useMemo(
    () => filterLocationsByCategory(locsFilter),
    [locsFilter],
  );

  const locsOpenDetail = useCallback(
    (locationId: string) => {
      locsNav.navigate('LocationDetail', {locationId});
    },
    [locsNav],
  );

  const locsRandom = useCallback(() => {
    const locsPool = locsFiltered;
    if (locsPool.length === 0) {
      return;
    }
    const locsPick = locsPool[Math.floor(Math.random() * locsPool.length)];
    locsOpenDetail(locsPick.id);
  }, [locsFiltered, locsOpenDetail]);

  const locsCountLabel = useMemo(() => {
    const locsN = locsFiltered.length;
    const locsLabel =
      locsFilter === 'all'
        ? 'ALL LOCATIONS'
        : `${locsFilter.toUpperCase()} LOCATIONS`;
    return `${locsN} ${locsLabel}`;
  }, [locsFiltered.length, locsFilter]);

  return (
    <ScreenLayout>
      <View style={[styles.locsHeaderPad, {paddingTop: locsInsets.top + 8}]}>
        <ScreenHeader
          kicker="DISCOVER"
          title="Locations"
          right={<SurpriseMeButton onPress={locsRandom} />}
        />

        <EmojiFilterChipRow
          chips={LOCATION_FILTER_CHIPS}
          selectedId={locsFilter}
          onSelect={id => setListFilter(id as LocationFilter)}
        />

        <Text style={styles.locsCount}>{locsCountLabel}</Text>
      </View>

      <FlatList
        data={locsFiltered}
        scrollEnabled={false}
        keyExtractor={item => item.id}
        contentContainerStyle={[
          styles.locsListPad,
          {paddingBottom: locsInsets.bottom + 100},
        ]}
        ItemSeparatorComponent={LocationListSeparator}
        renderItem={({item, index}) => {
          const locsGlobalIndex = LOCATIONS.findIndex(l => l.id === item.id);
          const locsHero = heroImageForLocationIndex(
            locsGlobalIndex >= 0 ? locsGlobalIndex : index,
          );
          return (
            <Pressable
              onPress={() => locsOpenDetail(item.id)}
              style={({pressed}) => [
                styles.locsCard,
                pressed && styles.locsPressed,
              ]}>
              <ImageBackground
                source={locsHero}
                style={styles.locsCardBg}
                imageStyle={styles.locsCardBgImg}>
                <LinearGradient
                  colors={['rgba(0, 0, 0, 0.04)', 'rgba(0, 0, 0, 0.69)']}
                  locations={[0.2, 1]}
                  style={StyleSheet.absoluteFill}
                />
                <View style={styles.locsCardInner}>
                  <View style={{}}>
                    <View style={styles.locsCardTop}>
                      <Text style={styles.locsCardBadge}>
                        {item.badgeEmoji} {item.categoryBadge}
                      </Text>
                    </View>
                    <Text style={styles.locsCardName}>{item.name}</Text>
                    <Text style={styles.locsCardTag} numberOfLines={1}>
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
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  locsRoot: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  locsHeaderPad: {
    paddingBottom: 8,
  },
  locsCount: {
    color: GREY,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.8,

    marginBottom: 4,
    marginTop: 10,
    paddingLeft: 20,
  },
  locsListPad: {
    paddingHorizontal: 20,
    paddingTop: 4,
  },
  locsSep: {
    height: 14,
  },
  locsCard: {
    borderRadius: 22,
    overflow: 'hidden',
    minHeight: 108,
  },
  locsCardBg: {
    flex: 1,
    minHeight: 108,
    justifyContent: 'flex-end',
  },
  locsCardBgImg: {
    borderRadius: 22,
  },
  locsCardInner: {
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locsCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  locsCardBadge: {
    color: GOLD,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  locsChevron: {
    color: WHITE,
    fontSize: 28,
    fontWeight: '300',
    marginTop: -4,
  },
  locsCardName: {
    color: WHITE,
    fontSize: 18,

    fontWeight: '700',
  },
  locsCardTag: {
    marginTop: 6,
    color: '#FFFFFF99',
    fontSize: 11,

    fontWeight: '500',
  },
  locsPressed: {
    opacity: 0.88,
  },
});

function LocationListSeparator() {
  return <View style={styles.locsSep} />;
}

export default LocationListScreen;
