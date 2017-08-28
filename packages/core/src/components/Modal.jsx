import PT from 'prop-types';
import React from 'react';

import PlainModal from './PlainModal';

import css from '../styles/modal.css';

export default class Modal extends React.PureComponent {
	static propTypes = {
		children: PT.node,
		onClose: PT.func.isRequired,
		title: PT.string,
	};

	static defaultProps = {
		children: undefined,
		title: '',
	};

	render() {
		const { children, onClose, title } = this.props;

		return (
			<PlainModal onClose={onClose}>
				<header className={css.header}>
					{title !== '' && (
						<h1 className={css.title}>{title}</h1>
					)}
					<button
						type="button"
						className={css.close}
						onClick={onClose}
					>Close</button>
				</header>
				<div className={css.body}>
					{children}
				</div>
			</PlainModal>
		);
	}
}
