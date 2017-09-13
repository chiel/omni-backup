import React from 'react';

import css from '../styles/google-login.css';

export default function GoogleLogin() {
	return (
		<a className={css.container} href="/auth/google">
			Log in with Google
		</a>
	);
}
