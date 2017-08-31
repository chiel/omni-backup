import PT from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';

export default class Root extends React.PureComponent {
	static propTypes = {
		children: PT.node,
	};

	static defaultProps = {
		children: undefined,
	};

	render() {
		const { children } = this.props;

		return (
			<div>
				<Helmet
					defaultTitle="Omni"
					titleTemplate="%s &middot; Omni"
				>
					<html lang="en" />
				</Helmet>
				{children}
			</div>
		);
	}
}
