import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import React from 'react';
import {Image, StyleSheet, Text, View, type ImageSourcePropType} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import ExploreScreen from '../screens/ExploreScreen';
import SavedScreen from '../screens/SavedScreen';
import MapScreen from '../screens/MapScreen';
import BlogScreen from '../screens/BlogScreen';
import FactsScreen from '../screens/FactsScreen';
import QuizScreen from '../screens/QuizScreen';

const Tab = createBottomTabNavigator();

const TabBarIcon = ({
  focused,
  source,
  label,
}: {
  focused: boolean;
  source: ImageSourcePropType;
  label: string;
}) => {
  return (
    <View style={styles.tabIconWrap}>
      <View style={styles.tabIconImageWrap}>
        <Image source={source} tintColor={focused ? '#B38D2F' : '#FFFFFF4D'} />
      </View>

      <Text
        style={[
          styles.tabLabel,
          focused
            ? styles.tabLabelFocused
            : styles.tabLabelIdle,
        ]}>
        {label}
      </Text>
    </View>
  );
};

const tabBarBackground = () => (
  <LinearGradient
    pointerEvents="none"
    colors={['#0A0A0AF5', '#0A0A0AF5']}
    style={StyleSheet.absoluteFill}
  />
);

const tabIconPlaces = ({focused}: {focused: boolean}) => (
  <TabBarIcon
    focused={focused}
    label="Explore"
    source={require('../../assets/i/skguidenzcittytab1.png')}
  />
);

const tabIconSaved = ({focused}: {focused: boolean}) => (
  <TabBarIcon
    focused={focused}
    label="Saved"
    source={require('../../assets/i/skguidenzcittytab2.png')}
  />
);

const tabIconMap = ({focused}: {focused: boolean}) => (
  <TabBarIcon
    focused={focused}
    label="Map"
    source={require('../../assets/i/skguidenzcittytab3.png')}
  />
);

const tabIconBlog = ({focused}: {focused: boolean}) => (
  <TabBarIcon
    focused={focused}
    label="Blog"
    source={require('../../assets/i/skguidenzcittytab4.png')}
  />
);

const tabIconFacts = ({focused}: {focused: boolean}) => (
  <TabBarIcon
    focused={focused}
    label="Facts"
    source={require('../../assets/i/skguidenzcittytab5.png')}
  />
);

const tabIconQuiz = ({focused}: {focused: boolean}) => (
  <TabBarIcon
    focused={focused}
    label="Quiz"
    source={require('../../assets/i/skguidenzcittytab6.png')}
  />
);

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [styles.tabBar],
        tabBarActiveTintColor: '#FFFFFF',
        tabBarBackground: tabBarBackground,
      }}>
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: tabIconPlaces,
        }}
      />
      <Tab.Screen
        name="Saved"
        component={SavedScreen}
        options={{
          tabBarIcon: tabIconSaved,
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: tabIconMap,
        }}
      />
      <Tab.Screen
        name="Blog"
        component={BlogScreen}
        options={{
          tabBarIcon: tabIconBlog,
        }}
      />
      <Tab.Screen
        name="Facts"
        component={FactsScreen}
        options={{
          tabBarIcon: tabIconFacts,
        }}
      />
      <Tab.Screen
        name="Quiz"
        component={QuizScreen}
        options={{
          tabBarIcon: tabIconQuiz,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabLabelFocused: {
    color: '#B38D2F',
    fontSize: 9,
    fontWeight: '600',
    marginTop: 6,
    textAlign: 'center',
  },

  tabBar: {
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

  tabIconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 55,
  },
  tabIconImageWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabLabel: {
    fontSize: 9,
    fontWeight: '600',
    marginTop: 6,
    textAlign: 'center',
  },

  tabLabelIdle: {
    color: '#FFFFFF59',
  },
});

export default MainTabs;
