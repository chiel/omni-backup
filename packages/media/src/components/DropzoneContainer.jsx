import PT from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Dropzone from './Dropzone';

import { uploadFiles } from '../actions/finder';

export class DropzoneContainer extends React.PureComponent {
	static propTypes = {
		dispatch: PT.func.isRequired,
		path: PT.string.isRequired,
	};

	constructor() {
		super();

		this.state = {
			active: false,
		};
	}

	componentDidMount() {
		document.addEventListener('dragover', this.handleDragOver);
	}

	componentWillUnmount() {
		document.removeEventListener('dragenter', this.handleDragOver);
		clearTimeout(this.timeout);
	}

	handleDragEnd = () => {
		if (this.state.active) {
			this.setState({ active: false });
		}
	}

	handleDragOver = () => {
		if (!this.state.active) {
			this.setState({ active: true });
		}

		clearTimeout(this.timeout);
		this.timeout = setTimeout(this.handleDragEnd, 100);
	}

	handleUpload = files => {
		this.props.dispatch(uploadFiles(this.props.path, files));
	}

	render() {
		const { path } = this.props;

		if (!this.state.active) return null;

		return (
			<Dropzone
				onUpload={this.handleUpload}
				path={path}
			/>
		);
	}
}

export default connect()(DropzoneContainer);
