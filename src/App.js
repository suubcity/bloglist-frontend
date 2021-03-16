import React, { useState, useEffect } from 'react';
import style from './style.css';
//components
import Notification from './components/Notification';
import Blog from './components/Blog';
//services
import blogsService from './services/blogs';
import loginService from './services/login';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);

	//blogForm states
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');
	const [likes, setLikes] = useState('');

	//Notification states
	const [error, setError] = useState(null);
	const [notification, setNotification] = useState(null);

	useEffect(() => {
		blogsService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedInUser');
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogsService.setToken(user.token);
		}
	}, []);
	//event handlers
	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const user = await loginService.login(username, password);

			window.localStorage.setItem('loggedInUser', JSON.stringify(user));
			setUser(user);
			blogsService.setToken(user.token);
			setUsername('');
			setPassword('');
			setNotificationWithTimeout(`${user.name} logged in.`);
		} catch (exception) {
			setErrorWithTimeout('Wrong username or password');
		}
	};

	const handleLogout = (e) => {
		window.localStorage.removeItem('loggedInUser');
		setNotificationWithTimeout(`${user.name} logged out`);
		setUser(null);
	};

	const handleAddBlog = async (e) => {
		e.preventDefault();
		const newBlog = {
			title,
			author,
			url,
			likes,
		};
		const returnedBlog = await blogsService.create(newBlog);

		setBlogs(blogs.concat(returnedBlog));
		setNotificationWithTimeout(`${newBlog.title} saved to database.`);
		clearBlogForm();
	};

	//helper functions
	const clearBlogForm = () => {
		setTitle('');
		setAuthor('');
		setUrl('');
		setLikes('');
	};

	const setNotificationWithTimeout = (message) => {
		setNotification(message);
		setTimeout(() => setNotification(null), 5000);
	};

	const setErrorWithTimeout = (message) => {
		setError(message);
		setTimeout(() => setError(null), 5000);
	};

	//components
	const loginForm = () => (
		<form>
			<div>
				Username
				<input
					type="text"
					name="Username"
					value={username}
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password
				<input
					type="password"
					name="Password"
					value={password}
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type="submit" onClick={handleLogin}>
				Login
			</button>
		</form>
	);

	const mainPage = () => (
		<div>
			<h2>blogs</h2>
			{blogForm()}
			<h3>
				{user.name} logged in. <button onClick={handleLogout}>Log Out</button>
			</h3>
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	);

	const blogForm = () => (
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
			<button type="submit" onClick={handleAddBlog}>
				Add Blog
			</button>
		</form>
	);

	const errorDiv = (message) => <div className="error">{message}</div>;

	//layout
	return (
		<div>
			<Notification notification={notification} error={error} />
			{user === null ? loginForm() : mainPage()}{' '}
		</div>
	);
};

export default App;
