import PT from 'prop-types';
import React from 'react';

import css from '../styles/dropzone.css';

export default class Dropzone extends React.PureComponent {
	static propTypes = {
		onUpload: PT.func.isRequired,
		path: PT.string.isRequired,
	};

	handleDragOver = ev => {
		ev.preventDefault();
	}

	handleDrop = ev => {
		ev.preventDefault();
		this.props.onUpload([...ev.dataTransfer.files]);
	}

	render() {
		const { path } = this.props;

		return (
			<div
				className={css.dropzone}
				onDragOver={this.handleDragOver}
				onDrop={this.handleDrop}
			>
				<p>Drop files to upload to <strong>{path}</strong></p>
			</div>
		);
	}
}
