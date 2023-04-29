import axios from 'axios';
import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import {useSelector} from 'react-redux';
import useToast from '../hooks/useToast';

function ShowPage() {
	const {id} = useParams();
	const [post, setPost] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const {addToast} = useToast();

	const getPost = (id) => {
		axios
			.get(`http://localhost:3001/posts/${id}`)
			.then((res) => {
				setPost(res.data);
				setLoading(false);
			})
			.catch((e) => {
				setError('Something went wrong in database');
				addToast({
					text: 'Something went wrong',
					type: 'danger',
				});
				setLoading(false);
			});
	};

	useEffect(() => {
		getPost(id);
	}, [id]);

	const printDate = (timestamp) => {
		return new Date(timestamp).toLocaleString();
	};

	if (loading) {
		return <LoadingSpinner />;
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<div>
			<div className="d-flex">
				<h1 className="flex-grow-1">{post.title}</h1>
				{isLoggedIn && (
					<div>
						<Link className="btn btn-primary" to={`/blogs/${id}/edit`}>
							Edit
						</Link>
					</div>
				)}
			</div>
			<small className="text-muted">Created At: {printDate(post.createdAt)}</small>
			<hr />
			<p>{post.body}</p>
		</div>
	);
}
export default ShowPage;
