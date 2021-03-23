import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ handleAddBlog }) => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');
	const [likes, setLikes] = useState('');

	const clearBlogForm = () => {
		setTitle('');
		setAuthor('');
		setUrl('');
		setLikes('');
	};

	const handleClick = (e) => {
		e.preventDefault();
		const newBlog = {
			title,
			author,
			url,
			likes,
		};
		handleAddBlog(newBlog);
		clearBlogForm();
	};

	return (
		<form>
			<div>
				Title
				<input type="text" value={title} name="Title" onChange={({ target }) => setTitle(target.value)} />
			</div>
			<div>
				Author
				<input type="text" name="Author" value={author} onChange={({ target }) => setAuthor(target.value)} />
			</div>
			<div>
				Url
				<input type="text" name="Url" value={url} onChange={({ target }) => setUrl(target.value)} />
			</div>
			<div>
				Likes
				<input type="text" name="Likes" value={likes} onChange={({ target }) => setLikes(target.value)} />
			</div>
			<button type="submit" onClick={handleClick}>
				Save Blog
			</button>
		</form>
	);
};

BlogForm.propTypes = {
	handleAddBlog: PropTypes.func.isRequired,
};

export default BlogForm;
