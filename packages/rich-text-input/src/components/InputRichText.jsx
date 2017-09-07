import withField from '@ocm/inputs/dist/components/Field';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { stateToMarkdown } from 'draft-js-export-markdown';
import { stateFromMarkdown } from 'draft-js-import-markdown';
import PT from 'prop-types';
import React from 'react';

import css from '../styles/input-rich-text.css';

export class InputRichText extends React.PureComponent {
	static propTypes = {
		defaultValue: PT.string,
		onBlur: PT.func.isRequired,
		onFocus: PT.func.isRequired,
		onUpdate: PT.func.isRequired,
	};

	static defaultProps = {
		defaultValue: '',
	};

	constructor() {
		super();

		this.state = {
			active: false,
			editorState: EditorState.createEmpty(),
		};
	}

	componentDidMount() {
		const content = stateFromMarkdown(this.props.defaultValue);

		// eslint-disable-next-line react/no-did-mount-set-state
		this.setState({
			active: true,
			editorState: EditorState.createWithContent(content),
		});
	}

	handleChange = editorState => {
		const { onUpdate } = this.props;

		this.setState({ editorState });
		const contentState = editorState.getCurrentContent();
		onUpdate(stateToMarkdown(contentState));
	}

	handleKeyCommand = command => {
		const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
		if (newState) {
			this.handleChange(newState);
			return 'handled';
		}

		return 'not-handled';
	}

	render() {
		const { onBlur, onFocus } = this.props;
		const { active, editorState } = this.state;

		return (
			<div className={css.input}>
				{active && (
					<Editor
						editorState={editorState}
						handleKeyCommand={this.handleKeyCommand}
						onBlur={onBlur}
						onChange={this.handleChange}
						onFocus={onFocus}
					/>
				)}
			</div>
		);
	}
}

export default withField(InputRichText);
