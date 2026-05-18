import React from 'react';

import {ScrollView, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

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
    <LinearGradient
      colors={['rgb(44, 39, 39)', 'rgb(20, 18, 18)']}
      style={styles.layoutBackground}>
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
    </LinearGradient>
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
