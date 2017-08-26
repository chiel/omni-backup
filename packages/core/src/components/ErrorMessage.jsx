import PT from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';

export default class ErrorMessage extends React.PureComponent {
	static propTypes = {
		error: PT.instanceOf(Error).isRequired,
	};

	render() {
		const { error } = this.props;

		return (
			<div>
				<Helmet>
					<title>{error.title || 'Error'}</title>
				</Helmet>
				{!!error.title && (
					<h1>{error.title}</h1>
				)}
				<p>{error.message}</p>
			</div>
		);
	}
}
