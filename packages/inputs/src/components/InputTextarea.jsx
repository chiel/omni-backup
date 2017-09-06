import PT from 'prop-types';
import React from 'react';

import withField from './Field';

import css from '../styles/input-textarea.css';

export class InputTextarea extends React.PureComponent {
	static propTypes = {
		onChange: PT.func,
		onUpdate: PT.func.isRequired,
		defaultValue: PT.string,
	};

	static defaultProps = {
		onChange: () => {},
		defaultValue: '',
	};

	constructor({ defaultValue }) {
		super();

		this.state = { value: defaultValue };
	}

	handleChange = ev => {
		this.setState({ value: ev.target.value });
		this.props.onUpdate(ev.target.value);
		this.props.onChange(ev);
	}

	render() {
		const { ...props } = this.props;

		delete props.onUpdate;
		delete props.defaultValue;

		return (
			<div className={css.input}>
				<pre><span>{this.state.value}</span><br /></pre>
				<textarea
					{...props}
					onChange={this.handleChange}
					value={this.state.value}
				/>
			</div>
		);
	}
}

export default withField(InputTextarea);
