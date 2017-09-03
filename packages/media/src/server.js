import mkdirp from 'mkdirp';
import { resolve } from 'path';
import serveStatic from 'serve-static';

import InputMedia from './components/InputMedia';
import panelTypes from './panels';
import finderReducer from './reducers/finder';
import getFile from './utils/getFile';

const uploads = resolve(process.env.MEDIA_UPLOADS_DIR);

export default function mediaPlugin(omni) {
	mkdirp.sync(uploads);

	omni.api.get('/media', (req, res, next) => {
		const { path } = req.query;
		getFile(path)
			.then(info => {
				res.json(info);
			})
			.catch(next);
	});

	omni.app.use('/uploads', serveStatic(uploads));

	omni.inputTypes.media = InputMedia;
	omni.reducers.finder = finderReducer;

	omni.media = { panelTypes };
}
