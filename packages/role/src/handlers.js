export function createCreateHandler({ mysql }) {
	return function createHandler(req, res) {
		console.log('create things', req.body);
		mysql.insert('role', {
			name: req.body.name,
			created_at: new Date(),
		})
			.then(role => {
				res.json(role);
			});
	};
}
