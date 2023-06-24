import { useParams, Link } from 'react-router-dom'
import { useGetTestByIdQuery } from '../../App/apiSlice'

const SingleTestPage = () => {
	const { testId } = useParams()

	const {
		data: test,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetTestByIdQuery(testId)

	let content
	if (isLoading) {
		content = <p>Loading...</p>
	} else if (isSuccess) {
		content = (
			// {const { name, _id, questions } = test.singleTest}
			<section className='article grid p-2'>
				<h2 className='h-4 p-1'>{test.singleTest.name}</h2>
				<p className='p-1'>
					Test ID: <span className='text-secondary'>{test.singleTest._id}</span>
				</p>
				{test.singleTest.questions.map((prop) => {
					const { _id, question, answer } = prop
					return (
						<section key={_id}>
							<h4 className='h-3 p-1'>{question}</h4>
							<p className='p-1'>{answer}</p>
						</section>
					)
				})}
				<Link className='link p-1' to='/'>
					Back to Home
				</Link>
			</section>
		)
	} else if (isError) {
		content = (
			<p>
				{error.status}
				&nbsp;{error.data.msg}
			</p>
		)
	}

	return (
		<main className='flex center' style={{ height: '100%' }}>
			{content}
		</main>
	)
}
export default SingleTestPage
