import { screenFillingCircleStore } from "@/animations/screen-filling-circle";
import { configureStore } from "@reduxjs/toolkit";

import { api } from "@/shared/api";

import { userSlice } from "@/entities/user";

export const createStore = (preloadedState?: unknown) => {
  return configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      [userSlice.reducerPath]: userSlice.reducer,
      [screenFillingCircleStore.reducerPath]: screenFillingCircleStore.reducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: true,
      }).concat(api.middleware),
  });
};
export type RootState = ReturnType<ReturnType<typeof createStore>["getState"]>;
export type AppDispatch = ReturnType<typeof createStore>["dispatch"];
