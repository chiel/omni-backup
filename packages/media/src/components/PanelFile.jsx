import PT from 'prop-types';
import React from 'react';

import css from '../styles/panel-file.css';

export default class PanelFile extends React.PureComponent {
	static propTypes = {
		children: PT.node,
		data: PT.shape({
			created_at: PT.string,
			name: PT.string,
			path: PT.string,
			size: PT.number,
			updated_at: PT.string,
		}).isRequired,
	};

	static defaultProps = {
		children: undefined,
	};

	render() {
		const { children, data } = this.props;

		return (
			<div className={css.container}>
				{children}
				<h2>{data.name}</h2>
				<dl className={css.details}>
					<dt>Size</dt>
					<dd>{data.size} bytes</dd>

					<dt>Path</dt>
					<dd>{data.path}</dd>

					<dt>Created</dt>
					<dd>{data.created_at}</dd>

					<dt>Modified</dt>
					<dd>{data.updated_at}</dd>
				</dl>
			</div>
		);
	}
}
