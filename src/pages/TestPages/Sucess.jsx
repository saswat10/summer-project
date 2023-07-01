import { Link } from 'react-router-dom'
import { getUserFromLocalStorage } from '../../utils/localStorage'

const Success = () => {
	let location
	if (getUserFromLocalStorage().user.role === 'admin') location = '/teacher'
	else location = '/student'
	return (
		<section className='grid center'>
			<div className='p-3 h-4 text-center'>Test Submitted Successfully</div>
			<Link to={location} className='text-center link'>
				Back To Home
			</Link>
		</section>
	)
}
export default Success
