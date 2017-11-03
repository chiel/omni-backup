import PT from 'prop-types';

export const menuItem = PT.shape({
	icon: PT.node.isRequired,
	label: PT.string.isRequired,
	link: PT.string.isRequired,
});
