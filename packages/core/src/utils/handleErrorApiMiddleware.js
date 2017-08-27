// eslint-disable-next-line no-unused-vars
export default function handleErrorApiMiddleware(err, req, res, next) {
	if (err.status !== 404) {
		console.error(err.stack || err);
	}

	res.status(err.status || 500).json({
		error: {
			type: err.type,
			message: err.message,
		},
	});
}
