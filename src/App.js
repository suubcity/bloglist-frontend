import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	const handleLogin = async (e) => {
		e.preventDefault();
		console.log('logging in ', username);
		try {
			const user = await loginService.login(username, password);
			setUser(user);
		} catch (exception) {}
	};

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

	const loggedInPage = () => (
		<div>
			<h2>blogs</h2>
			<h3>{user.name} logged in.</h3>
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	);

	return <div>{user === null ? loginForm() : loggedInPage()} </div>;
};

export default App;
