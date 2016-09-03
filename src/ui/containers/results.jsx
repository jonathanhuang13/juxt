import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap/lib';
import { List } from 'immutable';
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

  renderSearch() {
    const props = {
      inputs: [ 'items', 'stores' ],
      className: 'form-group',
      handleSubmit: this.onSubmit.bind(this),
    }
    return <Search {...props} />;
  }

  renderItem(item, i) {
    return <Item key={i} item={item} />
  }

  handleFake() {
    this.props.dispatch(resultsActions.setSearch(null));
  }

  renderFakeButton() {
    return <Button onClick={this.handleFake.bind(this)}>Fake</Button>
  }

  render() {
    return <div className='results'>
      { this.renderSearch() }
      { this.renderFakeButton() }
      { this.props.itemList.map(this.renderItem) }
    </div>;
  }
}

function mapStateToProps(state) {
  return {
    itemList: state.getIn([ 'resultsReducer', 'itemList' ])
  };
}

export default connect(mapStateToProps)(Results);
