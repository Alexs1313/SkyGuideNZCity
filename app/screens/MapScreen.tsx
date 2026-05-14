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
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {LOCATION_FILTER_CHIPS as MAP_FILTER_CHIPS} from '../constants/locationFilters';
import {MAP_FILL, NZ_INITIAL_REGION} from '../constants/map';
import EmojiFilterChipRow from '../components/EmojiFilterChipRow';
import ScreenHeader from '../components/ScreenHeader';
import ScreenLayout from '../components/ScreenLayout';
import type {RootStackParamList} from '../navigation/RootStack';
import {
  LOCATIONS,
  filterLocationsByCategory,
  heroImageForLocationIndex,
} from '../data/locationsData';
import type {
  LocationItem,
  LocationFilter,
} from '../data/locationTypes';

const GOLD = '#B38D2F';
const WHITE = '#FFFFFF';
const GREY = 'rgba(255,255,255,0.45)';

type MainTabParamList = {
  Explore: undefined;
  Saved: undefined;
  Map: undefined;
  Blog: undefined;
  Facts: undefined;
  Quiz: undefined;
};

type MapStackNav = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Map'>,
  StackNavigationProp<RootStackParamList>
>;

const MapScreen = () => {
  const mapNav = useNavigation<MapStackNav>();
  const mapInsets = useSafeAreaInsets();
  const mapRef = useRef<MapView>(null);

  const [mapFilter, setMapFilter] = useState<LocationFilter>('all');
  const [mapSelectedId, setMapSelectedId] = useState<string | null>(null);
  const [mapReady, setMapReady] = useState(false);

  const mapFiltered = useMemo(
    () => filterLocationsByCategory(mapFilter),
    [mapFilter],
  );

  const mapSelected = useMemo(() => {
    if (!mapSelectedId) {
      return undefined;
    }
    return mapFiltered.find(
      l => l.id === mapSelectedId,
    );
  }, [mapFiltered, mapSelectedId]);

  useEffect(() => {
    if (
      mapSelectedId &&
      !mapFiltered.some(l => l.id === mapSelectedId)
    ) {
      setMapSelectedId(null);
    }
  }, [mapFiltered, mapSelectedId]);

  const mapOpenDetail = useCallback(
    (locationId: string) => {
      mapNav.navigate('LocationDetail', {locationId});
    },
    [mapNav],
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        setMapSelectedId(null);
      };
    }, []),
  );

  const mapFitPins = useCallback(() => {
    const mapCoords = mapFiltered.map(l => ({
      latitude: l.lat,
      longitude: l.lon,
    }));
    if (mapCoords.length === 0) {
      return;
    }
    const mapPadBottom = mapSelected ? 130 : 52;
    mapRef.current?.fitToCoordinates(mapCoords, {
      edgePadding: {
        top: 48,
        right: 24,
        bottom: mapPadBottom,
        left: 24,
      },
      animated: true,
    });
  }, [mapFiltered, mapSelected]);

  useEffect(() => {
    if (!mapReady) {
      return;
    }
    let raf1 = 0;
    let raf2 = 0;
    const mapTask = InteractionManager.runAfterInteractions(
      () => {
        raf1 = requestAnimationFrame(() => {
          mapFitPins();
          raf2 = requestAnimationFrame(() => {
            mapFitPins();
          });
        });
      },
    );
    return () => {
      mapTask.cancel();
      if (raf1) {
        cancelAnimationFrame(raf1);
      }
      if (raf2) {
        cancelAnimationFrame(raf2);
      }
    };
  }, [
    mapFilter,
    mapReady,
    mapFitPins,
  ]);

  const mapHero = useCallback((item: LocationItem) => {
    const mapGi = LOCATIONS.findIndex(
      l => l.id === item.id,
    );
    return heroImageForLocationIndex(
      mapGi >= 0 ? mapGi : 0,
    );
  }, []);

  return (
    <ScreenLayout>
      <View style={styles.mapRoot}>
        <View
          style={[
            styles.mapHeader,
            {paddingTop: mapInsets.top + 8},
          ]}>
          <ScreenHeader kicker="INTERACTIVE" title="Map" />

          <EmojiFilterChipRow
            chips={MAP_FILTER_CHIPS}
            selectedId={mapFilter}
            onSelect={id => setMapFilter(id as LocationFilter)}
            variant="compact"
          />
        </View>

        <View
          style={[
            styles.mapBody,
            {paddingBottom: mapInsets.bottom + 96},
          ]}>
          <View style={styles.mapMapOuter}>
            <MapView
              ref={mapRef}
              style={styles.mapMap}
              provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
              userInterfaceStyle="dark"
              initialRegion={NZ_INITIAL_REGION}
              mapType={
                Platform.OS === 'ios' ? 'mutedStandard' : ('standard' as const)
              }
              rotateEnabled={false}
              pitchEnabled={false}
              onMapReady={() => {
                setMapReady(true);
                requestAnimationFrame(() => mapFitPins());
              }}>
              {mapFiltered.map(item => {
                const mapIsSel =
                  item.id === mapSelectedId;
                return (
                  <Marker
                    key={item.id}
                    coordinate={{latitude: item.lat, longitude: item.lon}}
                    anchor={{x: 0.5, y: 1}}
                    zIndex={mapIsSel ? 10 : 1}
                    tracksViewChanges={false}
                    onPress={() => setMapSelectedId(item.id)}>
                    <Image
                      source={
                        mapIsSel
                          ? require('../../assets/i/skguidenzcittpinact.png')
                          : require('../../assets/i/skguidenzcittpin.png')
                      }
                    />
                  </Marker>
                );
              })}
            </MapView>

            <Pressable
              onPress={mapFitPins}
              style={({pressed}) => [
                styles.mapStarBtn,
                pressed && styles.mapPressed,
              ]}
              hitSlop={8}>
              <Image
                source={require('../../assets/i/skguidenzcittytstr.png')}
                style={styles.mapStarImg}
                resizeMode="contain"
              />
            </Pressable>

            <View
              style={[
                styles.mapPinBadge,
                mapSelected &&
                  styles.mapPinBadgeLifted,
              ]}>
              <Text style={styles.mapPinBadgeText}>
                {mapFiltered.length}{' '}
                {mapFiltered.length === 1 ? 'pin' : 'pins'}
              </Text>
            </View>

            {mapSelected ? (
              <Pressable
                onPress={() =>
                  mapOpenDetail(mapSelected.id)
                }
                style={({pressed}) => [
                  styles.mapPreview,
                  pressed && styles.mapPressed,
                ]}>
                <ImageBackground
                  source={mapHero(mapSelected)}
                  style={styles.mapPreviewImg}
                  imageStyle={styles.mapPreviewImgRadius}>
                  <LinearGradient
                    colors={['rgba(0,0,0,0.08)', 'rgba(0,0,0,0.55)']}
                    style={StyleSheet.absoluteFill}
                  />
                </ImageBackground>
                <View style={styles.mapPreviewBody}>
                  <Text style={styles.mapPreviewBadge}>
                    {mapSelected.badgeEmoji}{' '}
                    {mapSelected.categoryBadge}
                  </Text>
                  <Text
                    style={styles.mapPreviewName}
                    numberOfLines={2}>
                    {mapSelected.name}
                  </Text>
                  <Text style={styles.mapPreviewHint}>
                    Tap to see details →
                  </Text>
                </View>
              </Pressable>
            ) : null}
          </View>

          {!mapSelected ? (
            <Text style={styles.mapHint}>
              Tap a pin on the map to see location details
            </Text>
          ) : null}
        </View>
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  mapRoot: {
    flex: 1,
  },
  mapHeader: {
    paddingBottom: 8,
  },
  mapBody: {
    flex: 1,
    minHeight: 0,
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 4,
  },
  mapMapOuter: {
    flex: 1,
    minHeight: 280,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: `${GOLD}99`,
    backgroundColor: MAP_FILL,
  },
  mapMap: {
    ...StyleSheet.absoluteFillObject,
  },
  mapStarBtn: {
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
  mapStarImg: {
    width: 22,
    height: 22,

    tintColor: GOLD,
  },
  mapPinBadge: {
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
  mapPinBadgeLifted: {
    bottom: 112,
  },
  mapPinBadgeText: {
    color: GOLD,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  mapPreview: {
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
  mapPreviewImg: {
    width: 92,
    minHeight: 88,
  },
  mapPreviewImgRadius: {
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  mapPreviewBody: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,

    justifyContent: 'center',
  },
  mapPreviewBadge: {
    color: GOLD,
    fontSize: 10,

    fontWeight: '700',
    letterSpacing: 1,
  },
  mapPreviewName: {
    marginTop: 6,
    color: WHITE,
    fontSize: 16,
    fontWeight: '700',
  },
  mapPreviewHint: {
    marginTop: 6,
    color: '#FFFFFF99',
    fontSize: 11,
    fontWeight: '500',
  },
  mapHint: {
    marginTop: 14,
    textAlign: 'center',
    color: GREY,
    fontSize: 13,
    fontWeight: '400',
  },
  mapPressed: {
    opacity: 0.88,
  },
});

export default MapScreen;
