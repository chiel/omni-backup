import PT from 'prop-types';
import React from 'react';

import withField from './Field';

import css from '../styles/input-options.css';

export class InputMultiOption extends React.PureComponent {
	static propTypes = {
		defaultValue: PT.arrayOf(PT.string),
		name: PT.string.isRequired,
		options: PT.arrayOf(PT.shape({
			label: PT.string.isRequired,
			value: PT.string.isRequired,
		})).isRequired,
		onUpdate: PT.func.isRequired,
	};

	static defaultProps = {
		defaultValue: [],
	};

	static defaultValue = [];

	constructor({ defaultValue }) {
		super();

		this.state = { selected: defaultValue };
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

		delete props.defaultValue;
		delete props.onUpdate;

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
