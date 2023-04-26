import axios from 'axios';
import {useEffect, useState} from 'react';
import Card from '../components/Card';
import {useNavigate} from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import {bool} from 'prop-types';
import Pagination from './Pagination';

function BlogList({isAdmin}) {
	const navigate = useNavigate();
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [numberOfPosts, setNumberOfPosts] = useState(0);
	const [numberOfPages, setNumberOfPages] = useState(0);
	const limit = 5;

	useEffect(() => {
		setNumberOfPages(Math.ceil(numberOfPosts / limit));
	}, [numberOfPosts]);

	const getPosts = (page = 1) => {
		setCurrentPage(page);
		let params = {
			_page: page,
			_limit: limit,
			_sort: 'id',
			_order: 'desc',
		};

		if (!isAdmin) {
			params = {...params, publish: true};
		}

		axios.get('http://localhost:3001/posts', {params}).then((res) => {
			setNumberOfPosts(res.headers['x-total-count']);
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

	const rederBlogList = () => {
		return posts.map((post) => {
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
	};

	return (
		<div>
			{rederBlogList()}
			{numberOfPages > 1 && <Pagination currentPage={currentPage} numberOfPages={numberOfPages} onClick={getPosts} />}
		</div>
	);
}

BlogList.propTypes = {
	isAdmin: bool,
};

BlogList.defaultProps = {
	isAdmin: false,
};

export default BlogList;
