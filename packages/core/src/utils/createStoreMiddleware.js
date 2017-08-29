import { createStore } from 'redux';

import middleware from './reduxMiddleware';

export default function createStoreMiddleware(getReducer) {
	return (req, res, next) => {
		req.store = createStore(getReducer(), middleware);
		next();
	};
}
