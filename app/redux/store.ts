import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import savedToursReducer from './toursSlice';
import {reduxStorage} from './persistedStorage';

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({savedTours: savedToursReducer});

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
