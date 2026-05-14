import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {GOLD, WHITE} from '../../colors';

type ScreenHeaderProps = {
  kicker: string;
  title: string;
  right?: React.ReactNode;
};

const ScreenHeader = ({kicker, title, right}: ScreenHeaderProps) => {
  return (
    <View style={styles.row}>
      <View style={styles.titles}>
        <Text style={styles.kicker}>{kicker}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      {right != null ? right : null}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  titles: {
    flex: 1,
    paddingRight: 12,
  },
  kicker: {
    color: GOLD,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1.2,
  },
  title: {
    marginTop: 4,
    color: WHITE,
    fontSize: 28,
    fontWeight: '700',
  },
});

export default ScreenHeader;
