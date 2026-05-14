import {createStackNavigator} from '@react-navigation/stack';
import React, {useMemo, useState} from 'react';

import LoadingScreen from '../components/LoadingScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LocationDetailScreen from '../screens/LocationDetailScreen';
import {
  SavedLocationsContext,
  type SavedLocationsValue,
} from '../screens/savedLocationsContext';
import MainTabs from './MainTabs';

export type RootStackParamList = {
  Loading: undefined;
  Onboarding: undefined;
  MainTabs: undefined;
  LocationDetail: {locationId: string};
};

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = () => {
  const [savedLocationIds, setSavedLocationIds] = useState(
    () => new Set<string>(),
  );

  const savedLocationsValue = useMemo<SavedLocationsValue>(
    () => ({
      isSaved: (id: string) => savedLocationIds.has(id),
      toggleSaved: (id: string) => {
        setSavedLocationIds(prev => {
          const next = new Set(prev);
          if (next.has(id)) {
            next.delete(id);
          } else {
            next.add(id);
          }
          return next;
        });
      },
    }),
    [savedLocationIds],
  );

  return (
    <SavedLocationsContext.Provider value={savedLocationsValue}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
        />
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
        />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen
          name="LocationDetail"
          component={LocationDetailScreen}
          options={{
            cardStyle: {backgroundColor: '#0A0A0A'},
          }}
        />
      </Stack.Navigator>
    </SavedLocationsContext.Provider>
  );
};

export default RootStack;
