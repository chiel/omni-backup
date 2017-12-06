import callApi from './callApi';

export default function createCallApiWithToken(token) {
	if (!token) return callApi;

	return function callApiWithToken(endpoint, options = {}) {
		options.headers = options.headers || {};
		options.headers.authorization = `Bearer ${token}`;

		return callApi(endpoint, options);
	};
}
