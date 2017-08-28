import { renderToString } from 'react-dom/server';
import { Helmet } from 'react-helmet';

export default function renderDocument(component, state) {
	const markup = renderToString(component);
	const helmet = Helmet.renderStatic();
	const config = { API_URL: process.env.API_URL };

	/* eslint-disable indent */
	return (
`<!doctype html>
<html ${helmet.htmlAttributes.toString()}>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		${helmet.title.toString()}
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:300,400">
		<link rel="stylesheet" href="/css/omni.css">
	</head>
	<body>
		<div id="omni-container">${markup}</div>
		<script>
			window.CONFIG = ${JSON.stringify(config)};
			window.INITIAL_STATE = ${JSON.stringify(state)};
		</script>
		<script src="/js/omni.js"></script>
	</body>
</html>`
	);
	/* eslint-enable indent */
}
