import React from 'react';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';

import renderDocument from './renderDocument';

export default function createHandleRequest(routes) {
	return function handleRequest(req, res, next) {
		match({ routes, location: req.url }, (err, redirect, props) => {
			if (err) {
				return next(err);
			}

			if (redirect) {
				return res.redirect(302, redirect.pathname + redirect.search);
			}

			if (!props) {
				return next();
			}

			const markup = renderDocument(
				<Provider store={req.store}>
					<RouterContext {...props} />
				</Provider>,
				req.store.getState(),
			);

			res.send(markup);
		});
	};
}
