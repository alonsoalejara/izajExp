const baseUrl = 'http://192.168.1.8:3000/api/';

const getApiUrl = (endpoint) => `${baseUrl}${endpoint}`;

export default getApiUrl;