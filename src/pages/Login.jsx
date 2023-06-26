import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { loginUser } from '../features/userSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { getUserFromLocalStorage } from '../utils/localStorage'

const Login = () => {
	const initialState = {
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
	const { user, isLoading } = useSelector((state) => state.user)
	const dispatch = useDispatch()
	const handleSubmit = (e) => {
		e.preventDefault()
		const { email, password } = values
		if (!email || !password) {
			toast.error('Enter all the values')
			return
		}
		dispatch(loginUser({ email, password }))
		// console.log(user)
	}

	const navigate = useNavigate()
	//useEffect which always checks whether there was a previous user
	useEffect(() => {
		if (getUserFromLocalStorage()) {
			setTimeout(() => {
				getUserFromLocalStorage().user.role==='admin' ? navigate('/teacher') : navigate('/student')
			}, 2000)
		}
	}, [user])

	return (
		<main className='flex center'>
			<section className='container'>
				<h2 className='text-center h-4'>LOGIN</h2>
				<form onSubmit={handleSubmit} className='grid'>
					{/* Email */}
					<label htmlFor='email' className='p-1 h-2 bold'>Email:</label>
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
					<button type='submit' disabled={isLoading} className='btn-primary'>
						Login
					</button>
				</form>
				<br />
				<hr />
				<p className='text-center'>
					Not Registered Yet?
					<br />
					<Link to='/register' className='link'>Register Here</Link>
				</p>
			</section>
		</main>
	)
}
export default Login
