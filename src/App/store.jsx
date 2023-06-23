import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../features/userSlice'
import testsReducer from '../features/testsSlice'

export const store = configureStore({
	reducer: {
		user: userSlice,
		tests: testsReducer,
	},
})
