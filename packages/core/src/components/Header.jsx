import React from 'react';

import Logo from './Logo';

import css from '../styles/header.css';

export default function Header() {
	return (
		<header className={css.header}>
			<Logo />
		</header>
	);
}
