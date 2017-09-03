import PT from 'prop-types';
import React from 'react';

import css from '../styles/panel-directory.css';

export default class PanelDirectory extends React.PureComponent {
	static propTypes = {
		addPanel: PT.func.isRequired,
		data: PT.shape({
			files: PT.arrayOf(PT.shape({
				name: PT.string.isRequired,
				type: PT.string.isRequired,
			})).isRequired,
			path: PT.string.isRequired,
		}).isRequired,
	};

	handleClick = ev => {
		const { path } = this.props.data;
		const { file } = ev.target.dataset;

		this.props.addPanel(`${path}${path === '/' ? '' : '/'}${file}`);
	}

	render() {
		const { data } = this.props;

		return (
			<div className={css.container}>
				{data.files.map(file => (
					<button
						key={file.name}
						type="button"
						className={css.file}
						onClick={this.handleClick}
						data-file={file.name}
					>{file.name}</button>
				))}
			</div>
		);
	}
}
