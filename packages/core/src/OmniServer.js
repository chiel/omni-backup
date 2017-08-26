import express from 'express';

import Omni from './Omni';
import createHandleRequest from './utils/createHandleRequest';
import handleErrorMiddleware from './utils/handleErrorMiddleware';
import notFoundMiddleware from './utils/notFoundMiddleware';

export default class OmniServer extends Omni {
	constructor(config) {
		super(config);

		this.app = express();
		this.app.disable('x-powered-by');
	}

	start() {
		this.plugins.forEach(plugin => {
			plugin(this.pluginApi);
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
