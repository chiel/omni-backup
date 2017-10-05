import React from 'react';

import Logo from './Logo';
import UserMenu from './UserMenu';

import css from '../styles/header.css';

export default function Header() {
	return (
		<header className={css.header}>
			<Logo />
			<UserMenu />
		</header>
	);
}
