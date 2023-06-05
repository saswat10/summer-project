import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { toast } from 'react-toastify'

export const loginStudent = createAsyncThunk(
	'user/loginStudent',
	async (user, thunkAPI) => {
		console.log(`Student Login :${JSON.stringify(user)}`)
	}
)

export const loginAdmin = createAsyncThunk(
	'user/loginAdmin',
	async (user, thunkAPI) => {
		console.log(`Administrator Login :${JSON.stringify(user)}`)
	}
)
const initialState = {
	isLoading: false,
	user: null,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
})

export default userSlice.reducer
