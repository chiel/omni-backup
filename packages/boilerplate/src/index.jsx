import Omni from '@ocm/core';
import authGooglePlugin from '@ocm/auth-google';
import mediaPlugin from '@ocm/media';
import React from 'react';

import TestForm from './components/TestForm';

const omni = new Omni();

omni.use(authGooglePlugin);
omni.use(mediaPlugin);
omni.use(o => {
	o.addMenuItem('Testform', '/testform', (
		<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path d="M5 4v3h5.5v12h3V7H19V4z" />
		</svg>
	));

	o.addRoute({
		path: '/testform',
		component: TestForm,
	});
});

omni.start();
