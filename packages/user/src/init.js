export default function init(omni) {
	omni.role.addPermission('user', 'create', 'Create new users');
	omni.role.addPermission('user', 'edit', 'Edit users');
	omni.role.addPermission('user', 'delete', 'Delete users');
}
