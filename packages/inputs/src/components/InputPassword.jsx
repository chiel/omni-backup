import PT from 'prop-types';
import React from 'react';

import withField from './Field';

import css from '../styles/input.css';

export class InputText extends React.PureComponent {
	static propTypes = {
		onChange: PT.func,
		onUpdate: PT.func,
	};

	static defaultProps = {
		onChange: () => {},
		onUpdate: () => {},
	};

	constructor() {
		super();

		this.state = {
			showPassword: false,
		};
	}

	handleChange = ev => {
		this.props.onUpdate(ev.target.value);
		this.props.onChange(ev);
	}

	handleTogglePassword = ev => {
		ev.preventDefault();
		this.input.focus();
		this.setState({
			showPassword: !this.state.showPassword,
		});
	}

	render() {
		const { ...props } = this.props;
		const { showPassword } = this.state;

		const buttonClasses = [css.icon, css.iconEye];
		if (showPassword) buttonClasses.push(css.iconActive);

		delete props.onUpdate;

		return (
			<div className={css.input}>
				<input
					{...props}
					onChange={this.handleChange}
					ref={el => { this.input = el; }}
					type={showPassword ? 'text' : 'password'}
				/>
				<button
					type="button"
					className={buttonClasses.join(' ')}
					onMouseDown={this.handleTogglePassword}
					tabIndex={-1}
				>
					{showPassword ? 'Hide' : 'Show'} password
				</button>
			</div>
		);
	}
}

export default withField(InputText);
