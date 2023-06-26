import { useParams } from 'react-router-dom'
import {
	useGetTestByIdQuery,
	useSingleResultMutation,
} from '../../App/apiSlice'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
// import { useEffect } from 'react'

const ExamEnv = () => {
	const { testId } = useParams()
	const { data: test, isLoading } = useGetTestByIdQuery(testId)
	const [submitResult, response] = useSingleResultMutation()

	const [singleAnswer, setSingleAnswer] = useState({
		questionId: '',
		answer: '',
	})
	const [qList, setQList] = useState([])

	let heroes = !isLoading && test.singleTest

	// useEffect(() => {
	// 	localStorage.setItem('singleTest', JSON.stringify(heroes))
	// })

	const handleChange = (e) => {
		setSingleAnswer({ ...singleAnswer, answer: e.target.value })
	}

	const handleSubmit = async () => {
		try {
			await submitResult({
				_id: testId,
				body: qList,
			})
			toast.loading('Processing Request', { duration: 500 })
			setTimeout(() => toast.success('Test created Successfully', {}), 500)
		} catch (error) {
			toast.error('Failed to create Test', error)
		}
	}

	console.log(response)

	let content,
		i = 1
	if (heroes) {
		content = (
			<div className='q-list-container'>
				{heroes.questions.map((t) => {
					return (
						<button
							key={t._id}
							className='btn-primary'
							onClick={() =>
								setSingleAnswer({
									questionId: t._id,
									answer: '',
								})
							}
						>
							{i++}
						</button>
					)
				})}
			</div>
		)
	}

	return (
		<div className='grid m-3 article'>
			<form className='grid container p-1'>
				<h2 className='text-center bold text-secondary m-2 h-4'>
					{heroes.name || 'Test Name'}
				</h2>
				<p className='p-1 text-secondary'>Id: {singleAnswer._id || 'ID'}</p>
				<label htmlFor='question' className='p-1 bold h-2'>
					Question: {'Question'}
				</label>
				<textarea
					type='text'
					className='input'
					rows='5'
					cols='80'
					value={singleAnswer.answer}
					onChange={handleChange}
				/>
				<br />
				<button
					className='btn-secondary'
					type='button'
					onClick={() => {
						setQList(qList.concat(singleAnswer))
						console.log(qList)
					}}
				>
					Save
				</button>
				<br />
				<br />
			</form>
			{content}
			<article className='article'>
				<h2 className='h-4 text-center'>Your Answer</h2>
				{qList.map((listElement) => {
					const { question, _id, answer } = listElement
					return (
						<section key={_id} className='article m-1'>
							<h4 className='h-2'>{question}</h4>
							<span className='text-secondary'>{_id}</span>
							<p>{answer}</p>
						</section>
					)
				})}
				<button className='btn-primary' type='button' onClick={handleSubmit}>
					Submit
				</button>
			</article>
		</div>
	)
}
export default ExamEnv