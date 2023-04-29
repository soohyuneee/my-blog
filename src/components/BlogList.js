import axios from 'axios';
import {useCallback, useEffect, useState} from 'react';
import Card from '../components/Card';
import {useLocation, useNavigate} from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import propTypes from 'prop-types';
import Pagination from './Pagination';
import useToast from '../hooks/useToast';

function BlogList({isAdmin}) {
	const navigate = useNavigate();
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const pageParam = params.get('page');
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [numberOfPosts, setNumberOfPosts] = useState(0);
	const [numberOfPages, setNumberOfPages] = useState(0);
	const [searchText, setSearchText] = useState('');
	const [error, setError] = useState('');
	const {addToast} = useToast();
	const limit = 5;

	useEffect(() => {
		setNumberOfPages(Math.ceil(numberOfPosts / limit));
	}, [numberOfPosts]);

	const onClickPageButton = (page) => {
		navigate(`${location.pathname}?page=${page}`);
		setCurrentPage(page);
		getPosts(page);
	};

	const getPosts = useCallback(
		(page = 1) => {
			let params = {
				_page: page,
				_limit: limit,
				_sort: 'id',
				_order: 'desc',
				title_like: searchText,
			};

			if (!isAdmin) {
				params = {...params, publish: true};
			}

			axios
				.get('http://localhost:3001/posts', {params})
				.then((res) => {
					setNumberOfPosts(res.headers['x-total-count']);
					setPosts(res.data);
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
		},
		[isAdmin, searchText]
	);

	useEffect(() => {
		setCurrentPage(parseInt(pageParam) || 1);
		getPosts(parseInt(pageParam) || 1);
	}, []);

	const deleteBlog = (e, id) => {
		e.stopPropagation();

		axios
			.delete(`http://localhost:3001/posts/${id}`)
			.then(() => {
				getPosts(1);
				addToast({
					text: 'Successfully deleted!',
					type: 'success',
				});
			})
			.catch((e) => {
				addToast({
					text: 'The blog could not be deleted.',
					type: 'danger',
				});
			});
	};

	if (loading) {
		return <LoadingSpinner />;
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

	const onSearch = (e) => {
		if (e.key === 'Enter') {
			navigate(`${location.pathname}?page=1`);
			setCurrentPage(1);
			getPosts(1);
		}
	};

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<div>
			<input
				type="text"
				className="form-control"
				placeholder="Search.."
				value={searchText}
				onChange={(e) => setSearchText(e.target.value)}
				onKeyUp={onSearch}
			/>
			<hr />
			{posts.length === 0 ? (
				<div>No blog posts found</div>
			) : (
				<>
					{rederBlogList()}
					{numberOfPages > 1 && <Pagination currentPage={currentPage} numberOfPages={numberOfPages} onClick={onClickPageButton} />}
				</>
			)}
		</div>
	);
}

BlogList.propTypes = {
	isAdmin: propTypes.bool,
};

BlogList.defaultProps = {
	isAdmin: false,
};

export default BlogList;
