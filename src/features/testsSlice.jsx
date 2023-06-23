import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import customFetch from '../utils/axios'
import { getUserFromLocalStorage } from '../utils/localStorage'
import { toast } from 'react-hot-toast'

const initialState = {
	tests: [],
	status: 'idle', //idle, loading, success, failed
	error: null,
}

//fetch all the tests
export const fetchAllTests = createAsyncThunk(
	'tests/fetchAllTests',
	async () => {
		const response = await customFetch.get('/tests/', {
			headers: {
				Authorization: `Bearer ${getUserFromLocalStorage().token}`,
			},
		})
		console.log(response.data.tests)
		return response.data
	}
)

//delete the test
export const deleteTestById = createAsyncThunk(
	'tests/deleteTestById',
	async (test) => {
		const { testId } = test
		try {
			const response = await customFetch.delete(`/tests/${testId}`, {
				headers: {
					Authorization: `Bearer ${getUserFromLocalStorage().token}`,
				},
			})
			return response
		} catch (error) {
			return error.message
		}
	}
)

//create the test
export const createTest = createAsyncThunk(
	'tests/createTest',
	async (tests, thunkAPI) => {
		try {
			const response = await customFetch.post('/tests/', tests, {
				headers: {
					Authorization: `Bearer ${getUserFromLocalStorage().token}`,
				},
			})
			return response.data
		} catch (error) {
			// toast.error(error.message)
			return thunkAPI.rejectWithValue(error.message)
		}
	}
)

export const testsSlice = createSlice({
	name: 'tests',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllTests.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(fetchAllTests.fulfilled, (state, action) => {
				state.status = 'success'
				const questions = action.payload
				console.log(questions)
				// state.tests = { tests: questions.tests }
				state.tests = state.tests.concat(questions.tests)
			})
			.addCase(fetchAllTests.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
			.addCase(deleteTestById.fulfilled, (state, action) => {
				toast.success('Test Deleted Successfully')
			})
			.addCase(createTest.fulfilled, (state, action) => {
				console.log(action.payload)
				state.tests = state.tests.concat(action.payload)
				toast.success('Test Created Successfully')
			})
	},
})

export default testsSlice.reducer

export const selectAllTest = (state) => state.tests.tests
export const selectTestsStatus = (state) => state.tests.status
export const selectTestsError = (state) => state.tests.error
