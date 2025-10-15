const baseUrl = 'https://unambitiously-nontechnologic-blanch.ngrok-free.dev/api/';

const getApiUrl = (endpoint) => `${baseUrl}${endpoint}`;

export default getApiUrl;