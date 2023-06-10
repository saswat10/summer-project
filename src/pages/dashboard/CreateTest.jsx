import { NavLink, Outlet } from "react-router-dom"

const CreateTest = () => {
	return (
		<section className='p-4 text-slate-950'>
			<h2 className='text-4xl font-semibold uppercase '>Create Test</h2>
			<hr className='my-2 border-[0.5px] border-gray-400' />

			<div className='grid grid-cols-3 gap-2 '>
				<NavLink to='/new-test' className='rounded-md bg-green-600 p-2 text-white text-center'>
					Create New Test
				</NavLink>
				<NavLink className='rounded-md bg-sky-600 p-2 text-white text-center'>
					Previous Tests
				</NavLink>
				<NavLink className='rounded-md bg-yellow-600 p-2 text-white text-center'>Drafts</NavLink>
			</div>
      <Outlet/>
		</section>
	)
}
export default CreateTest
