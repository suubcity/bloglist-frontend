import axios from 'axios';
const baseUrl = '/api/login';

const login = async (username, password) => {
	const userObject = {
		username,
		password,
	};
	console.log('logging in');
	const response = await axios.post(baseUrl, userObject);
	return response.data;
};

export default {
	login,
};
