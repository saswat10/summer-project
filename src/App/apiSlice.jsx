import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getUserFromLocalStorage } from '../utils/localStorage'

export const apiSlice = createApi({
	tagTypes: ['Tests', 'Results'],
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://test-portal-spz3.onrender.com//api/v1',
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
			refetchOnFocus: true,
			refetchOnReconnect: true,
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
		updateTest: builder.mutation({
			query: ({ id, body }) => ({
				url: `/tests/${id}`,
				method: 'PATCH',
				body: body,
			}),
			invalidatesTags: ['Tests'],
		}),
		singleResult: builder.mutation({
			query: ({ id, singleStudentAnswers }) => ({
				url: `/results/cal-single-result/${id}`,
				method: 'POST',
				body: {singleStudentAnswers},
			}),
		}),
	}),
})

export const {
	useGetTestsQuery,
	useGetTestByIdQuery,
	useCreateTestMutation,
	useDeleteTestMutation,
	useSingleResultMutation,
	useUpdateTestMutation,
} = apiSlice
