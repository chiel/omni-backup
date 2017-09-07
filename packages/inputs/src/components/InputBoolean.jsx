import PT from 'prop-types';
import React from 'react';

import withField from './Field';

import css from '../styles/input-toggle.css';

export class InputBoolean extends React.PureComponent {
	static propTypes = {
		name: PT.string.isRequired,
		onChange: PT.func,
		onUpdate: PT.func.isRequired,
	};

	static defaultProps = {
		onChange: () => {},
	};

	handleChange = ev => {
		this.props.onUpdate(ev.target.value);
		this.props.onChange(ev);
	}

	render() {
		const { ...props } = this.props;
		const sliderId = `slider-${this.props.name}`;

		delete props.onUpdate;

		return (
			<div>
				<label
					className={css.toggle}
					htmlFor={sliderId}
				>
					<input
						{...props}
						id={sliderId}
						onChange={this.handleChange}
						type="checkbox"
					/>
					<div className={css.slider} />
				</label>
			</div>
		);
	}
}

export default withField(InputBoolean);
