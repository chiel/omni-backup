import jwt from 'jsonwebtoken';
import React from 'react';

import Login from './components/Login';
import providers from './providers';

const salt = process.env.AUTH_TOKEN_SALT;

export default function authPlugin(omni) {
	omni.addRoute({
		path: '/login',
		component: () => <Login providers={providers} />,
	});

	const addProvider = (name, Component) => {
		providers.push({ Component, name });
	};

	const createToken = (subject, secret, payload = {}) => (
		new Promise((resolve, reject) => {
			jwt.sign(payload, salt + secret, { subject: `${subject}` }, (err, token) => {
				if (err) return reject(err);
				resolve(token);
			});
		})
	);

	omni.auth = { addProvider, createToken };
}
