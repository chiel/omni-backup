import './utils/cssLoader';

import cors from 'cors';
import express from 'express';
import { combineReducers } from 'redux';

import Omni from './Omni';
import createHandleRequest from './utils/createHandleRequest';
import createStoreMiddleware from './utils/createStoreMiddleware';
import handleErrorApiMiddleware from './utils/handleErrorApiMiddleware';
import handleErrorMiddleware from './utils/handleErrorMiddleware';
import notFoundMiddleware from './utils/notFoundMiddleware';

export default class OmniServer extends Omni {
	constructor(config) {
		super(config);

		this.api = express();
		this.api.disable('x-powered-by');
		this.api.use(cors());
		this.pluginApi.api = this.api;

		this.app = express();
		this.app.disable('x-powered-by');
		this.app.use(createStoreMiddleware(this.getReducer));
		this.pluginApi.app = this.app;
	}

	getReducer = () => (
		combineReducers(this.reducers)
	)

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
