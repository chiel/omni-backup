import withForm from '@omni/core/dist/components/Form';
import * as validators from '@omni/validators';
import PT from 'prop-types';
import React from 'react';

export class TestForm extends React.PureComponent {
	static propTypes = {
		fields: PT.objectOf(PT.func).isRequired,
		formValidate: PT.func.isRequired,
	};

	handleSubmit = ev => {
		ev.preventDefault();
		this.props.formValidate()
			.then(values => {
				console.info('VALID', values);
			})
			.catch(() => {});
	}

	render() {
		const { fields } = this.props;

		return (
			<form onSubmit={this.handleSubmit}>
				<fields.first_name />
				<fields.last_name />
				<fields.password />
				<fields.biography />
				<fields.gender />
				<fields.interests />
				<button type="submit">submit</button>
			</form>
		);
	}
}

export default withForm({
	fields: {
		first_name: {
			type: 'text',
			label: 'First name',
			name: 'first_name',
			placeholder: 'e.g. John',
			validators: [
				validators.required('Please enter your first name.'),
			],
		},
		last_name: {
			type: 'text',
			label: 'Last name',
			name: 'last_name',
			placeholder: 'e.g. Doe',
			validators: [
				validators.required('Please enter your last name.'),
			],
		},
		password: {
			type: 'password',
			label: 'Password',
			name: 'password',
			placeholder: 'e.g. correct-horse-battery-stable',
			hint: 'Maybe something that is not "password123".',
			validators: [
				validators.required('Please enter your password.'),
			],
		},
		biography: {
			type: 'textarea',
			label: 'Biography',
			name: 'biography',
			placeholder: 'e.g. I have a horse. My horse is amazing.',
			validators: [
				validators.required('Please tell us about yourself.'),
			],
		},
		gender: {
			type: 'single_option',
			label: 'Gender',
			name: 'gender',
			options: [
				{ label: 'Male', value: 'male' },
				{ label: 'Female', value: 'female' },
				{ label: 'Other', value: 'other' },
			],
		},
		interests: {
			type: 'multi_option',
			label: 'Interests',
			name: 'interests',
			options: [
				{ label: 'Coding', value: 'coding' },
				{ label: 'Gaming', value: 'gaming' },
				{ label: 'Surfing', value: 'surfing' },
			],
		},
	},
})(TestForm);
