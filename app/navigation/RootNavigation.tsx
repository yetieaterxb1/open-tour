import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {
  MarketPlaceNavigation,
  MarketPlaceNavigationParamsList,
} from './MarketPlaceNavigation';
import {NavigatorScreenParams} from '@react-navigation/native';
import {
  SavedToursNavigation,
  SavedToursNavigationParamsList,
} from './SavedToursNavigation';

export type RootNavigationParamsList = {
  MarketPlaceNavigation: NavigatorScreenParams<MarketPlaceNavigationParamsList>;
  SavedToursNavigation: NavigatorScreenParams<SavedToursNavigationParamsList>;
};

const Tab = createBottomTabNavigator<RootNavigationParamsList>();

export const RootNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="MarketPlaceNavigation"
        component={MarketPlaceNavigation}
        options={{title: 'MarketPlace'}}
      />
      <Tab.Screen
        name="SavedToursNavigation"
        component={SavedToursNavigation}
        options={{title: 'SavedTours'}}
      />
    </Tab.Navigator>
  );
};
