import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/uiSlice";
import currenciesReducer from "./slices/currenciesSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    currencies: currenciesReducer,
  },
});

export default store;
