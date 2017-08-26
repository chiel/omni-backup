import InputPassword from './components/InputPassword';
import InputText from './components/InputText';
import InputTextarea from './components/InputTextarea';

export default function inputsPlugin(omni) {
	omni.inputTypes.password = InputPassword;
	omni.inputTypes.text = InputText;
	omni.inputTypes.textarea = InputTextarea;
}
