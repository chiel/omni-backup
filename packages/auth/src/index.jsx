import jwt from 'jsonwebtoken';
import React from 'react';

import Login from './components/Login';
import providers from './providers';
import sessionReducer from './reducers/session';

const salt = process.env.AUTH_TOKEN_SALT;

export default function authPlugin(omni) {
	omni.addPlainRoute({
		path: '/login',
		component: () => <Login providers={providers} />,
	});

	omni.reducers.session = sessionReducer;

	const addProvider = (type, Component, getSecret) => {
		providers.push({ Component, getSecret, type });
	};

	const createToken = (type, subject, secret) => (
		new Promise((resolve, reject) => {
			jwt.sign({ type }, salt + secret, { subject: `${subject}` }, (err, token) => {
				if (err) return reject(err);
				resolve(token);
			});
		})
	);

	omni.auth = { addProvider, createToken };
}
