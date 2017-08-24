import PT from 'prop-types';
import React from 'react';

export default class ErrorMessage extends React.PureComponent {
	static propTypes = {
		error: PT.instanceOf(Error).isRequired,
	};

	render() {
		const { error } = this.props;

		return (
			<p>{error.message}</p>
		);
	}
}
