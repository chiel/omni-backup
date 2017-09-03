import PlainModal from '@ocm/core/dist/components/PlainModal';
import withField from '@ocm/inputs/dist/components/Field';
import PT from 'prop-types';
import React from 'react';

import FinderContainer from './FinderContainer';

import css from '../styles/input-media.css';

export class InputMedia extends React.PureComponent {
	static propTypes = {
		defaultValue: PT.string,
		onChange: PT.func,
		onUpdate: PT.func.isRequired,
	};

	static defaultProps = {
		defaultValue: '',
		onChange: () => {},
	};

	constructor({ defaultValue }) {
		super();

		this.state = {
			showFinder: true,
			value: defaultValue,
		};
	}

	handleBrowse = () => {
		this.setState({ showFinder: true });
	}

	handleBrowseEnd = file => {
		const state = { showFinder: false };
		if (file !== undefined) {
			this.props.onUpdate(file);
			state.value = file;
		}

		this.setState(state);
	}

	handleChange = ev => {
		const { value } = ev.target;
		this.setState({ value });
		this.props.onUpdate(value);
		this.props.onChange(ev);
	}

	render() {
		const { ...props } = this.props;
		const { showFinder, value } = this.state;

		delete props.defaultValue;
		delete props.onUpdate;

		return (
			<div className={css.input}>
				<input
					{...props}
					type="text"
					onChange={this.handleChange}
					value={value}
				/>
				<button
					type="button"
					className={`${css.icon} ${css.iconBrowse}`}
					onClick={this.handleBrowse}
					tabIndex={-1}
				>Browse</button>
				{showFinder && (
					<PlainModal
						onClose={this.handleBrowseEnd}
					>
						<FinderContainer onSelect={this.handleBrowseEnd} />
					</PlainModal>
				)}
			</div>
		);
	}
}

export default withField(InputMedia);
