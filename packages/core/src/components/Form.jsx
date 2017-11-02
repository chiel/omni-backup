import hoistStatics from 'hoist-non-react-statics';
import React from 'react';

import inputTypes from '../inputs';
import css from '../styles/form.css';

export default config => WrappedForm => hoistStatics(class Form extends React.PureComponent {
	static defaultProps = {
		values: {},
	};

	constructor({ values }) {
		super();

		this.fieldCache = {};

		this.state = {
			errors: {},
			values: this.generateDefaultValues(values),
		};
	}

	handleUpdate = field => value => {
		this.setState({
			values: {
				...this.state.values,
				[field]: value,
			},
		});
	}

	fieldValid(fieldName, validators, value) {
		return validators.reduce((a, b) => a.then(b), Promise.resolve(value))
			.then(finalValue => {
				this.setState({
					errors: {
						...this.state.errors,
						[fieldName]: undefined,
					},
				});

				return finalValue;
			})
			.catch(err => {
				this.setState({
					errors: {
						...this.state.errors,
						[fieldName]: err.message,
					},
				});

				throw err;
			});
	}

	formValidate = () => {
		const { values } = this.state;

		const promises = Object.keys(config.fields)
			.filter(fieldName => (
				config.fields[fieldName].validators !== undefined
			))
			.map(fieldName => this.fieldValid(
				fieldName,
				config.fields[fieldName].validators,
				values[fieldName],
			));

		return Promise.all(promises)
			.then(() => values);
	}

	// eslint-disable-next-line class-methods-use-this
	generateDefaultValues(givenValues) {
		const values = { ...givenValues };

		Object.keys(config.fields).forEach(fieldName => {
			if (values[fieldName] !== undefined) {
				return;
			}

			const { type } = config.fields[fieldName];
			values[fieldName] = inputTypes[type].defaultValue || '';
		});

		return values;
	}

	generateFields() {
		const { values } = this.state;

		const fields = {};
		Object.keys(config.fields).forEach(fieldName => {
			if (this.fieldCache[fieldName]) {
				fields[fieldName] = this.fieldCache[fieldName];
				return;
			}

			const { type, ...field } = config.fields[fieldName];
			const InputType = inputTypes[type];

			delete field.validators;

			fields[fieldName] = () => (
				<InputType
					{...field}
					defaultValue={values[fieldName]}
					error={this.state.errors[fieldName]}
					onUpdate={this.handleUpdate(fieldName)}
				/>
			);

			this.fieldCache[fieldName] = fields[fieldName];
		});

		return fields;
	}

	render() {
		return (
			<div className={css.form}>
				<WrappedForm
					fields={this.generateFields()}
					formValidate={this.formValidate}
					values={this.state.values}
				/>
			</div>
		);
	}
}, WrappedForm);
