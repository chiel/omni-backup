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
			selected: '',
		};
	}

	handleClick = ev => {
		const { path } = this.props.data;
		const { file } = ev.target.dataset;

		this.setState({ selected: file });
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
						if (selected === file.name) classes.push(css.selected);
						return (
							<button
								key={file.name}
								type="button"
								className={classes.join(' ')}
								onClick={this.handleClick}
								data-file={file.name}
							>
								{file.name}
							</button>
						);
					})}
				</div>
				<DropzoneContainer path={data.path} />
			</div>
		);
	}
}
