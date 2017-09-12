import React from 'react';

import Login from './components/Login';
import providers from './providers';

export default function authPlugin(omni) {
	omni.addRoute({
		path: '/login',
		component: () => <Login providers={providers} />,
	});

	const addProvider = (name, Component) => {
		providers.push({ Component, name });
	};

	omni.auth = { addProvider };
}
