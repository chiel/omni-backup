import authPlugin from '@ocm/auth';
import inputsPlugin from '@ocm/inputs';
import mysqlPlugin from '@ocm/mysql';
import rolePlugin from '@ocm/role';
import userPlugin from '@ocm/user';

import inputTypes from './inputs';
import menuItems from './menuItems';
import routes from './routes';

export default class Omni {
	static defaultConfig = {
		apiPort: 12830,
		appPort: 12831,
	};

	pluginApi = { inputTypes };

	plugins = [
		mysqlPlugin,
		inputsPlugin,
		authPlugin,
		rolePlugin,
		userPlugin,
	];

	constructor(config = {}) {
		this.config = {
			...Omni.defaultConfig,
			...config,
		};

		this.reducers = {};
		this.routes = [...routes];
		this.pluginApi.addMenuItem = this.addMenuItem;
		this.pluginApi.addPlainRoute = this.addPlainRoute;
		this.pluginApi.addRoute = this.addRoute;
		this.pluginApi.reducers = this.reducers;
	}

	addMenuItem = (label, link, icon) => {
		menuItems.push({ icon, label, link });
	}

	addRoute = route => {
		this.routes[0].childRoutes[0].childRoutes.push(route);
	}

	addPlainRoute = route => {
		this.routes[0].childRoutes.push(route);
	}

	use(plugin) {
		if (typeof plugin !== 'function') {
			throw new Error('Omni plugins need to be functions');
		}

		this.plugins.push(plugin);
	}
}
