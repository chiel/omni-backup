import React from 'react';

import css from '../styles/spinner.css';

export default function Spinner() {
	return (
		<div className={css.container}>
			<div className={css.cube1} />
			<div className={css.cube2} />
			<div className={css.cube4} />
			<div className={css.cube3} />
		</div>
	);
}
