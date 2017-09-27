export function setToken(token) {
	return { type: setToken.action, token };
}
setToken.action = 'omni/auth/set-token';

export function setUser(user) {
	return { type: setUser.action, user };
}
setUser.action = 'omni/auth/set-user';
