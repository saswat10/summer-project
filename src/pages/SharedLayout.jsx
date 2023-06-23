import { NavLink, Outlet } from 'react-router-dom'

const SharedLayout = () => {
	return (
		<>
			<header className='nav-container'>
				<nav className='flex'>
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
				</nav>
			</header>
			<Outlet />
		</>
	)
}
export default SharedLayout
