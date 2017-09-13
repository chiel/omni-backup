export default function createQuery(pool) {
	return query => new Promise((resolve, reject) => {
		pool.getConnection((err, conn) => {
			if (err) {
				return reject(err);
			}

			conn.query(query, (err, result) => {
				conn.release();
				if (err) {
					return reject(err);
				}

				resolve(result);
			});
		});
	});
}
