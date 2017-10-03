import jwt from 'jsonwebtoken';

import { setToken, setUser } from './actions/session';
import providers from './providers';

const salt = process.env.AUTH_TOKEN_SALT;

export default function createEnsureAuthMiddleware(omni) {
	return function ensureAuthMiddleware(req, res, next) {
		const token = req.cookies.omni_token;
		if (!token && !/^\/(?:auth|login)/.test(req.path)) {
			return res.redirect('/login');
		}

		if (!token) {
			return next();
		}

		const payload = jwt.decode(token);
		const provider = providers.find(p => p.type === payload.type);

		provider.getSecret(payload.sub)
			.then(secret => new Promise((resolve, reject) => {
				jwt.verify(token, salt + secret, err => {
					if (err) return reject(err);
					resolve(payload.sub);
				});
			}))
			.then(userId => omni.mysql.select('user', userId))
			.then(user => {
				req.store.dispatch(setToken(token));
				req.store.dispatch(setUser(user));
				next();
			})
			.catch(next);
	};
}
