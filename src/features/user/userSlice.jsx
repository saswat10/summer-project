import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import customFetch from '../../utils/axios'
import { toast } from 'react-toastify'
import {
	addUserToLocalStorage,
	getUserFromLocalStorage,
	removeUserFromLocalStorage
} from '../../utils/localStorage'

export const loginStudent = createAsyncThunk(
	'user/loginStudent',
	async (user, thunkAPI) => {
		try {
			const resp = await customFetch.post('auth/studentLogin', user)
			return resp.data
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.msg)
		}
	}
)

export const loginAdmin = createAsyncThunk(
	'user/loginAdmin',
	async (user, thunkAPI) => {
		try {
			const resp = await customFetch.post('auth/adminLogin', user)
			return resp.data
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.msg)
		}
	}
)
const initialState = {
	isLoading: false,
	user: getUserFromLocalStorage(),
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(loginStudent.pending, (state) => {
				state.isLoading = true
			})
			.addCase(loginStudent.fulfilled, (state, { payload }) => {
				const { user } = payload
				state.isLoading = false
				state.user = user
				addUserToLocalStorage(user)
				toast.success(`Welcome back ${user.name}`)
			})
			.addCase(loginStudent.rejected, (state, { payload }) => {
				state.isLoading = false
				toast.error(payload)
			})
			.addCase(loginAdmin.pending, (state) => {
				state.isLoading = true
			})
			.addCase(loginAdmin.fulfilled, (state, { payload }) => {
				const { user } = payload
				state.isLoading = false
				state.user = user
				addUserToLocalStorage(user)
				toast.success(`Welcome back ${user.name}`)
			})
			.addCase(loginAdmin.rejected, (state, { payload }) => {
				state.isLoading = false
				toast.error(payload)
			})
	},
})

export default userSlice.reducer
