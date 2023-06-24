import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import { Toaster } from 'react-hot-toast'
import TestsList from './pages/TestPages/TestsList'
import SingleTestPage from './pages/TestPages/SingleTestPage'
import CreateTest from './pages/TestPages/CreateTest'
import SharedLayout from './pages/SharedLayout'

function App() {
	return (
		<>
			<Routes>
				{/* Public Routes - accessible to everyone */}
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />

				{/* Routes available only to the Teacher aka admin role */}
				<Route path='/' element={<SharedLayout/>}>
					<Route index element={<TestsList />} />
					<Route path='/tests/:testId' element={<SingleTestPage />} />
					<Route path='/create-test' element={<CreateTest />} />
				</Route>
				{/* Routes available to both the teacher and the students */}
			</Routes>
			<Toaster
				toastOptions={{ style: { background: '#ecf8f1', color: '#060703' } }}
			/>
		</>
	)
}

export default App
