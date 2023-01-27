import {TourLocation} from '../api/fetchTours';

export const getLocation = (location: TourLocation) => {
  if (location.city && location.state) {
    return `${location.city}, ${location.state}`;
  }

  return `${location.city}`;
};
