import mysql from 'mysql';

import createInsert from './createInsert';

export default function mysqlPlugin(omni) {
	const pool = mysql.createPool({
		host: process.env.MYSQL_DB_HOST,
		user: process.env.MYSQL_DB_USER,
		password: process.env.MYSQL_DB_PASS,
		database: process.env.MYSQL_DB_NAME,
	});

	omni.mysql = {
		insert: createInsert(pool),
	};
}
