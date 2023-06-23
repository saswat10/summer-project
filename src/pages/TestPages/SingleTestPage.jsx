import { useDispatch, useSelector } from 'react-redux'
import { deleteTestById, selectAllTest } from '../../features/testsSlice'
import { Link, useParams } from 'react-router-dom'

const SingleTestPage = () => {
	const { testId } = useParams()
	const tests = useSelector(selectAllTest)
	const singleTest = tests.find(({ _id }) => _id === testId)
	const dispatch = useDispatch()

	//handleDelete
	const handleDelete = () => {
		console.log('delete')
		dispatch(deleteTestById({ testId: testId }))
		setTimeout(() => window.location.reload(), 5000)
	}

	const { _id, name, questions } = singleTest

	if (!singleTest) {
		return (
			<main className='flex center' style={{ height: '100%' }}>
				<div className='grid text-center'>
					<h2 className='h-4'>
						This Test has been deleted or Test ID is Invalid
					</h2>
					<Link className='link m-4' to='/'>
						Back to Home
					</Link>
				</div>
			</main>
		)
	}

	return (
		<main className='flex center' style={{ height: '100%' }}>
			{console.log(singleTest)}
			<section className='article grid p-2'>
				<h2 className='h-4 p-1'>{name}</h2>
				<p className='p-1'>
					Test ID: <span className='text-secondary'>{_id}</span>
				</p>
				{questions.map((prop) => {
					const { _id, question, answer } = prop
					return (
						<section key={_id}>
							<h4 className='h-3 p-1'>{question}</h4>
							<p className='p-1'>{answer}</p>
						</section>
					)
				})}
				<Link className='link m-1' to='/'>
					Back to Home
				</Link>
				<button onClick={handleDelete} className='btn-primary'>
					Delete Test
				</button>
			</section>
		</main>
	)
}
export default SingleTestPage
