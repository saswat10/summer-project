import { Link } from 'react-router-dom'
import { DateTime } from 'luxon'
import { useGetTestsQuery, useDeleteTestMutation } from '../../App/apiSlice'
import { toast } from 'react-hot-toast'

const TestsList = () => {
	const { data: tests, isLoading, isError, error, refetch, isSuccess } = useGetTestsQuery()

	const [deleteTest] = useDeleteTestMutation()
	//handleDelete
	const handleDelete = (id) => {
		deleteTest(id)
			.unwrap()
			.then(() => {
				refetch()
				toast.success('Test Deleted Successfully')
			})
			.catch((response) => {
				toast.error(response.data.msg)
			})
	}

	let content
	if (isLoading) {
		content = <p>Loading</p>
	} else if (isSuccess) {
		const loadedTests = tests.tests.map((tes) => {
			const { _id, name, updatedAt } = tes
			return (
				<div key={_id} className='list-container p-2'>
					<p>
						<span className='bold text-secondary'>Test Name:</span> {name}
					</p>
					<Link to={`/tests/${_id}`} className='link'>
						View Test
					</Link>
					<button type='button' onClick={() => handleDelete(_id)} className='btn-primary'>
						Delete
					</button>
					<p className='text-secondary'>
						Last Modified:{' '}
						<span
							className='italic
					'
						>
							{DateTime.fromISO(updatedAt).toFormat('dd LLL yyyy, T')}
						</span>
					</p>
				</div>
			)
		})
		content = loadedTests
	}
	if (isError) {
		content = <p className='bold text-center'>{error.status}:{error.error} <br /> Check your Internet Connection</p>
	}

	return (
		<main className='flex center' style={{ height: '100%' }}>
			<section className='article'>
				<h1 className='h-5 text-center text-secondary'>TEST LISTS</h1>
				{content}
			</section>
		</main>
	)
}
export default TestsList
