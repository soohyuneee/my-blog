import {BrowserRouter, Routes, Route} from 'react-router-dom';
import BlogForm from './components/BlogForm';
import NavBar from './components/NavBar';

function App() {
	return (
		<BrowserRouter>
			<NavBar />
			<div className="container">
				<Routes>
					<Route path="/" element="Home Page" />
					<Route path="/blogs" element={<BlogForm />}></Route>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
