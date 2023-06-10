import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Error, Landing, Login } from './pages'
import {
	CreateTest,
	WriteTest,
	Grading,
	Messages,
	Results,
	SharedLayout,
} from './pages/dashboard'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar'
import NewTest from './pages/tests/NewTest'

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<SharedLayout />}>
					<Route index element={<CreateTest />} />
					<Route path='/write-test' element={<WriteTest />} />
					<Route path='/grading' element={<Grading />} />
					<Route path='/messages' element={<Messages />} />
					<Route path='/results' element={<Results />} />
					<Route path='/new-test' element={<NewTest/>}/>
				</Route>
				<Route path='/login' element={<Login />} />
				<Route path='/landing' element={<Landing />} />
				<Route path='*' element={<Error />} />
			</Routes>
			<ToastContainer />
		</BrowserRouter>
	)
}
export default App
