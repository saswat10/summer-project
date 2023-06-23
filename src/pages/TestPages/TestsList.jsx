import { useSelector } from 'react-redux'
import {
	selectAllTest,
	selectTestsError,
	selectTestsStatus,
} from '../../features/testsSlice'
import { Link } from 'react-router-dom'
import { DateTime } from 'luxon'

const TestsList = () => {
	const tests = useSelector(selectAllTest)
	const status = useSelector(selectTestsStatus)
	const error = useSelector(selectTestsError)

	let content
	if (status === 'loading') {
		content = <p>Loading</p>
	} else if (status === 'success') {
		const loadedTests = tests.map((test) => {
			const { _id, name, updatedAt } = test
			return (
				<div key={_id} className='list-container p-2'>
					<p><span className="bold text-secondary">Test Name:</span> {name}</p>
					<Link to={`/tests/${_id}`} className='link'>
						View Test
					</Link>
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
	} else if (status === 'failed') {
		content = <p>{error}</p>
	}

	return (
		<main className='flex center' style={{ height: '100%' }}>
			<section className='article'>
				<h1 className='h-5 text-center text-secondary'>TEST LISTS</h1>
				<button
					type='button'
					onClick={() => window.location.reload()}
					className='btn-primary'
				>
					Refresh
				</button>

				{content}
			</section>

			{console.log(tests)}
		</main>
	)
}
export default TestsList
