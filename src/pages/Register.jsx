import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { registerUser } from '../features/userSlice'

const Register = () => {
	const initialState = {
		name: '',
		email: '',
		password: '',
	}
	// useState for handling the form values
	const [values, setValues] = useState(initialState)

	//function for handling the changes
	const handleChange = (e) => {
		const name = e.target.name
		const value = e.target.value
		setValues({ ...values, [name]: value })
		// console.log(value)
	}

	//function to handle the submit
	const dispatch = useDispatch()
	const handleSubmit = (e) => {
		e.preventDefault()
		const { name, email, password } = values
		if (!name || !email || !password) {
			console.log('Enter all the values')
			return
		}
		dispatch(registerUser({ name, email, password }))
		// console.log(user)
	}
	return (
		<main className='flex center'>
			<section className='container'>
				<h2 className='h-4 text-center'>REGISTER</h2>
				<form onSubmit={handleSubmit} className='grid'>
					{/* Name */}
					<label htmlFor='name' className='p-1 h-2 bold'>
						Name:
					</label>
					<input
						type='text'
						id='name'
						name='name'
						value={values.name}
						onChange={handleChange}
						required
						autoComplete='off'
						className='input'
						
					/>

					{/* Email */}
					<label htmlFor='email' className='p-1 h-2 bold'>
						Email:
					</label>
					<input
						type='email'
						id='email'
						name='email'
						value={values.email}
						onChange={handleChange}
						required
						autoComplete='off'
						className='input'
					/>
					{/* Password */}
					<label htmlFor='password' className='p-1 h-2 bold'>Password:</label>
					<input
						type='password'
						id='password'
						name='password'
						value={values.password}
						onChange={handleChange}
						autoComplete='off'
						required
						className='input'
					/>

					<br />
					{/* Submit Button */}
					<button type='submit' className='btn-primary'>Register</button>
				</form>
				<br />
				<hr />
				<p className='text-center'>
					Already Registered?<br />
					<Link to='/login' className='link'>Login Here</Link>
				</p>
			</section>
		</main>
	)
}
export default Register
