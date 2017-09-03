import { createSelector } from 'reselect';

export const selectPanels = createSelector(
	state => state.finder.panels,
	state => state.finder.paths,

	(panels, paths) => (
		paths.map(path => ({
			...panels[path],
			path,
		}))
	),
);
