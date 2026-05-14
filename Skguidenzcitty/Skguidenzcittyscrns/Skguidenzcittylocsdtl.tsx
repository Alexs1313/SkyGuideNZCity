import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {
  SKGUIDENZCITTY_LOCS_ITEMS,
  skguidenzcittyLocsById,
  skguidenzcittyLocsHeroForIndex,
} from './skguidenzcittylocsdata';
import {useSkguidenzcittylocsSaved} from './skguidenzcittylocssavedctx';

import type {SkguidenzcittyStackParamList} from '../Skguidenzcittyroute/Skguidenzcittystack';
import Skguidenzcittylaytt from '../Skguidenzcittycompn/Skguidenzcittylaytt';

const GOLD = '#B38D2F';
const GOLD_GRAD_TOP = '#C9A24A';
const GOLD_GRAD_BOTTOM = '#8B6B2A';
const WHITE = '#FFFFFF';
const WHITE_MUTED = 'rgba(255,255,255,0.78)';

function skguidenzcittyLocsFormatCoords(lat: number, lon: number): string {
  const skguidenzcittylocsLatH = lat >= 0 ? 'N' : 'S';
  const skguidenzcittylocsLonH = lon >= 0 ? 'E' : 'W';
  return `${Math.abs(lat).toFixed(4)}° ${skguidenzcittylocsLatH}, ${Math.abs(
    lon,
  ).toFixed(4)}° ${skguidenzcittylocsLonH}`;
}

type SkguidenzcittylocsDtlRoute = RouteProp<
  SkguidenzcittyStackParamList,
  'Skguidenzcittylocsdtl'
>;

