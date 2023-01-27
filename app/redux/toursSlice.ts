import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Tour} from '../api/fetchTours';

export type ToursList = {
  tours: Tour[];
};

const initialState: ToursList = {
  tours: [],
};

const toursSlice = createSlice({
  name: 'tours',
  initialState: initialState,
  reducers: {
    addOrRemoveTour(state, action: PayloadAction<Tour>) {
      const filteredTours = state.tours.filter(
        tour => tour.id !== action.payload.id,
      );

      // if lengths are equal we don't have this tour and want to add it
      if (filteredTours.length === state.tours.length) {
        state.tours = [...state.tours, action.payload];
      } else {
        state.tours = filteredTours;
      }
    },
  },
});

export const {addOrRemoveTour} = toursSlice.actions;
export default toursSlice.reducer;
