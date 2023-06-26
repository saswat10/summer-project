import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Exam = () => {
	const [testId, setTestId] = useState('')
	const navigate = useNavigate()

	const handleClick = async () => {
		if (!testId) toast.error('Please Provide Test Id')
		else {
			navigate(`/student/${testId}`)
		}
	}
	return (
		<section className='flex center' style={{height:'100vh'}}>
			<form className='container'>
				<label htmlFor='testId' className='m-1 h-3 bold'>
					Enter the Test Id:
				</label>
				<input
					type='text'
					name='testId'
					value={testId}
					onChange={(e) => setTestId(e.target.value)}
					className='input'
				/>
				<button className='btn-primary' type='button' onClick={handleClick}>
					Get Questions
				</button>
			</form>
		</section>
	)
}

export default Exam
