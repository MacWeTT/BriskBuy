import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

//Reducers
import userReducer from "./reducers/userSlice";
import cartReducer from "./reducers/cartSlice";
import wishlistReducer from "./reducers/wishlistSlice";

//API Endpoints
import { authAPI } from "./api/authAPI";
import { productAPI } from "./api/productAPI";

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [productAPI.reducerPath]: productAPI.reducer,
});

export const store = configureStore({
  reducer: persistReducer({ key: "root", storage }, rootReducer),
  middleware: [thunk, authAPI.middleware, productAPI.middleware],
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
