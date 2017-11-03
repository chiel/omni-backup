import PT from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import css from '../styles/user-menu.css';

export class UserMenu extends React.PureComponent {
	static propTypes = {
		user: PT.shape({
			first_name: PT.string.isRequired,
			last_name: PT.string.isRequired,
			image: PT.string.isRequired,
		}).isRequired,
	};

	render() {
		const { user } = this.props;

		return (
			<div className={css.menu}>
				<figure className={css.avatar}>
					<img
						alt={`${user.first_name} ${user.last_name}`}
						src={user.image}
					/>
				</figure>
			</div>
		);
	}
}

export default connect(state => ({
	user: state.session.user,
}))(UserMenu);
