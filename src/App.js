import {BrowserRouter, Routes, Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import routes from './routes';

function App() {
	return (
		<BrowserRouter>
			<NavBar />
			<div className="container mt-3">
				<Routes>
					{routes.map((route) => {
						return <Route key={route.path} path={route.path} element={route.component} />;
					})}
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
