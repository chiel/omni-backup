import PT from 'prop-types';
import React from 'react';

import withField from './Field';

import css from '../styles/input-options.css';

export class InputMultiOption extends React.PureComponent {
	static propTypes = {
		name: PT.string.isRequired,
		options: PT.arrayOf(PT.shape({
			label: PT.string.isRequired,
			value: PT.string.isRequired,
		})).isRequired,
		onUpdate: PT.func.isRequired,
		value: PT.arrayOf(PT.string),
	};

	static defaultProps = {
		value: [],
	};

	static defaultValue = [];

	constructor({ value }) {
		super();

		this.state = { selected: value };
	}

	handleChange = ev => {
		let selected;
		if (ev.target.checked) {
			selected = [...this.state.selected, ev.target.value];
		} else {
			selected = [...this.state.selected];
			selected.splice(selected.indexOf(ev.target.value), 1);
		}

		this.setState({ selected });
		this.props.onUpdate(selected);
	}

	render() {
		const { name, options, ...props } = this.props;
		const { selected } = this.state;

		delete props.onUpdate;
		delete props.value;

		return (
			<div>
				<fieldset
					className={css.options}
				>
					{options.map((option, i) => (
						<div key={`input-${option.value}`} className={css.option}>
							<input
								type="checkbox"
								checked={selected.includes(option.value)}
								id={`${name}_${i}`}
								name={`${name}[]`}
								onChange={this.handleChange}
								value={option.value}
							/>
							<label
								htmlFor={`${name}_${i}`}
							>
								{option.label}
							</label>
						</div>
					))}
				</fieldset>
			</div>
		);
	}
}

export default withField(InputMultiOption);
