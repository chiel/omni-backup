export default function createDelete(pool) {
	return (table, id) => new Promise((resolve, reject) => {
		pool.getConnection((err, conn) => {
			if (err) {
				return reject(err);
			}

			const query = `DELETE FROM ${table} WHERE id = ?`;
			conn.query(query, [id], (err, result) => {
				conn.release();
				if (err) {
					return reject(err);
				}

				resolve(result);
			});
		});
	});
}
