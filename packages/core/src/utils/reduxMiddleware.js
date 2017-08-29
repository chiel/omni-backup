import { applyMiddleware } from 'redux';

import apiMiddleware from './reduxApiMiddleware';

export default applyMiddleware(apiMiddleware);
