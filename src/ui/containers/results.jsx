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

  render() {
    return <div className='results'>
      { this.renderSearch() }
      { this.props.itemList.map(this.renderItem) }
    </div>;
  }
}

function mapStateToProps(state) {
  return {
    itemList: state.getIn([ 'resultsReducer', 'itemList' ]) || List()
  };
}

export default connect(mapStateToProps)(Results);
