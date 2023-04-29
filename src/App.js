import {BrowserRouter, Routes, Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import routes from './routes';
import Toast from './components/Toast';
import useToast from './hooks/useToast';
import {useDispatch, useSelector} from 'react-redux';
import ProtectedRoute from './ProtectedRoute';
import {useEffect, useState} from 'react';
import {login} from './store/authSlice';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
	const {deleteToast} = useToast();
	const toasts = useSelector((state) => state.toast.toasts);
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (localStorage.getItem('isLoggedIn')) {
			dispatch(login());
		}
		setLoading(false);
	}, []);

	if (loading) {
		return <LoadingSpinner />;
	}

	return (
		<BrowserRouter>
			<NavBar />
			<Toast toasts={toasts} deleteToast={deleteToast} />
			<div className="container mt-3">
				<Routes>
					{routes.map((route) => {
						return <Route key={route.path} path={route.path} element={route.auth ? <ProtectedRoute element={route.element} /> : route.element} />;
					})}
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
