import InputPassword from './components/InputPassword';
import InputText from './components/InputText';

export default function inputsPlugin(omni) {
	omni.inputTypes.password = InputPassword;
	omni.inputTypes.text = InputText;
}
