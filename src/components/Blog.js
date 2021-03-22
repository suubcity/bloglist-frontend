import React from 'react';
import Togglable from './Togglable';

const Blog = ({ blog, handleClick }) => {
	const addOneLike = () => {
		blog.likes = blog.likes + 1;
		handleClick(blog.id, blog);
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
				<br />
			</Togglable>
		</div>
	);
};
export default Blog;
