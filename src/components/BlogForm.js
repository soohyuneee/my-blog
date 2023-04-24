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
	const [publish, setPublish] = useState(false);
	const [originPublish, setOriginPublish] = useState(false);

	useEffect(() => {
		if (editing) {
			axios.get(`http://localhost:3001/posts/${id}`).then((res) => {
				setTitle(res.data.title);
				setOriginTitle(res.data.title);
				setBody(res.data.body);
				setOriginBody(res.data.body);
				setPublish(res.data.publish);
				setOriginPublish(res.data.publish);
			});
		}
	}, [id, editing]);

	const isEdited = () => {
		return title !== orginTitle || body !== originBody || publish !== originPublish;
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
			axios.patch(`http://localhost:3001/posts/${id}`, {title, body, publish}).then(() => {
				navigate(`/blogs/${id}`);
			});
		} else {
			axios
				.post('http://localhost:3001/posts', {
					title,
					body,
					publish,
					createdAt: Date.now(),
				})
				.then(() => {
					navigate('/blogs');
				});
		}
	};

	const onChangePublish = (e) => {
		setPublish(e.target.checked);
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
			<div className="form-check mb-3">
				<input className="form-check-input" type="checkbox" checked={publish} onChange={onChangePublish} />
				<label className="form-check-label">Publish</label>
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
