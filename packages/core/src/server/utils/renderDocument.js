import { renderToString } from 'react-dom/server';

export default function renderDocument(component) {
	/* eslint-disable indent */
	return (
`<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<title>Omni</title>
	</head>
	<body>
		<div id="app-container">${renderToString(component)}</div>
	</body>
</html>`
	);
	/* eslint-enable indent */
}
