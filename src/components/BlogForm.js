import {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import {bool} from 'prop-types';

function BlogForm({editing}) {
	const navigate = useNavigate();
	const {id} = useParams();

	const [title, setTitle] = useState('');
	const [orginTitle, setOriginTitle] = useState('');
	const [body, setBody] = useState('');
	const [originBody, setOriginBody] = useState('');

	useEffect(() => {
		if (editing) {
			axios.get(`http://localhost:3001/posts/${id}`).then((res) => {
				setTitle(res.data.title);
				setOriginTitle(res.data.title);
				setBody(res.data.body);
				setOriginBody(res.data.body);
			});
		}
	}, [id, editing]);

	const isEdited = () => {
		return title !== orginTitle || body !== originBody;
	};

	const goBack = () => {
		if (editing) {
			navigate(`/blogs/${id}`);
		} else {
			navigate('/blogs');
		}
	};

	const onSubmit = () => {
		if (editing) {
			axios.patch(`http://localhost:3001/posts/${id}`, {title, body}).then(() => {
				navigate(`/blogs/${id}`);
			});
		} else {
			axios
				.post('http://localhost:3001/posts', {
					title,
					body,
					createdAt: Date.now(),
				})
				.then(() => {
					navigate('/blogs');
				});
		}
	};

	return (
		<div>
			<h1>{editing ? 'Edit' : 'Create'} a blog post</h1>
			<div className="mb-3">
				<label className="form-label">Title</label>
				<input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
			</div>
			<div className="mb-3">
				<label className="form-label">Body</label>
				<textarea className="form-control" value={body} onChange={(e) => setBody(e.target.value)} rows="10" />
			</div>
			<button className="btn btn-primary" onClick={onSubmit} disabled={editing && !isEdited()}>
				{editing ? 'Edit' : 'Post'}
			</button>
			<button className="btn btn-danger ms-2" onClick={goBack}>
				Cancle
			</button>
		</div>
	);
}

BlogForm.propTypes = {
	editing: bool,
};

BlogForm.defaultProps = {
	editing: false,
};

export default BlogForm;
