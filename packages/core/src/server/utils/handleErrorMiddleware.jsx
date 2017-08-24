import React from 'react';
import { renderToString } from 'react-dom/server';

import ErrorMessage from '../../app/components/ErrorMessage';
import Root from '../../app/components/Root';

// eslint-disable-next-line no-unused-vars
export default function handleErrorMiddleware(err, req, res, next) {
	if (err.status !== 404) {
		console.error(err.stack || err);
	}

	const markup = renderToString(
		<Root>
			<ErrorMessage error={err} />
		</Root>,
	);

	res.status(err.status || 500).send(markup);
}
