import { configureStore } from '@reduxjs/toolkit'
import adminAuthReducer from './adminAuthStore'
import cmsReducer from './cmsStore'

export const store = configureStore({
  reducer: {
    adminAuth: adminAuthReducer,
    cms: cmsReducer,
  },
})

export default store
