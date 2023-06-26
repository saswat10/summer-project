import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { removeUserFromLocalStorage } from '../utils/localStorage'
import { useEffect, useState } from 'react'
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'

const getStorageTheme = () => {
	let theme = 'light-theme'
	if (localStorage.getItem('theme')) {
		theme = localStorage.getItem('theme')
	}
	return theme
}

const SharedLayout = () => {
	const navigate = useNavigate()
	const handleLogout = () => {
		removeUserFromLocalStorage()
		navigate('/')
	}

	const [theme, setTheme] = useState(getStorageTheme)

	useEffect(() => {
		document.documentElement.className = theme
		localStorage.setItem('theme', theme)
	}, [theme])

	const handleMode = () => {
		if (theme === 'light-theme') {
			setTheme('dark-theme')
		} else {
			setTheme('light-theme')
		}
	}
	return (
		<>
			<header className='nav-container bold'>
				<nav className='grid' style={{ gridTemplateColumns: '7fr 1fr' }}>
					<ul className=''>
						<NavLink to='/teacher' className='nav-link'>
							Home
						</NavLink>
						<NavLink to='/teacher/create-test' className='nav-link'>
							Create
						</NavLink>
						<NavLink to='/student' className='nav-link'>
							Exam
						</NavLink>
						<NavLink to='/results' className='nav-link'>
							Results
						</NavLink>
					</ul>
					<div className='flex'>
						<picture className='nav-link' onClick={handleMode}  style={{paddingTop:'3px'}}>
							{theme === 'dark-theme' ? <BsFillMoonFill /> : <BsFillSunFill />}
						</picture>
						<p className='nav-link text-center' onClick={handleLogout} style={{marginLeft:'40px'}}>
							Logout
						</p>
					</div>
				</nav>
			</header>
			<Outlet />
		</>
	)
}
export default SharedLayout
