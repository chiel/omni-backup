/* eslint-disable indent */
const createTableQuery = (
`create table if not exists user (
	id int(11) not null auto_increment,
	first_name varchar(50) not null,
	last_name varchar(50) not null,
	email varchar(255) not null,
	image text null,
	superadmin boolean not null default false,
	created_at datetime not null default now(),
	primary key (id)
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;`
);
/* eslint-enable indent */

export default function userPlugin(omni) {
	omni.mysql.query(createTableQuery)
		.then(result => {
			if (result.warningCount === 0) {
				console.info('Created user table');
			}
		});
}
