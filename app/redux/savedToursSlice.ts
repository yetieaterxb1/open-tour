import {createSlice} from '@reduxjs/toolkit';
import {Tour} from '../components/TourItem';

export type SavedToursList = {
  savedTours: Tour[];
  loading: boolean;
  error: boolean;
};

const initialState: SavedToursList = {
  savedTours: [],
  loading: false,
  error: false,
};

const savedToursSlice = createSlice({
  name: 'savedTours',
  initialState: initialState,
  reducers: {},
});

export default savedToursSlice.reducer;
