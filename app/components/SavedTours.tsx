import React from 'react';

import {useSelector} from 'react-redux';
import {FlatList, StyleSheet} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {TourItem} from './TourItem';

import type {SavedToursNavigationParamsList} from '../navigation/SavedToursNavigation';
import type {RootNavigationParamsList} from '../navigation/RootNavigation';
import type {Tour} from '../api/fetchTours';
import type {RootState} from '../redux/store';

type SavedToursProps = CompositeScreenProps<
  NativeStackScreenProps<SavedToursNavigationParamsList, 'SavedTours'>,
  BottomTabScreenProps<RootNavigationParamsList>
>;

export const SavedTours = ({navigation}: SavedToursProps): JSX.Element => {
  const savedTours = useSelector((state: RootState) => state.savedTours.tours);

  const onPress = (tour: Tour) => {
    navigation.navigate('Details', {tour});
  };

  return (
    <FlatList
      contentContainerStyle={styles.contentContainer}
      data={savedTours}
      renderItem={({item}) => <TourItem tour={item} onPress={onPress} />}
      keyExtractor={item => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 8,
  },
  defaultText: {
    color: '#202c41',
    fontSize: 18,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  loadingMoreText: {
    textAlign: 'center',
    paddingBottom: 8,
  },
  contentContainer: {
    paddingTop: 16,
  },
});
