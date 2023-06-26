import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import { Toaster } from 'react-hot-toast'
import TestsList from './pages/TestPages/TestsList'
import SingleTestPage from './pages/TestPages/SingleTestPage'
import CreateTest from './pages/TestPages/CreateTest'
import SharedLayout from './pages/SharedLayout'
import EditTest from './pages/TestPages/EditTest'
import Exam from './pages/TestPages/Exam'
import ExamEnv from './pages/TestPages/ExamEnv'

function App() {
	let theme = localStorage.getItem('theme')
	document.documentElement.className = !theme ? 'light-theme' : theme

	return (
		<>
			<Routes>
				{/* Public Routes - accessible to everyone */}
				<Route index path='/' element={<Login />} />
				<Route path='/register' element={<Register />} />

				{/* Routes available only to the Teacher aka admin role */}

				<Route path='/teacher' element={<SharedLayout />}>
					<Route index element={<TestsList />} />
					<Route path='/teacher/tests/:testId' element={<SingleTestPage />} />
					<Route path='/teacher/create-test' element={<CreateTest />} />
					<Route path='/teacher/tests/edit/:testId' element={<EditTest />} />
				</Route>

				{/* Routes available to both the teacher and the students */}
				<Route path='/student' element={<Exam />} />
				<Route path='/student/:testId' element={<ExamEnv />} />
			</Routes>
			<Toaster
				toastOptions={{ style: { background: '#ecf8f1', color: '#060703' } }}
			/>
		</>
	)
}

export default App
