import React from 'react';

import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

import type {Tour} from '../api/fetchTours';
import {getLocation} from '../utils/getLocation';

type TourProps = {
  tour: Tour;
  onPress: (tour: Tour) => void;
};

export const TourItem = ({tour, onPress}: TourProps): JSX.Element => {
  return (
    <Pressable onPress={() => onPress(tour)}>
      <View style={styles.card}>
        <Image source={{uri: tour.logo}} style={styles.logo} />
        <View style={styles.infoColumn}>
          <Text style={styles.location}>{getLocation(tour.location)}</Text>
          <Text style={styles.date}>{`${tour.date_time.date}`}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{tour.price}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 8,
    padding: 16,
    marginBottom: 16,
    borderRadius: 16,
    flexDirection: 'row',
    height: 88,
  },
  location: {
    fontWeight: '600',
  },
  date: {
    color: '#808080',
  },
  infoColumn: {
    justifyContent: 'space-around',
    paddingLeft: 8,
    flex: 1,
  },
  price: {
    fontWeight: '600',
    fontSize: 12,
  },
  priceContainer: {
    alignSelf: 'center',
    borderRadius: 24,
    borderColor: '#80808080',
    borderWidth: 1,
    padding: 4,
  },
  logo: {height: 56, width: 56},
});
