import Omni from '@ocm/core';
import authGooglePlugin from '@ocm/auth-google';
import mediaPlugin from '@ocm/media';

import TestForm from './components/TestForm';

const omni = new Omni();

omni.use(authGooglePlugin);
omni.use(mediaPlugin);
omni.use(o => {
	o.addRoute({
		path: '/testform',
		component: TestForm,
	});
});

omni.start();