const Skguidenzcittylocsdtl = () => {
  const {params} = useRoute<SkguidenzcittylocsDtlRoute>();
  const skguidenzcittylocsNav = useNavigation();
  const skguidenzcittylocsInsets = useSafeAreaInsets();
  const {isSaved, toggleSaved} = useSkguidenzcittylocsSaved();

  const skguidenzcittylocsLoc = useMemo(
    () => skguidenzcittyLocsById(params.locationId),
    [params.locationId],
  );

  const skguidenzcittylocsIndex = useMemo(() => {
    if (!skguidenzcittylocsLoc) {
      return 0;
    }
    return SKGUIDENZCITTY_LOCS_ITEMS.findIndex(
      l => l.id === skguidenzcittylocsLoc.id,
    );
  }, [skguidenzcittylocsLoc]);

  const skguidenzcittylocsHero = skguidenzcittyLocsHeroForIndex(
    skguidenzcittylocsIndex >= 0 ? skguidenzcittylocsIndex : 0,
  );

  if (!skguidenzcittylocsLoc) {
    return (
      <View
        style={[
          styles.skguidenzcittylocsDtlRoot,
          styles.skguidenzcittylocsDtlCenter,
        ]}>
        <Text style={styles.skguidenzcittylocsDtlBody}>
          Location not found.
        </Text>
        <Pressable
          onPress={() => skguidenzcittylocsNav.goBack()}
          style={styles.skguidenzcittylocsDtlBackPill}>
          <Text style={styles.skguidenzcittylocsDtlBackPillText}>Back</Text>
        </Pressable>
      </View>
    );
  }

  const skguidenzcittylocsSavedNow = isSaved(skguidenzcittylocsLoc.id);

  const skguidenzcittylocsShare = () => {
    Share.share({
      title: skguidenzcittylocsLoc.name,
      message: `${skguidenzcittylocsLoc.name}\n${skguidenzcittyLocsFormatCoords(
        skguidenzcittylocsLoc.lat,
        skguidenzcittylocsLoc.lon,
      )}\n\n${skguidenzcittylocsLoc.body}`,
    });
  };

  return (
    <Skguidenzcittylaytt bounce={false}>
      <View
        style={{
          paddingBottom: skguidenzcittylocsInsets.bottom + 20,
        }}>
        <View style={styles.skguidenzcittylocsDtlHeroWrap}>
          <ImageBackground
            source={skguidenzcittylocsHero}
            style={styles.skguidenzcittylocsDtlHero}
            resizeMode="cover">
            <LinearGradient
              colors={['rgba(0, 0, 0, 0.03)', 'rgba(0,0,0,0.85)']}
              locations={[0.35, 1]}
              style={StyleSheet.absoluteFill}
            />
            <View
              style={[
                styles.skguidenzcittylocsDtlHeroTop,
                {paddingTop: skguidenzcittylocsInsets.top + 8},
              ]}>
              <Pressable
                onPress={() => skguidenzcittylocsNav.goBack()}
                style={({pressed}) => [
                  styles.skguidenzcittylocsDtlBackRow,
                  pressed && styles.skguidenzcittylocsDtlPressed,
                ]}>
                <Image
                  source={require('../../assets/i/skguidenzcittytaoback.png')}
                />
                <Text style={styles.skguidenzcittylocsDtlBackTxt}>Back</Text>
              </Pressable>
              <View style={styles.skguidenzcittylocsDtlBadge}>
                <Text style={styles.skguidenzcittylocsDtlBadgeEmoji}>
                  {skguidenzcittylocsLoc.badgeEmoji}
                </Text>
                <Text style={styles.skguidenzcittylocsDtlBadgeTxt}>
                  {skguidenzcittylocsLoc.categoryBadge}
                </Text>
              </View>
            </View>
            <View style={styles.skguidenzcittylocsDtlHeroTitleBlock}>
              <Text style={styles.skguidenzcittylocsDtlTitle}>
                {skguidenzcittylocsLoc.name}
              </Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.skguidenzcittylocsDtlSheet}>
          <View style={styles.skguidenzcittylocsDtlCoordCard}>
            <LinearGradient
              colors={['#B38D2F', '#8B6914']}
              style={styles.skguidenzcittylocsDtlCoordIcon}>
              <Image
                source={require('../../assets/i/skguidenzcittytaloct.png')}
              />
            </LinearGradient>
            <View style={styles.skguidenzcittylocsDtlCoordText}>
              <Text style={styles.skguidenzcittylocsDtlCoordLabel}>
                COORDINATES
              </Text>
              <Text style={styles.skguidenzcittylocsDtlCoordVal}>
                {skguidenzcittyLocsFormatCoords(
                  skguidenzcittylocsLoc.lat,
                  skguidenzcittylocsLoc.lon,
                )}
              </Text>
            </View>
          </View>

          <Text style={styles.skguidenzcittylocsDtlTagline}>
            {skguidenzcittylocsLoc.tagline}
          </Text>
          <Text style={styles.skguidenzcittylocsDtlBody}>
            {skguidenzcittylocsLoc.body}
          </Text>

          <View style={styles.skguidenzcittylocsDtlActions}>
            <Pressable
              onPress={() => toggleSaved(skguidenzcittylocsLoc.id)}
              style={({pressed}) => [
                styles.skguidenzcittylocsDtlSavePress,
                skguidenzcittylocsSavedNow &&
                  styles.skguidenzcittylocsDtlSaveGlow,
                pressed && styles.skguidenzcittylocsDtlPressed,
              ]}>
              {skguidenzcittylocsSavedNow ? (
                <LinearGradient
                  colors={[GOLD_GRAD_TOP, GOLD_GRAD_BOTTOM]}
                  start={{x: 0.5, y: 0}}
                  end={{x: 0.5, y: 1}}
                  style={styles.skguidenzcittylocsDtlSaveGrad}>
                  <Image
                    source={require('../../assets/i/skguidenzcittytasvdd.png')}
                  />
                  <Text style={styles.skguidenzcittylocsDtlSaveTxtOn}>
                    Saved
                  </Text>
                </LinearGradient>
              ) : (
                <View style={styles.skguidenzcittylocsDtlSaveOutline}>
                  <Image
                    source={require('../../assets/i/skguidenzcittytasvd.png')}
                  />
                  <Text style={styles.skguidenzcittylocsDtlSaveTxt}>Save</Text>
                </View>
              )}
            </Pressable>
            <Pressable
              onPress={skguidenzcittylocsShare}
              style={({pressed}) => [
                styles.skguidenzcittylocsDtlShare,
                pressed && styles.skguidenzcittylocsDtlPressed,
              ]}>
              <Image
                source={require('../../assets/i/skguidenzcittytalshr.png')}
              />
              <Text style={styles.skguidenzcittylocsDtlShareTxt}>Share</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Skguidenzcittylaytt>
  );
};

