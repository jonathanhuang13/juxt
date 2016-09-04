import React from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Button } from 'react-bootstrap/lib';
import { List } from 'immutable';
import Item from './results/item';
import Search from './search';

import * as searchActions from '../actions/search';
import * as resultsActions from '../actions/results';

export class Results extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  itemsExist() {
    return this.props.itemList.size > 0;
  }

  onSubmit(itemNames, storeNames) {
    const { dispatch } = this.props;

    dispatch(searchActions.handleSubmit(itemNames, storeNames));
  }

  renderSearch() {
    const props = {
      handleSubmit: this.onSubmit.bind(this),
    }

    return <div className='search-bar'>
      <Search {...props} />
    </div>
  }

  renderItems() {
    if (this.itemsExist()) {
      return this.props.itemList.map(this.renderItem);
    } else {
      return this.renderEmptyList();
    }
  }

  renderItem(item, i) {
    return <Item key={i} item={item} />
  }

  renderEmptyList() {
    return <div className='fail-alert item-result'>
      <div className='alert alert-warning' role='alert'>
        No results found.
      </div>
    </div>
  }

  render() {
    return <div className='results'>
      { this.renderSearch() }
      { this.renderItems() }
    </div>
  }
}

function mapStateToProps(state) {
  return {
    itemList: state.getIn([ 'resultsReducer', 'itemList' ]) || List()
  };
}

export default connect(mapStateToProps)(Results);
