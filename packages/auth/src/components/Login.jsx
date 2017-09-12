import PT from 'prop-types';
import React from 'react';

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
			<div>
				{providers.map(({ Component, name }) => (
					<Component key={name} />
				))}
			</div>
		);
	}
}
