import axios from 'axios';
import {useEffect, useState} from 'react';
import Card from '../components/Card';
import {useNavigate} from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import {bool} from 'prop-types';

function BlogList({isAdmin}) {
	const navigate = useNavigate();
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	const getPosts = () => {
		axios.get('http://localhost:3001/posts').then((res) => {
			setPosts(res.data);
			setLoading(false);
		});
	};

	const deleteBlog = (e, id) => {
		e.stopPropagation();

		axios.delete(`http://localhost:3001/posts/${id}`).then(() => {
			setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
		});
	};

	useEffect(() => {
		getPosts();
	}, []);

	if (loading) {
		return <LoadingSpinner />;
	}

	if (posts.length === 0) {
		return <div>No blog posts found</div>;
	}

	return posts
		.filter((post) => isAdmin || post.publish)
		.map((post) => {
			return (
				<Card key={post.id} title={post.title} onClick={() => navigate(`/blogs/${post.id}`)}>
					{isAdmin ? (
						<div>
							<button className="btn btn-danger btn-sm" onClick={(e) => deleteBlog(e, post.id)}>
								Delete
							</button>
						</div>
					) : null}
				</Card>
			);
		});
}

BlogList.propTypes = {
	isAdmin: bool,
};

BlogList.defaultProps = {
	isAdmin: false,
};

export default BlogList;
