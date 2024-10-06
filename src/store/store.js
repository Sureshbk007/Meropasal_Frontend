import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import storeReducer from "./slices/storeSlice";
import progressReducer from "./slices/progressSlice";

// Middleware to persist cart to localStorage
const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (
    action.type === "cart/addToCart" ||
    action.type === "cart/removeFromCart" ||
    action.type === "cart/changeCartProductQty"
  ) {
    const cartState = store.getState().cart.orders;
    localStorage.setItem("cart", JSON.stringify(cartState));
  }
  return result;
};

// Configure the Redux store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    store: storeReducer,
    progress: progressReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});
