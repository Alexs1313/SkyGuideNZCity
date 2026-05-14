import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {
  Image,
  ImageBackground,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import DetailSaveToggleButton from '../components/DetailSaveToggleButton';
import DetailShareLabeledButton from '../components/DetailShareLabeledButton';
import HeroBackRowButton from '../components/HeroBackRowButton';
import OutlineGoldPillButton from '../components/OutlineGoldPillButton';
import ScreenLayout from '../components/ScreenLayout';
import {
  LOCATIONS,
  locationById,
  heroImageForLocationIndex,
} from '../data/locationsData';
import {useSavedLocations} from './savedLocationsContext';

import type {RootStackParamList} from '../navigation/RootStack';

const GOLD = '#B38D2F';
const WHITE = '#FFFFFF';
const WHITE_MUTED = 'rgba(255,255,255,0.78)';

function formatCoords(lat: number, lon: number): string {
  const locsLatH = lat >= 0 ? 'N' : 'S';
  const locsLonH = lon >= 0 ? 'E' : 'W';
  return `${Math.abs(lat).toFixed(4)}° ${locsLatH}, ${Math.abs(
    lon,
  ).toFixed(4)}° ${locsLonH}`;
}

type LocationDetailRoute = RouteProp<
  RootStackParamList,
  'LocationDetail'
>;

const LocationDetailScreen = () => {
  const {params} = useRoute<LocationDetailRoute>();
  const locsNav = useNavigation();
  const locsInsets = useSafeAreaInsets();
  const {isSaved, toggleSaved} = useSavedLocations();

  const locsLoc = useMemo(
    () => locationById(params.locationId),
    [params.locationId],
  );

  const locsIndex = useMemo(() => {
    if (!locsLoc) {
      return 0;
    }
    return LOCATIONS.findIndex(
      l => l.id === locsLoc.id,
    );
  }, [locsLoc]);

  const locsHero = heroImageForLocationIndex(
    locsIndex >= 0 ? locsIndex : 0,
  );

  if (!locsLoc) {
    return (
      <View
        style={[
          styles.locsDtlRoot,
          styles.locsDtlCenter,
        ]}>
        <Text style={styles.locsDtlBody}>
          Location not found.
        </Text>
        <OutlineGoldPillButton onPress={() => locsNav.goBack()} />
      </View>
    );
  }

  const locsSavedNow = isSaved(locsLoc.id);

  const locsShare = () => {
    Share.share({
      title: locsLoc.name,
      message: `${locsLoc.name}\n${formatCoords(
        locsLoc.lat,
        locsLoc.lon,
      )}\n\n${locsLoc.body}`,
    });
  };

  return (
    <ScreenLayout bounce={false}>
      <View
        style={{
          paddingBottom: locsInsets.bottom + 20,
        }}>
        <View style={styles.locsDtlHeroWrap}>
          <ImageBackground
            source={locsHero}
            style={styles.locsDtlHero}
            resizeMode="cover">
            <LinearGradient
              colors={['rgba(0, 0, 0, 0.03)', 'rgba(0,0,0,0.85)']}
              locations={[0.35, 1]}
              style={StyleSheet.absoluteFill}
            />
            <View
              style={[
                styles.locsDtlHeroTop,
                {paddingTop: locsInsets.top + 8},
              ]}>
              <HeroBackRowButton onPress={() => locsNav.goBack()} />
              <View style={styles.locsDtlBadge}>
                <Text style={styles.locsDtlBadgeEmoji}>
                  {locsLoc.badgeEmoji}
                </Text>
                <Text style={styles.locsDtlBadgeTxt}>
                  {locsLoc.categoryBadge}
                </Text>
              </View>
            </View>
            <View style={styles.locsDtlHeroTitleBlock}>
              <Text style={styles.locsDtlTitle}>
                {locsLoc.name}
              </Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.locsDtlSheet}>
          <View style={styles.locsDtlCoordCard}>
            <LinearGradient
              colors={['#B38D2F', '#8B6914']}
              style={styles.locsDtlCoordIcon}>
              <Image
                source={require('../../assets/i/skguidenzcittytaloct.png')}
              />
            </LinearGradient>
            <View style={styles.locsDtlCoordText}>
              <Text style={styles.locsDtlCoordLabel}>
                COORDINATES
              </Text>
              <Text style={styles.locsDtlCoordVal}>
                {formatCoords(
                  locsLoc.lat,
                  locsLoc.lon,
                )}
              </Text>
            </View>
          </View>

          <Text style={styles.locsDtlTagline}>
            {locsLoc.tagline}
          </Text>
          <Text style={styles.locsDtlBody}>
            {locsLoc.body}
          </Text>

          <View style={styles.locsDtlActions}>
            <DetailSaveToggleButton
              saved={locsSavedNow}
              onPress={() => toggleSaved(locsLoc.id)}
            />
            <DetailShareLabeledButton onPress={locsShare} />
          </View>
        </View>
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  locsDtlRoot: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  locsDtlCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  locsDtlHeroWrap: {
    width: '100%',
  },
  locsDtlHero: {
    width: '100%',
    minHeight: 320,
    justifyContent: 'space-between',
  },
  locsDtlHeroTop: {
    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },
  locsDtlBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: GOLD,
    backgroundColor: '#B38D2F33',
  },
  locsDtlBadgeEmoji: {
    fontSize: 13,
  },
  locsDtlBadgeTxt: {
    color: GOLD,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  locsDtlHeroTitleBlock: {
    paddingHorizontal: 20,
    paddingBottom: 22,
  },
  locsDtlTitle: {
    color: WHITE,
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  locsDtlSheet: {
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  locsDtlCoordCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#B38D2F33',
    backgroundColor: '#B38D2F14',
    gap: 14,
  },
  locsDtlCoordIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,

    alignItems: 'center',
    justifyContent: 'center',
  },
  locsDtlCoordText: {
    flex: 1,
  },
  locsDtlCoordLabel: {
    color: GOLD,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  locsDtlCoordVal: {
    marginTop: 5,
    color: WHITE,
    fontSize: 15,
    fontWeight: '600',
  },
  locsDtlTagline: {
    marginTop: 18,
    color: WHITE_MUTED,
    fontSize: 17,
    lineHeight: 24,
    fontStyle: 'italic',
  },
  locsDtlBody: {
    marginTop: 16,
    color: '#FFFFFFB8',
    fontSize: 15,
    lineHeight: 23,
  },
  locsDtlActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 22,
  },
});

export default LocationDetailScreen;
