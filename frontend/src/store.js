import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
// import cartSliceReducer from './slices/cartSlice';
import authReducer from './slices/authSlice'; // add this line
import planIdeasReducer from './slices/planIdeasSlice'; // add this line

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    // cart: cartSliceReducer,
    auth: authReducer, // add this line
    planIdeas: planIdeasReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
