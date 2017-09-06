import Omni from '@ocm/core';
import mediaPlugin from '@ocm/media';

import TestForm from './components/TestForm';

const omni = new Omni();

omni.use(mediaPlugin);
omni.use(o => {
	o.addRoute({
		path: '/testform',
		component: TestForm,
	});
});

omni.start();
