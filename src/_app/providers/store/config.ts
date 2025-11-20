import { configureStore } from "@reduxjs/toolkit"
import {api} from '@/shared/api'

export const createStore = (preloadedState?: unknown) => {
  return configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
    },
    preloadedState,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
      serializableCheck: true
    })
    .concat(api.middleware),
  })
}

export type RootState = ReturnType<ReturnType<typeof createStore>['getState']>
export type AppDispatch = ReturnType<typeof createStore>['dispatch']