import createQuery from './createQuery';

export default function createCreateTable(pool) {
	return (table, query) => createQuery(pool)(query)
		.then(result => {
			if (result.warningCount === 0) {
				console.info(`Created ${table} table`);
			}
		});
}
