import PT from 'prop-types';
import React from 'react';
import { Gateway } from 'react-gateway';
import Modal2 from 'react-modal2';

import css from '../styles/modal.css';

Modal2.getApplicationElement = () => (
	document.getElementById('omni-app')
);

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

	componentDidMount() {
		document.body.style.overflow = 'hidden';
	}

	componentWillUnmount() {
		document.body.style.overflow = '';
	}

	render() {
		const { children, onClose, title } = this.props;

		return (
			<Gateway into="modal">
				<Modal2
					backdropClassName={css.backdrop}
					closeOnBackdropClick
					closeOnEsc
					modalClassName={css.modal}
					onClose={onClose}
				>
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
				</Modal2>
			</Gateway>
		);
	}
}
