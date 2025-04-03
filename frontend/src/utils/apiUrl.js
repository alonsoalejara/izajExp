const baseUrl = 'http://192.168.1.6:3000/api/';

const getApiUrl = (endpoint) => `${baseUrl}${endpoint}`;

export default getApiUrl;