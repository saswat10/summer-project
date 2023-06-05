import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Error, Landing, Login } from './pages'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Landing />}></Route>
				<Route path='/login' element={<Login />}></Route>
				<Route path='*' element={<Error />} />
			</Routes>
			<ToastContainer />
		</BrowserRouter>
	)
}
export default App
