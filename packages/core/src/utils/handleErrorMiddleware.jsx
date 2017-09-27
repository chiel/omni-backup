import React from 'react';

import renderDocument from './renderDocument';

import ErrorMessage from '../components/ErrorMessage';
import Root from '../components/Root';

// eslint-disable-next-line no-unused-vars
export default function handleErrorMiddleware(err, req, res, next) {
	if (err.status !== 404) {
		console.error(err.stack || err);
	}

	const markup = renderDocument(
		<Root>
			<ErrorMessage error={err} />
		</Root>,
		req.store.getState(),
	);

	res.status(err.status || 500).send(markup);
}
