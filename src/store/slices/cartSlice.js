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
    toggleCart: (state, action) => {
      state.isCartOpen = action.payload;
    },

    addToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.orders.find(
        (order) => order.id === product.id
      );

      if (existingProduct) {
        const newQty = existingProduct.selectedQty + product.selectedQty;
        existingProduct.selectedQty = newQty > 5 ? 5 : newQty;
      } else {
        state.orders.push(product);
      }
    },

    removeFromCart: (state, action) => {
      state.orders = state.orders.filter(
        (order) => order.id !== action.payload
      );
      if (state.orders.length <= 0) {
        state.isCartOpen = false;
        state.orders = [];
      }
    },

    changeCartProductQty: (state, action) => {
      const { id, selectedQty } = action.payload;
      const product = state.orders.find((item) => item.id === id);
      if (product) {
        product.selectedQty = +selectedQty;
      }
    },
  },
});

export const { toggleCart, addToCart, removeFromCart, changeCartProductQty } =
  cartSlice.actions;

export default cartSlice.reducer;
