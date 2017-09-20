import PT from 'prop-types';
import React from 'react';

import DropzoneContainer from './DropzoneContainer';

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

	constructor() {
		super();

		this.state = {
			selected: [],
			lastSelectedItem: '',
		};
	}

	handleClick = ev => {
		switch (true) {
		case (ev.shiftKey && (ev.ctrlKey || ev.metaKey)):
			this.handleShiftClick(ev, true);
			break;
		case ev.ctrlKey:
		case ev.metaKey:
			this.handleCtrlClick(ev);
			break;
		case ev.shiftKey:
			this.handleShiftClick(ev);
			break;
		default:
			this.handleLeftClick(ev);
			break;
		}
	}

	handleShiftClick = (ev, withCtrl = false) => {
		const { path } = this.props.data;
		const { file } = ev.target.dataset;
		const { selected, lastSelectedItem } = this.state;

		// create variables that holds the indexes of the selections in all files
		let lastSelectedIndex = -1;
		let currentSelectedIndex = -1;

		// if the user is not holding control we need to clear the previous selection
		if (!withCtrl) {
			selected.length = 0;
		}

		// get the indexes for the last selected file and the currently selected file
		this.props.data.files.forEach((fileObj, index) => {
			if (fileObj.name === lastSelectedItem) {
				lastSelectedIndex = index;
			}
			if (fileObj.name === file) {
				currentSelectedIndex = index;
			}
		});

		// select all files that are between the last selected and currently selected file
		if (
			lastSelectedIndex > -1 &&
			currentSelectedIndex > -1 &&
			lastSelectedIndex !== currentSelectedIndex
		) {
			this.props.data.files.forEach((fileObj, index) => {
				const minIndex = Math.min(lastSelectedIndex, currentSelectedIndex);
				const maxIndex = Math.max(lastSelectedIndex, currentSelectedIndex);
				if (index >= minIndex && index <= maxIndex && selected.indexOf(fileObj.name) === -1) {
					selected.push(fileObj.name);
				}
			});
		}

		this.setState({
			selected,
			lastSelectedItem: file,
		});
		this.props.addPanel(`${path}${path === '/' ? '' : '/'}${file}`);
	}

	handleCtrlClick = ev => {
		const { path } = this.props.data;
		const { file } = ev.target.dataset;
		const { selected } = this.state;

		// check if we have the file already in our selection or not
		const selectedIndex = selected.indexOf(file);
		if (selectedIndex > 0) {
			// unselect the file
			selected.splice(selectedIndex, 1);
		} else {
			// add it to the selection
			selected.push(file);
		}

		this.setState({
			selected,
			lastSelectedItem: file,
		});
		this.props.addPanel(`${path}${path === '/' ? '' : '/'}${file}`);
	}

	handleLeftClick = ev => {
		const { path } = this.props.data;
		const { file } = ev.target.dataset;

		this.setState({
			selected: [file],
			lastSelectedItem: file,
		});
		this.props.addPanel(`${path}${path === '/' ? '' : '/'}${file}`);
	}

	render() {
		const { data } = this.props;
		const { selected } = this.state;

		return (
			<div className={css.container}>
				<div className={css.fileList}>
					{data.files.map(file => {
						const classes = [css.item, css[file.type]];
						if (selected.indexOf(file.name) > -1) classes.push(css.selected);
						return (
							<button
								key={file.name}
								type="button"
								className={classes.join(' ')}
								onClick={this.handleClick}
								data-file={file.name}
							>{file.name}</button>
						);
					})}
				</div>
				<DropzoneContainer path={data.path} />
			</div>
		);
	}
}
