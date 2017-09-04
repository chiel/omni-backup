import PT from 'prop-types';
import React from 'react';

import PanelFile from './PanelFile';

import css from '../styles/panel-image.css';

export default class PanelImage extends React.PureComponent {
	static propTypes = {
		data: PT.shape({
			created_at: PT.string,
			name: PT.string,
			path: PT.string,
			size: PT.string,
			updated_at: PT.string,
		}).isRequired,
	};

	static isType(file) {
		return /\.(?:gif|jpe?g|png|webp)$/.test(file);
	}

	render() {
		const { data } = this.props;

		return (
			<PanelFile data={data}>
				<figure className={css.image}>
					<img src={`/uploads${data.path}`} alt={data.name} />
				</figure>
			</PanelFile>
		);
	}
}
