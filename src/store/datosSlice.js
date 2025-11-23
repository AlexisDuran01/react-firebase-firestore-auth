import { createSlice } from "@reduxjs/toolkit";

const datosSlice = createSlice({
  name: "datos",
  initialState: [],
  reducers: {
    agregarDato: (state, action) => {
      state.push(action.payload);
    }
  }
});

export const { agregarDato } = datosSlice.actions;
export default datosSlice.reducer;
