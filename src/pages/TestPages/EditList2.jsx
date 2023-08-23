import { useParams } from 'react-router-dom'
import { useGetTestByIdQuery, useUpdateTestMutation } from '../../App/apiSlice'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import mongoose from 'mongoose'

const EditList2 = () => {
	const { testId } = useParams()
	const { data: test, isLoading, refetch } = useGetTestByIdQuery(testId)
	// const [submitResult, response] = useSingleResultMutation()
	const [updateTest, response] = useUpdateTestMutation()
	// const navigate = useNavigate()

	const [singleAnswer, setSingleAnswer] = useState({
		_id: '',
		question: '',
		answer: '',
	})

	const [qList, setQList] = useState([])
	let heroes = !isLoading && test.singleTest
	useEffect(() => {
		setQList(heroes.questions)
	}, [heroes])

	// useEffect(() => {
	// 	localStorage.setItem('singleTest', JSON.stringify(heroes))
	// })

	const handleChange = (e) => {
		let id = !singleAnswer._id
			? new mongoose.Types.ObjectId().toString()
			: singleAnswer._id
		const name = e.target.name
		const value = e.target.value
		setSingleAnswer({ ...singleAnswer, [name]: value, _id: id })
	}

	const handleSubmit = async () => {
		console.log(qList, test)
		const body = {
			name: heroes.name,
			questions: qList,
		}
		try {
			await updateTest({
				id: test.singleTest._id,
				body,
			})
				.unwrap()
				.then(() => refetch())
        setQList([])
        window.location.reload()
		} catch (error) {
			toast.error('Failed to create Test', error)
		}
	}

	console.log(response)
	if (response.status === 'pending')
		toast('Processing Request...', {
			icon: '⏳',
			duration: 2000,
		})
	if (response.isError) toast.error(response.error.data.msg)
	if (response.isSuccess) toast.success('Submitted Successfully')

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
									_id: t._id,
									question: t.question,
									answer: t.answer,
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
				<textarea
					type='text'
					className='input'
					rows='2'
					cols='80'
					value={singleAnswer.question}
					onChange={handleChange}
					placeholder='Question'
					name='question'
				/>
				<textarea
					type='text'
					className='input'
					rows='5'
					cols='80'
					value={singleAnswer.answer}
					onChange={handleChange}
					placeholder='Answer'
					name='answer'
				/>
				<br />
				<button
					className='btn-secondary'
					type='button'
					onClick={() => {
						setQList(
							qList.concat({
								question: singleAnswer.question,
								answer: singleAnswer.answer,
								_id: singleAnswer._id,
							})
						)
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
				{qList && qList.map((listElement) => {
					const { question, _id, answer } = listElement
					return (
						<section key={_id} className='article m-1'>
							<h4 className='h-2'>Question: {question}</h4>
							<span className='text-secondary'>Test Id: {_id}</span>
							<p>Answer: {answer}</p>
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
export default EditList2
