import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { userTimerApi } from "./services/timer";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import { getMeApi } from "./services/user";
import { getRecords } from "./services/record";

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      getMeApi.middleware,
      userTimerApi.middleware,
      getRecords.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
export default store;
