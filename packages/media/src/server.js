import mkdirp from 'mkdirp';
import multer from 'multer';
import { resolve } from 'path';
import serveStatic from 'serve-static';

import InputMedia from './components/InputMedia';
import panelTypes from './panels';
import finderReducer from './reducers/finder';
import getFile from './utils/getFile';

const uploadDirectory = resolve(process.env.MEDIA_UPLOADS_DIR);

const uploadStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		const { path } = req.query;
		cb(null, uploadDirectory + path);
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname);
	},
});

const uploadMiddleware = multer({ storage: uploadStorage });

export default function mediaPlugin(omni) {
	mkdirp.sync(uploadDirectory);

	omni.api.get('/media', (req, res, next) => {
		const { path } = req.query;
		getFile(path)
			.then(info => {
				res.json(info);
			})
			.catch(next);
	});

	omni.api.post('/media', uploadMiddleware.any(), (req, res, next) => {
		const { path } = req.query;
		getFile(path)
			.then(info => {
				res.json(info);
			})
			.catch(next);
	});

	omni.app.use('/uploads', serveStatic(uploadDirectory));

	omni.inputTypes.media = InputMedia;
	omni.reducers.finder = finderReducer;

	omni.media = { panelTypes };
}
