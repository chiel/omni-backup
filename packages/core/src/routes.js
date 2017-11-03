import App from './components/App';
import Root from './components/Root';

export default [
	{
		component: Root,
		childRoutes: [
			{
				component: App,
				childRoutes: [],
			},
		],
	},
];
