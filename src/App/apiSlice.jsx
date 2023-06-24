import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getUserFromLocalStorage } from '../utils/localStorage'

export const apiSlice = createApi({
	tagTypes: ['Tests'],
	refetchOnFocus:true,
	refetchOnReconnect:true,
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:5000/api/v1/',
		prepareHeaders: (headers) => {
			const token = getUserFromLocalStorage().token
			if (token) {
				headers.set('Authorization', `Bearer ${token}`)
			}
			return headers
		},
	}),
	endpoints: (builder) => ({
		getTests: builder.query({
			query: () => '/tests/',
			providesTags: ['Tests'],
		}),
		getTestById: builder.query({
			query: (id) => `/tests/${id}`,
		}),
		createTest: builder.mutation({
			query: (body) => ({
				url: '/tests/',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Tests'],
		}),
		deleteTest: builder.mutation({
			query: (id) => ({
				url: `/tests/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Tests'],
		}),
	}),
})

export const {
	useGetTestsQuery,
	useGetTestByIdQuery,
	useCreateTestMutation,
	useDeleteTestMutation,
} = apiSlice
