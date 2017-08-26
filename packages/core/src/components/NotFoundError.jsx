import React from 'react';

import ErrorMessage from './ErrorMessage';

export default function NotFoundError() {
	const err = new Error('Could not find what you were looking for');
	err.title = '404 Not Found';
	err.type = 'not_found';
	err.status = 404;

	return (
		<ErrorMessage error={err} />
	);
}
