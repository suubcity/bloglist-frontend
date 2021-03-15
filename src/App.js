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

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedInUser');
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
		}
	});

	const handleLogin = async (e) => {
		e.preventDefault();
		console.log('logging in ', username);
		try {
			const user = await loginService.login(username, password);

			window.localStorage.setItem('loggedInUser', JSON.stringify(user));
			setUser(user);
			setUsername('');
			setPassword('');
		} catch (exception) {}
	};

	const handleLogout = (e) => {
		window.localStorage.removeItem('loggedInUser');
		setUser(null);
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
			<h3>
				{user.name} logged in. <button onClick={handleLogout}>Log Out</button>
			</h3>
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	);

	return <div>{user === null ? loginForm() : loggedInPage()} </div>;
};

export default App;
