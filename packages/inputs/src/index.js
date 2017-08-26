import InputPassword from './components/InputPassword';
import InputSingleOption from './components/InputSingleOption';
import InputText from './components/InputText';
import InputTextarea from './components/InputTextarea';

export default function inputsPlugin(omni) {
	omni.inputTypes.password = InputPassword;
	omni.inputTypes.single_option = InputSingleOption;
	omni.inputTypes.text = InputText;
	omni.inputTypes.textarea = InputTextarea;
}
