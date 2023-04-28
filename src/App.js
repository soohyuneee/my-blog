import {BrowserRouter, Routes, Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import routes from './routes';
import Toast from './components/Toast';
import useToast from './hooks/useToast';
import {useSelector} from 'react-redux';

function App() {
	const {deleteToast} = useToast();
	const toasts = useSelector((state) => state.toast.toasts);

	return (
		<BrowserRouter>
			<NavBar />
			<Toast toasts={toasts} deleteToast={deleteToast} />
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
