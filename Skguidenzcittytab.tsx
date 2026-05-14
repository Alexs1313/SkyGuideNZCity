import Pshskylinetwrrsmap from './Pshskylinetwrrs/Pshskylinetwrrsscrns/Pshskylinetwrrsmap';
import Pshskylinetwrrsarchtct from './Pshskylinetwrrs/Pshskylinetwrrsscrns/Pshskylinetwrrsarchtct';
import Pshskylinetwrrsfccts from './Pshskylinetwrrs/Pshskylinetwrrsscrns/Pshskylinetwrrsfccts';

import Pshskylinetwrrsquzz from './Pshskylinetwrrs/Pshskylinetwrrsscrns/Pshskylinetwrrsquzz';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import React, {useRef} from 'react';
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
  type ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Skguidenzcittylocs from './Skguidenzcitty/Skguidenzcittyscrns/Skguidenzcittylocs';
import Skguidenzcittysaved from './Skguidenzcitty/Skguidenzcittyscrns/Skguidenzcittysaved';
import Skguidenzcittymap from './Skguidenzcitty/Skguidenzcittyscrns/Skguidenzcittymap';
import Skguidenzcittyblog from './Skguidenzcitty/Skguidenzcittyscrns/Skguidenzcittyblog';
import Skguidenzcittyfccts from './Skguidenzcitty/Skguidenzcittyscrns/Skguidenzcittyfccts';
import Skguidenzcittyquiz from './Skguidenzcitty/Skguidenzcittyscrns/Skguidenzcittyquiz';

const Tab = createBottomTabNavigator();

