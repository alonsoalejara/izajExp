const baseUrl = 'http://172.21.96.1:3000/api/';

const getApiUrl = (endpoint) => `${baseUrl}${endpoint}`;

export default getApiUrl;