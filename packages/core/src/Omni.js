import inputsPlugin from '@omni/inputs';

import inputTypes from './inputs';
import routes from './routes';

export default class Omni {
	static defaultConfig = {
		appPort: 12831,
	}

	pluginApi = { inputTypes }

	plugins = [
		inputsPlugin,
	]

	constructor(config = {}) {
		this.config = {
			...Omni.defaultConfig,
			...config,
		};

		this.routes = [...routes];
		this.pluginApi.addRoute = this.addRoute;
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
