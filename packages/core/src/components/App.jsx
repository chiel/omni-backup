import PT from 'prop-types';
import React from 'react';

import Header from './Header';

import css from '../styles/app.css';

export default class App extends React.PureComponent {
	static propTypes = {
		children: PT.node,
	};

	static defaultProps = {
		children: undefined,
	};

	render() {
		const { children } = this.props;

		return (
			<div className={css.app}>
				<Header />
				{children}
			</div>
		);
	}
}
