import InputRichText from './components/InputRichText';

export default function richTextEditorPlugin(omni) {
	omni.inputTypes.rich_text = InputRichText;
}
