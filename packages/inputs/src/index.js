import InputBoolean from './components/InputBoolean';
import InputMultiOption from './components/InputMultiOption';
import InputPassword from './components/InputPassword';
import InputSingleOption from './components/InputSingleOption';
import InputText from './components/InputText';
import InputTextarea from './components/InputTextarea';

export default function inputsPlugin(omni) {
	omni.inputTypes.boolean = InputBoolean;
	omni.inputTypes.multi_option = InputMultiOption;
	omni.inputTypes.password = InputPassword;
	omni.inputTypes.single_option = InputSingleOption;
	omni.inputTypes.text = InputText;
	omni.inputTypes.textarea = InputTextarea;
}
