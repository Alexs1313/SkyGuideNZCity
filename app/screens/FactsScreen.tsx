import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {FlatList, Image, Share, StyleSheet, Text, View} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import FactsFilterChips from '../components/FactsFilterChips';
import ScreenHeader from '../components/ScreenHeader';
import ScreenLayout from '../components/ScreenLayout';
import ShareIconButton from '../components/ShareIconButton';
import SurpriseMeButton from '../components/SurpriseMeButton';
import {RANDOM_FACT_CATEGORIES} from '../constants/factsFilters';
import {
  filterFactsByCategory,
  type Fact,
  type FactFilter,
} from '../data/factsData';
import {BG, GOLD, GREY, WHITE} from '../../colors';

const FactsScreen = () => {
  const factsInsets = useSafeAreaInsets();
  const [factsFilter, setFactsFilter] = useState<FactFilter>('all');
  const factsListRef = useRef<FlatList<Fact>>(null);
  const factsRandomScroll = useRef<{
    filter: FactFilter;
    index: number;
  } | null>(null);

  const factsFiltered = useMemo(
    () => filterFactsByCategory(factsFilter),
    [factsFilter],
  );

  const factsCountLabel = useMemo(() => {
    const factsN = factsFiltered.length;
    const factsSuffix =
      factsFilter === 'all' ? 'FACTS' : `${factsFilter.toUpperCase()} FACTS`;
    return `${factsN} ${factsSuffix}`;
  }, [factsFiltered.length, factsFilter]);

  const factsShare = useCallback((item: Fact) => {
    Share.share({
      message: `${item.title}\n\n${item.body}`,
    });
  }, []);

  const factsRandom = useCallback(() => {
    const factsCat =
      RANDOM_FACT_CATEGORIES[
        Math.floor(Math.random() * RANDOM_FACT_CATEGORIES.length)
      ];
    const factsPool = filterFactsByCategory(factsCat);
    if (factsPool.length === 0) {
      return;
    }
    const factsPickIdx = Math.floor(Math.random() * factsPool.length);
    factsRandomScroll.current = {
      filter: factsCat,
      index: factsPickIdx,
    };
    setFactsFilter(factsCat);
  }, []);

  useEffect(() => {
    const factsPending = factsRandomScroll.current;
    if (!factsPending) {
      return;
    }
    if (factsPending.filter !== factsFilter) {
      factsRandomScroll.current = null;
      return;
    }
    const factsIdx = factsPending.index;
    factsRandomScroll.current = null;
    if (factsIdx < 0 || factsIdx >= factsFiltered.length) {
      return;
    }
    const factsRaf = requestAnimationFrame(() => {
      factsListRef.current?.scrollToIndex({
        index: factsIdx,
        animated: true,
        viewPosition: 0.12,
      });
    });
    return () => cancelAnimationFrame(factsRaf);
  }, [factsFiltered, factsFilter]);

  const factsRenderCard = useCallback(
    ({item}: {item: Fact}) => (
      <View style={styles.factsCard}>
        <View style={styles.factsCardTop}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <View style={styles.factsIconRing}>
              <Text style={styles.factsIconEmoji}>{item.iconEmoji}</Text>
            </View>
            <View>
              <View style={styles.factsBadgeRow}>
                <Text style={styles.factsBadgeEmoji}>{item.badgeEmoji}</Text>
                <Text style={styles.factsBadgeText}>{item.categoryBadge}</Text>
              </View>
              <Text style={styles.factsCardTitle}>{item.title}</Text>
            </View>
          </View>

          <ShareIconButton onPress={() => factsShare(item)} />
        </View>

        <Text style={styles.factsCardBody}>{item.body}</Text>
      </View>
    ),
    [factsShare],
  );

  const factsHeader = useMemo(
    () => (
      <>
        <ScreenHeader
          kicker="KNOWLEDGE"
          title="Tourist Facts"
          right={<SurpriseMeButton onPress={factsRandom} />}
        />

        <FactsFilterChips
          filter={factsFilter}
          onFilterChange={setFactsFilter}
        />

        <Text style={styles.factsCount}>{factsCountLabel}</Text>
      </>
    ),
    [factsFilter, factsCountLabel, factsRandom],
  );

  return (
    <ScreenLayout>
      <View style={[styles.factsRoot, {paddingTop: factsInsets.top + 8}]}>
        <FlatList
          ref={factsListRef}
          data={factsFiltered}
          scrollEnabled={false}
          keyExtractor={i => i.id}
          renderItem={factsRenderCard}
          ListHeaderComponent={factsHeader}
          contentContainerStyle={[
            styles.factsListContent,
            {paddingBottom: factsInsets.bottom + 100},
          ]}
          ItemSeparatorComponent={FactsListSeparator}
          showsVerticalScrollIndicator={false}
          onScrollToIndexFailed={({index}) => {
            requestAnimationFrame(() => {
              factsListRef.current?.scrollToIndex({
                index,
                animated: true,
                viewPosition: 0.12,
              });
            });
          }}
        />
      </View>
    </ScreenLayout>
  );
};

function FactsListSeparator() {
  return <View style={styles.factsSep} />;
}

const styles = StyleSheet.create({
  factsRoot: {
    flex: 1,
  },
  factsListContent: {
    paddingTop: 0,
  },

  factsCount: {
    color: GREY,
    fontSize: 11,
    fontWeight: '600',

    letterSpacing: 0.8,
    marginBottom: 6,

    marginTop: 4,

    paddingHorizontal: 20,
  },
  factsSep: {
    height: 14,
  },
  factsCard: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#FFFFFF14',
    backgroundColor: '#FFFFFF0C',
    padding: 16,
    marginHorizontal: 20,
  },
  factsCardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  factsIconRing: {
    width: 36,
    height: 36,
    borderRadius: 10,

    backgroundColor: '#B38D2F1F',
    borderWidth: 1,
    borderColor: '#B38D2F33',

    alignItems: 'center',
    justifyContent: 'center',
  },
  factsIconEmoji: {
    fontSize: 15,
  },
  factsBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  factsBadgeEmoji: {
    fontSize: 12,
  },
  factsBadgeText: {
    color: GOLD,
    fontSize: 10,
    fontWeight: '700',

    letterSpacing: 1,
  },
  factsCardTitle: {
    color: WHITE,
    fontSize: 15,

    fontWeight: '700',
  },
  factsCardBody: {
    color: '#FFFFFFAD',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
});

export default FactsScreen;
