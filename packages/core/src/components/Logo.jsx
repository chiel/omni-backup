import React from 'react';
import { Link } from 'react-router';

import css from '../styles/logo.css';

export default function Logo() {
	return (
		<Link className={css.logo} to="/">
			Omni
		</Link>
	);
}
