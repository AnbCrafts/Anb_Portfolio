import { configureStore } from '@reduxjs/toolkit'
import portfolioReducer from './Store/portfolioStore'

export const store = configureStore({
  reducer: {
    portfolio: portfolioReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store
