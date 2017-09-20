import PT from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Finder from './Finder';

import { addPanel } from '../actions/finder';
import { selectPanels } from '../selectors/finder';

export class FinderContainer extends React.PureComponent {
	static propTypes = {
		dispatch: PT.func.isRequired,
		onSelect: PT.func,
		panels: PT.arrayOf(PT.shape({
			data: PT.object,
			done: PT.bool,
			error: PT.string,
			pending: PT.bool,
		})).isRequired,
	};

	static defaultProps = {
		onSelect: () => {},
	};

	componentWillMount() {
		this.props.dispatch(addPanel(-1, '/'));
	}

	createAddPanel = index => path => {
		this.props.dispatch(addPanel(index, path));
	}

	handleSelect = () => {
		const { panels } = this.props;
		this.props.onSelect(panels[panels.length - 1].path);
	}

	handleDelete = () => {

	}

	render() {
		const { panels } = this.props;
		return (
			<Finder
				createAddPanel={this.createAddPanel}
				panels={panels}
				onSelect={this.handleSelect}
			/>
		);
	}
}

export default connect(state => ({
	panels: selectPanels(state),
}))(FinderContainer);
