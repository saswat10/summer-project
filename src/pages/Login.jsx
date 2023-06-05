import { useState, useEffect } from 'react'
import { FormRow } from '../components'
import { toast } from 'react-toastify'

const initialState = {
	username: '',
	password: '',
	isStudent: true,
}

const Login = () => {
	const [values, setValues] = useState(initialState)

	const handleChange = (e) => {
		const name = e.target.name
		const value = e.target.value
		setValues({ ...values, [name]: value })
	}

	const onSubmit = (e) => {
		e.preventDefault()
		const { username, password } = values
		if (!username || !password) {
			toast.info('Please fill out all the fields')
		}
	}
	const toggleMember = () => {
		setValues({ ...values, isStudent: !values.isStudent })
	}

	return (
		<main className='grid h-screen bg-gray-200'>
			<form
				className='m-auto grid w-1/4 min-w-fit max-w-xs gap-3 rounded-md bg-white p-5 text-base drop-shadow-lg'
				onSubmit={onSubmit}
			>
				<h1 className='mb-6 text-center text-xl font-semibold uppercase'>
					{values.isStudent ? 'Student Login' : 'Administrator Login'}
				</h1>
				<FormRow
					labelText='Username'
					name='username'
					type='text'
					value={values.username}
					handleChange={handleChange}
				/>
				<FormRow
					labelText='Password'
					name='password'
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
				<p className='text-center '>
					{values.isStudent
						? 'For Administrator Login : '
						: 'For Student Login : '}
					<button className='font-medium text-blue-500' onClick={toggleMember}>
						Click Here
					</button>
				</p>
			</form>
		</main>
	)
}

export default Login
