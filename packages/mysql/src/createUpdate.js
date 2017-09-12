import createSelect from './createSelect';

export default function createUpdate(pool) {
	return (table, id, data) => new Promise((resolve, reject) => {
		pool.getConnection((err, conn) => {
			if (err) {
				return reject(err);
			}

			const fields = [];
			const values = [];
			Object.keys(data).forEach(field => {
				fields.push(field);
				values.push(data[field]);
			});

			const query = [
				`UPDATE ${table} SET`,
				fields.map(field => `${field} = ?`).join(', '),
				`WHERE id = ${id}`,
			].join(' ');

			conn.query(query, values, err => {
				conn.release();
				if (err) {
					return reject(err);
				}

				createSelect(pool)('user', id)
					.then(resolve)
					.catch(reject);
			});
		});
	});
}
