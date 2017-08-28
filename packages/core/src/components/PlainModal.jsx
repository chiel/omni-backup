import PT from 'prop-types';
import React from 'react';
import { Gateway } from 'react-gateway';
import Modal2 from 'react-modal2';

import css from '../styles/plain-modal.css';

Modal2.getApplicationElement = () => (
	document.getElementById('omni-app')
);

export default class PlainModal extends React.PureComponent {
	static propTypes = {
		children: PT.node,
		onClose: PT.func.isRequired,
	};

	static defaultProps = {
		children: undefined,
	};

	componentDidMount() {
		document.body.style.overflow = 'hidden';
	}

	componentWillUnmount() {
		document.body.style.overflow = '';
	}

	render() {
		const { children, onClose } = this.props;

		return (
			<Gateway into="modal">
				<Modal2
					backdropClassName={css.backdrop}
					closeOnBackdropClick
					closeOnEsc
					modalClassName={css.modal}
					onClose={onClose}
				>
					{children}
				</Modal2>
			</Gateway>
		);
	}
}
