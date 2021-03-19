import React from 'react';
import Togglable from './Togglable';
const Blog = ({ blog }) => (
	<div className="blog">
		title: {blog.title}
		<Togglable buttonLabel={'view'} secondButtonLabel={'hide'}>
			author: {blog.author}
			<br />
			url: {blog.url}
			<br />
			likes: {blog.likes}
			<button>Like</button>
			<br />
		</Togglable>
	</div>
);

export default Blog;
