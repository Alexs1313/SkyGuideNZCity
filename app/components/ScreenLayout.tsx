import React from 'react';

import {ScrollView, StyleSheet, View} from 'react-native';

const ScreenLayout = ({
  children,
  layoutScroll = true,
  bounce = true,
}: {
  children: React.ReactNode;
  layoutScroll?: boolean;
  bounce?: boolean;
}) => {
  return (
    <View style={styles.layoutBackground}>
      {layoutScroll ? (
        <ScrollView
          bounces={bounce}
          contentContainerStyle={styles.layoutscrollContent}
          showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      ) : (
        <View style={styles.layoutFill}>{children}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  layoutscrollContent: {
    flexGrow: 1,
  },
  layoutFill: {
    flex: 1,
  },
  layoutBackground: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
});

export default ScreenLayout;
