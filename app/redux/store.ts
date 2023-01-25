import {combineReducers, configureStore} from '@reduxjs/toolkit';
import savedToursSlice from './savedToursSlice';

const rootReducer = combineReducers({savedTours: savedToursSlice});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({reducer: rootReducer});

export default store;