const styles = StyleSheet.create({
  skguidenzcittylocsDtlSaveGlow: {
    shadowColor: GOLD,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.35,
    shadowRadius: 10,

    elevation: 8,
  },

  skguidenzcittylocsDtlRoot: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  skguidenzcittylocsDtlCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  skguidenzcittylocsDtlHeroWrap: {
    width: '100%',
  },
  skguidenzcittylocsDtlHero: {
    width: '100%',
    minHeight: 320,
    justifyContent: 'space-between',
  },
  skguidenzcittylocsDtlHeroTop: {
    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },
  skguidenzcittylocsDtlBackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: 80,
    height: 60,
    justifyContent: 'center',
    borderRadius: 22,
    backgroundColor: '#00000080',
    borderWidth: 1,
    borderColor: '#FFFFFF26',
  },
  skguidenzcittylocsDtlChev: {
    color: WHITE,
    fontSize: 22,
    fontWeight: '600',
    marginRight: 2,
  },
  skguidenzcittylocsDtlBackTxt: {
    color: WHITE,
    fontSize: 17,
    fontWeight: '400',
  },
  skguidenzcittylocsDtlBadge: {
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
  skguidenzcittylocsDtlBadgeEmoji: {
    fontSize: 13,
  },
  skguidenzcittylocsDtlBadgeTxt: {
    color: GOLD,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  skguidenzcittylocsDtlHeroTitleBlock: {
    paddingHorizontal: 20,
    paddingBottom: 22,
  },
  skguidenzcittylocsDtlTitle: {
    color: WHITE,
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  skguidenzcittylocsDtlSheet: {
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  skguidenzcittylocsDtlCoordCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#B38D2F33',
    backgroundColor: '#B38D2F14',
    gap: 14,
  },
  skguidenzcittylocsDtlCoordIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,

    alignItems: 'center',
    justifyContent: 'center',
  },
  skguidenzcittylocsDtlPin: {
    fontSize: 20,
  },
  skguidenzcittylocsDtlCoordText: {
    flex: 1,
  },
  skguidenzcittylocsDtlCoordLabel: {
    color: GOLD,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  skguidenzcittylocsDtlCoordVal: {
    marginTop: 5,
    color: WHITE,
    fontSize: 15,
    fontWeight: '600',
  },
  skguidenzcittylocsDtlTagline: {
    marginTop: 18,
    color: WHITE_MUTED,
    fontSize: 17,
    lineHeight: 24,
    fontStyle: 'italic',
  },
  skguidenzcittylocsDtlBody: {
    marginTop: 16,
    color: '#FFFFFFB8',
    fontSize: 15,
    lineHeight: 23,
  },
  skguidenzcittylocsDtlActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 22,
  },
  skguidenzcittylocsDtlSavePress: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },

  skguidenzcittylocsDtlSaveGrad: {
    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'center',
    gap: 8,
    height: 52,
  },
  skguidenzcittylocsDtlSaveOutline: {
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
  skguidenzcittylocsDtlSaveTxt: {
    color: GOLD,
    fontSize: 16,

    fontWeight: '700',
  },
  skguidenzcittylocsDtlSaveTxtOn: {
    color: WHITE,
    fontSize: 16,

    fontWeight: '800',
  },
  skguidenzcittylocsDtlShare: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: '#FFFFFF0F',
    borderWidth: 1,
    borderColor: '#FFFFFF1F',
  },
  skguidenzcittylocsDtlShareIcon: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '700',
  },
  skguidenzcittylocsDtlShareTxt: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '700',
  },
  skguidenzcittylocsDtlPressed: {
    opacity: 0.88,
  },
  skguidenzcittylocsDtlBackPill: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: GOLD,
  },
  skguidenzcittylocsDtlBackPillText: {
    color: GOLD,
    fontWeight: '700',
  },
});

export default Skguidenzcittylocsdtl;
