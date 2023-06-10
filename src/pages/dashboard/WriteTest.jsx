const WriteTest = () => {
	return (
		<section className='p-4 text-slate-950'>
			<h2 className='text-4xl font-semibold uppercase '>Write Test</h2>
			<hr className='my-2 border-[0.5px] border-gray-400' />

			<div className='grid grid-cols-3 gap-2 '>
				<div className='rounded-md bg-green-600 p-2 text-center text-white'>
					See All Tests
				</div>
				<div className='rounded-md bg-sky-600 p-2 text-center text-white'>
					Upcoming Tests
				</div>
				<div className='rounded-md bg-red-600 p-2 text-center text-white'>
					Missed Tests
				</div>
			</div>
		</section>
	)
}
export default WriteTest
