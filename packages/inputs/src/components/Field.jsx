import hoistStatics from 'hoist-non-react-statics';
import PT from 'prop-types';
import React from 'react';

import css from '../styles/field.css';

export default WrappedInput => hoistStatics(class Field extends React.PureComponent {
	static propTypes = {
		error: PT.string,
		hint: PT.string,
		id: PT.string,
		label: PT.string,
		onBlur: PT.func.isRequired,
		onFocus: PT.func.isRequired,
	};

	static defaultProps = {
		error: '',
		hint: '',
		id: '',
		label: '',
		onBlur: () => {},
		onFocus: () => {},
	};

	constructor() {
		super();

		this.state = {
			focussed: false,
		};
	}

	handleBlur = ev => {
		this.setState({ focussed: false });
		this.props.onBlur(ev);
	}

	handleFocus = ev => {
		this.setState({ focussed: true });
		this.props.onFocus(ev);
	}

	render() {
		const { error, hint, label, ...props } = this.props;
		const { focussed } = this.state;

		const classes = [css.field];
		if (focussed) classes.push(css.focussed);

		let id = props.id;
		if (!id && props.name) {
			id = `field-${props.name}`;
			props.id = id;
		}

		return (
			<div className={classes.join(' ')}>
				{label !== '' && (
					<label
						className={css.label}
						htmlFor={id}
					>
						{label} {hint !== '' && (
							<em className={css.hint}>{hint}</em>
						)}
					</label>
				)}
				<WrappedInput
					{...props}
					onBlur={this.handleBlur}
					onFocus={this.handleFocus}
				/>
				{error !== '' && (
					<em className={css.error}>{error}</em>
				)}
			</div>
		);
	}
}, WrappedInput);
