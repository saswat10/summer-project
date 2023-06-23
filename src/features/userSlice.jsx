import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'

//url from the axios
import customFetch from '../utils/axios'

//imports from local storage
import {
	getUserFromLocalStorage,
	removeUserFromLocalStorage,
	addUserToLocalStorage,
} from '../utils/localStorage'

//initial state of the userSlice
const initialState = {
	isLoading: false,
	user: getUserFromLocalStorage(),
}

//functions for register and login
export const registerUser = createAsyncThunk(
	'auth/register',
	async (user, thunkAPI) => {
		try {
			const resp = await customFetch.post('auth/register', user)
			return resp.data
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.date.msg)
		}
	}
)

export const loginUser = createAsyncThunk(
	'auth/login',
	async (user, thunkAPI) => {
		try {
			const resp = await customFetch.post('auth/login', user)
			return resp.data
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.date.msg)
		}
	}
)

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logoutUser: (state) => {
			state.user = null
			removeUserFromLocalStorage()
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.isLoading = true
			})
			.addCase(loginUser.fulfilled, (state, { payload }) => {
				const user = payload
				state.isLoading = false
				state.user = user
				addUserToLocalStorage(user)
				console.log(payload)
				toast.success(`Welcome ${user.user.name}`)
			})
			.addCase(loginUser.rejected, (state, { payload }) => {
				state.isLoading = false
				console.log({ payload })
			})
			.addCase(registerUser.pending, (state) => {
				state.isLoading = true
			})
			.addCase(registerUser.fulfilled, (state, { payload }) => {
				const user = payload
				state.isLoading = false
				state.user = user
				addUserToLocalStorage(user)
				toast.success(`Hello There ${user.user.name}`)
			})
			.addCase(registerUser.rejected, (state, { payload }) => {
				state.isLoading = false
				toast.error(payload.error)
			})
	},
})

export default userSlice.reducer
export const { logoutUser } = userSlice.actions
