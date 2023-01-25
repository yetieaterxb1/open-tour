import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import type {Tour} from '../api/fetchTours';

type TourProps = {
  tour: Tour;
};

export const TourItem = ({tour}: TourProps): JSX.Element => {
  // const isDarkMode = useColorScheme() === 'dark';

  return (
    <Pressable onPress={() => console.log(tour.id)}>
      <View style={styles.post}>
        {tour.location && (
          <Text style={[styles.postTitle]}>{tour.location.city}</Text>
        )}
        <Text style={[styles.postTitle]}>{tour.price}</Text>
        <Text style={[styles.postTitle]}>{tour.company_name}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  wrapper: {
    flex: 1,
    paddingVertical: 30,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  header: {
    textAlign: 'center',
    textTransform: 'capitalize',
    fontWeight: 'bold',
    fontSize: 30,
    color: '#202c41',
    paddingVertical: 10,
  },
  post: {
    backgroundColor: '#202c41',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  postTitle: {color: '#fff', textTransform: 'capitalize'},
});
