import {configureStore} from '@reduxjs/toolkit';
import balanceReducer from './userBalance';
export const store = configureStore({
  reducer: {
    user: balanceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
