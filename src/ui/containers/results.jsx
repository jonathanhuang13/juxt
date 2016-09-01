import React from 'react';
import { connect } from 'react-redux';
import Item from './results/item';
import Search from './search';

import * as searchActions from '../actions/search';
import * as resultsActions from '../actions/results';

export class Results extends React.Component {
  /*
  componentDidMount() {
    dispatch(resultsActions.setSearch(null);
  }
  */

  onSubmit(itemNames, storeNames) {
    const { dispatch } = this.props;

    dispatch(searchActions.handleSubmit(itemNames, storeNames));
  }

  getList() {
    return this.props.itemList || [];
  }

  renderSearch() {
    const props = {
      inputs: [ 'items', 'stores' ],
      className: 'form-group',
      handleSubmit: this.onSubmit.bind(this),
    }
    return <Search {...props} />;
  }

  renderItem(item, i) {
    return <Item key={i} {...item} />
  }

  render() {
    console.log(this.props);
    return <div className='results'>
      { this.renderSearch() }
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
