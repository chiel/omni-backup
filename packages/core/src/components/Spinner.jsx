import PT from 'prop-types';
import React from 'react';

import css from '../styles/spinner.css';

export default class Spinner extends React.PureComponent {
	static propTypes = {
		message: PT.string,
	};

	static defaultProps = {
		message: '',
	};

	render() {
		const { message } = this.props;
		return (
			<div className={css.container}>
				<div className={css.spinner}>
					<div className={css.cube1} />
					<div className={css.cube2} />
					<div className={css.cube4} />
					<div className={css.cube3} />
				</div>
				{message !== '' && (
					<p className={css.message}>{message}</p>
				)}
			</div>
		);
	}
}
