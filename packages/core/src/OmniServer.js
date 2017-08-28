import './utils/cssLoader';

import express from 'express';

import Omni from './Omni';
import createHandleRequest from './utils/createHandleRequest';
import handleErrorApiMiddleware from './utils/handleErrorApiMiddleware';
import handleErrorMiddleware from './utils/handleErrorMiddleware';
import notFoundMiddleware from './utils/notFoundMiddleware';

export default class OmniServer extends Omni {
	constructor(config) {
		super(config);

		this.api = express();
		this.api.disable('x-powered-by');
		this.pluginApi.api = this.api;

		this.app = express();
		this.app.disable('x-powered-by');
		this.pluginApi.app = this.app;
	}

	start() {
		this.plugins.forEach(plugin => {
			plugin(this.pluginApi);
		});

		this.api.use(notFoundMiddleware);
		this.api.use(handleErrorApiMiddleware);

		this.api.listen(this.config.apiPort, () => {
			console.info(`Omni api listening on port ${this.config.apiPort}`);
		});

		this.app.use(express.static(`${__dirname}/public`));
		this.app.get('*', createHandleRequest(this.routes));
		this.app.use(notFoundMiddleware);
		this.app.use(handleErrorMiddleware);

		this.app.listen(this.config.appPort, () => {
			console.info(`Omni app listening on port ${this.config.appPort}`);
		});
	}
}
