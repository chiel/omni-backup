import React from 'react';
import { hydrate } from 'react-dom';
import { browserHistory, Router } from 'react-router';

import Omni from './Omni';
import NotFoundError from './components/NotFoundError';

export default class OmniClient extends Omni {
	start() {
		this.plugins.forEach(plugin => {
			plugin(this.pluginApi);
		});

		this.addRoute({
			path: '*',
			component: NotFoundError,
		});

		hydrate(
			<Router routes={this.routes} history={browserHistory} />,
			document.getElementById('omni-container'),
		);
	}
}
