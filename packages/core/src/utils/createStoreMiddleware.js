import { createStore } from 'redux';

import reducer from '../reducers';

export default function createStoreMiddleware(req, res, next) {
	req.store = createStore(reducer);
	next();
}
