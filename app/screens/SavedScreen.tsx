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

import GoldGradientButton from '../components/GoldGradientButton';
import ScreenLayout from '../components/ScreenLayout';

import type {RootStackParamList} from '../navigation/RootStack';
import {
  LOCATIONS,
  heroImageForLocationIndex,
} from '../data/locationsData';
import type {LocationItem} from '../data/locationTypes';
import {useSavedLocations} from './savedLocationsContext';

const GOLD = '#B38D2F';
const GOLD_GRAD_TOP = '#B38D2F';
const GOLD_GRAD_BOTTOM = '#8B6914';
const WHITE = '#FFFFFF';
const GREY = 'rgba(255,255,255,0.45)';
const BG = '#0A0A0A';

function formatCoordsShort(lat: number, lon: number): string {
  const la = lat >= 0 ? 'N' : 'S';
  const lo = lon >= 0 ? 'E' : 'W';
  return `${Math.abs(lat).toFixed(2)}°${la}, ${Math.abs(lon).toFixed(2)}°${lo}`;
}

type MainTabParamList = {
  Explore: undefined;
  Saved: undefined;
  Map: undefined;
  Blog: undefined;
  Facts: undefined;
  Quiz: undefined;
};

type SavedScreenNav = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Saved'>,
  StackNavigationProp<RootStackParamList>
>;

const SavedScreen = () => {
  const savedNav = useNavigation<SavedScreenNav>();
  const {isSaved, toggleSaved} = useSavedLocations();
  const savedInsets = useSafeAreaInsets();

  const savedItems = useMemo(
    () => LOCATIONS.filter(l => isSaved(l.id)),
    [isSaved],
  );

  const savedOpenDetail = useCallback(
    (locationId: string) => {
      savedNav.navigate('LocationDetail', {locationId});
    },
    [savedNav],
  );

  const savedExplore = useCallback(() => {
    savedNav.navigate('Explore');
  }, [savedNav]);

  if (savedItems.length === 0) {
    return (
      <ScreenLayout>
        <View
          style={[
            styles.savedEmptyRoot,
            {paddingTop: savedInsets.top + 8},
          ]}>
          <View style={styles.savedEmptyHeader}>
            <Text style={styles.savedKicker}>COLLECTION</Text>
            <Text style={styles.savedTitle}>Saved Places</Text>
          </View>

          <View style={styles.savedEmptyCenter}>
            <View style={styles.savedEmptyIconWrap}>
              <Image
                source={require('../../assets/i/skguidenzcittytnosv.png')}
              />
            </View>
            <Text style={styles.savedEmptyHeading}>
              No saved places yet
            </Text>
            <Text style={styles.savedEmptySub}>
              Tap the bookmark icon on any location to save it here for later.
            </Text>
            <GoldGradientButton
              onPress={savedExplore}
              colors={[GOLD_GRAD_TOP, GOLD_GRAD_BOTTOM]}
              containerStyle={styles.savedCtaOuter}
              gradientStyle={styles.savedCtaGrad}>
              <Text style={styles.savedCtaText}>
                Explore Locations
              </Text>
            </GoldGradientButton>
          </View>
        </View>
      </ScreenLayout>
    );
  }

  const savedSub =
    savedItems.length === 1
      ? '1 location saved'
      : `${savedItems.length} locations saved`;

  return (
    <ScreenLayout>
      <View
        style={[
          styles.savedListRoot,
          {paddingTop: savedInsets.top + 8},
        ]}>
        <View style={styles.savedHeader}>
          <Text style={styles.savedKicker}>COLLECTION</Text>
          <Text style={styles.savedTitle}>Saved Places</Text>
          <Text style={styles.savedSub}>
            {savedSub}
          </Text>
        </View>

        <FlatList
          data={savedItems}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          ItemSeparatorComponent={SavedListSeparator}
          contentContainerStyle={[
            styles.savedListPad,
            {paddingBottom: savedInsets.bottom + 100},
          ]}
          renderItem={({item, index}) => (
            <SavedLocationCard
              item={item}
              index={index}
              onOpen={() => savedOpenDetail(item.id)}
              onToggleBookmark={() => toggleSaved(item.id)}
            />
          )}
        />
      </View>
    </ScreenLayout>
  );
};

