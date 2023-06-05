import { useState, useEffect } from 'react'
import { FormRow } from '../components'

const initialState = {
	username: '',
	password: '',
	isStudent: true,
}

const Login = () => {
	const [values, setValues] = useState(initialState)

	const handleChange = (e) => {
		console.log(e.target.value)
	}

	const onSubmit = (e) => {
		e.preventDefault()
		console.log(e.target)
	}

	return (
		<main className='grid h-screen bg-gray-100'>
			<form
				className='m-auto grid w-1/4 min-w-fit max-w-xs gap-3 rounded-md bg-white p-5 text-base drop-shadow-lg'
				onSubmit={onSubmit}
			>
				<h1 className='mb-6 text-center text-xl font-semibold uppercase'>
					Login
				</h1>
				<FormRow
					name='Name'
					type='text'
					value={values.username}
					handleChange={handleChange}
				/>
				<FormRow
					name='Password'
					type='password'
					value={values.password}
					handleChange={handleChange}
				/>
				<button
					type='submit'
					className='mx-auto max-w-fit rounded bg-blue-500 px-4 text-center text-white hover:bg-blue-600 focus:bg-blue-600'
				>
					Submit
				</button>
			</form>
		</main>
	)
}

export default Login
