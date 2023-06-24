import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../features/userSlice'
import { apiSlice } from './apiSlice'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

export const store = configureStore({
	reducer: {
		user: userSlice,
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
})

setupListeners(store.dispatch)