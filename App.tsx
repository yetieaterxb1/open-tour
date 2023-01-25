/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {QueryClient, QueryClientProvider} from 'react-query';
import {MarketPlace} from './app/components/MarketPlace';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const queryClient = new QueryClient();

const Tab = createBottomTabNavigator();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="MarketPlace" component={MarketPlace} />
          {/* <Tab.Screen name="Saved" component={SettingsScreen} /> */}
        </Tab.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
