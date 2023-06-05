import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Landing, Login } from './pages'

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Landing />}></Route>
				<Route path='/login' element={<Login />}></Route>
			</Routes>
		</BrowserRouter>
	)
}
export default App
