import { useParams } from 'react-router-dom'
import { useGetTestByIdQuery, useUpdateTestMutation } from '../../App/apiSlice'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { nanoid } from '@reduxjs/toolkit'
import { getUserFromLocalStorage } from '../../utils/localStorage'

const EditTest = () => {
	const { testId } = useParams()
	const { data: test, isLoading } = useGetTestByIdQuery(testId)
	const [updateTest, response] = useUpdateTestMutation()

	const [singleAnswer, setSingleAnswer] = useState({
		_id: '',
		question: '',
		answer: '',
	})

	let heroes = !isLoading && test.singleTest
	const [qList, setQList] = useState(heroes.questions)
	const name = heroes.name

	// useEffect(() => {
	// 	localStorage.setItem('singleTest', JSON.stringify(heroes))
	// })

	const handleChange = (e) => {
		let id = !singleAnswer._id ? nanoid() : singleAnswer._id
		const name = e.target.name
		const value = e.target.value
		setSingleAnswer({ ...singleAnswer, [name]: value, _id: id })
	}

	const handleSubmit = async () => {
		const body={
			name: name,
			questions:qList
		}
		try {
			await updateTest({ id: testId, body})
			toast.loading('Processing Request', { duration: 500 })
			setTimeout(() => toast.success('Test created Successfully', {}), 500)
		} catch (error) {
			toast.error('Failed to create Test', error)
		}

		// try {
		// 	const response = await axios.patch(
		// 		'http::/localhost:5000/api/v1/tests/' + testId,
		// 		{ name: name, questions: qList },
		// 		{
		// 			headers: {
		// 				Authorization: `Bearer ${getUserFromLocalStorage().token}`,
		// 			},
		// 		}
		// 	)
		// 	console.log(response)
		// } catch (err) {
		// 	console.log(err)
		// }
	}
	console.log(response)
	console.log(singleAnswer)

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
									question: t.question,
									_id: t._id,
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
					htmlFor='question'
					className='input'
					rows='3'
					name='question'
					value={singleAnswer.question}
					onChange={handleChange}
				/>
				<textarea
					type='text'
					className='input'
					rows='8'
					cols='80'
					name='answer'
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
export default EditTest
