import { createStore } from 'redux';

import middleware from './reduxMiddleware';

import reducer from '../reducers';

export default function createStoreMiddleware(req, res, next) {
	req.store = createStore(reducer, middleware);
	next();
}
