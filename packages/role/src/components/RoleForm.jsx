import Button from '@ocm/core/dist/components/Button';
import withForm from '@ocm/core/dist/components/Form';
import { capitalize } from '@ocm/core/dist/utils/stringHelpers';
import PT from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { createRole } from '../actions/role';

export class RoleForm extends React.PureComponent {
	static propTypes = {
		dispatch: PT.func.isRequired,
		fields: PT.objectOf(PT.func).isRequired,
		formValidate: PT.func.isRequired,
		permissions: PT.objectOf(PT.arrayOf(PT.shape({
			description: PT.string.isRequired,
			name: PT.string.isRequired,
		}))).isRequired,
	};

	handleSubmit = ev => {
		const { dispatch, formValidate } = this.props;

		ev.preventDefault();
		formValidate()
			.then(values => {
				dispatch(createRole(values));
			})
			.catch(() => {});
	}

	render() {
		const { fields, permissions } = this.props;

		return (
			<form onSubmit={this.handleSubmit}>
				<h1>Create new role</h1>
				<fields.name />
				{Object.keys(permissions).map(plugin => {
					const Field = fields[`plugin_${plugin}`];
					return <Field key={plugin} />;
				})}
				<Button primary submit>submit</Button>
			</form>
		);
	}
}

export default withForm(({ permissions }) => {
	const fields = {};
	Object.keys(permissions).forEach(plugin => {
		fields[`plugin_${plugin}`] = {
			type: 'multi_option',
			label: `${capitalize(plugin)} permissions`,
			name: `plugins[${plugin}]`,
			options: permissions[plugin].map(permission => ({
				label: permission.description,
				value: permission.name,
			})),
		};
	});

	return {
		fields: {
			name: {
				type: 'text',
				label: 'Name',
				placeholder: 'e.g. Editor',
			},
			...fields,
		},
	};
})(connect()(RoleForm));
