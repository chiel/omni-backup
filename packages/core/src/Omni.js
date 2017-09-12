import inputsPlugin from '@ocm/inputs';

import inputTypes from './inputs';
import routes from './routes';
import sessionReducer from './reducers/session';

export default class Omni {
	static defaultConfig = {
		apiPort: 12830,
		appPort: 12831,
	};

	pluginApi = { inputTypes };

	plugins = [
		inputsPlugin,
	];

	constructor(config = {}) {
		this.config = {
			...Omni.defaultConfig,
			...config,
		};

		this.reducers = { session: sessionReducer };
		this.routes = [...routes];
		this.pluginApi.addRoute = this.addRoute;
		this.pluginApi.reducers = this.reducers;
	}

	addRoute = route => {
		this.routes[0].childRoutes.push(route);
	}

	use(plugin) {
		if (typeof plugin !== 'function') {
			throw new Error('Omni plugins need to be functions');
		}

		this.plugins.push(plugin);
	}
}
