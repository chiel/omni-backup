import PT from 'prop-types';
import React from 'react';

import css from '../styles/login.css';

export default class Login extends React.PureComponent {
	static propTypes = {
		providers: PT.arrayOf(PT.shape({
			Component: PT.func.isRequired,
			name: PT.string.isRequired,
		})).isRequired,
	};

	render() {
		const { providers } = this.props;

		return (
			<div className={css.login}>
				{providers.length === 0 && (
					<p className={css.error}>
						No authentication providers registered.<br />
						Looks like you&apos;re locked out!
					</p>
				)}
				{providers.map(({ Component, name }) => (
					<Component key={name} />
				))}
			</div>
		);
	}
}
