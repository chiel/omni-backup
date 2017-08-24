import express from 'express';

import handleErrorMiddleware from './utils/handleErrorMiddleware';
import notFoundMiddleware from './utils/notFoundMiddleware';

export default class Omni {
	static defaultConfig = {
		appPort: 12831,
	}

	pluginApi = {}
	plugins = []

	constructor(config = {}) {
		this.config = {
			...Omni.defaultConfig,
			...config,
		};

		this.app = express();
		this.app.disable('x-powered-by');
	}

	start() {
		this.plugins.forEach(plugin => {
			plugin(this.pluginApi);
		});

		this.app.use(notFoundMiddleware);
		this.app.use(handleErrorMiddleware);

		this.app.listen(this.config.appPort, () => {
			console.info(`Omni app listening on port ${this.config.appPort}`);
		});
	}

	use(plugin) {
		if (typeof plugin !== 'function') {
			throw new Error('Omni plugins need to be functions');
		}

		this.plugins.push(plugin);
	}
}
