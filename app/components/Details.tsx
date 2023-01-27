import React from 'react';

import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {RootNavigationParamsList} from '../navigation/RootNavigation';
import {addOrRemoveTour} from '../redux/toursSlice';
import {getLocation} from '../utils/getLocation';

import type {MarketPlaceNavigationParamsList} from '../navigation/MarketPlaceNavigation';
import type {RootState} from '../redux/store';
import type {SavedToursNavigationParamsList} from '../navigation/SavedToursNavigation';

type DetailsProps = CompositeScreenProps<
  | NativeStackScreenProps<MarketPlaceNavigationParamsList, 'Details'>
  | NativeStackScreenProps<SavedToursNavigationParamsList, 'Details'>,
  BottomTabScreenProps<RootNavigationParamsList>
>;

export const Details = ({route: {params}}: DetailsProps) => {
  const tour = params.tour;

  const isSaved = useSelector(
    (state: RootState) =>
      state.savedTours.tours.findIndex(savedTour => savedTour.id === tour.id) >
      -1,
  );
  const dispatch = useDispatch();

  const handlePress = () => {
    dispatch(addOrRemoveTour(tour));
  };

  const handleEmail = () => Linking.openURL(`mailto:${tour.email}`);

  const formatedTime = `${tour.date_time.start_time} - ${tour.date_time.end_time} (${tour.date_time.time_zone})`;

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          <Image source={{uri: tour.logo}} style={styles.logo} />
          <Text style={styles.headerTitle}>{tour.company_name}</Text>
          <Text style={styles.headerSubTitle}>
            Amazing tour located in{' '}
            <Text style={styles.headerSubTitleLocation}>
              {getLocation(tour.location)}
            </Text>
          </Text>
        </View>
        <Text style={styles.subTitle}>DETAILS</Text>
        <View style={styles.detailsWrapper}>
          <View>
            <Text style={styles.timeTitle}>TOUR TIME</Text>
            <Text style={styles.time}>{formatedTime}</Text>
          </View>
          <Text style={styles.price}>{tour.price}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handlePress}
          style={isSaved ? styles.removeButton : styles.saveButton}>
          <Text style={styles.buttonText}>{isSaved ? 'REMOVE' : 'SAVE'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleEmail} style={styles.contactButton}>
          <Text style={styles.buttonText}>CONTACT US</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  logo: {
    height: 100,
    width: 100,
    marginTop: 88,
    backgroundColor: '#03e8fc',
    borderRadius: 24,
  },
  headerWrapper: {
    flexDirection: 'column',
    backgroundColor: 'blue',
    width: '100%',
    paddingHorizontal: 24,
    paddingBottom: 24,
    alignItems: 'flex-start',
    borderBottomRightRadius: 60,
  },
  headerTitle: {
    color: 'white',
    fontSize: 40,
    paddingTop: 24,
    fontWeight: '700',
  },
  headerSubTitle: {
    color: 'white',
    fontSize: 18,
    paddingTop: 16,
    paddingBottom: 8,
    fontWeight: '500',
  },
  headerSubTitleLocation: {
    color: 'white',
    fontSize: 18,
    paddingTop: 16,
    paddingBottom: 8,
    fontWeight: '700',
    fontStyle: 'italic',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '800',
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  detailsWrapper: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeTitle: {
    paddingTop: 24,
    fontWeight: '600',
  },
  time: {
    color: 'grey',
  },
  price: {
    color: 'blue',
    fontWeight: '800',
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 24,
  },
  saveButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 48,
    borderRadius: 32,
    backgroundColor: '#24a0ed',
    marginTop: 24,
  },
  removeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 48,
    borderRadius: 32,
    backgroundColor: '#ec243b',
    marginTop: 24,
  },
  contactButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 48,
    borderRadius: 32,
    backgroundColor: '#33b249',
    marginTop: 24,
  },
  buttonText: {
    margin: 8,
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
