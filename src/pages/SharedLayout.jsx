import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { removeUserFromLocalStorage } from '../utils/localStorage'

const SharedLayout = () => {
	const navigate = useNavigate()
	const handleLogout = () => {
		removeUserFromLocalStorage()
		navigate('/login')
	}
	return (
		<>
			<header className='nav-container'>
				<nav className='grid' style={{ gridTemplateColumns: '7fr 1fr' }}>
					<ul className=''>
						<NavLink to='/' className='nav-link'>
							Home
						</NavLink>
						<NavLink to='/create-test' className='nav-link'>
							Test
						</NavLink>
						<NavLink to='/profile' className='nav-link'>
							Profile
						</NavLink>
						<NavLink to='/results' className='nav-link'>
							Results
						</NavLink>
					</ul>
					<p className='nav-link text-center' onClick={handleLogout} >
						LOGOUT
					</p>
				</nav>
			</header>
			<Outlet />
		</>
	)
}
export default SharedLayout
