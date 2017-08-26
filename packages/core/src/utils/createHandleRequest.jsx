import React from 'react';
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
				<RouterContext {...props} />,
			);

			res.send(markup);
		});
	};
}
