import axios from 'axios';
const baseUrl = '/api/blogs/';

let token = null;

const setToken = (newToken) => {
	token = `bearer ${newToken}`;
};

const create = async (newObject) => {
	const config = { headers: { Authorization: token } };
	const response = await axios.post(baseUrl, newObject, config);
	return response.data;
};

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then((response) => response.data);
};

//todo this is not running the function on the backend?
const updateBlog = async (id, updatedBlog) => {
	console.log(baseUrl + id);
	const response = await axios.put(baseUrl + id, updatedBlog);

	//logging response
	console.log('######', 'VARIABLE NAME:', 'response', 'TYPEOF:', typeof response, 'VALUE:', response, '######');
	//end of logging

	return response;
};

export default { getAll, create, setToken, updateBlog };
