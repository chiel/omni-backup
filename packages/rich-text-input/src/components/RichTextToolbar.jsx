import { RichUtils } from 'draft-js';
import PT from 'prop-types';
import React from 'react';

import css from '../styles/rich-text-toolbar.css';

export default class RichTextToolbar extends React.PureComponent {
	static propTypes = {
		editorState: PT.shape({}).isRequired,
		onChange: PT.func.isRequired,
	}

	handleClickBold = ev => {
		ev.preventDefault();
		this.handleCommand('bold');
	}

	handleCommand = command => {
		const { editorState, onChange } = this.props;
		const newState = RichUtils.handleKeyCommand(editorState, command);
		onChange(newState);
	}

	render() {
		const { editorState } = this.props;
		const isBold = editorState.getCurrentInlineStyle().has('BOLD');

		return (
			<div className={css.container}>
				<button
					type="button"
					className={`${css.buttonBold} ${isBold ? css.active : ''}`}
					onMouseDown={this.handleClickBold}
				>Bold</button>
			</div>
		);
	}
}