function SavedLocationCard({
  item,
  index,
  onOpen,
  onToggleBookmark,
}: {
  item: LocationItem;
  index: number;
  onOpen: () => void;
  onToggleBookmark: () => void;
}) {
  const savedGi = LOCATIONS.findIndex(
    l => l.id === item.id,
  );
  const savedHero = heroImageForLocationIndex(
    savedGi >= 0 ? savedGi : index,
  );

  return (
    <Pressable
      onPress={onOpen}
      style={({pressed}) => [
        styles.savedCard,
        pressed && styles.savedPressed,
      ]}>
      <ImageBackground
        source={savedHero}
        style={styles.savedCardBg}
        imageStyle={styles.savedCardBgImg}>
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.04)', 'rgba(0, 0, 0, 0.69)']}
          locations={[0.2, 1]}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.savedCardInner}>
          <View style={styles.savedCardTop}>
            <Text style={styles.savedCardBadge}>
              {item.badgeEmoji} {item.categoryBadge}
            </Text>
          </View>
          <Text style={styles.savedCardName}>{item.name}</Text>
          <Text style={styles.savedCardCoords}>
            {formatCoordsShort(item.lat, item.lon)}
          </Text>
        </View>

        <Pressable
          onPress={onToggleBookmark}
          hitSlop={10}
          style={({pressed}) => [
            styles.savedBmOuter,
            pressed && styles.savedPressed,
          ]}>
          <LinearGradient
            colors={['#00000080', '#00000080']}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            style={styles.savedBmGrad}>
            <Image
              source={require('../../assets/i/skguidenzcittytasvd.png')}
              style={styles.savedBmIcon}
            />
          </LinearGradient>
        </Pressable>
      </ImageBackground>
    </Pressable>
  );
}

function SavedListSeparator() {
  return <View style={styles.savedSep} />;
}

const styles = StyleSheet.create({
  savedEmptyRoot: {
    flex: 1,
    backgroundColor: BG,
    minHeight: '100%',
  },
  savedEmptyHeader: {
    paddingHorizontal: 20,
  },
  savedEmptyCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingBottom: 108,
  },
  savedListRoot: {
    flex: 1,
  },
  savedHeader: {
    paddingHorizontal: 20,

    paddingBottom: 8,
  },
  savedKicker: {
    color: GOLD,

    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1.2,
  },
  savedTitle: {
    marginTop: 4,
    color: WHITE,
    fontSize: 28,

    fontWeight: '700',
  },
  savedSub: {
    marginTop: 6,
    color: '#FFFFFF66',
    fontSize: 13,
    fontWeight: '400',

    marginBottom: 12,
  },
  savedEmptyHeading: {
    marginTop: 22,
    color: WHITE,
    fontSize: 28,
    fontWeight: '700',

    textAlign: 'center',
  },
  savedEmptySub: {
    marginTop: 18,
    color: '#FFFFFF99',
    fontSize: 18,
    lineHeight: 21,
    fontWeight: '400',
    textAlign: 'center',
  },
  savedEmptyIconWrap: {
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
  savedEmptyIconImg: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  savedCtaOuter: {
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
  savedCtaGrad: {
    height: 71,
    alignItems: 'center',
    justifyContent: 'center',
  },
  savedCtaText: {
    color: WHITE,
    fontSize: 16,

    fontWeight: '800',
  },
  savedListPad: {
    paddingHorizontal: 20,
    paddingTop: 4,
  },
  savedSep: {
    height: 14,
  },
  savedCard: {
    borderRadius: 22,
    overflow: 'hidden',

    borderWidth: 1,
    borderColor: '#B38D2F33',
    minHeight: 132,
  },
  savedCardBg: {
    flex: 1,
    minHeight: 132,
    justifyContent: 'center',
  },
  savedCardBgImg: {
    borderRadius: 22,
  },
  savedCardInner: {
    padding: 18,
  },
  savedCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  savedCardBadge: {
    color: GOLD,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  savedBmOuter: {
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#FFFFFF22',
    position: 'absolute',
    right: 11,
    top: 11,
  },
  savedBmGrad: {
    width: 33,
    height: 33,
    alignItems: 'center',
    justifyContent: 'center',
  },
  savedBmIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
  savedCardName: {
    color: WHITE,
    fontSize: 18,
    fontWeight: '700',
  },
  savedCardCoords: {
    marginTop: 6,
    color: '#FFFFFF99',
    fontSize: 11,
    fontWeight: '500',
  },
  savedPressed: {
    opacity: 0.88,
  },
});

export default SavedScreen;
