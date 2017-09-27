import { setToken, setUser } from '../actions/session';

const initialState = {
	token: '',
	user: null,
};

export default function sessionReducer(state = initialState, action) {
	if (action.type === setToken.action) {
		return {
			...state,
			token: action.token,
		};
	}

	if (action.type === setUser.action) {
		return {
			...state,
			user: action.user,
		};
	}

	return state;
}
