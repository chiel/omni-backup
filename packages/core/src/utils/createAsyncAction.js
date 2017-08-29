export default function createAsyncAction(label, cb) {
	function exec(...args) {
		return ({ dispatch }) => {
			dispatch({ type: exec.start, args });

			return dispatch(cb(...args))
				.then(payload => {
					dispatch({ type: exec.success, args, payload });
					return payload;
				})
				.catch(err => {
					dispatch({ type: exec.error, args, error: err.message });
					throw err;
				});
		};
	}

	exec.start = `omni/${label}_start`;
	exec.success = `omni/${label}_success`;
	exec.error = `omni/${label}_error`;

	return exec;
}
