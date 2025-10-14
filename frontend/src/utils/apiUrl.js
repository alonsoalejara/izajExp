const baseUrl = 'http://146.83.194.142:1746/api/';

const getApiUrl = (endpoint) => `${baseUrl}${endpoint}`;

export default getApiUrl;