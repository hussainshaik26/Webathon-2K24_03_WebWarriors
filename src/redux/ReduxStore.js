import { configureStore } from "@reduxjs/toolkit";
import userAuthorReducer from "./slices/UserAuthorSlice.js";
export const store = configureStore({
  reducer: {
    userAuthorLoginReducer: userAuthorReducer,
  },
});
