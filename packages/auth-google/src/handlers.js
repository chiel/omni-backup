import fetch from 'node-fetch';

/**
 * Get a URL to redirect to for google's authentication flow
 *
 * @param {String} redirectURL - The application's redirect url
 *
 * @return {String}
 */
function getGoogleLoginURL(redirectURL) {
	return [
		'https://accounts.google.com/o/oauth2/v2/auth',
		'?scope=email',
		'&response_type=code',
		'&access_type=online',
		`&client_id=${process.env.AUTH_GOOGLE_CLIENT_ID}`,
		`&redirect_uri=${encodeURIComponent(redirectURL)}`,
	].join('');
}

/**
 * Exchange a code received from google's authentication flow for an access token
 *
 * @param {String} redirectURL - The application's redirect url
 * @param {String} code        - The code received from google's authentication flow
 *
 * @return {Promise} - Resolves with an access token if all goes well,
 *                     rejects with an error otherwise
 */
function getGoogleAccessToken(redirectURL, code) {
	return fetch('https://www.googleapis.com/oauth2/v4/token', {
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
		},
		body: [
			`code=${code}`,
			`client_id=${process.env.AUTH_GOOGLE_CLIENT_ID}`,
			`client_secret=${process.env.AUTH_GOOGLE_CLIENT_SECRET}`,
			`redirect_uri=${redirectURL}`,
			'grant_type=authorization_code',
		].join('&'),
	})
		.then(res => res.json())
		.then(body => body.access_token);
}

/**
 * Get basic user information with the given access token
 *
 * @param {String} token - The user's access token
 *
 * @return {Promise} - Resolves with the user's information if all goes well,
 *                     rejects with an error otherwise
 */
function getGoogleUser(token) {
	return fetch('https://www.googleapis.com/plus/v1/people/me', {
		method: 'get',
		headers: {
			authorization: `Bearer ${token}`,
		},
	})
		.then(res => res.json())
		.then(body => ({
			id: body.id,
			first_name: body.name.givenName,
			last_name: body.name.familyName,
			email: body.emails.find(({ type }) => type === 'account').value,
			image: `${body.image.url}0`,
		}));
}

/**
 * Get the amount of users currently registered with the system
 *
 * @param {Object} mysql - Omni's mysql plugin interface
 *
 * @return {Promise} - Resolves with the amount of users if all goes well,
 *                     rejects with an error otherwise
 */
function getUserCount(mysql) {
	return mysql.query('select count(*) as count from user;')
		.then(([{ count }]) => count);
}

/**
 * Create given user
 *
 * @param {Object} mysql      - Omni's mysql plugin interface
 * @param {Object} googleUser - The user as known by google
 *
 * @return {Promise} - Resolves with the new user if all goes well,
 *                     rejects with an error otherwise
 */
function createUser(mysql, { id: googleId, ...googleUser }) {
	return mysql.insert('user', {
		...googleUser,
		superadmin: 1,
		created_at: new Date(),
	})
		.then(user => (
			mysql.insert('auth_google', {
				user_id: user.id,
				google_id: googleId,
			})
				.then(() => user)
		));
}

/**
 * Attempt to log a google user in
 *
 * @param {Object} mysql      - Omni's mysql plugin interface
 * @param {Object} googleUser - The user as known by google
 *
 * @return {Promise} - Resolves with the user if all goes well,
 *                     rejects with an error otherwise
 */
function loginUser(mysql, googleUser) {
	const query = 'select user_id from auth_google where google_id = ?';
	return mysql.query(query, [googleUser.id])
		.then(([row]) => {
			if (!row) {
				throw new Error('No user connected to this Google account');
			}

			return mysql.select('user', row.user_id);
		});
}

/**
 * Redirect the user to google's oauth flow
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export function redirectHandler(req, res) {
	const redirectURL = `${req.protocol}://${req.get('host')}/auth/google/callback`;
	res.redirect(301, getGoogleLoginURL(redirectURL));
}

/**
 * Create a callback handler with the given plugin api
 *
 * @param {Object} omni - Omni plugin api
 */
export function createCallbackHandler(omni) {
	/**
	 * Handle the given callback
	 *
	 * @param {Object} req    - Express request object
	 * @param {Object} res    - Express response object
	 * @param {Function} next - Function to call if this middleware is done
	 */
	return function callbackHandler(req, res, next) {
		const redirectURL = `${req.protocol}://${req.get('host')}/auth/google/callback`;

		getGoogleAccessToken(redirectURL, req.query.code)
			.then(getGoogleUser)
			.then(googleUser => (
				getUserCount(omni.mysql)
					.then(count => (
						count === 0 ?
							createUser(omni.mysql, googleUser) :
							loginUser(omni.mysql, googleUser)
					))
					.then(user => (
						omni.auth.createToken('google', user.id, googleUser.id)
					))
			))
			.then(token => {
				res.cookie('omni_token', token);
				res.redirect('/');
			})
			.catch(next);
	};
}
