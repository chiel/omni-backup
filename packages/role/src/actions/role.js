import createAction from '@ocm/core/dist/utils/createAsyncAction';

export const createRole = createAction('role.create', role => (
	({ callApi }) => {
		return callApi('/roles', {
			method: 'post',
			body: JSON.stringify(role),
		})
			.then(({ body }) => {
				console.log('BODY', body);
			});
	}
));
