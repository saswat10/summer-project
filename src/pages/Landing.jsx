import { NavLink } from 'react-router-dom'

const Landing = () => {
	return (
		<main className='flex'>
			<div className=' grid h-screen w-1/2 bg-gray-900 uppercase text-white'>
				<div className='m-auto'>
					<h1 className='text-5xl font-semibold'>Welcome To</h1>
					<h1 className='text-7xl font-bold'>The Test Portal</h1>
				</div>
			</div>
			<div className='m-auto grid h-auto gap-2'>
				<NavLink
					to='/admin'
					className='mx-auto min-w-[8rem] rounded-md bg-blue-500 p-1 text-center text-white hover:bg-blue-600'
				>
					Administrator
				</NavLink>
				<NavLink
					to='/admin'
					className='mx-auto min-w-[8rem] rounded-md bg-blue-500 p-1 text-center text-white hover:bg-blue-600'
				>
					Student
				</NavLink>
			</div>
		</main>
	)
}
export default Landing
