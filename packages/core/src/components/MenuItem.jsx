import React from 'react';
import { Link } from 'react-router';

import css from '../styles/menu-item.css';
import * as types from '../types';

export default class MenuItem extends React.PureComponent {
	static propTypes = {
		item: types.menuItem.isRequired,
	};

	render() {
		const { item } = this.props;

		return (
			<Link className={css.menuItem} to={item.link}>
				{item.icon}
				<span>{item.label}</span>
			</Link>
		);
	}
}
