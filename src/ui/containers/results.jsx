import React from 'react';
import { connect } from 'react-redux';
import Item from './results/item';

import * as resultsActions from '../actions/results';

export class Results extends React.Component {
  componentDidMount() {
    const { itemIds, storeIds, dispatch } = this.props;
    dispatch(resultsActions.fetch(itemIds, storeIds));
  }

  getList() {
    return this.props.itemList || [];
  }

  renderItem(item, i) {
    return <Item key={i} {...item} />
  }

  render() {
    return <div>
      { this.getList().map(this.renderItem) }
    </div>;
  }
}

function mapStateToProps(state) {
  return {
    itemList: state.resultsReducer.get('itemList')
  };
}

export default connect(mapStateToProps)(Results);
