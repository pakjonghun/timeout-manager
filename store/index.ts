import { api } from "./services/index";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
export default store;
