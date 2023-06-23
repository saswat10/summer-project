import { nanoid } from '@reduxjs/toolkit'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createTest } from '../../features/testsSlice'
import { toast } from 'react-hot-toast'

const CreateTest = () => {
	const testInitialState = {
		name: '',
		status: false,
	}

	const qna = {
		question: '',
		answer: '',
		id: '',
	}

	const [testName, setTestName] = useState(testInitialState)
	const [questions, setQuestions] = useState(qna)
	const [questionsList, setQuestionsList] = useState([])

	const handleChange = (e) => {
		const name = e.target.name
		const value = e.target.value
		setTestName({ ...testName, [name]: value })
		setQuestions({ ...questions, [name]: value, id: nanoid() })
	}

	const toggleTestName = () => {
		setTestName({ ...testName, status: !testName.status })
	}

	const handleQuestionList = () => {
		setQuestionsList((list) => list.concat(questions))
		setQuestions({ question: '', answer: '', id: '' })
		console.log(questionsList)
	}

	const dispatch = useDispatch()
	const handleSubmitRequest = () => {
		if (!testName.name || !questions) {
			toast.error('Please Provide All The Values')
		}
		dispatch(createTest({ name: testName.name, questions: questionsList }))
		console.log(testName.name, questionsList)
		setQuestions({ question: '', answer: '', id: '' })
		setTestName({ name: '', status: false })
		setQuestionsList([])
		setTimeout(()=>window.location.reload(),6000)
		
	}
	return (
		<main className='flex center' style={{height:'100%'}}>
			<section>
				<h2 className='text-center h-4'>CREATE TEST</h2>
				<br />
				{/* for taking the name of the test */}
				<form className='grid container'>
					<label htmlFor='testName' className='p-1 h-2 bold'>
						Enter the name of the Test:{' '}
					</label>
					<input
						type='text'
						value={testName.name}
						name='name'
						onChange={handleChange}
						disabled={testName.status}
						className='input'
					/>
					<br />
					<button
						onClick={toggleTestName}
						type='button'
						className='btn-primary'
					>
						{!testName.status ? 'Save' : 'Reset'}
					</button>

					<br />
					<label htmlFor='question' className='p-1 h-2 bold'>
						Question:
					</label>
					<textarea
						name='question'
						id='question'
						cols='80'
						rows='5'
						value={questions.question}
						onChange={handleChange}
						className='input'
					/>
					<br />
					<label htmlFor='answer' className='p-1 h-2 bold'>
						Answer:
					</label>
					<textarea
						name='answer'
						id='answer'
						cols='80'
						rows='5'
						value={questions.answer}
						onChange={handleChange}
						className='input'
					/>
					<br />
					<button
						onClick={handleQuestionList}
						type='button'
						className='btn-primary'
					>
						Submit
					</button>
					<br />
				</form>
				<hr />
				<article className='grid center article '>
					<h2 className='h-4 text-center'>{testName.name}</h2>
					{questionsList.map((listElement) => {
						const { question, id, answer } = listElement
						return (
							<section key={id} className='article m-1'>
								<h4 className='h-2'>{question}</h4>
								<p>{answer}</p>
							</section>
						)
					})}
				<button type='button' onClick={handleSubmitRequest} className='btn-primary'>
					Create test
				</button>
				</article>
			</section>
		</main>
	)
}
export default CreateTest
