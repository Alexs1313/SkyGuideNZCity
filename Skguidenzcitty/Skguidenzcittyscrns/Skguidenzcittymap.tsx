import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Image,
  ImageBackground,
  InteractionManager,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Skguidenzcittylaytt from '../Skguidenzcittycompn/Skguidenzcittylaytt';
import type {SkguidenzcittyStackParamList} from '../Skguidenzcittyroute/Skguidenzcittystack';
import {
  SKGUIDENZCITTY_LOCS_ITEMS,
  skguidenzcittyLocsFilterItems,
  skguidenzcittyLocsHeroForIndex,
} from './skguidenzcittylocsdata';
import type {
  SkguidenzcittyLocEntry,
  SkguidenzcittyLocsFilter,
} from './skguidenzcittylocstypes';

const GOLD = '#B38D2F';
const WHITE = '#FFFFFF';
const GREY = 'rgba(255,255,255,0.45)';
const MAP_FILL = '#0D1520';

const NZ_INITIAL_REGION = {
  latitude: -41.2,
  longitude: 172.5,
  latitudeDelta: 5.5,
  longitudeDelta: 9,
};

type SkguidenzcittyTabParamList = {
  Skguidenzcittylocs: undefined;
  Skguidenzcittysaved: undefined;
  Skguidenzcittymap: undefined;
  Skguidenzcittyblog: undefined;
  Skguidenzcittyfccts: undefined;
  Skguidenzcittyquiz: undefined;
};

type SkguidenzcittyMapNav = CompositeNavigationProp<
  BottomTabNavigationProp<SkguidenzcittyTabParamList, 'Skguidenzcittymap'>,
  StackNavigationProp<SkguidenzcittyStackParamList>
>;

