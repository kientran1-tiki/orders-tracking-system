import {
  configureStore,
  ThunkAction,
  Action,
  AnyAction,
  Reducer,
  createAction,
} from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import logger from "redux-logger";
import orderReducer from "./orderSlice";
import authReducer from "./authSlice";

const persistConfig = {
  key: "ots",
  storage: storage,
  whitelist: [],
  // whitelist: ["orders"],
};
const reducers = combineReducers({
  auth: authReducer,
  orders: orderReducer,
});

export const resetApp = createAction("auth/logout");
export const resetAppAct = resetApp();

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  return reducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const defaultMiddleware = getDefaultMiddleware({
      serializableCheck: false,
    });

    return defaultMiddleware.concat(logger);
  },
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
