import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customization: {
    bannerImages: [],
    brandLogo: {},
    brandName: "MeroPasal",
    favicon: {},
  },
  categories: [],
  products: [],
};

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.categories = action.payload;
    },
    addProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { addCategory, addProducts } = storeSlice.actions;
export default storeSlice.reducer;
