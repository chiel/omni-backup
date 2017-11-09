import mysql from 'mysql';

import createCreateTable from './createCreateTable';
import createDelete from './createDelete';
import createInsert from './createInsert';
import createQuery from './createQuery';
import createSelect from './createSelect';
import createUpdate from './createUpdate';

export default function mysqlPlugin(omni) {
	const pool = mysql.createPool({
		host: process.env.MYSQL_DB_HOST,
		user: process.env.MYSQL_DB_USER,
		password: process.env.MYSQL_DB_PASS,
		database: process.env.MYSQL_DB_NAME,
	});

	omni.mysql = {
		createTable: createCreateTable(pool),
		delete: createDelete(pool),
		insert: createInsert(pool),
		query: createQuery(pool),
		select: createSelect(pool),
		update: createUpdate(pool),
	};
}
