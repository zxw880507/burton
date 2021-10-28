import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import rootReducer from "./reducer";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});
// The store now has redux-thunk added and the Redux DevTools Extension is turned on

export default store;
