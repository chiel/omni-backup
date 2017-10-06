import React from 'react';

import Logo from './Logo';
import Menu from './Menu';
import UserMenu from './UserMenu';

import menuItems from '../menuItems';
import css from '../styles/header.css';

export default function Header() {
	return (
		<header className={css.header}>
			<div className={css.topNav}>
				<Logo />
				<Menu items={menuItems} />
			</div>
			<UserMenu />
		</header>
	);
}
