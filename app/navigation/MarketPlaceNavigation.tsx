import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {MarketPlace} from '../components/MarketPlace';
import {Details} from '../components/Details';
import {Tour} from '../api/fetchTours';
import {getLocation} from '../utils/getLocation';

export type MarketPlaceNavigationParamsList = {
  MarketPlace: undefined;
  Details: {tour: Tour};
};

const Stack = createNativeStackNavigator<MarketPlaceNavigationParamsList>();

export const MarketPlaceNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{presentation: 'modal'}}>
      <Stack.Screen name="MarketPlace" component={MarketPlace} />
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
