import InputMedia from './components/InputMedia';
import panelTypes from './panels';
import finderReducer from './reducers/finder';

export default function mediaPlugin(omni) {
	omni.inputTypes.media = InputMedia;
	omni.reducers.finder = finderReducer;

	omni.media = { panelTypes };
}
