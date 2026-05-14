import {createStackNavigator} from '@react-navigation/stack';
import React, {useMemo, useState} from 'react';

import Skguidenzcittyloadd from '../Skguidenzcittycompn/Skguidenzcittyloadd.tsx';
import Skguidenzcittyonbrd from '../Skguidenzcittyscrns/Skguidenzcittyonbrd.tsx';
import Skguidenzcittylocsdtl from '../Skguidenzcittyscrns/Skguidenzcittylocsdtl.tsx';
import {
  SkguidenzcittylocsSavedContext,
  type SkguidenzcittylocsSavedCtx,
} from '../Skguidenzcittyscrns/skguidenzcittylocssavedctx';
import Skguidenzcittytab from '../../Skguidenzcittytab.tsx';

export type SkguidenzcittyStackParamList = {
  Skguidenzcittyloadd: undefined;
  Skguidenzcittyonbrd: undefined;
  Skguidenzcittytab: undefined;
  Skguidenzcittylocsdtl: {locationId: string};
};

const Stack = createStackNavigator<SkguidenzcittyStackParamList>();

const Skguidenzcittystack = () => {
  const [skguidenzcittylocsSavedSet, setSkguidenzcittylocsSavedSet] = useState(
    () => new Set<string>(),
  );

  const skguidenzcittylocsSavedValue = useMemo<SkguidenzcittylocsSavedCtx>(
    () => ({
      isSaved: (id: string) => skguidenzcittylocsSavedSet.has(id),
      toggleSaved: (id: string) => {
        setSkguidenzcittylocsSavedSet(prev => {
          const skguidenzcittylocsNext = new Set(prev);
          if (skguidenzcittylocsNext.has(id)) {
            skguidenzcittylocsNext.delete(id);
          } else {
            skguidenzcittylocsNext.add(id);
          }
          return skguidenzcittylocsNext;
        });
      },
    }),
    [skguidenzcittylocsSavedSet],
  );

  return (
    <SkguidenzcittylocsSavedContext.Provider value={skguidenzcittylocsSavedValue}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Skguidenzcittyloadd"
          component={Skguidenzcittyloadd}
        />
        <Stack.Screen
          name="Skguidenzcittyonbrd"
          component={Skguidenzcittyonbrd}
        />
        <Stack.Screen name="Skguidenzcittytab" component={Skguidenzcittytab} />
        <Stack.Screen
          name="Skguidenzcittylocsdtl"
          component={Skguidenzcittylocsdtl}
          options={{
            cardStyle: {backgroundColor: '#0A0A0A'},
          }}
        />
      </Stack.Navigator>
    </SkguidenzcittylocsSavedContext.Provider>
  );
};

export default Skguidenzcittystack;
