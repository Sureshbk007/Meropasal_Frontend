import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [
    {
      id: Date.now(),
      img: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Nike Low Calf shoes",
      color: "red",
      size: "md",
      selectedQty: 1,
      stockQty: 5,
      price: 25000,
    },
  ],
  isCartOpen: false,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart: (state) => {
      if (state.orders.length > 0) state.isCartOpen = !state.isCartOpen;
    },
    addToCart: (state, action) => {
      state.orders.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.orders = state.orders.filter(
        (order) => order.id !== action.payload
      );
      if (state.orders.length <= 0) {
        state.isCartOpen = false;
      }
    },
  },
});

export const { toggleCart, addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
