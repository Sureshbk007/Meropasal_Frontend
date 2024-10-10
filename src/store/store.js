import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import progressReducer from "./slices/progressSlice";

// Middleware to persist to localStorage
const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (
    action.type === "cart/addToCart" ||
    action.type === "cart/removeFromCart" ||
    action.type === "cart/clearCartProducts" ||
    action.type === "cart/changeCartProductQty"
  ) {
    const cartState = store.getState().cart.orders;
    localStorage.setItem("cart", JSON.stringify(cartState));
  }

  // Handle login action
  if (action.type === "auth/login") {
    const userState = store.getState().auth.user;
    localStorage.setItem("user", JSON.stringify(userState));
  }

  return result;
};

// Configure the Redux store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    progress: progressReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});
