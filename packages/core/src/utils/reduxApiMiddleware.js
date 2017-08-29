import callApi from './callApi';

export default function reduxApiMiddleware(args) {
	return next => action => (
		typeof action === 'function' ?
			action({ ...args, callApi }) :
			next(action)
	);
}
