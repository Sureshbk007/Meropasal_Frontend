import { createSlice } from "@reduxjs/toolkit";

const getCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
};

const initialState = {
  orders: getCartFromLocalStorage(),
  isCartOpen: false,
};

// Utility function to find the index of a product based on id, color, and size
const findProductIndex = (orders, { id, color, size }) => {
  return orders.findIndex((order) => {
    const isSameProduct = order.id === id;
    const isSameColor = color ? order.color === color : !order.color;
    const isSameSize = size ? order.size === size : !order.size;

    return isSameProduct && isSameColor && isSameSize;
  });
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Toggle cart open/close state
    toggleCart: (state, action) => {
      state.isCartOpen = action.payload;
    },

    // Add product to cart or update quantity if already exists
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProductIndex = findProductIndex(state.orders, product);
      if (existingProductIndex >= 0) {
        const existingProduct = state.orders[existingProductIndex];
        const newQty = existingProduct.selectedQty + product.selectedQty;
        existingProduct.selectedQty = Math.min(newQty, product.stock);
      } else {
        state.orders.push(product);
      }
    },

    // Remove product from cart or reduce its quantity
    removeFromCart: (state, action) => {
      const product = action.payload;
      const existingProductIndex = findProductIndex(state.orders, product);

      if (existingProductIndex >= 0) {
        const existingProduct = state.orders[existingProductIndex];
        if (existingProduct.selectedQty > 1) {
          existingProduct.selectedQty -= 1;
        } else {
          state.orders.splice(existingProductIndex, 1);
        }
      }

      // Close the cart if it's empty
      if (state.orders.length === 0) {
        state.isCartOpen = false;
      }
    },

    // Change product quantity directly
    changeCartProductQty: (state, action) => {
      const { id, color, size, newQty } = action.payload;
      const existingProductIndex = findProductIndex(state.orders, {
        id,
        color,
        size,
      });

      if (existingProductIndex >= 0) {
        state.orders[existingProductIndex].selectedQty = newQty;
      }
    },
  },
});

export const { toggleCart, addToCart, removeFromCart, changeCartProductQty } =
  cartSlice.actions;

export default cartSlice.reducer;
