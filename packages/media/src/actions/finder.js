import createAction from '@ocm/core/dist/utils/createAsyncAction';

export const addPanel = createAction('media/finder/add-panel', (index, path) => (
	({ callApi }) => (
		callApi(`/media?path=${path}`, { method: 'get' })
			.then(({ body }) => body)
	)
));
