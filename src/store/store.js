import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import dashboardReducer from './dashboardSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      users: userReducer,
      dashboard: dashboardReducer,
    },
  });
};

let store;

if (typeof window === 'undefined') {
  store = makeStore();
} else {
  if (!store) {
    store = makeStore();
  }
}

export { store }; 