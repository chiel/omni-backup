import PT from 'prop-types';
import React from 'react';

import css from '../styles/button.css';

export default class Button extends React.PureComponent {
	static propTypes = {
		children: PT.node,
		className: PT.string,
		color: PT.oneOf([
			'blue',
			'green',
			'orange',
			'red',
			'yellow',
		]),
		primary: PT.bool,
		small: PT.bool,
		submit: PT.bool,
	};

	static defaultProps = {
		children: undefined,
		className: undefined,
		color: undefined,
		primary: false,
		small: false,
		submit: false,
	};

	render() {
		const { children, className, color, primary, small, submit, ...props } = this.props;

		const classes = [css.button];
		if (color) classes.push(css[color]);
		if (primary) classes.push(css.primary);
		if (small) classes.push(css.small);
		if (className) classes.push(className);

		return (
			<button
				{...props}
				className={classes.join(' ')}
				type={submit ? 'submit' : 'button'}
			>
				{children}
			</button>
		);
	}
}
