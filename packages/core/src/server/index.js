import express from 'express';

import handleErrorMiddleware from './utils/handleErrorMiddleware';
import notFoundMiddleware from './utils/notFoundMiddleware';

export default class Omni {
	static defaultConfig = {
		appPort: 12831,
	}

	constructor(config = {}) {
		this.config = {
			...Omni.defaultConfig,
			...config,
		};

		this.app = express();
		this.app.disable('x-powered-by');
	}

	start() {
		this.app.use(notFoundMiddleware);
		this.app.use(handleErrorMiddleware);

		this.app.listen(this.config.appPort, () => {
			console.info(`Omni app listening on port ${this.config.appPort}`);
		});
	}
}
