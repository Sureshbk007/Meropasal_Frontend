import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    setProgress: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setProgress } = progressSlice.actions;
export default progressSlice.reducer;
