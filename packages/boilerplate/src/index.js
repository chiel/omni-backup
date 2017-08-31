import Omni from '@ocm/core';

import TestForm from './components/TestForm';

const omni = new Omni();

omni.use(o => {
	o.addRoute({
		path: '/testform',
		component: TestForm,
	});
});

omni.start();
