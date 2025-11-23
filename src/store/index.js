import { configureStore } from "@reduxjs/toolkit";
import datosReducer from "./datosSlice";

export const store = configureStore({
  reducer: {
    datos: datosReducer
  }
});