/* eslint-disable no-shadow */
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

import panelTypes from '../panels';

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

const uploads = path.resolve(process.env.MEDIA_UPLOADS_DIR);

export default function getFile(requestPath) {
	const full = uploads + requestPath;

	return new Promise((resolve, reject) => {
		fs.access(full, err => {
			if (err) {
				if (err.code === 'ENOENT') {
					const e = new Error(`No such directory: ${requestPath}`);
					e.title = '404 Not Found';
					e.type = 'not_found';
					e.status = 404;
					return reject(e);
				}

				return reject(err);
			}

			stat(full)
				.then(stats => {
					if (stats.isDirectory()) {
						return readdir(full)
							.then(files => Promise.all(
								files.map(file => (
									stat(`${full}/${file}`)
										.then(stats => ({
											name: file,
											type: stats.isDirectory() ? 'directory' : 'file',
										}))
								)),
							))
							.then(files => ({
								files,
								path: requestPath,
								type: 'directory',
							}));
					}

					const types = Object.keys(panelTypes)
						.filter(type => !!panelTypes[type].isType)
						.map(type => ({ type, matcher: panelTypes[type].isType }));

					const matched = types.find(({ matcher }) => matcher(requestPath));
					const type = matched ? matched.type : 'file';

					return {
						type,
						name: path.basename(full),
						path: requestPath,
						size: stats.size,
						created_at: stats.birthtime,
						updated_at: stats.ctime,
					};
				})
				.then(resolve)
				.catch(err => {
					reject(err);
				});
		});
	});
}
