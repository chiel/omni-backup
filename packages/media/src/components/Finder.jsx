import Button from '@ocm/core/dist/components/Button';
import Spinner from '@ocm/core/dist/components/Spinner';
import PT from 'prop-types';
import React from 'react';

import panelTypes from '../panels';
import css from '../styles/finder.css';

export default class Finder extends React.PureComponent {
	static propTypes = {
		createAddPanel: PT.func.isRequired,
		onSelect: PT.func.isRequired,
		panels: PT.arrayOf(PT.shape({
			data: PT.object,
			done: PT.bool,
			error: PT.string,
			path: PT.string,
			pending: PT.bool,
		})).isRequired,
	};

	renderPanel(panel, index) {
		const { createAddPanel } = this.props;

		if (panel.data) {
			const PanelType = panelTypes[panel.data.type];
			if (PanelType) {
				return (
					<PanelType
						addPanel={createAddPanel(index)}
						data={panel.data}
					/>
				);
			}

			return (
				<div className={css.error}>
					Sorry, could not find a panel renderer for type
					`{panel.data.type}`.
				</div>
			);
		}

		if (panel.error) {
			return (
				<div className={css.error}>{panel.error}</div>
			);
		}

		return <Spinner message="Loading" />;
	}

	render() {
		const { onSelect, panels } = this.props;

		return (
			<div className={css.container}>
				<div className={css.scroll}>
					<div className={css.panels}>
						{panels.map((panel, i) => (
							<div key={panel.path} className={css.panel}>
								{this.renderPanel(panel, i)}
							</div>
						))}
					</div>
				</div>
				<footer className={css.footer}>
					<Button
						onClick={onSelect}
						primary
						small
					>
						Select
					</Button>
				</footer>
			</div>
		);
	}
}
