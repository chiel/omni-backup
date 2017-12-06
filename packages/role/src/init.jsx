import React from 'react';

import RoleForm from './components/RoleForm';

export default function init(omni) {
	const permissions = {};

	const addPermission = (plugin, name, description) => {
		if (!permissions[plugin]) {
			permissions[plugin] = [];
		}

		permissions[plugin].push({ name, description });
	};

	addPermission('role', 'create', 'Create new roles');
	addPermission('role', 'edit', 'Edit roles');
	addPermission('role', 'delete', 'Delete roles');

	omni.addRoute({
		path: '/roles/add',
		component: () => <RoleForm permissions={permissions} />,
	});

	omni.role = { addPermission };
}
