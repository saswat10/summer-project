import { NavLink, Outlet } from 'react-router-dom'
import {
	HiUserCircle,
	HiOutlineLogout,
	HiOutlinePencil,
	HiClipboard,
	HiAnnotation,
	HiOutlinePencilAlt,
	HiClipboardList,
	HiOutlineUserGroup,
} from 'react-icons/hi'

const SharedLayout = () => {
	return (
		<main className='relative flex bg-slate-200'>
			<aside className='sticky left-0 top-0 h-screen w-60 min-w-[15rem] max-w-sm bg-gray-900 text-slate-100 shadow-black shadow-xl'>
				<div className='grid grid-cols-2 border-b-2 border-slate-700 p-3'>
					<HiUserCircle fill='#ffffff' size='6em' />
					<span className='my-auto'>
						User-123 <br />
						Administrator
					</span>
				</div>
				<nav>
					<ul className='grid'>
					<li>
							<NavLink
								to='/'
								className='flex gap-2 px-14 py-4 hover:border-2 hover:border-slate-800 hover:bg-slate-800'
							>
								<HiOutlineUserGroup size={'1.5em'} />
								Students
							</NavLink>
						</li>
						<li>
							<NavLink
								to='/'
								className='flex gap-2 px-14 py-4 hover:border-2 hover:border-slate-800 hover:bg-slate-800'
							>
								<HiOutlinePencil size={'1.5em'} />
								Create Test
							</NavLink>
						</li>
						<li>
							<NavLink
								to='/write-test'
								className='flex gap-2 px-14 py-4 hover:border-2 hover:border-slate-800 hover:bg-slate-800'
							>
								<HiOutlinePencilAlt size={'1.5em'} />
								Write Test
							</NavLink>
						</li>
						<li>
							<NavLink
								to='/grading'
								className='flex gap-2 px-14 py-4 hover:border-2 hover:border-slate-800 hover:bg-slate-800'
							>
								<HiClipboardList size={'1.5em'} />
								Grading
							</NavLink>
						</li>
						<li>
							<NavLink
								to='/results'
								className='flex gap-2 px-14 py-4 hover:border-2 hover:border-slate-800 hover:bg-slate-800'
							>
								<HiClipboard size={'1.5em'} />
								Results
							</NavLink>
						</li>
						<li>
							<NavLink
								to='/messages'
								className='flex gap-2 px-14 py-4 hover:border-2 hover:border-slate-800 hover:bg-slate-800'
							>
								<HiAnnotation size={'1.5em'} />
								Messages
							</NavLink>
						</li>
					</ul>
				</nav>

				<div className='absolute bottom-4 mx-14 flex gap-2 rounded-sm bg-slate-800 p-2 hover:bg-slate-700'>
					<HiOutlineLogout size='1.5em' className='mx-auto' />
					<span className='my-auto'>Logout</span>
				</div>
			</aside>
			<Outlet />
		</main>
	)
}
export default SharedLayout
