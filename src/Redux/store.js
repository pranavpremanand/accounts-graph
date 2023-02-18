import { configureStore } from "@reduxjs/toolkit";
import accountsSlice from "./accountsSlice";

const store = configureStore({
  reducer: {
    data: accountsSlice,
  },
});

export default store;
