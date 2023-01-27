import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {SavedTours} from '../components/SavedTours';
import {Details} from '../components/Details';
import {Tour} from '../api/fetchTours';
import {getLocation} from '../utils/getLocation';

export type SavedToursNavigationParamsList = {
  SavedTours: undefined;
  Details: {tour: Tour};
};

const Stack = createNativeStackNavigator<SavedToursNavigationParamsList>();

export const SavedToursNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{presentation: 'modal'}}>
      <Stack.Screen name="SavedTours" component={SavedTours} />
      <Stack.Screen
        name="Details"
        component={Details}
        options={({route}) => ({
          title: getLocation(route.params.tour.location),
          headerStyle: {backgroundColor: 'blue'},
          headerShadowVisible: false,
          headerTintColor: '#fff',
        })}
      />
    </Stack.Navigator>
  );
};
