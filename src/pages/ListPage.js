import axios from 'axios';
import {useEffect, useState} from 'react';
import Card from '../components/Card';
import {Link, useNavigate} from 'react-router-dom';

function ListPage() {
	const navigate = useNavigate();
	const [posts, setPosts] = useState([]);

	const getPosts = () => {
		axios.get('http://localhost:3001/posts').then((res) => {
			setPosts(res.data);
		});
	};

	const deleteBlog = (e, id) => {
		e.stopPropagation();

		axios.delete(`http://localhost:3001/posts/${id}`).then((res) => {
			setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
		});
	};

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<div>
			<div className="d-flex justify-content-between">
				<h1>Blogs</h1>
				<div>
					<Link to="/blogs/create" className="btn btn-success">
						Create New
					</Link>
				</div>
			</div>
			{posts.map((post) => {
				return (
					<Card key={post.id} title={post.title} onClick={() => navigate('/blogs/edit')}>
						<div>
							<button className="btn btn-danger btn-sm" onClick={(e) => deleteBlog(e, post.id)}>
								Delete
							</button>
						</div>
					</Card>
				);
			})}
		</div>
	);
}
export default ListPage;
