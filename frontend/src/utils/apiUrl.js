const baseUrl = 'http://172.27.64.1:3000/api/';

const getApiUrl = (endpoint) => `${baseUrl}${endpoint}`;

export default getApiUrl;