const SkguidenzcittytabAnimatedButton = (props: Record<string, unknown>) => {
  const {children, style, onPress, onLongPress, ...rest} = props;
  const skguidenzcittytabScale = useRef(new Animated.Value(1)).current;

  const skguidenzcittytabHandlePressIn = () => {
    Animated.spring(skguidenzcittytabScale, {
      toValue: 0.88,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const av = new Animated.Value(0);
  av.addListener(() => {
    return;
  });

  const skguidenzcittytabHandlePressOut = () => {
    Animated.spring(skguidenzcittytabScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 8,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress as () => void}
      onLongPress={onLongPress as (() => void) | undefined}
      onPressIn={skguidenzcittytabHandlePressIn}
      onPressOut={skguidenzcittytabHandlePressOut}
      style={[style as ViewStyle, styles.skguidenzcittytabButton]}
      {...rest}>
      <Animated.View
        style={[
          styles.skguidenzcittytabButtonInner,
          {transform: [{scale: skguidenzcittytabScale}]},
        ]}>
        {children as React.ReactNode}
      </Animated.View>
    </Pressable>
  );
};

const SkguidenzcittytabIcon = ({
  focused,
  source,
  label,
}: {
  focused: boolean;
  source: ImageSourcePropType;
  label: string;
}) => {
  return (
    <View style={styles.skguidenzcittytabIconWrap}>
      <View style={styles.skguidenzcittytabIconImageWrap}>
        <Image source={source} tintColor={focused ? '#B38D2F' : '#FFFFFF4D'} />
      </View>

      <Text
        style={[
          styles.skguidenzcittytabLabel,
          focused
            ? styles.skguidenzcittytabLabelFocused
            : styles.skguidenzcittytabLabelIdle,
        ]}>
        {label}
      </Text>
    </View>
  );
};

const skguidenzcittytabBarBackground = () => (
  <LinearGradient
    pointerEvents="none"
    colors={['#0A0A0AF5', '#0A0A0AF5']}
    style={StyleSheet.absoluteFill}
  />
);

const skguidenzcittytabIconPlaces = ({focused}: {focused: boolean}) => (
  <SkguidenzcittytabIcon
    focused={focused}
    label="Explore"
    source={require('./assets/i/skguidenzcittytab1.png')}
  />
);

const skguidenzcittytabIconSaved = ({focused}: {focused: boolean}) => (
  <SkguidenzcittytabIcon
    focused={focused}
    label="Saved"
    source={require('./assets/i/skguidenzcittytab2.png')}
  />
);

const skguidenzcittytabIconMap = ({focused}: {focused: boolean}) => (
  <SkguidenzcittytabIcon
    focused={focused}
    label="Map"
    source={require('./assets/i/skguidenzcittytab3.png')}
  />
);

const skguidenzcittytabIconBlog = ({focused}: {focused: boolean}) => (
  <SkguidenzcittytabIcon
    focused={focused}
    label="Blog"
    source={require('./assets/i/skguidenzcittytab4.png')}
  />
);

const skguidenzcittytabIconFacts = ({focused}: {focused: boolean}) => (
  <SkguidenzcittytabIcon
    focused={focused}
    label="Facts"
    source={require('./assets/i/skguidenzcittytab5.png')}
  />
);

const skguidenzcittytabIconQuiz = ({focused}: {focused: boolean}) => (
  <SkguidenzcittytabIcon
    focused={focused}
    label="Quiz"
    source={require('./assets/i/skguidenzcittytab6.png')}
  />
);

const skguidenzcittytabButton = (props: Record<string, unknown>) => (
  <SkguidenzcittytabAnimatedButton {...props} />
);

const Skguidenzcittytab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [styles.skguidenzcittytabBar],
        tabBarActiveTintColor: '#FFFFFF',
        tabBarButton: skguidenzcittytabButton,
        tabBarBackground: skguidenzcittytabBarBackground,
      }}>
      <Tab.Screen
        name="Skguidenzcittylocs"
        component={Skguidenzcittylocs}
        options={{
          tabBarIcon: skguidenzcittytabIconPlaces,
        }}
      />
      <Tab.Screen
        name="Skguidenzcittysaved"
        component={Skguidenzcittysaved}
        options={{
          tabBarIcon: skguidenzcittytabIconSaved,
        }}
      />
      <Tab.Screen
        name="Skguidenzcittymap"
        component={Skguidenzcittymap}
        options={{
          tabBarIcon: skguidenzcittytabIconMap,
        }}
      />
      <Tab.Screen
        name="Skguidenzcittyblog"
        component={Skguidenzcittyblog}
        options={{
          tabBarIcon: skguidenzcittytabIconBlog,
        }}
      />
      <Tab.Screen
        name="Skguidenzcittyfccts"
        component={Skguidenzcittyfccts}
        options={{
          tabBarIcon: skguidenzcittytabIconFacts,
        }}
      />
      <Tab.Screen
        name="Skguidenzcittyquiz"
        component={Skguidenzcittyquiz}
        options={{
          tabBarIcon: skguidenzcittytabIconQuiz,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  skguidenzcittytabIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },

  skguidenzcittytabLabelFocused: {
    color: '#B38D2F',
    fontSize: 9,
    fontWeight: '600',
    marginTop: 6,
    textAlign: 'center',
  },

  skguidenzcittytabBar: {
    elevation: 0,
    paddingTop: 10,
    justifyContent: 'center',
    position: 'absolute',
    paddingHorizontal: 6,
    borderColor: '#B38D2F33',
    borderTopWidth: 1,
    borderTopColor: '#B38D2F33',
    backgroundColor: 'transparent',
    height: 80,
    paddingBottom: 24,
    overflow: 'hidden',
  },

  skguidenzcittytabButton: {
    flex: 1,
  },
  skguidenzcittytabButtonInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  skguidenzcittytabIconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 55,
  },
  skguidenzcittytabIconImageWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  skguidenzcittytabLabel: {
    fontSize: 9,
    fontWeight: '600',
    marginTop: 6,
    textAlign: 'center',
  },

  skguidenzcittytabLabelIdle: {
    color: '#FFFFFF59',
  },
});

export default Skguidenzcittytab;
