import React from 'react';

import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useInfiniteQuery} from 'react-query';
import {fetchTours} from '../api/fetchTours';
import {TourItem} from './TourItem';

const itemsPerFetch = 20;

export const MarketPlace = (): JSX.Element => {
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

  return (
    <FlatList
      ListFooterComponent={
        isFetchingNextPage ? (
          <Text style={[styles.loadingMoreText, styles.defaultText]}>
            Loading...
          </Text>
        ) : null
      }
      data={data?.pages.flat()}
      renderItem={({item}) => <TourItem tour={item} />}
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
});
