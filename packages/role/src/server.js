import { createCreateHandler } from './handlers';
import init from './init';

const createTableQueries = [
	{
		table: 'role',
		query: (
			`create table if not exists role (
				id int(11) not null auto_increment,
				name varchar(50) not null,
				created_at datetime not null default now(),
				primary key (id)
			) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;`
		),
	},
	{
		table: 'role_permissions',
		query: (
			`create table if not exists role_permissions (
				role_id int(11) not null auto_increment,
				plugin varchar(50) not null,
				name varchar(50) not null,
				primary key (role_id, plugin, name)
			) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;`
		),
	},
];

export default function rolePlugin(omni) {
	init(omni);

	Promise.all(
		createTableQueries.map(({ query, table }) => (
			omni.mysql.createTable(table, query)
		)),
	)
		.catch(err => {
			console.error(err);
		});

	omni.api.post('/roles', createCreateHandler(omni));
}
