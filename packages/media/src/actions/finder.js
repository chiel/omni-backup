import createAsyncAction from '@ocm/core/dist/utils/createAsyncAction';

export const addPanel = createAsyncAction('media/finder/add-panel', (index, path) => (
	({ callApi }) => (
		callApi(`/media?path=${path}`, { method: 'get' })
			.then(({ body }) => body)
	)
));

export const uploadFiles = createAsyncAction('media/finder/upload-files', (path, files) => (
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

export const deleteFiles = createAsyncAction('media/finder/delete-files', (path, files) => (
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
