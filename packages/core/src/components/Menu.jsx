import PT from 'prop-types';
import React from 'react';

import MenuItem from './MenuItem';

import css from '../styles/menu.css';
import * as types from '../types';

export default class Menu extends React.PureComponent {
	static propTypes = {
		items: PT.arrayOf(types.menuItem).isRequired,
	};

	render() {
		const { items } = this.props;

		return (
			<nav className={css.menu}>
				{items.map(item => (
					<MenuItem item={item} key={item.link} />
				))}
			</nav>
		);
	}
}
