import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';

import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useInfiniteQuery} from 'react-query';
import {fetchTours, Tour} from '../api/fetchTours';
import {MarketPlaceNavigationParamsList} from '../navigation/MarketPlaceNavigation';
import {RootNavigationParamsList} from '../navigation/RootNavigation';
import {TourItem} from './TourItem';

type MarketPlaceProps = CompositeScreenProps<
  NativeStackScreenProps<MarketPlaceNavigationParamsList, 'MarketPlace'>,
  BottomTabScreenProps<RootNavigationParamsList>
>;

const itemsPerFetch = 20;

export const MarketPlace = ({navigation}: MarketPlaceProps): JSX.Element => {
  const {data, isLoading, isError, fetchNextPage, isFetchingNextPage} =
    useInfiniteQuery(
      'tours',
      ({pageParam = 1}) => fetchTours(pageParam, itemsPerFetch),
      {
        getNextPageParam: (lastPage, allPages) =>
          lastPage.length === itemsPerFetch ? allPages.length + 1 : undefined,
      },
    );

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.defaultText}>Oops something went wrong</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Text style={styles.defaultText}>Loading...</Text>
      </View>
    );
  }

  const onPress = (tour: Tour) => {
    navigation.navigate('Details', {tour});
  };

  return (
    <FlatList
      contentContainerStyle={styles.contentContainer}
      ListFooterComponent={
        isFetchingNextPage ? (
          <Text style={[styles.loadingMoreText, styles.defaultText]}>
            Loading...
          </Text>
        ) : null
      }
      data={data?.pages.flat()}
      renderItem={({item}) => <TourItem tour={item} onPress={onPress} />}
      keyExtractor={item => item.id.toString()}
      onEndReached={() => {
        if (!isFetchingNextPage) {
          fetchNextPage();
        }
      }}
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
