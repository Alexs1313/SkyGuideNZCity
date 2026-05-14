import React from 'react';

import {ScrollView, StyleSheet, View} from 'react-native';

const Skguidenzcittylaytt = ({
  children,
  skguidenzcittylayttScroll = true,
  bounce = true,
}: {
  children: React.ReactNode;
  skguidenzcittylayttScroll?: boolean;
  bounce?: boolean;
}) => {
  return (
    <View style={styles.skguidenzcittylayttBackground}>
      {skguidenzcittylayttScroll ? (
        <ScrollView
          bounces={bounce}
          contentContainerStyle={styles.skguidenzcittylayttscrollContent}
          showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      ) : (
        <View style={styles.skguidenzcittylayttFill}>{children}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  skguidenzcittylayttscrollContent: {
    flexGrow: 1,
  },
  skguidenzcittylayttFill: {
    flex: 1,
  },
  skguidenzcittylayttBackground: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
});

export default Skguidenzcittylaytt;
