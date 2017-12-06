import createAction from 'app/utils/createAsyncAction';

describe('createAsyncAction', () => {
	it('returns a function with correct static `start`, `success` and `error` properties', () => {
		const actual = createAction('game', 'get', () => {});

		expect(typeof actual).toEqual('function');
		expect(actual.start).toEqual('poki_portal/game/get_start');
		expect(actual.success).toEqual('poki_portal/game/get_success');
		expect(actual.error).toEqual('poki_portal/game/get_error');
	});

	it('returns a function that returns an action creator', () => {
		const actual = createAction('game', 'get', () => {});
		expect(typeof actual()).toEqual('function');
	});

	it('calls dispatch with the `start` and `success` actions for a resolved action', () => {
		expect.assertions(2);

		let callCount = 0;
		const dispatch = jest.fn(action => {
			if (typeof action === 'function') {
				console.log('function action', action);
				return Promise.resolve();
			}

			callCount++;

			if (callCount === 1) {
				expect(action).toEqual({
					type: 'poki_portal/game/get_start',
					args: ['arg1'],
				});
			}

			if (callCount === 2) {
				expect(action).toEqual({
					type: 'poki_portal/game/get_success',
					args: ['arg1'],
					payload: { foo: 'bar' },
				});
			}
		});

		const actual = createAction('game', 'get', () => () => Promise.resolve({ foo: 'bar' }));
		actual('arg1')({ dispatch });
	});
});