const SKGUIDENZCITTY_MAP_FILTERS: {
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

const Skguidenzcittymap = () => {
  const skguidenzcittymapNav = useNavigation<SkguidenzcittyMapNav>();
  const skguidenzcittymapInsets = useSafeAreaInsets();
  const skguidenzcittymapRef = useRef<MapView>(null);

  const [skguidenzcittymapFilter, setSkguidenzcittymapFilter] =
    useState<SkguidenzcittyLocsFilter>('all');
  const [skguidenzcittymapSelectedId, setSkguidenzcittymapSelectedId] =
    useState<string | null>(null);
  const [skguidenzcittymapReady, setSkguidenzcittymapReady] = useState(false);

  const skguidenzcittymapFiltered = useMemo(
    () => skguidenzcittyLocsFilterItems(skguidenzcittymapFilter),
    [skguidenzcittymapFilter],
  );

  const skguidenzcittymapSelected = useMemo(() => {
    if (!skguidenzcittymapSelectedId) {
      return undefined;
    }
    return skguidenzcittymapFiltered.find(
      l => l.id === skguidenzcittymapSelectedId,
    );
  }, [skguidenzcittymapFiltered, skguidenzcittymapSelectedId]);

  useEffect(() => {
    if (
      skguidenzcittymapSelectedId &&
      !skguidenzcittymapFiltered.some(l => l.id === skguidenzcittymapSelectedId)
    ) {
      setSkguidenzcittymapSelectedId(null);
    }
  }, [skguidenzcittymapFiltered, skguidenzcittymapSelectedId]);

  const skguidenzcittymapOpenDetail = useCallback(
    (locationId: string) => {
      skguidenzcittymapNav.navigate('Skguidenzcittylocsdtl', {locationId});
    },
    [skguidenzcittymapNav],
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        setSkguidenzcittymapSelectedId(null);
      };
    }, []),
  );

  const skguidenzcittymapFitPins = useCallback(() => {
    const skguidenzcittymapCoords = skguidenzcittymapFiltered.map(l => ({
      latitude: l.lat,
      longitude: l.lon,
    }));
    if (skguidenzcittymapCoords.length === 0) {
      return;
    }
    const skguidenzcittymapPadBottom = skguidenzcittymapSelected ? 130 : 52;
    skguidenzcittymapRef.current?.fitToCoordinates(skguidenzcittymapCoords, {
      edgePadding: {
        top: 48,
        right: 24,
        bottom: skguidenzcittymapPadBottom,
        left: 24,
      },
      animated: true,
    });
  }, [skguidenzcittymapFiltered, skguidenzcittymapSelected]);

  useEffect(() => {
    if (!skguidenzcittymapReady) {
      return;
    }
    let raf1 = 0;
    let raf2 = 0;
    const skguidenzcittymapTask = InteractionManager.runAfterInteractions(
      () => {
        raf1 = requestAnimationFrame(() => {
          skguidenzcittymapFitPins();
          raf2 = requestAnimationFrame(() => {
            skguidenzcittymapFitPins();
          });
        });
      },
    );
    return () => {
      skguidenzcittymapTask.cancel();
      if (raf1) {
        cancelAnimationFrame(raf1);
      }
      if (raf2) {
        cancelAnimationFrame(raf2);
      }
    };
  }, [
    skguidenzcittymapFilter,
    skguidenzcittymapReady,
    skguidenzcittymapFitPins,
  ]);

  const skguidenzcittymapHero = useCallback((item: SkguidenzcittyLocEntry) => {
    const skguidenzcittymapGi = SKGUIDENZCITTY_LOCS_ITEMS.findIndex(
      l => l.id === item.id,
    );
    return skguidenzcittyLocsHeroForIndex(
      skguidenzcittymapGi >= 0 ? skguidenzcittymapGi : 0,
    );
  }, []);

  return (
    <Skguidenzcittylaytt>
      <View style={styles.skguidenzcittymapRoot}>
        <View
          style={[
            styles.skguidenzcittymapHeader,
            {paddingTop: skguidenzcittymapInsets.top + 8},
          ]}>
          <View style={styles.skguidenzcittymapHeaderTitles}>
            <Text style={styles.skguidenzcittymapKicker}>INTERACTIVE</Text>
            <Text style={styles.skguidenzcittymapTitle}>Map</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.skguidenzcittymapChipsRow}>
            {SKGUIDENZCITTY_MAP_FILTERS.map(chip => {
              const skguidenzcittymapChipOn =
                skguidenzcittymapFilter === chip.id;
              return (
                <Pressable
                  key={chip.id}
                  onPress={() => setSkguidenzcittymapFilter(chip.id)}
                  style={({pressed}) => [
                    styles.skguidenzcittymapChip,
                    skguidenzcittymapChipOn && styles.skguidenzcittymapChipOn,
                    pressed && styles.skguidenzcittymapPressed,
                  ]}>
                  <Text style={styles.skguidenzcittymapChipEmoji}>
                    {chip.emoji}
                  </Text>
                  <Text
                    style={[
                      styles.skguidenzcittymapChipLabel,
                      skguidenzcittymapChipOn &&
                        styles.skguidenzcittymapChipLabelOn,
                    ]}>
                    {chip.label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <View
          style={[
            styles.skguidenzcittymapBody,
            {paddingBottom: skguidenzcittymapInsets.bottom + 96},
          ]}>
          <View style={styles.skguidenzcittymapMapOuter}>
            <MapView
              ref={skguidenzcittymapRef}
              style={styles.skguidenzcittymapMap}
              provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
              userInterfaceStyle="dark"
              initialRegion={NZ_INITIAL_REGION}
              mapType={
                Platform.OS === 'ios' ? 'mutedStandard' : ('standard' as const)
              }
              rotateEnabled={false}
              pitchEnabled={false}
              onMapReady={() => {
                setSkguidenzcittymapReady(true);
                requestAnimationFrame(() => skguidenzcittymapFitPins());
              }}>
              {skguidenzcittymapFiltered.map(item => {
                const skguidenzcittymapIsSel =
                  item.id === skguidenzcittymapSelectedId;
                return (
                  <Marker
                    key={item.id}
                    coordinate={{latitude: item.lat, longitude: item.lon}}
                    anchor={{x: 0.5, y: 1}}
                    zIndex={skguidenzcittymapIsSel ? 10 : 1}
                    tracksViewChanges={false}
                    onPress={() => setSkguidenzcittymapSelectedId(item.id)}>
                    <Image
                      source={
                        skguidenzcittymapIsSel
                          ? require('../../assets/i/skguidenzcittpinact.png')
                          : require('../../assets/i/skguidenzcittpin.png')
                      }
                    />
                  </Marker>
                );
              })}
            </MapView>

            <Pressable
              onPress={skguidenzcittymapFitPins}
              style={({pressed}) => [
                styles.skguidenzcittymapStarBtn,
                pressed && styles.skguidenzcittymapPressed,
              ]}
              hitSlop={8}>
              <Image
                source={require('../../assets/i/skguidenzcittytstr.png')}
                style={styles.skguidenzcittymapStarImg}
                resizeMode="contain"
              />
            </Pressable>

            <View
              style={[
                styles.skguidenzcittymapPinBadge,
                skguidenzcittymapSelected &&
                  styles.skguidenzcittymapPinBadgeLifted,
              ]}>
              <Text style={styles.skguidenzcittymapPinBadgeText}>
                {skguidenzcittymapFiltered.length}{' '}
                {skguidenzcittymapFiltered.length === 1 ? 'pin' : 'pins'}
              </Text>
            </View>

            {skguidenzcittymapSelected ? (
              <Pressable
                onPress={() =>
                  skguidenzcittymapOpenDetail(skguidenzcittymapSelected.id)
                }
                style={({pressed}) => [
                  styles.skguidenzcittymapPreview,
                  pressed && styles.skguidenzcittymapPressed,
                ]}>
                <ImageBackground
                  source={skguidenzcittymapHero(skguidenzcittymapSelected)}
                  style={styles.skguidenzcittymapPreviewImg}
                  imageStyle={styles.skguidenzcittymapPreviewImgRadius}>
                  <LinearGradient
                    colors={['rgba(0,0,0,0.08)', 'rgba(0,0,0,0.55)']}
                    style={StyleSheet.absoluteFill}
                  />
                </ImageBackground>
                <View style={styles.skguidenzcittymapPreviewBody}>
                  <Text style={styles.skguidenzcittymapPreviewBadge}>
                    {skguidenzcittymapSelected.badgeEmoji}{' '}
                    {skguidenzcittymapSelected.categoryBadge}
                  </Text>
                  <Text
                    style={styles.skguidenzcittymapPreviewName}
                    numberOfLines={2}>
                    {skguidenzcittymapSelected.name}
                  </Text>
                  <Text style={styles.skguidenzcittymapPreviewHint}>
                    Tap to see details →
                  </Text>
                </View>
              </Pressable>
            ) : null}
          </View>

          {!skguidenzcittymapSelected ? (
            <Text style={styles.skguidenzcittymapHint}>
              Tap a pin on the map to see location details
            </Text>
          ) : null}
        </View>
      </View>
    </Skguidenzcittylaytt>
  );
};

const styles = StyleSheet.create({
  skguidenzcittymapRoot: {
    flex: 1,
  },
  skguidenzcittymapHeader: {
    paddingBottom: 8,
  },
  skguidenzcittymapHeaderTitles: {
    paddingHorizontal: 20,
  },
  skguidenzcittymapKicker: {
    color: GOLD,
    fontSize: 13,

    fontWeight: '600',
    letterSpacing: 1.2,
  },
  skguidenzcittymapTitle: {
    marginTop: 4,
    color: WHITE,
    fontSize: 28,
    fontWeight: '700',
  },
  skguidenzcittymapChipsRow: {
    paddingVertical: 16,
    gap: 10,
    paddingRight: 20,
    paddingLeft: 20,

    marginBottom: 4,
  },
  skguidenzcittymapChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,

    borderRadius: 12,
    borderWidth: 1,

    borderColor: '#FFFFFF1F',
    backgroundColor: '#FFFFFF0F',
  },
  skguidenzcittymapChipOn: {
    backgroundColor: GOLD,
    borderColor: GOLD,
  },
  skguidenzcittymapChipEmoji: {
    fontSize: 12,
  },
  skguidenzcittymapChipLabel: {
    color: '#FFFFFFA6',
    fontSize: 13,
    fontWeight: '600',
  },
  skguidenzcittymapChipLabelOn: {
    color: '#FFFFFF',
  },
  skguidenzcittymapBody: {
    flex: 1,
    minHeight: 0,
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 4,
  },
  skguidenzcittymapMapOuter: {
    flex: 1,
    minHeight: 280,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: `${GOLD}99`,
    backgroundColor: MAP_FILL,
  },
  skguidenzcittymapMap: {
    ...StyleSheet.absoluteFillObject,
  },
  skguidenzcittymapStarBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: `${GOLD}CC`,
    backgroundColor: '#00000066',

    alignItems: 'center',
    justifyContent: 'center',
  },
  skguidenzcittymapStarImg: {
    width: 22,
    height: 22,

    tintColor: GOLD,
  },
  skguidenzcittymapPinBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: `${GOLD}AA`,
    backgroundColor: '#00000099',
  },
  skguidenzcittymapPinBadgeLifted: {
    bottom: 112,
  },
  skguidenzcittymapPinBadgeText: {
    color: GOLD,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  skguidenzcittymapPreview: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
    minHeight: 88,
    flexDirection: 'row',
    alignItems: 'stretch',
    borderRadius: 16,
    overflow: 'hidden',

    borderWidth: 1,
    borderColor: `${GOLD}88`,
    backgroundColor: '#0A0A0A',
  },
  skguidenzcittymapPreviewImg: {
    width: 92,
    minHeight: 88,
  },
  skguidenzcittymapPreviewImgRadius: {
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  skguidenzcittymapPreviewBody: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,

    justifyContent: 'center',
  },
  skguidenzcittymapPreviewBadge: {
    color: GOLD,
    fontSize: 10,

    fontWeight: '700',
    letterSpacing: 1,
  },
  skguidenzcittymapPreviewName: {
    marginTop: 6,
    color: WHITE,
    fontSize: 16,
    fontWeight: '700',
  },
  skguidenzcittymapPreviewHint: {
    marginTop: 6,
    color: '#FFFFFF99',
    fontSize: 11,
    fontWeight: '500',
  },
  skguidenzcittymapHint: {
    marginTop: 14,
    textAlign: 'center',
    color: GREY,
    fontSize: 13,
    fontWeight: '400',
  },
  skguidenzcittymapPressed: {
    opacity: 0.88,
  },
});

export default Skguidenzcittymap;
