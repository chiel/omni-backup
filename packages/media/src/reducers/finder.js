import { addPanel } from '../actions/finder';

const initialState = {
	panels: {},
	paths: [],
};

const initialPanelState = {
	data: null,
	done: false,
	error: '',
	pending: true,
};

export default function finderReducer(state = initialState, action) {
	if (action.type === addPanel.start) {
		const [index, path] = action.args;
		const paths = state.paths.slice(0, index + 1);

		return {
			...state,
			panels: {
				...state.panels,
				[path]: {
					...initialPanelState,
				},
			},
			paths: [...paths, path],
		};
	}

	if (action.type === addPanel.success) {
		const path = action.args[1];
		return {
			...state,
			panels: {
				...state.panels,
				[path]: {
					...state.panels[path],
					data: action.payload,
					pending: false,
				},
			},
		};
	}

	return state;
}
