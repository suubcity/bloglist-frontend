import React from 'react';
import Togglable from './Togglable';

const Blog = ({ blog, handleUpdateBlog, handleDeleteBlog, user }) => {
	const addOneLike = () => {
		blog.likes = blog.likes + 1;
		handleUpdateBlog(blog.id, blog);
	};

	const deleteButtonVisible = () => {
		//logging blog.user
		console.log(
			'######',
			'VARIABLE NAME:',
			'blog.user',
			'TYPEOF:',
			typeof blog.user,
			'VALUE:',
			blog.user,
			'######'
		);
		//end of logging

		//logging user.id
		console.log('######', 'VARIABLE NAME:', 'user.id', 'TYPEOF:', typeof user.id, 'VALUE:', user.id, '######');
		//end of logging

		return blog.user.id === user.id;
	};

	const DeleteButton = () => {
		return <button onClick={() => handleDeleteBlog(blog)}>Delete</button>;
	};

	return (
		<div className="blog">
			title: {blog.title}
			<Togglable buttonLabel={'view'} secondButtonLabel={'hide'}>
				author: {blog.author}
				<br />
				url: {blog.url}
				<br />
				likes: {blog.likes}
				<button onClick={addOneLike}>Like</button>
				{deleteButtonVisible() ? <DeleteButton /> : null}
				<br />
			</Togglable>
		</div>
	);
};
export default Blog;
