import { configureStore } from '@reduxjs/toolkit';
import tabReducer from './reducer';

const store = configureStore({
  reducer: tabReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
