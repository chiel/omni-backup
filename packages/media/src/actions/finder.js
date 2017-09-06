import createAction from '@ocm/core/dist/utils/createAsyncAction';

export const addPanel = createAction('media/finder/add-panel', (index, path) => (
	({ callApi }) => (
		callApi(`/media?path=${path}`, { method: 'get' })
			.then(({ body }) => body)
	)
));

export const uploadFiles = createAction('media/finder/upload-files', (path, files) => (
	({ callApi }) => {
		const data = new FormData();
		files.forEach(file => {
			data.append(file.name, file);
		});

		return callApi(`/media?path=${path}`, {
			method: 'post',
			body: data,
		})
			.then(({ body }) => body);
	}
));
