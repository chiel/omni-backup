export default function createInsert(pool) {
	return (table, data) => new Promise((resolve, reject) => {
		pool.getConnection((err, conn) => {
			if (err) {
				return reject(err);
			}

			const query = `INSERT INTO ${table} SET ?`;
			conn.query(query, data, (err, result) => {
				conn.release();
				if (err) {
					return reject(err);
				}

				resolve(result);
			});
		});
	});
}
