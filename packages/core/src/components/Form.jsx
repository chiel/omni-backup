import hoistStatics from 'hoist-non-react-statics';
import PT from 'prop-types';
import React from 'react';

import inputTypes from '../inputs';
import css from '../styles/form.css';

export default configFn => WrappedForm => hoistStatics(class Form extends React.PureComponent {
	static propTypes = {
		values: PT.objectOf(PT.any),
	};

	static defaultProps = {
		values: {},
	};

	constructor(props) {
		super();

		this.fieldCache = {};
		this.config = configFn(props);

		this.state = {
			errors: {},
			values: this.generateDefaultValues(props.values),
		};
	}

	componentWillReceiveProps(props) {
		this.config = configFn(props);
	}

	createHandleUpdate = field => value => {
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

		const promises = Object.keys(this.config.fields)
			.filter(fieldName => (
				this.config.fields[fieldName].validators !== undefined
			))
			.map(fieldName => this.fieldValid(
				fieldName,
				this.config.fields[fieldName].validators,
				values[fieldName],
			));

		return Promise.all(promises)
			.then(() => values);
	}

	// eslint-disable-next-line class-methods-use-this
	generateDefaultValues(givenValues) {
		const values = { ...givenValues };

		Object.keys(this.config.fields).forEach(fieldName => {
			if (values[fieldName] !== undefined) {
				return;
			}

			const { type } = this.config.fields[fieldName];
			values[fieldName] = inputTypes[type].defaultValue || '';
		});

		return values;
	}

	generateFields() {
		const { values } = this.state;

		const fields = {};
		Object.keys(this.config.fields).forEach(fieldName => {
			if (this.fieldCache[fieldName]) {
				fields[fieldName] = this.fieldCache[fieldName];
				return;
			}

			const { type, ...field } = this.config.fields[fieldName];
			const handleUpdate = this.createHandleUpdate(fieldName);
			const InputType = inputTypes[type];

			delete field.validators;

			fields[fieldName] = () => (
				<InputType
					{...field}
					defaultValue={values[fieldName]}
					error={this.state.errors[fieldName]}
					onUpdate={handleUpdate}
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
					{...this.props}
					fields={this.generateFields()}
					formValidate={this.formValidate}
					values={this.state.values}
				/>
			</div>
		);
	}
}, WrappedForm);
