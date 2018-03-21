import 'isomorphic-fetch';

export default function callApi(endpoint, options = {}) {
	const host = typeof window === 'undefined' ?
		process.env.API_URL :
		window.CONFIG.API_URL;

	const url = host + endpoint;

	options.headers = options.headers || {};

	if (!options.headers.accept) {
		options.headers.accept = 'application/json';
	}

	if (!options.headers['content-type'] && (!options.body || !(options.body instanceof FormData))) {
		options.headers['content-type'] = 'application/json; charset=utf-8';
	}

	return fetch(url, options)
		.then(res => (
			res.json().then(body => {
				if (res.status >= 200 && res.status < 300) {
					const headers = {};

					if (!res.headers.keys) {
						// eslint-disable-next-line no-underscore-dangle
						Object.keys(res.headers._headers).forEach(key => {
							headers[key] = res.headers.get(key);
						});
					}

					return Promise.resolve({ body, headers });
				}

				const err = new Error('Request failed');
				err.body = body;
				err.endpoint = endpoint;
				err.options = options;
				err.res = res;
				err.status = res.status;
				err.url = url;

				return Promise.reject(err);
			})
		));
}
