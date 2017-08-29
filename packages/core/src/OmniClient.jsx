import './styles/base.css';

import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';
import { createStore } from 'redux';

import Omni from './Omni';
import NotFoundError from './components/NotFoundError';
import reducer from './reducers';
import middleware from './utils/reduxMiddleware';

export default class OmniClient extends Omni {
	start() {
		this.plugins.forEach(plugin => {
			plugin(this.pluginApi);
		});

		this.addRoute({
			path: '*',
			component: NotFoundError,
		});

		const store = createStore(reducer, window.INITIAL_STATE, middleware);
		window.store = store;

		hydrate(
			<Provider store={store}>
				<Router routes={this.routes} history={browserHistory} />
			</Provider>,
			document.getElementById('omni-container'),
		);
	}
}
