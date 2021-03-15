import axios from 'axios';
const baseUrl = '/api/login';

const login = async (username, password) => {
	const userObject = {
		username,
		password,
	};
	const response = await axios.post(baseUrl, userObject);
	return response.data;
};

export default {
	login,
};
